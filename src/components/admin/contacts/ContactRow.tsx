import React from 'react';
import { Contact } from '../../../types/contact';
import { Phone, Mail, Calendar, Clock, Tag, MessageSquare, User } from 'lucide-react';
import ContactStatus from './ContactStatus';

interface ContactRowProps {
  contact: Contact;
  onStatusChange: (id: number, status: string) => void;
  onSelect: () => void;
}

export default function ContactRow({ contact, onStatusChange, onSelect }: ContactRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center">
              <User className="h-6 w-6 text-navy-600" />
            </div>
          </div>
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
            {new Date(contact.preferred_date).toLocaleDateString('de-DE')}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {contact.preferred_time} Uhr
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <ContactStatus
          status={contact.status}
          onChange={(status) => onStatusChange(contact.id, status)}
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {contact.tags.map((tag, index) => (
            <span
              key={`${contact.id}-${tag}-${index}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={onSelect}
          className="text-gray-400 hover:text-navy-900 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}