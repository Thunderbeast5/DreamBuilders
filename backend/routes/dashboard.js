import { Router } from 'express';
import { getStats, getPublicStats, getRecentActivity } from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Public — no auth (for homepage hero stats)
router.get('/public-stats', getPublicStats);

// Protected — all authenticated roles
const authMiddleware = [protect, authorize('admin', 'supervisor', 'contractor')];
router.get('/stats', ...authMiddleware, getStats);
router.get('/recent-activity', ...authMiddleware, getRecentActivity);

export default router;
