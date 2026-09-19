const DashboardService = require('../services/dashboardService');
const ApiResponse = require('../utils/apiResponse');

const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await DashboardService.getStudentDashboard(req.user._id);
    return ApiResponse.success(res, 'Dashboard metrics fetched successfully.', dashboardData);
  } catch (err) {
    next(err);
  }
};

const recordRecentView = async (req, res, next) => {
  try {
    const recent = await DashboardService.recordRecentView(req.user._id, req.body);
    return ApiResponse.success(res, 'Recent view recorded successfully.', recent);
  } catch (err) {
    next(err);
  }
};

const getRecentViews = async (req, res, next) => {
  try {
    const recent = await DashboardService.getRecentViews(req.user._id);
    return ApiResponse.success(res, 'Recent views fetched successfully.', recent);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
  recordRecentView,
  getRecentViews,
};
