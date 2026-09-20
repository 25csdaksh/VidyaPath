const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisorController');

// GET /api/advisor/curriculum/:year -> Fetch year curriculum knowledge
router.get('/curriculum/:year', advisorController.getCurriculumByYear);

// POST /api/advisor/study-plan -> Generate tailored 4-week study plan
router.post('/study-plan', advisorController.generateStudyPlan);

module.exports = router;
