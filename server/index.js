import { createServer } from './config/server.js';
import { initializeDatabase } from './database/init.js';
import { logger } from './utils/logger.js';
import { config } from './config/environment.js';

const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized successfully');

    // Create and start server
    const app = createServer();
    
    app.listen(config.port, '0.0.0.0', () => {
      logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (err) {
    logger.error('Failed to start server:', { error: err });
    process.exit(1);
  }
};

startServer();