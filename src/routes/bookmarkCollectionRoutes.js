const express = require('express');
const router = express.Router();

const bookmarkController = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateBookmarkCollection } = require('../validators/bookmarkValidator');

router.use(protect); // All bookmark collections require authentication

router.get('/', bookmarkController.getUserCollections);
router.post('/', validate(validateBookmarkCollection), bookmarkController.createCollection);
router.put('/:id', validate(validateBookmarkCollection), bookmarkController.updateCollection);
router.delete('/:id', bookmarkController.deleteCollection);

module.exports = router;
