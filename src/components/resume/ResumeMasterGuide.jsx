import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code,
  Zap,
  Target,
  Award,
  BookOpen,
  Copy,
  Check,
  Search,
  ExternalLink,
  Shield,
  Layers,
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
  CheckSquare,
  XCircle,
  FileCheck,
  GitBranch,
  Share2,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import {
  RESUME_CORE_PHILOSOPHY,
  RESUME_ELEMENTS,
  RESUME_BLUEPRINT_SECTIONS,
  SUMMARY_FORMULAS,
  ACTION_VERBS_BY_CATEGORY,
  PROJECT_BULLET_EXAMPLES,
  PLACEMENT_PROJECT_LEVELS,
  GITHUB_LINKEDIN_GUIDELINES,
  ATS_RULES,
  ROLE_KEYWORDS_DIRECTORY,
  FATAL_RESUME_MISTAKES,
  INTERVIEW_SELF_INTRO_SCRIPT,
  PATRL_PROJECT_FRAMEWORK,
  PROJECT_DEFENSE_QUESTIONS,
  RESUME_INTERVIEW_PREP_MATRIX,
  RESUME_AUDIT_CHECKLIST_ITEMS,
  THIRTY_DAY_IMPROVEMENT_PLAN,
  PRE_APPLICATION_CHECKLIST,
} from './resumeGuideData';

const AUDIT_STORAGE_KEY = 'vidyapath_resume_audit_checklist_v1';
const PREAPP_STORAGE_KEY = 'vidyapath_preapp_checklist_v1';

