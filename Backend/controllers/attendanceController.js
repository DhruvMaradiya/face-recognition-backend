const User = require('../models/User');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');

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
        // Fetch all students
        const students = await User.find({ role: 'student' });

        // Fetch all events
        const events = await Event.find({}, '_id name'); // Only fetch event IDs & names

        // Fetch attendance records
        const attendanceRecords = await Attendance.find();

        // Create event columns dynamically
        const eventMap = events.reduce((acc, event) => {
            acc[event._id.toString()] = event.name;
            return acc;
        }, {});

        // Prepare spreadsheet-style data
        const report = students.map((student) => {
            // Find this student's attendance records
            const studentAttendance = attendanceRecords.filter(a => a.user.toString() === student._id.toString());

            // Attendance summary for each event (Default = Absent `0`)
            let attendanceSummary = {};
            Object.keys(eventMap).forEach(eventId => {
                const record = studentAttendance.find(a => a.event.toString() === eventId);
                attendanceSummary[eventMap[eventId]] = record ? 1 : 0; // Present `1`, Absent `0`
            });

            // Calculate total attendance
            const totalAttendance = Object.values(attendanceSummary).reduce((sum, val) => sum + val, 0);

            return {
                studentId: student.studentId,
                email: student.email,
                total: totalAttendance,
                ...attendanceSummary
            };
        });

        res.json(report);
    } catch (error) {
        console.error("Error generating attendance report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
