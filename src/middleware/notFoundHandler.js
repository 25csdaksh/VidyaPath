const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

const notFoundHandler = (req, res, next) => {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl} on this server`, HTTP_STATUS.NOT_FOUND));
};

module.exports = notFoundHandler;
