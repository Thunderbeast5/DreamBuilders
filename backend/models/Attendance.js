import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day'],
      default: 'present',
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance for same worker on same date
attendanceSchema.index({ worker: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
