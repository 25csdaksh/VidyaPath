import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import dashboardService from '../services/dashboardService';
import profileService from '../services/profileService';
import { extractErrorMessage } from '../utils/errorHandler';
import { useToast } from './ToastContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, setProfile } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const loadDashboard = useCallback(async () => {
    if (!isAuthenticated) {
      setDashboardData(null);
      return;
    }

    try {
      setIsLoading(true);
      const res = await dashboardService.getDashboardData();
      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.warn('Failed to load dashboard metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard();
    } else {
      setDashboardData(null);
    }
  }, [isAuthenticated, loadDashboard]);

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      const res = await profileService.updateProfile(profileData);
      if (res.data?.profile) {
        setProfile(res.data.profile);
      }
      toast.success('Profile updated successfully!');
      await loadDashboard();
      return { success: true, profile: res.data?.profile };
    } catch (err) {
      const msg = extractErrorMessage(err, 'Failed to update profile.');
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        dashboardData,
        isLoading,
        refreshDashboard: loadDashboard,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
