import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const announcementService = {
  async getAnnouncements(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.priority) query.append('priority', params.priority);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.ANNOUNCEMENTS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getAnnouncementById(id) {
    return await api.get(API_ROUTES.ANNOUNCEMENTS.BY_ID(id));
  },

  async createAnnouncement(data) {
    return await api.post(API_ROUTES.ANNOUNCEMENTS.LIST, data);
  },

  async updateAnnouncement(id, data) {
    return await api.put(API_ROUTES.ANNOUNCEMENTS.BY_ID(id), data);
  },

  async deleteAnnouncement(id) {
    return await api.delete(API_ROUTES.ANNOUNCEMENTS.BY_ID(id));
  },
};

export default announcementService;
