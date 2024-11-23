import React, { useState } from 'react';
import { Contact } from '../../../types/contact';
import { X, Plus, Trash2 } from 'lucide-react';
import ContactStatus from './ContactStatus';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onAddNote: (contactId: number, note: string) => void;
  onDeleteNote: (contactId: number, noteId: number) => void;
  onStatusChange: (contactId: number, status: string) => void;
}

export default function ContactDetails({
  contact,
  onClose,
  onAddNote,
  onDeleteNote,
  onStatusChange
}: ContactDetailsProps) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(contact.id, newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-navy-900">
              {contact.name}
            </h2>
            <p className="text-gray-500">
              {contact.email || contact.phone}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <ContactStatus
            status={contact.status}
            onChange={(status) => onStatusChange(contact.id, status)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-navy-900">Notizen</h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {contact.notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-4 rounded-lg relative group">
                <button
                  onClick={() => onDeleteNote(contact.id, note.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-navy-900">{note.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(note.timestamp).toLocaleString('de-DE')}
                  </span>
                </div>
                <p className="text-gray-700">{note.text}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <textarea
              rows={3}
              placeholder="Neue Notiz hinzufügen..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddNote}
                className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Notiz hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}