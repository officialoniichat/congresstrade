import nodemailer from 'nodemailer';
import db from '../database/init.js';

async function getEmailSettings() {
  try {
    const settings = await db.get('SELECT * FROM email_settings LIMIT 1');
    return settings || {
      smtp_host: 'smtp.gmail.com',
      smtp_port: 587,
      smtp_user: 'default@example.com',
      smtp_pass: 'default-password',
      sender_name: 'CongressTrade',
      sender_email: 'info@congresstrade.com'
    };
  } catch (error) {
    console.error('Error fetching email settings:', error);
    throw error;
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const settings = await getEmailSettings();
    
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host,
      port: settings.smtp_port,
      secure: settings.smtp_port === 465,
      auth: {
        user: settings.smtp_user,
        pass: settings.smtp_pass
      }
    });

    await transporter.sendMail({
      from: `"${settings.sender_name}" <${settings.sender_email}>`,
      to,
      subject,
      html
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}