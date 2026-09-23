const { Hackathon } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

class HackathonService {
  static async getHackathons(query) {
    const { page, limit, skip } = getPagination(query, 10);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.mode) {
      filter.mode = query.mode;
    }

    const [hackathons, totalItems] = await Promise.all([
      Hackathon.find(filter).sort({ registrationDeadline: 1, startDate: 1 }).skip(skip).limit(limit),
      Hackathon.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { hackathons, meta };
  }

  static async getHackathonById(id) {
    const hackathon = await Hackathon.findById(id);
    if (!hackathon) {
      throw new AppError('Hackathon not found.', HTTP_STATUS.NOT_FOUND);
    }
    return hackathon;
  }

  static async createHackathon(data) {
    return await Hackathon.create(data);
  }

  static async updateHackathon(id, data) {
    const hackathon = await Hackathon.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!hackathon) {
      throw new AppError('Hackathon not found.', HTTP_STATUS.NOT_FOUND);
    }
    return hackathon;
  }

  static async deleteHackathon(id) {
    const hackathon = await Hackathon.findByIdAndDelete(id);
    if (!hackathon) {
      throw new AppError('Hackathon not found.', HTTP_STATUS.NOT_FOUND);
    }
    return hackathon;
  }
}

module.exports = HackathonService;
