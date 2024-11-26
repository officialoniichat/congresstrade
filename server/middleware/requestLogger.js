import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

export function requestLogger(req, res, next) {
  // Generate unique request ID
  req.id = uuidv4();
  const startTime = Date.now();

  // Log request
  logger.info(`Incoming ${req.method} ${req.url}`, {
    requestId: req.id,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    headers: {
      ...req.headers,
      authorization: req.headers.authorization ? '[REDACTED]' : undefined
    }
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const level = res.statusCode >= 400 ? 'warn' : 'info';

    logger[level](`${req.method} ${req.url} completed`, {
      requestId: req.id,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
}