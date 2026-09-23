import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Code,
  Search,
  Filter,
  Layers,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Brain,
  Shield,
  Layout,
  Globe,
  Server,
  BarChart3,
  Cloud,
  Smartphone,
  Lock,
  Compass,
  FileCode,
  Award,
  BookOpen,
  Info,
  SlidersHorizontal,
  Flame,
  Zap,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  PROJECT_DOMAINS,
  INDUSTRY_PROJECTS,
  DIFFICULTY_SPECS,
  CAREER_PROGRESSION_RULES,
  PORTFOLIO_FORMULA,
} from './industryProjectsData';

// Map icon strings to Lucide components
const iconMap = {
  Sparkles: Sparkles,
  Brain: Brain,
  Shield: Shield,
  Layout: Layout,
  Globe: Globe,
  Server: Server,
  BarChart3: BarChart3,
  Cloud: Cloud,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Lock: Lock,
  Layers: Layers,
};

export const IndustryProjectsMasterGuide = () => {
  // Navigation sub-tabs inside the Project Guide
  // 'bank' | 'difficulty' | 'roadmap'
  const [activeSubTab, setActiveSubTab] = useState('bank');

  // Filters for Project Bank
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all'); // 'all' | 'LOW' | 'MEDIUM' | 'HIGH'
  const [searchQuery, setSearchQuery] = useState('');

  // Expanded project drawer IDs for detailed architecture & scope deep dive
  const [expandedProjects, setExpandedProjects] = useState({});

  // Copied resume bullet state
  const [copiedId, setCopiedId] = useState(null);

  // Local bookmarks state
  const [bookmarkedProjects, setBookmarkedProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('vidyapath_industry_project_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleBookmark = (id) => {
    setBookmarkedProjects((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('vidyapath_industry_project_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleExpand = (id) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyResumeBullet = (project) => {
    const bullet = `• ${project.title} (${project.domainName}): Developed a ${project.difficulty.toLowerCase()}-complexity system to ${project.problem.toLowerCase()} Built with ${project.techStack}, demonstrating ${project.demonstrate.toLowerCase()}`;
    navigator.clipboard.writeText(bullet).then(() => {
      setCopiedId(project.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return INDUSTRY_PROJECTS.filter((p) => {
      const matchDomain = selectedDomain === 'all' || p.domainId === selectedDomain;
      const matchDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.domainName.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.techStack.toLowerCase().includes(q) ||
        p.demonstrate.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchDomain && matchDifficulty && matchSearch;
    });
  }, [selectedDomain, selectedDifficulty, searchQuery]);

  const difficultyCounts = useMemo(() => {
    const counts = { all: INDUSTRY_PROJECTS.length, LOW: 0, MEDIUM: 0, HIGH: 0 };
    INDUSTRY_PROJECTS.forEach((p) => {
      if (counts[p.difficulty] !== undefined) counts[p.difficulty]++;
    });
    return counts;
  }, []);

  const activeDomainObj = useMemo(() => {
    return PROJECT_DOMAINS.find((d) => d.id === selectedDomain) || PROJECT_DOMAINS[0];
  }, [selectedDomain]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Ultra-Luxurious Royal Gradient Academic Hero Banner */}
      <div
        className="hero-banner"
        style={{
          background: 'var(--navy-hero-gradient)',
          border: '1px solid rgba(170, 192, 225, 0.3)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
          borderRadius: '22px',
          padding: '2.5rem 2.25rem',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '960px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(170, 192, 225, 0.35)',
              padding: '0.4rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={16} style={{ color: 'var(--aegean-200)' }} />
            <span>CSE INDUSTRY PROJECT MASTER GUIDE • 60 Curated Projects • 12 Fields • Low / Med / High</span>
          </div>

          <h1 className="hero-title" style={{ color: '#ffffff', letterSpacing: '-0.03em', fontSize: '2.3rem', marginBottom: '0.85rem' }}>
            Real-World Problems • <span>Industry Technologies</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'var(--aegean-100)', fontSize: '1.05rem', lineHeight: 1.65, margin: 0 }}>
            Curated project bank spanning 12 disciplines from first year fundamentals to enterprise multi-agent AI, cloud-native DevOps, and scalable distributed systems.
          </p>

          {/* Quick Metrics Badges */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1rem', borderRadius: '12px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Code size={16} style={{ color: 'var(--aegean-300)' }} /> <strong>60</strong> Real-World Project Blueprints
            </div>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1rem', borderRadius: '12px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Layers size={16} style={{ color: '#ffffff' }} /> <strong>12</strong> Core Industry Disciplines
            </div>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1rem', borderRadius: '12px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Zap size={16} style={{ color: 'var(--aegean-300)' }} /> <strong>3</strong> Difficulty Tiers (Low • Med • High)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Sub-Tabs */}
      <div className="roadmap-view-tabs">
        {[
          { id: 'bank', label: `Project Bank (${filteredProjects.length}/60)`, icon: Code },
          { id: 'difficulty', label: 'Architecture & Difficulty Guide', icon: Layers },
          { id: 'roadmap', label: '4-Year Career Progression & Portfolio Formula', icon: Compass },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`roadmap-view-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SUB-TAB 1: 60-PROJECT MASTER BANK WITH 12 DOMAIN FILTERS
          ======================================================== */}
      {activeSubTab === 'bank' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* 12 Domain Filter Scrollable Horizontal Pills */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Select Industry Discipline (12 Fields):
              </span>
              <span style={{ fontSize: '0.8rem', color: '#6441a5', fontWeight: 600 }}>
                {activeDomainObj.name} ({activeDomainObj.count} Projects)
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.65rem',
              }}
            >
              {PROJECT_DOMAINS.map((dom) => {
                const Icon = iconMap[dom.icon] || Code;
                const isSelected = selectedDomain === dom.id;

                return (
                  <button
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      border: isSelected ? '1px solid #6441a5' : '1px solid var(--border-color)',
                      background: isSelected ? '#6441a5' : 'var(--bg-secondary)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      boxShadow: isSelected ? '0 4px 12px rgba(100, 65, 165, 0.3)' : 'none',
                    }}
                  >
                    <Icon size={15} style={{ color: isSelected ? '#ffffff' : dom.color }} />
                    <span>{dom.name}</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        background: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {dom.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Domain Context Banner (Industry Tech Stack Banner) */}
          {activeDomainObj.industryStack && (
            <div
              style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                border: '1px solid #d8b4fe',
                borderRadius: 'var(--radius-lg)',
                padding: '1.15rem 1.35rem',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Badge variant="primary">
                    Standard Industry Tech Stack
                  </Badge>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                    {activeDomainObj.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  🛠️ {activeDomainObj.industryStack}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                  {activeDomainObj.description}
                </div>
              </div>
            </div>
          )}

          {/* Search and Difficulty Filter Controls */}
          <div className="filter-bar" style={{ gap: '0.85rem' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <Input
                placeholder="Search project title, real-world problem, tech (Docker, Kafka, React, PyTorch)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
            </div>

            {/* Difficulty Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
                Difficulty:
              </span>
              {[
                { id: 'all', label: `All (${difficultyCounts.all})`, color: '#6441a5' },
                { id: 'LOW', label: `🟢 Low (${difficultyCounts.LOW})`, color: '#10b981' },
                { id: 'MEDIUM', label: `🟡 Medium (${difficultyCounts.MEDIUM})`, color: '#f59e0b' },
                { id: 'HIGH', label: `🔴 High (${difficultyCounts.HIGH})`, color: '#ef4444' },
              ].map((df) => (
                <button
                  key={df.id}
                  className={`filter-btn ${selectedDifficulty === df.id ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(df.id)}
                  style={{
                    background: selectedDifficulty === df.id ? df.color : 'var(--bg-tertiary)',
                    color: selectedDifficulty === df.id ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: selectedDifficulty === df.id ? df.color : 'var(--border-color)',
                  }}
                >
                  {df.label}
                </button>
              ))}

              {(searchQuery || selectedDomain !== 'all' || selectedDifficulty !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDomain('all');
                    setSelectedDifficulty('all');
                  }}
                  style={{ color: '#6441a5', marginLeft: '0.25rem' }}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results Counter Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>
              Showing <strong>{filteredProjects.length}</strong> of 60 Industry Projects
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              📋 Click "Copy Resume Bullet" on any card to export ATS bullet points
            </span>
          </div>

          {/* Projects Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3.5rem 1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Search size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                No projects matched your criteria
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
                Try adjusting your search query or selecting "All Fields" and "All Difficulties".
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDomain('all');
                  setSelectedDifficulty('all');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="cards-grid-3">
              {filteredProjects.map((project) => {
                const isExpanded = !!expandedProjects[project.id];
                const isSaved = !!bookmarkedProjects[project.id];
                const isCopied = copiedId === project.id;

                const diffBorder =
                  project.difficulty === 'LOW'
                    ? 'var(--color-success)'
                    : project.difficulty === 'MEDIUM'
                    ? 'var(--color-warning)'
                    : 'var(--color-danger)';

                const diffBg =
                  project.difficulty === 'LOW'
                    ? 'var(--color-success-bg)'
                    : project.difficulty === 'MEDIUM'
                    ? 'var(--color-warning-bg)'
                    : 'var(--color-danger-bg)';

                const diffColor =
                  project.difficulty === 'LOW'
                    ? 'var(--color-success)'
                    : project.difficulty === 'MEDIUM'
                    ? 'var(--color-warning)'
                    : 'var(--color-danger)';

                return (
                  <Card
                    key={project.id}
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.9rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderTop: `4px solid ${diffBorder}`,
                      borderRadius: 'var(--radius-lg)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Header: Domain, Difficulty, Year Fit, Bookmark */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Badge variant="primary" style={{ background: 'var(--bg-tertiary)', color: 'var(--primary-800)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                          {project.domainName}
                        </Badge>
                        <Badge
                          variant="neutral"
                          style={{
                            background: diffBg,
                            color: diffColor,
                            borderColor: diffBorder,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        >
                          {project.difficulty === 'LOW' ? '🟢 LOW' : project.difficulty === 'MEDIUM' ? '🟡 MEDIUM' : '🔴 HIGH'}
                        </Badge>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          ({project.yearFit})
                        </span>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(project.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: isSaved ? 'var(--primary-800)' : 'var(--text-muted)',
                          padding: '4px',
                        }}
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark Project'}
                      >
                        <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        lineHeight: 1.35,
                        margin: '0',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Real-World Problem Box */}
                    <div
                      style={{
                        background: 'var(--bg-tertiary)',
                        borderLeft: '3px solid var(--primary-800)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '0 6px 6px 0',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>
                        🎯 Real-World Problem:
                      </strong>
                      {project.problem}
                    </div>

                    {/* Suggested Technology */}
                    <div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                        Suggested Technology:
                      </span>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600, background: 'var(--bg-primary)', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        🛠️ {project.techStack}
                      </div>
                    </div>

                    {/* What You Demonstrate Summary */}
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>What You Demonstrate:</strong> {project.demonstrate}
                    </div>

                    {/* Expandable Architecture & Scope Deep Dive Drawer */}
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px dashed var(--border-color)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem',
                        }}
                      >
                        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
                          <strong style={{ fontSize: '0.8rem', color: 'var(--primary-800)', display: 'block', marginBottom: '0.2rem' }}>
                            📐 Suggested Implementation Scope:
                          </strong>
                          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            {project.scope}
                          </p>
                        </div>

                        {/* Skill Tags */}
                        {project.tags && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontSize: '0.725rem',
                                  color: 'var(--text-muted)',
                                  background: 'var(--bg-tertiary)',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                }}
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer Actions: Expand Specs + Copy Resume Bullet */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        onClick={() => toggleExpand(project.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-800)',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: 0,
                        }}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp size={14} /> Hide Scope
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} /> Full Scope & Specs
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => copyResumeBullet(project)}
                        style={{
                          background: isCopied ? '#ecfdf5' : 'var(--bg-tertiary)',
                          border: isCopied ? '1px solid #10b981' : '1px solid var(--border-color)',
                          color: isCopied ? '#059669' : 'var(--text-secondary)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.35rem 0.7rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          transition: 'all 0.15s ease',
                        }}
                        title="Copy formatted ATS resume bullet point"
                      >
                        {isCopied ? <Check size={13} /> : <Copy size={13} />}
                        <span>{isCopied ? 'Copied Bullet!' : 'Copy Resume Bullet'}</span>
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: ARCHITECTURE & DIFFICULTY GUIDE (LOW / MED / HIGH)
          ======================================================== */}
      {activeSubTab === 'difficulty' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Engineering Standards</Badge>
              <Badge variant="neutral">Tier-1 Expectations</Badge>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              How to Read and Execute Project Difficulties
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Each difficulty tier defines expected development timelines, architectural depth, security controls, and deliverables.
            </p>
          </div>

          {/* 3 Difficulty Tier Cards */}
          <div className="cards-grid-3">
            {DIFFICULTY_SPECS.map((spec) => (
              <Card
                key={spec.level}
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderTop: `5px solid ${spec.color}`,
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div>
                  <Badge
                    variant="neutral"
                    style={{
                      borderColor: spec.color,
                      color: spec.color,
                      fontWeight: 800,
                      marginBottom: '0.5rem',
                      fontSize: '0.85rem',
                    }}
                  >
                    {spec.badgeText}
                  </Badge>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ⏱️ Typical Duration: <strong>{spec.timeframe}</strong> • {spec.techCount}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {spec.summary}
                </p>

                <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginTop: 'auto' }}>
                  <strong style={{ fontSize: '0.825rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
                    ✅ Required Scope Deliverables:
                  </strong>
                  <ul style={{ paddingLeft: '1.15rem', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {spec.scopeChecklist.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDifficulty(spec.level);
                    setActiveSubTab('bank');
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                  style={{ width: '100%', borderColor: spec.color, color: spec.color }}
                >
                  View {spec.level} Projects ({difficultyCounts[spec.level]})
                </Button>
              </Card>
            ))}
          </div>

          {/* Technology Selection Rules Box */}
          <div className="topic-section-card" style={{ borderLeft: '5px solid var(--primary-800)' }}>
            <div className="topic-section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="topic-badge-icon" style={{ background: 'var(--primary-600)', color: '#ffffff' }}>
                  <Code size={20} />
                </div>
                <div>
                  <Badge variant="primary" style={{ marginBottom: '2px' }}>
                    Industry Golden Rule
                  </Badge>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Technology Selection Rule
                  </h3>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.75rem' }}>
              <strong>Do not try to use every language in one project.</strong> Choose the language that fits the problem naturally. Industry-oriented project combinations include:
            </p>

            <div className="roadmap-table-wrap" style={{ marginTop: '1rem' }}>
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Language / Stack</th>
                    <th style={{ width: '45%' }}>Ideal Problem Fit</th>
                    <th style={{ width: '30%' }}>Standard Ecosystem</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { lang: 'C / C++', fit: 'Systems programming, DSA visualizers, IoT firmware, OS concepts', stack: 'GCC, Make, CMake, POSIX, Arduino/ESP-IDF' },
                    { lang: 'Java / Kotlin', fit: 'Enterprise software, OOP architecture, high-scale backend APIs', stack: 'Spring Boot, JUnit, Hibernate, Maven/Gradle' },
                    { lang: 'Python', fit: 'AI / ML, LLMs & GenAI, data science, automation, rapid prototyping', stack: 'FastAPI, PyTorch, pandas, scikit-learn, LangChain' },
                    { lang: 'JavaScript / TypeScript', fit: 'Modern web frontends, full-stack applications, real-time WebSockets', stack: 'React, Next.js, Node.js, NestJS, Tailwind' },
                    { lang: 'SQL', fit: 'Relational database modeling, complex joins, financial data consistency', stack: 'PostgreSQL, MySQL, indexing, transactions' },
                    { lang: 'Go / Rust', fit: 'High-throughput microservices, API gateways, low-latency concurrent tools', stack: 'Go Goroutines, Gin, Tokio, Actix, Docker' },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td><strong style={{ color: 'var(--primary-800)', fontSize: '0.95rem' }}>{row.lang}</strong></td>
                      <td style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{row.fit}</td>
                      <td style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{row.stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: 4-YEAR CAREER PROGRESSION & PORTFOLIO FORMULA
          ======================================================== */}
      {activeSubTab === 'roadmap' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Career Strategy</Badge>
              <Badge variant="neutral">FY → SY → TY → Final</Badge>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              How to Build Projects for Your CSE Career
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Align your development work with your semester progression to build a standout portfolio for internships and campus placements.
            </p>
          </div>

          {/* 4-Year Progression Cards Grid */}
          <div className="cards-grid-4">
            {CAREER_PROGRESSION_RULES.map((rule, idx) => (
              <Card
                key={idx}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="primary" style={{ background: rule.badgeColor, color: '#ffffff' }}>
                    {rule.stage}
                  </Badge>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {rule.targetCount}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {rule.year}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600, margin: 0 }}>
                  {rule.recommendation}
                </p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, marginTop: 'auto' }}>
                  {rule.focus}
                </p>
              </Card>
            ))}
          </div>

          {/* The Winning Portfolio Formula Section */}
          <Card
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #0b1a37 0%, #172554 60%, #1e3a8a 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={20} style={{ color: 'var(--aegean-200)' }} />
              <Badge variant="neutral" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
                Portfolio Blueprint
              </Badge>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              {PORTFOLIO_FORMULA.title}
            </h3>
            <p style={{ color: 'var(--aegean-100)', fontSize: '0.925rem', lineHeight: 1.55, maxWidth: '750px', marginBottom: '1.5rem' }}>
              Do not clutter your resume with 15 superficial todo apps. Recruiters and technical interviewers look for balanced progression, deep technical ownership, and live deployment.
            </p>

            {/* Formula Equation Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              {PORTFOLIO_FORMULA.formulaItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60a5fa' }}>
                    {item.count}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: '0.2rem 0' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--aegean-100)', lineHeight: 1.4 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Proof Artifacts Checklist */}
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.65rem' }}>
                📦 Required Proof Deliverables for Every Major Project:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
                {PORTFOLIO_FORMULA.deliverables.map((del, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#f8fafc' }}>
                    <CheckCircle2 size={16} style={{ color: '#38bdf8', flexShrink: 0 }} /> {del}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Resume & Interview Presentation Advice */}
          <div className="topic-section-card">
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Resume Presentation & Interview Truthfulness
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  1. How to Structure Project Bullets
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Show the <strong>problem</strong>, <strong>measurable functionality</strong>, <strong>technology stack</strong>, <strong>your individual contribution</strong>, and links to the <strong>GitHub repository and live demo</strong>—never just the project title.
                </p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  2. Honest Metrics & Vocabulary
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Do not claim real-world production scale unless you actually measured it in production. Use professional, accurate phrases such as <em>'prototype'</em>, <em>'functional demo'</em>, <em>'lab environment'</em> or <em>'pilot'</em> where appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryProjectsMasterGuide;
