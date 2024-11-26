import fs from 'fs';
import path from 'path';

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

class Logger {
  constructor() {
    this.logs = [];
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      ...meta
    };
  }

  log(level, message, meta = {}) {
    const formattedMessage = this.formatMessage(level, message, meta);
    this.logs.push(formattedMessage);

    // Console output with colors
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m'  // Gray
    };

    const reset = '\x1b[0m';
    console.log(
      `${colors[level]}[${formattedMessage.timestamp}] ${level}:${reset}`,
      message,
      Object.keys(meta).length ? meta : ''
    );

    // Log errors to console.error
    if (level === LOG_LEVELS.ERROR) {
      console.error(formattedMessage);
    }

    return formattedMessage;
  }

  error(message, meta = {}) {
    return this.log(LOG_LEVELS.ERROR, message, meta);
  }

  warn(message, meta = {}) {
    return this.log(LOG_LEVELS.WARN, message, meta);
  }

  info(message, meta = {}) {
    return this.log(LOG_LEVELS.INFO, message, meta);
  }

  debug(message, meta = {}) {
    return this.log(LOG_LEVELS.DEBUG, message, meta);
  }

  // Get recent logs
  getLogs(limit = 100) {
    return this.logs.slice(-limit);
  }
}

export const logger = new Logger();