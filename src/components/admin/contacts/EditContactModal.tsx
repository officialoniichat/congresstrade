import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Contact } from '../../../types/contact';

interface EditContactModalProps {
  contact: Contact;
  onClose: () => void;
  onSave: (updatedContact: Contact) => Promise<void>;
}

export default function EditContactModal({
  contact,
  onClose,
  onSave
}: EditContactModalProps) {
  const [formData, setFormData] = useState<Partial<Contact>>({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    preferred_date: contact.preferred_date,
    preferred_time: contact.preferred_time,
    investment_capacity: contact.investment_capacity,
    risk_tolerance: contact.risk_tolerance,
    experience_level: contact.experience_level,
    time_horizon: contact.time_horizon,
    preferred_package: contact.preferred_package,
    potential_value: contact.potential_value,
    conversion_probability: contact.conversion_probability,
    next_follow_up: contact.next_follow_up
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSave({
        ...contact,
        ...formData
      });
      onClose();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Fehler beim Aktualisieren des Kontakts');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-900">
            Kontakt bearbeiten
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nächstes Follow-up
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.next_follow_up || ''}
                onChange={(e) => setFormData({ ...formData, next_follow_up: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment-Kapazität (€)
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.investment_capacity || ''}
                onChange={(e) => setFormData({ ...formData, investment_capacity: e.target.value })}
              >
                <option value="">Bitte wählen</option>
                <option value="low">Bis 10.000€</option>
                <option value="medium">10.000€ - 50.000€</option>
                <option value="high">Über 50.000€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risikobereitschaft
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.risk_tolerance || ''}
                onChange={(e) => setFormData({ ...formData, risk_tolerance: e.target.value })}
              >
                <option value="">Bitte wählen</option>
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Erfahrungslevel
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.experience_level || ''}
                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              >
                <option value="">Bitte wählen</option>
                <option value="beginner">Anfänger</option>
                <option value="intermediate">Fortgeschritten</option>
                <option value="expert">Experte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anlagehorizont
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                value={formData.time_horizon || ''}
                onChange={(e) => setFormData({ ...formData, time_horizon: e.target.value })}
              >
                <option value="">Bitte wählen</option>
                <option value="short">Kurzfristig (unter 1 Jahr)</option>
                <option value="medium">Mittelfristig (1-3 Jahre)</option>
                <option value="long">Langfristig (über 3 Jahre)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                'Speichern'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}