import React from 'react';
import { FormInputProps } from './types';

export default function FormInput({
  label,
  type,
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  placeholder
}: FormInputProps) {
  return (
    <div>
      <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
        <Icon className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
        {label}
      </label>
      <input
        type={type}
        required={required}
        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 rounded-xl focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}