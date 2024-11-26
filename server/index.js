import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/index.js';
import { initializeDatabase } from './database/init.js';
import { logger } from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize database
initializeDatabase()
  .then(() => {
    logger.info('Database initialized successfully');
    
    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(requestLogger);

    // API Routes - ensure they are registered before static files
    app.use('/api', router);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    if (process.env.NODE_ENV === 'production') {
      // Serve static files from the dist directory
      const staticPath = path.join(__dirname, '..', 'dist');
      app.use(express.static(staticPath));

      // Handle SPA routing - must be after API routes
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(staticPath, 'index.html'));
        }
      });
    }

    // Error handling - must be last
    app.use(errorHandler);

    // Start server
    app.listen(port, '0.0.0.0', () => {
      logger.info(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch(err => {
    logger.error('Failed to initialize database:', { error: err });
    process.exit(1);
  });