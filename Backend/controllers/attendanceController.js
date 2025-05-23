const User = require('../models/User');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');
const XLSX = require('xlsx'); // Import xlsx for spreadsheet generation
const { saveAs } = require("file-saver");

exports.markAttendance = async (req, res) => {
  try {
    const { userId, eventId, faceEmbedding, coordinates } = req.body;

    // 1. Verify face embedding
    const user = await User.findById(userId);
    const similarity = cosineSimilarity(user.faceEmbedding, faceEmbedding);
    if (similarity < 0.7) return res.status(400).json({ error: 'Face verification failed' });

    // 2. Check event registration
    const event = await Event.findById(eventId);
    if (!event.registeredStudents.includes(userId)) {
      return res.status(403).json({ error: 'User not registered for this event' });
    }

    // 3. Check location
    const distance = await Event.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates },
          distanceField: 'distance',
          spherical: true,
          query: { _id: eventId }
        }
      }
    ]);

    if (distance[0].distance > event.radius) {
      return res.status(400).json({ error: 'Outside allowed radius' });
    }

    // 4. Check time constraints
    const now = new Date();
    const bufferEnd = new Date(event.endTime.getTime() + event.bufferMinutes * 60000);

    let status = 'absent';
    let lateMinutes = 0;

    if (now <= event.endTime) {
      status = 'present';
    } else if (now <= bufferEnd) {
      status = 'late';
      lateMinutes = Math.floor((now - event.endTime) / 60000);
    }

    // 5. Create attendance record
    const attendance = await Attendance.create({
      user: userId,
      event: eventId,
      status,
      lateMinutes,
      location: { coordinates },
      markedAt: now
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function for face comparison
function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}



exports.generateAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate, eventName } = req.query;

    // Build date filter
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter.markedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch events (filtered by eventName if provided, case-insensitive)
    let eventQuery = {};
    if (eventName) {
      eventQuery.name = { $regex: new RegExp(eventName, "i") }; // Case-insensitive search
    }
    const events = await Event.find(eventQuery, "_id name");

    if (eventName && events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Fetch filtered attendance records (excluding null users)
    const attendanceRecords = await Attendance.find({
      ...dateFilter,
      user: { $ne: null }, // Exclude records with null users
      ...(eventName ? { event: { $in: events.map(e => e._id) } } : {}), // Filter by event if specified
    })
      .populate("user", "studentId fullName email")
      .populate("event", "name");

    // Fetch all students
    const students = await User.find({ role: "student" }).populate("registeredEvents", "name");

    // Map attendance for easy lookup
    const attendanceMap = {};
    attendanceRecords.forEach(record => {
      if (!record.user) return; // Extra safety for null users

      if (!attendanceMap[record.user.studentId]) {
        attendanceMap[record.user.studentId] = {};
      }
      attendanceMap[record.user.studentId][record.event.name] = record.status;
    });

    // Create spreadsheet data with required columns
    const report = [];

    // Header row
    const headerRow = ["Student ID", "Full Name", "Email", "Total Registered Events", ...events.map(event => event.name)];
    report.push(headerRow);

    // Data rows
    students.forEach(student => {
      const row = [
        student.studentId,
        student.fullName,
        student.email,
        student.registeredEvents.length,
      ];

      // Add attendance status for each event
      events.forEach(event => {
        row.push(attendanceMap[student.studentId]?.[event.name] || "");
      });

      report.push(row);
    });

    if (req.query.format === "json") {
      return res.json(report);
    }

    // Convert JSON to XLSX
    const worksheet = XLSX.utils.aoa_to_sheet(report);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    // Write file buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Set response headers for file download
    res.setHeader("Content-Disposition", `attachment; filename="Attendance_Report${eventName ? `_${eventName}` : ""}.xlsx"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};