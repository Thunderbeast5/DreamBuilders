import Worker from '../models/Worker.js';
import Site from '../models/Site.js';
import Attendance from '../models/Attendance.js';
import Payment from '../models/Payment.js';

// GET /api/dashboard/stats  (protected)
export const getStats = async (req, res, next) => {
  try {
    const totalWorkers = await Worker.countDocuments();
    const activeSites = await Site.countDocuments({ status: 'active' });

    // Today's attendance count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: 'present',
    });

    const pendingPayments = await Payment.countDocuments({ status: 'pending' });

    // Worker breakdown
    const availableWorkers = await Worker.countDocuments({ status: 'available' });
    const assignedWorkers = await Worker.countDocuments({ status: 'assigned' });
    const inactiveWorkers = await Worker.countDocuments({ status: 'inactive' });

    // Total paid & pending amounts
    const paidAgg = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const pendingAgg = await Payment.aggregate([
      { $match: { status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      totalWorkers,
      activeSites,
      todayAttendance,
      pendingPayments,
      availableWorkers,
      assignedWorkers,
      inactiveWorkers,
      totalPaid: paidAgg[0]?.total || 0,
      totalPending: pendingAgg[0]?.total || 0,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/public-stats  (no auth — for homepage hero)
export const getPublicStats = async (_req, res, next) => {
  try {
    const totalWorkers = await Worker.countDocuments();
    const activeSites = await Site.countDocuments({ status: 'active' });
    const completedProjects = await Site.countDocuments({ status: 'completed' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayPresent = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: 'present',
    });

    const pendingPayments = await Payment.countDocuments({ status: 'pending' });

    res.json({
      totalWorkers,
      activeSites,
      completedProjects,
      todayPresent,
      pendingPayments,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/recent-activity  (protected)
export const getRecentActivity = async (req, res, next) => {
  try {
    const recentAttendance = await Attendance.find()
      .populate('worker', 'name skill')
      .populate('site', 'name')
      .sort('-date')
      .limit(8);

    const recentPayments = await Payment.find()
      .populate('worker', 'name skill')
      .sort('-createdAt')
      .limit(8);

    res.json({ recentAttendance, recentPayments });
  } catch (error) {
    next(error);
  }
};
