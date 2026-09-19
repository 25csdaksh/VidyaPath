import React, { useState, useEffect, useCallback } from 'react';
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
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import roadmapService from '../services/roadmapService';
import dashboardService from '../services/dashboardService';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails } from '../utils/errorHandler';

export const RoadmapPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active top-level view tab
  const [activeView, setActiveView] = useState('progression'); // 'progression' | 'languages' | 'careers' | 'projects' | 'readiness' | 'portal'

  // Selected Year & Semester
  const initialSem = parseInt(searchParams.get('sem') || '1', 10);
  const [selectedSem, setSelectedSem] = useState(initialSem >= 1 && initialSem <= 8 ? initialSem : 1);
  const [selectedYear, setSelectedYear] = useState('FY');

  const [roadmapData, setRoadmapData] = useState(null);
  const [items, setItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  // Local state for Graduation Readiness checklist
  const [checkedReadiness, setCheckedReadiness] = useState(() => {
    try {
      const saved = localStorage.getItem('vidyapath_grad_readiness');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const { completedItemIds, toggleMilestone } = useRoadmapProgress(roadmapData?._id, selectedSem);

  // Synchronize year based on semester
  useEffect(() => {
    if (selectedSem <= 2) setSelectedYear('FY');
    else if (selectedSem <= 4) setSelectedYear('SY');
    else if (selectedSem <= 6) setSelectedYear('TY');
    else setSelectedYear('FINAL');
  }, [selectedSem]);

  // Year Definitions
  const yearCards = [
    {
      id: 'FY',
      title: '1st Year (FY)',
      subtitle: 'Build the Foundation',
      focus: 'Programming Fundamentals, Logic, Web Basics & Mathematics',
      languages: 'C / C++, Python basics, HTML, CSS, JavaScript, Git',
      semesters: [1, 2],
      badge: 'Foundation',
      icon: Terminal,
      color: '#166534',
    },
    {
      id: 'SY',
      title: '2nd Year (SY)',
      subtitle: 'Core Computer Science',
      focus: 'Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks',
      languages: 'C++, Java, SQL, Linux Shell, Git',
      semesters: [3, 4],
      badge: 'Core CSE',
      icon: Cpu,
      color: '#15803d',
    },
    {
      id: 'TY',
      title: '3rd Year (TY)',
      subtitle: 'Advanced CSE & Specialization',
      focus: 'AI/ML, Advanced Web Stacks, Cloud Computing, Cybersecurity, Data Science',
      languages: 'Python, TypeScript, React, Node.js, Cloud APIs',
      semesters: [5, 6],
      badge: 'Specialization',
      icon: Layers,
      color: '#047857',
    },
    {
      id: 'FINAL',
      title: '4th Year (Final)',
      subtitle: 'Industry, Capstone & Placements',
      focus: 'Major Capstone Project, Internships, System Design, Placement Drives',
      languages: 'Production Frameworks, Docker, Cloud Deployment, CI/CD',
      semesters: [7, 8],
      badge: 'Industry & Career',
      icon: GraduationCap,
      color: '#065f46',
    },
  ];

  const semesters = [
    { sem: 1, year: 'FY', label: 'Sem 1 • Fundamentals & C' },
    { sem: 2, year: 'FY', label: 'Sem 2 • DSA Intro & Web Basics' },
    { sem: 3, year: 'SY', label: 'Sem 3 • Advanced DSA & OOP' },
    { sem: 4, year: 'SY', label: 'Sem 4 • OS & Relational DBMS' },
    { sem: 5, year: 'TY', label: 'Sem 5 • Networks & Full Stack' },
    { sem: 6, year: 'TY', label: 'Sem 6 • Cloud, AI & Internships' },
    { sem: 7, year: 'FINAL', label: 'Sem 7 • AI/ML & Major Project I' },
    { sem: 8, year: 'FINAL', label: 'Sem 8 • Capstone & Placement Season' },
  ];

  // Language Matrix Data
  const programmingLanguages = [
    {
      name: 'C',
      role: 'Programming fundamentals, memory pointers, systems basics',
      priority: 'Fundamentals',
      variant: 'primary',
      when: '1st Year (FY)',
      why: 'Teaches low-level memory layout, pointer mechanics, and algorithmic thinking without library magic.',
    },
    {
      name: 'C++',
      role: 'Data Structures, Algorithms (DSA), Competitive Programming, OOP',
      priority: 'Very Useful',
      variant: 'success',
      when: '1st & 2nd Year (FY/SY)',
      why: 'The standard language for technical coding rounds and Standard Template Library (STL) efficiency.',
    },
    {
      name: 'Java',
      role: 'Object-Oriented Programming, Enterprise Backends, Spring Boot',
      priority: 'Core Language',
      variant: 'info',
      when: '2nd Year (SY)',
      why: 'Deeply cements OOP patterns, design principles, multithreading, and large-scale enterprise engineering.',
    },
    {
      name: 'Python',
      role: 'AI / ML, Data Science, Scripting, Automation, Fast Prototyping',
      priority: 'Very Useful',
      variant: 'success',
      when: 'FY basics → TY Deep Dive',
      why: 'Dominates modern AI/ML, data pipelines, backend APIs (FastAPI/Django), and rapid proof-of-concepts.',
    },
    {
      name: 'JavaScript',
      role: 'Interactive Web UI, Full-Stack Web Development, Node.js',
      priority: 'Essential',
      variant: 'danger',
      when: '1st to 3rd Year',
      why: 'The universal language of the web. Required for frontend web applications and full-stack solutions.',
    },
    {
      name: 'TypeScript',
      role: 'Large-scale frontend/backend architectures with strict type safety',
      priority: 'High Industry Demand',
      variant: 'primary',
      when: '3rd & 4th Year (TY/Final)',
      why: 'Standard for modern enterprise web codebases; prevents runtime exceptions through compile-time types.',
    },
    {
      name: 'SQL',
      role: 'Relational Database Queries, Normalization, Data Modeling',
      priority: 'Essential',
      variant: 'danger',
      when: '2nd Year (SY)',
      why: 'Universal database query language. Crucial for any backend, data engineering, or business application.',
    },
    {
      name: 'HTML5 & CSS3',
      role: 'Web structure, semantics, layout systems (Flexbox, Grid, Mobile UX)',
      priority: 'Essential Basics',
      variant: 'neutral',
      when: '1st Year (FY)',
      why: 'Forms the bedrock of all web applications and UI interfaces.',
    },
    {
      name: 'Git & GitHub',
      role: 'Version control, code collaboration, open source, CI/CD',
      priority: 'Essential Industry Skill',
      variant: 'danger',
      when: 'From Day 1 in FY',
      why: 'Non-negotiable requirement for software engineering teams, hackathons, and portfolio showcase.',
    },
  ];

  // Career Tracks Data
  const careerTracks = [
    {
      title: 'Full-Stack Web Engineering',
      icon: Globe,
      description: 'Design responsive frontend user experiences and architect robust, scalable backend APIs.',
      coreStack: ['React', 'Node.js/Express', 'PostgreSQL/MongoDB', 'TypeScript', 'Docker', 'REST/GraphQL'],
      yearPath: 'FY: HTML/CSS/JS → SY: SQL, Java/Node → TY: React, APIs, Auth → Final: Deployed SaaS Capstone',
      demand: 'Very High',
      targetRoles: ['Frontend Engineer', 'Backend Engineer', 'Full Stack Developer', 'API Specialist'],
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: Brain,
      description: 'Build predictive machine learning models, vector embedding pipelines, LLM systems, and computer vision.',
      coreStack: ['Python', 'NumPy/Pandas', 'Scikit-Learn', 'PyTorch/TensorFlow', 'FastAPI', 'LangChain/ChromaDB'],
      yearPath: 'FY: Python & Linear Algebra → SY: DSA & Statistics → TY: ML Algorithms, Deep Learning → Final: GenAI / RAG Capstone',
      demand: 'High Growth',
      targetRoles: ['ML Engineer', 'Data Scientist', 'AI Application Developer', 'Computer Vision Engineer'],
    },
    {
      title: 'Cloud & DevOps Engineering',
      icon: Server,
      description: 'Automate deployment pipelines, manage containerized microservices, and ensure 99.99% system reliability.',
      coreStack: ['Linux', 'Docker', 'Kubernetes', 'AWS/Azure/GCP', 'GitHub Actions', 'Terraform'],
      yearPath: 'FY: Linux & Git → SY: OS & Networks → TY: Containers, Cloud Services → Final: Cloud Native SaaS & CI/CD',
      demand: 'High Industry Need',
      targetRoles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
    },
    {
      title: 'Cybersecurity & Defense',
      icon: Shield,
      description: 'Secure application infrastructure, prevent OWASP Top 10 vulnerabilities, conduct audits, and manage cryptography.',
      coreStack: ['Network Security', 'Wireshark', 'Burp Suite', 'Linux/Bash', 'Cryptography', 'OWASP Top 10'],
      yearPath: 'FY: Logic & Linux → SY: Computer Networks, OS Internals → TY: Web Security, Audits → Final: Security Operations Capstone',
      demand: 'Critical Demand',
      targetRoles: ['Security Analyst', 'Penetration Tester', 'Application Security Engineer', 'SOC Analyst'],
    },
    {
      title: 'Data Engineering & Analytics',
      icon: Database,
      description: 'Architect big data pipelines, extract actionable business intelligence, and manage large-scale data warehouses.',
      coreStack: ['SQL', 'Python', 'Apache Spark', 'Snowflake/BigQuery', 'Power BI/Tableau', 'Airflow'],
      yearPath: 'FY: Python Basics → SY: SQL, DBMS, Normalization → TY: Distributed Data Pipelines → Final: Analytics Dashboard',
      demand: 'High Demand',
      targetRoles: ['Data Engineer', 'Analytics Engineer', 'BI Developer', 'Data Warehouse Specialist'],
    },
    {
      title: 'Systems & Core Software Engineering',
      icon: Cpu,
      description: 'Develop low-latency distributed systems, database engines, embedded firmware, and operating system kernels.',
      coreStack: ['C++', 'Rust/Go', 'Concurrency/Threads', 'Linux Kernel', 'Computer Architecture', 'Distributed Protocols'],
      yearPath: 'FY: C/C++ & Memory → SY: OS, Multithreading, DSA → TY: Distributed Consensus, Compilers → Final: Custom Engine / OS Module',
      demand: 'Premium Roles',
      targetRoles: ['Systems Engineer', 'Low Latency Developer', 'Embedded Engineer', 'Core Backend Specialist'],
    },
  ];

  // 4-Year Projects Catalog
  const projectShowcase = [
    {
      year: 'FY',
      title: 'Personal Portfolio & Responsive Resume',
      tech: 'HTML5, CSS3 Flexbox/Grid, Vanilla JavaScript, GitHub Pages',
      desc: 'Clean, mobile-first portfolio showcasing projects, academic credentials, and interactive contact form.',
      difficulty: 'Beginner',
    },
    {
      year: 'FY',
      title: 'Student Result & GPA Calculator Console',
      tech: 'C / C++, File Handling, Structs, Modular Functions',
      desc: 'CLI program to parse student course marks, calculate SGPA/CGPA, and persist grade sheets to disk.',
      difficulty: 'Beginner',
    },
    {
      year: 'FY',
      title: 'Interactive Quiz & Flashcard Engine',
      tech: 'JavaScript DOM, LocalStorage, CSS Animations',
      desc: 'Timed dynamic quiz application with score persistence, review mode, and categorized question banks.',
      difficulty: 'Beginner',
    },
    {
      year: 'SY',
      title: 'Hospital / Clinic Queue Management System',
      tech: 'Java / C++, Queue & Priority Queue DSA, File I/O',
      desc: 'Simulates emergency and regular OPD triage queues with appointment scheduling and wait-time estimations.',
      difficulty: 'Intermediate',
    },
    {
      year: 'SY',
      title: 'Library Database Management System',
      tech: 'SQL (PostgreSQL/MySQL), Node.js / Java, Foreign Keys, ACID',
      desc: 'Fully normalized relational database schema with book issuance tracking, fine calculations, and audit logs.',
      difficulty: 'Intermediate',
    },
    {
      year: 'SY',
      title: 'Algorithm & DSA Interactive Visualizer',
      tech: 'React / JavaScript Canvas, Sorting & Graph Algorithms',
      desc: 'Step-by-step visual animation for Dijkstra, BFS/DFS, QuickSort, and Binary Search Trees.',
      difficulty: 'Intermediate',
    },
    {
      year: 'TY',
      title: 'AI-Powered Smart Career & Study Assistant',
      tech: 'Python FastAPI, LangChain, ChromaDB Vector Embeddings, React',
      desc: 'RAG-powered conversational mentor delivering customized learning paths and interview grilling.',
      difficulty: 'Advanced',
    },
    {
      year: 'TY',
      title: 'Full-Stack Campus Event & Hackathon Hub',
      tech: 'MERN Stack (MongoDB, Express, React, Node), JWT, Cloudinary',
      desc: 'Event registrations, team formation matching, real-time announcements, and dynamic RSVP management.',
      difficulty: 'Advanced',
    },
    {
      year: 'TY',
      title: 'Cybersecurity Threat & Vulnerability Scanner',
      tech: 'Python, Socket Programming, OWASP Scanners, React Dashboard',
      desc: 'Automated header security scanner, SSL expiry checker, and port auditing tool for campus servers.',
      difficulty: 'Advanced',
    },
    {
      year: 'FINAL',
      title: 'Production Multi-Tenant SaaS Platform (Capstone)',
      tech: 'Next.js / Vite, Microservices, Redis Cache, Docker, AWS Deployment',
      desc: 'Enterprise capstone with role-based access control, analytics pipelines, Stripe payments, and CI/CD.',
      difficulty: 'Production Grade',
    },
    {
      year: 'FINAL',
      title: 'Distributed Log Aggregator & Telemetry Monitor',
      tech: 'Go / Node.js, Raft Consensus, WebSocket Stream, OpenTelemetry',
      desc: 'High-throughput real-time log ingestion and search system with fault-tolerant leader election.',
      difficulty: 'Production Grade',
    },
  ];

  // Graduation Checklist Criteria
  const graduationCriteria = [
    {
      id: 'g1',
      title: 'Strong Programming Fundamentals',
      desc: 'Fluent in writing clean, modular code without copying line-by-line in at least one primary language (C++, Java, or Python).',
    },
    {
      id: 'g2',
      title: 'Comfort with DSA & Algorithmic Problem Solving',
      desc: 'Solved 150+ problems across Arrays, LinkedLists, Trees, Graphs, Dynamic Programming, and Time/Space complexity analysis.',
    },
    {
      id: 'g3',
      title: 'Core Computer Science Mastery',
      desc: 'Solid conceptual understanding of OOP principles, Relational DBMS (SQL/ACID), Operating Systems (Processes/Threads), and Computer Networks (TCP/IP).',
    },
    {
      id: 'g4',
      title: 'Production Project Portfolio',
      desc: 'Built and deployed at least 2–3 full-stack or domain-specific projects with live URLs, documentation, and clean architecture.',
    },
    {
      id: 'g5',
      title: 'Git & GitHub Collaboration Workflow',
      desc: 'Proficient with branch management, pull requests, merge conflict resolution, and collaborative team development.',
    },
    {
      id: 'g6',
      title: 'Chosen Technical Specialization',
      desc: 'Deep familiarity in at least one modern domain: Full-Stack Web, AI/ML, Cloud/DevOps, Cybersecurity, or Data Systems.',
    },
    {
      id: 'g7',
      title: 'Internship, Hackathon, or Open Source Contribution',
      desc: 'Practical exposure working on team deadlines, real-world bug fixes, or competitive hackathon prototypes.',
    },
    {
      id: 'g8',
      title: 'Professional ATS Resume & Interview Articulation',
      desc: 'One-page Harvard-standard resume, polished GitHub/LinkedIn profiles, and ability to clearly explain architectural decisions in interviews.',
    },
  ];

  const toggleReadinessItem = (id) => {
    setCheckedReadiness((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('vidyapath_grad_readiness', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const readinessScore = Math.round(
    (Object.values(checkedReadiness).filter(Boolean).length / graduationCriteria.length) * 100
  );

  // Fetch Semester Roadmap from backend
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

  const handleYearChange = (yearId) => {
    setSelectedYear(yearId);
    const targetCard = yearCards.find((y) => y.id === yearId);
    if (targetCard && targetCard.semesters.length > 0) {
      handleSemesterChange(targetCard.semesters[0]);
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const progressPercentage =
    items.length > 0 ? Math.round((completedItemIds.length / items.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 60:30:10 Design Academic Hero Banner */}
      <div className="hero-banner" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, color: '#86efac', marginBottom: '1rem', backdropFilter: 'blur(8px)' }}>
            <Compass size={16} /> Computer Science & Engineering • 4-Year Master Track
          </div>
          <h1 className="hero-title" style={{ color: '#ffffff' }}>
            CSE 4-Year Academic & <span>Career Roadmap</span>
          </h1>
          <p className="hero-subtitle">
            A comprehensive, semester-by-semester guide navigating subjects, programming languages, core milestones, real-world projects, and placement readiness.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>4 Years</div>
              <div style={{ fontSize: '0.78rem', color: '#86efac' }}>FY → SY → TY → Final</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.2)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>8 Semesters</div>
              <div style={{ fontSize: '0.78rem', color: '#86efac' }}>Structured Milestones</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.2)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>9+ Languages</div>
              <div style={{ fontSize: '0.78rem', color: '#86efac' }}>When & Why Guide</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.2)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>6 Specializations</div>
              <div style={{ fontSize: '0.78rem', color: '#86efac' }}>Industry Career Paths</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Roadmap Hub View Tabs */}
      <div className="roadmap-view-tabs">
        {[
          { id: 'progression', label: '📅 4-Year Progression & Semesters', icon: Map },
          { id: 'languages', label: '💻 Languages: When & Why?', icon: Code },
          { id: 'careers', label: '🚀 Career Specializations', icon: Target },
          { id: 'projects', label: '🛠️ 4-Year Project Showcase', icon: Laptop },
          { id: 'readiness', label: '🎓 Graduation Readiness Checklist', icon: Award },
          { id: 'portal', label: '🏛️ Portal Architecture', icon: Layers },
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
          VIEW 1: 4-YEAR PROGRESSION & SEMESTER CHECKPOINTS
          ======================================================== */}
      {activeView === 'progression' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 4-Year Interactive Overview Cards */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1. CSE Progression at a Glance
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click a year to view its curriculum & milestones
              </span>
            </div>

            <div className="year-hero-cards">
              {yearCards.map((yc) => {
                const Icon = yc.icon;
                const isActiveYear = selectedYear === yc.id;
                return (
                  <div
                    key={yc.id}
                    className={`year-hero-card ${isActiveYear ? 'active' : ''}`}
                    onClick={() => handleYearChange(yc.id)}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <Badge variant={isActiveYear ? 'primary' : 'neutral'}>{yc.badge}</Badge>
                        <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)', background: isActiveYear ? 'var(--primary-100)' : 'var(--bg-tertiary)', color: '#166534' }}>
                          <Icon size={18} />
                        </div>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {yc.title}
                      </h3>
                      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#166534', marginBottom: '0.5rem' }}>
                        {yc.subtitle}
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
                        {yc.focus}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', marginTop: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Typical Tech:</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>{yc.languages}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Semester Selector Tabs */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Select Semester (1 to 8):
              </h3>
              <Badge variant="primary">Active: Semester {selectedSem}</Badge>
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

          {/* Loading, Error, Empty, and Success states for Semester Details */}
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
              <Card style={{ padding: '2rem', background: 'var(--bg-secondary)', borderLeft: '5px solid #166534' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Badge variant="primary">{roadmapData.year} Year</Badge>
                      <Badge variant="neutral">Semester {selectedSem} Focus</Badge>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {roadmapData.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '750px' }}>
                      {roadmapData.description}
                    </p>
                  </div>

                  {/* Student Milestone Progress Card */}
                  <div style={{ minWidth: '240px', background: '#f0fdf4', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #86efac' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#14532d' }}>Your Milestone Progress</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#166534' }}>
                        {progressPercentage}%
                      </span>
                    </div>
                    <ProgressBar progress={progressPercentage} size="md" variant="primary" />
                    <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '0.5rem', textAlign: 'center', fontWeight: 600 }}>
                      {completedItemIds.length} of {items.length} milestones completed
                    </div>
                  </div>
                </div>

                {/* Target Career Paths for this Semester */}
                {roadmapData.careerPaths && roadmapData.careerPaths.length > 0 && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Paths:</span>
                    {roadmapData.careerPaths.map((cp) => (
                      <Badge key={cp} variant="neutral">{cp}</Badge>
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
                      <Card key={idx} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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

              {/* Detailed Semester Milestones Checklist */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Semester {selectedSem} Actionable Milestones ({items.length})
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Check off milestones as you master each topic to persist your progress
                  </span>
                </div>

                {items.length === 0 ? (
                  <EmptyState
                    title="No Detailed Milestones Added"
                    message="Detailed curriculum milestones for this semester are being curated."
                  />
                ) : (
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
                            {isChecked && <CheckCircle2 size={16} />}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                  <Badge variant="neutral">Milestone {index + 1}</Badge>
                                  <Badge variant="info">{item.category}</Badge>
                                </div>
                                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: isChecked ? '#166534' : 'var(--text-primary)' }}>
                                  {item.topicName}
                                </h4>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                icon={isExpanded ? ChevronUp : ChevronDown}
                                iconPosition="right"
                                onClick={() => toggleExpand(item._id)}
                              >
                                {isExpanded ? 'Collapse' : 'Deep Dive'}
                              </Button>
                            </div>

                            {item.description && (
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                {item.description}
                              </p>
                            )}

                            {/* Collapsible Deep Details */}
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
                                            <a
                                              href={task.resourceLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{ marginLeft: '0.5rem', color: '#166534', fontWeight: 600 }}
                                            >
                                              [Open Resource]
                                            </a>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {item.buildMilestones && item.buildMilestones.length > 0 && (
                                  <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                      🛠️ Hands-on Build Specs:
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                      {item.buildMilestones.map((b, idx) => (
                                        <div key={idx} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                                          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{b.title}</div>
                                          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{b.specification}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          VIEW 2: PROGRAMMING LANGUAGES (WHEN AND WHY?)
          ======================================================== */}
      {activeView === 'languages' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Language Matrix</Badge>
              <Badge variant="neutral">9 Key Technologies</Badge>
            </div>
            <h2>Programming Languages – When and Why?</h2>
            <p>
              CSE is not about memorizing syntax for every language. It is about understanding fundamental computing concepts, data structures, and software architecture, then choosing the right tool for your project or specialization.
            </p>
          </div>

          <div className="lang-grid">
            {programmingLanguages.map((lang, idx) => (
              <div key={idx} className="lang-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: '#166534', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                      {lang.name.substring(0, 2)}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{lang.name}</h3>
                  </div>
                  <Badge variant={lang.variant}>{lang.priority}</Badge>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Recommended Stage:</strong> {lang.when}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Where used:</strong> {lang.role}
                </div>

                <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.825rem', color: '#14532d', lineHeight: 1.45 }}>
                  <strong>Why it matters:</strong> {lang.why}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary Tip Box */}
          <Card style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #86efac' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Lightbulb size={24} style={{ color: '#166534', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#14532d', marginBottom: '0.25rem' }}>
                  The 4-Year Golden Rule for Languages
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#166534', lineHeight: 1.55 }}>
                  Master <strong>one strongly-typed language</strong> (C++ or Java) for DSA & systems, <strong>one dynamic language</strong> (Python or JavaScript/TypeScript) for rapid building & AI/Web, and <strong>SQL</strong> for data persistence. Everything else is easily picked up on the job.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================
          VIEW 3: CAREER PATH SPECIALIZATIONS
          ======================================================== */}
      {activeView === 'careers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Specializations</Badge>
              <Badge variant="neutral">6 Career Paths</Badge>
            </div>
            <h2>CSE Career Path Selector & Specialization Guides</h2>
            <p>
              By 3rd Year (TY), you should choose a technical track to focus your projects, internships, and interview preparations on. Explore the core technology stacks and typical roadmap progression for each major industry domain.
            </p>
          </div>

          <div className="career-grid">
            {careerTracks.map((ct, idx) => {
              const Icon = ct.icon;
              return (
                <div key={idx} className="career-track-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{ padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-100)', color: '#166534' }}>
                        <Icon size={24} />
                      </div>
                      <Badge variant="success">Demand: {ct.demand}</Badge>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {ct.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {ct.description}
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        CORE TECH STACK:
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {ct.coreStack.map((tech) => (
                          <Badge key={tech} variant="neutral" style={{ fontSize: '0.75rem' }}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', marginBottom: '0.25rem' }}>
                        4-YEAR PATHWAY:
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {ct.yearPath}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      TARGET ROLES:
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {ct.targetRoles.map((r) => (
                        <span key={r} style={{ fontSize: '0.78rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-primary)' }}>
                          {r}
                        </span>
                      ))}
                    </div>

                    <Link to="/projects">
                      <Button variant="outline" size="sm" style={{ width: '100%' }} icon={ArrowRight} iconPosition="right">
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
          VIEW 4: 4-YEAR PROJECT SHOWCASE
          ======================================================== */}
      {activeView === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Portfolio Roadmap</Badge>
              <Badge variant="neutral">Hands-on Engineering</Badge>
            </div>
            <h2>4-Year Recommended Project Catalog</h2>
            <p>
              Build your resume progressively from 1st Year to 4th Year. Practical projects demonstrate software engineering principles, system architecture, database design, and problem solving to recruiters.
            </p>
          </div>

          <div className="cards-grid-3">
            {projectShowcase.map((p, idx) => (
              <Card key={idx} style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Badge variant={p.year === 'FY' ? 'neutral' : p.year === 'SY' ? 'info' : p.year === 'TY' ? 'primary' : 'danger'}>
                      {p.year} Project
                    </Badge>
                    <Badge variant="neutral">{p.difficulty}</Badge>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#166534', fontWeight: 600, marginBottom: '0.75rem' }}>
                    🔧 {p.tech}
                  </div>

                  <Link to="/projects">
                    <Button variant="ghost" size="sm" style={{ width: '100%' }} icon={ExternalLink} iconPosition="right">
                      View in Project Hub
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 5: GRADUATION READINESS CHECKLIST
          ======================================================== */}
      {activeView === 'readiness' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Graduation Standards</Badge>
              <Badge variant="neutral">Career Benchmark</Badge>
            </div>
            <h2>What a CSE Student Should Have by Graduation</h2>
            <p>
              Evaluate your readiness for Tier-1/Tier-2 campus placements, software engineering roles, or higher studies with this comprehensive 8-point graduation benchmark.
            </p>
          </div>

          {/* Readiness Score Card */}
          <Card style={{ padding: '1.75rem', background: 'linear-gradient(135deg, #052e16 0%, #166534 100%)', color: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <Badge variant="neutral" style={{ background: 'rgba(255,255,255,0.2)', color: '#86efac', marginBottom: '0.5rem' }}>
                  Self-Assessment Tracker
                </Badge>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  Your Graduation Readiness Score: {readinessScore}%
                </h3>
                <p style={{ color: '#dcfce7', fontSize: '0.9rem', maxWidth: '600px' }}>
                  Check off the competencies below as you progress through your CSE degree. Aim for 85%+ before starting your 7th semester placement season.
                </p>
              </div>

              <div style={{ minWidth: '220px', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#86efac', lineHeight: 1 }}>
                  {Object.values(checkedReadiness).filter(Boolean).length} / {graduationCriteria.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#dcfce7', marginTop: '0.35rem' }}>Core Milestones Mastered</div>
              </div>
            </div>
          </Card>

          {/* Interactive Checklist List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {graduationCriteria.map((c, idx) => {
              const isChecked = !!checkedReadiness[c.id];
              return (
                <div
                  key={c.id}
                  className={`readiness-check-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleReadinessItem(c.id)}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-sm)',
                      border: isChecked ? '2px solid #166534' : '2px solid var(--border-color)',
                      background: isChecked ? '#166534' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isChecked && <Check size={16} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534' }}>
                        0{idx + 1}.
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: isChecked ? '#166534' : 'var(--text-primary)' }}>
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
          VIEW 6: PORTAL ARCHITECTURE & LIFECYCLE
          ======================================================== */}
      {activeView === 'portal' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="primary">Platform Structure</Badge>
              <Badge variant="neutral">Student Growth Engine</Badge>
            </div>
            <h2>Recommended Portal Architecture Based on This Roadmap</h2>
            <p>
              VidyaPath is organized around continuous student growth rather than static PDF storage. Explore how each portal module maps to your 4-year engineering journey.
            </p>
          </div>

          <div className="cards-grid-3">
            {[
              {
                title: 'Year-Wise & Semester Roadmap',
                icon: Map,
                desc: 'Progression tracking across FY, SY, TY, and Final Year with actionable milestones and practice tasks.',
                link: '/roadmap',
              },
              {
                title: 'Curated Project Hub & Ideas',
                icon: Laptop,
                desc: 'Tier-1 real-world project specifications with architecture diagrams, schema designs, and resume talking points.',
                link: '/projects',
              },
              {
                title: 'Structured Learning Resources',
                icon: BookOpen,
                desc: 'Standard textbooks, online courses, and high-quality YouTube playlists organized by CSE subject.',
                link: '/resources',
              },
              {
                title: 'Interview & DSA Practice Hub',
                icon: Briefcase,
                desc: 'Top technical interview questions, DSA problems, company patterns, and viva voce preparation.',
                link: '/interview-practice',
              },
              {
                title: 'AI Career Assistant & Mentor',
                icon: Brain,
                desc: 'Context-aware AI mentor providing project grilling, skill-gap analysis, and interview simulations.',
                link: '/ai-assistant',
              },
              {
                title: 'Resume Builder & ATS Guide',
                icon: FileCheck,
                desc: 'Interactive Harvard-format resume engineering with Google XYZ formula bullet point suggestions.',
                link: '/resume-builder',
              },
            ].map((module, idx) => {
              const Icon = module.icon;
              return (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--primary-100)', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {module.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {module.desc}
                    </p>
                  </div>

                  <Link to={module.link}>
                    <Button variant="outline" size="sm" style={{ width: '100%' }} icon={ArrowRight} iconPosition="right">
                      Open Module
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Final Takeaway Callout */}
          <Card style={{ padding: '2rem', background: '#f0fdf4', border: '1px solid #86efac' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d', marginBottom: '0.5rem' }}>
              Final Takeaway for Every CSE Student
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#166534', lineHeight: 1.65 }}>
              Think of CSE as a progression: <strong>FY</strong> teaches you how to think and code; <strong>SY</strong> teaches the core concepts of computer science; <strong>TY</strong> lets you explore advanced technologies and choose a direction; and the <strong>Final Year</strong> focuses on applying those skills through major projects, internships, and career placement. You do not need to master every single tool. Build strong fundamentals, then choose technologies according to your genuine interests and career aspirations.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
