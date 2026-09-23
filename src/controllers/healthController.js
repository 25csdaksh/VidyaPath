const HealthService = require('../services/healthService');
const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class HealthController {
  static getHealth(req, res, next) {
    try {
      const healthData = HealthService.getHealthStatus();
      return ApiResponse.success(res, 'CSE Career Portal API is running', healthData, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HealthController;
