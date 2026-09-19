import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { ENV } from './config/env';
import apiRouter from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { globalApiLimiter } from './middlewares/rateLimiter.middleware';
import { AppError } from './utils/appError';

export const createApp = (): Application => {
  const app = express();

  // Security & Optimization Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  if (ENV.NODE_ENV !== 'test') {
    app.use(morgan(ENV.NODE_ENV === 'production' ? 'combined' : 'dev'));
  }

  // Rate limiter on API routes
  app.use('/api', globalApiLimiter);

  // Mount API v1
  app.use('/api/v1', apiRouter);

  // 404 Route Handler
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Cannot find ${req.method} ${req.originalUrl} on this server`, 404));
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
