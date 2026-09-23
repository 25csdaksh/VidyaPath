const express = require('express');
const router = express.Router();

const resourceController = require('../controllers/resourceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', resourceController.getResources);
router.get('/:idOrSlug', resourceController.getResourceByIdOrSlug);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), resourceController.createResource);
router.put('/:id', protect, restrictTo('admin'), resourceController.updateResource);
router.delete('/:id', protect, restrictTo('admin'), resourceController.deleteResource);

module.exports = router;
