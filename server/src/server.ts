import { createApp } from './app';
import { ENV } from './config/env';
import { connectDatabase } from './config/db';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  // Connect Database
  await connectDatabase();

  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    logger.info(`=========================================`);
    logger.info(` CSE Career Portal Server is running!`);
    logger.info(` Environment: ${ENV.NODE_ENV}`);
    logger.info(` Listening on: http://localhost:${ENV.PORT}`);
    logger.info(` API Health:   http://localhost:${ENV.PORT}/api/v1/health`);
    logger.info(`=========================================`);
  });

  const handleShutdown = (signal: string) => {
    logger.info(`${signal} received. Gracefully shutting down...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer().catch((err) => {
  logger.error('Fatal Server Boot Error:', err);
  process.exit(1);
});
