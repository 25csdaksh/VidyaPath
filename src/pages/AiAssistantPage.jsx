import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  Send,
  Plus,
  Trash2,
  Code,
  Target,
  HelpCircle,
  FileCheck,
  Map,
  Flame,
  ArrowRight,
  User,
  Building2,
  Award,
  Layers,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import { useAiAssistant } from '../hooks/useAiAssistant';
import { useAuth } from '../context/AuthContext';

export const AiAssistantPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef(null);

  const {
    messages,
    activeMode,
    setActiveMode,
    conversationId,
    conversations,
    studentContext,
    isLoading,
    isLoadingHistory,
    sendMessage,
    executeAction,
    loadConversation,
    startNewConversation,
    deleteConversationThread,
  } = useAiAssistant('General');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const modes = [
    { id: 'General', label: 'Career Mentor', icon: Sparkles },
    { id: 'SkillGap', label: 'Skill Gap Analysis', icon: Target },
    { id: 'Projects', label: 'Tier-1 Projects', icon: Code },
    { id: 'InterviewPractice', label: 'Interview Drill', icon: HelpCircle },
    { id: 'ProjectGrilling', label: 'Mock Technical Grilling', icon: Bot },
    { id: 'ResumeReview', label: 'Resume Optimizer', icon: FileCheck },
    { id: 'LearningPlan', label: 'Custom Study Plan', icon: Map },
  ];

  const quickCapabilities = [
    {
      title: 'Skill Gap Diagnostic',
      desc: 'Compare your current skills with Google, Microsoft, and Amazon requirements.',
      actionType: 'skill-gap',
      icon: Target,
    },
    {
      title: 'Senior Engineer Mock Grilling',
      desc: 'Deep technical interrogation on concurrency, database bottlenecks, and scalability.',
      actionType: 'project-grilling',
      icon: Bot,
    },
    {
      title: 'Tier-1 System Design Projects',
      desc: 'Get curated distributed system specifications matched to your career goal.',
      actionType: 'project-suggestion',
      icon: Code,
    },
    {
      title: 'High-Frequency Interview Drill',
      desc: 'Practice core CS fundamentals in DBMS, Operating Systems, Computer Networks & DSA.',
      actionType: 'interview-drill',
      icon: HelpCircle,
    },
    {
      title: '6-Week Semester Study Schedule',
      desc: 'Personalized week-by-week curriculum referencing standard international textbooks.',
      actionType: 'learning-plan',
      icon: Map,
    },
    {
      title: 'Resume Bullet Optimizer (XYZ Formula)',
      desc: 'Transform weak statements into quantified, high-impact placement bullet points.',
      actionType: 'resume-review',
      icon: FileCheck,
    },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 'calc(100vh - 140px)' }}>
      {/* Header */}
      <div className="page-header-flex" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <Badge variant="primary"><Bot size={14} /> AI Career Studio</Badge>
            <Badge variant="success">Grounded in Portal Content</Badge>
            <Badge variant="neutral">Student: {user?.name}</Badge>
          </div>
          <h1>VidyaPath AI Career Assistant</h1>
          <p>
            Context-aware academic planning, project architecture mentoring, mock technical grilling, and ATS resume optimization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => startNewConversation(activeMode)}>
            New Session
          </Button>
        </div>
      </div>

      {/* Mode Navigation Bar */}
      <div className="ai-mode-bar" style={{ padding: '0.5rem 0', overflowX: 'auto' }}>
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              className={`ai-mode-pill ${isActive ? 'active' : ''}`}
              onClick={() => setActiveMode(m.id)}
            >
              <Icon size={14} />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Studio Grid */}
      <div className="ai-studio-layout">
        {/* Left: Session History Sidebar */}
        <div className="ai-history-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} /> Past Sessions
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {conversations.length} Threads
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto', flex: 1 }}>
            {isLoadingHistory ? (
              [1, 2, 3].map((n) => <Skeleton key={n} height={50} variant="rounded" />)
            ) : conversations.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0.5rem' }}>
                No previous sessions found. Start a new conversation!
              </div>
            ) : (
              conversations.map((c) => {
                const isCurrent = conversationId === c._id;
                return (
                  <div
                    key={c._id}
                    className={`ai-history-item ${isCurrent ? 'active' : ''}`}
                    onClick={() => loadConversation(c._id)}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isCurrent ? 'var(--primary-800)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.title || 'Career Guidance'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', gap: '4px', alignItems: 'center', marginTop: '2px' }}>
                        <span>{c.mode || 'General'}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(c.lastMessageAt || c.updatedAt)}</span>
                      </div>
                    </div>

                    <button
                      className="ai-history-del-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversationThread(c._id);
                      }}
                      title="Delete Session"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center: Main Interactive Chat Feed */}
        <div className="ai-chat-center">
          <div className="ai-chat-messages-container">
            {messages.length === 0 ? (
              <div style={{ padding: '2rem 1.5rem', textAlign: 'center', margin: 'auto 0' }}>
                <div className="ai-avatar-badge" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }}>
                  <Bot size={26} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Welcome to your AI Career Mentor
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                  Choose a capability below or type any question to analyze your skill gaps, practice technical mock grilling, or get structured learning schedules grounded in the portal.
                </p>

                <div className="cards-grid-2" style={{ textAlign: 'left', maxWidth: '720px', margin: '0 auto' }}>
                  {quickCapabilities.map((qc, idx) => {
                    const Icon = qc.icon;
                    return (
                      <Card
                        key={idx}
                        style={{ padding: '1rem', cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', transition: 'all var(--transition-fast)' }}
                        onClick={() => executeAction(qc.actionType)}
                      >
                        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-100)', color: 'var(--primary-800)' }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                            {qc.title}
                          </h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            {qc.desc}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={index} className={`ai-message-row ${isUser ? 'user' : 'assistant'}`}>
                    {!isUser && (
                      <div className="ai-msg-avatar" style={{ width: '32px', height: '32px' }}>
                        <Bot size={18} />
                      </div>
                    )}

                    <div className={`ai-message-bubble ${isUser ? 'user' : 'assistant'}`} style={{ maxWidth: '80%' }}>
                      {isUser ? (
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.5 }}>
                          {msg.content}
                        </div>
                      ) : (
                        <div className="ai-markdown-body">
                          <div style={{ whiteSpace: 'pre-line', fontSize: '0.925rem', lineHeight: 1.65 }}>
                            {msg.content}
                          </div>

                          {/* Suggested Portal Action Buttons */}
                          {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                            <div className="ai-suggested-actions-wrap" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.4rem' }}>
                                Recommended Actions & Resources:
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {msg.suggestedActions.map((act, i) => (
                                  <button
                                    key={i}
                                    className="ai-action-btn"
                                    onClick={() => navigate(act.actionUrl)}
                                  >
                                    {act.label} <ArrowRight size={12} />
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
                <div className="ai-msg-avatar" style={{ width: '32px', height: '32px' }}>
                  <Bot size={18} />
                </div>
                <div className="ai-message-bubble assistant ai-thinking-bubble">
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    VidyaPath AI is synthesizing portal knowledge...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="ai-studio-input-wrap">
            <input
              type="text"
              placeholder={
                activeMode === 'ProjectGrilling'
                  ? 'Respond to the interviewer questions regarding concurrency, caching, and database schemas...'
                  : `Ask VidyaPath AI about ${activeMode} (e.g., "Analyze my skill gap for Google")...`
              }
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={isLoading}
              className="ai-input-field"
              style={{ padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!inputPrompt.trim() || isLoading}
              icon={Send}
            >
              Send
            </Button>
          </form>
        </div>

        {/* Right: Live Student Context & Target Panel */}
        <div className="ai-context-sidebar">
          <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <User size={18} color="var(--primary-800)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Active Student Context
              </h3>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Target Career Goal
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-800)', marginTop: '2px' }}>
                {studentContext?.careerGoal || 'Backend / Systems Engineer'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {studentContext?.targetRole || 'Full Stack Developer'} • Class of {studentContext?.graduationYear || '2026'}
              </div>
            </div>

            {studentContext?.targetCompanies && studentContext.targetCompanies.length > 0 && (
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                  Dream Companies
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {studentContext.targetCompanies.map((c, i) => (
                    <Badge key={i} variant="primary" style={{ fontSize: '0.75rem' }}>{c}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Placement Readiness</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                  {studentContext?.readinessScores?.overallPlacementScore || 25}%
                </span>
              </div>
              <ProgressBar progress={studentContext?.readinessScores?.overallPlacementScore || 25} size="sm" variant="primary" />
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                Active Portfolio Project
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {studentContext?.activeProjectTitle || 'Distributed Rate Limiter'}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <button
                className="btn btn-outline btn-sm"
                style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => executeAction('project-grilling')}
              >
                <Bot size={14} /> Start Mock Grilling
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;
