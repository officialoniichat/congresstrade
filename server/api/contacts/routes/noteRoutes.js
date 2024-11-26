import { Router } from 'express';
import { authenticateToken } from '../../../middleware/auth.js';
import { logger } from '../../../utils/logger.js';
import db from '../../../database/init.js';

export const router = Router({ mergeParams: true });

// Add note to contact
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { text } = req.body;

    logger.info('Adding note to contact', { contactId, text });

    // Validate text
    if (!text?.trim()) {
      logger.warn('Note text is required', { contactId });
      return res.status(400).json({ error: 'Note text is required' });
    }

    // Verify contact exists
    const contact = await db.get('SELECT id FROM contacts WHERE id = ?', [contactId]);
    if (!contact) {
      logger.warn('Contact not found for adding note', { contactId });
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Add note
    const result = await db.run(`
      INSERT INTO contact_notes (contact_id, text, author)
      VALUES (?, ?, ?)
    `, [contactId, text, req.user?.name || 'Admin']);

    // Get created note
    const note = await db.get(`
      SELECT id, text, author, created_at as timestamp
      FROM contact_notes
      WHERE id = ?
    `, [result.lastID]);

    logger.info('Note added successfully', { noteId: note.id, contactId });
    res.status(201).json(note);
  } catch (error) {
    logger.error('Failed to add note', { error, contactId: req.params.contactId });
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Delete note
router.delete('/:noteId', authenticateToken, async (req, res) => {
  try {
    const { contactId, noteId } = req.params;
    
    logger.info('Deleting note', { contactId, noteId });

    const result = await db.run(`
      DELETE FROM contact_notes
      WHERE id = ? AND contact_id = ?
    `, [noteId, contactId]);

    if (result.changes === 0) {
      logger.warn('Note not found for deletion', { contactId, noteId });
      return res.status(404).json({ error: 'Note not found' });
    }

    logger.info('Note deleted successfully', { contactId, noteId });
    res.json({ success: true });
  } catch (error) {
    logger.error('Failed to delete note', { error, contactId: req.params.contactId, noteId: req.params.noteId });
    res.status(500).json({ error: 'Failed to delete note' });
  }
});