import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const adminService = {
  /**
   * Get platform statistics and recent activity
   */
  async getStats() {
    return await api.get(API_ROUTES.ADMIN.STATS);
  },

  /**
   * Fetch paginated audit logs
   */
  async getAuditLogs(params = {}) {
    return await api.get(API_ROUTES.ADMIN.AUDIT_LOGS, { params });
  },

  // ==========================================
  // USER MANAGEMENT
  // ==========================================

  async getUsers(params = {}) {
    return await api.get(API_ROUTES.ADMIN.USERS, { params });
  },

  async getUserById(id) {
    return await api.get(API_ROUTES.ADMIN.USER_BY_ID(id));
  },

  async createUser(userData) {
    return await api.post(API_ROUTES.ADMIN.USERS, userData);
  },

  async updateUser(id, userData) {
    return await api.put(API_ROUTES.ADMIN.USER_BY_ID(id), userData);
  },

  async toggleUserStatus(id) {
    return await api.patch(API_ROUTES.ADMIN.USER_STATUS(id));
  },

  async deleteUser(id) {
    return await api.delete(API_ROUTES.ADMIN.USER_BY_ID(id));
  },

  // ==========================================
  // SKILL MANAGEMENT
  // ==========================================

  async getSkills(params = {}) {
    return await api.get(API_ROUTES.ADMIN.SKILLS, { params });
  },

  async createSkill(skillData) {
    return await api.post(API_ROUTES.ADMIN.SKILLS, skillData);
  },

  async updateSkill(id, skillData) {
    return await api.put(API_ROUTES.ADMIN.SKILL_BY_ID(id), skillData);
  },

  async deleteSkill(id) {
    return await api.delete(API_ROUTES.ADMIN.SKILL_BY_ID(id));
  },

  // ==========================================
  // UNIVERSAL PUBLISH / UNPUBLISH TOGGLE
  // ==========================================

  async togglePublish(resourceType, id) {
    return await api.patch(API_ROUTES.ADMIN.TOGGLE_PUBLISH(resourceType, id));
  },
};

export default adminService;
