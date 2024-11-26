import nodemailer from 'nodemailer';
import { config } from '../config/environment.js';
import { logger } from '../utils/logger.js';

let transporter = null;

function createTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });
  }
  return transporter;
}

export async function sendEmail(to, subject, text) {
  try {
    // Skip if SMTP is not configured
    if (!config.smtp.user) {
      logger.info('SMTP not configured, skipping email');
      return;
    }

    const mailer = createTransporter();
    
    const info = await mailer.sendMail({
      from: '"CongressTrade" <info@congresstrade.de>',
      to,
      subject,
      text
    });

    logger.info('Email sent successfully', { messageId: info.messageId });
    return info;
  } catch (error) {
    logger.error('Error sending email:', { error });
    // Don't throw error to prevent blocking the main flow
    return null;
  }
}

export async function getEmailSettings() {
  return {
    smtp: config.smtp,
    sender: {
      name: 'CongressTrade',
      email: 'info@congresstrade.de'
    }
  };
}