import { logger } from '../../utils/logger.js';

export function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      logger.warn('Authorization failed: No user in request');
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Authorization failed: Insufficient permissions', {
        userRole: req.user.role,
        requiredRoles: allowedRoles
      });
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}