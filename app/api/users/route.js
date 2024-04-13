'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuthToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/login', userData);
      const { accessToken, refreshToken } = response.data;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = async () => {
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
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/register', userData);
      const { accessToken, refreshToken } = response.data;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        login,
        register: handleRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
