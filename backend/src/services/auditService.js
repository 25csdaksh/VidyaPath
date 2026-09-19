const { AuditLog } = require('../models');
const { escapeRegex } = require('../utils/sanitize');

class AuditService {
  /**
   * Record an administrative audit log entry
   */
  static async logAction(req, {
    action,
    resourceType,
    resourceId = '',
    resourceTitle = '',
    details = {},
    status = 'SUCCESS',
  }) {
    try {
      const user = req.user || {};
      const ipAddress =
        req.headers['x-forwarded-for'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'API Client';

      const log = await AuditLog.create({
        user: user._id || user.id,
        userName: user.name || 'System Admin',
        userEmail: user.email || 'admin@vidyapath.edu',
        action,
        resourceType,
        resourceId: resourceId ? String(resourceId) : '',
        resourceTitle: resourceTitle ? String(resourceTitle) : '',
        details,
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        userAgent,
        status,
      });

      return log;
    } catch (err) {
      console.error('[AUDIT_LOG_ERROR] Failed to record audit log:', err.message);
      return null;
    }
  }

  /**
   * Fetch paginated audit logs with search and filtering
   */
  static async getAuditLogs({
    page = 1,
    limit = 20,
    resourceType,
    action,
    search,
    startDate,
    endDate,
  }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (resourceType && resourceType !== 'ALL') {
      filter.resourceType = resourceType;
    }

    if (action && action !== 'ALL') {
      filter.action = action;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    if (search && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), 'i');
      filter.$or = [
        { userName: regex },
        { userEmail: regex },
        { resourceTitle: regex },
        { action: regex },
        { resourceType: regex },
        { ipAddress: regex },
      ];
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      AuditLog.countDocuments(filter),
    ]);

    return {
      logs,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    };
  }
}

module.exports = AuditService;
