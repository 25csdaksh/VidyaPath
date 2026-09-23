import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Map,
  CheckCircle2,
  Circle,
  BookOpen,
  Code,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Compass,
  Cpu,
  Database,
  Globe,
  Shield,
  Server,
  Brain,
  Terminal,
  FolderGit2,
  Briefcase,
  GraduationCap,
  ListCheck,
  LayoutGrid,
  FileCheck,
  Target,
  Clock,
  ExternalLink,
  Laptop,
  Check,
  Lightbulb,
  Search,
  Filter,
  Flame,
  CheckSquare,
  Square,
  Zap,
  TrendingUp,
  Share2,
  Info,
  Calendar,
  CheckCheck,
  FileText,
  Workflow,
  Sparkle,
  Video,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import FourYearYouTubeGuide from '../components/youtube/FourYearYouTubeGuide';
import FourYearCourseraGuide from '../components/coursera/FourYearCourseraGuide';
import PersonalCareerRoadmap from '../components/roadmap/PersonalCareerRoadmap';
import roadmapService from '../services/roadmapService';
import dashboardService from '../services/dashboardService';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails } from '../utils/errorHandler';

export const RoadmapPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active top-level navigation view
  // 'guide' (Full 10 Sections Guide) | 'semesters' (Sem 1-8 Live DB Tracker) | 'languages' (Sec 6) | 'skillmatrix' (Sec 7) | 'readiness' (Sec 8) | 'careers' | 'portalstructure' (Sec 9)
  const [activeView, setActiveView] = useState('guide');

  // Sub-year filter for Master Guide
  const [guideYearFilter, setGuideYearFilter] = useState('ALL'); // 'ALL' | 'FY' | 'SY' | 'TY' | 'FINAL'

  // Selected Semester for DB live tracker
  const initialSem = parseInt(searchParams.get('sem') || '1', 10);
  const [selectedSem, setSelectedSem] = useState(initialSem >= 1 && initialSem <= 8 ? initialSem : 1);

  const [roadmapData, setRoadmapData] = useState(null);
  const [items, setItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  // Local state for Graduation Readiness checklist (Sec 8)
  const [checkedReadiness, setCheckedReadiness] = useState(() => {
    try {
      const saved = localStorage.getItem('vidyapath_grad_readiness');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const { completedItemIds, toggleMilestone } = useRoadmapProgress(roadmapData?._id, selectedSem);

  const semesters = [
    { sem: 1, year: 'FY', label: 'Sem 1 • Fundamentals & C' },
    { sem: 2, year: 'FY', label: 'Sem 2 • DSA Intro & Web Basics' },
    { sem: 3, year: 'SY', label: 'Sem 3 • Advanced DSA & OOP' },
    { sem: 4, year: 'SY', label: 'Sem 4 • OS & Relational DBMS' },
    { sem: 5, year: 'TY', label: 'Sem 5 • Networks & Full Stack' },
    { sem: 6, year: 'TY', label: 'Sem 6 • Cloud, AI & Internships' },
    { sem: 7, year: 'FINAL', label: 'Sem 7 • AI/ML & Major Project I' },
    { sem: 8, year: 'FINAL', label: 'Sem 8 • Capstone & Placements' },
  ];

  // Fetch Semester Roadmap from backend for Live Tracker
  const fetchRoadmap = useCallback(async (sem) => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await roadmapService.getRoadmapBySemester(sem);
      const data = res.data || res;
      const rm = data.roadmap || data;
      setRoadmapData(rm);
      setItems(data.items || []);

      if (isAuthenticated && rm?._id) {
        dashboardService
          .recordRecentView({
            resourceType: 'Roadmap',
            resourceId: rm._id,
            title: rm.title || `Semester ${sem} Roadmap`,
            category: `Semester ${sem}`,
            url: `/roadmap?sem=${sem}`,
          })
          .catch(() => {});
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchRoadmap(selectedSem);
  }, [selectedSem, fetchRoadmap]);

  const handleSemesterChange = (sem) => {
    setSelectedSem(sem);
    setSearchParams({ sem });
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const toggleReadinessItem = (id) => {
    setCheckedReadiness((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('vidyapath_grad_readiness', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Section 8: Graduation Criteria List (Verbatim from prompt)
  const graduationCriteria = [
    {
      id: 'g1',
      title: 'Strong Programming Fundamentals',
      desc: 'Strong programming fundamentals in at least one main language (C++, Java, or Python) with modular design.',
    },
    {
      id: 'g2',
      title: 'Comfort with DSA and Problem Solving',
      desc: 'Comfort with Arrays, LinkedLists, Stacks, Queues, Trees, Graphs, Hashing, Recursion, and Time/Space complexity.',
    },
    {
      id: 'g3',
      title: 'Working Knowledge of Core CSE',
      desc: 'Solid conceptual understanding of Object-Oriented Programming (OOP), DBMS (SQL/ACID), Operating Systems (OS), and Computer Networks (CN).',
    },
    {
      id: 'g4',
      title: 'Ability to Build & Deploy Real Projects',
      desc: 'Ability to architect, build, and deploy at least a few real-world applications with clean UI, backend APIs, and databases.',
    },
    {
      id: 'g5',
      title: 'Git/GitHub Collaboration Experience',
      desc: 'Comfortable with version control, commits, branching, pull requests, issue tracking, and team collaboration.',
    },
    {
      id: 'g6',
      title: 'Clear Technical Specialization',
      desc: 'A well-defined specialization or technical direction in Web, AI/ML, Cloud/DevOps, Cybersecurity, Data, or Systems.',
    },
    {
      id: 'g7',
      title: 'Practical Industry Exposure',
      desc: 'An internship, hackathon, open-source contribution, or meaningful real-world engineering project experience where possible.',
    },
    {
      id: 'g8',
      title: 'Professional Placement Assets',
      desc: 'A professional ATS-validated resume, technical portfolio, active GitHub/LinkedIn, and fluent project explanations for interviews.',
    },
  ];

  const readinessScore = Math.round(
    (Object.values(checkedReadiness).filter(Boolean).length / graduationCriteria.length) * 100
  );

  const progressPercentage =
    items.length > 0 ? Math.round((completedItemIds.length / items.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '3.5rem' }}>
      {/* 60:30:10 Design: Luxurious Santorini Navy & Aegean Academic Hero Banner */}
      <div
        className="hero-banner"
        style={{
          background: 'var(--navy-hero-gradient)',
          border: '1px solid rgba(170, 192, 225, 0.25)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(170, 192, 225, 0.3)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--aegean-200)',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Compass size={16} style={{ color: 'var(--aegean-300)' }} />
            <span>CSE – 4 YEAR ROADMAP • Subjects • Programming Languages • Skills • Projects • Career Path</span>
          </div>

          <h1 className="hero-title" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
            A Practical Guide for a <span>Computer Science & Engineering</span> Student
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Navigate the complete 4-year journey from programming fundamentals to core computer science, advanced technologies, internships, specializations, and final-year capstone engineering.
          </p>

          {/* Important Academic Note Banner */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(170, 192, 225, 0.25)',
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
            <div style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.5 }}>
              <strong style={{ color: '#ffffff' }}>Important Note:</strong> This document gives a detailed, practical overview of a typical 4-year CSE degree. Exact subjects, semester names, credits and programming languages vary by university and college. Use this as a roadmap for your student portal; the official syllabus of your university should be used for exact subject mapping.
            </div>
          </div>
        </div>
      </div>

      {/* Top Main Navigation Tabs */}
      <div className="roadmap-view-tabs">
        {[
          { id: 'guide', label: 'Complete 4-Year Master Guide', icon: BookOpen },
          { id: 'personal', label: 'Personal Career Roadmap (21 Secs)', icon: Compass },
          { id: 'coursera', label: '4-Year Coursera Guide', icon: GraduationCap },
          { id: 'youtube', label: '4-Year YouTube Video Guide', icon: Video },
          { id: 'semesters', label: 'Semester 1-8 Live DB Tracker', icon: Map },
          { id: 'languages', label: 'Languages: When & Why? (Sec 6)', icon: Code },
          { id: 'skillmatrix', label: '4-Year Skill Matrix (Sec 7)', icon: Workflow },
          { id: 'readiness', label: 'Graduation Readiness (Sec 8)', icon: Award },
          { id: 'careers', label: 'Career Paths & Specializations', icon: Target },
          { id: 'portalstructure', label: 'Portal Architecture (Sec 9)', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              className={`roadmap-view-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveView(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          VIEW 1: COMPLETE 4-YEAR MASTER GUIDE (SECTIONS 1 TO 5 & 10)
          ======================================================== */}
      {activeView === 'guide' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Quick Learning Guides Dual Jump Banners */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            {/* Coursera Certificate Guide Jump Banner */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--navy-hero-gradient)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    📜 Coursera Certificate Guide
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    35 resume-friendly courses (FY → Final), 6 tracks, resume shortlist & paths.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveView('coursera')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Open Guide
                </Button>
                <Link to="/courses">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ExternalLink}
                    iconPosition="right"
                  >
                    Courses Hub
                  </Button>
                </Link>
              </div>
            </div>

            {/* YouTube Learning Guide Jump Banner */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--navy-hero-gradient)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Video size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    📺 Subject-wise YouTube Lectures
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    38 subjects (FY → Final), top 20 creators & direct 1-click searches.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveView('youtube')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  YouTube Guide
                </Button>
                <Link to="/youtube">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ExternalLink}
                    iconPosition="right"
                  >
                    YouTube Hub
                  </Button>
                </Link>
              </div>
            </div>

            {/* Personal Career Roadmap Jump Banner */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--navy-hero-gradient)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Compass size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    🎯 Personal Career Roadmap
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Syllabus + Skills + Projects + 16-step execution + 30-day action sprint.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveView('personal')}
                  icon={ArrowRight}
                  iconPosition="right"
                  style={{ background: '#4338ca', borderColor: '#4338ca' }}
                >
                  Personal Roadmap
                </Button>
              </div>
            </div>
          </div>

          {/* Section 1: CSE at a Glance */}
          <div className="topic-section-card">
            <div className="topic-section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="topic-badge-icon"><Compass size={20} /></div>
                <div>
                  <Badge variant="primary" style={{ background: '#7c3aed', color: '#ffffff', marginBottom: '2px' }}>Section 1</Badge>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>1. CSE at a Glance</h2>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              CSE is not only about learning programming languages. During four years, a student normally moves from programming fundamentals to core computer science, then to advanced technologies, internships, specializations and a final-year project.
            </p>

            {/* Table: CSE at a Glance */}
            <div className="roadmap-table-wrap">
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Year</th>
                    <th style={{ width: '38%' }}>Main Focus</th>
                    <th style={{ width: '40%' }}>Typical Languages / Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: 'var(--primary-800)' }}>1st Year (FY)</strong></td>
                    <td>Programming + engineering fundamentals</td>
                    <td>C/C++, Python basics, HTML, CSS, JavaScript, Git</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--primary-800)' }}>2nd Year (SY)</strong></td>
                    <td>Core CSE subjects</td>
                    <td>C/C++, Java, SQL, Linux, Git</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--primary-800)' }}>3rd Year (TY)</strong></td>
                    <td>Advanced CSE + specialization</td>
                    <td>Python, Java/JS/TS, SQL, cloud/security tools</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: 'var(--primary-800)' }}>4th Year (Final)</strong></td>
                    <td>Industry + specialization + project</td>
                    <td>Depends on specialization; Git, cloud, APIs, frameworks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Guide Year Navigation Filter Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Jump to Year:</span>
            {[
              { id: 'ALL', label: 'All Years (FY to Final)' },
              { id: 'FY', label: '2. First Year (FY)' },
              { id: 'SY', label: '3. Second Year (SY)' },
              { id: 'TY', label: '4. Third Year (TY)' },
              { id: 'FINAL', label: '5. Fourth Year (Final)' },
            ].map((yf) => (
              <button
                key={yf.id}
                className={`filter-btn ${guideYearFilter === yf.id ? 'active' : ''}`}
                onClick={() => setGuideYearFilter(yf.id)}
              >
                {yf.label}
              </button>
            ))}
          </div>

          {/* ====================================================
              SECTION 2: FIRST YEAR (FY) – BUILD THE FOUNDATION
              ==================================================== */}
          {(guideYearFilter === 'ALL' || guideYearFilter === 'FY') && (
            <div className="topic-section-card" style={{ borderLeft: '5px solid var(--primary-600)' }}>
              <div className="topic-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="topic-badge-icon"><Terminal size={20} /></div>
                  <div>
                    <Badge variant="primary" style={{ marginBottom: '2px' }}>Section 2</Badge>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      2. First Year (FY) – Build the Foundation
                    </h2>
                  </div>
                </div>
                <Badge variant="neutral">Semesters 1 & 2</Badge>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The first year is about learning how computers work, how to think logically, how to write your first programs, and how to build basic technical and communication skills. Do not worry if advanced technologies look difficult at this stage.
              </p>

              {/* 2.1 Programming Fundamentals */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  2.1 Programming Fundamentals
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  Commonly taught using C or C++. Topics include variables, data types, operators, conditions, loops, functions, arrays, strings, pointers/references, structures and basic problem solving. If C++ is used, students may also see classes and basic object-oriented programming.
                </p>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--primary-800)', display: 'block', marginBottom: '0.5rem' }}>
                    What you should be able to do by the end of FY:
                  </strong>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <li>• Write small programs without copying code line-by-line.</li>
                    <li>• Break a problem into steps and convert the steps into code.</li>
                    <li>• Use conditions, loops, functions and arrays confidently.</li>
                    <li>• Understand basic debugging and common compiler errors.</li>
                    <li>• Solve beginner-level programming problems.</li>
                  </ul>
                </div>
              </div>

              {/* 2.2 Web Development Basics */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  2.2 Web Development Basics
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  Many CSE programs introduce web technology early. HTML creates the structure, CSS controls presentation, and JavaScript adds behavior and interaction.
                </p>

                <div className="roadmap-table-wrap">
                  <table className="roadmap-table">
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Technology</th>
                        <th style={{ width: '35%' }}>What it does</th>
                        <th style={{ width: '45%' }}>FY-level examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>HTML</strong></td>
                        <td>Structure of a web page</td>
                        <td>Headings, forms, tables, links, semantic sections</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>CSS</strong></td>
                        <td>Design and layout</td>
                        <td>Colors, spacing, Flexbox, Grid, responsive design</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>JavaScript</strong></td>
                        <td>Logic and interaction</td>
                        <td>Events, DOM, form validation, simple dynamic pages</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Git/GitHub</strong></td>
                        <td>Version control</td>
                        <td>Repositories, commits, branches, collaboration</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.3 Mathematics for CSE */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  2.3 Mathematics for CSE
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.5rem' }}>
                  Engineering mathematics may include calculus, matrices/linear algebra, differential equations, probability and statistics. Discrete mathematics may appear in FY or later depending on the university.
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  💡 Why it matters: Mathematics supports algorithms, graphics, AI/ML, data science, cryptography and performance analysis.
                </div>
              </div>

              {/* 2.4 & 2.5 Fundamentals & Engineering Sciences */}
              <div className="cards-grid-2" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    2.4 Computer and Digital Fundamentals
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Students may study computer organization basics, number systems, binary arithmetic, Boolean algebra, logic gates, digital circuits, memory, CPU basics and input/output concepts.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    2.5 Engineering Science and Communication
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Physics, chemistry, electrical/electronics, engineering graphics/workshop and professional communication develop broad engineering fundamentals even though they are not all directly used in software jobs.
                  </p>
                </div>
              </div>

              {/* 2.6 FY Projects You Can Build */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Laptop size={18} color="var(--primary-800)" /> 2.6 FY Projects You Can Build
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
                  {[
                    'Student result/marks calculator',
                    'Expense tracker',
                    'Quiz application',
                    'Personal portfolio website',
                    'College timetable website',
                    'Simple C/C++ console management system',
                  ].map((p, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--primary-800)" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SECTION 3: SECOND YEAR (SY) – CORE COMPUTER SCIENCE
              ==================================================== */}
          {(guideYearFilter === 'ALL' || guideYearFilter === 'SY') && (
            <div className="topic-section-card" style={{ borderLeft: '5px solid var(--primary-600)' }}>
              <div className="topic-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="topic-badge-icon"><Cpu size={20} /></div>
                  <div>
                    <Badge variant="primary" style={{ marginBottom: '2px' }}>Section 3</Badge>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      3. Second Year (SY) – Core Computer Science
                    </h2>
                  </div>
                </div>
                <Badge variant="neutral">Semesters 3 & 4</Badge>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Second year usually feels more like 'real CSE'. You start learning how data is stored, how programs are designed, how operating systems manage resources, how computers communicate, and how databases store information.
              </p>

              {/* 3.1 Data Structures and Algorithms (DSA) */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  3.1 Data Structures and Algorithms (DSA)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  DSA teaches efficient ways to store and process data and how to analyze solutions. Typical languages: C++, Java or C. DSA is particularly useful for technical interviews and competitive programming.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[
                    'Arrays and strings',
                    'Linked lists and doubly linked lists',
                    'Stacks and queues',
                    'Trees and binary search trees',
                    'Heaps and priority queues',
                    'Hashing',
                    'Graphs',
                    'Searching and sorting',
                    'Recursion',
                    'Time and space complexity',
                  ].map((topic, idx) => (
                    <Badge key={idx} variant="neutral" style={{ background: 'var(--bg-secondary)', color: 'var(--primary-800)', border: '1px solid var(--border-color)', padding: '0.35rem 0.65rem' }}>
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 3.2 OOP & 3.3 DBMS Grid */}
              <div className="cards-grid-2" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    3.2 Object-Oriented Programming (OOP)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                    OOP organizes programs around objects and classes. Core ideas include classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces and exception handling.
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    Java is a common teaching language, although C++ is also widely used. The goal is software design, not merely memorizing syntax.
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    3.3 Database Management Systems (DBMS)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                    DBMS teaches how applications store, retrieve and organize data. Topics commonly include relational databases, tables, primary/foreign keys, normalization, SQL queries, joins, indexes and transactions.
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    Typical language/tool: SQL with systems such as MySQL or PostgreSQL.
                  </div>
                </div>
              </div>

              {/* 3.4 OS, 3.5 Networks & 3.6 Discrete Math Grid */}
              <div className="cards-grid-3" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    3.4 Operating Systems (OS)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Explains how software interacts with hardware. Important concepts include processes, threads, CPU scheduling, memory management, virtual memory, file systems, synchronization and deadlocks.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    3.5 Computer Networks
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Networking covers OSI/TCP-IP models, IP addressing, subnetting, Ethernet, routing, TCP/UDP, DNS, HTTP/HTTPS and basic network security.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    3.6 Discrete Mathematics / Theory
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Topics include sets, relations, functions, logic, graphs, trees, combinatorics and proof techniques directly connected to theoretical computer science.
                  </p>
                </div>
              </div>

              {/* 3.7 SY Projects */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Laptop size={18} color="var(--primary-800)" /> 3.7 SY Projects You Can Build
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
                  {[
                    'Library management system with SQL',
                    'Hospital/clinic queue management',
                    'E-commerce backend prototype',
                    'Chat application',
                    'Network monitoring mini-project',
                    'DSA visualizer',
                  ].map((p, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--primary-800)" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SECTION 4: THIRD YEAR (TY) – ADVANCED CSE & SPECIALIZATION
              ==================================================== */}
          {(guideYearFilter === 'ALL' || guideYearFilter === 'TY') && (
            <div className="topic-section-card" style={{ borderLeft: '5px solid var(--primary-600)' }}>
              <div className="topic-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="topic-badge-icon"><Layers size={20} /></div>
                  <div>
                    <Badge variant="primary" style={{ marginBottom: '2px' }}>Section 4</Badge>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      4. Third Year (TY) – Advanced CSE and Specialization
                    </h2>
                  </div>
                </div>
                <Badge variant="neutral">Semesters 5 & 6</Badge>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Third year is where students can start choosing a direction. The exact electives differ by university, but common areas include AI/ML, web development, mobile development, cloud, cybersecurity and data science.
              </p>

              {/* 4.1 AI & ML + 4.2 Software Engineering */}
              <div className="cards-grid-2" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    4.1 Artificial Intelligence and Machine Learning
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                    AI builds intelligent behavior; ML learns patterns from data. Topics: supervised/unsupervised learning, classification, regression, clustering, model evaluation, feature engineering.
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    Typical language: Python. Common ecosystem: NumPy, pandas, scikit-learn and related tools.
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    4.2 Software Engineering
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Teaches how software is planned, designed, developed, tested, deployed and maintained. Topics: SDLC, requirements, UML, design principles, testing, version control, Agile and project management.
                  </p>
                </div>
              </div>

              {/* 4.3 Advanced Web Development Table */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  4.3 Advanced Web Development
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  Students may move from HTML/CSS/JavaScript to frontend frameworks and backend development.
                </p>

                <div className="roadmap-table-wrap">
                  <table className="roadmap-table">
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}>Layer</th>
                        <th style={{ width: '75%' }}>Common Technologies</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Frontend</strong></td>
                        <td>JavaScript, TypeScript, React, Angular or Vue</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Backend</strong></td>
                        <td>Node.js/Express, Java/Spring, Python/Django/FastAPI or similar</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Database</strong></td>
                        <td>PostgreSQL, MySQL, MongoDB or similar</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>API</strong></td>
                        <td>REST, JSON, authentication</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Development</strong></td>
                        <td>Git, GitHub, testing, deployment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.4 Cloud, 4.5 Cybersecurity & 4.6 Data Science */}
              <div className="cards-grid-3" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    4.4 Cloud Computing
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Introduces virtual machines, storage, databases, networking, containers, serverless concepts and deployment across AWS, Microsoft Azure and Google Cloud.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    4.5 Cybersecurity
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Authentication, authorization, encryption, secure coding, network security, web vulnerabilities, Linux fundamentals and security monitoring in authorized labs.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    4.6 Data Science / Big Data
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Data cleaning, visualization, statistics, machine learning, databases and distributed data processing using Python and SQL.
                  </p>
                </div>
              </div>

              {/* 4.7 TY Projects */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Laptop size={18} color="var(--primary-800)" /> 4.7 TY Projects You Can Build
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
                  {[
                    'AI-powered study planner',
                    'Smart agriculture assistant',
                    'Cybersecurity awareness dashboard',
                    'Full-stack college event platform',
                    'Recommendation system',
                    'Cloud-deployed SaaS application',
                  ].map((p, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--primary-800)" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SECTION 5: FOURTH YEAR – INDUSTRY, SPECIALIZATION & MAJOR PROJECT
              ==================================================== */}
          {(guideYearFilter === 'ALL' || guideYearFilter === 'FINAL') && (
            <div className="topic-section-card" style={{ borderLeft: '5px solid var(--primary-600)' }}>
              <div className="topic-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="topic-badge-icon"><GraduationCap size={20} /></div>
                  <div>
                    <Badge variant="primary" style={{ marginBottom: '2px' }}>Section 5</Badge>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      5. Fourth Year – Industry, Specialization and Major Project
                    </h2>
                  </div>
                </div>
                <Badge variant="neutral">Semesters 7 & 8</Badge>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The final year is less about learning every technology and more about applying what you know. Students commonly complete electives, internships, seminars and a major project.
              </p>

              {/* 5.1 Major Project Lifecycle */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  5.1 Major Project Lifecycle
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  A strong final-year project should solve a clear problem and demonstrate software engineering skills.
                </p>

                <div className="step-flow-box">
                  {[
                    '1. Problem Definition',
                    '2. Requirements',
                    '3. Architecture',
                    '4. UI/DB Design',
                    '5. Implementation',
                    '6. Testing',
                    '7. Deployment',
                    '8. Documentation',
                    '9. Presentation / Viva',
                  ].map((step, idx) => (
                    <span key={idx} className="step-flow-item">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5.2 Internship and Industry Skills */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  5.2 Internship and Industry Skills
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem' }}>
                  {[
                    'Git and GitHub collaboration',
                    'REST APIs and authentication',
                    'Database design',
                    'Testing and debugging',
                    'Deployment and basic cloud',
                    'Documentation and technical communication',
                    'Resume and portfolio',
                    'Interview preparation',
                  ].map((skill, idx) => (
                    <div key={idx} style={{ padding: '0.5rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--primary-800)" /> {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* 5.3 Placement Preparation Table */}
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  5.3 Placement Preparation
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  Placement preparation commonly combines DSA, core CS subjects, aptitude, communication, resume preparation, projects and interview practice. Different companies emphasize different skills.
                </p>

                <div className="roadmap-table-wrap">
                  <table className="roadmap-table">
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}>Area</th>
                        <th style={{ width: '75%' }}>What to prepare</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Coding</strong></td>
                        <td>DSA, problem solving, debugging</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Core CS</strong></td>
                        <td>OOP, DBMS, OS, Computer Networks</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Projects</strong></td>
                        <td>Architecture, features, decisions, challenges</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Aptitude</strong></td>
                        <td>Quantitative, logical and verbal reasoning</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Interview</strong></td>
                        <td>Technical questions + project discussion + communication</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: 'var(--primary-800)' }}>Portfolio</strong></td>
                        <td>Resume, GitHub, deployed projects, LinkedIn</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SECTION 10: FINAL TAKEAWAY
              ==================================================== */}
          <div className="topic-section-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div className="topic-badge-icon" style={{ background: 'var(--primary-600)', color: '#ffffff' }}><Sparkle size={20} /></div>
              <div>
                <Badge variant="primary" style={{ marginBottom: '2px' }}>Section 10</Badge>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>10. Final Takeaway</h3>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Think of CSE as a progression: <strong>FY teaches you how to think and code</strong>; <strong>SY teaches the core concepts of computer science</strong>; <strong>TY lets you explore advanced technologies and choose a direction</strong>; and the <strong>final year focuses on applying those skills through projects, internships and career preparation</strong>. You do not need to master every language. Build strong fundamentals, then choose technologies according to your interests and goals.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 2: SEMESTER 1-8 LIVE DB TRACKER
          ======================================================== */}
      {activeView === 'semesters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Select Semester (1 to 8):
              </h3>
              <Badge variant="primary" style={{ background: '#7c3aed', color: '#ffffff' }}>
                Active: Semester {selectedSem}
              </Badge>
            </div>

            <div className="semester-nav-pills">
              {semesters.map((s) => (
                <button
                  key={s.sem}
                  className={`semester-pill ${selectedSem === s.sem ? 'active' : ''}`}
                  onClick={() => handleSemesterChange(s.sem)}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Skeleton height={140} variant="rounded" />
              <Skeleton height={80} variant="rounded" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3, 4].map((n) => (
                  <Skeleton key={n} height={120} variant="rounded" />
                ))}
              </div>
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={() => fetchRoadmap(selectedSem)} />
          ) : !roadmapData ? (
            <EmptyState
              title="No Roadmap Found"
              message={`No roadmap details are currently published for Semester ${selectedSem}.`}
              actionLabel="Try Semester 1"
              onAction={() => handleSemesterChange(1)}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Semester Overview Banner */}
              <Card
                style={{
                  padding: '2rem',
                  background: 'var(--bg-secondary)',
                  borderLeft: '5px solid var(--primary-600)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Badge variant="primary">
                        {roadmapData.year} Year
                      </Badge>
                      <Badge variant="neutral">
                        Semester {selectedSem} Focus
                      </Badge>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {roadmapData.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '750px', fontSize: '0.95rem' }}>
                      {roadmapData.description}
                    </p>
                  </div>

                  {/* Student Milestone Progress Card */}
                  <div
                    style={{
                      minWidth: '240px',
                      background: 'var(--bg-tertiary)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Your Milestone Progress</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                        {progressPercentage}%
                      </span>
                    </div>
                    <ProgressBar progress={progressPercentage} size="md" variant="primary" />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center', fontWeight: 600 }}>
                      {completedItemIds.length} of {items.length} milestones completed
                    </div>
                  </div>
                </div>

                {roadmapData.careerPaths && roadmapData.careerPaths.length > 0 && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Career Paths:</span>
                    {roadmapData.careerPaths.map((cp) => (
                      <Badge key={cp} variant="neutral">
                        {cp}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>

              {/* Core Academic Subjects Grid */}
              {roadmapData.subjects && roadmapData.subjects.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Core Academic Subjects ({roadmapData.subjects.length})
                  </h3>
                  <div className="cards-grid-3">
                    {roadmapData.subjects.map((sub, idx) => (
                      <Card key={idx} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Badge variant={sub.isCore ? 'primary' : 'neutral'}>
                            {sub.isCore ? 'Core Subject' : 'Elective'}
                          </Badge>
                          {sub.credits && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{sub.credits} Credits</span>}
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sub.name}</h4>
                        {sub.description && (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            {sub.description}
                          </p>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Milestone Checkpoints */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Semester {selectedSem} Milestones ({items.length})
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Click checkbox to save your progress directly to MongoDB
                  </span>
                </div>

                <div className="roadmap-timeline">
                  {items.map((item, index) => {
                    const isChecked = completedItemIds.includes(item._id);
                    const isExpanded = !!expandedItems[item._id];

                    return (
                      <div key={item._id} className={`milestone-item ${isChecked ? 'completed' : ''}`}>
                        <div
                          className={`milestone-checkbox ${isChecked ? 'checked' : ''}`}
                          onClick={() => toggleMilestone(item._id, roadmapData._id, items.length)}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                        >
                          {isChecked && <CheckCircle2 size={18} />}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <Badge variant="neutral">
                                  Milestone {index + 1}
                                </Badge>
                                <Badge variant="info">
                                  {item.category}
                                </Badge>
                              </div>
                              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: isChecked ? 'var(--primary-800)' : 'var(--text-primary)' }}>
                                {item.topicName}
                              </h4>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              icon={isExpanded ? ChevronUp : ChevronDown}
                              iconPosition="right"
                              onClick={() => toggleExpand(item._id)}
                              style={{ color: 'var(--primary-800)' }}
                            >
                              {isExpanded ? 'Collapse' : 'Deep Dive'}
                            </Button>
                          </div>

                          {item.description && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                              {item.description}
                            </p>
                          )}

                          {isExpanded && (
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {item.learnGuide && (
                                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                    📚 Learning Roadmap:
                                  </div>
                                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                                    {item.learnGuide}
                                  </p>
                                </div>
                              )}

                              {item.practiceChecklist && item.practiceChecklist.length > 0 && (
                                <div>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                    🎯 Practice Checklist:
                                  </div>
                                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                    {item.practiceChecklist.map((task, idx) => (
                                      <li key={idx}>
                                        {task.task}
                                        {task.resourceLink && (
                                          <a href={task.resourceLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                                            [Open Resource]
                                          </a>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          VIEW 3: PROGRAMMING LANGUAGES – WHEN AND WHY? (SECTION 6)
          ======================================================== */}
      {activeView === 'languages' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Section 6</Badge>
              <Badge variant="neutral">Core Matrix</Badge>
            </div>
            <h2>6. Programming Languages – When and Why?</h2>
            <p>
              Complete comparative analysis of when each language is taught, where it is used in computer science engineering, and its priority level for a student.
            </p>
          </div>

          {/* Section 6 Table verbatim */}
          <div className="roadmap-table-wrap">
            <table className="roadmap-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Language / Technology</th>
                  <th style={{ width: '48%' }}>Where it is commonly used in CSE</th>
                  <th style={{ width: '30%' }}>Priority for a student</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { lang: 'C', where: 'Programming fundamentals, systems basics', priority: 'Understand fundamentals', tag: 'FY' },
                  { lang: 'C++', where: 'DSA, competitive programming, OOP', priority: 'Very useful for DSA', tag: 'FY/SY' },
                  { lang: 'Java', where: 'OOP, backend, enterprise applications', priority: 'Useful core language', tag: 'SY' },
                  { lang: 'Python', where: 'AI/ML, data science, automation, backend', priority: 'Very useful', tag: 'FY-TY' },
                  { lang: 'JavaScript', where: 'Web development', priority: 'Essential for web', tag: 'FY-TY' },
                  { lang: 'TypeScript', where: 'Large-scale web/frontend/backend', priority: 'Useful after JavaScript', tag: 'TY-Final' },
                  { lang: 'SQL', where: 'Databases and data querying', priority: 'Essential', tag: 'SY' },
                  { lang: 'HTML/CSS', where: 'Web structure and styling', priority: 'Essential for web basics', tag: 'FY' },
                  { lang: 'Git/GitHub', where: 'Version control and collaboration', priority: 'Essential industry skill', tag: 'All Years' },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong style={{ color: 'var(--primary-800)', fontSize: '1rem' }}>{row.lang}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>({row.tag})</span>
                    </td>
                    <td>{row.where}</td>
                    <td>
                      <Badge variant="neutral">
                        {row.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="topic-section-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Strategic Recommendation
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              You do not need to master every single language in this table. Build rock-solid problem-solving fundamentals in <strong>C++ or Java</strong>, gain practical building fluency in <strong>JavaScript/TypeScript or Python</strong>, and master <strong>SQL</strong> for relational databases.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 4: FOUR-YEAR SKILL ROADMAP (SECTION 7)
          ======================================================== */}
      {activeView === 'skillmatrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Section 7</Badge>
              <Badge variant="neutral">Progression Matrix</Badge>
            </div>
            <h2>7. Four-Year Skill Roadmap</h2>
            <p>
              A high-level stage-by-stage progression mapping what to learn, what to build, and how to prepare for your career in each year.
            </p>
          </div>

          {/* Section 7 Table Verbatim */}
          <div className="roadmap-table-wrap">
            <table className="roadmap-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Stage</th>
                  <th style={{ width: '32%' }}>Learn</th>
                  <th style={{ width: '28%' }}>Build</th>
                  <th style={{ width: '25%' }}>Career Preparation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: 'var(--primary-800)', fontSize: '1.05rem' }}>FY</strong></td>
                  <td>C/C++, HTML/CSS/JS basics, Git</td>
                  <td>Small projects</td>
                  <td>Explore career paths</td>
                </tr>
                <tr>
                  <td><strong style={{ color: 'var(--primary-800)', fontSize: '1.05rem' }}>SY</strong></td>
                  <td>DSA, Java/C++, SQL, OS, CN</td>
                  <td>Database/full-stack/DSA projects</td>
                  <td>Start coding practice</td>
                </tr>
                <tr>
                  <td><strong style={{ color: 'var(--primary-800)', fontSize: '1.05rem' }}>TY</strong></td>
                  <td>AI/ML, cloud, security, advanced development</td>
                  <td>2–3 strong projects</td>
                  <td>Internship + hackathons</td>
                </tr>
                <tr>
                  <td><strong style={{ color: 'var(--primary-800)', fontSize: '1.05rem' }}>Final</strong></td>
                  <td>Specialization + system/project skills</td>
                  <td>Major project + deployment</td>
                  <td>Resume + interviews + placement</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual Step Cards for FY, SY, TY, Final */}
          <div className="cards-grid-4">
            {[
              { year: '1st Year (FY)', icon: Terminal, focus: 'Fundamentals', badge: 'Stage 1' },
              { year: '2nd Year (SY)', icon: Cpu, focus: 'Core Computer Science', badge: 'Stage 2' },
              { year: '3rd Year (TY)', icon: Layers, focus: 'Specialization & Cloud', badge: 'Stage 3' },
              { year: '4th Year (Final)', icon: GraduationCap, focus: 'Industry & Placement', badge: 'Stage 4' },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <Card key={idx} style={{ padding: '1.25rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                    <Icon size={22} />
                  </div>
                  <Badge variant="neutral" style={{ marginBottom: '0.35rem' }}>{st.badge}</Badge>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>{st.year}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{st.focus}</p>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 5: WHAT A CSE STUDENT SHOULD HAVE BY GRADUATION (SECTION 8)
          ======================================================== */}
      {activeView === 'readiness' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Section 8</Badge>
              <Badge variant="neutral">Graduation Standard</Badge>
            </div>
            <h2>8. What a CSE Student Should Have by Graduation</h2>
            <p>
              Evaluate your readiness for Tier-1/Tier-2 campus placements, software engineering roles, or higher studies against the exact 8 criteria defined in the CSE roadmap.
            </p>
          </div>

          {/* Readiness Score Card */}
          <Card
            style={{
              padding: '2rem',
              background: 'var(--navy-hero-gradient)',
              color: '#ffffff',
              boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
              border: '1px solid rgba(170, 192, 225, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <Badge variant="neutral" style={{ background: 'rgba(255,255,255,0.18)', color: 'var(--aegean-200)', marginBottom: '0.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Interactive Self-Assessment
                </Badge>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                  Your Graduation Readiness Score: {readinessScore}%
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '0.925rem', maxWidth: '600px', lineHeight: 1.55 }}>
                  Check off the competencies below as you progress through your CSE degree. Aim for 85%+ before starting your 7th semester placement season.
                </p>
              </div>

              <div
                style={{
                  minWidth: '220px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(170, 192, 225, 0.25)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--aegean-200)', lineHeight: 1 }}>
                  {Object.values(checkedReadiness).filter(Boolean).length} / {graduationCriteria.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '0.35rem', fontWeight: 600 }}>
                  Core Milestones Mastered
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Checklist List (Verbatim from Section 8) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {graduationCriteria.map((c, idx) => {
              const isChecked = !!checkedReadiness[c.id];
              return (
                <div
                  key={c.id}
                  className={`readiness-check-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleReadinessItem(c.id)}
                  style={{
                    backgroundColor: isChecked ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    borderColor: isChecked ? 'var(--primary-600)' : 'var(--border-color)',
                    boxShadow: isChecked ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-sm)',
                      border: isChecked ? '2px solid var(--primary-600)' : '2px solid var(--border-color)',
                      background: isChecked ? 'var(--primary-600)' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: isChecked ? '0 0 8px rgba(37, 99, 235, 0.4)' : 'none',
                    }}
                  >
                    {isChecked && <Check size={16} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                        •
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: isChecked ? 'var(--primary-800)' : 'var(--text-primary)' }}>
                        {c.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 6: CAREER PATH SPECIALIZATIONS
          ======================================================== */}
      {activeView === 'careers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Specializations</Badge>
              <Badge variant="neutral">6 Career Tracks</Badge>
            </div>
            <h2>CSE Career Path Selector & Specialization Guides</h2>
            <p>
              By 3rd Year (TY), choosing a technical track helps focus your projects, internships, and interview preparations. Explore the core technology stacks, typical 4-year progression, and target industry roles for each major domain.
            </p>
          </div>

          <div className="career-grid">
            {[
              {
                title: 'Full-Stack Web Engineering',
                icon: Globe,
                description: 'Design responsive frontend user experiences and architect robust, scalable backend APIs.',
                coreStack: ['React', 'Node.js/Express', 'PostgreSQL/MongoDB', 'TypeScript', 'Docker', 'REST/GraphQL'],
                yearPath: 'FY: HTML/CSS/JS → SY: SQL, Java/Node → TY: React, APIs, Auth → Final: Deployed SaaS Capstone',
                demand: 'Very High',
                salary: '₹8 - 24 LPA',
                targetRoles: ['Frontend Engineer', 'Backend Engineer', 'Full Stack Developer', 'API Specialist'],
              },
              {
                title: 'Artificial Intelligence & Machine Learning',
                icon: Brain,
                description: 'Build predictive machine learning models, vector embedding pipelines, LLM systems, and computer vision.',
                coreStack: ['Python', 'NumPy/Pandas', 'Scikit-Learn', 'PyTorch/TensorFlow', 'FastAPI', 'LangChain/ChromaDB'],
                yearPath: 'FY: Python & Linear Algebra → SY: DSA & Statistics → TY: ML Algorithms, Deep Learning → Final: GenAI / RAG Capstone',
                demand: 'High Growth',
                salary: '₹10 - 30 LPA',
                targetRoles: ['ML Engineer', 'Data Scientist', 'AI Application Developer', 'Computer Vision Engineer'],
              },
              {
                title: 'Cloud & DevOps Engineering',
                icon: Server,
                description: 'Automate deployment pipelines, manage containerized microservices, and ensure 99.99% system reliability.',
                coreStack: ['Linux', 'Docker', 'Kubernetes', 'AWS/Azure/GCP', 'GitHub Actions', 'Terraform'],
                yearPath: 'FY: Linux & Git → SY: OS & Networks → TY: Containers, Cloud Services → Final: Cloud Native SaaS & CI/CD',
                demand: 'High Demand',
                salary: '₹9 - 26 LPA',
                targetRoles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
              },
              {
                title: 'Cybersecurity & Defense',
                icon: Shield,
                description: 'Secure application infrastructure, prevent OWASP Top 10 vulnerabilities, conduct audits, and manage cryptography.',
                coreStack: ['Network Security', 'Wireshark', 'Burp Suite', 'Linux/Bash', 'Cryptography', 'OWASP Top 10'],
                yearPath: 'FY: Logic & Linux → SY: Computer Networks, OS Internals → TY: Web Security, Audits → Final: Security Operations Capstone',
                demand: 'Critical Need',
                salary: '₹9 - 25 LPA',
                targetRoles: ['Security Analyst', 'Penetration Tester', 'Application Security Engineer', 'SOC Analyst'],
              },
              {
                title: 'Data Engineering & Analytics',
                icon: Database,
                description: 'Architect big data pipelines, extract actionable business intelligence, and manage large-scale data warehouses.',
                coreStack: ['SQL', 'Python', 'Apache Spark', 'Snowflake/BigQuery', 'Power BI/Tableau', 'Airflow'],
                yearPath: 'FY: Python Basics → SY: SQL, DBMS, Normalization → TY: Distributed Data Pipelines → Final: Analytics Dashboard',
                demand: 'High Demand',
                salary: '₹8 - 22 LPA',
                targetRoles: ['Data Engineer', 'Analytics Engineer', 'BI Developer', 'Data Warehouse Specialist'],
              },
              {
                title: 'Systems & Core Software Engineering',
                icon: Cpu,
                description: 'Develop low-latency distributed systems, database engines, embedded firmware, and operating system kernels.',
                coreStack: ['C++', 'Rust/Go', 'Concurrency/Threads', 'Linux Kernel', 'Computer Architecture', 'Distributed Protocols'],
                yearPath: 'FY: C/C++ & Memory → SY: OS, Multithreading, DSA → TY: Distributed Consensus, Compilers → Final: Custom Engine / OS Module',
                demand: 'Premium Roles',
                salary: '₹12 - 35 LPA',
                targetRoles: ['Systems Engineer', 'Low Latency Developer', 'Embedded Engineer', 'Core Backend Specialist'],
              },
            ].map((ct, idx) => {
              const Icon = ct.icon;
              return (
                <div
                  key={idx}
                  className="career-track-card"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                      <div
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-tertiary)',
                          color: 'var(--primary-800)',
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Badge variant="success" style={{ marginBottom: '2px' }}>
                          Demand: {ct.demand}
                        </Badge>
                        <div style={{ fontSize: '0.72rem', color: 'var(--primary-800)', fontWeight: 700 }}>Est. {ct.salary}</div>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {ct.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {ct.description}
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        CORE TECH STACK:
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {ct.coreStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="neutral"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.25rem' }}>
                        4-YEAR PATHWAY:
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {ct.yearPath}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      TARGET ROLES:
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      {ct.targetRoles.map((r) => (
                        <span
                          key={r}
                          style={{
                            fontSize: '0.78rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '4px',
                            color: 'var(--text-primary)',
                            fontWeight: 500,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <Link to="/projects">
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ width: '100%' }}
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Explore {ct.title.split(' ')[0]} Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 7: RECOMMENDED PORTAL STRUCTURE (SECTION 9)
          ======================================================== */}
      {activeView === 'portalstructure' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Section 9</Badge>
              <Badge variant="neutral">Platform Architecture</Badge>
            </div>
            <h2>9. Recommended Portal Structure Based on This Roadmap</h2>
            <p>
              If you are using this information to build your CSE student portal, organize the portal around student growth rather than only storing PDFs.
            </p>
          </div>

          {/* 12 Features Grid from Section 9 Verbatim */}
          <div className="cards-grid-3">
            {[
              { title: 'Year-wise roadmap: FY, SY, TY, Final Year', icon: Map, link: '/roadmap' },
              { title: 'Semester-wise subjects', icon: BookOpen, link: '/roadmap' },
              { title: 'Subject → topics → notes → videos/resources → quiz', icon: FileText, link: '/resources' },
              { title: 'Programming practice by language', icon: Code, link: '/resources' },
              { title: 'Skill progress tracker', icon: Workflow, link: '/profile' },
              { title: 'Career-path selector: Web, App, AI/ML, Cybersecurity, Data, Software', icon: Target, link: '/roadmap' },
              { title: 'Project idea generator and project showcase', icon: Laptop, link: '/projects' },
              { title: 'Hackathon/team-finding section', icon: Award, link: '/hackathons' },
              { title: 'Resume and skill-gap analyzer', icon: FileCheck, link: '/resume-builder' },
              { title: 'Viva/interview practice', icon: Briefcase, link: '/interview-practice' },
              { title: 'Internship and placement preparation', icon: GraduationCap, link: '/placement-hub' },
              { title: 'Personal dashboard showing what the student should learn next', icon: LayoutGrid, link: '/dashboard' },
            ].map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <Card key={idx} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-800)', marginBottom: '0.2rem' }}>Feature 0{idx + 1}</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{mod.title}</h4>
                  </div>

                  <Link to={mod.link}>
                    <Button variant="outline" size="sm" style={{ width: '100%' }} icon={ArrowRight} iconPosition="right">
                      Open Module
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Section 10 Callout */}
          <div className="topic-section-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              10. Final Takeaway
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Think of CSE as a progression: <strong>FY teaches you how to think and code</strong>; <strong>SY teaches the core concepts of computer science</strong>; <strong>TY lets you explore advanced technologies and choose a direction</strong>; and the <strong>final year focuses on applying those skills through projects, internships and career preparation</strong>. You do not need to master every language. Build strong fundamentals, then choose technologies according to your interests and goals.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW: PERSONAL 4-YEAR CAREER ROADMAP (21 SECTIONS)
          ======================================================== */}
      {activeView === 'personal' && (
        <PersonalCareerRoadmap />
      )}

      {/* ========================================================
          VIEW: 4-YEAR COURSERA CERTIFICATE GUIDE (35 COURSES)
          ======================================================== */}
      {activeView === 'coursera' && (
        <FourYearCourseraGuide />
      )}

      {/* ========================================================
          VIEW 8: 4-YEAR YOUTUBE VIDEO GUIDE (SUBJECT-WISE & 20+ CREATORS)
          ======================================================== */}
      {activeView === 'youtube' && (
        <FourYearYouTubeGuide />
      )}
    </div>
  );
};

export default RoadmapPage;
