import sqlite3 from 'sqlite3';
import { logger } from '../utils/logger.js';
import { config } from './environment.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Use in-memory database for development, file-based for production
const dbPath = config.nodeEnv === 'production'
  ? path.join(dataDir, 'congresstrade.db')
  : ':memory:';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    logger.error('Error creating database:', { error: err });
    process.exit(1);
  }
  logger.info(`Connected to SQLite database at ${dbPath}`);
});

// Configure database settings
db.serialize(() => {
  db.run('PRAGMA journal_mode = WAL');
  db.run('PRAGMA busy_timeout = 5000');
  db.run('PRAGMA foreign_keys = ON');
  db.run('PRAGMA synchronous = NORMAL');
  db.run('PRAGMA mmap_size = 30000000000');
});

// Helper functions
export function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      logger.error('Error closing database:', { error: err });
      process.exit(1);
    }
    logger.info('Database connection closed');
    process.exit(0);
  });
});

export default {
  query,
  get,
  run
};