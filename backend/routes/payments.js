import { Router } from 'express';
import {
  getPayments,
  createPayment,
  updatePayment,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.use(authorize('admin', 'supervisor', 'contractor'));
router.route('/').get(getPayments).post(createPayment);
router.route('/:id').put(updatePayment);

export default router;
