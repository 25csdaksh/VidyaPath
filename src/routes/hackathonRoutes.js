const express = require('express');
const router = express.Router();

const hackathonController = require('../controllers/hackathonController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateHackathon } = require('../validators/hackathonValidator');

// Public Hackathon Hub
router.get('/', hackathonController.getHackathons);
router.get('/:id', hackathonController.getHackathonById);

// Admin Hackathon CRUD
router.post(
  '/',
  protect,
  restrictTo('admin'),
  validate((data) => validateHackathon(data, false)),
  hackathonController.createHackathon
);

router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  validate((data) => validateHackathon(data, true)),
  hackathonController.updateHackathon
);

router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  hackathonController.deleteHackathon
);

module.exports = router;
