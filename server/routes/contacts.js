import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { validateContact } from '../utils/validation.js';
import { 
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  updateContactStatus 
} from '../api/contacts/services/contactService.js';
import { sendEmail } from '../services/email.js';

export const router = Router();

// Create new contact
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    
    logger.info('Creating new contact', { contactData });

    const { isValid, errors } = validateContact(contactData);
    if (!isValid) {
      logger.warn('Contact validation failed', { errors });
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const result = await createContact(contactData);
    logger.info('Contact created successfully', { contactId: result.lastID });

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
    const contacts = await getContacts();
    logger.info('Contacts fetched successfully', { count: contacts.length });
    res.json(contacts);
  } catch (error) {
    logger.error('Error fetching contacts:', { error });
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const contactData = req.body;

    logger.info('Updating contact', { id, contactData });

    const result = await updateContact(id, contactData);
    if (result.changes === 0) {
      logger.warn('Contact not found for update', { id });
      return res.status(404).json({ error: 'Contact not found' });
    }

    logger.info('Contact updated successfully', { id });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error updating contact:', { error });
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete contact
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    logger.info('Deleting contact', { id });

    const result = await deleteContact(id);
    if (result.changes === 0) {
      logger.warn('Contact not found for deletion', { id });
      return res.status(404).json({ error: 'Contact not found' });
    }

    logger.info('Contact deleted successfully', { id });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error deleting contact:', { error });
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Update contact status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    logger.info('Updating contact status', { id, status });

    const result = await updateContactStatus(id, status);
    res.json(result);
  } catch (error) {
    if (error.message === 'Invalid status') {
      return res.status(400).json({ error: 'Invalid status' });
    }
    if (error.message === 'Contact not found') {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    logger.error('Error updating contact status:', { error });
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});