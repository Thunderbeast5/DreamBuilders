import { Router } from 'express';
import {
  markAttendance,
  getDailyAttendance,
  getWorkerAttendance,
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.use(authorize('admin', 'supervisor'));
router.route('/').post(markAttendance).get(getDailyAttendance);
router.get('/worker/:workerId', getWorkerAttendance);

export default router;
