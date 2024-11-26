import { useState } from 'react';
import { useApi } from './useApi';
import { Contact, ContactNote, ContactTag } from '../components/admin/contacts/types';

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
      await fetchApi(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
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
        throw new Error('Failed to delete contact');
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
      await fetchApi(`/contacts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setError(message);
      throw err;
    }
  };

  const addNote = async (contactId: number, text: string): Promise<ContactNote> => {
    setError(null);
    try {
      const note = await fetchApi(`/contacts/${contactId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      return note;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add note';
      setError(message);
      throw err;
    }
  };

  const deleteNote = async (contactId: number, noteId: number) => {
    setError(null);
    try {
      await fetchApi(`/contacts/${contactId}/notes/${noteId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete note';
      setError(message);
      throw err;
    }
  };

  const addTag = async (contactId: number, tag: string): Promise<ContactTag> => {
    setError(null);
    try {
      const newTag = await fetchApi(`/contacts/${contactId}/tags`, {
        method: 'POST',
        body: JSON.stringify({ tag })
      });
      return newTag;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add tag';
      setError(message);
      throw err;
    }
  };

  const deleteTag = async (contactId: number, tagId: number) => {
    setError(null);
    try {
      await fetchApi(`/contacts/${contactId}/tags/${tagId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete tag';
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
    deleteNote,
    addTag,
    deleteTag
  };
}