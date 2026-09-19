import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const resumeService = {
  async getUserResumes() {
    return await api.get(API_ROUTES.RESUMES.LIST);
  },

  async getResumeById(id) {
    return await api.get(API_ROUTES.RESUMES.BY_ID(id));
  },

  async createResume(data) {
    return await api.post(API_ROUTES.RESUMES.CREATE, data);
  },

  async updateResume(id, data) {
    return await api.put(API_ROUTES.RESUMES.UPDATE(id), data);
  },

  async deleteResume(id) {
    return await api.delete(API_ROUTES.RESUMES.DELETE(id));
  },
};

export default resumeService;
