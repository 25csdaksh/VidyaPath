import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const projectService = {
  async getProjects(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.difficulty) query.append('difficulty', params.difficulty);
    if (params.technology) query.append('technology', params.technology);
    if (params.skills) query.append('skills', params.skills);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.PROJECTS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getProjectBySlug(slug) {
    return await api.get(API_ROUTES.PROJECTS.BY_SLUG(slug));
  },

  async createProject(data) {
    return await api.post(API_ROUTES.PROJECTS.CREATE, data);
  },

  async updateProject(id, data) {
    return await api.put(API_ROUTES.PROJECTS.UPDATE(id), data);
  },

  async deleteProject(id) {
    return await api.delete(API_ROUTES.PROJECTS.DELETE(id));
  },

  // Student Project Progress Tracking
  async getUserProjectProgress() {
    return await api.get(API_ROUTES.PROJECTS.PROGRESS);
  },

  async getProjectProgress(projectIdOrSlug) {
    return await api.get(API_ROUTES.PROJECTS.PROGRESS_BY_ID(projectIdOrSlug));
  },

  async updateProjectProgress(projectIdOrSlug, data) {
    return await api.put(API_ROUTES.PROJECTS.PROGRESS_BY_ID(projectIdOrSlug), data);
  },

  async deleteProjectProgress(projectIdOrSlug) {
    return await api.delete(API_ROUTES.PROJECTS.PROGRESS_BY_ID(projectIdOrSlug));
  },
};

export default projectService;
