import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const bookmarkService = {
  async getUserBookmarks(params = {}) {
    const query = new URLSearchParams();
    if (params.resourceType) query.append('resourceType', params.resourceType);
    if (params.collectionId) query.append('collectionId', params.collectionId);

    const qs = query.toString();
    return await api.get(`${API_ROUTES.BOOKMARKS.LIST}${qs ? `?${qs}` : ''}`);
  },

  async createBookmark(data) {
    return await api.post(API_ROUTES.BOOKMARKS.CREATE, data);
  },

  async updateBookmark(id, data) {
    return await api.put(API_ROUTES.BOOKMARKS.UPDATE(id), data);
  },

  async deleteBookmark(id) {
    return await api.delete(API_ROUTES.BOOKMARKS.DELETE(id));
  },

  async getUserCollections() {
    return await api.get(API_ROUTES.BOOKMARK_COLLECTIONS.LIST);
  },

  async createCollection(data) {
    return await api.post(API_ROUTES.BOOKMARK_COLLECTIONS.CREATE, data);
  },

  async updateCollection(id, data) {
    return await api.put(API_ROUTES.BOOKMARK_COLLECTIONS.UPDATE(id), data);
  },

  async deleteCollection(id) {
    return await api.delete(API_ROUTES.BOOKMARK_COLLECTIONS.DELETE(id));
  },
};

export default bookmarkService;
