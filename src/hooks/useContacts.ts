import { useState } from 'react';
import { useApi } from './useApi';
import { Contact } from '../types/contact';

export function useContacts() {
  const { fetchApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (id: number, status: string) => {
    setError(null);
    try {
      await fetchApi(`/contacts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Fehler beim Aktualisieren des Status');
      throw err;
    }
  };

  const addNote = async (contactId: number, text: string) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${contactId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text, author: 'Admin' })
      });
      return response;
    } catch (err) {
      console.error('Error adding note:', err);
      setError('Fehler beim Hinzufügen der Notiz');
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
      console.error('Error deleting note:', err);
      setError('Fehler beim Löschen der Notiz');
      throw err;
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
      console.error('Error updating contact:', err);
      setError('Fehler beim Aktualisieren des Kontakts');
      throw err;
    }
  };

  const addTag = async (contactId: number, tag: string) => {
    setError(null);
    try {
      const response = await fetchApi(`/contacts/${contactId}/tags`, {
        method: 'POST',
        body: JSON.stringify({ tag })
      });
      return response;
    } catch (err) {
      console.error('Error adding tag:', err);
      setError('Fehler beim Hinzufügen des Tags');
      throw err;
    }
  };

  const deleteTag = async (contactId: number, tag: string) => {
    setError(null);
    try {
      await fetchApi(`/contacts/${contactId}/tags/${encodeURIComponent(tag)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Error deleting tag:', err);
      setError('Fehler beim Löschen des Tags');
      throw err;
    }
  };

  return {
    error,
    updateStatus,
    addNote,
    deleteNote,
    updateContact,
    addTag,
    deleteTag
  };
}