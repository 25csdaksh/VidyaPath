const AdminService = require('../services/adminService');
const AuditService = require('../services/auditService');
const ApiResponse = require('../utils/apiResponse');

class AdminController {
  static async getStats(req, res, next) {
    try {
      const stats = await AdminService.getDashboardStats();
      return ApiResponse.success(res, 'Admin stats retrieved successfully.', stats);
    } catch (err) {
      next(err);
    }
  }

  static async getAuditLogs(req, res, next) {
    try {
      const { logs, meta } = await AuditService.getAuditLogs(req.query);
      return ApiResponse.success(res, 'Audit logs retrieved successfully.', logs, 200, meta);
    } catch (err) {
      next(err);
    }
  }

  // ==========================================
  // USER MANAGEMENT
  // ==========================================

  static async getUsers(req, res, next) {
    try {
      const { users, meta } = await AdminService.getUsers(req.query);
      return ApiResponse.success(res, 'Users retrieved successfully.', users, 200, meta);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await AdminService.getUserById(req.params.id);
      return ApiResponse.success(res, 'User details fetched successfully.', user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const user = await AdminService.createUser(req.body, req);
      return ApiResponse.success(res, 'User created successfully.', user, 201);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await AdminService.updateUser(req.params.id, req.body, req);
      return ApiResponse.success(res, 'User updated successfully.', user);
    } catch (err) {
      next(err);
    }
  }

  static async toggleUserStatus(req, res, next) {
    try {
      const user = await AdminService.toggleUserStatus(req.params.id, req);
      return ApiResponse.success(res, 'User status updated successfully.', user);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const result = await AdminService.deleteUser(req.params.id, req);
      return ApiResponse.success(res, result.message, result);
    } catch (err) {
      next(err);
    }
  }

  // ==========================================
  // SKILL MANAGEMENT
  // ==========================================

  static async getSkills(req, res, next) {
    try {
      const { skills, meta } = await AdminService.getSkills(req.query);
      return ApiResponse.success(res, 'Skills fetched successfully.', skills, 200, meta);
    } catch (err) {
      next(err);
    }
  }

  static async createSkill(req, res, next) {
    try {
      const skill = await AdminService.createSkill(req.body, req);
      return ApiResponse.success(res, 'Skill created successfully.', skill, 201);
    } catch (err) {
      next(err);
    }
  }

  static async updateSkill(req, res, next) {
    try {
      const skill = await AdminService.updateSkill(req.params.id, req.body, req);
      return ApiResponse.success(res, 'Skill updated successfully.', skill);
    } catch (err) {
      next(err);
    }
  }

  static async deleteSkill(req, res, next) {
    try {
      const result = await AdminService.deleteSkill(req.params.id, req);
      return ApiResponse.success(res, result.message, result);
    } catch (err) {
      next(err);
    }
  }

  // ==========================================
  // UNIVERSAL PUBLISH / UNPUBLISH TOGGLE
  // ==========================================

  static async togglePublish(req, res, next) {
    try {
      const { resourceType, id } = req.params;
      const result = await AdminService.togglePublish(resourceType, id, req);
      return ApiResponse.success(res, `${resourceType} publish status updated.`, result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
