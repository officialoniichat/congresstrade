import React from 'react';
import { X } from 'lucide-react';
import FomoDisclaimer from '../FomoDisclaimer';
import { FormHeaderProps } from './types';

export default function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
        {title}
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        {subtitle}
      </p>
      
      <FomoDisclaimer className="mb-6" />
    </div>
  );
}