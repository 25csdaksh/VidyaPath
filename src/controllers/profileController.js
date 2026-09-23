const ProfileService = require('../services/profileService');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get profile for currently authenticated user
 * @route   GET /api/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const result = await ProfileService.getProfileByUserId(req.user._id);
    return ApiResponse.success(res, 'User profile fetched successfully.', result);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update profile for currently authenticated user
 * @route   PUT /api/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const result = await ProfileService.updateProfileByUserId(req.user._id, req.body);
    return ApiResponse.success(res, 'Profile updated successfully.', result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
