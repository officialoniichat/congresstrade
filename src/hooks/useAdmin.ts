// src/hooks/useAdmin.ts

import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AdminContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}