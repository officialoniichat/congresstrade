import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  clientUrl: process.env.CLIENT_URL || (
    process.env.NODE_ENV === 'production'
      ? 'https://congresstrade.onrender.com'
      : 'http://localhost:5174'
  ),
  database: {
    path: process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '../../data/congresstrade.db')
      : ':memory:',
    maxConnections: 10
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? [
          'https://congresstrade.onrender.com',
          'https://www.congresstrade.onrender.com'
        ]
      : ['http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};