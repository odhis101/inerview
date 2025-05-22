// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated login function to handle both regular and OAuth login
  const login = async (email, password, oauthData = null) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - accept any email/password for demo
      if (email && password) {
        let userToSave;
        
        if (oauthData) {
          // OAuth login - use the provided OAuth data
          userToSave = {
            id: oauthData.id,
            name: oauthData.name,
            email: oauthData.email,
            provider: oauthData.provider,
            avatar: oauthData.avatar,
            loginTime: oauthData.loginTime,
          };
        } else {
          // Regular login - create mock user
          userToSave = {
            id: '1',
            name: 'John Doe',
            email: email,
            provider: 'Email',
            loginTime: new Date().toISOString(),
          };
        }
        
        // Save user data to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        
        setUser(userToSave);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Please enter email and password' };
      }
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};