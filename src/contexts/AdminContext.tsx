// src/contexts/AdminContext.tsx

import React, { createContext, useState, useEffect } from 'react';
import { AdminContextType, User } from '../hooks/useAdmin';

export const AdminContext = createContext<AdminContextType | null>(null);

const API_URL = 'https://congresstrade.onrender.com';

const LOCAL_STORAGE_KEYS = {
  TOKEN: 'congresstrade_auth_token',
  USER: 'congresstrade_user',
  EXPIRY: 'congresstrade_token_expiry'
};

// Helper to check if token is expired
const isTokenExpired = (expiryDate: string | null): boolean => {
  if (!expiryDate) return true;
  return new Date(expiryDate).getTime() < new Date().getTime();
};

// Helper to get stored auth data
const getStoredAuthData = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  const userStr = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  const expiry = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRY);

  return {
    token,
    user: userStr ? JSON.parse(userStr) : null,
    expiry
  };
};

// Helper to set auth data
const setStoredAuthData = (token: string, user: User, expiryDate: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRY, expiryDate);
};

// Helper to clear auth data
const clearStoredAuthData = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.EXPIRY);
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to validate stored token with backend
  const validateToken = async (storedToken: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  };

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const { token: storedToken, user: storedUser, expiry } = getStoredAuthData();

      if (storedToken && storedUser && !isTokenExpired(expiry)) {
        // Validate token with backend
        const isValid = await validateToken(storedToken);

        if (isValid) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          clearStoredAuthData();
        }
      } else {
        clearStoredAuthData();
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Auto logout when token expires
  useEffect(() => {
    const expiry = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRY);
    if (!expiry) return;

    const timeUntilExpiry = new Date(expiry).getTime() - new Date().getTime();
    if (timeUntilExpiry <= 0) return;

    const logoutTimer = setTimeout(() => {
      logout();
    }, timeUntilExpiry);

    return () => clearTimeout(logoutTimer);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      // Calculate expiry date (24 hours from now)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);

      // Store auth data
      setStoredAuthData(data.token, data.user, expiryDate.toISOString());
      
      // Update state
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }

    // Clear stored data
    clearStoredAuthData();
    
    // Reset state
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  // Refresh token periodically
  useEffect(() => {
    if (!token || !isAuthenticated) return;

    const refreshToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Calculate new expiry date
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 24);

          // Update stored data
          setStoredAuthData(data.token, data.user, expiryDate.toISOString());
          
          // Update state
          setToken(data.token);
          setUser(data.user);
        } else {
          // If refresh fails, log out
          logout();
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    };

    // Refresh token every 23 hours
    const refreshInterval = setInterval(refreshToken, 23 * 60 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [token, isAuthenticated]);

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