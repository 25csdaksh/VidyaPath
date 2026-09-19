const ResourceService = require('../services/resourceService');
const ApiResponse = require('../utils/apiResponse');

const getResources = async (req, res, next) => {
  try {
    const { resources, meta } = await ResourceService.getResources(req.query);
    return ApiResponse.success(res, 'Resources fetched successfully.', resources, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getResourceByIdOrSlug = async (req, res, next) => {
  try {
    const resource = await ResourceService.getResourceByIdOrSlug(req.params.idOrSlug);
    return ApiResponse.success(res, 'Resource details fetched successfully.', resource);
  } catch (err) {
    next(err);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await ResourceService.createResource(req.body, req);
    return ApiResponse.success(res, 'Resource created successfully.', resource, 201);
  } catch (err) {
    next(err);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resource = await ResourceService.updateResource(req.params.id, req.body, req);
    return ApiResponse.success(res, 'Resource updated successfully.', resource);
  } catch (err) {
    next(err);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const result = await ResourceService.deleteResource(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResources,
  getResourceByIdOrSlug,
  createResource,
  updateResource,
  deleteResource,
};
