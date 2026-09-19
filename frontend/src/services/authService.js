import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const authService = {
  async register(userData) {
    return await api.post(API_ROUTES.AUTH.REGISTER, userData);
  },

  async login(credentials) {
    return await api.post(API_ROUTES.AUTH.LOGIN, credentials);
  },

  async getMe() {
    return await api.get(API_ROUTES.AUTH.ME);
  },

  async forgotPassword(email) {
    return await api.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token, newPassword) {
    return await api.post(API_ROUTES.AUTH.RESET_PASSWORD, { token, newPassword });
  },

  async changePassword(currentPassword, newPassword) {
    return await api.post(API_ROUTES.AUTH.CHANGE_PASSWORD, { currentPassword, newPassword });
  },

  async logout() {
    try {
      return await api.post(API_ROUTES.AUTH.LOGOUT);
    } catch {
      // Clean local session even if network request fails
      return { success: true };
    }
  },
};

export default authService;
