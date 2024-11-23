import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';

interface AddNoteModalProps {
  contactId: number;
  onClose: () => void;
  onSave: () => void;
}

export default function AddNoteModal({ contactId, onClose, onSave }: AddNoteModalProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchApi } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetchApi(`/contacts/${contactId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text, author: 'Admin' })
      });
      onSave();
    } catch (err) {
      console.error('Error adding note:', err);
      alert('Fehler beim Hinzufügen der Notiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-navy-100 p-2 rounded-lg">
              <MessageSquare className="h-6 w-6 text-navy-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-900">Neue Notiz</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Schließen"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notiz
            </label>
            <textarea
              rows={4}
              placeholder="Ihre Notiz..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gespeichert...' : 'Notiz speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}