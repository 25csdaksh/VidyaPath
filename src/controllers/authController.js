const AuthService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

/**
 * @desc    Register a new student account
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const result = await AuthService.registerUser(req.body);
    return ApiResponse.created(res, 'User registered successfully.', result);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return ApiResponse.success(res, 'Login successful.', result);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Log user out / invalidate session
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'Logged out successfully. Please clear client-side token.', null);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get current authenticated user info
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await AuthService.getCurrentUser(req.user._id);
    return ApiResponse.success(res, 'Current user profile fetched successfully.', user);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Initiate password reset via token
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const result = await AuthService.forgotPassword(req.body.email);
    return ApiResponse.success(res, result.message, { resetToken: result.resetToken });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Reset password using valid reset token
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const result = await AuthService.resetPassword(token, newPassword);
    return ApiResponse.success(res, result.message, { token: result.token });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Change password while authenticated
 * @route   POST /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await AuthService.changePassword(req.user._id, currentPassword, newPassword);
    return ApiResponse.success(res, result.message, { token: result.token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
};
