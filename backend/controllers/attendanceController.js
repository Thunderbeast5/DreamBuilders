import Attendance from '../models/Attendance.js';

// POST /api/attendance
export const markAttendance = async (req, res, next) => {
  try {
    const { records } = req.body; // [{ worker, site, date, status }]

    if (Array.isArray(records)) {
      // Bulk mark
      const results = [];
      for (const record of records) {
        const existing = await Attendance.findOneAndUpdate(
          { worker: record.worker, date: record.date },
          { ...record },
          { upsert: true, new: true, runValidators: true }
        );
        results.push(existing);
      }
      return res.status(201).json(results);
    }

    // Single mark
    const { worker, site, date, status } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { worker, date },
      { worker, site, date, status },
      { upsert: true, new: true, runValidators: true }
    );
    res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
};

// GET /api/attendance?date=YYYY-MM-DD
export const getDailyAttendance = async (req, res, next) => {
  try {
    const { date } = req.query;
    const query = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    const records = await Attendance.find(query)
      .populate('worker', 'name skill phone')
      .populate('site', 'name')
      .sort('-date');
    res.json(records);
  } catch (error) {
    next(error);
  }
};

// GET /api/attendance/worker/:workerId
export const getWorkerAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find({ worker: req.params.workerId })
      .populate('site', 'name')
      .sort('-date');
    res.json(records);
  } catch (error) {
    next(error);
  }
};
