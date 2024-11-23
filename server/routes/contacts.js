import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../database/init.js';
import { sendEmail, sendConsultationEmail } from '../services/email.js';

export const router = Router();

// Create new contact
router.post('/', async (req, res) => {
  try {
    const {
      name, phone, email, preferred_date, preferred_time,
      investment_capacity, risk_tolerance, experience_level,
      time_horizon, preferred_package
    } = req.body;

    // Validate required fields
    if (!name || !phone || !preferred_date || !preferred_time) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          phone: !phone ? 'Phone is required' : null,
          preferred_date: !preferred_date ? 'Date is required' : null,
          preferred_time: !preferred_time ? 'Time is required' : null
        }
      });
    }

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

    // Send emails asynchronously
    if (email) {
      Promise.all([
        sendEmail({
          name,
          email,
          preferred_date,
          preferred_time,
          phone
        }),
        sendConsultationEmail({
          name,
          email,
          preferred_date,
          preferred_time,
          phone
        })
      ]).catch(error => {
        console.error('Error sending emails:', error);
        // Don't block the response
      });
    }

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Get all contacts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await db.query(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `);

    const allTags = await db.query(`
      SELECT contact_id, tag 
      FROM contact_tags
    `);

    const allNotes = await db.query(`
      SELECT id, contact_id, text, author, created_at
      FROM contact_notes
      ORDER BY created_at DESC
    `);

    const formattedContacts = contacts.map(contact => ({
      ...contact,
      tags: allTags
        .filter(t => t.contact_id === contact.id)
        .map(t => t.tag),
      notes: allNotes
        .filter(n => n.contact_id === contact.id)
        .map(({ contact_id, ...note }) => note)
    }));

    res.json(formattedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.run(`
      UPDATE contacts
      SET status = ?, last_contact = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [status, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});

// Add note to contact
router.post('/:id/notes', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    const contact = await db.get('SELECT id FROM contacts WHERE id = ?', [id]);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const result = await db.run(`
      INSERT INTO contact_notes (contact_id, text, author)
      VALUES (?, ?, ?)
    `, [id, text, author]);

    const newNote = await db.get(`
      SELECT id, text, author, created_at
      FROM contact_notes
      WHERE id = ?
    `, [result.lastID]);

    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Delete note
router.delete('/:contactId/notes/:noteId', authenticateToken, async (req, res) => {
  try {
    const { contactId, noteId } = req.params;

    const result = await db.run(`
      DELETE FROM contact_notes
      WHERE id = ? AND contact_id = ?
    `, [noteId, contactId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;