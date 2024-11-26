import express from 'express';
import cors from 'cors';
import { requestLogger } from '../middleware/requestLogger.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { router } from '../routes/index.js';
import { logger } from '../utils/logger.js';
import { config } from './environment.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createServer = () => {
  const app = express();

  // Middleware
  app.use(cors(config.cors));
  app.use(express.json());
  app.use(requestLogger);

  // API Routes
  app.use('/api', router);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Serve static files in production
  if (config.nodeEnv === 'production') {
    const staticPath = path.join(__dirname, '../../dist');
    
    // Serve static files
    app.use(express.static(staticPath));
    
    // Handle SPA routing - serve index.html for all non-API routes
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(staticPath, 'index.html'));
      }
    });
  }

  // Error handling
  app.use(errorHandler);

  return app;
};