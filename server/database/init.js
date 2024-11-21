import sqlite3 from 'sqlite3';
import bcryptjs from 'bcryptjs';

// Create an in-memory database for development
const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
  console.log('Connected to in-memory SQLite database');
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
          phone TEXT,
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
          status TEXT NOT NULL,
          investment_capacity TEXT,
          risk_tolerance TEXT,
          experience_level TEXT,
          time_horizon TEXT,
          preferred_package TEXT,
          potential_value INTEGER,
          conversion_probability INTEGER,
          last_contact TEXT,
          next_follow_up TEXT,
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

      db.run(`
        CREATE TABLE IF NOT EXISTS contact_tags (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contact_id INTEGER NOT NULL,
          tag TEXT NOT NULL,
          FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create default admin user
      const adminEmail = 'admin@congresstrade.com';
      const adminPassword = 'admin123';
      const hashedPassword = bcryptjs.hashSync(adminPassword, 10);

      db.run(`
        INSERT OR REPLACE INTO users (name, email, password, role, status)
        VALUES (?, ?, ?, ?, ?)
      `, ['Admin User', adminEmail, hashedPassword, 'admin', 'active'], (err) => {
        if (err) {
          console.error('Error creating/updating admin user:', err);
          reject(err);
          return;
        }
        console.log('Admin user credentials updated successfully');
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

// Clean up on exit
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});

export default {
  query,
  get,
  run
};