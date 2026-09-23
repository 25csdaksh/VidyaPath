import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  Code,
  Layers,
  Search,
  Copy,
  Check,
  Shield,
  Cloud,
  Database,
  Cpu,
  Globe,
  Terminal,
  Briefcase,
  Calendar,
  ListChecks,
  MessageSquare,
  Users,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap,
  CheckSquare,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Target,
  Clock,
  Compass,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import {
  EVALUATION_AREAS,
  PLACEMENT_PYRAMID,
  TECHNICAL_QA_CATEGORIES,
  ALL_INTERVIEW_QA,
  LANGUAGE_COMPARISON_MATRIX,
  PROJECT_LEVELS,
  PROJECT_WORTHY_CRITERIA,
  RESUME_PROJECT_TEMPLATE,
  PREPARATION_PLAN_12_WEEKS,
  CODING_COMMUNICATION_SCRIPT,
  INTERVIEW_ETIQUETTE_RULES,
  QUESTIONS_TO_ASK_INTERVIEWER,
  PORTAL_MODULES,
  PLACEMENT_CHECKLIST_ITEMS,
} from './placementGuideData';

const LOCAL_STORAGE_KEY = 'vidyapath_placement_checklist_v1';

export const PlacementMasterGuide = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('qa-bank');
  
  // Q&A Tab states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Checklist state with localStorage persistence
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (e) {
      console.error('Failed to persist checklist:', e);
    }
  }, [checkedItems]);

  const toggleCheckItem = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('Are you sure you want to reset your placement checklist progress?')) {
      setCheckedItems({});
    }
  };

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;
  const checklistProgressPercent = Math.round(
    (completedChecklistCount / PLACEMENT_CHECKLIST_ITEMS.length) * 100
  );

  // Toggle individual question accordion
  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expand all / Collapse all Q&As
  const expandAllQuestions = () => {
    const all = {};
    filteredQuestions.forEach((q) => {
      all[q.id] = true;
    });
    setExpandedQuestions(all);
  };

  const collapseAllQuestions = () => {
    setExpandedQuestions({});
  };

  // Copy answer to clipboard
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter questions based on category and search query
  const filteredQuestions = useMemo(() => {
    return ALL_INTERVIEW_QA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const qText = (item.question + ' ' + item.answer + ' ' + (item.keyPoints ? item.keyPoints.join(' ') : '')).toLowerCase();
      const matchesSearch =
        !searchQuery.trim() || qText.includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'dsa': return <Code size={16} />;
      case 'oop': return <Layers size={16} />;
      case 'dbms': return <Database size={16} />;
      case 'os': return <Cpu size={16} />;
      case 'cn': return <Globe size={16} />;
      case 'languages': return <Terminal size={16} />;
      case 'web': return <Globe size={16} />;
      case 'ai-ml': return <Sparkles size={16} />;
      case 'security': return <Shield size={16} />;
      case 'cloud': return <Cloud size={16} />;
      case 'projects': return <Briefcase size={16} />;
      case 'hr': return <Users size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'var(--navy-hero-gradient)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '960px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Badge
              variant="primary"
              style={{
                background: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.3)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Award size={15} /> CSE PLACEMENT HUB
            </Badge>
            <Badge
              variant="neutral"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'var(--aegean-200)',
                borderColor: 'rgba(255,255,255,0.2)',
                fontSize: '0.82rem',
              }}
            >
              25 Essential Sections • FY → Final Year
            </Badge>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.4rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#ffffff',
            }}
          >
            Placement Hub — Interview Master Guide
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '820px',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            Questions • Answers • Projects • Communication • Interview Etiquette • 12-Week Preparation Plan.
            Turn your core CSE fundamentals, DSA, production projects, and specialization into an unbeatable placement-ready system.
          </p>

          {/* Golden Rule Banner */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '780px',
            }}
          >
            <Zap size={24} style={{ color: '#fbbf24', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fbbf24', fontWeight: 700 }}>
                Rule to Remember
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.01em' }}>
                DON&apos;T JUST KNOW IT → BUILD IT → TEST IT → EXPLAIN IT → DEFEND YOUR DECISION
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics */}
        <div
          style={{
            marginTop: '1.75rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>68+</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>Curated Tech & HR Q&As</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ade80' }}>11</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>Evaluation Domains</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fcd34d' }}>12 Weeks</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>Placement Sprint Plan</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f472b6' }}>14 Points</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>Interactive Checklist</div>
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '0.5rem',
        }}
      >
        {[
          { id: 'qa-bank', label: '📖 Subject Q&A Bank (68 Questions)', icon: BookOpen },
          { id: 'projects', label: '💼 Project Defense & Portfolio', icon: Briefcase },
          { id: 'hr-comm', label: '🤝 HR, Behavioral & Scripts', icon: MessageSquare },
          { id: 'prep-plan', label: '📅 12-Week Prep Plan', icon: Calendar },
          { id: 'pyramid', label: '🧭 Strategy & Evaluation', icon: Compass },
          { id: 'checklist', label: `✅ Final Checklist (${completedChecklistCount}/${PLACEMENT_CHECKLIST_ITEMS.length})`, icon: CheckSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                border: 'none',
                background: isActive ? 'var(--primary-600)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================== */}
      {/* TAB 1: SUBJECT Q&A BANK (Sections 3 - 12)                 */}
      {/* ========================================================== */}
      {activeTab === 'qa-bank' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Filter Bar & Search */}
          <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Master Question & Answer Bank
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Filter across core CSE subjects, specializations, project defense, and behavioral questions.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="ghost" size="sm" onClick={expandAllQuestions} icon={ChevronDown}>
                  Expand All
                </Button>
                <Button variant="ghost" size="sm" onClick={collapseAllQuestions} icon={ChevronUp}>
                  Collapse All
                </Button>
              </div>
            </div>

            {/* Live Search Input */}
            <div style={{ position: 'relative' }}>
              <Input
                placeholder="Search questions by keyword (e.g. deadlock, REST, JWT, BFS, normalization, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TECHNICAL_QA_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--border-color)',
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-primary)',
                      color: isSelected ? 'var(--primary-800)' : 'var(--text-secondary)',
                      fontSize: '0.83rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {getCategoryIcon(cat.id)}
                    {cat.name}
                    <span
                      style={{
                        background: isSelected ? 'var(--primary-200)' : 'var(--bg-tertiary)',
                        color: isSelected ? 'var(--primary-900)' : 'var(--text-muted)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        marginLeft: '0.2rem',
                      }}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Programming Languages Comparison Matrix (Section 8) */}
          {(selectedCategory === 'all' || selectedCategory === 'languages') && !searchQuery && (
            <Card style={{ padding: '1.75rem', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary-600)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Terminal size={20} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 8: Language-Wise Interview Core Topics
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Companies evaluate your depth in at least one object-oriented or systems programming language.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', width: '180px' }}>Language</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>Key Topics to Prepare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LANGUAGE_COMPARISON_MATRIX.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                          {row.language}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {row.topics}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Q&A List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Showing {filteredQuestions.length} Questions
              </span>
            </div>

            {filteredQuestions.length === 0 ? (
              <Card style={{ padding: '3rem', textAlign: 'center' }}>
                <HelpCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem', margin: '0 auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  No Questions Found
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  No interview questions match your search query &quot;{searchQuery}&quot;. Try adjusting filters.
                </p>
                <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} style={{ marginTop: '1rem' }}>
                  Reset Filters
                </Button>
              </Card>
            ) : (
              filteredQuestions.map((qa, index) => {
                const isExpanded = expandedQuestions[qa.id] ?? false;
                const isCopied = copiedId === qa.id;

                return (
                  <Card
                    key={qa.id}
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderLeft: `4px solid ${isExpanded ? 'var(--primary-600)' : 'transparent'}`,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleQuestion(qa.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                        <span
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--primary-700)',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            marginTop: '0.15rem',
                            flexShrink: 0,
                          }}
                        >
                          Q{index + 1}
                        </span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                            <Badge variant="neutral" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                              {qa.categoryLabel}
                            </Badge>
                          </div>
                          <h4
                            style={{
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {qa.question}
                          </h4>
                        </div>
                      </div>

                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          flexShrink: 0,
                        }}
                        aria-label="Toggle answer"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {/* Expandable Answer */}
                    {isExpanded && (
                      <div
                        style={{
                          paddingTop: '0.85rem',
                          borderTop: '1px solid var(--border-color)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.85rem',
                        }}
                      >
                        <div
                          style={{
                            background: 'var(--bg-tertiary)',
                            padding: '1rem 1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            lineHeight: 1.6,
                            borderLeft: '3px solid var(--primary-500)',
                          }}
                        >
                          <strong style={{ color: 'var(--primary-800)', display: 'block', marginBottom: '0.35rem' }}>
                            Optimal Interview Answer:
                          </strong>
                          {qa.answer}
                        </div>

                        {/* Key Points / Bullet Takeaways */}
                        {qa.keyPoints && qa.keyPoints.length > 0 && (
                          <div style={{ padding: '0.5rem 0.25rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                              Key Technical Anchors to Mention:
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                              {qa.keyPoints.map((pt, pIdx) => (
                                <li key={pIdx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Action Toolbar */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(qa.id, `Q: ${qa.question}\n\nAnswer: ${qa.answer}`)}
                            icon={isCopied ? Check : Copy}
                            style={{ color: isCopied ? 'var(--accent-success)' : 'var(--text-secondary)' }}
                          >
                            {isCopied ? 'Copied to Clipboard!' : 'Copy Q&A Citation'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: PROJECT DEFENSE & RESUME GUIDE (Sections 13 - 16)   */}
      {/* ========================================================== */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 13: Project Questions Master Framework */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Briefcase size={22} style={{ color: '#2563eb' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 13: Project Interview Defense Framework
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Anything on your resume can and will become an interview question. Never list a technology you cannot explain from first principles.
            </p>

            {/* 9-Part Project Framework */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', marginBottom: '0.75rem' }}>
                9-Part Formula for &quot;Tell Me About Your Project&quot;
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                {[
                  'Problem',
                  'User',
                  'Your Role',
                  'Architecture',
                  'Key Feature',
                  'Tech Decision',
                  'Challenge',
                  'Result',
                  'Future Scope',
                ].map((item, idx, arr) => (
                  <React.Fragment key={item}>
                    <span
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--border-color)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {idx + 1}. {item}
                    </span>
                    {idx < arr.length - 1 && <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Crucial Project Defense Q&As */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.5rem 0' }}>
                Crucial Project Defense Questions & Answer Blueprints
              </h4>
              {ALL_INTERVIEW_QA.filter((q) => q.category === 'projects').map((qa, pIdx) => (
                <div
                  key={qa.id}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>P{pIdx + 1}.</span>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{qa.question}</strong>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: '0 0 0.5rem 0' }}>
                    {qa.answer}
                  </p>
                  {qa.keyPoints && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      💡 <em>{qa.keyPoints.join(' • ')}</em>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Section 14: 4-Tier Project Ladder */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Section 14: Recommended Project Portfolio Ladder
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Ensure your portfolio has progression from fundamentals to major architectural ownership.
              </p>
            </div>

            <div className="cards-grid-4">
              {PROJECT_LEVELS.map((lvl) => (
                <Card key={lvl.level} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">{lvl.level}</Badge>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{lvl.recommended}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {lvl.whatItProves}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <strong>Example:</strong> {lvl.example}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 15 & 16: Placement-Worthy Criteria & Resume Template */}
          <div className="cards-grid-2">
            {/* Section 15 Criteria */}
            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--accent-success)' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 15: What Makes a Project Placement-Worthy?
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {PROJECT_WORTHY_CRITERIA.map((crit, cIdx) => (
                  <li key={cIdx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {crit}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Section 16 Resume Entry Template */}
            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 16: Resume Project Bullet Template
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Use this exact ATS formula for all resume project entries:
              </p>

              <div
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                }}
              >
                <div><strong>{RESUME_PROJECT_TEMPLATE.title}</strong></div>
                {RESUME_PROJECT_TEMPLATE.bullets.map((b, bIdx) => (
                  <div key={bIdx} style={{ marginTop: '0.35rem' }}>{b}</div>
                ))}
                <div style={{ marginTop: '0.5rem', color: 'var(--primary-700)' }}>
                  {RESUME_PROJECT_TEMPLATE.links}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={Copy}
                onClick={() => {
                  const text = `${RESUME_PROJECT_TEMPLATE.title}\n${RESUME_PROJECT_TEMPLATE.bullets.join('\n')}\n${RESUME_PROJECT_TEMPLATE.links}`;
                  navigator.clipboard.writeText(text);
                  alert('Resume project template copied!');
                }}
              >
                Copy Resume Template
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 3: HR, BEHAVIORAL & COMMUNICATION (Sections 17 - 21)   */}
      {/* ========================================================== */}
      {activeTab === 'hr-comm' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 17: HR STAR Framework & Common Questions */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Users size={22} style={{ color: '#8b5cf6' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 17: HR & Behavioral Interview Master Bank
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Use the <strong>Present → Past → Future</strong> framework for introduction and <strong>STAR (Situation, Task, Action, Result)</strong> for behavioral scenarios.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {ALL_INTERVIEW_QA.filter((q) => q.category === 'hr').map((qa, hIdx) => (
                <div
                  key={qa.id}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Badge variant="primary" style={{ fontSize: '0.75rem' }}>HR {hIdx + 1}</Badge>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{qa.question}</strong>
                  </div>
                  <div
                    style={{
                      background: 'var(--bg-tertiary)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                      margin: '0.5rem 0',
                    }}
                  >
                    {qa.answer}
                  </div>
                  {qa.keyPoints && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      💡 <strong>Strategy:</strong> {qa.keyPoints.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Section 19: 10-Step Coding Interview Think-Aloud Script */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Code size={22} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 19: 10-Step Coding Interview Think-Aloud Script
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Follow this exact 10-step protocol whenever you receive a coding problem in a technical round:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {CODING_COMMUNICATION_SCRIPT.map((st) => (
                <div
                  key={st.step}
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                      {st.step}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {st.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 18 & 20: Communication Rules & Etiquette */}
          <div className="cards-grid-2">
            {/* Section 18 & 20 Etiquette */}
            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Shield size={20} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 20: Essential Interview Etiquette
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {INTERVIEW_ETIQUETTE_RULES.map((et, idx) => (
                  <div key={idx} style={{ fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>• {et.rule}:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{et.desc}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 21 Questions for Interviewer */}
            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={20} style={{ color: '#e11d48' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 21: High-Impact Questions to Ask Interviewer
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                When the interviewer asks <em>&quot;Do you have any questions for us?&quot;</em>, choose 2-3 of these:
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {QUESTIONS_TO_ASK_INTERVIEWER.map((q, qIdx) => (
                  <li key={qIdx} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    &quot;{q}&quot;
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 4: 12-WEEK PREPARATION PLAN (Section 22)              */}
      {/* ========================================================== */}
      {activeTab === 'prep-plan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 22: 12-Week Placement Preparation Master Plan
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              A structured weekly roadmap taking you from fundamental syntax revision to live mock interviews and company-specific rounds.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PREPARATION_PLAN_12_WEEKS.map((plan, index) => (
              <Card
                key={index}
                style={{
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr 1fr',
                  gap: '1.5rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Badge variant="primary" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                    {plan.badge}
                  </Badge>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {plan.weeks}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {plan.focus}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {plan.dailyWork}
                  </p>
                </div>

                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--primary-600)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    Expected Deliverable / Output:
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--primary-800)' }}>
                    {plan.output}
                  </strong>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 5: STRATEGY & EVALUATION (Sections 1, 2, 23)           */}
      {/* ========================================================== */}
      {activeTab === 'pyramid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 1: Company Evaluation Criteria */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 1: What Tech Companies Evaluate (11 Core Pillars)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Software recruiters and engineering leads evaluate candidates across these dimensions:
            </p>

            <div className="cards-grid-3">
              {EVALUATION_AREAS.map((area, idx) => (
                <Card key={idx} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)' }}>
                      {idx + 1}
                    </span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {area.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                    {area.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 2: Placement Preparation Pyramid */}
          <Card style={{ padding: '2rem', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 2: The 8-Stage Placement Preparation Pyramid
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Never jump straight to company questions without establishing lower foundation tiers:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PLACEMENT_PYRAMID.map((pyr) => (
                <div
                  key={pyr.step}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      background: 'var(--primary-600)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {pyr.step}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>
                      {pyr.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {pyr.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 23: Placement Hub Portal Structure */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 23: Complete Placement Hub Portal Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your one-stop recruitment portal roadmap integrated across VidyaPath:
            </p>

            <div className="cards-grid-3">
              {PORTAL_MODULES.map((mod, idx) => (
                <Card key={idx} style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-700)', marginBottom: '0.35rem' }}>
                    {mod.title}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                    {mod.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 6: INTERACTIVE FINAL CHECKLIST (Section 24)           */}
      {/* ========================================================== */}
      {activeTab === 'checklist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Progress Header Card */}
          <Card
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
              borderLeft: '4px solid var(--accent-success)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <Badge variant="success" style={{ marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={13} /> Section 24: Final Placement Readiness Audit
                </Badge>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  14-Point Pre-Placement Verification Checklist
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Check off items as you complete them. Your progress is automatically saved locally.
                </p>
              </div>

              <Button variant="ghost" size="sm" onClick={resetChecklist} icon={RefreshCw} style={{ color: 'var(--text-muted)' }}>
                Reset Checklist
              </Button>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {completedChecklistCount} of {PLACEMENT_CHECKLIST_ITEMS.length} Requirements Satisfied
                </span>
                <span style={{ color: checklistProgressPercent === 100 ? 'var(--accent-success)' : 'var(--primary-700)' }}>
                  {checklistProgressPercent}% Complete
                </span>
              </div>
              <div
                style={{
                  height: '10px',
                  background: 'var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${checklistProgressPercent}%`,
                    background: checklistProgressPercent === 100 ? 'var(--accent-success)' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {checklistProgressPercent === 100 && (
              <div
                style={{
                  marginTop: '1.25rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Sparkles size={24} style={{ color: '#059669', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem' }}>
                    Congratulations! You are 100% Placement Ready!
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                    You have verified every core requirement across resume, projects, DSA, Core CS, and communication scripts.
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Interactive Checkbox Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PLACEMENT_CHECKLIST_ITEMS.map((item, idx) => {
              const isChecked = checkedItems[item.id] ?? false;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: isChecked ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                    border: `1px solid ${isChecked ? 'var(--primary-300)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: 'var(--radius-sm)',
                      border: `2px solid ${isChecked ? 'var(--accent-success)' : 'var(--border-color)'}`,
                      background: isChecked ? 'var(--accent-success)' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      marginTop: '0.15rem',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isChecked && <Check size={14} strokeWidth={3} />}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                        Item #{idx + 1}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementMasterGuide;
