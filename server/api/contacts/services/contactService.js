import db from '../../../config/database.js';
import { logger } from '../../../utils/logger.js';

export async function updateContactStatus(id, status) {
  try {
    logger.info('Updating contact status', { id, status });
    
    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    // First check if contact exists
    const contact = await db.get('SELECT id FROM contacts WHERE id = ?', [id]);
    if (!contact) {
      throw new Error('Contact not found');
    }

    const result = await db.run(`
      UPDATE contacts 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [status, id]);

    logger.info('Contact status updated successfully', { id, status });
    return { success: true };
  } catch (error) {
    logger.error('Error updating contact status:', { error, id, status });
    throw error;
  }
}

export async function getContacts() {
  try {
    const contacts = await db.query(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `);

    const notes = await db.query(`
      SELECT id, contact_id, text, author, created_at as timestamp
      FROM contact_notes
      ORDER BY created_at DESC
    `);

    return contacts.map(contact => ({
      ...contact,
      notes: notes.filter(note => note.contact_id === contact.id)
    }));
  } catch (error) {
    logger.error('Error fetching contacts:', { error });
    throw error;
  }
}

export async function createContact(contactData) {
  try {
    const {
      name,
      phone,
      email,
      preferred_date,
      preferred_time,
      status = 'new'
    } = contactData;

    const result = await db.run(`
      INSERT INTO contacts (
        name, phone, email, preferred_date, preferred_time,
        status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [
      name, phone, email, preferred_date, preferred_time,
      status
    ]);

    return result;
  } catch (error) {
    logger.error('Error creating contact:', { error });
    throw error;
  }
}

export async function updateContact(id, contactData) {
  try {
    const allowedFields = ['name', 'phone', 'email', 'preferred_date', 'preferred_time', 'status'];
    
    const fields = Object.keys(contactData)
      .filter(key => allowedFields.includes(key) && contactData[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = Object.keys(contactData)
      .filter(key => allowedFields.includes(key) && contactData[key] !== undefined)
      .map(key => contactData[key]);

    const result = await db.run(`
      UPDATE contacts
      SET ${fields}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [...values, id]);

    return result;
  } catch (error) {
    logger.error('Error updating contact:', { error });
    throw error;
  }
}

export async function deleteContact(id) {
  try {
    await db.run('BEGIN TRANSACTION');
    
    await db.run('DELETE FROM contact_notes WHERE contact_id = ?', [id]);
    const result = await db.run('DELETE FROM contacts WHERE id = ?', [id]);
    
    await db.run('COMMIT');
    return result;
  } catch (error) {
    await db.run('ROLLBACK');
    logger.error('Error deleting contact:', { error });
    throw error;
  }
}