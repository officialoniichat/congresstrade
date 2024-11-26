import React, { createContext, useState, useEffect } from 'react';
import { AdminContextType, User } from '../hooks/useAdmin';

export const AdminContext = createContext<AdminContextType | null>(null);

const LOCAL_STORAGE_KEYS = {
  TOKEN: 'congresstrade_auth_token',
  USER: 'congresstrade_user'
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/validate', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setToken(storedToken);
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const data = await response.json();
      
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    isLoading
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}