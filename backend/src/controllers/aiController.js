const AiService = require('../services/aiService');
const ApiResponse = require('../utils/apiResponse');

const chat = async (req, res, next) => {
  try {
    const result = await AiService.sendMessage(req.user._id, req.body);
    return ApiResponse.success(res, 'AI response generated successfully.', result);
  } catch (err) {
    next(err);
  }
};

const getConversations = async (req, res, next) => {
  try {
    const conversations = await AiService.getUserConversations(req.user._id);
    return ApiResponse.success(res, 'Conversations fetched successfully.', conversations);
  } catch (err) {
    next(err);
  }
};

const getConversationById = async (req, res, next) => {
  try {
    const conversation = await AiService.getConversationById(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Conversation details fetched successfully.', conversation);
  } catch (err) {
    next(err);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const result = await AiService.deleteConversation(req.user._id, req.params.id);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

const quickAction = async (req, res, next) => {
  try {
    const result = await AiService.executeQuickAction(req.user._id, req.params.actionType, req.body);
    return ApiResponse.success(res, `Quick action '${req.params.actionType}' executed successfully.`, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  chat,
  getConversations,
  getConversationById,
  deleteConversation,
  quickAction,
};
