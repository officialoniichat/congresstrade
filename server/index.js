import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as authRoutes } from './routes/auth.js';
import { router as articleRoutes } from './routes/articles.js';
import { router as contactRoutes } from './routes/contacts.js';
import { router as userRoutes } from './routes/users.js';
import { initializeDatabase } from './database/init.js';
import { sendWelcomeEmail } from './services/email.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/articles', articleRoutes);
    app.use('/api/contacts', contactRoutes);
    app.use('/api/users', userRoutes);

    // Contact creation webhook
    app.post('/api/contacts', async (req, res) => {
      try {
        const {
          name, phone, email, preferred_date, preferred_time,
          investment_capacity, risk_tolerance, experience_level,
          time_horizon, preferred_package
        } = req.body;

        const result = await db.run(`
          INSERT INTO contacts (
            name, phone, email, preferred_date, preferred_time,
            status, investment_capacity, risk_tolerance,
            experience_level, time_horizon, preferred_package
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          name, phone, email, preferred_date, preferred_time,
          'new', investment_capacity, risk_tolerance,
          experience_level, time_horizon, preferred_package
        ]);

        // Send welcome email
        if (email) {
          await sendWelcomeEmail({
            name,
            email,
            preferred_date,
            preferred_time
          });
        }

        res.status(201).json({ id: result.lastID });
      } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Failed to create contact' });
      }
    });

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(join(__dirname, '../dist')));
      app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '../dist/index.html'));
      });
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });