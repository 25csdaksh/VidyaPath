import { useState, useEffect, useCallback } from 'react';
import aiService from '../services/aiService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorDetails } from '../utils/errorHandler';

export const useAiAssistant = (initialMode = 'General') => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [activeMode, setActiveMode] = useState(initialMode);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [studentContext, setStudentContext] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const fetchConversations = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingHistory(true);
    try {
      const res = await aiService.getConversations();
      setConversations(res.data || []);
    } catch {
      // Background conversations load failure is non-blocking
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const sendMessage = async (promptText, customMode = null) => {
    if (!promptText || !promptText.trim()) return;
    if (!isAuthenticated) {
      showToast('Please sign in to access your personalized AI Career Assistant.', 'info');
      return;
    }

    const modeToUse = customMode || activeMode;
    const userMsg = {
      role: 'user',
      content: promptText.trim(),
      mode: modeToUse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setErrorDetails(null);

    try {
      const res = await aiService.sendMessage(promptText.trim(), modeToUse, conversationId);
      const data = res.data || res;
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      if (data.studentContextSnapshot) {
        setStudentContext(data.studentContextSnapshot);
      }
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
      fetchConversations();
    } catch (err) {
      const details = getErrorDetails(err);
      setErrorDetails(details);
      showToast(details.message || 'Failed to get AI response.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = async (actionType, customPrompt = '') => {
    if (!isAuthenticated) {
      showToast('Please sign in to run automated AI workflows.', 'info');
      return;
    }

    setIsLoading(true);
    setErrorDetails(null);

    try {
      const res = await aiService.executeQuickAction(actionType, {
        prompt: customPrompt || undefined,
        conversationId,
      });
      const data = res.data || res;
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      if (data.mode) {
        setActiveMode(data.mode);
      }
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'user', content: customPrompt || `Execute: ${actionType}`, mode: data.mode, timestamp: new Date() },
          data.message,
        ]);
      }
      if (data.studentContextSnapshot) {
        setStudentContext(data.studentContextSnapshot);
      }
      fetchConversations();
    } catch (err) {
      const details = getErrorDetails(err);
      setErrorDetails(details);
      showToast(details.message || 'Failed to execute AI workflow.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (convId) => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await aiService.getConversationById(convId);
      const conv = res.data || res;
      setConversationId(conv._id);
      setActiveMode(conv.mode || 'General');
      setMessages(conv.messages || []);
      setStudentContext(conv.pinnedContext || null);
    } catch (err) {
      showToast('Failed to load conversation history.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = (mode = 'General') => {
    setConversationId(null);
    setMessages([]);
    setActiveMode(mode);
    setErrorDetails(null);
  };

  const deleteConversationThread = async (convId) => {
    try {
      await aiService.deleteConversation(convId);
      showToast('Conversation session deleted.', 'success');
      setConversations((prev) => prev.filter((c) => c._id !== convId));
      if (conversationId === convId) {
        startNewConversation();
      }
    } catch {
      showToast('Failed to delete conversation.', 'error');
    }
  };

  return {
    messages,
    activeMode,
    setActiveMode,
    conversationId,
    conversations,
    studentContext,
    isLoading,
    isLoadingHistory,
    errorDetails,
    sendMessage,
    executeAction,
    loadConversation,
    startNewConversation,
    deleteConversationThread,
  };
};

export default useAiAssistant;
