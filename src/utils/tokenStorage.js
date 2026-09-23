import { APP_CONFIG } from '../constants/appConfig';

export const tokenStorage = {
  getToken() {
    try {
      return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      return null;
    }
  },

  setToken(token) {
    try {
      if (token) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
      } else {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
      }
    } catch (e) {
      console.error('Error writing token to storage:', e);
    }
  },

  clearToken() {
    try {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
    } catch (e) {
      console.error('Error clearing token:', e);
    }
  },

  getUserData() {
    try {
      const data = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUserData(userData) {
    try {
      if (userData) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      } else {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
      }
    } catch (e) {
      console.error('Error saving user data:', e);
    }
  },
};
