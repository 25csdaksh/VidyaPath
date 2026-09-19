import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const roadmapService = {
  async getAllRoadmaps() {
    return await api.get(API_ROUTES.ROADMAP.ALL);
  },

  async getRoadmapById(id) {
    return await api.get(API_ROUTES.ROADMAP.BY_ID(id));
  },

  async getRoadmapBySemester(semester) {
    return await api.get(API_ROUTES.ROADMAP.BY_SEMESTER(semester));
  },

  async getRoadmapByYear(year) {
    return await api.get(API_ROUTES.ROADMAP.BY_YEAR(year));
  },

  async createRoadmap(data) {
    return await api.post(API_ROUTES.ROADMAP.ALL, data);
  },

  async updateRoadmap(id, data) {
    return await api.put(API_ROUTES.ROADMAP.BY_ID(id), data);
  },

  async deleteRoadmap(id) {
    return await api.delete(API_ROUTES.ROADMAP.BY_ID(id));
  },

  async getProgress() {
    return await api.get(API_ROUTES.ROADMAP.PROGRESS);
  },

  async saveProgress(data) {
    return await api.post(API_ROUTES.ROADMAP.PROGRESS, data);
  },

  async updateProgress(id, data) {
    return await api.put(API_ROUTES.ROADMAP.UPDATE_PROGRESS(id), data);
  },
};

export default roadmapService;
