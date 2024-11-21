import React, { useState } from 'react';
import { Users, Save } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import SettingsCard from './SettingsCard';

export default function LeadSettings() {
  const { fetchApi } = useApi();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    autoAssignment: {
      enabled: true,
      method: 'round-robin', // 'round-robin', 'workload', 'random'
      maxLeadsPerAgent: 20
    },
    qualification: {
      minInvestmentCapacity: 10000,
      preferredRiskTolerance: ['moderate', 'aggressive'],
      minTimeHorizon: 'medium'
    },
    followUp: {
      maxAttempts: 3,
      daysUntilInactive: 30
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await fetchApi('/settings/leads', {
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
      title="Lead Management"
      icon={Users}
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
        {/* Auto Assignment */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Automatische Zuweisung</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gold-500 rounded focus:ring-gold-500"
                checked={settings.autoAssignment.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  autoAssignment: {
                    ...settings.autoAssignment,
                    enabled: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Automatische Zuweisung aktivieren</span>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zuweisungsmethode
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={settings.autoAssignment.method}
                  onChange={(e) => setSettings({
                    ...settings,
                    autoAssignment: {
                      ...settings.autoAssignment,
                      method: e.target.value
                    }
                  })}
                >
                  <option value="round-robin">Round Robin</option>
                  <option value="workload">Nach Auslastung</option>
                  <option value="random">Zufällig</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max. Leads pro Agent
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={settings.autoAssignment.maxLeadsPerAgent}
                  onChange={(e) => setSettings({
                    ...settings,
                    autoAssignment: {
                      ...settings.autoAssignment,
                      maxLeadsPerAgent: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Criteria */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Qualifizierungskriterien</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Investment Kapazität (€)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.qualification.minInvestmentCapacity}
                onChange={(e) => setSettings({
                  ...settings,
                  qualification: {
                    ...settings.qualification,
                    minInvestmentCapacity: parseInt(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Anlagehorizont
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.qualification.minTimeHorizon}
                onChange={(e) => setSettings({
                  ...settings,
                  qualification: {
                    ...settings.qualification,
                    minTimeHorizon: e.target.value
                  }
                })}
              >
                <option value="short">Kurzfristig</option>
                <option value="medium">Mittelfristig</option>
                <option value="long">Langfristig</option>
              </select>
            </div>
          </div>
        </div>

        {/* Follow-up Settings */}
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Follow-up Einstellungen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max. Follow-up Versuche
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.followUp.maxAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  followUp: {
                    ...settings.followUp,
                    maxAttempts: parseInt(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tage bis inaktiv
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={settings.followUp.daysUntilInactive}
                onChange={(e) => setSettings({
                  ...settings,
                  followUp: {
                    ...settings.followUp,
                    daysUntilInactive: parseInt(e.target.value)
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