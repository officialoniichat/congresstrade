import bcryptjs from 'bcryptjs';
import { logger } from '../utils/logger.js';
import { run } from '../config/database.js';
import { runMigrations } from './migrations.js';

export async function initializeDatabase() {
  try {
    // Run migrations
    await runMigrations();

    // Create default admin user
    const adminEmail = 'admin@congresstrade.de';
    const adminPassword = 'admin123';
    const hashedPassword = bcryptjs.hashSync(adminPassword, 10);

    await run(`
      INSERT OR REPLACE INTO users (name, email, password, role, status)
      VALUES (?, ?, ?, ?, ?)
    `, ['Admin User', adminEmail, hashedPassword, 'admin', 'active']);

    logger.info('Admin user credentials updated successfully');
  } catch (error) {
    logger.error('Error initializing database:', { error });
    throw error;
  }
}