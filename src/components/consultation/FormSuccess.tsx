import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FormSuccessProps } from './types';

export default function FormSuccess({ onClose }: FormSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-navy-900 mb-4">
          Vielen Dank!
        </h2>
        <p className="text-gray-600 mb-6">
          Ihre Anfrage wurde erfolgreich übermittelt. Wir werden Sie schnellstmöglich kontaktieren.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-navy-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-colors"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}