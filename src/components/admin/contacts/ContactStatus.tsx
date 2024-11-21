import React from 'react';

interface ContactStatusProps {
  status: string;
  onChange: (status: string) => void;
}

export default function ContactStatus({ status, onChange }: ContactStatusProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      new: 'Neu',
      contacted: 'Kontaktiert',
      qualified: 'Qualifiziert',
      converted: 'Konvertiert',
      lost: 'Verloren'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm rounded-full px-2.5 py-0.5 ${getStatusColor(status)} border-0 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-navy-500`}
    >
      <option value="new">{getStatusLabel('new')}</option>
      <option value="contacted">{getStatusLabel('contacted')}</option>
      <option value="qualified">{getStatusLabel('qualified')}</option>
      <option value="converted">{getStatusLabel('converted')}</option>
      <option value="lost">{getStatusLabel('lost')}</option>
    </select>
  );
}