const express = require('express');
const HealthController = require('../controllers/healthController');

const router = express.Router();

// GET /api/health
router.get('/', HealthController.getHealth);

module.exports = router;
