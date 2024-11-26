import React, { useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { Contact } from '../../types';
import { validateContact } from '../../utils/validation';

interface ContactInfoProps {
  contact: Contact;
  onUpdate: () => void;
}

export default function ContactInfo({ contact, onUpdate }: ContactInfoProps) {
  const [formData, setFormData] = useState(contact);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateContact } = useContacts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateContact(formData);
    
    if (!isValid) {
      // Handle validation errors
      return;
    }

    setIsSubmitting(true);
    try {
      await updateContact(contact.id, formData);
      onUpdate();
    } catch (err) {
      console.error('Error updating contact:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            Investment-Kapazität
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
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Speichern...' : 'Speichern'}
        </button>
      </div>
    </form>
  );
}