import { Router } from 'express';
import { authenticateToken } from '../../../middleware/auth.js';
import {
  create,
  list,
  update,
  remove,
  updateStatus
} from '../controllers/contactController.js';

const router = Router();

// Public routes
router.post('/', create);

// Protected routes
router.get('/', authenticateToken, list);
router.put('/:id', authenticateToken, update);
router.delete('/:id', authenticateToken, remove);
router.patch('/:id/status', authenticateToken, updateStatus);

export { router };