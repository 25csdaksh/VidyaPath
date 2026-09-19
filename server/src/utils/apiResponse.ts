import { Response } from 'express';

export interface MetaPagination {
  page?: number;
  limit?: number;
  totalItems?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data: T | null = null,
    statusCode = 200,
    meta?: MetaPagination
  ): Response {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      ...(meta && { meta }),
    });
  }

  static created<T>(res: Response, message: string, data: T): Response {
    return this.success(res, message, data, 201);
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: any[]
  ): Response {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors && { errors }),
    });
  }
}
