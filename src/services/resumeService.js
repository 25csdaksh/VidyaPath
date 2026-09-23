const { Resume } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class ResumeService {
  static async createResume(userId, data) {
    const resume = await Resume.create({
      ...data,
      user: userId,
    });
    return resume;
  }

  static async getUserResumes(userId) {
    const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
    return resumes;
  }

  static async getResumeById(userId, resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    if (!resume) {
      throw new AppError('Resume not found.', HTTP_STATUS.NOT_FOUND);
    }
    return resume;
  }

  static async updateResume(userId, resumeId, data) {
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, user: userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!resume) {
      throw new AppError('Resume not found.', HTTP_STATUS.NOT_FOUND);
    }

    return resume;
  }

  static async deleteResume(userId, resumeId) {
    const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });
    if (!resume) {
      throw new AppError('Resume not found.', HTTP_STATUS.NOT_FOUND);
    }
    return resume;
  }
}

module.exports = ResumeService;
