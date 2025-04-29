import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, isAuthenticated, login as loginService, register as registerService, logout as logoutService } from '../services/authService';

// Interface for the authentication context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap the application
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      const authenticated = isAuthenticated();
      
      if (currentUser && authenticated) {
        setUser(currentUser);
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginService(email, password);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await registerService(email, password);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    logoutService();
    setUser(null);
  };

  // Value object to be provided by the context
  const value = {
    user,
    loading,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
