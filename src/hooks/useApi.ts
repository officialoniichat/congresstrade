// src/hooks/useApi.ts

import { useAdmin } from './useAdmin';

interface FetchOptions extends RequestInit {
  body?: string;
}

const API_URL = 'https://congresstrade.onrender.com/api'; // Add this base URL

export function useApi() {
  const { token } = useAdmin();

  const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {  // Update URL
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Ein Fehler ist aufgetreten' + error);
    }

    return response.json();
  };

  return { fetchApi };
}