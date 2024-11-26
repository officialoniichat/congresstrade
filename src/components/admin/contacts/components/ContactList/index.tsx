import React, { useState, useEffect } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { useContactFilters } from '../../hooks/useContactFilters';
import ContactRow from './ContactRow';
import ContactFilterBar from './ContactFilters';
import { Contact } from '../../types';
import { AlertCircle } from 'lucide-react';

export default function ContactList() {
  const { getContacts, error, isLoading } = useContacts();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { filters, updateFilters, filteredContacts } = useContactFilters(contacts);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <ContactFilterBar
        filters={filters}
        onFilterChange={updateFilters}
        className="mb-6"
      />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontakt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Termin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onRefresh={loadContacts}
              />
            ))}
            {filteredContacts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Keine Kontakte gefunden
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}