import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { Contact } from '../../../types/contact';
import ContactFilters from './ContactFilters';
import ContactRow from './ContactRow';
import ContactDetails from './ContactDetails';
import { AlertCircle } from 'lucide-react';

export default function ContactList() {
  const { fetchApi } = useApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchApi('/contacts');
      if (Array.isArray(data)) {
        setContacts(data);
        setFilteredContacts(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Fehler beim Laden der Kontakte';
      setError(message);
      console.error('Error loading contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (contactId: number, newStatus: string) => {
    try {
      await fetchApi(`/contacts/${contactId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      
      const updatedContacts = contacts.map(contact =>
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      );
      setContacts(updatedContacts);
      setFilteredContacts(prevFiltered =>
        prevFiltered.map(contact =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Fehler beim Aktualisieren des Status';
      setError(message);
    }
  };

  const handleAddNote = async (contactId: number, note: string) => {
    try {
      const response = await fetchApi(`/contacts/${contactId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text: note, author: 'Admin' })
      });

      const updatedContacts = contacts.map(contact => {
        if (contact.id === contactId) {
          return {
            ...contact,
            notes: [...contact.notes, response]
          };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setFilteredContacts(prevFiltered =>
        prevFiltered.map(contact =>
          contact.id === contactId ? updatedContacts.find(c => c.id === contactId)! : contact
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Fehler beim Hinzufügen der Notiz';
      setError(message);
    }
  };

  const handleDeleteNote = async (contactId: number, noteId: number) => {
    try {
      await fetchApi(`/contacts/${contactId}/notes/${noteId}`, {
        method: 'DELETE'
      });

      const updatedContacts = contacts.map(contact => {
        if (contact.id === contactId) {
          return {
            ...contact,
            notes: contact.notes.filter(note => note.id !== noteId)
          };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setFilteredContacts(prevFiltered =>
        prevFiltered.map(contact =>
          contact.id === contactId ? updatedContacts.find(c => c.id === contactId)! : contact
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Fehler beim Löschen der Notiz';
      setError(message);
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

      <ContactFilters
        contacts={contacts}
        onFilter={setFilteredContacts}
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
                onStatusChange={handleStatusChange}
                onSelect={() => setSelectedContact(contact)}
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

      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}