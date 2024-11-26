import React from 'react';
import AdminHeader from '../common/AdminHeader';
import EmailSettings from './EmailSettings';

export default function SettingsPage() {
  return (
    <div>
      <AdminHeader
        title="SMTP Einstellungen"
        subtitle="Konfigurieren Sie die E-Mail-Versand-Einstellungen"
      />

      <div className="space-y-8">
        <EmailSettings />
      </div>
    </div>
  );
}