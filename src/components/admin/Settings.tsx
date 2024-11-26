import React, { useState } from 'react';
import { Save, Bell, Shield, Mail, DollarSign } from 'lucide-react';

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface LeadSetting {
  id: string;
  name: string;
  value: string | number;
}

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-lead',
      name: 'Neue Leads',
      description: 'Benachrichtigung bei neuen Kontaktanfragen',
      enabled: true
    },
    {
      id: 'follow-up',
      name: 'Follow-up Erinnerungen',
      description: 'Erinnerungen für ausstehende Follow-ups',
      enabled: true
    },
    {
      id: 'status-change',
      name: 'Statusänderungen',
      description: 'Benachrichtigung bei Änderungen des Lead-Status',
      enabled: false
    }
  ]);

  const [leadSettings, setLeadSettings] = useState<LeadSetting[]>([
    {
      id: 'auto-assign',
      name: 'Automatische Zuweisung',
      value: 'round-robin'
    },
    {
      id: 'follow-up-days',
      name: 'Follow-up Tage',
      value: 3
    },
    {
      id: 'min-potential',
      name: 'Minimales Potenzial (€)',
      value: 10000
    }
  ]);

  const [emailSettings, setEmailSettings] = useState({
    senderName: 'CongressTrade Team',
    senderEmail: 'info@congresstrade.de',
    signature: 'Mit freundlichen Grüßen\nIhr CongressTrade Team',
    templates: {
      welcome: 'Willkommen bei CongressTrade...',
      followUp: 'Vielen Dank für Ihr Interesse...',
      consultation: 'Ihre Beratung ist bestätigt...'
    }
  });

  const handleNotificationToggle = (id: string) => {
    setNotificationSettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleLeadSettingChange = (id: string, value: string | number) => {
    setLeadSettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };

  const handleEmailSettingChange = (key: string, value: string) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTemplateChange = (key: string, value: string) => {
    setEmailSettings(prev => ({
      ...prev,
      templates: {
        ...prev.templates,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving settings:', {
      notifications: notificationSettings,
      leads: leadSettings,
      email: emailSettings
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Einstellungen</h1>
        <button
          onClick={handleSave}
          className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Speichern
        </button>
      </div>

      <div className="space-y-8">
        {/* Notification Settings */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-navy-900">Benachrichtigungen</h2>
          </div>
          
          <div className="space-y-4">
            {notificationSettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-navy-900">{setting.name}</div>
                  <div className="text-sm text-gray-500">{setting.description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={setting.enabled}
                    onChange={() => handleNotificationToggle(setting.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Management Settings */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-navy-900">Lead Management</h2>
          </div>
          
          <div className="space-y-4">
            {leadSettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <label className="font-medium text-navy-900">{setting.name}</label>
                {typeof setting.value === 'number' ? (
                  <input
                    type="number"
                    className="w-32 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    value={setting.value}
                    onChange={(e) => handleLeadSettingChange(setting.id, parseInt(e.target.value))}
                  />
                ) : (
                  <select
                    className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    value={setting.value}
                    onChange={(e) => handleLeadSettingChange(setting.id, e.target.value)}
                  >
                    <option value="round-robin">Round Robin</option>
                    <option value="manual">Manuell</option>
                    <option value="workload">Nach Auslastung</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Email Settings */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-navy-900">E-Mail Einstellungen</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Absender Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={emailSettings.senderName}
                  onChange={(e) => handleEmailSettingChange('senderName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Absender E-Mail
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={emailSettings.senderEmail}
                  onChange={(e) => handleEmailSettingChange('senderEmail', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail Signatur
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={emailSettings.signature}
                onChange={(e) => handleEmailSettingChange('signature', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-navy-900">E-Mail Vorlagen</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Willkommens-E-Mail
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={emailSettings.templates.welcome}
                  onChange={(e) => handleTemplateChange('welcome', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up E-Mail
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={emailSettings.templates.followUp}
                  onChange={(e) => handleTemplateChange('followUp', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beratungsbestätigung
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={emailSettings.templates.consultation}
                  onChange={(e) => handleTemplateChange('consultation', e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}