import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Contact } from '../../types';
import { useContacts } from '../../hooks/useContacts';
import ContactInfo from './ContactInfo';
import ContactNotes from './ContactNotes';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ContactDetails({ contact, onClose, onUpdate }: ContactDetailsProps) {
  const [activeTab, setActiveTab] = useState('info');
  const { error } = useContacts();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-900">
            {contact.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === 'info'
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Information
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === 'notes'
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            Notizen
          </button>
        </div>

        {activeTab === 'info' ? (
          <ContactInfo contact={contact} onUpdate={onUpdate} />
        ) : (
          <ContactNotes contact={contact} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
}