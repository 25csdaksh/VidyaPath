const app = require('./src/app');
const env = require('./src/config/env');
const { connectDatabase, closeDatabaseConnection } = require('./src/config/db');

const startServer = async () => {
  // Connect to Database
  await connectDatabase();

  // Start HTTP Server
  const server = app.listen(env.PORT, () => {
    console.log('====================================================');
    console.log(` 🚀 CSE Career Portal Backend API is running!`);
    console.log(` 🌐 Environment: ${env.NODE_ENV}`);
    console.log(` 📡 Base URL:    http://localhost:${env.PORT}`);
    console.log(` 🩺 Health API:  http://localhost:${env.PORT}/api/health`);
    console.log('====================================================');
  });

  // Graceful Shutdown Handler
  const handleGracefulShutdown = (signal) => {
    console.log(`\n[SERVER] ${signal} signal received. Starting graceful shutdown...`);
    server.close(async () => {
      console.log('[SERVER] HTTP server closed.');
      await closeDatabaseConnection();
      console.log('[SERVER] Graceful shutdown completed. Process exiting.');
      process.exit(0);
    });

    // Force exit if shutdown hangs
    setTimeout(() => {
      console.error('[SERVER] Forced shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

  process.on('unhandledRejection', (reason, promise) => {
    console.error('[FATAL] Unhandled Promise Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('[FATAL] Uncaught Exception thrown:', error);
    process.exit(1);
  });
};

startServer();
