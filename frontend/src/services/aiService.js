import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const aiService = {
  /**
   * Send chat prompt to AI Career Assistant
   */
  async sendMessage(prompt, mode = 'General', conversationId = null) {
    return await api.post(API_ROUTES.AI.CHAT, {
      prompt,
      mode,
      conversationId,
    });
  },

  /**
   * Get all previous conversation sessions
   */
  async getConversations() {
    return await api.get(API_ROUTES.AI.CONVERSATIONS);
  },

  /**
   * Get details of a single conversation thread
   */
  async getConversationById(id) {
    return await api.get(API_ROUTES.AI.CONVERSATION_BY_ID(id));
  },

  /**
   * Delete a conversation session
   */
  async deleteConversation(id) {
    return await api.delete(API_ROUTES.AI.DELETE_CONVERSATION(id));
  },

  /**
   * Execute 1-click quick action capability
   */
  async executeQuickAction(actionType, payload = {}) {
    return await api.post(API_ROUTES.AI.QUICK_ACTION(actionType), payload);
  },
};

export default aiService;
