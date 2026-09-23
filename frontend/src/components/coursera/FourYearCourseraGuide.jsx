import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  ExternalLink,
  Sparkles,
  Award,
  CheckCircle2,
  BookOpen,
  Layers,
  Cpu,
  Code,
  Brain,
  Server,
  Shield,
  Briefcase,
  Copy,
  Check,
  Compass,
  ArrowRight,
  Filter,
  Lightbulb,
  FileText,
  Star,
  Clock,
  Info,
  ChevronRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  COURSERA_COURSES,
  COURSERA_TRACKS,
  RESUME_SHORTLIST,
  ROLE_BASED_PATHS,
  RESUME_BEST_PRACTICES,
} from './courseraData';

export const FourYearCourseraGuide = () => {
  // Navigation sub-view inside Coursera guide:
  // 'courses' | 'shortlist' | 'paths' | 'strategy'
  const [guideSubTab, setGuideSubTab] = useState('courses');

  // Filters for courses
  const [selectedYear, setSelectedYear] = useState('ALL'); // 'ALL' | 'FY' | 'SY' | 'TY' | 'Final'
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedProvider, setSelectedProvider] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Copied citation state
  const [copiedId, setCopiedId] = useState(null);

  // Local bookmarks state for Coursera guide
  const [bookmarkedCourses, setBookmarkedCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('vidyapath_coursera_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleBookmark = (id) => {
    setBookmarkedCourses((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('vidyapath_coursera_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const copyResumeCitation = (course) => {
    const citation = `${course.title} — ${course.provider} (${course.yearLabel}) | Credential: ${course.courseUrl}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(course.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const providersList = useMemo(() => {
    const set = new Set();
    COURSERA_COURSES.forEach((c) => {
      // normalize compound providers like "DeepLearning.AI + Stanford Online"
      if (c.provider.includes('+')) {
        c.provider.split('+').forEach((p) => set.add(p.trim()));
      } else {
        set.add(c.provider);
      }
    });
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return COURSERA_COURSES.filter((course) => {
      const matchYear = selectedYear === 'ALL' || course.year === selectedYear;
      const matchTrack = selectedTrack === 'ALL' || course.track === selectedTrack;
      const matchProvider =
        selectedProvider === 'ALL' ||
        course.provider.toLowerCase().includes(selectedProvider.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.subject.toLowerCase().includes(q) ||
        course.provider.toLowerCase().includes(q) ||
        course.whyUseful.toLowerCase().includes(q) ||
        course.keySkills.some((s) => s.toLowerCase().includes(q));

      return matchYear && matchTrack && matchProvider && matchSearch;
    });
  }, [selectedYear, selectedTrack, selectedProvider, searchQuery]);

  const yearCounts = useMemo(() => {
    const counts = { ALL: COURSERA_COURSES.length, FY: 0, SY: 0, TY: 0, Final: 0 };
    COURSERA_COURSES.forEach((c) => {
      if (counts[c.year] !== undefined) counts[c.year]++;
    });
    return counts;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Luxurious Hero & Header Banner */}
      <div
        className="hero-banner"
        style={{
          background: 'var(--navy-hero-gradient)',
          border: '1px solid rgba(170, 192, 225, 0.3)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
          borderRadius: '20px',
          padding: '2.25rem 2rem',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '920px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <GraduationCap size={16} style={{ color: 'var(--aegean-200)' }} />
            <span>CSE 4-YEAR COURSERA CERTIFICATE GUIDE • Resume-Friendly Courses • Subject-wise</span>
          </div>

          <h1 className="hero-title" style={{ color: '#ffffff', letterSpacing: '-0.03em', fontSize: '2.2rem', marginBottom: '0.75rem' }}>
            Curated <span>Coursera Certification Roadmap</span> for CSE Students
          </h1>
          <p className="hero-subtitle" style={{ color: 'var(--aegean-100)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Maps Coursera learning options from top institutions (Stanford, Meta, Google, IBM, Princeton, DeepLearning.AI) directly to the 4-year CSE subjects and technical domains.
          </p>

          {/* Stat Badges Grid */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 0.9rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={15} style={{ color: 'var(--aegean-300)' }} /> <strong>35</strong> Verified Courses & Specializations
            </div>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 0.9rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={15} style={{ color: '#ffffff' }} /> <strong>6</strong> Targeted Career Tracks (FY → Final)
            </div>
            <div style={{ background: 'rgba(5, 18, 52, 0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 0.9rem', borderRadius: '10px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={15} style={{ color: 'var(--aegean-300)' }} /> <strong>7</strong> Resume-Shortlist Power Picks
            </div>
          </div>

          {/* Academic Note */}
          <div
            style={{
              background: 'rgba(5, 18, 52, 0.4)',
              border: '1px solid rgba(170, 192, 225, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Info size={20} style={{ color: 'var(--aegean-200)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.55 }}>
              <strong style={{ color: '#ffffff' }}>Complementary Certification Plan:</strong> University subject names and semesters vary across colleges. Use this guide as a high-impact complementary portfolio and interview credential plan—not as a replacement for your official university syllabus.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Sub-Tabs */}
      <div className="roadmap-view-tabs">
        {[
          { id: 'courses', label: `Course Catalog (${filteredCourses.length}/35)`, icon: BookOpen },
          { id: 'priority', label: 'Track Priority Matrix', icon: Layers },
          { id: 'shortlist', label: 'Resume Shortlist (Top 7)', icon: Award },
          { id: 'paths', label: 'Role-Based Paths (5 Tracks)', icon: Compass },
          { id: 'strategy', label: 'How to Use & Resume Guide', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = guideSubTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`roadmap-view-tab ${isActive ? 'active' : ''}`}
              onClick={() => setGuideSubTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SUB-TAB 1: COMPLETE 35-COURSE CATALOG WITH FILTERS & SEARCH
          ======================================================== */}
      {guideSubTab === 'courses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Year Filter Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              flexWrap: 'wrap',
              padding: '1rem 1.25rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Filter by Stage / Year:
            </span>
            {[
              { id: 'ALL', label: `All Years (${yearCounts.ALL})` },
              { id: 'FY', label: `1st Year / FY (${yearCounts.FY})` },
              { id: 'SY', label: `2nd Year / SY (${yearCounts.SY})` },
              { id: 'TY', label: `3rd Year / TY (${yearCounts.TY})` },
              { id: 'Final', label: `4th Year / Final (${yearCounts.Final})` },
            ].map((y) => (
              <button
                key={y.id}
                className={`filter-btn ${selectedYear === y.id ? 'active' : ''}`}
                onClick={() => setSelectedYear(y.id)}
                style={{
                  background: selectedYear === y.id ? '#0056b3' : 'var(--bg-tertiary)',
                  color: selectedYear === y.id ? '#ffffff' : 'var(--text-secondary)',
                  borderColor: selectedYear === y.id ? '#0056b3' : 'var(--border-color)',
                }}
              >
                {y.label}
              </button>
            ))}
          </div>

          {/* Search and Provider / Track Filter Bar */}
          <div className="filter-bar" style={{ gap: '0.85rem' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <Input
                placeholder="Search course title, skill (Python, React, ML), provider (Google, IBM, Meta)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
            </div>

            {/* Track Dropdown Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Track:
              </span>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {COURSERA_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              {/* Provider Dropdown Filter */}
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                Provider:
              </span>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {providersList.map((p) => (
                  <option key={p} value={p}>
                    {p === 'ALL' ? 'All Providers' : p}
                  </option>
                ))}
              </select>

              {(searchQuery || selectedYear !== 'ALL' || selectedTrack !== 'ALL' || selectedProvider !== 'ALL') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('ALL');
                    setSelectedTrack('ALL');
                    setSelectedProvider('ALL');
                  }}
                  style={{ color: '#0056b3', marginLeft: '0.25rem' }}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>
              Showing <strong>{filteredCourses.length}</strong> of {COURSERA_COURSES.length} courses
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              ⚡ Each course includes a direct link + Coursera fallback search
            </span>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Search size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                No courses match your filter
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.25rem' }}>
                Try adjusting your search keyword or clearing the year/track filters.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('ALL');
                  setSelectedTrack('ALL');
                  setSelectedProvider('ALL');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="cards-grid-3">
              {filteredCourses.map((course) => {
                const isSaved = !!bookmarkedCourses[course.id];
                const isCopied = copiedId === course.id;

                return (
                  <Card
                    key={course.id}
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Top Meta Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span
                          style={{
                            background: '#0056b3',
                            color: '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                          }}
                        >
                          #{course.id}
                        </span>
                        <Badge
                          variant="primary"
                          style={{
                            background:
                              course.year === 'FY'
                                ? '#eff6ff'
                                : course.year === 'SY'
                                ? '#f3e8ff'
                                : course.year === 'TY'
                                ? '#ecfdf5'
                                : '#fff7ed',
                            color:
                              course.year === 'FY'
                                ? '#1d4ed8'
                                : course.year === 'SY'
                                ? '#6d28d9'
                                : course.year === 'TY'
                                ? '#047857'
                                : '#c2410c',
                            fontWeight: 700,
                          }}
                        >
                          {course.yearLabel}
                        </Badge>
                        <Badge variant="neutral" style={{ fontSize: '0.75rem' }}>
                          {course.subject}
                        </Badge>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        onClick={() => toggleBookmark(course.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: isSaved ? '#0056b3' : 'var(--text-muted)',
                          padding: '4px',
                        }}
                        title={isSaved ? 'Remove from saved' : 'Save course'}
                      >
                        <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Provider & Title */}
                    <div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#0056b3',
                          marginBottom: '0.35rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <GraduationCap size={14} /> Provider: {course.provider}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1.35,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {course.title}
                      </h3>

                      {/* Why it is useful callout */}
                      <div
                        style={{
                          background: 'var(--bg-tertiary)',
                          borderLeft: '3px solid #0056b3',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0 6px 6px 0',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                        }}
                      >
                        <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>
                          💡 Why it is useful:
                        </strong>
                        {course.whyUseful}
                      </div>
                    </div>

                    {/* Key Skills Tags */}
                    {course.keySkills && course.keySkills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {course.keySkills.map((sk) => (
                          <span
                            key={sk}
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)',
                              background: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              fontWeight: 600,
                            }}
                          >
                            • {sk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer: Hours / Level + Dual Links + Citation copy */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={13} /> {course.estimatedHours}
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {course.level}
                        </span>
                      </div>

                      {/* Dual Action Buttons: Open Course & Search Fallback */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <a
                          href={course.courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ flex: 1, minWidth: '140px', textDecoration: 'none' }}
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            style={{ width: '100%', background: '#0056b3', borderColor: '#0056b3' }}
                            icon={ExternalLink}
                            iconPosition="right"
                          >
                            Open Coursera
                          </Button>
                        </a>

                        <a
                          href={course.searchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                          title="Coursera Search Fallback"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                            icon={Search}
                          >
                            Search
                          </Button>
                        </a>

                        <button
                          onClick={() => copyResumeCitation(course)}
                          style={{
                            background: isCopied ? '#ecfdf5' : 'var(--bg-tertiary)',
                            border: isCopied ? '1px solid #10b981' : '1px solid var(--border-color)',
                            color: isCopied ? '#059669' : 'var(--text-secondary)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0 0.6rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            gap: '0.25rem',
                          }}
                          title="Copy citation for Resume"
                        >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          <span style={{ display: 'none' }}>Copy</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: RECOMMENDED COURSE PRIORITY BY TRACK
          ======================================================== */}
      {guideSubTab === 'priority' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff' }}>Track Progression</Badge>
              <Badge variant="neutral">6 Strategic Tracks</Badge>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              Recommended Course Priority by Track
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Structure your online certifications so that they complement your college coursework at the right semester and technical stage.
            </p>
          </div>

          {/* Priority Table verbatim */}
          <div className="roadmap-table-wrap">
            <table className="roadmap-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Track</th>
                  <th style={{ width: '50%' }}>Main Skills</th>
                  <th style={{ width: '28%' }}>Suggested Stage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    track: 'Core CSE Foundation',
                    skills: 'Programming, DSA, DBMS, OS, Networks, Git',
                    stage: 'FY–SY',
                    tag: 'Fundamental',
                    badgeBg: '#eff6ff',
                    badgeColor: '#1d4ed8',
                  },
                  {
                    track: 'Software Development',
                    skills: 'Full Stack, Front-End, Back-End, Java, SQL',
                    stage: 'SY–TY',
                    tag: 'Industry Dev',
                    badgeBg: '#f3e8ff',
                    badgeColor: '#6d28d9',
                  },
                  {
                    track: 'AI / Data',
                    skills: 'Python, Data Science, ML, Deep Learning',
                    stage: 'TY–Final',
                    tag: 'High Growth',
                    badgeBg: '#ecfdf5',
                    badgeColor: '#047857',
                  },
                  {
                    track: 'Cloud / DevOps',
                    skills: 'Cloud, Docker, Kubernetes, CI/CD',
                    stage: 'TY–Final',
                    tag: 'Infrastructure',
                    badgeBg: '#fff7ed',
                    badgeColor: '#c2410c',
                  },
                  {
                    track: 'Cybersecurity',
                    skills: 'Networking, security fundamentals, SOC/web security',
                    stage: 'TY–Final',
                    tag: 'Security Track',
                    badgeBg: '#fef2f2',
                    badgeColor: '#b91c1c',
                  },
                  {
                    track: 'Career / Engineering',
                    skills: 'Software architecture, system design, project management',
                    stage: 'Final',
                    tag: 'Placement / SDE',
                    badgeBg: '#f8fafc',
                    badgeColor: '#334155',
                  },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong style={{ color: '#0056b3', fontSize: '1rem' }}>{row.track}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {row.tag}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{row.skills}</td>
                    <td>
                      <Badge
                        variant="neutral"
                        style={{
                          background: row.badgeBg,
                          color: row.badgeColor,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          padding: '0.35rem 0.75rem',
                        }}
                      >
                        {row.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Track Cards */}
          <div className="cards-grid-3">
            {COURSERA_TRACKS.filter((t) => t.id !== 'ALL').map((track) => (
              <Card
                key={track.id}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="primary" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                    {track.stage}
                  </Badge>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Track
                  </span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {track.name}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {track.description}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <strong>Core Skills:</strong> {track.skills}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTrack(track.id);
                    setGuideSubTab('courses');
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                  style={{ width: '100%', marginTop: '0.25rem' }}
                >
                  View Track Courses
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: RECOMMENDED CERTIFICATE SHORTLIST FOR YOUR RESUME
          ======================================================== */}
      {guideSubTab === 'shortlist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff' }}>Focused Stack</Badge>
              <Badge variant="neutral">7 High-Yield Picks</Badge>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              Recommended Certificate Shortlist for Your Resume
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              If you do not want to complete dozens of certificates, use this focused stack. The exact selection should match the job role you are targeting; certificates should support projects rather than replace them.
            </p>
          </div>

          {/* Shortlist Table */}
          <div className="roadmap-table-wrap">
            <table className="roadmap-table">
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>#</th>
                  <th style={{ width: '34%' }}>Course</th>
                  <th style={{ width: '22%' }}>Skill</th>
                  <th style={{ width: '36%' }}>Resume Purpose</th>
                </tr>
              </thead>
              <tbody>
                {RESUME_SHORTLIST.map((item) => (
                  <tr key={item.rank}>
                    <td>
                      <span
                        style={{
                          background: '#0056b3',
                          color: '#ffffff',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                        }}
                      >
                        {item.rank}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#0056b3', fontSize: '0.95rem', display: 'block' }}>
                        {item.course}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Provider: {item.provider}
                      </span>
                    </td>
                    <td>
                      <Badge variant="neutral" style={{ background: '#f0f9ff', color: '#0369a1', fontWeight: 600 }}>
                        {item.skill}
                      </Badge>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {item.resumePurpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shortlist Interactive Action Cards */}
          <div className="cards-grid-3">
            {RESUME_SHORTLIST.map((item) => (
              <Card
                key={item.rank}
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
                  <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff' }}>
                    Rank #{item.rank}
                  </Badge>
                  <Badge variant="neutral">{item.tag}</Badge>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {item.course}
                </h4>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  🏛️ {item.provider}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Resume Purpose:</strong> {item.resumePurpose}
                </p>
                <a
                  href={item.courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', marginTop: 'auto', paddingTop: '0.5rem' }}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ width: '100%', background: '#0056b3', borderColor: '#0056b3' }}
                    icon={ExternalLink}
                    iconPosition="right"
                  >
                    Open Certificate Course
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: ROLE-BASED CERTIFICATE PATHS
          ======================================================== */}
      {guideSubTab === 'paths' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff' }}>Role Specializations</Badge>
              <Badge variant="neutral">5 Career Tracks</Badge>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              Role-Based Certificate Paths
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Follow a clear step-by-step certificate sequence designed specifically for your target career role.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ROLE_BASED_PATHS.map((rolePath, idx) => (
              <Card
                key={idx}
                style={{
                  padding: '1.75rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderLeft: `5px solid ${rolePath.accentColor}`,
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                      {rolePath.role}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                      {rolePath.description}
                    </p>
                  </div>
                  <Badge variant="neutral" style={{ background: 'var(--bg-tertiary)', fontWeight: 600 }}>
                    {rolePath.steps.length} Milestones
                  </Badge>
                </div>

                {/* Step Flow Ribbon */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {rolePath.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: rolePath.accentColor,
                            textTransform: 'uppercase',
                          }}
                        >
                          Step {sIdx + 1} • {step.year}
                        </span>
                        <CheckCircle2 size={14} style={{ color: rolePath.accentColor }} />
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {step.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {step.provider}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: HOW TO USE & RESUME BEST PRACTICES
          ======================================================== */}
      {guideSubTab === 'strategy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* How to Use This Certificate Plan */}
          <div className="topic-section-card">
            <div className="topic-section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="topic-badge-icon" style={{ background: '#0056b3', color: '#ffffff' }}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff', marginBottom: '2px' }}>
                    Strategy Guide
                  </Badge>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    How to Use This Certificate Plan
                  </h2>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {[
                {
                  title: '1. Quality Over Quantity',
                  desc: 'Do not collect certificates only for quantity. Finish the course, complete graded work/projects, and be able to explain what you built in interviews.',
                  icon: Award,
                },
                {
                  title: '2. Pair with GitHub Projects',
                  desc: 'For resume impact, combine a relevant certificate with a GitHub project and a deployed/demo project whenever possible.',
                  icon: Code,
                },
                {
                  title: '3. Choose Industry-Recognized Credentials',
                  desc: 'Prefer university/company professional certificates (Google, IBM, Meta, Stanford) or well-known specialization courses that directly match your target role.',
                  icon: GraduationCap,
                },
                {
                  title: '4. Verified Links & Search Fallback',
                  desc: 'Use the clickable Coursera links. If a course URL changes, the included Coursera search link will help you find the current live version instantly.',
                  icon: ExternalLink,
                },
                {
                  title: '5. The Winning Formula',
                  desc: 'Your best combination is: Core CSE + one development/AI specialization + projects + DSA/interview preparation.',
                  icon: Sparkles,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0056b3' }}>
                      <Icon size={18} />
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resume Usage Guidelines */}
          <div className="topic-section-card" style={{ borderLeft: '5px solid #0056b3' }}>
            <div className="topic-section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="topic-badge-icon" style={{ background: '#0056b3', color: '#ffffff' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <Badge variant="primary" style={{ background: '#0056b3', color: '#ffffff', marginBottom: '2px' }}>
                    ATS & Placement Tips
                  </Badge>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Resume Usage & Interview Guidelines
                  </h3>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              {RESUME_BEST_PRACTICES.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <CheckCircle2 size={18} style={{ color: '#0056b3', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      {rule.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Verification Note */}
          <div
            style={{
              background: 'var(--color-info-bg)',
              border: '1px solid var(--color-info)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <Info size={22} style={{ color: 'var(--color-info)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-info)', margin: '0 0 0.35rem 0' }}>
                Important Verification Note
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Coursera periodically updates course names, merges series, or modifies URLs for certificates and Professional Certificates. Therefore, this guide provides direct Coursera URLs alongside a 1-click fallback Coursera Search query for all 35 courses. Before enrolling, confirm the current course title, instructor, syllabus, and whether financial aid or shareable certificate verification is supported.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FourYearCourseraGuide;
