import db from '../database/init.js';

export async function getEmailSettings() {
  const settings = await db.query('SELECT key, value FROM settings WHERE key LIKE "smtp.%" OR key LIKE "email.%"');
  
  // Transform flat settings into structured object
  const structured = {
    smtp: {},
    sender: {},
    templates: {
      welcome: {}
    }
  };

  settings.forEach(({ key, value }) => {
    if (key.startsWith('smtp.')) {
      const smtpKey = key.replace('smtp.', '');
      structured.smtp[smtpKey] = value === 'true' ? true : 
                                value === 'false' ? false : 
                                /^\d+$/.test(value) ? parseInt(value) : value;
    } else if (key.startsWith('email.sender.')) {
      const senderKey = key.replace('email.sender.', '');
      structured.sender[senderKey] = value;
    } else if (key.startsWith('email.template.')) {
      const [, templateName, field] = key.replace('email.template.', '').split('.');
      if (!structured.templates[templateName]) {
        structured.templates[templateName] = {};
      }
      structured.templates[templateName][field] = value;
    }
  });

  return structured;
}

export async function updateEmailSettings(settings) {
  const updates = [];

  // Flatten structured object into key-value pairs
  if (settings.smtp) {
    Object.entries(settings.smtp).forEach(([key, value]) => {
      updates.push(['smtp.' + key, value.toString()]);
    });
  }

  if (settings.sender) {
    Object.entries(settings.sender).forEach(([key, value]) => {
      updates.push(['email.sender.' + key, value]);
    });
  }

  if (settings.templates) {
    Object.entries(settings.templates).forEach(([templateName, template]) => {
      Object.entries(template).forEach(([field, value]) => {
        updates.push([`email.template.${templateName}.${field}`, value]);
      });
    });
  }

  // Update all settings in a transaction
  await db.run('BEGIN TRANSACTION');
  try {
    for (const [key, value] of updates) {
      await db.run(`
        UPDATE settings 
        SET value = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE key = ?
      `, [value, key]);
    }
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}