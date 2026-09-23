const { YouTubeResource } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const AuditService = require('./auditService');
const { escapeRegex } = require('../utils/sanitize');

class YouTubeService {
  static async getYouTubeResources(query) {
    const { page, limit, skip } = getPagination(query, 12);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.channelName) {
      filter.channelName = new RegExp(escapeRegex(query.channelName.trim()), 'i');
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    const [resources, totalItems] = await Promise.all([
      YouTubeResource.find(filter).sort({ title: 1 }).skip(skip).limit(limit),
      YouTubeResource.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { resources, meta };
  }

  static async getYouTubeResourceById(id) {
    const resource = await YouTubeResource.findById(id);
    if (!resource) {
      throw new AppError('YouTube resource not found.', HTTP_STATUS.NOT_FOUND);
    }
    return resource;
  }

  static async createYouTubeResource(data, req) {
    const resource = await YouTubeResource.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'YouTubeResource',
        resourceId: resource._id,
        resourceTitle: resource.title,
        details: { channelName: resource.channelName, category: resource.category },
      });
    }
    return resource;
  }

  static async updateYouTubeResource(id, data, req) {
    const resource = await YouTubeResource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!resource) {
      throw new AppError('YouTube resource not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'YouTubeResource',
        resourceId: resource._id,
        resourceTitle: resource.title,
        details: { channelName: resource.channelName, category: resource.category },
      });
    }
    return resource;
  }

  static async deleteYouTubeResource(id, req) {
    const resource = await YouTubeResource.findByIdAndDelete(id);
    if (!resource) {
      throw new AppError('YouTube resource not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'YouTubeResource',
        resourceId: id,
        resourceTitle: resource.title,
        details: { channelName: resource.channelName },
      });
    }
    return { success: true, message: 'YouTube resource deleted successfully.' };
  }
}

module.exports = YouTubeService;
