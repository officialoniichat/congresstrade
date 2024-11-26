import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../database/init.js';
import { logger } from '../utils/logger.js';
import { validateContact } from '../utils/validation.js';
import { sendEmail } from '../services/email.js';

const router = Router();

// Create new contact
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    
    logger.info('Creating new contact', { contactData });

    // Validate contact data
    const { isValid, errors } = validateContact(contactData);
    if (!isValid) {
      logger.warn('Contact validation failed', { errors });
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Create contact
    const result = await db.run(`
      INSERT INTO contacts (
        name, phone, email, preferred_date, preferred_time,
        status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [
      contactData.name,
      contactData.phone,
      contactData.email,
      contactData.preferred_date,
      contactData.preferred_time
    ]);

    logger.info('Contact created successfully', { contactId: result.lastID });

    // Send welcome email asynchronously
    if (contactData.email) {
      try {
        await sendEmail(
          contactData.email,
          'Willkommen bei CongressTrade',
          `Sehr geehrte/r ${contactData.name},\n\nVielen Dank für Ihr Interesse...`
        );
        logger.info('Welcome email sent', { email: contactData.email });
      } catch (emailError) {
        logger.error('Failed to send welcome email', { error: emailError });
      }
    }

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    logger.error('Error creating contact:', { error });
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Get all contacts (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    logger.info('Fetching contacts');
    
    const contacts = await db.query(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `);

    const notes = await db.query(`
      SELECT id, contact_id, text, author, created_at as timestamp
      FROM contact_notes
      ORDER BY created_at DESC
    `);

    const formattedContacts = contacts.map(contact => ({
      ...contact,
      notes: notes.filter(n => n.contact_id === contact.id)
    }));

    logger.info('Contacts fetched successfully', { count: contacts.length });
    res.json(formattedContacts);
  } catch (error) {
    logger.error('Error fetching contacts:', { error });
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Rest of the routes...

export { router };