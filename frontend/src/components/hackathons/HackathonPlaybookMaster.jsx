import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Target,
  Zap,
  Award,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Flame,
  Users,
  GitBranch,
  Layers,
  Code,
  Clock,
  Presentation,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  HelpCircle,
  FolderGit2,
  Terminal,
  Compass,
  FileText,
  Share2,
  ArrowRight,
  Database,
  Cpu,
  Monitor,
  Plus,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  HACKATHON_PLAYBOOK_OVERVIEW,
  PRE_HACKATHON_CHECKLIST,
  PROBLEM_ANALYSIS_10_QUESTIONS,
  PROBLEM_STATEMENT_TEMPLATE_FIELDS,
  BUILD_METHOD_7_STEPS,
  MVP_BUCKETS,
  TEAM_ROLES,
  COMMUNICATION_RULES,
  GITHUB_WORKFLOW_STEPS,
  ARCHITECTURE_COMPONENTS,
  TECH_SELECTION_MATRIX,
  TIME_EXECUTION_TIMELINE,
  PPT_12_SLIDES,
  PPT_DESIGN_RULES,
  PITCH_SPEAKING_SEQUENCE,
  DEMO_STRATEGY_RULES,
  QA_DEFENSE_QUESTIONS,
  COMMON_HACKATHON_MISTAKES,
  FINAL_60_MINUTE_CHECKLIST,
  HACKATHON_ROADMAP_MAPPING,
} from './hackathonPlaybookData';

const FINAL60_STORAGE_KEY = 'vidyapath_hackathon_final60_v1';
const STANDUP_STORAGE_KEY = 'vidyapath_hackathon_standup_v1';
const TEMPLATE_STORAGE_KEY = 'vidyapath_hackathon_analysis_template_v1';

