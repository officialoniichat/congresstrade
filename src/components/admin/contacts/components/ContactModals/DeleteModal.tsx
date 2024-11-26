import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Contact } from '../../types';
import { createPortal } from 'react-dom';

interface DeleteModalProps {
  contact: Contact;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteModal({ contact, onClose, onConfirm }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await onConfirm();
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Der Kontakt konnte nicht gelöscht werden. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">
            Kontakt löschen
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Sind Sie sicher, dass Sie den Kontakt <strong>{contact.name}</strong> löschen möchten? 
          Diese Aktion kann nicht rückgängig gemacht werden.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {isDeleting ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                Löschen...
              </>
            ) : (
              'Löschen'
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}