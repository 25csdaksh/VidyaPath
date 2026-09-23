const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateProject } = require('../validators/projectValidator');

// Student Project Progress Tracking (Protected)
router.get('/progress', protect, projectController.getUserProjectProgress);
router.get('/progress/:projectId', protect, projectController.getProjectProgressById);
router.post('/progress', protect, projectController.updateProjectProgress);
router.put('/progress/:projectId', protect, projectController.updateProjectProgress);
router.delete('/progress/:projectId', protect, projectController.deleteProjectProgress);

// Public Project Hub endpoints
router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);

// Admin-Only Project Management endpoints
router.post(
  '/',
  protect,
  restrictTo('admin'),
  validate((data) => validateProject(data, false)),
  projectController.createProject
);

router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  validate((data) => validateProject(data, true)),
  projectController.updateProject
);

router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  projectController.deleteProject
);

module.exports = router;
