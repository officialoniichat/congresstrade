export interface ContactNote {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

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