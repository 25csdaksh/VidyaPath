import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const dashboardService = {
  async getDashboardData() {
    const route = typeof API_ROUTES.DASHBOARD === 'string' ? API_ROUTES.DASHBOARD : API_ROUTES.DASHBOARD.GET;
    return await api.get(route);
  },

  async recordRecentView(itemData) {
    const route = typeof API_ROUTES.DASHBOARD === 'object' ? API_ROUTES.DASHBOARD.RECENT_VIEWS : '/dashboard/recent-views';
    return await api.post(route, itemData);
  },

  async getRecentViews() {
    const route = typeof API_ROUTES.DASHBOARD === 'object' ? API_ROUTES.DASHBOARD.RECENT_VIEWS : '/dashboard/recent-views';
    return await api.get(route);
  },
};

export default dashboardService;
