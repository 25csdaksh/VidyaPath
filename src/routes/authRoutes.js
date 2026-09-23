const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
} = require('../validators/authValidator');

// Public authentication routes
router.post('/register', authLimiter, validate(validateRegister), authController.register);
router.post('/login', authLimiter, validate(validateLogin), authController.login);
router.post('/forgot-password', authLimiter, validate(validateForgotPassword), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(validateResetPassword), authController.resetPassword);

// Protected authentication routes
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.post('/change-password', protect, validate(validateChangePassword), authController.changePassword);

module.exports = router;
