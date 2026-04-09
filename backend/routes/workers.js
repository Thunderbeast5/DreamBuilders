import { Router } from 'express';
import {
  getWorkers,
  getWorker,
  createWorker,
  updateWorker,
  deleteWorker,
} from '../controllers/workerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

// All 3 roles can READ workers (supervisors need this for attendance)
router.get('/', authorize('admin', 'supervisor', 'contractor'), getWorkers);
router.get('/:id', authorize('admin', 'supervisor', 'contractor'), getWorker);

// Only admin & contractor can CREATE / UPDATE / DELETE workers
router.post('/', authorize('admin', 'contractor'), createWorker);
router.put('/:id', authorize('admin', 'contractor'), updateWorker);
router.delete('/:id', authorize('admin', 'contractor'), deleteWorker);

export default router;
