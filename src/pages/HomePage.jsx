import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Map,
  Code,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Trophy,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Search,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import ErrorState from '../components/feedback/ErrorState';
import ProjectCard from '../components/cards/ProjectCard';
import projectService from '../services/projectService';
import announcementService from '../services/announcementService';
import { getErrorDetails } from '../utils/errorHandler';

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [projRes, annRes] = await Promise.all([
        projectService.getProjects({ limit: 3, sort: '-stars' }),
        announcementService.getAnnouncements({ limit: 3 }),
      ]);
      setFeaturedProjects(projRes.data || []);
      setAnnouncements(annRes.data || []);
    } catch (err) {
      setError(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const featureCards = [
    {
      title: '4-Year CSE Roadmap',
      desc: 'Semester-by-semester structured curriculum guide from 1st year to placement season.',
      icon: Map,
      link: '/roadmap',
      badge: 'Sem 1 - 8',
    },
    {
      title: 'Tier-1 Project Hub',
      desc: 'Production-ready software projects with system architecture, database schemas & API contracts.',
      icon: Code,
      link: '/projects',
      badge: 'Real-World',
    },
    {
      title: 'Placement Interview Prep',
      desc: 'Top interview questions in DBMS, OS, Computer Networks, DSA & System Design.',
      icon: HelpCircle,
      link: '/interviews',
      badge: 'Curated',
    },
    {
      title: 'International Textbooks',
      desc: 'Definitive international CS textbooks (Cormen, Silberschatz, Tanenbaum, Russell & Norvig).',
      icon: BookOpen,
      link: '/books',
      badge: 'Academic',
    },
    {
      title: 'Coursera & Specializations',
      desc: '35 subject-wise certifications mapped across 4 years from Google, IBM, Meta, Stanford & DeepLearning.AI.',
      icon: GraduationCap,
      link: '/courses',
      badge: '35 Certs',
    },
    {
      title: 'Hackathon Playbook',
      desc: 'Live competitions, problem themes, team formation guides, and prize details.',
      icon: Trophy,
      link: '/hackathons',
      badge: 'Live Hub',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section className="hero-banner">
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <Badge variant="primary" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
            <Sparkles size={14} /> VidyaPath • Official CSE Career & Curriculum Portal
          </Badge>
          <h1 className="hero-title">
            Master Computer Science from <span>Day One</span> to <span>Dream Job</span>.
          </h1>
          <p className="hero-subtitle">
            Curated 8-semester roadmaps, industry-standard architecture blueprints, DSA interview question banks, and placement preparation built exclusively for CSE engineers.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                  Open Student Dashboard ({user?.name})
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                    Create Free Student Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.6)' }}>
                    Student Sign In
                  </Button>
                </Link>
              </>
            )}
            <Link to="/roadmap">
              <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
                View 4-Year Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights / Metric Stats */}
      <section className="stats-grid">
        <div className="stat-metric-card">
          <div className="stat-metric-icon">
            <Layers size={26} />
          </div>
          <div>
            <div className="stat-metric-val">8 Semesters</div>
            <div className="stat-metric-lbl">Complete Curriculum Roadmap</div>
          </div>
        </div>
        <div className="stat-metric-card">
          <div className="stat-metric-icon">
            <Code size={26} />
          </div>
          <div>
            <div className="stat-metric-val">Tier-1</div>
            <div className="stat-metric-lbl">Production Ready Projects</div>
          </div>
        </div>
        <div className="stat-metric-card">
          <div className="stat-metric-icon">
            <Award size={26} />
          </div>
          <div>
            <div className="stat-metric-val">100+ Core Qs</div>
            <div className="stat-metric-lbl">DBMS, OS, CN & DSA</div>
          </div>
        </div>
        <div className="stat-metric-card">
          <div className="stat-metric-icon">
            <TrendingUp size={26} />
          </div>
          <div>
            <div className="stat-metric-val">Placement Ready</div>
            <div className="stat-metric-lbl">Resume & ATS Blueprint</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Comprehensive CSE Modules
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Tailored engineering pathways to help you excel academically and professionally.
          </p>
        </div>

        <div className="cards-grid-3">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link to={feat.link} key={feat.title} style={{ textDecoration: 'none' }}>
                <Card interactive style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary-800)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <Badge variant="primary">{feat.badge}</Badge>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {feat.desc}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Dynamic Section */}
      <section>
        <div className="page-header-flex" style={{ marginBottom: '1.5rem' }}>
          <div className="page-header-content">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Featured Real-World Projects
            </h2>
            <p>Industry-grade systems with complete architecture diagrams, database designs & API contracts.</p>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Explore All Projects
            </Button>
          </Link>
        </div>

        {/* 4 States Handling */}
        {isLoading ? (
          <div className="cards-grid-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} height={280} variant="rounded" />
            ))}
          </div>
        ) : error ? (
          <ErrorState error={error} onRetry={fetchHomeData} />
        ) : featuredProjects.length === 0 ? (
          <Card style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No featured projects available at this moment.
          </Card>
        ) : (
          <div className="cards-grid-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Announcements Dynamic Section */}
      {announcements.length > 0 && (
        <section>
          <div className="page-header-flex" style={{ marginBottom: '1.5rem' }}>
            <div className="page-header-content">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Official Campus & Placement Announcements
              </h2>
              <p>Key academic schedules, hackathon deadlines, and hiring updates.</p>
            </div>
            <Link to="/announcements">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Announcements
              </Button>
            </Link>
          </div>

          <div className="cards-grid-3">
            {announcements.map((ann) => (
              <Card key={ann._id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant={ann.priority === 'High' ? 'danger' : 'info'}>{ann.category || 'General'}</Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ann.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
                  {ann.description}
                </p>
                {ann.actionUrl && (
                  <a href={ann.actionUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                      Read More
                    </Button>
                  </a>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
