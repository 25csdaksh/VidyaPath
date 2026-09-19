const { Roadmap, RoadmapItem, RoadmapProgress, UserProgress } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const mongoose = require('mongoose');
const AuditService = require('./auditService');

class RoadmapService {
  static async getAllRoadmaps(includeInactive = false) {
    const filter = includeInactive ? {} : { isActive: true };
    return await Roadmap.find(filter)
      .sort({ semester: 1 })
      .populate('skills', 'name category level')
      .populate('projects', 'title slug difficulty category')
      .populate('resources', 'title slug type category url');
  }

  static async getRoadmapByIdOrSlug(idOrSlug) {
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };

    const roadmap = await Roadmap.findOne(query)
      .populate('skills')
      .populate('projects')
      .populate('resources');

    if (!roadmap) {
      throw new AppError('Roadmap not found.', HTTP_STATUS.NOT_FOUND);
    }

    const items = await RoadmapItem.find({ roadmap: roadmap._id })
      .sort({ order: 1 })
      .populate('relatedResources')
      .populate('relatedBooks');

    return {
      roadmap,
      items,
    };
  }

  static async getRoadmapByYear(year) {
    const yearNormalized = year.toUpperCase();
    const roadmaps = await Roadmap.find({ year: yearNormalized, isActive: true })
      .sort({ semester: 1 })
      .populate('skills')
      .populate('projects');

    return roadmaps;
  }

  static async getRoadmapBySemester(semester) {
    const semNum = Number(semester);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      throw new AppError('Semester must be between 1 and 8.', HTTP_STATUS.BAD_REQUEST);
    }

    const roadmap = await Roadmap.findOne({ semester: semNum, isActive: true })
      .populate('skills')
      .populate('projects')
      .populate('resources');

    if (!roadmap) {
      throw new AppError(`Roadmap for semester ${semNum} not found.`, HTTP_STATUS.NOT_FOUND);
    }

    const items = await RoadmapItem.find({ roadmap: roadmap._id })
      .sort({ order: 1 })
      .populate('relatedResources')
      .populate('relatedBooks');

    return {
      roadmap,
      items,
    };
  }

  static async createRoadmap(data, req) {
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    const roadmap = await Roadmap.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'Roadmap',
        resourceId: roadmap._id,
        resourceTitle: roadmap.title,
        details: { semester: roadmap.semester, year: roadmap.year },
      });
    }
    return roadmap;
  }

  static async updateRoadmap(id, data, req) {
    const roadmap = await Roadmap.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!roadmap) {
      throw new AppError('Roadmap not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'Roadmap',
        resourceId: roadmap._id,
        resourceTitle: roadmap.title,
        details: { semester: roadmap.semester },
      });
    }
    return roadmap;
  }

  static async deleteRoadmap(id, req) {
    const roadmap = await Roadmap.findByIdAndDelete(id);
    if (!roadmap) {
      throw new AppError('Roadmap not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'Roadmap',
        resourceId: id,
        resourceTitle: roadmap.title,
        details: { semester: roadmap.semester },
      });
    }
    return { success: true, message: 'Roadmap deleted successfully.' };
  }

  static async getUserRoadmapProgress(userId) {
    const progressList = await RoadmapProgress.find({ user: userId })
      .populate('roadmap', 'title year semester slug')
      .populate('completedItems', 'topicName category order');

    return progressList;
  }

  static async createOrUpdateRoadmapProgress(userId, data) {
    const roadmapId = data.roadmapId || data.roadmap;
    const completedItemIds = data.completedItemIds || data.completedItems || [];
    const itemCheckpoints = data.itemCheckpoints || [];

    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      throw new AppError('Referenced roadmap not found.', HTTP_STATUS.NOT_FOUND);
    }

    let totalItems = await RoadmapItem.countDocuments({ roadmap: roadmapId });
    if (totalItems === 0 && data.totalItemsCount) {
      totalItems = data.totalItemsCount;
    }

    const completedCount = completedItemIds ? completedItemIds.length : 0;
    const progressPercentage = totalItems > 0 ? Math.min(100, Math.round((completedCount / totalItems) * 100)) : 0;

    const progress = await RoadmapProgress.findOneAndUpdate(
      { user: userId, roadmap: roadmapId },
      {
        $set: {
          completedItems: completedItemIds,
          itemCheckpoints: itemCheckpoints,
          progressPercentage,
          lastActiveAt: new Date(),
        },
      },
      { new: true, upsert: true, runValidators: true }
    ).populate('completedItems');

    try {
      let userProg = await UserProgress.findOne({ user: userId });
      if (!userProg) {
        userProg = await UserProgress.create({ user: userId });
      }
      if (userProg.recordActivity) {
        await userProg.recordActivity();
      } else {
        userProg.lastActiveDate = new Date();
        await userProg.save();
      }
    } catch (err) {
      console.warn('Could not record streak on roadmap progress:', err);
    }

    return progress;
  }

  static async updateProgressById(userId, progressId, updateData) {
    const progress = await RoadmapProgress.findOne({ _id: progressId, user: userId });
    if (!progress) {
      throw new AppError('Roadmap progress record not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (updateData.completedItems !== undefined) {
      progress.completedItems = updateData.completedItems;
      const totalItems = await RoadmapItem.countDocuments({ roadmap: progress.roadmap });
      progress.progressPercentage = totalItems > 0 ? Math.min(100, Math.round((progress.completedItems.length / totalItems) * 100)) : 0;
    }

    if (updateData.itemCheckpoints !== undefined) {
      progress.itemCheckpoints = updateData.itemCheckpoints;
    }

    progress.lastActiveAt = new Date();
    await progress.save();

    return progress;
  }
}

module.exports = RoadmapService;
