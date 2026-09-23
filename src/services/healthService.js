const mongoose = require('mongoose');
const env = require('../config/env');

class HealthService {
  static getHealthStatus() {
    const dbStateMap = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
    };

    const dbStatus = dbStateMap[mongoose.connection.readyState] || 'Unknown';

    return {
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: {
        status: dbStatus,
        name: mongoose.connection.name || null,
      },
      system: {
        nodeVersion: process.version,
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    };
  }
}

module.exports = HealthService;
