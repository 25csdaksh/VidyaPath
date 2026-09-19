const HackathonService = require('../services/hackathonService');
const ApiResponse = require('../utils/apiResponse');

const getHackathons = async (req, res, next) => {
  try {
    const { hackathons, meta } = await HackathonService.getHackathons(req.query);
    return ApiResponse.success(res, 'Hackathons fetched successfully.', hackathons, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getHackathonById = async (req, res, next) => {
  try {
    const hackathon = await HackathonService.getHackathonById(req.params.id);
    return ApiResponse.success(res, 'Hackathon details fetched successfully.', hackathon);
  } catch (err) {
    next(err);
  }
};

const createHackathon = async (req, res, next) => {
  try {
    const hackathon = await HackathonService.createHackathon(req.body);
    return ApiResponse.created(res, 'Hackathon created successfully.', hackathon);
  } catch (err) {
    next(err);
  }
};

const updateHackathon = async (req, res, next) => {
  try {
    const hackathon = await HackathonService.updateHackathon(req.params.id, req.body);
    return ApiResponse.success(res, 'Hackathon updated successfully.', hackathon);
  } catch (err) {
    next(err);
  }
};

const deleteHackathon = async (req, res, next) => {
  try {
    const hackathon = await HackathonService.deleteHackathon(req.params.id);
    return ApiResponse.success(res, 'Hackathon deleted successfully.', hackathon);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
};
