import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Contact } from '../../../types/contact';
import { useContacts } from '../../../hooks/useContacts';

interface NotesModalProps {
  contact: Contact;
  onClose: () => void;
  onSave: () => void;
}

export default function NotesModal({ contact, onClose, onSave }: NotesModalProps) {
  const [newNote, setNewNote] = useState('');
  const { addNote, deleteNote, error } = useContacts();

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      await addNote(contact.id, newNote);
      setNewNote('');
      onSave();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!window.confirm('Möchten Sie diese Notiz wirklich löschen?')) {
      return;
    }

    try {
      await deleteNote(contact.id, noteId);
      onSave();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-900">
            Notizen für {contact.name}
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

        <div className="space-y-4">
          {/* Existing Notes */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {contact.notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-navy-900">{note.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(note.timestamp).toLocaleString('de-DE')}
                    </span>
                    <button
                      onClick={() => note.id && handleDeleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{note.text}</p>
              </div>
            ))}
          </div>

          {/* Add New Note */}
          <div className="border-t pt-4">
            <textarea
              rows={3}
              placeholder="Neue Notiz hinzufügen..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
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