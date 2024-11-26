import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  // Log error details
  logger.error('Unhandled error', {
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
      params: req.params,
      headers: {
        ...req.headers,
        authorization: req.headers.authorization ? '[REDACTED]' : undefined
      }
    }
  });

  // Send appropriate response
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 
    ? 'Internal Server Error'
    : err.message;

  res.status(statusCode).json({
    error: message,
    requestId: req.id
  });
}