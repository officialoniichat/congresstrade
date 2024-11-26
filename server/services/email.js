import nodemailer from 'nodemailer';
import db from '../database/init.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'default@example.com',
    pass: process.env.SMTP_PASS || 'default-password'
  }
});

export async function sendEmail(to, subject, text) {
  // Skip if SMTP is not configured
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'default@example.com') {
    console.log('SMTP not configured, skipping email');
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: '"CongressTrade" <info@congresstrade.de>',
      to,
      subject,
      text
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error to prevent blocking the main flow
    return null;
  }
}

export async function getEmailSettings() {
  try {
    const settings = await db.get('SELECT * FROM email_settings LIMIT 1');
    return settings || {
      smtp_host: 'smtp.gmail.com',
      smtp_port: 587,
      smtp_user: 'default@example.com',
      smtp_pass: 'default-password',
      sender_name: 'CongressTrade',
      sender_email: 'info@congresstrade.de'
    };
  } catch (error) {
    console.error('Error fetching email settings:', error);
    throw error;
  }
}