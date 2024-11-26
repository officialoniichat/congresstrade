import { useState, useEffect, useMemo } from 'react';
import { Contact } from '../types';

interface FilterOptions {
  search: string;
  status: string;
  dateRange: string;
  tags: string[];
}

export function useContactFilters(contacts: Contact[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    dateRange: 'all',
    tags: []
  });

  const filteredContacts = useMemo(() => {
    let result = [...contacts];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(contact => 
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email?.toLowerCase().includes(searchLower) ||
        contact.phone.includes(filters.search)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(contact => contact.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const days = filters.dateRange === 'today' ? 1 : 
                  filters.dateRange === 'week' ? 7 : 30;
      const cutoff = new Date(now.setDate(now.getDate() - days));
      
      result = result.filter(contact => 
        new Date(contact.created_at) >= cutoff
      );
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      result = result.filter(contact =>
        filters.tags.every(tag => contact.tags?.includes(tag))
      );
    }

    return result;
  }, [contacts, filters]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    updateFilters,
    filteredContacts
  };
}