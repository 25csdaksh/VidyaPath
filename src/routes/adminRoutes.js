const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateAdminUser, validateAdminSkill } = require('../validators/adminValidator');

// Protect all admin routes: Requires valid JWT + role: 'admin'
router.use(protect, restrictTo('admin'));

// Platform Analytics & Metrics
router.get('/stats', AdminController.getStats);

// Audit Logging Trail
router.get('/audit-logs', AdminController.getAuditLogs);

// User & Student Account Administration
router.get('/users', AdminController.getUsers);
router.get('/users/:id', AdminController.getUserById);
router.post('/users', validate((data) => validateAdminUser(data, false)), AdminController.createUser);
router.put('/users/:id', validate((data) => validateAdminUser(data, true)), AdminController.updateUser);
router.patch('/users/:id/status', AdminController.toggleUserStatus);
router.delete('/users/:id', AdminController.deleteUser);

// Skill Taxonomy Administration
router.get('/skills', AdminController.getSkills);
router.post('/skills', validate((data) => validateAdminSkill(data, false)), AdminController.createSkill);
router.put('/skills/:id', validate((data) => validateAdminSkill(data, true)), AdminController.updateSkill);
router.delete('/skills/:id', AdminController.deleteSkill);

// Universal Publish / Unpublish Toggle for any entity
router.patch('/:resourceType/:id/publish', AdminController.togglePublish);

module.exports = router;
