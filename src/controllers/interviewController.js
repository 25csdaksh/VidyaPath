const InterviewService = require('../services/interviewService');
const ApiResponse = require('../utils/apiResponse');

const getInterviewQuestions = async (req, res, next) => {
  try {
    const { questions, meta } = await InterviewService.getInterviewQuestions(req.query);
    return ApiResponse.success(res, 'Interview questions fetched successfully.', questions, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getInterviewQuestionById = async (req, res, next) => {
  try {
    const question = await InterviewService.getInterviewQuestionById(req.params.id);
    return ApiResponse.success(res, 'Interview question details fetched successfully.', question);
  } catch (err) {
    next(err);
  }
};

const createInterviewQuestion = async (req, res, next) => {
  try {
    const question = await InterviewService.createInterviewQuestion(req.body, req);
    return ApiResponse.success(res, 'Interview question created successfully.', question, 201);
  } catch (err) {
    next(err);
  }
};

const updateInterviewQuestion = async (req, res, next) => {
  try {
    const question = await InterviewService.updateInterviewQuestion(req.params.id, req.body, req);
    return ApiResponse.success(res, 'Interview question updated successfully.', question);
  } catch (err) {
    next(err);
  }
};

const deleteInterviewQuestion = async (req, res, next) => {
  try {
    const result = await InterviewService.deleteInterviewQuestion(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

const markQuestionComplete = async (req, res, next) => {
  try {
    const result = await InterviewService.markQuestionComplete(req.user._id, req.params.id);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

const getUserInterviewProgress = async (req, res, next) => {
  try {
    const progress = await InterviewService.getUserInterviewProgress(req.user._id);
    return ApiResponse.success(res, 'User interview progress fetched successfully.', progress);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getInterviewQuestions,
  getInterviewQuestionById,
  createInterviewQuestion,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  markQuestionComplete,
  getUserInterviewProgress,
};
