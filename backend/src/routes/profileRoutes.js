const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateUpdateProfile } = require('../validators/profileValidator');

// Protected profile routes
router.get('/', protect, profileController.getProfile);
router.put('/', protect, validate(validateUpdateProfile), profileController.updateProfile);

module.exports = router;
