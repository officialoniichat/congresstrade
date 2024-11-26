import React, { useState } from 'react';
import { Shield, Save } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import SettingsCard from './SettingsCard';

export default function SecuritySettings() {
  const { fetchApi } = useApi();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    session: {
      timeout: 30, // minutes
      maxAttempts: 5,
      lockoutDuration: 15 // minutes
    },
    twoFactor: {
      enabled: false,
      method: 'email' // 'email', 'authenticator'
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await fetchApi('/settings/security', {
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
      title="Sicherheit"
      icon={Shield}
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
        {/* Session Settings */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Sitzungseinstellungen</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (Minuten)
              </label>
              <input
                type="number"
                min="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.session.timeout}
                onChange={(e) => setSettings({
                  ...settings,
                  session: {
                    ...settings.session,
                    timeout: parseInt(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max. Anmeldeversuche
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.session.maxAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  session: {
                    ...settings.session,
                    maxAttempts: parseInt(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sperrzeit (Minuten)
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.session.lockoutDuration}
                onChange={(e) => setSettings({
                  ...settings,
                  session: {
                    ...settings.session,
                    lockoutDuration: parseInt(e.target.value)
                  }
                })}
              />
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Zwei-Faktor-Authentifizierung</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.twoFactor.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  twoFactor: {
                    ...settings.twoFactor,
                    enabled: e.target.checked
                  }
                })}
              />
              <span className="ml-2">2FA aktivieren</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2FA Methode
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.twoFactor.method}
                onChange={(e) => setSettings({
                  ...settings,
                  twoFactor: {
                    ...settings.twoFactor,
                    method: e.target.value
                  }
                })}
                disabled={!settings.twoFactor.enabled}
              >
                <option value="email">E-Mail</option>
                <option value="authenticator">Authenticator App</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}