const express = require('express');
const router = express.Router();

const roadmapController = require('../controllers/roadmapController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateRoadmapProgress } = require('../validators/roadmapValidator');

// User Roadmap Progress Tracking (Protected)
router.get('/progress', protect, roadmapController.getUserRoadmapProgress);
router.post('/progress', protect, validate(validateRoadmapProgress), roadmapController.createOrUpdateRoadmapProgress);
router.put('/progress/:id', protect, roadmapController.updateProgressById);

// Public Roadmap Browsing
router.get('/', roadmapController.getAllRoadmaps);
router.get('/year/:year', roadmapController.getRoadmapByYear);
router.get('/semester/:semester', roadmapController.getRoadmapBySemester);
router.get('/:id', roadmapController.getRoadmapById);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), roadmapController.createRoadmap);
router.put('/:id', protect, restrictTo('admin'), roadmapController.updateRoadmap);
router.delete('/:id', protect, restrictTo('admin'), roadmapController.deleteRoadmap);

module.exports = router;
