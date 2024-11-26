import jwt from 'jsonwebtoken';
import { config } from '../../config/environment.js';
import { logger } from '../../utils/logger.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Authentication failed: No token provided');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, config.jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      logger.warn('Authentication failed: Token expired');
      return res.status(401).json({ error: 'Token expired' });
    }
    logger.warn('Authentication failed: Invalid token', { error: err });
    return res.status(403).json({ error: 'Invalid token' });
  }
}