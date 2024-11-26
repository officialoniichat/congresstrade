import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Contact } from '../../types';
import { useContacts } from '../../hooks/useContacts';
import { validateNote } from '../../utils/validation';

interface ContactNotesProps {
  contact: Contact;
  onUpdate: () => void;
}

export default function ContactNotes({ contact, onUpdate }: ContactNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNote, deleteNote } = useContacts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateNote(newNote);
    if (error) {
      // Handle validation error
      return;
    }

    setIsSubmitting(true);
    try {
      await addNote(contact.id, newNote);
      setNewNote('');
      onUpdate();
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (noteId: number) => {
    if (!window.confirm('Möchten Sie diese Notiz wirklich löschen?')) {
      return;
    }

    try {
      await deleteNote(contact.id, noteId);
      onUpdate();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {contact.notes.map((note) => (
          <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-navy-900">{note.author}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {new Date(note.timestamp).toLocaleString('de-DE')}
                </span>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <span className="sr-only">Delete</span>
                  ×
                </button>
              </div>
            </div>
            <p className="text-gray-700">{note.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={3}
          placeholder="Neue Notiz hinzufügen..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newNote.trim()}
            className="flex items-center px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            Notiz hinzufügen
          </button>
        </div>
      </form>
    </div>
  );
}