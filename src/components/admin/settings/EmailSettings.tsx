import React, { useState } from 'react';
import { Mail, Save, TestTube } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import SettingsCard from './SettingsCard';

export default function EmailSettings() {
  const { fetchApi } = useApi();
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingSMTP, setIsTestingSMTP] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    smtp: {
      host: 'smtp.gmail.com',
      port: '587',
      secure: true,
      username: '',
      password: '',
    },
    sender: {
      name: 'CongressTrade Team',
      email: 'info@congresstrade.com',
    },
    templates: {
      welcome: {
        subject: 'Willkommen bei CongressTrade',
        body: `Sehr geehrte/r {name},

vielen Dank für Ihr Interesse an CongressTrade. Wir freuen uns, Sie als neuen Interessenten begrüßen zu dürfen.

Ihr Beratungstermin ist für den {date} um {time} Uhr geplant.

Mit freundlichen Grüßen
Ihr CongressTrade Team`
      },
      consultation: {
        subject: 'Ihre Beratung bei CongressTrade',
        body: `Sehr geehrte/r {name},

hiermit bestätigen wir Ihren Beratungstermin am {date} um {time} Uhr.

Wir werden Sie unter der angegebenen Telefonnummer {phone} kontaktieren.

Mit freundlichen Grüßen
Ihr CongressTrade Team`
      },
      followUp: {
        subject: 'Ihr Interesse an CongressTrade',
        body: `Sehr geehrte/r {name},

vielen Dank für das interessante Gespräch. Wie besprochen sende ich Ihnen hier die wichtigsten Informationen zu unseren Services.

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen
Ihr CongressTrade Team`
      }
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await fetchApi('/settings/email', {
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

  const handleTestSMTP = async () => {
    setIsTestingSMTP(true);
    setError(null);

    try {
      await fetchApi('/settings/email/test', {
        method: 'POST',
        body: JSON.stringify(settings.smtp)
      });
      alert('SMTP Test erfolgreich!');
    } catch (err) {
      setError('SMTP Test fehlgeschlagen');
    } finally {
      setIsTestingSMTP(false);
    }
  };

  return (
    <SettingsCard
      title="E-Mail Einstellungen"
      icon={Mail}
      error={error}
      actions={
        <div className="flex gap-3">
          <button
            onClick={handleTestSMTP}
            disabled={isTestingSMTP}
            className="flex items-center px-4 py-2 text-navy-900 bg-white border border-navy-900 rounded-lg hover:bg-navy-50 transition-colors disabled:opacity-50"
          >
            <TestTube className="h-5 w-5 mr-2" />
            SMTP Test
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            Speichern
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* SMTP Settings */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">SMTP Server</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Host
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.smtp.host}
                onChange={(e) => setSettings({
                  ...settings,
                  smtp: { ...settings.smtp, host: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Port
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.smtp.port}
                onChange={(e) => setSettings({
                  ...settings,
                  smtp: { ...settings.smtp, port: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benutzername
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.smtp.username}
                onChange={(e) => setSettings({
                  ...settings,
                  smtp: { ...settings.smtp, username: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.smtp.password}
                onChange={(e) => setSettings({
                  ...settings,
                  smtp: { ...settings.smtp, password: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Sender Settings */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Absender</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Absender Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.sender.name}
                onChange={(e) => setSettings({
                  ...settings,
                  sender: { ...settings.sender, name: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Absender E-Mail
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.sender.email}
                onChange={(e) => setSettings({
                  ...settings,
                  sender: { ...settings.sender, email: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">E-Mail Vorlagen</h3>
          
          {/* Welcome Email */}
          <div className="mb-6">
            <h4 className="font-medium text-navy-900 mb-2">Willkommens-E-Mail</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Betreff"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.welcome.subject}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    welcome: {
                      ...settings.templates.welcome,
                      subject: e.target.value
                    }
                  }
                })}
              />
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.welcome.body}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    welcome: {
                      ...settings.templates.welcome,
                      body: e.target.value
                    }
                  }
                })}
              />
            </div>
          </div>

          {/* Consultation Email */}
          <div className="mb-6">
            <h4 className="font-medium text-navy-900 mb-2">Beratungsbestätigung</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Betreff"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.consultation.subject}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    consultation: {
                      ...settings.templates.consultation,
                      subject: e.target.value
                    }
                  }
                })}
              />
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.consultation.body}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    consultation: {
                      ...settings.templates.consultation,
                      body: e.target.value
                    }
                  }
                })}
              />
            </div>
          </div>

          {/* Follow-up Email */}
          <div>
            <h4 className="font-medium text-navy-900 mb-2">Follow-up E-Mail</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Betreff"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.followUp.subject}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    followUp: {
                      ...settings.templates.followUp,
                      subject: e.target.value
                    }
                  }
                })}
              />
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.templates.followUp.body}
                onChange={(e) => setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    followUp: {
                      ...settings.templates.followUp,
                      body: e.target.value
                    }
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