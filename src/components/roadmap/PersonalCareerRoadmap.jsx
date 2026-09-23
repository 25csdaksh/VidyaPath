import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Code,
  Target,
  Award,
  BookOpen,
  ArrowRight,
  Zap,
  Briefcase,
  CheckSquare,
  RefreshCw,
  Copy,
  Check,
  Cpu,
  Database,
  Globe,
  Shield,
  Terminal,
  Clock,
  Flame,
  Lightbulb,
  FileCheck,
  TrendingUp,
  FolderGit2,
  Share2,
  GraduationCap,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  PERSONAL_ROADMAP_OVERVIEW,
  FOUR_YEAR_MASTER_PLAN,
  WEEKLY_OPERATING_SYSTEM,
  SEMESTER_STUDY_SYSTEM_STEPS,
  CURRENT_PHASE_SEM3,
  SY_SEMESTER_PLAN,
  TY_SPECIALIZATION_PATHS,
  TY_SEMESTER_PLAN,
  FINAL_YEAR_PLAN_PHASES,
  PROJECT_16_STEP_FRAMEWORK,
  PERSONAL_PROJECT_LADDER,
  HACKATHON_AND_CERT_STRATEGY,
  INTERNSHIP_PLACEMENT_TIMELINE,
  MONTHLY_REVIEW_QUESTIONS,
  NON_NEGOTIABLE_RULES,
  GRADUATION_READINESS_ITEMS,
  NEXT_30_DAYS_ACTION_ITEMS,
} from './personalRoadmapData';

const READINESS_STORAGE_KEY = 'vidyapath_personal_grad_readiness_v1';
const ACTION_30_STORAGE_KEY = 'vidyapath_next30days_action_v1';

