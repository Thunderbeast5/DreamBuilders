import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    skill: { type: String, required: true, trim: true },
    dailyWage: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'assigned', 'inactive'],
      default: 'available',
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Worker', workerSchema);
