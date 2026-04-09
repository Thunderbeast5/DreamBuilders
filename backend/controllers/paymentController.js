import Payment from '../models/Payment.js';

// GET /api/payments
export const getPayments = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.worker) filter.worker = req.query.worker;

    const payments = await Payment.find(filter)
      .populate('worker', 'name skill phone')
      .sort('-createdAt');
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

// POST /api/payments
export const createPayment = async (req, res, next) => {
  try {
    const { worker, amount, date, status, note } = req.body;
    const payment = await Payment.create({ worker, amount, date, status, note });
    const populated = await payment.populate('worker', 'name skill phone');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// PUT /api/payments/:id
export const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('worker', 'name skill phone');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    next(error);
  }
};
