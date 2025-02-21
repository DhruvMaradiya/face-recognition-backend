const Attendance = require('../models/Attendance');

exports.generateReport = async (req, res) => {
  try {
    const { eventId, userId, startDate, endDate } = req.query;
    const filter = {};
    
    if (eventId) filter.event = eventId;
    if (userId) filter.user = userId;
    if (startDate || endDate) {
      filter.markedAt = {};
      if (startDate) filter.markedAt.$gte = new Date(startDate);
      if (endDate) filter.markedAt.$lte = new Date(endDate);
    }

    const report = await Attendance.find(filter)
      .populate('user', 'fullName studentId')
      .populate('event', 'name startTime endTime');

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.modifyAttendance = async (req, res) => {
  try {
    const { attendanceId, newStatus, reason } = req.body;
    const attendance = await Attendance.findById(attendanceId);
    
    if (!attendance) return res.status(404).json({ error: 'Record not found' });
    
    attendance.status = newStatus;
    attendance.modifiedBy = req.user.id;
    attendance.modificationReason = reason;
    
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};