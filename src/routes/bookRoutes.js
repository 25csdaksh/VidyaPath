const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Admin-Only Mutations
router.post('/', protect, restrictTo('admin'), bookController.createBook);
router.put('/:id', protect, restrictTo('admin'), bookController.updateBook);
router.delete('/:id', protect, restrictTo('admin'), bookController.deleteBook);

module.exports = router;
