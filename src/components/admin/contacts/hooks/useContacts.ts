import { useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { Contact, ContactNote } from '../types';

export function useContacts() {
  const { fetchApi } = useApi();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contacts = await fetchApi('/contacts');
      return contacts;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch contacts';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContact = async (id: number, data: Partial<Contact>) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to update contact');
      }

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update contact';
      setError(message);
      throw err;
    }
  };

  const deleteContact = async (id: number) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete contact');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete contact';
      setError(message);
      throw err;
    }
  };

  const updateStatus = async (id: number, status: string) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to update status');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setError(message);
      throw err;
    }
  };

  const addNote = async (contactId: number, text: string): Promise<ContactNote> => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${contactId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text })
      });

      if (!response.id) {
        throw new Error('Failed to add note');
      }

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add note';
      setError(message);
      throw err;
    }
  };

  const deleteNote = async (contactId: number, noteId: number) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${contactId}/notes/${noteId}`, {
        method: 'DELETE'
      });

      if (!response.success) {
        throw new Error('Failed to delete note');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete note';
      setError(message);
      throw err;
    }
  };

  return {
    error,
    isLoading,
    getContacts,
    updateContact,
    deleteContact,
    updateStatus,
    addNote,
    deleteNote
  };
}