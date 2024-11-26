import { run } from '../config/database.js';
import { logger } from '../utils/logger.js';

const migrations = [
  // Initial schema
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    last_login TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS contact_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
  )`,

  // Add indexes for better query performance
  `CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status)`,
  `CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_contact_notes_contact_id ON contact_notes(contact_id)`
];

export async function runMigrations() {
  try {
    logger.info('Running database migrations...');

    // Run each migration in sequence
    for (const migration of migrations) {
      await run(migration);
    }

    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Error running migrations:', { error });
    throw error;
  }
}