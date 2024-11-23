import React from 'react';
import { X, Plus, MessageSquare } from 'lucide-react';
import { ContactNote } from '../../../types/contact';
import ContactNoteList from './ContactNoteList';

interface ViewNotesModalProps {
  contactName: string;
  notes: ContactNote[];
  contactId: number;
  onClose: () => void;
  onDeleteNote: (contactId: number, noteId: number) => void;
  onAddNote: () => void;
}

export default function ViewNotesModal({
  contactName,
  notes,
  contactId,
  onClose,
  onDeleteNote,
  onAddNote
}: ViewNotesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-navy-100 p-2 rounded-lg">
              <MessageSquare className="h-6 w-6 text-navy-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">
                Notizen für {contactName}
              </h2>
              <p className="text-sm text-gray-500">
                {notes.length} {notes.length === 1 ? 'Notiz' : 'Notizen'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onAddNote}
              className="flex items-center px-3 py-1.5 text-sm bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Neue Notiz
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Schließen"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ContactNoteList
            notes={notes}
            contactId={contactId}
            onDeleteNote={onDeleteNote}
          />
        </div>
      </div>
    </div>
  );
}