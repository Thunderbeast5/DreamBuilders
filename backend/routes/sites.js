import { Router } from 'express';
import {
  getSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
  assignWorker,
  unassignWorker,
} from '../controllers/siteController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

// All 3 roles can READ sites
router.get('/', authorize('admin', 'supervisor', 'contractor'), getSites);
router.get('/:id', authorize('admin', 'supervisor', 'contractor'), getSite);

// Only admin & supervisor can CREATE / UPDATE / DELETE sites
router.post('/', authorize('admin', 'supervisor'), createSite);
router.put('/:id', authorize('admin', 'supervisor'), updateSite);
router.delete('/:id', authorize('admin', 'supervisor'), deleteSite);

// Assign/unassign workers to sites — admin & supervisor
router.post('/:id/assign', authorize('admin', 'supervisor'), assignWorker);
router.post('/:id/unassign', authorize('admin', 'supervisor'), unassignWorker);

export default router;
