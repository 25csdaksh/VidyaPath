import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const bookService = {
  async getBooks(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.level) query.append('level', params.level);
    if (params.search) query.append('search', params.search);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.BOOKS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async getBookById(id) {
    return await api.get(API_ROUTES.BOOKS.BY_ID(id));
  },

  async createBook(data) {
    return await api.post(API_ROUTES.BOOKS.LIST, data);
  },

  async updateBook(id, data) {
    return await api.put(API_ROUTES.BOOKS.BY_ID(id), data);
  },

  async deleteBook(id) {
    return await api.delete(API_ROUTES.BOOKS.BY_ID(id));
  },
};

export default bookService;
