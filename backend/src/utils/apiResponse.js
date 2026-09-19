const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class ApiResponse {
  static success(res, message = 'Success', data = null, statusCode = HTTP_STATUS.OK, meta = null) {
    const response = {
      success: true,
      message,
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    if (meta !== null && meta !== undefined) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  static created(res, message = 'Created successfully', data = null) {
    return this.success(res, message, data, HTTP_STATUS.CREATED);
  }

  static error(res, message = 'An error occurred', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors !== null && errors !== undefined) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
