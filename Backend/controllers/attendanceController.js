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