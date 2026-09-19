const express = require('express');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

// Mount Health Route: /api/health
router.use('/health', healthRoutes);

module.exports = router;
