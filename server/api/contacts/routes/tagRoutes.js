import { Router } from 'express';
import { authenticateToken } from '../../../middleware/auth.js';
import { logger } from '../../../utils/logger.js';
import db from '../../../database/init.js';

export const router = Router({ mergeParams: true });

// Add tag to contact
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { tag } = req.body;

    logger.info('Adding tag to contact', { contactId, tag });

    // Validate tag
    if (!tag?.trim()) {
      logger.warn('Tag text is required', { contactId });
      return res.status(400).json({ error: 'Tag text is required' });
    }

    // Verify contact exists
    const contact = await db.get('SELECT id FROM contacts WHERE id = ?', [contactId]);
    if (!contact) {
      logger.warn('Contact not found for adding tag', { contactId });
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Add tag
    const result = await db.run(`
      INSERT INTO contact_tags (contact_id, tag)
      VALUES (?, ?)
    `, [contactId, tag.trim()]);

    logger.info('Tag added successfully', { tagId: result.lastID, contactId });
    res.status(201).json({ id: result.lastID, text: tag });
  } catch (error) {
    logger.error('Failed to add tag', { error, contactId: req.params.contactId });
    res.status(500).json({ error: 'Failed to add tag' });
  }
});

// Delete tag
router.delete('/:tagId', authenticateToken, async (req, res) => {
  try {
    const { contactId, tagId } = req.params;
    
    logger.info('Deleting tag', { contactId, tagId });

    const result = await db.run(`
      DELETE FROM contact_tags
      WHERE id = ? AND contact_id = ?
    `, [tagId, contactId]);

    if (result.changes === 0) {
      logger.warn('Tag not found for deletion', { contactId, tagId });
      return res.status(404).json({ error: 'Tag not found' });
    }

    logger.info('Tag deleted successfully', { contactId, tagId });
    res.json({ success: true });
  } catch (error) {
    logger.error('Failed to delete tag', { error, contactId: req.params.contactId, tagId: req.params.tagId });
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});