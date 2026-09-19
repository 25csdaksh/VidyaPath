const YouTubeService = require('../services/youtubeService');
const ApiResponse = require('../utils/apiResponse');

const getYouTubeResources = async (req, res, next) => {
  try {
    const { resources, meta } = await YouTubeService.getYouTubeResources(req.query);
    return ApiResponse.success(res, 'YouTube resources fetched successfully.', resources, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getYouTubeResourceById = async (req, res, next) => {
  try {
    const resource = await YouTubeService.getYouTubeResourceById(req.params.id);
    return ApiResponse.success(res, 'YouTube resource details fetched successfully.', resource);
  } catch (err) {
    next(err);
  }
};

const createYouTubeResource = async (req, res, next) => {
  try {
    const resource = await YouTubeService.createYouTubeResource(req.body, req);
    return ApiResponse.success(res, 'YouTube resource created successfully.', resource, 201);
  } catch (err) {
    next(err);
  }
};

const updateYouTubeResource = async (req, res, next) => {
  try {
    const resource = await YouTubeService.updateYouTubeResource(req.params.id, req.body, req);
    return ApiResponse.success(res, 'YouTube resource updated successfully.', resource);
  } catch (err) {
    next(err);
  }
};

const deleteYouTubeResource = async (req, res, next) => {
  try {
    const result = await YouTubeService.deleteYouTubeResource(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getYouTubeResources,
  getYouTubeResourceById,
  createYouTubeResource,
  updateYouTubeResource,
  deleteYouTubeResource,
};
