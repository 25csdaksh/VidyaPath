const express = require('express');
const router = express.Router();

const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validate');
const { validateChatMessage } = require('../validators/aiValidator');

// All AI Assistant routes require student authentication & rate limiting
router.use(protect);
router.use(aiLimiter);

// Conversational Chat Endpoint
router.post('/chat', validate(validateChatMessage), aiController.chat);

// Quick 1-Click Capabilities Actions (Skill-gap, Project suggestions, Interview drill, Grilling, Roadmap, Resume)
router.post('/quick-action/:actionType', aiController.quickAction);

// Chat History Management
router.get('/conversations', aiController.getConversations);
router.get('/conversations/:id', aiController.getConversationById);
router.delete('/conversations/:id', aiController.deleteConversation);

module.exports = router;
