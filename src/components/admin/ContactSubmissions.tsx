import React from 'react';
import { Filter } from 'lucide-react';
import ContactList from './contacts/components/ContactList';
import AdminHeader from './common/AdminHeader';

export default function ContactSubmissions() {
  return (
    <div>
      <AdminHeader
        title="Kontaktanfragen"
        actions={
          <button
            className="flex items-center px-4 py-2 text-navy-900 bg-white border border-navy-900 rounded-lg hover:bg-navy-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        }
      />

      <ContactList />
    </div>
  );
}