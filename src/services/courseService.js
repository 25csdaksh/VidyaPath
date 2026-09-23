import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const courseService = {
  async getCourses(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.provider) query.append('provider', params.provider);
    if (params.difficulty) query.append('difficulty', params.difficulty);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.COURSES.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getCourseById(id) {
    return await api.get(API_ROUTES.COURSES.BY_ID(id));
  },

  async createCourse(data) {
    return await api.post(API_ROUTES.COURSES.LIST, data);
  },

  async updateCourse(id, data) {
    return await api.put(API_ROUTES.COURSES.BY_ID(id), data);
  },

  async deleteCourse(id) {
    return await api.delete(API_ROUTES.COURSES.BY_ID(id));
  },
};

export default courseService;
