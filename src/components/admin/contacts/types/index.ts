export interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  investment_capacity?: string;
  risk_tolerance?: string;
  experience_level?: string;
  time_horizon?: string;
  preferred_package?: string;
  created_at: string;
  updated_at: string;
  notes: ContactNote[];
  tags?: string[];
}

export interface ContactNote {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

export interface ContactTag {
  id: number;
  text: string;
}

export interface ContactFilters {
  search: string;
  status: string;
  dateRange: string;
  tags: string[];
}

export interface ContactListProps {
  onContactSelect?: (contact: Contact) => void;
}

export interface ContactRowProps {
  contact: Contact;
  onSelect: () => void;
  onStatusChange: (status: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onUpdate: (data: Partial<Contact>) => void;
  onDelete: () => void;
}

export interface EditContactModalProps {
  contact: Contact;
  onClose: () => void;
  onSave: (data: Partial<Contact>) => Promise<void>;
}

export interface DeleteContactModalProps {
  contact: Contact;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export interface AddNoteModalProps {
  contactId: number;
  onClose: () => void;
  onSave: (text: string) => Promise<void>;
}