const express = require('express');
const router = express.Router();

const youtubeController = require('../controllers/youtubeController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', youtubeController.getYouTubeResources);
router.get('/:id', youtubeController.getYouTubeResourceById);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), youtubeController.createYouTubeResource);
router.put('/:id', protect, restrictTo('admin'), youtubeController.updateYouTubeResource);
router.delete('/:id', protect, restrictTo('admin'), youtubeController.deleteYouTubeResource);

module.exports = router;
