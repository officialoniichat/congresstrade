import nodemailer from 'nodemailer';
import db from '../database/init.js';

const DEFAULT_TEMPLATES = {
  welcome: {
    subject: 'Willkommen bei CongressTrade',
    body: `Sehr geehrte/r {name},

Vielen Dank für Ihr Interesse an CongressTrade. Wir freuen uns, Sie als neuen Interessenten begrüßen zu dürfen.

Ihr Beratungstermin ist für den {date} um {time} Uhr geplant.

Mit freundlichen Grüßen
Ihr CongressTrade Team`
  },
  consultation: {
    subject: 'Ihre Beratung bei CongressTrade',
    body: `Sehr geehrte/r {name},

Hiermit bestätigen wir Ihren Beratungstermin am {date} um {time} Uhr.

Wir werden Sie unter der angegebenen Telefonnummer {phone} kontaktieren.

Mit freundlichen Grüßen
Ihr CongressTrade Team`
  }
};

function isValidSmtpConfig(config) {
  return (
    config.host && 
    config.port && 
    config.auth?.user && 
    config.auth?.pass &&
    config.auth.user !== 'default@example.com' && 
    config.auth.pass !== 'default-password'
  );
}

async function getEmailSettings() {
  try {
    const smtp = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'default@example.com',
        pass: process.env.SMTP_PASS || 'default-password'
      }
    };

    // Skip if SMTP is not properly configured
    if (!isValidSmtpConfig(smtp)) {
      console.log('SMTP not configured, skipping email service');
      return null;
    }

    return {
      smtp,
      sender: {
        name: 'CongressTrade',
        email: 'info@congresstrade.com'
      }
    };
  } catch (error) {
    console.error('Error getting email settings:', error);
    return null;
  }
}

async function createTransporter() {
  try {
    const settings = await getEmailSettings();
    if (!settings) return null;
    return nodemailer.createTransport(settings.smtp);
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
}

export async function sendEmail(data) {
  try {
    if (!data.email) return; // Skip if no email provided

    const settings = await getEmailSettings();
    if (!settings) return; // Skip if SMTP not configured

    const transporter = await createTransporter();
    if (!transporter) return; // Skip if transporter creation failed

    const template = DEFAULT_TEMPLATES.welcome;

    // Format date for email
    const formattedDate = new Date(data.preferred_date).toLocaleDateString('de-DE');

    // Replace placeholders in template
    const text = template.body
      .replace('{name}', data.name)
      .replace('{date}', formattedDate)
      .replace('{time}', data.preferred_time)
      .replace('{phone}', data.phone || '');

    const mailOptions = {
      from: `"${settings.sender.name}" <${settings.sender.email}>`,
      to: data.email,
      subject: template.subject,
      text: text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error to prevent blocking the contact creation
    return null;
  }
}

export async function sendConsultationEmail(data) {
  try {
    if (!data.email) return;

    const settings = await getEmailSettings();
    if (!settings) return; // Skip if SMTP not configured

    const transporter = await createTransporter();
    if (!transporter) return; // Skip if transporter creation failed

    const template = DEFAULT_TEMPLATES.consultation;

    const formattedDate = new Date(data.preferred_date).toLocaleDateString('de-DE');

    const text = template.body
      .replace('{name}', data.name)
      .replace('{date}', formattedDate)
      .replace('{time}', data.preferred_time)
      .replace('{phone}', data.phone || '');

    const mailOptions = {
      from: `"${settings.sender.name}" <${settings.sender.email}>`,
      to: data.email,
      subject: template.subject,
      text: text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Consultation email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending consultation email:', error);
    // Don't throw error to prevent blocking the contact creation
    return null;
  }
}