const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'late', 'absent'],
    default: 'absent'
  },
  lateMinutes: Number,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  markedAt: Date,
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);