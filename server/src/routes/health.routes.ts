import { Router, Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  ApiResponse.success(res, 'CSE Career Portal Backend API is healthy and running', {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
