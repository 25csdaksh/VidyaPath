const ResumeService = require('../services/resumeService');
const ApiResponse = require('../utils/apiResponse');

const createResume = async (req, res, next) => {
  try {
    const resume = await ResumeService.createResume(req.user._id, req.body);
    return ApiResponse.created(res, 'Resume created successfully.', resume);
  } catch (err) {
    next(err);
  }
};

const getUserResumes = async (req, res, next) => {
  try {
    const resumes = await ResumeService.getUserResumes(req.user._id);
    return ApiResponse.success(res, 'Resumes fetched successfully.', resumes);
  } catch (err) {
    next(err);
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const resume = await ResumeService.getResumeById(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Resume fetched successfully.', resume);
  } catch (err) {
    next(err);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const resume = await ResumeService.updateResume(req.user._id, req.params.id, req.body);
    return ApiResponse.success(res, 'Resume updated successfully.', resume);
  } catch (err) {
    next(err);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const resume = await ResumeService.deleteResume(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Resume deleted successfully.', resume);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
