import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  FolderGit2,
  Trophy,
  Milestone,
  Layers,
  CheckCircle2,
  Sparkles,
  Clock,
  BookOpen,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const platformPillars = [
    {
      title: 'LEARN',
      subtitle: 'Foundations & Concepts',
      desc: 'Syllabus breakdown, curated YouTube playlists, accredited MOOCs, and semester notes.',
      icon: <BookOpen size={24} />,
      link: '/learn',
      color: 'brand',
      items: ['About CSE Guide', 'YouTube Curated Hub', 'Coursera MOOCs', 'Notes & Cheat Sheets'],
    },
    {
      title: 'BUILD',
      subtitle: 'Real-World Systems',
      desc: 'Searchable project database with full system architecture, database design & API specs.',
      icon: <FolderGit2 size={24} />,
      link: '/projects',
      color: 'brand',
      items: ['Low / Med / High Projects', 'Architecture Diagrams', 'Resume Bullet Generator', 'State Tracker'],
    },
    {
      title: 'COMPETE',
      subtitle: 'Hackathons & Contests',
      desc: 'National & global hackathon tracker with a 12-step problem statement analyzer and pitch guide.',
      icon: <Trophy size={24} />,
      link: '/hackathons',
      color: 'brand',
      items: ['Live Deadline Countdown', '12-Step Problem Analyzer', 'Team Role Matcher', 'Pitch Deck Checklist'],
    },
    {
      title: 'PREPARE',
      subtitle: 'Interviews & DSA',
      desc: '14 Core DSA patterns, DBMS, OS, Computer Networks, and top product company hiring archives.',
      icon: <Layers size={24} />,
      link: '/placement',
      color: 'brand',
      items: ['DSA Topic Practice', 'Company Hiring Drives', 'DBMS & OS Primers', 'Mock Interview Arena'],
    },
    {
      title: 'CAREER',
      subtitle: 'Roadmaps & ATS Resume',
      desc: 'Interactive 4-year milestone roadmaps and single-page ATS-optimized tech resume builder.',
      icon: <Milestone size={24} />,
      link: '/roadmap',
      color: 'brand',
      items: ['4-Year / 8-Semester Path', 'ATS Resume Builder', 'AI Career Counselor', 'Placement Readiness'],
    },
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="home-hero">
        <div className="home-hero__badge-container">
          <Badge variant="brand" size="md" icon={<Sparkles size={14} />}>
            VidyaPath • Centralized CSE Career & Learning Ecosystem
          </Badge>
        </div>

        <h1 className="home-hero__title">
          Your Complete CSE <br />
          <span className="home-hero__title-accent">Career Journey</span>
        </h1>

        <p className="home-hero__subtitle">
          Learn. Build. Compete. Prepare. Get Career Ready.
        </p>

        <div className="home-hero__cta-group">
          <Link to="/roadmap">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Explore Career Roadmap
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="outline" size="lg" leftIcon={<FolderGit2 size={18} />}>
              Explore Projects
            </Button>
          </Link>
        </div>

        {/* Core Value Pillars */}
        <div className="home-hero__metrics">
          <div className="home-hero__metric-pill">
            <CheckCircle2 size={15} className="home-hero__metric-icon" />
            <span>4-Year Academic Progression</span>
          </div>
          <div className="home-hero__metric-pill">
            <CheckCircle2 size={15} className="home-hero__metric-icon" />
            <span>Real-World System Architectures</span>
          </div>
          <div className="home-hero__metric-pill">
            <CheckCircle2 size={15} className="home-hero__metric-icon" />
            <span>Placement & Interview Archive</span>
          </div>
        </div>
      </section>

      {/* 2. Personalized "Continue Your Journey" Section */}
      <section className="home-journey-section">
        <Card variant="brand" className="home-journey-card">
          <CardHeader>
            <div className="home-journey__header-left">
              <div className="home-journey__avatar-icon">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="home-journey__title">
                  {isAuthenticated && user
                    ? `Continue Your Journey, ${user.name.split(' ')[0]}`
                    : 'Personalized Student Roadmap Tracker'}
                </h3>
                <span className="home-journey__subtitle">
                  {isAuthenticated
                    ? 'Your real-time academic, project, and interview progress'
                    : 'Sign in to sync your semester milestones, saved projects, and practice streak'}
                </span>
              </div>
            </div>
            <Badge variant="brand" size="sm">
              {isAuthenticated ? 'Active Semester 3 (SY)' : 'Demo Profile View'}
            </Badge>
          </CardHeader>

          <CardBody>
            <div className="home-journey__grid">
              {/* Semester & Roadmap Stage */}
              <div className="home-journey__stat-box">
                <span className="home-journey__stat-label">Current Academic Stage</span>
                <h4 className="home-journey__stat-val">Semester 3 • Core CSE</h4>
                <p className="home-journey__stat-sub">DSA, OOP, Computer Networks & DBMS</p>
                <div className="home-journey__progress-bar">
                  <div className="home-journey__progress-fill" style={{ width: '65%' }} />
                </div>
                <span className="home-journey__progress-text">65% Semester Milestones Completed</span>
              </div>

              {/* Ongoing Project */}
              <div className="home-journey__stat-box">
                <span className="home-journey__stat-label">Active Project In-Progress</span>
                <h4 className="home-journey__stat-val">Distributed Rate Limiter</h4>
                <div className="home-journey__stage-badge">
                  <Badge variant="warning" size="sm">Status: Building API (3/5)</Badge>
                </div>
                <p className="home-journey__stat-sub">Redis Token Bucket & Express Gateway</p>
                <Link to="/projects" className="home-journey__box-link">
                  Open Project Blueprint →
                </Link>
              </div>

              {/* Placement & DSA Readiness */}
              <div className="home-journey__stat-box">
                <span className="home-journey__stat-label">Placement & DSA Preparation</span>
                <h4 className="home-journey__stat-val">42 / 100 Topics Solved</h4>
                <p className="home-journey__stat-sub">Arrays, LinkedList, Trees & Sliding Window</p>
                <div className="home-journey__progress-bar">
                  <div className="home-journey__progress-fill" style={{ width: '42%' }} />
                </div>
                <Link to="/placement" className="home-journey__box-link">
                  Practice Next: Graphs & DP →
                </Link>
              </div>

              {/* Upcoming Hackathon & Deadlines */}
              <div className="home-journey__stat-box">
                <span className="home-journey__stat-label">Upcoming Hackathons</span>
                <h4 className="home-journey__stat-val">Smart India Hackathon (SIH)</h4>
                <div className="home-journey__deadline-pill">
                  <Clock size={14} />
                  <span>Registration Closes in 12 Days</span>
                </div>
                <Link to="/hackathons" className="home-journey__box-link">
                  View SIH Problem Analyzer →
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* 3. Platform Categories (Learn, Build, Compete, Prepare, Career) */}
      <section className="home-pillars-section">
        <div className="home-section-header">
          <span className="home-eyebrow">End-to-End Progression</span>
          <h2 className="home-section-title">Explore Platform Pillars</h2>
          <p className="home-section-desc">
            A cohesive architecture designed to solve the question: "What should I do next to become industry ready?"
          </p>
        </div>

        <div className="home-pillars-grid">
          {platformPillars.map((pillar, idx) => (
            <Card key={idx} variant="default" interactive className="home-pillar-card">
              <CardBody>
                <div className="home-pillar__icon-box">
                  {pillar.icon}
                </div>
                <span className="home-pillar__title">{pillar.title}</span>
                <span className="home-pillar__subtitle">{pillar.subtitle}</span>
                <p className="home-pillar__desc">{pillar.desc}</p>

                <div className="home-pillar__items">
                  {pillar.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="home-pillar__item-row">
                      <Check size={14} className="home-pillar__check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to={pillar.link} className="home-pillar__action">
                  <span>Enter {pillar.title} Hub</span>
                  <ArrowRight size={14} />
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. AI Career Assistant & ATS Resume Quick Banner */}
      <section className="home-ai-banner">
        <div className="home-ai-banner__content">
          <Badge variant="brand" size="sm" icon={<Sparkles size={14} />}>
            Intelligent AI Advisory
          </Badge>
          <h2>Ask anything about your CSE Roadmap & Placements</h2>
          <p>
            The VidyaPath AI Assistant is grounded directly on our curated repository of 4-year roadmaps,
            interview questions, project architectures, and textbook reading lists.
          </p>
          <div className="home-ai-banner__prompts">
            <span className="home-ai-banner__prompt-chip">"What project should I build after learning Node.js?"</span>
            <span className="home-ai-banner__prompt-chip">"Explain B-Trees vs Hash Indexing for DBMS interview"</span>
            <span className="home-ai-banner__prompt-chip">"Review my resume bullet points for Backend Engineer"</span>
          </div>
          <Link to="/ai-assistant">
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
              Open AI Career Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
