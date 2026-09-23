const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// Ensure reliable SRV DNS resolution for MongoDB Atlas across all operating systems & ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const connectDatabase = async (retries = 3, delayMs = 3000) => {
  const options = {
    autoIndex: !env.IS_PRODUCTION,
    dbName: 'cse_career_portal',
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[DATABASE] Attempting MongoDB connection (attempt ${attempt}/${retries})...`);
      const connection = await mongoose.connect(env.MONGODB_URI, options);
      console.log(`[DATABASE] MongoDB Connected: ${connection.connection.host}/${connection.connection.name}`);
      return connection;
    } catch (error) {
      console.error(`[DATABASE] MongoDB Connection Attempt ${attempt} Failed: ${error.message}`);
      if (attempt < retries) {
        console.log(`[DATABASE] Retrying in ${delayMs / 1000}s...`);
        await new Promise((res) => setTimeout(res, delayMs));
      } else {
        if (env.IS_PRODUCTION) {
          console.error('[DATABASE] All connection attempts failed. Check MongoDB Atlas Network Access IP Whitelist (allow 0.0.0.0/0).');
          process.exit(1);
        } else {
          console.warn('[DATABASE] Running in development mode. Server will remain running; ensure MongoDB is started locally.');
        }
      }
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
