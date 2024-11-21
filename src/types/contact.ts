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
  investment_capacity?: number;
  risk_tolerance?: string;
  experience_level?: string;
  time_horizon?: string;
  preferred_package?: string;
  potential_value?: number;
  conversion_probability?: number;
  last_contact?: string;
  next_follow_up?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  notes: ContactNote[];
}