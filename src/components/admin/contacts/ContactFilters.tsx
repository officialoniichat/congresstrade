import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Contact } from '../../../types/contact';

interface ContactFiltersProps {
  contacts: Contact[];
  onFilter: (filtered: Contact[]) => void;
  className?: string;
}

export default function ContactFilters({ contacts, onFilter, className = '' }: ContactFiltersProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    let filtered = [...contacts];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email?.toLowerCase().includes(searchLower) ||
        contact.phone.includes(search)
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(contact => contact.status === status);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const days = dateRange === 'today' ? 1 : dateRange === 'week' ? 7 : 30;
      const cutoff = new Date(now.setDate(now.getDate() - days));
      
      filtered = filtered.filter(contact => 
        new Date(contact.created_at) >= cutoff
      );
    }

    onFilter(filtered);
  }, [search, status, dateRange, contacts]);

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="text-gray-400 h-5 w-5" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
        >
          <option value="all">Alle Status</option>
          <option value="new">Neu</option>
          <option value="contacted">Kontaktiert</option>
          <option value="qualified">Qualifiziert</option>
          <option value="converted">Konvertiert</option>
          <option value="lost">Verloren</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
        >
          <option value="all">Alle Zeiträume</option>
          <option value="today">Heute</option>
          <option value="week">Letzte 7 Tage</option>
          <option value="month">Letzter Monat</option>
        </select>
      </div>
    </div>
  );
}