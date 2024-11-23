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

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchApi('/contacts');
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError('Fehler beim Laden der Kontakte');
    } finally {
      setIsLoading(false);
    }
  };

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
      console.error('Error updating status:', err);
      setError('Fehler beim Aktualisieren des Status');
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
            notes: [...contact.notes, {
              id: response.id,
              text: note,
              author: 'Admin',
              timestamp: new Date().toISOString()
            }]
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
      console.error('Error adding note:', err);
      setError('Fehler beim Hinzufügen der Notiz');
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
      console.error('Error deleting note:', err);
      setError('Fehler beim Löschen der Notiz');
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
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