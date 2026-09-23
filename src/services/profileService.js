import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const profileService = {
  async getProfile() {
    return await api.get(API_ROUTES.PROFILE.GET);
  },

  async updateProfile(profileData) {
    return await api.put(API_ROUTES.PROFILE.UPDATE, profileData);
  },
};

export default profileService;
