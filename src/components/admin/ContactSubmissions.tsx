import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { Contact } from '../../types/contact';
import ContactList from './contacts/ContactList';
import ContactStats from './contacts/ContactStats';
import AdminHeader from './common/AdminHeader';
import { Filter } from 'lucide-react';
import EditContactModal from './contacts/EditContactModal';

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { fetchApi } = useApi();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await fetchApi('/contacts');
      setContacts(data);
    } catch (err) {
      setError('Fehler beim Laden der Kontakte');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = async (updatedContact: Contact) => {
    try {
      await fetchApi(`/api/contacts/${updatedContact.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedContact)
      });
      
      // Update local state
      setContacts(contacts.map(c => 
        c.id === updatedContact.id ? updatedContact : c
      ));
      
      // Close modal
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error; // Let the modal handle the error
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
      <AdminHeader
        title="Kontaktanfragen"
        subtitle={`${contacts.length} Kontakte insgesamt`}
        actions={
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-navy-900 text-white border-navy-900' 
                : 'bg-white text-navy-900 border-gray-300 hover:border-navy-900'
            }`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        }
      />

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <ContactStats contacts={contacts} />

      <ContactList
        contacts={contacts}
        onContactsChange={loadContacts}
        showFilters={showFilters}
        onEditContact={handleEditContact}
      />

      {editingContact && (
        <EditContactModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
}