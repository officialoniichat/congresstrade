import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import SettingsCard from './SettingsCard';

export default function NotificationSettings() {
  const { fetchApi } = useApi();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    notifications: {
      newLead: true,
      leadStatusChange: true,
      followUpReminder: true,
      dailyReport: true,
      weeklyReport: true
    },
    reminders: {
      followUpDays: 3,
      reminderTime: '09:00'
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await fetchApi('/settings/notifications', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      // Show success message
    } catch (err) {
      setError('Fehler beim Speichern der Einstellungen');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard
      title="Benachrichtigungen"
      icon={Bell}
      error={error}
      actions={
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          Speichern
        </button>
      }
    >
      <div className="space-y-6">
        {/* Notification Types */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Benachrichtigungen aktivieren</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.notifications.newLead}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    newLead: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Neue Leads</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.notifications.leadStatusChange}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    leadStatusChange: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Statusänderungen</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.notifications.followUpReminder}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    followUpReminder: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Follow-up Erinnerungen</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.notifications.dailyReport}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    dailyReport: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Täglicher Report</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.notifications.weeklyReport}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    weeklyReport: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Wöchentlicher Report</span>
            </label>
          </div>
        </div>

        {/* Reminder Settings */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Erinnerungen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up nach (Tage)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.reminders.followUpDays}
                onChange={(e) => setSettings({
                  ...settings,
                  reminders: {
                    ...settings.reminders,
                    followUpDays: parseInt(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Erinnerungszeit
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.reminders.reminderTime}
                onChange={(e) => setSettings({
                  ...settings,
                  reminders: {
                    ...settings.reminders,
                    reminderTime: e.target.value
                  }
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}