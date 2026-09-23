const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

const validate = (validatorFn) => {
  return (req, res, next) => {
    const errors = validatorFn(req.body);
    if (errors && errors.length > 0) {
      return next(new AppError('Validation failed. Please check your inputs.', HTTP_STATUS.BAD_REQUEST, errors));
    }
    next();
  };
};

module.exports = validate;
