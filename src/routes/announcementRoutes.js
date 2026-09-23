const express = require('express');
const router = express.Router();

const announcementController = require('../controllers/announcementController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateAnnouncement } = require('../validators/announcementValidator');

// Public Announcements
router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);

// Admin Announcement CRUD
router.post(
  '/',
  protect,
  restrictTo('admin'),
  validate((data) => validateAnnouncement(data, false)),
  announcementController.createAnnouncement
);

router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  validate((data) => validateAnnouncement(data, true)),
  announcementController.updateAnnouncement
);

router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  announcementController.deleteAnnouncement
);

module.exports = router;
