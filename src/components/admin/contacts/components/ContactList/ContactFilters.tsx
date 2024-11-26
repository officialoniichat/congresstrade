import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ContactFilters as ContactFiltersType } from '../../types';

interface ContactFiltersProps {
  filters: ContactFiltersType;
  onFilterChange: (filters: Partial<ContactFiltersType>) => void;
  className?: string;
}

export default function ContactFilterBar({ filters, onFilterChange, className = '' }: ContactFiltersProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Suchen..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="text-gray-400 h-5 w-5" />
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
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
          value={filters.dateRange}
          onChange={(e) => onFilterChange({ dateRange: e.target.value })}
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