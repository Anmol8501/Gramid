"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signUp, logIn } from '@utils/userAuth'

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const onAuth = (User) => {
    try {
      setUser(User);
      localStorage.setItem('user', JSON.stringify(User));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  const value = {
    user,
    loading,
    signUp,
    onAuth,
    logIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
