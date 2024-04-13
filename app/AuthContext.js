"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    } else {
      return null;
    }
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    } else {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('accessToken');
  });

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken, refreshToken) => {
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async (authToken, refreshToken) => {
    try {
      await axios.delete('http://localhost:4002/auth/logout', {
        data: { refreshToken },
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAuthToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error al realizar la solicitud DELETE:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/login', userData);
      const { accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken);
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/register', userData);
      const { accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        logout: () => logout(authToken, refreshToken),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
