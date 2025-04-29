// Authentication service for handling API requests
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Interface for user data
export interface User {
  id: string;
  email: string;
}

// Interface for authentication response
export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

// Register a new user
export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error during registration');
  }
};

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error during login');
  }
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Get authentication token
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Get user profile from API
export const getUserProfile = async (): Promise<User> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to get user profile');
    }
    throw new Error('Network error while fetching user profile');
  }
};
