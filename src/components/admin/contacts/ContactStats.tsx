import React from 'react';
import { Users, TrendingUp, UserCheck, XCircle } from 'lucide-react';
import { ContactSubmission } from '../../../types/contact';

interface ContactStatsProps {
  contacts: ContactSubmission[];
}

export default function ContactStats({ contacts }: ContactStatsProps) {
  const stats = {
    total: contacts.length,
    qualified: contacts.filter(c => c.status === 'qualified').length,
    converted: contacts.filter(c => c.status === 'converted').length,
    conversionRate: contacts.length > 0 
      ? ((contacts.filter(c => c.status === 'converted').length / contacts.length) * 100).toFixed(1)
      : '0'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Gesamt Kontakte</p>
            <p className="text-2xl font-bold text-navy-900">{stats.total}</p>
          </div>
          <Users className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Qualifiziert</p>
            <p className="text-2xl font-bold text-navy-900">{stats.qualified}</p>
          </div>
          <UserCheck className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Konvertiert</p>
            <p className="text-2xl font-bold text-navy-900">{stats.converted}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Konversionsrate</p>
            <p className="text-2xl font-bold text-navy-900">{stats.conversionRate}%</p>
          </div>
          <XCircle className="h-8 w-8 text-gold-500" />
        </div>
      </div>
    </div>
  );
}