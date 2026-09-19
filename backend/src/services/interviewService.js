const { InterviewQuestion, UserProgress } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const AuditService = require('./auditService');
const { escapeRegex } = require('../utils/sanitize');

class InterviewService {
  static async getInterviewQuestions(query) {
    const { page, limit, skip } = getPagination(query, 15);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.topic) {
      filter.topic = new RegExp(escapeRegex(query.topic.trim()), 'i');
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    if (query.tags) {
      const tagList = Array.isArray(query.tags) ? query.tags : query.tags.split(',').map((t) => t.trim());
      filter.tags = { $in: tagList };
    }

    const [questions, totalItems] = await Promise.all([
      InterviewQuestion.find(filter)
        .sort({ category: 1, difficulty: 1 })
        .skip(skip)
        .limit(limit)
        .populate('relatedSkills', 'name category'),
      InterviewQuestion.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { questions, meta };
  }

  static async getInterviewQuestionById(id) {
    const question = await InterviewQuestion.findById(id)
      .populate('relatedSkills')
      .populate('relatedProjects', 'title slug difficulty category');

    if (!question) {
      throw new AppError('Interview question not found.', HTTP_STATUS.NOT_FOUND);
    }

    return question;
  }

  static async createInterviewQuestion(data, req) {
    const question = await InterviewQuestion.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'InterviewQuestion',
        resourceId: question._id,
        resourceTitle: question.question,
        details: { category: question.category, topic: question.topic, difficulty: question.difficulty },
      });
    }
    return question;
  }

  static async updateInterviewQuestion(id, data, req) {
    const question = await InterviewQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!question) {
      throw new AppError('Interview question not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'InterviewQuestion',
        resourceId: question._id,
        resourceTitle: question.question,
        details: { category: question.category, topic: question.topic },
      });
    }
    return question;
  }

  static async deleteInterviewQuestion(id, req) {
    const question = await InterviewQuestion.findByIdAndDelete(id);
    if (!question) {
      throw new AppError('Interview question not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'InterviewQuestion',
        resourceId: id,
        resourceTitle: question.question,
        details: { category: question.category, topic: question.topic },
      });
    }
    return { success: true, message: 'Interview question deleted successfully.' };
  }

  static async markQuestionComplete(userId, questionId) {
    const question = await InterviewQuestion.findById(questionId);
    if (!question) {
      throw new AppError('Interview question not found.', HTTP_STATUS.NOT_FOUND);
    }

    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = await UserProgress.create({ user: userId });
    }

    const alreadyCompleted = progress.interviewPracticedQuestions.some(
      (item) => item.question.toString() === questionId
    );

    if (!alreadyCompleted) {
      progress.interviewPracticedQuestions.push({
        question: question._id,
        practicedAt: new Date(),
        topic: question.topic,
      });

      // Recalculate score
      const totalPracticed = progress.interviewPracticedQuestions.length;
      progress.readinessScores.coreCsScore = Math.min(100, totalPracticed * 5);
      progress.readinessScores.overallPlacementScore = Math.round(
        (progress.readinessScores.dsaScore +
          progress.readinessScores.coreCsScore +
          progress.readinessScores.projectsScore) /
          3
      );
      progress.lastActiveDate = new Date();

      await progress.save();
    }

    return {
      message: 'Question marked as practiced successfully.',
      practicedCount: progress.interviewPracticedQuestions.length,
      readinessScores: progress.readinessScores,
    };
  }

  static async getUserInterviewProgress(userId) {
    const progress = await UserProgress.findOne({ user: userId }).populate(
      'interviewPracticedQuestions.question',
      'question category topic difficulty'
    );

    if (!progress) {
      return {
        totalPracticed: 0,
        practicedQuestions: [],
        readinessScores: { coreCsScore: 0, overallPlacementScore: 0 },
      };
    }

    return {
      totalPracticed: progress.interviewPracticedQuestions.length,
      practicedQuestions: progress.interviewPracticedQuestions,
      readinessScores: progress.readinessScores,
    };
  }
}

module.exports = InterviewService;
