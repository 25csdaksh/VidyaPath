import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Sparkles,
  Map,
  Code,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Trophy,
  ArrowRight,
  Award,
  Layers,
  CheckCircle2,
  Zap,
  Shield,
  FileCheck,
  Terminal,
  Cpu,
  Globe,
  LogIn,
  UserPlus,
  PlayCircle,
  Compass,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Logo from '../components/common/Logo';

export const LandingPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If user is already logged in, take them straight into their student dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const pillars = [
    {
      title: '4-Year CSE Roadmap',
      desc: 'Semester 1 to 8 structured subject progression, core languages, credits & milestones.',
      icon: Map,
      badge: 'Sem 1 - 8',
    },
    {
      title: 'AI Study Advisor',
      desc: 'Instant personalized 4-week study timetables based on your year & target engineering role.',
      icon: Sparkles,
      badge: 'Smart Engine',
    },
    {
      title: '45+ Industry Projects',
      desc: 'Low, Medium & High difficulty projects with system architecture, schemas & API designs.',
      icon: Code,
      badge: 'Tier-1 Bank',
    },
    {
      title: '70+ Academic Textbooks',
      desc: 'Global standard textbooks (Cormen, Silberschatz, Kurose & Ross, Tanenbaum) with chapter guides.',
      icon: BookOpen,
      badge: 'Academic Bibles',
    },
    {
      title: '35+ Coursera Tracks',
      desc: 'Resume-friendly certifications from Google, IBM, Meta, Stanford & DeepLearning.AI.',
      icon: GraduationCap,
      badge: 'Verified Certs',
    },
    {
      title: 'Placement & Interview Hub',
      desc: '25-section interview master guide covering OA rounds, DSA, Core CS & STAR behavioral questions.',
      icon: Award,
      badge: 'SDE Hiring',
    },
    {
      title: 'ATS Resume Builder',
      desc: 'Construct 1-page high-impact technical resumes with Google XYZ bullet point formulas.',
      icon: FileCheck,
      badge: 'Google XYZ',
    },
    {
      title: 'Hackathon Playbook',
      desc: '36-hour sprint frameworks, idea validation, MVP architecture & 3-minute winning pitches.',
      icon: Trophy,
      badge: 'Winning Guide',
    },
  ];

  const fourYearArc = [
    {
      year: 'First Year (FY)',
      sub: 'Semesters 1 & 2',
      focus: 'Programming & Logic Foundations',
      tech: 'C, Python, Linux CLI, Git & GitHub, Calculus & Digital Logic',
      outcome: '50+ solved problems, personal portfolio website, 2 starter projects.',
    },
    {
      year: 'Second Year (SY)',
      sub: 'Semesters 3 & 4',
      focus: 'Core Computer Science & Systems',
      tech: 'DSA, DBMS & SQL, Operating Systems, OOP (Java/C++)',
      outcome: '150+ LeetCode problems, relational database systems, Jira board clone.',
    },
    {
      year: 'Third Year (TY)',
      sub: 'Semesters 5 & 6',
      focus: 'Specialization & Tier-1 Projects',
      tech: 'Full-Stack, Computer Networks, AI/ML, Cloud & DevOps, Docker',
      outcome: '2 Tier-1 production projects with Redis/Kafka, ATS resume, Summer Internship.',
    },
    {
      year: 'Final Year (4th)',
      sub: 'Semesters 7 & 8',
      focus: 'Placements & Capstone Engineering',
      tech: 'System Design (HLD/LLD), Distributed Systems, Microservices, Capstone',
      outcome: 'Tier-1 campus job conversion, major capstone project deployment.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* ========================================================
          TOP PUBLIC NAVBAR (SANTORINI DEEP NAVY GLASSMORPHIC)
          ======================================================== */}
      <header className="landing-header">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo size="md" />
        </Link>

        {/* Top Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outline"
              size="sm"
              icon={LogIn}
              style={{
                color: '#ffffff',
                borderColor: 'rgba(170, 192, 225, 0.4)',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '0.4rem 0.8rem',
              }}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              style={{
                background: 'linear-gradient(135deg, #184DA6 0%, #2566D9 100%)',
                color: '#ffffff',
                border: '1px solid #3B82F6',
                padding: '0.4rem 0.8rem',
              }}
            >
              Create Account
            </Button>
          </Link>
        </div>
      </header>

      {/* ========================================================
          MAIN HERO BANNER (HIGH CONTRAST & VISIBLE TYPOGRAPHY)
          ======================================================== */}
      <section className="landing-hero">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="landing-hero-badge">
            <Sparkles size={15} style={{ color: '#38BDF8', flexShrink: 0 }} />
            <span>The Definitive 4-Year CSE Career & Academic Architecture</span>
          </div>

          <h1 className="landing-hero-title">
            Empowering Computer Science Students to{' '}
            <span
              style={{
                color: '#38BDF8',
                textShadow: '0 0 35px rgba(56, 189, 248, 0.5)',
                fontWeight: 900,
                display: 'inline',
              }}
            >
              Build, Learn & Lead.
            </span>
          </h1>

          <p className="landing-hero-subtitle">
            Navigate your complete undergraduate journey from foundational coding in C/Python to core computer science (DSA, OS, DBMS), Tier-1 engineering projects, Coursera professional certifications, and product company placements.
          </p>

          {/* Hero Action Buttons */}
          <div className="landing-hero-actions">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="lg"
                icon={UserPlus}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #184DA6 0%, #2566D9 100%)',
                  border: '1px solid #60A5FA',
                  boxShadow: '0 8px 24px rgba(37, 102, 217, 0.45)',
                }}
              >
                Create Free Student Account
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                size="lg"
                icon={LogIn}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.45)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Sign In to Portal
              </Button>
            </Link>
          </div>

          {/* Key Feature Metric Badges (High Contrast Glass Pills) */}
          <div className="landing-metrics-grid">
            <div className="landing-metric-pill">
              <CheckCircle2 size={16} color="#38BDF8" style={{ flexShrink: 0 }} /> 4-Year Semester Roadmap (Sem 1-8)
            </div>
            <div className="landing-metric-pill">
              <CheckCircle2 size={16} color="#38BDF8" style={{ flexShrink: 0 }} /> 45+ Tier-1 Industry Projects
            </div>
            <div className="landing-metric-pill">
              <CheckCircle2 size={16} color="#38BDF8" style={{ flexShrink: 0 }} /> 70+ Global Standard Textbooks
            </div>
            <div className="landing-metric-pill">
              <CheckCircle2 size={16} color="#38BDF8" style={{ flexShrink: 0 }} /> 35+ Coursera Specializations
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PLATFORM CORE PILLARS GRID
          ======================================================== */}
      <section className="landing-pillars-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>Complete Ecosystem</Badge>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Everything a Computer Science Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            A curated, comprehensive suite of tools, curricula, project banks, and AI advisory to excel in engineering and campus placements.
          </p>
        </div>

        <div className="landing-pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={idx}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--navy-hero-gradient)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <Badge variant="neutral">{pillar.badge}</Badge>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          THE 4-YEAR UNDERGRADUATE PROGRESSION ARC
          ======================================================== */}
      <section className="landing-arc-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>Structured Progression</Badge>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              The 4-Year CSE Milestone Arc
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
              Clear semester objectives guiding you from beginner programmer to professional software engineer.
            </p>
          </div>

          <div className="landing-arc-grid">
            {fourYearArc.map((arc, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="primary">Year {idx + 1}</Badge>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{arc.sub}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {arc.year}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                  {arc.focus}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Key Tech: </strong>{arc.tech}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  🎯 <strong>Target: </strong>{arc.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CALL TO ACTION (CTA)
          ======================================================== */}
      <section className="landing-cta-section">
        <div className="landing-cta-box">
          <Badge
            variant="primary"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              display: 'inline-flex',
            }}
          >
            <Zap size={14} style={{ marginRight: '4px' }} /> Start Your Engineering Sprint
          </Badge>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#ffffff',
            }}
          >
            Ready to Master Your 4-Year CSE Journey?
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '680px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.6,
            }}
          >
            Create your student account now to unlock the interactive roadmap, AI study advisor, project banks, and placement interview master guides.
          </p>

          <div className="landing-hero-actions" style={{ marginBottom: 0 }}>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                variant="secondary"
                size="lg"
                icon={UserPlus}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff',
                  color: 'var(--primary-900)',
                  fontWeight: 800,
                }}
              >
                Create Free Student Account
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                size="lg"
                icon={LogIn}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOOTER
          ======================================================== */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Logo size="sm" />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--aegean-200)' }}>
            © {new Date().getFullYear()} VidyaPath CSE Career & Academic Platform. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" style={{ color: 'var(--aegean-200)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
              Log In
            </Link>
            <Link to="/register" style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
