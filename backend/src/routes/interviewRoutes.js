const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interviewController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// User Interview Progress Tracking (Protected)
router.get('/progress', protect, interviewController.getUserInterviewProgress);
router.post('/:id/complete', protect, interviewController.markQuestionComplete);

// Public Interview Question Catalog
router.get('/', interviewController.getInterviewQuestions);
router.get('/:id', interviewController.getInterviewQuestionById);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), interviewController.createInterviewQuestion);
router.put('/:id', protect, restrictTo('admin'), interviewController.updateInterviewQuestion);
router.delete('/:id', protect, restrictTo('admin'), interviewController.deleteInterviewQuestion);

module.exports = router;
