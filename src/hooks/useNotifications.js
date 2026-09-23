import { useState, useEffect, useCallback } from 'react';
import notificationService from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      const res = await notificationService.getNotifications();
      const data = res.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch {
      // Ignore
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchNotifications();

    // Poll every 60s if authenticated
    if (isAuthenticated) {
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    // Optimistic
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await notificationService.markAsRead(id);
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const markAllAsRead = useCallback(async () => {
    // Optimistic
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      await notificationService.markAllAsRead();
      showToast('All notifications marked as read.', 'success');
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications, showToast]);

  const deleteNotification = useCallback(async (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    try {
      await notificationService.deleteNotification(id);
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetchNotifications: fetchNotifications,
  };
};

export default useNotifications;
