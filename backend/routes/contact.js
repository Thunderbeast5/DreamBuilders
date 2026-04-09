import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContact); // Public — anyone can submit
router.get('/', protect, getContacts); // Protected — only logged-in users

export default router;
