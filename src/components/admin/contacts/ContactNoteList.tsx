import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { ContactNote } from '../../../types/contact';

interface ContactNoteListProps {
  notes: ContactNote[];
  contactId: number;
  onDeleteNote: (contactId: number, noteId: number) => void;
}

export default function ContactNoteList({ notes, contactId, onDeleteNote }: ContactNoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Keine Notizen vorhanden</p>
        <p className="text-sm mt-1">Klicken Sie auf "Neue Notiz" um eine Notiz hinzuzufügen</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="bg-gray-50 p-4 rounded-lg group relative hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-navy-900">{note.author}</span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(note.timestamp).toLocaleString('de-DE')}
              </span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Möchten Sie diese Notiz wirklich löschen?')) {
                  onDeleteNote(contactId, note.id);
                }
              }}
              className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="Notiz löschen"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{note.text}</p>
        </div>
      ))}
    </div>
  );
}