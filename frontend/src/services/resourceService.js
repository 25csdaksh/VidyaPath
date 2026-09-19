import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const resourceService = {
  async getResources(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.type) query.append('type', params.type);
    if (params.category) query.append('category', params.category);
    if (params.isDownloadable !== undefined) query.append('isDownloadable', params.isDownloadable);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.RESOURCES.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getResourceById(id) {
    return await api.get(API_ROUTES.RESOURCES.BY_ID(id));
  },

  async createResource(data) {
    return await api.post(API_ROUTES.RESOURCES.LIST, data);
  },

  async updateResource(id, data) {
    return await api.put(API_ROUTES.RESOURCES.BY_ID(id), data);
  },

  async deleteResource(id) {
    return await api.delete(API_ROUTES.RESOURCES.BY_ID(id));
  },
};

export default resourceService;
