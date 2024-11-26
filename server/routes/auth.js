import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query, get, run } from '../config/database.js';
import { config } from '../config/environment.js';
import { logger } from '../utils/logger.js';

export const router = Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await get(
      'SELECT * FROM users WHERE email = ? AND status = ?',
      [email, 'active']
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    await run(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Login error:', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Validate token route
router.get('/validate', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await get(
      'SELECT id, name, email, role FROM users WHERE id = ? AND status = ?',
      [decoded.id, 'active']
    );

    if (!user) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Token validation error:', { error });
    res.status(401).json({ error: 'Invalid token' });
  }
});