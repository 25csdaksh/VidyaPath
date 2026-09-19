const express = require('express');
const router = express.Router();

const resumeController = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateResume } = require('../validators/resumeValidator');

router.use(protect); // All resume routes require authentication

router.post('/', validate((data) => validateResume(data, false)), resumeController.createResume);
router.get('/', resumeController.getUserResumes);
router.get('/:id', resumeController.getResumeById);
router.put('/:id', validate((data) => validateResume(data, true)), resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
