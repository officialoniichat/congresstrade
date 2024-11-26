import { useAdmin } from './useAdmin';

interface FetchOptions extends RequestInit {
  body?: string;
}

export function useApi() {
  const { token, logout } = useAdmin();

  const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`/api${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (response.status === 401) {
        logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Ein Fehler ist aufgetreten');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Ein unerwarteter Fehler ist aufgetreten');
    }
  };

  return { fetchApi };
}