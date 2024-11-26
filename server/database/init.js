import sqlite3 from 'sqlite3';
import bcryptjs from 'bcryptjs';
import { logger } from '../utils/logger.js';

// Create an in-memory database for development
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    logger.error('Error creating database:', { error: err });
    process.exit(1);
  }
  logger.info('Connected to in-memory SQLite database');
});

// Enable WAL mode for better concurrency
db.serialize(() => {
  db.run('PRAGMA journal_mode = WAL');
  db.run('PRAGMA busy_timeout = 5000');
  db.run('PRAGMA foreign_keys = ON');
});

export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create tables
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL,
          status TEXT NOT NULL,
          last_login TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          preferred_date TEXT NOT NULL,
          preferred_time TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS contact_notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contact_id INTEGER NOT NULL,
          text TEXT NOT NULL,
          author TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
        )
      `);

      // Create default admin user
      const adminEmail = 'admin@congresstrade.de';
      const adminPassword = 'admin123';
      const hashedPassword = bcryptjs.hashSync(adminPassword, 10);

      db.run(`
        INSERT OR REPLACE INTO users (name, email, password, role, status)
        VALUES (?, ?, ?, ?, ?)
      `, ['Admin User', adminEmail, hashedPassword, 'admin', 'active'], (err) => {
        if (err) {
          logger.error('Error creating/updating admin user:', { error: err });
          reject(err);
          return;
        }
        logger.info('Admin user credentials updated successfully');
        resolve();
      });
    });
  });
}

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

export default {
  query,
  get,
  run
};