import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    note: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
