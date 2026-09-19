import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  GraduationCap,
  Video,
  Award,
  FolderGit2,
  FileCode2,
  Trophy,
  Megaphone,
  BotMessageSquare,
  Milestone,
  FileText,
  Briefcase,
  Layers,
  HelpCircle,
  Bookmark,
  TrendingUp,
  ShieldAlert,
  Search,
  CheckCircle,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardBody } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import './Home.css';

interface ModuleCard {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

export const Home: React.FC = () => {
  const portalModules: ModuleCard[] = [
    {
      id: 1,
      title: 'About CSE',
      description: 'Curriculum overview, core pillars, specialization tracks, and industry domains.',
      category: 'Foundation',
      icon: <GraduationCap size={22} />,
      path: '/about-cse',
    },
    {
      id: 2,
      title: 'YouTube Learning Hub',
      description: 'Curated playlists and creators for DSA, Web Dev, AI/ML, and Core CS subjects.',
      category: 'Learning',
      icon: <Video size={22} />,
      path: '/resources/youtube',
      badge: 'Curated',
    },
    {
      id: 3,
      title: 'Coursera & MOOCs',
      description: 'Accredited certifications, financial aid tips, and high-impact specialization tracks.',
      category: 'Learning',
      icon: <Award size={22} />,
      path: '/resources/coursera',
    },
    {
      id: 4,
      title: 'Project Blueprints',
      description: 'Tiered project ideas (Beginner to Advanced) with system architecture and tech stacks.',
      category: 'Practice',
      icon: <FolderGit2 size={22} />,
      path: '/resources/projects',
      badge: 'Popular',
    },
    {
      id: 5,
      title: 'Notes & Platforms',
      description: 'Semester cheat sheets, W3Schools quick guides, LeetCode & HackerRank sheet links.',
      category: 'Learning',
      icon: <FileCode2 size={22} />,
      path: '/resources/notes',
    },
    {
      id: 6,
      title: 'Hackathon Hub',
      description: 'Upcoming hackathons, prize pools, submission dates, and team formation opportunities.',
      category: 'Opportunities',
      icon: <Trophy size={22} />,
      path: '/hackathons',
      badge: 'Live Tracker',
    },
    {
      id: 7,
      title: 'Announcements',
      description: 'Departmental notices, campus tech events, workshop alerts, and critical updates.',
      category: 'Updates',
      icon: <Megaphone size={22} />,
      path: '/announcements',
    },
    {
      id: 8,
      title: 'AI Career Chatbot',
      description: 'Intelligent career counseling, resume feedback, and domain roadmapping assistant.',
      category: 'AI Powered',
      icon: <BotMessageSquare size={22} />,
      path: '/chatbot',
      badge: 'AI Assistant',
    },
    {
      id: 9,
      title: 'Personal Career Roadmap',
      description: 'Interactive milestone tracker tailored to your target graduation year and dream role.',
      category: 'Career',
      icon: <TrendingUp size={22} />,
      path: '/progress',
    },
    {
      id: 10,
      title: 'ATS Resume Builder',
      description: 'Engineered for tech recruiters with markdown export, LaTeX templates, and ATS scoring.',
      category: 'Career',
      icon: <FileText size={22} />,
      path: '/resume-builder',
      badge: 'Tool',
    },
    {
      id: 11,
      title: 'Global Search System',
      description: 'Instant Command-K search across all 20 modules, documentation, and practice problems.',
      category: 'Utility',
      icon: <Search size={22} />,
      path: '/search',
    },
    {
      id: 12,
      title: 'Unified Bookmark System',
      description: 'Save favorite courses, interview questions, hackathons, and roadmaps in custom folders.',
      category: 'Utility',
      icon: <Bookmark size={22} />,
      path: '/bookmarks',
    },
    {
      id: 13,
      title: 'Placement Hub',
      description: 'Company-specific hiring patterns, CTC breakdowns, eligibility criteria, and past drives.',
      category: 'Placement',
      icon: <Briefcase size={22} />,
      path: '/placement-hub',
      badge: 'High Value',
    },
    {
      id: 14,
      title: 'Interview Preparation',
      description: 'DSA patterns, System Design fundamentals, DBMS, OS, and Computer Network questions.',
      category: 'Placement',
      icon: <Layers size={22} />,
      path: '/interview-prep',
    },
    {
      id: 15,
      title: 'Coding Roadmaps',
      description: 'Visual step-by-step tracks: Fullstack, AI/ML, DevOps, Cyber Security, Systems & Cloud.',
      category: 'Roadmaps',
      icon: <Milestone size={22} />,
      path: '/roadmaps',
      badge: 'Interactive',
    },
    {
      id: 16,
      title: 'Skill Assessment',
      description: 'Timed MCQs, coding challenges, and mock technical evaluation with instant feedback.',
      category: 'Practice',
      icon: <HelpCircle size={22} />,
      path: '/assessments',
    },
    {
      id: 17,
      title: 'Student Dashboard',
      description: 'Central command center showing active roadmaps, daily streaks, bookmarks, and stats.',
      category: 'Dashboard',
      icon: <Compass size={22} />,
      path: '/dashboard',
    },
    {
      id: 18,
      title: 'Progress Tracking',
      description: 'Visual heatmaps, topic completion charts, and continuous readiness scores.',
      category: 'Analytics',
      icon: <Zap size={22} />,
      path: '/progress',
    },
    {
      id: 19,
      title: 'Notifications Hub',
      description: 'Real-time alerts for application deadlines, hackathons, and newly published notes.',
      category: 'Updates',
      icon: <Globe size={22} />,
      path: '/notifications',
    },
    {
      id: 20,
      title: 'Admin Panel',
      description: 'Role-based management for faculty and admins to curate content and broadcast drives.',
      category: 'Management',
      icon: <ShieldAlert size={22} />,
      path: '/admin',
      badge: 'Staff Only',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__badge-container">
          <Badge variant="brand" size="md" icon={<Sparkles size={14} />}>
            Production-Grade CSE Learning Ecosystem
          </Badge>
        </div>

        <h1 className="home-hero__title">
          Master Computer Science. <br />
          <span className="home-hero__title-accent">Accelerate Your Tech Career.</span>
        </h1>

        <p className="home-hero__subtitle">
          A centralized, open platform unifying 20 essential modules — from semester curriculum
          guides and curated YouTube resources to placement archives and ATS resume tooling.
        </p>

        <div className="home-hero__cta-group">
          <Link to="/about-cse">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Explore CSE Guide
            </Button>
          </Link>
          <Link to="/roadmaps">
            <Button variant="secondary" size="lg" leftIcon={<Milestone size={18} />}>
              View Career Roadmaps
            </Button>
          </Link>
        </div>

        {/* Foundation Metric Badges */}
        <div className="home-hero__metrics">
          <div className="home-hero__metric-pill">
            <CheckCircle size={16} className="home-hero__metric-icon" />
            <span>20 Interconnected Modules</span>
          </div>
          <div className="home-hero__metric-pill">
            <CheckCircle size={16} className="home-hero__metric-icon" />
            <span>Dark Green 60:30:10 Design</span>
          </div>
          <div className="home-hero__metric-pill">
            <CheckCircle size={16} className="home-hero__metric-icon" />
            <span>High-Performance REST Architecture</span>
          </div>
        </div>
      </section>

      {/* Modules Showcase Grid */}
      <section className="home-modules">
        <div className="home-modules__header">
          <div>
            <span className="home-modules__eyebrow">Comprehensive Platform Scope</span>
            <h2 className="home-modules__title">All 20 Centralized Modules</h2>
          </div>
          <p className="home-modules__desc">
            Explore every dimension of your computer science journey with curated paths, verified resources, and real-time placement tracking.
          </p>
        </div>

        <div className="home-modules__grid">
          {portalModules.map((mod) => (
            <Link to={mod.path} key={mod.id} className="home-module__link">
              <Card variant="default" interactive className="home-module__card">
                <CardBody>
                  <div className="home-module__top">
                    <div className="home-module__icon-box">
                      {mod.icon}
                    </div>
                    {mod.badge && (
                      <Badge variant="brand" size="sm">
                        {mod.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="home-module__meta">
                    <span className="home-module__category">{mod.category}</span>
                    <h3 className="home-module__card-title">{mod.title}</h3>
                    <p className="home-module__card-desc">{mod.description}</p>
                  </div>

                  <div className="home-module__footer">
                    <span className="home-module__action-text">Explore Module</span>
                    <ArrowRight size={14} className="home-module__action-arrow" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
