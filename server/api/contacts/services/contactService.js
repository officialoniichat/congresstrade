import db from '../../../database/init.js';

export async function createContact(contactData) {
  const {
    name,
    phone,
    email,
    preferred_date,
    preferred_time,
    status = 'new'
  } = contactData;

  return await db.run(`
    INSERT INTO contacts (
      name, phone, email, preferred_date, preferred_time,
      status, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `, [
    name, phone, email, preferred_date, preferred_time,
    status
  ]);
}

export async function getContacts() {
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
}

export async function updateContact(id, contactData) {
  const allowedFields = ['name', 'phone', 'email', 'preferred_date', 'preferred_time', 'status'];
  
  const fields = Object.keys(contactData)
    .filter(key => allowedFields.includes(key) && contactData[key] !== undefined)
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.keys(contactData)
    .filter(key => allowedFields.includes(key) && contactData[key] !== undefined)
    .map(key => contactData[key]);

  return await db.run(`
    UPDATE contacts
    SET ${fields}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [...values, id]);
}

export async function deleteContact(id) {
  await db.run('BEGIN TRANSACTION');
  
  try {
    await db.run('DELETE FROM contact_notes WHERE contact_id = ?', [id]);
    const result = await db.run('DELETE FROM contacts WHERE id = ?', [id]);
    
    await db.run('COMMIT');
    return result;
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}

export async function updateContactStatus(id, status) {
  return await db.run(`
    UPDATE contacts
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [status, id]);
}