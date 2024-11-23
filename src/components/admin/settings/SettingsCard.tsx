import React from 'react';
import { AlertCircle, LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  error?: string | null;
  actions?: React.ReactNode;
}

export default function SettingsCard({ title, icon: Icon, children, error, actions }: SettingsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-navy-100 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-navy-600" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">{title}</h2>
        </div>
        {actions}
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {children}
    </div>
  );
}