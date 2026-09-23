import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const youtubeService = {
  async getYouTubeResources(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.level) query.append('level', params.level);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.YOUTUBE.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getYouTubeResourceById(id) {
    return await api.get(API_ROUTES.YOUTUBE.BY_ID(id));
  },

  async createYouTubeResource(data) {
    return await api.post(API_ROUTES.YOUTUBE.LIST, data);
  },

  async updateYouTubeResource(id, data) {
    return await api.put(API_ROUTES.YOUTUBE.BY_ID(id), data);
  },

  async deleteYouTubeResource(id) {
    return await api.delete(API_ROUTES.YOUTUBE.BY_ID(id));
  },
};

export default youtubeService;
