const { Course } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const AuditService = require('./auditService');

class CourseService {
  static async getCourses(query) {
    const { page, limit, skip } = getPagination(query, 12);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.provider) {
      filter.provider = query.provider;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    const [courses, totalItems] = await Promise.all([
      Course.find(filter).sort({ rating: -1, title: 1 }).skip(skip).limit(limit),
      Course.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { courses, meta };
  }

  static async getCourseById(id) {
    const course = await Course.findById(id);
    if (!course) {
      throw new AppError('Course not found.', HTTP_STATUS.NOT_FOUND);
    }
    return course;
  }

  static async createCourse(data, req) {
    const course = await Course.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'Course',
        resourceId: course._id,
        resourceTitle: course.title,
        details: { provider: course.provider, category: course.category },
      });
    }
    return course;
  }

  static async updateCourse(id, data, req) {
    const course = await Course.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!course) {
      throw new AppError('Course not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'Course',
        resourceId: course._id,
        resourceTitle: course.title,
        details: { provider: course.provider, category: course.category },
      });
    }
    return course;
  }

  static async deleteCourse(id, req) {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      throw new AppError('Course not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'Course',
        resourceId: id,
        resourceTitle: course.title,
        details: { provider: course.provider },
      });
    }
    return { success: true, message: 'Course deleted successfully.' };
  }
}

module.exports = CourseService;
