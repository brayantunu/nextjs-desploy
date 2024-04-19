'use client'
// Este es tu autenticador del frontend

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
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuthToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUsername = localStorage.getItem('username');
      const storedAvatar = localStorage.getItem('avatar');
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true);
        setUsername(storedUsername);
        setAvatar(storedAvatar);
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/login', userData);
      const { accessToken, refreshToken, username, avatar } = response.data;
      console.log("Username from backend:", username);
      console.log("Avatar from backend:", avatar);
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('avatar', avatar);
      setIsAuthenticated(true);
      setUsername(username);
      setAvatar(avatar);
      return { username, avatar };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
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
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4002/auth/register', userData);
      const { accessToken, refreshToken, username, avatar } = response.data;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('avatar', avatar);
      setIsAuthenticated(true);
      setUsername(username);
      setAvatar(avatar);
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
        username,
        avatar,
        setUsername,
        setAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