export const PersonalCareerRoadmap = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSpecialization, setSelectedSpecialization] = useState(TY_SPECIALIZATION_PATHS[0].id);

  // Graduation Readiness Checklist State
  const [readinessChecked, setReadinessChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(READINESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Next 30 Days Action Checklist State
  const [actionChecked, setActionChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTION_30_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(READINESS_STORAGE_KEY, JSON.stringify(readinessChecked));
    } catch (e) {
      console.error(e);
    }
  }, [readinessChecked]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTION_30_STORAGE_KEY, JSON.stringify(actionChecked));
    } catch (e) {
      console.error(e);
    }
  }, [actionChecked]);

  const toggleReadiness = (id) => {
    setReadinessChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAction = (id) => {
    setActionChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const readinessCount = Object.values(readinessChecked).filter(Boolean).length;
  const readinessPercent = Math.round((readinessCount / GRADUATION_READINESS_ITEMS.length) * 100);

  const actionCount = Object.values(actionChecked).filter(Boolean).length;
  const actionPercent = Math.round((actionCount / NEXT_30_DAYS_ACTION_ITEMS.length) * 100);

  const activeSpec = TY_SPECIALIZATION_PATHS.find((s) => s.id === selectedSpecialization) || TY_SPECIALIZATION_PATHS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Header Banner */}
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
              <Compass size={15} /> PERSONAL 4-YEAR CAREER BLUEPRINT
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
              FY → SY → TY → Final Year • 21 Core Sections
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
            Personal CSE 4-Year Career Roadmap
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
            Syllabus + Skills + Projects + Hackathons + Certifications + Internship + Placement.
            A sustainable, structured operating system engineered for computer science engineering success.
          </p>

          {/* 4-Year Success Formula Banner */}
          <div
            style={{
              background: 'rgba(5, 18, 52, 0.45)',
              border: '1px solid rgba(170, 192, 225, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '860px',
            }}
          >
            <Flame size={24} style={{ color: 'var(--aegean-300)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aegean-300)', fontWeight: 700 }}>
                4-Year Success Formula
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.01em', lineHeight: 1.4 }}>
                ACADEMICS + DSA + PROJECTS + SPECIALIZATION + HACKATHONS + INTERNSHIP + COMMUNICATION + PORTFOLIO
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats */}
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
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>4 Years</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--aegean-200)' }}>Progression Strategy</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-300)' }}>SY Sem 3</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--aegean-200)' }}>Current Execution Phase</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>5 Paths</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--aegean-200)' }}>TY Specializations</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-300)' }}>16 Steps</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--aegean-200)' }}>Project System</div>
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
          { id: 'overview', label: '🧭 4-Year Plan & Targets (Sec 1–3)', icon: Compass },
          { id: 'operating-system', label: '⏰ Weekly OS & Study System (Sec 4–5, 16)', icon: Clock },
          { id: 'current-phase', label: '🚀 SY / Sem 3 & 4 Execution (Sec 6–7)', icon: Zap },
          { id: 'specialization', label: '🎯 TY Specializations & Final Year (Sec 8–10)', icon: Target },
          { id: 'project-system', label: '🏗️ 16-Step Project Blueprint & Ladder (Sec 11–12)', icon: Layers },
          { id: 'hackathons-career', label: '🏆 Hackathons, Certs & Internships (Sec 13–15)', icon: Award },
          { id: 'rules-action', label: `⚡ Rules & Next 30 Days (${actionCount}/8)`, icon: Flame },
          { id: 'readiness', label: `🎓 Graduation Readiness (${readinessCount}/12)`, icon: GraduationCap },
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
                padding: '0.75rem 1.15rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                border: 'none',
                background: isActive ? 'var(--primary-600)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================== */}
      {/* TAB 1: 4-YEAR MASTER PLAN & TARGETS (Sections 1–3)         */}
      {/* ========================================================== */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 2: Personal Career Target & Assets */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid var(--primary-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Target size={22} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 2: Your Personal Career Target & Strategy
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {PERSONAL_ROADMAP_OVERVIEW.howBuilt}
            </p>

            <div className="cards-grid-2" style={{ marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>
                  🎯 Primary Career Goal:
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {PERSONAL_ROADMAP_OVERVIEW.primaryGoal}
                </p>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>
                  ⚡ Secondary Goal & Decision Window:
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {PERSONAL_ROADMAP_OVERVIEW.secondaryGoal} (Recommended decision window: <em>{PERSONAL_ROADMAP_OVERVIEW.specializationWindow}</em>).
                </p>
              </div>
            </div>

            {/* Assets by Graduation */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Essential Assets to Possess by Graduation:
              </div>
              <div className="cards-grid-2">
                {PERSONAL_ROADMAP_OVERVIEW.graduationAssets.map((asset, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                    <span>{asset}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 3: Four-Year Master Progression Table */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Section 3: Four-Year Master Progression Table
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                A bird&apos;s-eye view of your entire 4-year journey from foundational programming to placement readiness.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {FOUR_YEAR_MASTER_PLAN.map((plan, idx) => (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ background: 'var(--primary-600)', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                        Year {idx + 1}
                      </span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {plan.year}
                      </h4>
                    </div>
                    <Badge variant="neutral">{plan.badge}</Badge>
                  </div>

                  <div className="cards-grid-4" style={{ gap: '0.85rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Academic Focus
                      </span>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.45 }}>
                        {plan.academic}
                      </p>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Technical Focus
                      </span>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.45 }}>
                        {plan.technical}
                      </p>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Projects & Hackathons
                      </span>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.45 }}>
                        {plan.projects}
                      </p>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Career Preparation
                      </span>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.45 }}>
                        {plan.careerPrep}
                      </p>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    🎯 Target Outcome: <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>{plan.outcome}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: WEEKLY OS & STUDY SYSTEM (Sections 4, 5, 16)        */}
      {/* ========================================================== */}
      {activeTab === 'operating-system' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 4: Weekly Operating System */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Clock size={22} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 4: Your Weekly Operating System (Study Routine)
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A sustainable, consistent weekly routine is far more effective than occasional 10-hour binge sessions.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>Activity</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--primary-700)' }}>Normal Week</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: '#ef4444' }}>Exam Week</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--accent-success)' }}>Vacation / Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  {WEEKLY_OPERATING_SYSTEM.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.activity}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.desc}</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--primary-800)' }}>
                        {row.normal}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#b91c1c' }}>
                        {row.exam}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#047857' }}>
                        {row.vacation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Section 5: 5-Step Semester Study System */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 5: 5-Step Semester Academic Mastery System
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Follow this loop to ensure top university GPA without last-minute cramming:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SEMESTER_STUDY_SYSTEM_STEPS.map((st) => (
                <div
                  key={st.step}
                  style={{
                    background: 'var(--bg-secondary)',
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
                    {st.step}
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      {st.title}
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 16: Monthly Review Questions */}
          <Card style={{ padding: '2rem', background: 'var(--bg-tertiary)', borderLeft: '4px solid #8b5cf6' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 16: Monthly Self-Review System (8 Reflection Questions)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Ask yourself these 8 questions on the last Sunday of every month to calibrate your growth:
            </p>

            <div className="cards-grid-2">
              {MONTHLY_REVIEW_QUESTIONS.map((q, qIdx) => (
                <div key={qIdx} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                  {q}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 3: SY / SEM 3 & 4 EXECUTION (Sections 6, 7)            */}
      {/* ========================================================== */}
      {activeTab === 'current-phase' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 6: Current Phase — Sem 3 Subjects */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid var(--primary-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Zap size={22} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 6: Current Phase — Semester 3 Execution Plan
                </h3>
              </div>
              <Badge variant="primary">Active Semester Focus</Badge>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Specific weekly actions and tangible practical deliverables for your current 6 core semester subjects:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {CURRENT_PHASE_SEM3.map((sub, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--primary-800)' }}>{sub.subject}</strong>
                    <Badge variant="neutral">{sub.badge}</Badge>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <strong>Main Goal:</strong> {sub.goal}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    <strong>Weekly Action:</strong> {sub.action}
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.83rem', color: 'var(--accent-success)', fontWeight: 600 }}>
                    🛠️ Practical Output: <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>{sub.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 7: Sem 3 & 4 Priorities */}
          <div className="cards-grid-2">
            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {SY_SEMESTER_PLAN.sem3.title}
                </h4>
                <Badge variant="primary">Sem 3</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SY_SEMESTER_PLAN.sem3.priorities.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--primary-700)' }}>• {item.p}: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.84rem', marginTop: 'auto' }}>
                <strong>Project Target:</strong> {SY_SEMESTER_PLAN.sem3.projectTarget}<br />
                <strong>Certificate:</strong> {SY_SEMESTER_PLAN.sem3.certTarget}
              </div>
            </Card>

            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {SY_SEMESTER_PLAN.sem4.title}
                </h4>
                <Badge variant="neutral">Sem 4</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SY_SEMESTER_PLAN.sem4.priorities.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--primary-700)' }}>• {item.p}: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 4: TY SPECIALIZATIONS & FINAL YEAR (Sections 8–10)     */}
      {/* ========================================================== */}
      {activeTab === 'specialization' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 8: 5 Specialization Learning Paths */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 8: Choose Your Specialization (5 Core Paths)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Do not pick based only on hype. Pick after building 1–2 small projects and evaluating what engineering workflows you enjoy:
            </p>

            {/* Specialization Selection Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {TY_SPECIALIZATION_PATHS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialization(spec.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: selectedSpecialization === spec.id ? `2px solid ${spec.color}` : '1px solid var(--border-color)',
                    background: selectedSpecialization === spec.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    color: selectedSpecialization === spec.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: selectedSpecialization === spec.id ? 700 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                  }}
                >
                  {spec.name}
                </button>
              ))}
            </div>

            {/* Active Specialization Details */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                borderLeft: `4px solid ${activeSpec.color}`,
                padding: '1.5rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {activeSpec.name} Track
              </h4>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  Recommended Step-by-Step Learning Order:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.55 }}>
                  {activeSpec.learningOrder}
                </p>
              </div>

              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  Required Portfolio Projects:
                </strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {activeSpec.projects}
                </p>
              </div>

              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  Target Placement Roles:
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  {activeSpec.targetRoles}
                </span>
              </div>
            </div>
          </Card>

          {/* Section 9: TY Semester Plan */}
          <div className="cards-grid-2">
            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Third Year: Semester 5 Plan
                </h4>
                <Badge variant="primary">Sem 5</Badge>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {TY_SEMESTER_PLAN.sem5.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Third Year: Semester 6 Plan
                </h4>
                <Badge variant="primary">Sem 6</Badge>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {TY_SEMESTER_PLAN.sem6.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Section 10: Final Year Capstone Project Timeline */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 10: Final Year Capstone Project & Placement Sprints
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Step-by-step 8-phase execution from problem validation to final viva defense:
            </p>

            <div className="cards-grid-2">
              {FINAL_YEAR_PLAN_PHASES.map((ph, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
                      {ph.phase}
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{ph.title}</strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {ph.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 5: 16-STEP PROJECT BLUEPRINT & LADDER (Sections 11–12) */}
      {/* ========================================================== */}
      {activeTab === 'project-system' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 11: 16-Step Project Framework */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Layers size={22} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 11: How You Should Complete Every Project (16-Step System)
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Never jump straight into coding. Follow this professional engineering lifecycle for all portfolio projects:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
              }}
            >
              {PROJECT_16_STEP_FRAMEWORK.map((st) => (
                <div
                  key={st.step}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.15rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary-600)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '4px' }}>
                      Step {st.step}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{st.name}</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 12: Personal Project Ladder */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Section 12: Personal Project Progression Ladder
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Gradually escalate from small syntax exercises to high-level system engineering.
              </p>
            </div>

            <div className="cards-grid-4">
              {PERSONAL_PROJECT_LADDER.map((lvl) => (
                <Card key={lvl.stage} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">{lvl.stage}</Badge>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-700)' }}>{lvl.level}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Target: {lvl.count} Projects
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.35rem 0', lineHeight: 1.45 }}>
                      <strong>Purpose:</strong> {lvl.purpose}
                    </p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--primary-800)', background: 'var(--bg-tertiary)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong>Examples:</strong> {lvl.example}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 6: HACKATHONS, CERTS & INTERNSHIPS (Sections 13–15)    */}
      {/* ========================================================== */}
      {activeTab === 'hackathons-career' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 13: Hackathon Strategy */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Award size={22} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 13: Hackathon Strategy in Your 4 Years
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Evolve your hackathon strategy year-over-year:
            </p>

            <div className="cards-grid-4" style={{ marginBottom: '1.5rem' }}>
              {HACKATHON_AND_CERT_STRATEGY.hackathons.map((h, idx) => (
                <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--primary-800)', fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>
                    {h.year} Strategy:
                  </strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {h.strategy}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #f59e0b' }}>
              <strong style={{ color: 'var(--primary-800)', fontSize: '0.88rem' }}>📌 Post-Hackathon Rule: </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {HACKATHON_AND_CERT_STRATEGY.postHackathonRule}
              </span>
            </div>
          </Card>

          {/* Section 14: Certification Strategy */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 14: Strategic Certification Road (Not Certificate Collecting)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Do not collect certificates blindly. Complete courses only to gain skills that directly power your projects:
            </p>

            <div className="cards-grid-4">
              {HACKATHON_AND_CERT_STRATEGY.certs.map((c, idx) => (
                <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--primary-700)', fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>
                    {c.year}:
                  </strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {c.focus}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 15: Internship & Placement Timeline */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 15: Internship & Placement Timeline
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Preparation requirements and tangible evidence milestones for each stage:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>Stage</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>Required Preparation</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>Required Evidence</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--primary-800)' }}>Target Milestone</th>
                  </tr>
                </thead>
                <tbody>
                  {INTERNSHIP_PLACEMENT_TIMELINE.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-700)' }}>{row.stage}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{row.prep}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{row.evidence}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-success)', fontWeight: 600 }}>{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 7: RULES & NEXT 30 DAYS (Sections 18, 20, 21)          */}
      {/* ========================================================== */}
      {activeTab === 'rules-action' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 18: Non-Negotiable Rules */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Flame size={22} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 18: 8 Non-Negotiable Engineering Principles
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Keep these golden rules pinned in your daily workspace:
            </p>

            <div className="cards-grid-2">
              {NON_NEGOTIABLE_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.45,
                  }}
                >
                  <strong style={{ color: '#b91c1c' }}>Rule #{idx + 1}: </strong> {rule}
                </div>
              ))}
            </div>
          </Card>

          {/* Section 21: Immediate Next 30 Days Action Items */}
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
                  <Zap size={13} /> Section 21: Immediate Next 30 Days Sprint
                </Badge>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Immediate Semester 3 Action Plan
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Check off items as you execute them over the next 30 days. Progress persists automatically.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Reset the 30-day action plan?')) setActionChecked({});
                }}
                icon={RefreshCw}
              >
                Reset Plan
              </Button>
            </div>

            {/* Action Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {actionCount} of {NEXT_30_DAYS_ACTION_ITEMS.length} Action Items Completed
                </span>
                <span style={{ color: actionPercent === 100 ? 'var(--accent-success)' : 'var(--primary-700)' }}>
                  {actionPercent}% Done
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${actionPercent}%`,
                    background: actionPercent === 100 ? 'var(--accent-success)' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Action Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {NEXT_30_DAYS_ACTION_ITEMS.map((item, idx) => {
                const isChecked = actionChecked[item.id] ?? false;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAction(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      background: isChecked ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                      border: `1px solid ${isChecked ? 'var(--primary-300)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${isChecked ? 'var(--accent-success)' : 'var(--border-color)'}`,
                        background: isChecked ? 'var(--accent-success)' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        marginTop: '0.1rem',
                        flexShrink: 0,
                      }}
                    >
                      {isChecked && <Check size={13} strokeWidth={3} />}
                    </div>
                    <span
                      style={{
                        fontSize: '0.88rem',
                        color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        lineHeight: 1.45,
                      }}
                    >
                      <strong>Action #{idx + 1}: </strong> {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 8: GRADUATION READINESS AUDIT (Section 19)             */}
      {/* ========================================================== */}
      {activeTab === 'readiness' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
              borderLeft: '4px solid var(--primary-600)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>
                  <GraduationCap size={13} /> Section 19: Graduation Readiness Audit
                </Badge>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  12-Point Graduation Competence Audit
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Track your progression across all 4 years. Aim to achieve 100% before your 7th semester placement season starts.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Reset graduation readiness checklist?')) setReadinessChecked({});
                }}
                icon={RefreshCw}
              >
                Reset Audit
              </Button>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {readinessCount} of {GRADUATION_READINESS_ITEMS.length} Graduation Competencies Achieved
                </span>
                <span style={{ color: readinessPercent === 100 ? 'var(--accent-success)' : 'var(--primary-700)' }}>
                  {readinessPercent}% Ready
                </span>
              </div>
              <div style={{ height: '10px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${readinessPercent}%`,
                    background: readinessPercent === 100 ? 'var(--accent-success)' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {readinessPercent === 100 && (
              <div
                style={{
                  marginBottom: '1.25rem',
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
                    Outstanding! You have met all 12 Graduation Competency Standards!
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                    You possess strong fundamentals, verified projects, a clear specialization, and placement interview readiness.
                  </div>
                </div>
              </div>
            )}

            {/* Checklist Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {GRADUATION_READINESS_ITEMS.map((item, idx) => {
                const isChecked = readinessChecked[item.id] ?? false;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReadiness(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      background: isChecked ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                      border: `1px solid ${isChecked ? 'var(--primary-300)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${isChecked ? 'var(--accent-success)' : 'var(--border-color)'}`,
                        background: isChecked ? 'var(--accent-success)' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        marginTop: '0.1rem',
                        flexShrink: 0,
                      }}
                    >
                      {isChecked && <Check size={13} strokeWidth={3} />}
                    </div>
                    <span
                      style={{
                        fontSize: '0.88rem',
                        color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        lineHeight: 1.45,
                      }}
                    >
                      <strong>Competency #{idx + 1}: </strong> {item.text}
                    </span>
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

export default PersonalCareerRoadmap;
