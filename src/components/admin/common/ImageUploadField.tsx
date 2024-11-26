import React from 'react';
import { Image } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bild URL
      </label>
      <div className="flex gap-4">
        <input
          type="url"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {value && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}