export const ResumeMasterGuide = () => {
  const [activeTab, setActiveTab] = useState('blueprint');
  const [selectedSummaryRole, setSelectedSummaryRole] = useState(0);
  const [selectedRoleKeyword, setSelectedRoleKeyword] = useState('all');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  // 16-point Audit Checklist State
  const [auditChecked, setAuditChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 10-point Pre-app Checklist State
  const [preappChecked, setPreappChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(PREAPP_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditChecked));
    } catch (e) {
      console.error(e);
    }
  }, [auditChecked]);

  useEffect(() => {
    try {
      localStorage.setItem(PREAPP_STORAGE_KEY, JSON.stringify(preappChecked));
    } catch (e) {
      console.error(e);
    }
  }, [preappChecked]);

  const toggleAuditItem = (id) => {
    setAuditChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePreappItem = (id) => {
    setPreappChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const auditCompletedCount = Object.values(auditChecked).filter(Boolean).length;
  const auditPercent = Math.round((auditCompletedCount / RESUME_AUDIT_CHECKLIST_ITEMS.length) * 100);

  const preappCompletedCount = Object.values(preappChecked).filter(Boolean).length;
  const preappPercent = Math.round((preappCompletedCount / PRE_APPLICATION_CHECKLIST.length) * 100);

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter role keywords
  const filteredKeywords = useMemo(() => {
    return ROLE_KEYWORDS_DIRECTORY.filter((item) => {
      const matchesRole =
        selectedRoleKeyword === 'all' || item.role.toLowerCase().includes(selectedRoleKeyword.toLowerCase());
      const matchesSearch =
        !keywordSearch.trim() ||
        item.role.toLowerCase().includes(keywordSearch.toLowerCase()) ||
        item.skills.some((s) => s.toLowerCase().includes(keywordSearch.toLowerCase()));
      return matchesRole && matchesSearch;
    });
  }, [selectedRoleKeyword, keywordSearch]);

  const generateMarkdownBlueprint = () => {
    const bp = RESUME_BLUEPRINT_SECTIONS;
    return `# ${bp.header.name}
${bp.header.title}
${bp.header.contact}
${bp.header.links}

## PROFESSIONAL SUMMARY
${bp.summary}

## EDUCATION
**${bp.education.degree}** | ${bp.education.institution} (${bp.education.period})
${bp.education.grade}
${bp.education.coursework}

## TECHNICAL SKILLS
- **Programming Languages:** ${bp.skills.languages}
- **Frontend Development:** ${bp.skills.frontend}
- **Backend & APIs:** ${bp.skills.backend}
- **Databases:** ${bp.skills.databases}
- **Tools & Cloud:** ${bp.skills.toolsDevOps}

## PROJECTS
${bp.projects.map((p) => `### ${p.title}
*${p.tech}* | ${p.links}
${p.bullets.map((b) => `- ${b}`).join('\n')}`).join('\n\n')}

## EXPERIENCE
### ${bp.experience.role} — ${bp.experience.company} (${bp.experience.period})
${bp.experience.bullets.map((b) => `- ${b}`).join('\n')}

## CERTIFICATIONS
${bp.certifications.map((c) => `- ${c}`).join('\n')}

## ACHIEVEMENTS & LEADERSHIP
${bp.achievements.map((a) => `- ${a}`).join('\n')}
`;
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
          border: '1px solid rgba(170, 192, 225, 0.25)',
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
              <FileText size={15} /> CSE RESUME MASTER GUIDE
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
              28 Comprehensive Sections • Placement-Ready
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
            CSE Resume Building Master Guide
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
            How to create, improve, customize, and use a placement-ready resume.
            Make it effortlessly easy for recruiters to see what you can build, what technologies you know, and the verifiable evidence supporting your claims.
          </p>

          {/* Golden Rule Banner */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(170, 192, 225, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '820px',
            }}
          >
            <Zap size={24} style={{ color: 'var(--aegean-300)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--aegean-200)', fontWeight: 700 }}>
                Core Cardinal Rule
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.01em', lineHeight: 1.45 }}>
                Your resume is not a list of everything you know. It is a compact evidence document: Claim a skill → Explain it → Demonstrate it → Prove it.
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
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-200)' }}>28 Sections</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>End-to-End Blueprint</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>8 Roles</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>Target Keywords Matrix</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-300)' }}>16-Point</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>ATS & Quality Audit</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>30 Days</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>Sprint Improvement Plan</div>
          </div>
        </div>
      </section>

      {/* Action Bar with Links to Live Resume Builder */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Ready to construct your ATS resume now? Use our live interactive builder:
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/resumes">
            <Button variant="primary" size="sm" icon={FileText}>
              Open Live ATS Resume Builder
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            icon={copiedKey === 'full-md' ? Check : Copy}
            onClick={() => handleCopy('full-md', generateMarkdownBlueprint())}
          >
            {copiedKey === 'full-md' ? 'Blueprint Copied!' : 'Copy 1-Page Markdown Blueprint'}
          </Button>
        </div>
      </div>

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
          { id: 'blueprint', label: '📐 1-Page Blueprint (Sec 1–6, 24)', icon: FileText },
          { id: 'bullets', label: '🛠️ Skills & Bullet Formulas (Sec 7–10)', icon: Code },
          { id: 'experience', label: '🚀 Exp, GitHub & LinkedIn (Sec 11–15)', icon: GitBranch },
          { id: 'ats-keywords', label: '🤖 ATS & Role Keywords (Sec 16–18)', icon: Target },
          { id: 'defense', label: '🎤 Interview Defense & PATRL (Sec 20–22)', icon: MessageSquare },
          { id: 'sprint', label: '📅 30-Day Sprint Plan (Sec 25)', icon: Calendar },
          { id: 'mistakes', label: '⚠️ Mistakes & Naming (Sec 19, 26, 27)', icon: AlertTriangle },
          { id: 'checklists', label: `✅ Audits (${auditCompletedCount}/16)`, icon: CheckSquare },
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
      {/* TAB 1: 1-PAGE BLUEPRINT & STRUCTURE (Sections 1–6, 24)     */}
      {/* ========================================================== */}
      {activeTab === 'blueprint' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 24: Complete 1-Page Visual ASCII / Styled Blueprint */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid var(--primary-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <Badge variant="primary" style={{ marginBottom: '0.35rem' }}>Section 24 Blueprint</Badge>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Recommended CSE Fresher 1-Page Resume Layout
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={copiedKey === 'blueprint-copy' ? Check : Copy}
                onClick={() => handleCopy('blueprint-copy', generateMarkdownBlueprint())}
              >
                {copiedKey === 'blueprint-copy' ? 'Copied Blueprint!' : 'Copy Template'}
              </Button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              This single-column architecture ensures 100% readability across ATS parsers and makes every line count for human recruiters.
            </p>

            {/* Visual Blueprint Box */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                color: '#1e293b',
              }}
            >
              {/* Header Box */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', letterSpacing: '0.04em' }}>
                  {RESUME_BLUEPRINT_SECTIONS.header.name}
                </h2>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0284c7', marginBottom: '0.4rem' }}>
                  {RESUME_BLUEPRINT_SECTIONS.header.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.3rem' }}>
                  {RESUME_BLUEPRINT_SECTIONS.header.contact}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 500 }}>
                  {RESUME_BLUEPRINT_SECTIONS.header.links}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Professional Summary
                </h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: '#334155', margin: 0 }}>
                  {RESUME_BLUEPRINT_SECTIONS.summary}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Education
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{RESUME_BLUEPRINT_SECTIONS.education.degree}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{RESUME_BLUEPRINT_SECTIONS.education.period}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.2rem' }}>
                  {RESUME_BLUEPRINT_SECTIONS.education.institution} | <strong style={{ color: '#0f172a' }}>{RESUME_BLUEPRINT_SECTIONS.education.grade}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {RESUME_BLUEPRINT_SECTIONS.education.coursework}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Technical Skills
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#334155' }}>
                  <div><strong style={{ color: '#0f172a' }}>Languages:</strong> {RESUME_BLUEPRINT_SECTIONS.skills.languages}</div>
                  <div><strong style={{ color: '#0f172a' }}>Frontend:</strong> {RESUME_BLUEPRINT_SECTIONS.skills.frontend}</div>
                  <div><strong style={{ color: '#0f172a' }}>Backend & APIs:</strong> {RESUME_BLUEPRINT_SECTIONS.skills.backend}</div>
                  <div><strong style={{ color: '#0f172a' }}>Databases:</strong> {RESUME_BLUEPRINT_SECTIONS.skills.databases}</div>
                  <div><strong style={{ color: '#0f172a' }}>Tools & DevOps:</strong> {RESUME_BLUEPRINT_SECTIONS.skills.toolsDevOps}</div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Projects
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {RESUME_BLUEPRINT_SECTIONS.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{proj.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#0369a1' }}>{proj.links}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.3rem' }}>
                        Tech Stack: {proj.tech}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.84rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Experience / Internship
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{RESUME_BLUEPRINT_SECTIONS.experience.role} — {RESUME_BLUEPRINT_SECTIONS.experience.company}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{RESUME_BLUEPRINT_SECTIONS.experience.period}</span>
                </div>
                <ul style={{ margin: '0.3rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.84rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {RESUME_BLUEPRINT_SECTIONS.experience.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Certifications & Achievements */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Certifications
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {RESUME_BLUEPRINT_SECTIONS.certifications.map((c, cIdx) => (
                      <li key={cIdx}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Achievements & Leadership
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {RESUME_BLUEPRINT_SECTIONS.achievements.map((a, aIdx) => (
                      <li key={aIdx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 5: Professional Summary Formulas */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Sparkles size={22} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 5: Crafting a High-Impact Professional Summary
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A summary is optional for freshers. If included, keep it strictly to 2–3 lines packed with concrete technical skills and role alignment.
            </p>

            {/* Bad vs Strong Summary Comparison */}
            <div className="cards-grid-2" style={{ marginBottom: '1.75rem' }}>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <XCircle size={18} style={{ color: '#ef4444' }} />
                  <strong style={{ color: '#b91c1c', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    Weak / Generic Summary (Avoid)
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontStyle: 'italic', margin: '0 0 0.5rem 0' }}>
                  &quot;{SUMMARY_FORMULAS.weak}&quot;
                </p>
                <div style={{ fontSize: '0.8rem', color: '#991b1b' }}>
                  ❌ <strong>Why it fails:</strong> {SUMMARY_FORMULAS.weakExplanation}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                  <strong style={{ color: '#047857', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    Strong Evidence-Based Formula
                  </strong>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', lineHeight: 1.45 }}>
                  {SUMMARY_FORMULAS.strongFormula}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#065f46' }}>
                  ✅ <strong>Why it works:</strong> Highlights verified stack, key interest, and targeted role immediately.
                </div>
              </div>
            </div>

            {/* Role-Specific Examples */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Role-Specific Summary Templates:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {SUMMARY_FORMULAS.strongExamples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSummaryRole(idx)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      border: selectedSummaryRole === idx ? '1px solid var(--primary-600)' : '1px solid var(--border-color)',
                      background: selectedSummaryRole === idx ? 'var(--primary-50)' : 'var(--bg-primary)',
                      color: selectedSummaryRole === idx ? 'var(--primary-800)' : 'var(--text-secondary)',
                      fontSize: '0.83rem',
                      fontWeight: selectedSummaryRole === idx ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {ex.role}
                  </button>
                ))}
              </div>

              <div
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div>{SUMMARY_FORMULAS.strongExamples[selectedSummaryRole].text}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={copiedKey === `summary-${selectedSummaryRole}` ? Check : Copy}
                  onClick={() => handleCopy(`summary-${selectedSummaryRole}`, SUMMARY_FORMULAS.strongExamples[selectedSummaryRole].text)}
                >
                  {copiedKey === `summary-${selectedSummaryRole}` ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: SKILLS & PROJECT BULLET FORMULAS (Sections 7–10)    */}
      {/* ========================================================== */}
      {activeTab === 'bullets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 8: Strong Action Verbs by Category */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Zap size={22} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 8: High-Impact Action Verbs Directory
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Start every single project and experience bullet point with an active, commanding verb. Never use passive phrases like &quot;Responsible for&quot; or &quot;Worked on&quot;.
            </p>

            <div className="cards-grid-3">
              {ACTION_VERBS_BY_CATEGORY.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <strong style={{ color: 'var(--primary-700)', fontSize: '0.95rem' }}>{cat.category}</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {cat.verbs.map((verb) => (
                      <span
                        key={verb}
                        onClick={() => handleCopy(`verb-${verb}`, verb)}
                        style={{
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                        }}
                        title="Click to copy"
                      >
                        {verb}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    💡 {cat.usage}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 9: Real-World Good vs Bad Project Bullets */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Section 9: Real-World Strong Project Bullet Breakdowns
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Compare weak generic bullets with technical, architecture-driven bullets.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PROJECT_BULLET_EXAMPLES.map((ex, idx) => (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {ex.projectName}
                    </h4>
                    <Badge variant="primary">{ex.category}</Badge>
                  </div>

                  {/* Bad Bullet */}
                  <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#b91c1c' }}>
                    <strong>❌ Weak: </strong> &quot;{ex.badBullet}&quot;
                  </div>

                  {/* Good Bullets */}
                  <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-800)', marginBottom: '0.4rem' }}>
                      ✅ High-Impact Bullets (Action + Tech + Metric):
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {ex.goodBullets.map((gb, gIdx) => (
                        <li key={gIdx}>{gb}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 10: 3-Tier Placement Project Ladder */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 10: Placement Project Progression Ladder
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Recruiters evaluate engineering depth over mere cosmetic appearance. Aim for at least one Intermediate and one Advanced project.
            </p>

            <div className="cards-grid-3">
              {PLACEMENT_PROJECT_LEVELS.map((lvl, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Badge variant={idx === 2 ? 'success' : idx === 1 ? 'primary' : 'neutral'}>
                    Tier {idx + 1}: {lvl.tier}
                  </Badge>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong>Examples:</strong> {lvl.examples}
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--primary-800)', background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginTop: 'auto' }}>
                    <strong>Proves:</strong> {lvl.whatItProves}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 3: EXPERIENCE, GITHUB & LINKEDIN (Sections 11–15)      */}
      {/* ========================================================== */}
      {activeTab === 'experience' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 11, 12, 13 Experience & Hackathons */}
          <div className="cards-grid-2">
            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={20} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 11: Experience & Internship Best Practices
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Frame experience around <strong>Contributions & Outcomes</strong> rather than passive job duty descriptions.
              </p>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <strong>Template:</strong><br />
                <code>Role — Organization | Dates (e.g. Jun 2027 – Aug 2027)</code><br />
                • Developed [feature/API] using [technology] for [user/client].<br />
                • Integrated [3rd party tool/caching/testing] to enhance [workflow].<br />
                • Improved [metric] by [X%] (only if genuinely measured).
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <li>Never inflate your job title or claim work done by other senior engineers.</li>
                <li>State exact start and end months.</li>
              </ul>
            </Card>

            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 13: Hackathons & Achievements
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Quantify the competition context and your exact individual leadership role.
              </p>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <strong>Hackathon Leadership Example:</strong><br />
                • Led a 4-member team to engineer an AI disaster response prototype using PyTorch and WebSockets.<br />
                • Coordinated backend APIs, real-time geolocation streaming, and final pitch deck.<br />
                • Secured 1st Place out of 65 university teams.
              </div>
              <div style={{ fontSize: '0.82rem', color: '#b91c1c' }}>
                ⚠️ <em>Never turn simple participation into a false claim of winning.</em>
              </div>
            </Card>
          </div>

          {/* Section 14 & 15: GitHub & LinkedIn Connection */}
          <div className="cards-grid-2">
            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <GitBranch size={20} style={{ color: '#0f172a' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 14: GitHub — Resume Quality Protocol
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {GITHUB_LINKEDIN_GUIDELINES.github.map((g, idx) => (
                  <div key={idx} style={{ fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>• {g.title}: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{g.desc}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Share2 size={20} style={{ color: '#0a66c2' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 15: LinkedIn — Resume Synchronization
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {GITHUB_LINKEDIN_GUIDELINES.linkedin.map((l, idx) => (
                  <div key={idx} style={{ fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>• {l.title}: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{l.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 4: ATS RULES & ROLE KEYWORDS (Sections 16–18)          */}
      {/* ========================================================== */}
      {activeTab === 'ats-keywords' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 16: 8 ATS Golden Rules */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 16: 8 Non-Negotiable ATS Parsing Rules
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Applicant Tracking Systems (ATS) scan and extract structured text from your resume. Follow these rules to guarantee 100% parsing fidelity:
            </p>

            <div className="cards-grid-4">
              {ATS_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontSize: '0.75rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      #{idx + 1}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{rule.rule}</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 18: Role-Specific Keywords Directory */}
          <Card style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Section 18: Resume Keywords Directory by CSE Role
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                  Targeting a specific engineering role? Ensure your resume naturally integrates these verified domain keywords.
                </p>
              </div>

              <div style={{ minWidth: '240px' }}>
                <Input
                  placeholder="Search keywords (e.g. Docker, PyTorch, React)..."
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  icon={Search}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredKeywords.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--primary-800)' }}>{item.role}</strong>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={copiedKey === `kw-${idx}` ? Check : Copy}
                      onClick={() => handleCopy(`kw-${idx}`, item.skills.join(', '))}
                    >
                      {copiedKey === `kw-${idx}` ? 'Copied All' : 'Copy All'}
                    </Button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        onClick={() => handleCopy(`skill-${skill}`, skill)}
                        style={{
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                        }}
                        title="Click to copy single skill"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 5: INTERVIEW DEFENSE & P-A-T-R-L (Sections 20–22)       */}
      {/* ========================================================== */}
      {activeTab === 'defense' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 20: 60–90 Second Self-Introduction */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <MessageSquare size={22} style={{ color: '#8b5cf6' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 20: 60–90 Second Verbal Introduction Script
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Whenever an interviewer asks <em>&quot;Walk me through your resume&quot;</em> or <em>&quot;Tell me about yourself&quot;</em>, use this conversational Present → Past → Future framework:
            </p>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                borderLeft: '3px solid #8b5cf6',
              }}
            >
              {INTERVIEW_SELF_INTRO_SCRIPT.script}
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={copiedKey === 'intro-script' ? Check : Copy}
              onClick={() => handleCopy('intro-script', INTERVIEW_SELF_INTRO_SCRIPT.script)}
            >
              {copiedKey === 'intro-script' ? 'Copied Introduction!' : 'Copy Introduction Script'}
            </Button>
          </Card>

          {/* Section 21: P-A-T-R-L Project Explanation Framework */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 21: The P-A-T-R-L Project Defense Formula
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Structure your answer for every resume project into these 5 pillars:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              {PATRL_PROJECT_FRAMEWORK.map((item) => (
                <div
                  key={item.step}
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-700)', marginBottom: '0.25rem' }}>
                    {item.step} — {item.title}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 9 Follow-Up Defense Questions */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                9 Common Follow-Up Questions Interviewers Drill Into:
              </h4>
              <div className="cards-grid-3">
                {PROJECT_DEFENSE_QUESTIONS.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.45,
                    }}
                  >
                    <strong>Q{qIdx + 1}: </strong> {q}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 22: Resume-to-Interview 5-Point Matrix */}
          <Card style={{ padding: '2rem', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 22: The 5-Point Resume Verification Matrix
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              For every single skill or technology listed on your resume, be prepared to answer:
            </p>

            <div className="cards-grid-3">
              {RESUME_INTERVIEW_PREP_MATRIX.map((mat, mIdx) => (
                <div key={mIdx} style={{ background: 'var(--bg-primary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--primary-800)', fontSize: '0.92rem', display: 'block', marginBottom: '0.25rem' }}>
                    {mat.pillar}
                  </strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {mat.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 6: 30-DAY RESUME IMPROVEMENT PLAN (Section 25)         */}
      {/* ========================================================== */}
      {activeTab === 'sprint' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 25: 30-Day Resume Polish & Improvement Sprint
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Follow this step-by-step 30-day action plan to transform your rough student notes into a verified placement-ready master resume.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {THIRTY_DAY_IMPROVEMENT_PLAN.map((plan, index) => (
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
                  <Badge variant="primary" style={{ marginBottom: '0.35rem', display: 'inline-block' }}>
                    Phase {index + 1}
                  </Badge>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {plan.phase}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {plan.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {plan.task}
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
                    Expected Deliverable:
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--primary-800)' }}>
                    {plan.deliverable}
                  </strong>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 7: FATAL MISTAKES & FILE NAMING (Sections 19, 26, 27)  */}
      {/* ========================================================== */}
      {activeTab === 'mistakes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 19: 12 Fatal Resume Mistakes */}
          <Card style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={22} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Section 19: Top 12 Fatal Resume Mistakes & Actionable Fixes
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Recruiters spend an average of 6–10 seconds reviewing a resume. Any of these 12 red flags can result in instant disqualification:
            </p>

            <div className="cards-grid-2">
              {FATAL_RESUME_MISTAKES.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>❌ #{idx + 1}</span>
                    <strong style={{ fontSize: '0.95rem', color: '#b91c1c' }}>{m.mistake}</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.45 }}>
                    <strong style={{ color: '#047857' }}>Fix: </strong> {m.fix}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 26: Professional File Naming */}
          <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Section 26: Professional Resume PDF File Naming
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Always name your PDF cleanly before uploading to any company ATS portal:
            </p>

            <div className="cards-grid-2">
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ color: '#047857', display: 'block', marginBottom: '0.5rem' }}>
                  ✅ Professional Names (Use These):
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><code>Daksh_Soni_Resume.pdf</code></li>
                  <li><code>Daksh_Soni_Software_Engineer_Resume.pdf</code></li>
                  <li><code>Daksh_Soni_FullStack_Resume.pdf</code></li>
                </ul>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <strong style={{ color: '#b91c1c', display: 'block', marginBottom: '0.5rem' }}>
                  ❌ Unprofessional Names (Avoid):
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><code>resume_new_final_updated.pdf</code></li>
                  <li><code>resume2 (1).pdf</code></li>
                  <li><code>my_doc_2027.pdf</code></li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 8: INTERACTIVE AUDIT CHECKLISTS (Sections 23, 28)      */}
      {/* ========================================================== */}
      {activeTab === 'checklists' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 23: 16-Point Comprehensive Review Checklist */}
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
                  <CheckCircle2 size={13} /> Section 23: 16-Point Comprehensive Resume Audit
                </Badge>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Master Resume Pre-Flight Inspection
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Verify every single requirement before saving your master resume draft.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Reset the 16-point audit checklist?')) setAuditChecked({});
                }}
                icon={RefreshCw}
              >
                Reset Audit
              </Button>
            </div>

            {/* Audit Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {auditCompletedCount} of {RESUME_AUDIT_CHECKLIST_ITEMS.length} Audit Items Verified
                </span>
                <span style={{ color: auditPercent === 100 ? 'var(--accent-success)' : 'var(--primary-700)' }}>
                  {auditPercent}% Score
                </span>
              </div>
              <div style={{ height: '10px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${auditPercent}%`,
                    background: auditPercent === 100 ? 'var(--accent-success)' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Audit Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {RESUME_AUDIT_CHECKLIST_ITEMS.map((item, idx) => {
                const isChecked = auditChecked[item.id] ?? false;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAuditItem(item.id)}
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
                      <strong>#{idx + 1}: </strong> {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Section 28: Quick 10-Point Pre-Application Checklist */}
          <Card
            style={{
              padding: '2rem',
              borderLeft: '4px solid var(--accent-success)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <Badge variant="success" style={{ marginBottom: '0.5rem' }}>
                  <FileCheck size={13} /> Section 28: Quick Pre-Application 60-Second Check
                </Badge>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Immediate Pre-Application Verification
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Run through this 10-point checklist before clicking &quot;Submit Application&quot; for any specific job opening.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Reset the pre-application checklist?')) setPreappChecked({});
                }}
                icon={RefreshCw}
              >
                Reset Pre-App
              </Button>
            </div>

            {/* Pre-app Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {preappCompletedCount} of {PRE_APPLICATION_CHECKLIST.length} Pre-App Checks Cleared
                </span>
                <span style={{ color: preappPercent === 100 ? 'var(--accent-success)' : 'var(--primary-700)' }}>
                  {preappPercent}% Complete
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${preappPercent}%`,
                    background: preappPercent === 100 ? 'var(--accent-success)' : 'linear-gradient(90deg, #10b981, #059669)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Pre-app Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {PRE_APPLICATION_CHECKLIST.map((item, idx) => {
                const isChecked = preappChecked[item.id] ?? false;
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePreappItem(item.id)}
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
                      <strong>#{idx + 1}: </strong> {item.text}
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

export default ResumeMasterGuide;
