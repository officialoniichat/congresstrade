import { Router } from 'express';
import { router as authRoutes } from './auth.js';
import { router as contactRoutes } from './contacts.js';
import { router as articleRoutes } from './articles.js';

export const router = Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/articles', articleRoutes);