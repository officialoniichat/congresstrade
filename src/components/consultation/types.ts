import { LucideIcon } from 'lucide-react';

export interface FormData {
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferred_date?: string;
}

export interface FormInputProps {
  label: string;
  type: 'text' | 'tel' | 'email' | 'date';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  icon: LucideIcon;
  placeholder?: string;
}

export interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export interface FormSuccessProps {
  onClose: () => void;
}

export interface DateTimeInputsProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  dateError?: string;
}

export interface ConsultationFormProps {
  onClose: () => void;
}