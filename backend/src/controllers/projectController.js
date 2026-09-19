const ProjectService = require('../services/projectService');
const ApiResponse = require('../utils/apiResponse');

const getProjects = async (req, res, next) => {
  try {
    const { projects, meta } = await ProjectService.getProjects(req.query);
    return ApiResponse.success(res, 'Projects fetched successfully.', projects, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await ProjectService.getProjectBySlugOrId(req.params.slug);
    return ApiResponse.success(res, 'Project details fetched successfully.', project);
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await ProjectService.createProject(req.body, req.user._id);
    return ApiResponse.created(res, 'Project created successfully.', project);
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await ProjectService.updateProject(req.params.id, req.body, req.user._id);
    return ApiResponse.success(res, 'Project updated successfully.', project);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await ProjectService.deleteProject(req.params.id);
    return ApiResponse.success(res, 'Project deleted successfully.', project);
  } catch (err) {
    next(err);
  }
};

// --- Student Project Progress Tracking Controllers ---
const getUserProjectProgress = async (req, res, next) => {
  try {
    const items = await ProjectService.getUserProjectProgress(req.user._id);
    return ApiResponse.success(res, 'User project progress fetched successfully.', items);
  } catch (err) {
    next(err);
  }
};

const getProjectProgressById = async (req, res, next) => {
  try {
    const progress = await ProjectService.getProjectProgressById(req.user._id, req.params.projectId);
    return ApiResponse.success(res, 'Project progress fetched successfully.', progress || { status: 'Not Tracked' });
  } catch (err) {
    next(err);
  }
};

const updateProjectProgress = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId;
    const progress = await ProjectService.createOrUpdateProjectProgress(req.user._id, projectId, req.body);
    return ApiResponse.success(res, 'Project progress updated successfully.', progress);
  } catch (err) {
    next(err);
  }
};

const deleteProjectProgress = async (req, res, next) => {
  try {
    const deleted = await ProjectService.deleteProjectProgress(req.user._id, req.params.projectId);
    return ApiResponse.success(res, 'Project progress tracking removed successfully.', deleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  getUserProjectProgress,
  getProjectProgressById,
  updateProjectProgress,
  deleteProjectProgress,
};
