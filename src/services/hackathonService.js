import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const hackathonService = {
  async getHackathons(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.status) query.append('status', params.status);
    if (params.mode) query.append('mode', params.mode);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.HACKATHONS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getHackathonById(id) {
    return await api.get(API_ROUTES.HACKATHONS.BY_ID(id));
  },

  async createHackathon(data) {
    return await api.post(API_ROUTES.HACKATHONS.LIST, data);
  },

  async updateHackathon(id, data) {
    return await api.put(API_ROUTES.HACKATHONS.BY_ID(id), data);
  },

  async deleteHackathon(id) {
    return await api.delete(API_ROUTES.HACKATHONS.BY_ID(id));
  },
};

export default hackathonService;
