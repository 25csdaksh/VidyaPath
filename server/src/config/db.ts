import mongoose from 'mongoose';
import { ENV } from './env';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      autoIndex: true,
    });
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Database connection error:', error);
    // Non-blocking in dev mode for initial foundation if local Mongo isn't running yet
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
