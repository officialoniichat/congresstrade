import React from 'react';
import AdminHeader from '../common/AdminHeader';
import EmailSettings from './EmailSettings';
import NotificationSettings from './NotificationSettings';
import LeadSettings from './LeadSettings';
import SecuritySettings from './SecuritySettings';

export default function SettingsPage() {
  return (
    <div>
      <AdminHeader
        title="Einstellungen"
        subtitle="Konfigurieren Sie das System nach Ihren Bedürfnissen"
      />

      <div className="space-y-8">
        <EmailSettings />
        <NotificationSettings />
        <LeadSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}