const { Announcement } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

class AnnouncementService {
  static async getAnnouncements(query) {
    const { page, limit, skip } = getPagination(query, 10);
    const filter = { isBroadcast: true };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.priority) {
      filter.priority = query.priority;
    }

    const [announcements, totalItems] = await Promise.all([
      Announcement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Announcement.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { announcements, meta };
  }

  static async getAnnouncementById(id) {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      throw new AppError('Announcement not found.', HTTP_STATUS.NOT_FOUND);
    }
    return announcement;
  }

  static async createAnnouncement(data) {
    return await Announcement.create(data);
  }

  static async updateAnnouncement(id, data) {
    const announcement = await Announcement.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!announcement) {
      throw new AppError('Announcement not found.', HTTP_STATUS.NOT_FOUND);
    }
    return announcement;
  }

  static async deleteAnnouncement(id) {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      throw new AppError('Announcement not found.', HTTP_STATUS.NOT_FOUND);
    }
    return announcement;
  }
}

module.exports = AnnouncementService;
