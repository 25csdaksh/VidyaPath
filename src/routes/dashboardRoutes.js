const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Dashboard requires authentication

router.get('/', dashboardController.getDashboard);
router.post('/recent-views', dashboardController.recordRecentView);
router.get('/recent-views', dashboardController.getRecentViews);

module.exports = router;
