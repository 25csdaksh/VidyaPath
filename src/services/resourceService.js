const { Resource } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const mongoose = require('mongoose');
const AuditService = require('./auditService');

class ResourceService {
  static async getResources(query) {
    const { page, limit, skip } = getPagination(query, 12);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    const [resources, totalItems] = await Promise.all([
      Resource.find(filter).sort({ isFeatured: -1, rating: -1, title: 1 }).skip(skip).limit(limit),
      Resource.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { resources, meta };
  }

  static async getResourceByIdOrSlug(idOrSlug) {
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };

    const resource = await Resource.findOne(query);
    if (!resource) {
      throw new AppError('Resource not found.', HTTP_STATUS.NOT_FOUND);
    }

    return resource;
  }

  static async createResource(data, req) {
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    const resource = await Resource.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'Resource',
        resourceId: resource._id,
        resourceTitle: resource.title,
        details: { type: resource.type, category: resource.category },
      });
    }
    return resource;
  }

  static async updateResource(id, data, req) {
    const resource = await Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!resource) {
      throw new AppError('Resource not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'Resource',
        resourceId: resource._id,
        resourceTitle: resource.title,
        details: { type: resource.type, category: resource.category },
      });
    }
    return resource;
  }

  static async deleteResource(id, req) {
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
      throw new AppError('Resource not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'Resource',
        resourceId: id,
        resourceTitle: resource.title,
        details: { type: resource.type },
      });
    }
    return { success: true, message: 'Resource deleted successfully.' };
  }
}

module.exports = ResourceService;
