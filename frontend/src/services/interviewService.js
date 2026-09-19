import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const interviewService = {
  async getQuestions(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.topic) query.append('topic', params.topic);
    if (params.difficulty) query.append('difficulty', params.difficulty);
    if (params.tags) query.append('tags', params.tags);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.INTERVIEWS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getQuestionById(id) {
    return await api.get(API_ROUTES.INTERVIEWS.BY_ID(id));
  },

  async createQuestion(data) {
    return await api.post(API_ROUTES.INTERVIEWS.LIST, data);
  },

  async updateQuestion(id, data) {
    return await api.put(API_ROUTES.INTERVIEWS.BY_ID(id), data);
  },

  async deleteQuestion(id) {
    return await api.delete(API_ROUTES.INTERVIEWS.BY_ID(id));
  },

  async completeQuestion(id) {
    return await api.post(API_ROUTES.INTERVIEWS.COMPLETE(id));
  },

  async getProgress() {
    return await api.get(API_ROUTES.INTERVIEWS.PROGRESS);
  },
};

export default interviewService;
