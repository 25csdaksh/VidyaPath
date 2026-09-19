import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const notificationService = {
  getNotifications: async (params = {}) => {
    return await api.get(API_ROUTES.NOTIFICATIONS.LIST, { params });
  },

  markAsRead: async (id) => {
    return await api.put(API_ROUTES.NOTIFICATIONS.READ(id));
  },

  markAllAsRead: async () => {
    return await api.put(API_ROUTES.NOTIFICATIONS.READ_ALL);
  },

  deleteNotification: async (id) => {
    return await api.delete(API_ROUTES.NOTIFICATIONS.DELETE(id));
  },
};

export default notificationService;
