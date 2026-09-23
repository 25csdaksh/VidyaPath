const express = require('express');
const router = express.Router();

const bookmarkController = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateBookmark } = require('../validators/bookmarkValidator');

router.use(protect); // All bookmark routes require authentication

router.get('/', bookmarkController.getUserBookmarks);
router.post('/', validate(validateBookmark), bookmarkController.createBookmark);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
