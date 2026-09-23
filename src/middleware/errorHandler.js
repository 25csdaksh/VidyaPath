const AppError = require('../utils/appError');
const ApiResponse = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const env = require('../config/env');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path || 'resource parameter'}: ${err.value || ''}`.trim();
  return new AppError(message, HTTP_STATUS.BAD_REQUEST);
};

const handleDuplicateFieldsDB = (err) => {
  let value = 'Duplicate field value';
  if (err.keyValue) {
    value = JSON.stringify(err.keyValue);
  } else if (err.errmsg) {
    const match = err.errmsg.match(/(["'])(\\?.)*?\1/);
    if (match) value = match[0];
  }
  const message = `Duplicate value: ${value}. Please use a unique value.`;
  return new AppError(message, HTTP_STATUS.CONFLICT);
};

const handleValidationErrorDB = (err) => {
  const errors = err.errors
    ? Object.values(err.errors).map((el) => ({
        field: el.path,
        message: el.message,
      }))
    : [];
  const message = 'Invalid input data.';
  return new AppError(message, HTTP_STATUS.BAD_REQUEST, errors);
};

const handleJWTError = () =>
  new AppError('Invalid authentication token. Please log in again.', HTTP_STATUS.UNAUTHORIZED);

const handleJWTExpiredError = () =>
  new AppError('Authentication token has expired. Please log in again.', HTTP_STATUS.UNAUTHORIZED);

// Centralized Error Handler Middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Transform Mongoose & JWT specific errors into AppErrors
  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.isOperational ? error.message : 'Internal Server Error';

  if (env.IS_DEVELOPMENT && !error.isOperational) {
    console.error('[UNHANDLED ERROR LOG]', err);
  }

  return ApiResponse.error(res, message, statusCode, error.errors);
};

module.exports = errorHandler;
