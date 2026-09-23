import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { tokenStorage } from '../utils/tokenStorage';
import { extractErrorMessage } from '../utils/errorHandler';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => tokenStorage.getUserData());
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const logout = useCallback(async (showNotification = true) => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      tokenStorage.clearToken();
      setUser(null);
      setProfile(null);
      if (showNotification) {
        toast.info('You have been logged out.');
      }
    }
  }, [toast]);

  const loadCurrentUser = useCallback(async () => {
    const token = tokenStorage.getToken();
    if (!token) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.getMe();
      if (res.data && res.data.user) {
        setUser(res.data.user);
        setProfile(res.data.profile);
        tokenStorage.setUserData(res.data.user);
      }
    } catch (err) {
      console.warn('Failed to load authenticated user profile:', err);
      tokenStorage.clearToken();
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();

    // Listen to global 401 unauthorized events emitted from API client
    const handleUnauthorized = () => {
      logout(false);
      toast.error('Session expired. Please log in again to continue.');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [loadCurrentUser, logout, toast]);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      const { user: userData, token } = res.data;

      tokenStorage.setToken(token);
      tokenStorage.setUserData(userData);
      setUser(userData);
      if (userData.profile) {
        setProfile(userData.profile);
      }

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };
    } catch (err) {
      const message = extractErrorMessage(err, 'Failed to log in. Please check your credentials.');
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (formData) => {
    try {
      const res = await authService.register(formData);
      const { user: userData, token } = res.data;

      tokenStorage.setToken(token);
      tokenStorage.setUserData(userData);
      setUser(userData);
      if (userData.profile) {
        setProfile(userData.profile);
      }

      toast.success(`Account created successfully! Welcome to VidyaPath, ${userData.name}.`);
      return { success: true, user: userData };
    } catch (err) {
      const message = extractErrorMessage(err, 'Registration failed. Please try again.');
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    profile,
    setProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    register,
    logout,
    refreshUser: loadCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