export const HackathonPlaybookMaster = () => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [copiedSection, setCopiedSection] = useState(null);

  // Final 60-Min Checklist State
  const [checklistChecked, setChecklistChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(FINAL60_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FINAL60_STORAGE_KEY, JSON.stringify(checklistChecked));
    } catch (e) {
      console.error(e);
    }
  }, [checklistChecked]);

  const toggleChecklistItem = (id) => {
    setChecklistChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    setChecklistChecked({});
  };

  const checkedCount = Object.values(checklistChecked).filter(Boolean).length;
  const totalCount = FINAL_60_MINUTE_CHECKLIST.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  // Problem Analysis Template State
  const [templateValues, setTemplateValues] = useState(() => {
    try {
      const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            problem: 'Small rural clinics struggle to track vaccine cold-chain compliance in real-time.',
            targetUser: 'Primary: Rural clinic nurses & health workers. Secondary: District Medical Officers.',
            currentProcess: 'Manual twice-daily clipboard logging of analog fridge thermometer dials.',
            painPoints: '1. No alerts during power failure\n2. 24% spoiled vaccines unnoticed\n3. ₹1.8M annual district loss',
            rootCause: 'Lack of automated digital telemetry and delayed monthly paper audits.',
            proposedSolution: 'Offline-first smartphone OCR monitor for analog dials with real-time WhatsApp alert dispatch.',
            coreFeatures: '1. Mobile dial photo OCR (400ms)\n2. Offline queue sync\n3. High-risk SMS/WhatsApp alert\n4. District map dashboard',
            techRationale: 'FastAPI for fast vision model inference, PostgreSQL/Supabase for relational records, React for responsive UI.',
            dataFlow: 'Camera photo → Edge OCR processing → DB storage & threshold check → District dashboard & SMS alert.',
            successMetrics: '1. Sub-second OCR latency (<500ms)\n2. 94%+ recognition precision\n3. 100% offline data sync resilience',
            risks: 'Poor camera focus in low light -> Mitigated with on-device contrast check and torch prompt.',
            futureScope: 'Hardware IoT sensor integration, automated voice IVR alerts, predictive compressor health analytics.',
          };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templateValues));
    } catch (e) {
      console.error(e);
    }
  }, [templateValues]);

  const handleTemplateChange = (key, val) => {
    setTemplateValues((prev) => ({ ...prev, [key]: val }));
  };

  const copyAnalysisMarkdown = () => {
    const md = `# Problem Statement Analysis

**Problem:** ${templateValues.problem || ''}
**Target User:** ${templateValues.targetUser || ''}
**Current Process:** ${templateValues.currentProcess || ''}

### Pain Points
${templateValues.painPoints || ''}

**Root Cause:** ${templateValues.rootCause || ''}
**Proposed Solution:** ${templateValues.proposedSolution || ''}

### Core Features (MVP)
${templateValues.coreFeatures || ''}

**Technology Rationale:** ${templateValues.techRationale || ''}
**Data Flow:** ${templateValues.dataFlow || ''}
**Success Metrics:** ${templateValues.successMetrics || ''}
**Risks & Mitigations:** ${templateValues.risks || ''}
**Future Scope (Phase 2 & 3):** ${templateValues.futureScope || ''}
`;
    navigator.clipboard.writeText(md);
    setCopiedSection('analysis_md');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // Hourly Standup Interactive State
  const [standupEntries, setStandupEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STANDUP_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, member: 'Daksh (Team Lead)', done: 'Problem breakdown & API contract defined', next: 'Auth middleware & integration testing', blocked: 'None' },
            { id: 2, member: 'Aarav (Frontend)', done: 'Figma wireframes & component skeleton', next: 'Connecting dashboard to backend API', blocked: 'Waiting for OCR response schema' },
            { id: 3, member: 'Priya (Backend & AI)', done: 'FastAPI OCR endpoint & Supabase tables', next: 'Confidence scoring & alert webhook', blocked: 'Testing edge dial samples' },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STANDUP_STORAGE_KEY, JSON.stringify(standupEntries));
    } catch (e) {
      console.error(e);
    }
  }, [standupEntries]);

  const addStandupEntry = () => {
    const newEntry = {
      id: Date.now(),
      member: `Member ${standupEntries.length + 1}`,
      done: '',
      next: '',
      blocked: 'None',
    };
    setStandupEntries([...standupEntries, newEntry]);
  };

  const updateStandupEntry = (id, field, val) => {
    setStandupEntries(standupEntries.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const removeStandupEntry = (id) => {
    setStandupEntries(standupEntries.filter((item) => item.id !== id));
  };

  const copyStandupSummary = () => {
    const text = `🚀 HACKATHON STANDUP UPDATE (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})\n\n` +
      standupEntries
        .map(
          (e) => `👤 ${e.member}\n  • DONE: ${e.done || 'N/A'}\n  • NEXT: ${e.next || 'N/A'}\n  • BLOCKED: ${e.blocked || 'None'}\n`
        )
        .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedSection('standup');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const copyPitchScript = () => {
    const scriptText = PITCH_SPEAKING_SEQUENCE.map(
      (s) => `[${s.timing}] Step ${s.step}: ${s.name}\n${s.scriptTemplate}\n`
    ).join('\n');
    navigator.clipboard.writeText(scriptText);
    setCopiedSection('pitch_script');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const tabs = [
    { id: 'strategy', label: '1. Strategy & 10-Q Analysis', icon: Target },
    { id: 'build', label: '2. 7-Step Build & Architecture', icon: Layers },
    { id: 'team', label: '3. Team Roles & Standup Tracker', icon: Users },
    { id: 'ppt', label: '4. 12-Slide PPT & Pitch Script', icon: Presentation },
    { id: 'defense', label: '5. Demo & 13 Q&A Defense', icon: Zap },
    { id: 'mistakes', label: '6. Mistakes & 4-Yr Roadmap', icon: ShieldAlert },
    { id: 'countdown', label: '7. Final 60-Min Checklist', icon: Clock, badge: `${checkedCount}/${totalCount}` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Header */}
      <Card
        style={{
          background: 'linear-gradient(135deg, rgba(14, 47, 118, 0.08) 0%, rgba(170, 192, 225, 0.25) 50%, rgba(245, 254, 255, 0.9) 100%)',
          border: '1px solid var(--border-color)',
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="primary"><Trophy size={14} /> Hackathon Student Playbook</Badge>
              <Badge variant="success">All 22 Complete Sections</Badge>
              <Badge variant="neutral">SIH • MLH • Global Challenges</Badge>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--text-primary)' }}>
              {HACKATHON_PLAYBOOK_OVERVIEW.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.25rem 0 1rem 0' }}>
              {HACKATHON_PLAYBOOK_OVERVIEW.subtitle}
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--aegean-100)',
                border: '1px solid var(--aegean-300)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--navy-800)',
                fontFamily: 'monospace',
                flexWrap: 'wrap',
              }}
            >
              <Flame size={14} color="#d97706" />
              Formula: {HACKATHON_PLAYBOOK_OVERVIEW.formula}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '220px' }}>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Final 60-Min Readiness:</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: progressPercent === 100 ? 'var(--color-success)' : 'var(--navy-800)' }}>
                  {progressPercent}%
                </span>
                <Badge variant={progressPercent === 100 ? 'success' : 'primary'}>
                  {checkedCount} / {totalCount} Ready
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {HACKATHON_PLAYBOOK_OVERVIEW.corePrinciples.map((pillar, i) => (
            <div
              key={i}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: pillar.color, fontWeight: 700 }}>
                {pillar.icon === 'Target' && <Target size={18} />}
                {pillar.icon === 'Zap' && <Zap size={18} />}
                {pillar.icon === 'Award' && <Award size={18} />}
                {pillar.icon === 'Sparkles' && <Sparkles size={18} />}
                <span>{pillar.title}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                fontWeight: isActive ? 700 : 500,
                padding: '0.6rem 1rem',
                borderRadius: '8px',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--aegean-100)',
                    color: isActive ? '#fff' : 'var(--navy-800)',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Strategy & 10-Question Analysis (Sections 1, 2, 3, 4, 21) */}
      {activeTab === 'strategy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 1: What a Hackathon Actually Is */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 1</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>What a Hackathon Actually Is</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--navy-800)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>1. Time-Limited Problem Solving</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  A hackathon is a rapid engineering sprint. Your team starts with a raw challenge and must produce a tangible, working, demonstrable solution within 24 to 48 hours.
                </p>
              </div>
              <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--color-success)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>2. MVP Over Exhaustive Features</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  The goal is NOT to build every conceivable feature. The winning goal is to identify the single most critical user pain point and prove a credible, functional solution.
                </p>
              </div>
              <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--color-warning)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>3. The Unbroken Chain</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  A winning project connects: <strong>Problem → User → Solution → Technology → Prototype → Impact → Demo</strong>. If any link breaks, the project feels incomplete.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 2: Before the Hackathon Checklist */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 2</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Before the Hackathon: 7-Point Preparation Checklist</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {PRE_HACKATHON_CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</span>
                      <Badge variant="neutral">{item.category}</Badge>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                      {item.description}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--aegean-100)',
                      border: '1px solid var(--aegean-200)',
                      fontSize: '0.8rem',
                      color: 'var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Lightbulb size={14} />
                    <span><strong>Pro-Tip:</strong> {item.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 3: 10-Question Problem Statement Analysis Method */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 3</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>How to Analyze a Problem Statement (10-Question Method)</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Ask and answer these 10 structured questions with your team before writing a single line of code.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {PROBLEM_ANALYSIS_10_QUESTIONS.map((q) => (
                <div
                  key={q.num}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--aegean-100)',
                        color: 'var(--navy-800)',
                        border: '1px solid var(--aegean-300)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {q.num}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{q.question}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    {q.prompt}
                  </p>
                  <div
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--color-success-bg)',
                      border: '1px solid rgba(13, 148, 136, 0.25)',
                      fontSize: '0.8rem',
                      color: 'var(--color-success)',
                    }}
                  >
                    <strong>Example:</strong> {q.example}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 4: Interactive 12-Item Problem Statement Analysis Template */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Badge variant="primary">Section 4 & 21</Badge>
                  <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Interactive Problem Statement Analysis Template</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Fill in your project details below and click "Copy Markdown" to paste straight into your team's GitHub README or Notion board.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={copyAnalysisMarkdown}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {copiedSection === 'analysis_md' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedSection === 'analysis_md' ? 'Copied Markdown!' : 'Copy Analysis Markdown'}</span>
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {PROBLEM_STATEMENT_TEMPLATE_FIELDS.map((item) => (
                <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.field}
                  </label>
                  {item.key === 'painPoints' || item.key === 'coreFeatures' || item.key === 'futureScope' ? (
                    <textarea
                      rows={3}
                      value={templateValues[item.key] || ''}
                      onChange={(e) => handleTemplateChange(item.key, e.target.value)}
                      placeholder={item.placeholder}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={templateValues[item.key] || ''}
                      onChange={(e) => handleTemplateChange(item.key, e.target.value)}
                      placeholder={item.placeholder}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: 7-Step Build & MVP Scoping (Sections 5, 6, 10, 11, 12) */}
      {activeTab === 'build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 5: The 7-Step Build Method */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 5</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>The 7-Step Hackathon Build Method</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              From initial problem statement reading to final stage pitch delivery under strict competition time constraints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {BUILD_METHOD_7_STEPS.map((s) => (
                <div
                  key={s.step}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '1.25rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--primary-gradient)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{s.name}</h4>
                      <Badge variant="neutral">{s.timeline}</Badge>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                      {s.description}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                      ⚡ Key Milestone: {s.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 6: MVP Bucketing (MoSCoW Framework) */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 6</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>MVP: What to Build First (3 Priority Buckets)</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {/* Must Have */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '8px',
                  background: 'var(--color-success-bg)',
                  border: '1px solid rgba(13, 148, 136, 0.25)',
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-success)', fontSize: '1rem' }}>{MVP_BUCKETS.mustHave.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {MVP_BUCKETS.mustHave.rule}
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {MVP_BUCKETS.mustHave.examples.map((ex, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{ex}</li>
                  ))}
                </ul>
              </div>

              {/* Should Have */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '8px',
                  background: 'var(--color-warning-bg)',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-warning)', fontSize: '1rem' }}>{MVP_BUCKETS.shouldHave.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {MVP_BUCKETS.shouldHave.rule}
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {MVP_BUCKETS.shouldHave.examples.map((ex, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{ex}</li>
                  ))}
                </ul>
              </div>

              {/* Could Have */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '8px',
                  background: 'var(--color-danger-bg)',
                  border: '1px solid rgba(220, 38, 38, 0.25)',
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-danger)', fontSize: '1rem' }}>{MVP_BUCKETS.couldHave.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {MVP_BUCKETS.couldHave.rule}
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {MVP_BUCKETS.couldHave.examples.map((ex, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Section 10 & 11: 9-Component Architecture & Technology Selection */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Sections 10 & 11</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>System Architecture & Technology Selection Matrix</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Keep the architecture proportional to the problem. A hackathon prototype does not need microservices simply because microservices exist.
            </p>

            {/* Architecture 9 Components */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {ARCHITECTURE_COMPONENTS.map((comp, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '6px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '0.2rem' }}>
                    {i + 1}. {comp.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {comp.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Matrix Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Layer</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Recommended Choices</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Hackathon Engineering Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {TECH_SELECTION_MATRIX.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--navy-800)' }}>{row.layer}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{row.recommendation}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Section 12: 7-Phase Time Execution Timeline */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 12</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>How to Build Under Time Pressure (7-Phase Timeline)</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {TIME_EXECUTION_TIMELINE.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{p.phase}</span>
                    <Badge variant="primary">{p.duration24h}</Badge>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--navy-800)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Timeline: {p.range} of competition clock
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {p.focus}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: Team Roles & Standup Tracker (Sections 7, 8, 9, 19) */}
      {activeTab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 7: Team Formation & 7 Core Roles */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 7</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Team Formation & 7 Core Role Responsibilities</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              In a 3–5 member team, members take on dual responsibilities. Every member must own clear deliverables.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {TEAM_ROLES.map((role) => (
                <div
                  key={role.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <Users size={18} color="var(--navy-800)" />
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{role.role}</h4>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                      <strong>Key Tasks:</strong> {role.keyTasks}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      <strong>Skills:</strong> {role.skillsNeeded}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--aegean-100)',
                      border: '1px solid var(--aegean-200)',
                      fontSize: '0.8rem',
                      color: 'var(--navy-800)',
                    }}
                  >
                    📦 <strong>Deliverable:</strong> {role.deliverables}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 8 & 19: Interactive Hourly Standup Tracker */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Badge variant="primary">Sections 8 & 19</Badge>
                  <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Interactive Hourly Standup Board (DONE / NEXT / BLOCKED)</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Rule: Never say "working on backend". State exact feature and blocker. Use this tracker during syncs.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" onClick={addStandupEntry} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plus size={16} /> Add Member
                </Button>
                <Button variant="primary" onClick={copyStandupSummary} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {copiedSection === 'standup' ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedSection === 'standup' ? 'Copied Update!' : 'Copy Discord/WA Update'}</span>
                </Button>
              </div>
            </div>

            {/* Standup Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', width: '22%' }}>Member / Role</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', width: '28%' }}>DONE (Completed)</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', width: '28%' }}>NEXT (Current Focus)</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', width: '18%' }}>BLOCKED (Needs Help)</th>
                    <th style={{ padding: '0.75rem', width: '4%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {standupEntries.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          type="text"
                          value={row.member}
                          onChange={(e) => updateStandupEntry(row.id, 'member', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '4px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          type="text"
                          value={row.done}
                          onChange={(e) => updateStandupEntry(row.id, 'done', e.target.value)}
                          placeholder="e.g. Auth API route created"
                          style={{
                            width: '100%',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '4px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          type="text"
                          value={row.next}
                          onChange={(e) => updateStandupEntry(row.id, 'next', e.target.value)}
                          placeholder="e.g. Connecting DB models"
                          style={{
                            width: '100%',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '4px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          type="text"
                          value={row.blocked}
                          onChange={(e) => updateStandupEntry(row.id, 'blocked', e.target.value)}
                          placeholder="None / specify blocker"
                          style={{
                            width: '100%',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '4px',
                            background: row.blocked && row.blocked.toLowerCase() !== 'none' ? 'var(--color-danger-bg)' : 'var(--bg-secondary)',
                            border: row.blocked && row.blocked.toLowerCase() !== 'none' ? '1px solid var(--color-danger)' : '1px solid var(--border-color)',
                            color: row.blocked && row.blocked.toLowerCase() !== 'none' ? 'var(--color-danger)' : 'var(--text-primary)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                        <button
                          onClick={() => removeStandupEntry(row.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                          title="Remove row"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Section 9: GitHub Workflow for Hackathons */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 9</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>GitHub Workflow & Git Safety Rules</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {GITHUB_WORKFLOW_STEPS.map((g) => (
                <div
                  key={g.step}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <GitBranch size={16} color="var(--navy-800)" />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{g.title}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: 12-Slide PPT & Pitch Script (Sections 13, 14, 15) */}
      {activeTab === 'ppt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 13: 12-Slide Hackathon PPT Master Framework */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 13</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>12-Slide Hackathon Master Pitch Deck Framework</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Never wonder what to put on slide 7. Follow this battle-tested structure used by national hackathon winners.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {PPT_12_SLIDES.map((slide) => (
                <div
                  key={slide.slideNumber}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{slide.title}</h4>
                      <Badge variant="primary">Slide {slide.slideNumber}</Badge>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--navy-800)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      🎯 Purpose: {slide.purpose}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                      <strong>What to Show:</strong> {slide.content}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      🖼️ <strong>Visual Layout:</strong> {slide.visual}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--color-success-bg)',
                      border: '1px solid rgba(13, 148, 136, 0.25)',
                      fontSize: '0.8rem',
                      color: 'var(--color-success)',
                    }}
                  >
                    💡 <strong>Pro-Tip:</strong> {slide.proTip}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 14: PPT Design Rules */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 14</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>7 Non-Negotiable PPT Design Rules</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {PPT_DESIGN_RULES.map((rule, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {rule.rule}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 15: 9-Step Speaking Pitch Sequence */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Badge variant="primary">Section 15</Badge>
                  <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>9-Step Speaking Pitch Sequence (3.5-Minute Master Script)</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Exact speaking timeline and sentence templates. Keep to the strict timing to avoid getting cut off before your demo.
                </p>
              </div>
              <Button variant="primary" onClick={copyPitchScript} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {copiedSection === 'pitch_script' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedSection === 'pitch_script' ? 'Copied Script!' : 'Copy Speaking Script'}</span>
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {PITCH_SPEAKING_SEQUENCE.map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1.25rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--aegean-100)',
                      color: 'var(--navy-800)',
                      border: '1px solid var(--aegean-300)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{item.name}</h4>
                      <Badge variant="neutral"><Clock size={12} style={{ marginRight: '4px' }} />{item.timing}</Badge>
                    </div>
                    <div
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        fontStyle: 'italic',
                        lineHeight: 1.5,
                        marginTop: '0.4rem',
                      }}
                    >
                      {item.scriptTemplate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: Demo Strategy & 13 Q&A Defense (Sections 16, 17) */}
      {activeTab === 'defense' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 16: Demo Strategy & Golden Path */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="primary">Section 16</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Live Demo Strategy & Golden Path Blueprint</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {DEMO_STRATEGY_RULES.map((rule, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--navy-800)', fontWeight: 700 }}>
                    <Zap size={16} />
                    <span>{rule.title}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 17: 13 Essential Q&A Questions */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 17</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>13 Essential Judge Q&A Questions & Winning Defenses</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Judges judge engineering depth during Q&A. Rehearse these exact responses with assigned team members.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QA_DEFENSE_QUESTIONS.map((qa) => (
                <div
                  key={qa.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>{qa.question}</h4>
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      background: 'var(--aegean-50)',
                      borderLeft: '4px solid var(--navy-800)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ color: 'var(--text-primary)' }}>Recommended Strategic Defense:</strong> {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 6: Mistakes & 4-Year Roadmap (Sections 18, 22) */}
      {activeTab === 'mistakes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 18: Common Hackathon Mistakes */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge variant="danger">Section 18</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Top 12 Common Hackathon Mistakes & Immediate Fixes</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {COMMON_HACKATHON_MISTAKES.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    <AlertTriangle size={16} />
                    <span>{m.mistake}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <strong>Danger:</strong> {m.impact}
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--color-success-bg)',
                      border: '1px solid rgba(13, 148, 136, 0.25)',
                      fontSize: '0.8rem',
                      color: 'var(--color-success)',
                    }}
                  >
                    ✅ <strong>Fix:</strong> {m.fix}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 22: Connection to CSE 4-Year Roadmap */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="primary">Section 22</Badge>
              <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Connecting Hackathons to Your 4-Year CSE Career Roadmap</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              How to strategically utilize hackathons in FY (Foundations), SY (Core CSE), TY (Specialization), and Final Year (National & Capstone Impact).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {HACKATHON_ROADMAP_MAPPING.map((step, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>{step.year}</Badge>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>{step.target}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                      <strong>Core Focus:</strong> {step.focus}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      🏆 <strong>Target Hackathons:</strong> {step.recommendedEvents}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: 'var(--aegean-100)',
                      border: '1px solid var(--aegean-200)',
                      fontSize: '0.8rem',
                      color: 'var(--navy-800)',
                    }}
                  >
                    🎯 <strong>Outcome:</strong> {step.outcomeGoal}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 7: Final 60-Minute Countdown Checklist (Section 20) */}
      {activeTab === 'countdown' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Badge variant="danger">Section 20</Badge>
                  <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>Final 60-Minute Launch Countdown Checklist</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Complete all 11 mission-critical items during the final hour before entering the judging room.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: progressPercent === 100 ? 'var(--color-success)' : 'var(--navy-800)' }}>
                    {checkedCount} / {totalCount}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({progressPercent}%)</span>
                </div>
                <Button variant="outline" onClick={resetChecklist} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <RefreshCw size={14} /> Reset
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'var(--bg-secondary)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: progressPercent === 100 ? 'linear-gradient(90deg, #0d9488, #059669)' : 'var(--primary-gradient)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {/* Checklist Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FINAL_60_MINUTE_CHECKLIST.map((item) => {
                const isChecked = !!checklistChecked[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      background: isChecked ? 'var(--color-success-bg)' : 'var(--bg-secondary)',
                      border: isChecked ? '1px solid rgba(13, 148, 136, 0.3)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: isChecked ? '2px solid var(--color-success)' : '2px solid var(--border-color)',
                        background: isChecked ? 'var(--color-success)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {isChecked && <Check size={16} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isChecked ? 'var(--color-success)' : 'var(--text-primary)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HackathonPlaybookMaster;
