import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Inhalt
      </label>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-300 p-2">
          {/* TODO: Add formatting toolbar */}
        </div>
        <textarea
          required
          rows={20}
          className="w-full px-4 py-2 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 border-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}