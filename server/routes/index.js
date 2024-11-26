import { Router } from 'express';
import { router as authRoutes } from './auth.js';
import { router as contactRoutes } from './contacts.js';

export const router = Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);