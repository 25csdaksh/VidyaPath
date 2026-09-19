import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const searchService = {
  async search(query) {
    if (!query) {
      return {
        query: '',
        totalResults: 0,
        results: {
          projects: [],
          books: [],
          courses: [],
          interviews: [],
          resources: [],
          hackathons: [],
          announcements: [],
          roadmap: [],
        },
      };
    }
    return await api.get(API_ROUTES.SEARCH(query));
  },
};

export default searchService;
