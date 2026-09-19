const RoadmapService = require('../services/roadmapService');
const ApiResponse = require('../utils/apiResponse');

const getAllRoadmaps = async (req, res, next) => {
  try {
    const includeInactive = req.user && req.user.role === 'admin';
    const roadmaps = await RoadmapService.getAllRoadmaps(includeInactive);
    return ApiResponse.success(res, 'Roadmaps fetched successfully.', roadmaps);
  } catch (err) {
    next(err);
  }
};

const getRoadmapById = async (req, res, next) => {
  try {
    const result = await RoadmapService.getRoadmapByIdOrSlug(req.params.id);
    return ApiResponse.success(res, 'Roadmap details fetched successfully.', result);
  } catch (err) {
    next(err);
  }
};

const getRoadmapByYear = async (req, res, next) => {
  try {
    const roadmaps = await RoadmapService.getRoadmapByYear(req.params.year);
    return ApiResponse.success(res, `Roadmaps for year ${req.params.year} fetched successfully.`, roadmaps);
  } catch (err) {
    next(err);
  }
};

const getRoadmapBySemester = async (req, res, next) => {
  try {
    const result = await RoadmapService.getRoadmapBySemester(req.params.semester);
    return ApiResponse.success(res, `Roadmap for semester ${req.params.semester} fetched successfully.`, result);
  } catch (err) {
    next(err);
  }
};

const createRoadmap = async (req, res, next) => {
  try {
    const roadmap = await RoadmapService.createRoadmap(req.body, req);
    return ApiResponse.success(res, 'Roadmap created successfully.', roadmap, 201);
  } catch (err) {
    next(err);
  }
};

const updateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await RoadmapService.updateRoadmap(req.params.id, req.body, req);
    return ApiResponse.success(res, 'Roadmap updated successfully.', roadmap);
  } catch (err) {
    next(err);
  }
};

const deleteRoadmap = async (req, res, next) => {
  try {
    const result = await RoadmapService.deleteRoadmap(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

const getUserRoadmapProgress = async (req, res, next) => {
  try {
    const progress = await RoadmapService.getUserRoadmapProgress(req.user._id);
    return ApiResponse.success(res, 'User roadmap progress fetched successfully.', progress);
  } catch (err) {
    next(err);
  }
};

const createOrUpdateRoadmapProgress = async (req, res, next) => {
  try {
    const progress = await RoadmapService.createOrUpdateRoadmapProgress(req.user._id, req.body);
    return ApiResponse.success(res, 'Roadmap progress saved successfully.', progress);
  } catch (err) {
    next(err);
  }
};

const updateProgressById = async (req, res, next) => {
  try {
    const progress = await RoadmapService.updateProgressById(req.user._id, req.params.id, req.body);
    return ApiResponse.success(res, 'Roadmap progress updated successfully.', progress);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRoadmaps,
  getRoadmapById,
  getRoadmapByYear,
  getRoadmapBySemester,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  getUserRoadmapProgress,
  createOrUpdateRoadmapProgress,
  updateProgressById,
};
