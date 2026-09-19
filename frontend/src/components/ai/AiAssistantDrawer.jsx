import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Maximize2,
  Minimize2,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Code,
  Target,
  HelpCircle,
  FileCheck,
  Map,
  Compass,
  Flame,
  ArrowRight,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useAiAssistant } from '../../hooks/useAiAssistant';
import { useAuth } from '../../context/AuthContext';

export const AiAssistantDrawer = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef(null);

  const {
    messages,
    activeMode,
    setActiveMode,
    studentContext,
    isLoading,
    sendMessage,
    executeAction,
    startNewConversation,
  } = useAiAssistant('General');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const modes = [
    { id: 'General', label: 'Mentor', icon: Sparkles },
    { id: 'SkillGap', label: 'Skill Gap', icon: Target },
    { id: 'Projects', label: 'Projects', icon: Code },
    { id: 'InterviewPractice', label: 'Interview', icon: HelpCircle },
    { id: 'ProjectGrilling', label: 'Mock Grilling', icon: Bot },
    { id: 'ResumeReview', label: 'Resume', icon: FileCheck },
    { id: 'LearningPlan', label: 'Study Plan', icon: Map },
  ];

  const quickPrompts = [
    { label: '📊 Analyze My Skill Gap', action: () => executeAction('skill-gap') },
    { label: '🎙️ Grill Me on My Project', action: () => executeAction('project-grilling') },
    { label: '💻 Suggest Tier-1 Projects', action: () => executeAction('project-suggestion') },
    { label: '🎯 High-Frequency Interview Drill', action: () => executeAction('interview-drill') },
    { label: '🗺️ 6-Week Study Schedule', action: () => executeAction('learning-plan') },
    { label: '📄 Resume Bullet Optimizer', action: () => executeAction('resume-review') },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleActionClick = (actionUrl) => {
    setIsOpen(false);
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  if (!isAuthenticated) {
    return null; // Drawer visible for authenticated students
  }

  return (
    <>
      {/* Floating Trigger Widget */}
      {!isOpen && (
        <button
          className="ai-floating-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Career Assistant"
          title="Open AI Career Assistant"
        >
          <div className="ai-floating-glow" />
          <div className="ai-floating-icon-wrap">
            <Sparkles size={20} className="ai-sparkle-anim" />
          </div>
          <span className="ai-floating-text">AI Career Mentor</span>
        </button>
      )}

      {/* Slide-over Drawer Overlay */}
      {isOpen && (
        <div className="ai-drawer-overlay" onClick={() => setIsOpen(false)}>
          <div className="ai-drawer-container" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="ai-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className="ai-avatar-badge">
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      VidyaPath AI
                    </h3>
                    <Badge variant="primary" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                      Context Aware
                    </Badge>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Grounded in CSE Portal Curriculum & Catalog
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => startNewConversation(activeMode)}
                  title="New Conversation"
                  style={{ padding: '0.35rem' }}
                >
                  <Plus size={16} />
                </button>
                <Link to="/ai-assistant" onClick={() => setIsOpen(false)}>
                  <button className="btn btn-ghost btn-sm" title="Expand to Full Studio" style={{ padding: '0.35rem' }}>
                    <Maximize2 size={16} />
                  </button>
                </Link>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  style={{ padding: '0.35rem' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="ai-mode-bar">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    className={`ai-mode-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveMode(m.id)}
                  >
                    <Icon size={12} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Student Context Ribbon */}
            <div className="ai-context-ribbon">
              <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                Target: {studentContext?.targetRole || user?.name || 'Engineer'}
              </span>
              <span>•</span>
              <span>Sem {studentContext?.semester || 5}</span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#d97706' }}>
                <Flame size={12} fill="#f59e0b" /> Active Context
              </span>
            </div>

            {/* Message Feed */}
            <div className="ai-messages-feed">
              {messages.length === 0 ? (
                <div className="ai-empty-welcome">
                  <div className="ai-empty-icon">
                    <Sparkles size={28} color="var(--primary-700)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    How can I assist your engineering career today?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', maxWidth: '340px' }}>
                    I can analyze your skill gap, suggest Tier-1 system design projects, drill you with interview questions, or conduct a mock grilling session on your active project.
                  </p>

                  <div className="ai-quick-chips-grid">
                    {quickPrompts.map((qp, idx) => (
                      <button key={idx} className="ai-quick-chip" onClick={qp.action}>
                        {qp.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div key={index} className={`ai-message-row ${isUser ? 'user' : 'assistant'}`}>
                      {!isUser && (
                        <div className="ai-msg-avatar">
                          <Bot size={15} />
                        </div>
                      )}

                      <div className={`ai-message-bubble ${isUser ? 'user' : 'assistant'}`}>
                        {isUser ? (
                          <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            {msg.content}
                          </div>
                        ) : (
                          <div className="ai-markdown-body">
                            <div style={{ whiteSpace: 'pre-line', fontSize: '0.885rem', lineHeight: 1.6 }}>
                              {msg.content}
                            </div>

                            {/* Suggested Direct Actions */}
                            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                              <div className="ai-suggested-actions-wrap">
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                                  Recommended Next Steps:
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                  {msg.suggestedActions.map((act, i) => (
                                    <button
                                      key={i}
                                      className="ai-action-btn"
                                      onClick={() => handleActionClick(act.actionUrl)}
                                    >
                                      {act.label} <ArrowRight size={11} />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {isLoading && (
                <div className="ai-message-row assistant">
                  <div className="ai-msg-avatar">
                    <Bot size={15} />
                  </div>
                  <div className="ai-message-bubble assistant ai-thinking-bubble">
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      Grounding recommendations in portal catalog...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="ai-drawer-footer">
              <input
                type="text"
                placeholder={
                  activeMode === 'ProjectGrilling'
                    ? 'Explain your concurrency and database architecture...'
                    : `Ask VidyaPath AI (${activeMode})...`
                }
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={isLoading}
                className="ai-input-field"
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!inputPrompt.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistantDrawer;
