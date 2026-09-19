const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', HTTP_STATUS.UNAUTHORIZED)
    );
  }

  try {
    // 1. Verify Token
    const decoded = await verifyToken(token);

    // 2. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', HTTP_STATUS.UNAUTHORIZED)
      );
    }

    // 3. Check if user is active
    if (!currentUser.isActive) {
      return next(
        new AppError('Your account has been deactivated. Please contact support.', HTTP_STATUS.FORBIDDEN)
      );
    }

    // 4. Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('Password recently changed. Please log in again.', HTTP_STATUS.UNAUTHORIZED)
      );
    }

    // Grant access & attach user
    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid authentication token.', HTTP_STATUS.UNAUTHORIZED));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Authentication token has expired. Please log in again.', HTTP_STATUS.UNAUTHORIZED));
    }
    return next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('Forbidden: You do not have permission to perform this action.', HTTP_STATUS.FORBIDDEN)
      );
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
