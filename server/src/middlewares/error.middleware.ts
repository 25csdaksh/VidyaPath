import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ApiResponse } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: any[] | undefined = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if ((err as any).name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values((err as any).errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  } else if ((err as any).name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  } else if ((err as any).name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired';
  } else {
    logger.error('Unhandled Error:', err);
  }

  ApiResponse.error(res, message, statusCode, errors);
};
