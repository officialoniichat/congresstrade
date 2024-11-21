import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Contact } from '../../../types/contact';

interface ContactNotesProps {
  contact: Contact;
  onClose: () => void;
  onAddNote: (contactId: number, text: string) => Promise<void>;
  onDeleteNote: (contactId: number, noteId: number) => Promise<void>;
}

export default function ContactNotes({
  contact,
  onClose,
  onAddNote,
  onDeleteNote
}: ContactNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddNote(contact.id, newNote.trim());
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!window.confirm('Möchten Sie diese Notiz wirklich löschen?')) return;

    try {
      await onDeleteNote(contact.id, noteId);
    } catch (error) {
      console.error('Error deleting note:', error);
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

        <div className="space-y-4">
          {/* Existing Notes */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {contact.notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-4 rounded-lg relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-navy-900">{note.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(note.timestamp).toLocaleString('de-DE')}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{note.text}</p>
              </div>
            ))}
            {contact.notes.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                Keine Notizen vorhanden
              </p>
            )}
          </div>

          {/* Add New Note */}
          <form onSubmit={handleSubmit} className="border-t pt-4">
            <textarea
              rows={3}
              placeholder="Neue Notiz hinzufügen..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting || !newNote.trim()}
                className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Notiz hinzufügen
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}