import React, { useState } from 'react';
import { Phone, Mail, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { Contact } from '../../types';
import { useContacts } from '../../hooks/useContacts';
import { formatDate, formatTime, getStatusColor } from '../../utils/formatting';
import ContactDetails from '../ContactDetails';
import DeleteModal from '../ContactModals/DeleteModal';

interface ContactRowProps {
  contact: Contact;
  onRefresh: () => void;
}

export default function ContactRow({ contact, onRefresh }: ContactRowProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { updateStatus, deleteContact } = useContacts();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus(contact.id, newStatus);
      onRefresh();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id);
      setShowDeleteModal(false);
      onRefresh();
    } catch (err) {
      console.error('Error deleting contact:', err);
      throw err;
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-navy-900">{contact.name}</div>
            <div className="text-sm text-gray-500">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {contact.phone}
              </div>
              {contact.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {contact.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(contact.preferred_date)}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatTime(contact.preferred_time)}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <select
          value={contact.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-sm rounded-full px-2.5 py-0.5 ${getStatusColor(contact.status)} border-0 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-navy-500`}
        >
          <option value="new">Neu</option>
          <option value="contacted">Kontaktiert</option>
          <option value="qualified">Qualifiziert</option>
          <option value="converted">Konvertiert</option>
          <option value="lost">Verloren</option>
        </select>
      </td>
      <td className="px-6 py-4 text-right space-x-3">
        <button
          onClick={() => setShowDetails(true)}
          className="text-gray-400 hover:text-navy-900 transition-colors"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
      {showDetails && (
        <ContactDetails
          contact={contact}
          onClose={() => setShowDetails(false)}
          onUpdate={onRefresh}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          contact={contact}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </tr>
  );
}