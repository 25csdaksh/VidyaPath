const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// Ensure reliable SRV DNS resolution for MongoDB Atlas across all operating systems & ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const connectDatabase = async () => {
  const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    const connection = await mongoose.connect(env.MONGODB_URI, options);
    console.log(`[DATABASE] MongoDB Connected: ${connection.connection.host}/${connection.connection.name}`);
  } catch (error) {
    console.error(`[DATABASE] Initial MongoDB Connection Error: ${error.message}`);
    if (env.IS_PRODUCTION) {
      console.error('[DATABASE] Exiting process due to database connection failure in production.');
      process.exit(1);
    } else {
      console.warn('[DATABASE] Running in development mode. Server will remain running; ensure MongoDB is started locally.');
    }
  }
};

// Lifecycle Event Listeners
mongoose.connection.on('connected', () => {
  console.log('[DATABASE] Mongoose connection established.');
});

mongoose.connection.on('error', (err) => {
  console.error(`[DATABASE] Mongoose runtime connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[DATABASE] Mongoose connection disconnected. Attempting reconnection...');
});

mongoose.connection.on('reconnected', () => {
  console.log('[DATABASE] Mongoose reconnected successfully.');
});

// Graceful Shutdown
const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close(false);
    console.log('[DATABASE] Mongoose connection closed gracefully.');
  } catch (err) {
    console.error(`[DATABASE] Error while closing Mongoose connection: ${err.message}`);
  }
};

module.exports = {
  connectDatabase,
  closeDatabaseConnection,
};
