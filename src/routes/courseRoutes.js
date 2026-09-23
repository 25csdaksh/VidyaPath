const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), courseController.createCourse);
router.put('/:id', protect, restrictTo('admin'), courseController.updateCourse);
router.delete('/:id', protect, restrictTo('admin'), courseController.deleteCourse);

module.exports = router;
