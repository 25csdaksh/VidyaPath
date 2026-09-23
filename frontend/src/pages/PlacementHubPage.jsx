import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  FileText,
  Rocket,
  Code,
  Layers,
  ArrowRight,
  TrendingUp,
  Shield,
  Building,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import PlacementMasterGuide from '../components/placement/PlacementMasterGuide';

export const PlacementHubPage = () => {
  const [viewMode, setViewMode] = useState('master-guide'); // 'master-guide' | 'recruitment-stages'

  const placementStages = [
    {
      stage: 'Phase 1',
      title: 'DSA & Algorithmic Problem Solving',
      timeframe: 'Months 1-3',
      desc: 'Master pattern recognition: Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, Trees, BFS/DFS Graphs, Dynamic Programming.',
      actionUrl: '/interviews',
      actionLabel: 'Practice DSA Questions',
    },
    {
      stage: 'Phase 2',
      title: 'Core Computer Science Fundamentals',
      timeframe: 'Months 3-4',
      desc: 'Lock in standard interview concepts: DBMS (ACID, Transactions, Indexing B-Trees), OS (Processes vs Threads, Mutex/Semaphore, Deadlocks), CN (TCP/IP, HTTP/HTTPS, DNS).',
      actionUrl: '/interviews',
      actionLabel: 'Revise Core CS',
    },
    {
      stage: 'Phase 3',
      title: 'Tier-1 Resume Projects & System Architecture',
      timeframe: 'Months 4-5',
      desc: 'Build 2 distinctive production systems with caching (Redis), asynchronous task queues (Kafka/RabbitMQ), and clean database schema designs.',
      actionUrl: '/projects',
      actionLabel: 'Browse Projects',
    },
    {
      stage: 'Phase 4',
      title: 'ATS Resume Construction & Project Formulas',
      timeframe: 'Month 5',
      desc: 'Format your resume with Google standard XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Test ATS compliance score.',
      actionUrl: '/resumes',
      actionLabel: 'Build ATS Resume',
    },
    {
      stage: 'Phase 5',
      title: 'Low-Level & High-Level System Design (LLD/HLD)',
      timeframe: 'Months 5-6',
      desc: 'OOP design patterns (Factory, Strategy, Observer, Singleton), schema design, rate limiters, URL shorteners, and distributed load balancers.',
      actionUrl: '/interviews',
      actionLabel: 'System Design Bank',
    },
    {
      stage: 'Phase 6',
      title: 'Mock Interviews & Behavioral STAR Responses',
      timeframe: 'Interview Season',
      desc: 'Behavioral responses structured with STAR (Situation, Task, Action, Result) methodology. Conflict resolution, leadership, and technical storytelling.',
      actionUrl: '/resume-guide',
      actionLabel: 'Read Behavioral Guide',
    },
  ];

  const hiringRounds = [
    {
      type: 'Online Assessment (OA)',
      duration: '60 - 90 Minutes',
      format: '2-3 DSA Coding Problems + Core CS / Aptitude MCQs',
      passCriteria: '100% test cases passed on optimal time/space complexity.',
    },
    {
      type: 'Technical Round 1 (DSA & Live Coding)',
      duration: '45 - 60 Minutes',
      format: 'Live problem solving on Google Docs or CoderPad with think-aloud explanation.',
      passCriteria: 'Clear communication, dry run tests, handling edge cases, optimal code.',
    },
    {
      type: 'Technical Round 2 (Projects & Core CS)',
      duration: '45 - 60 Minutes',
      format: 'Deep dive into resume project architecture, database queries, concurrency & OS.',
      passCriteria: 'Defending architectural trade-offs, indexing strategies, API designs.',
    },
    {
      type: 'Managerial & HR Round (Culture Fit)',
      duration: '30 - 45 Minutes',
      format: 'STAR behavioral questions, problem solving under ambiguity, career goals.',
      passCriteria: 'Structured communication, genuine curiosity, company culture alignment.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Top Toggle Switch between Master Guide and Recruitment Overview */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setViewMode('master-guide')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'master-guide' ? 'var(--primary-600)' : 'transparent',
              color: viewMode === 'master-guide' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: viewMode === 'master-guide' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <BookOpen size={16} />
            Interview Master Guide (25 Sections)
          </button>
          <button
            onClick={() => setViewMode('recruitment-stages')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'recruitment-stages' ? 'var(--primary-600)' : 'transparent',
              color: viewMode === 'recruitment-stages' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: viewMode === 'recruitment-stages' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <Building size={16} />
            Hiring Rounds & Stages
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/interviews">
            <Button variant="outline" size="sm" icon={Code}>
              Live Coding Q&As
            </Button>
          </Link>
          <Link to="/resumes">
            <Button variant="primary" size="sm" icon={FileText}>
              ATS Resume Builder
            </Button>
          </Link>
        </div>
      </div>

      {viewMode === 'master-guide' ? (
        /* Full 25-Section Master Guide */
        <PlacementMasterGuide />
      ) : (
        /* SDE Recruitment Pipeline & Stages */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Hero Banner */}
          <section className="hero-banner">
            <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
              <Badge variant="primary" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                <Award size={14} /> Career & Campus Recruitment
              </Badge>
              <h1 className="hero-title">
                The CSE Placement Master Strategy
              </h1>
              <p className="hero-subtitle">
                A battle-tested blueprint to crack on-campus placements, off-campus drives, and top product company software engineering interviews.
              </p>
              <div className="hero-actions">
                <Button variant="secondary" size="lg" icon={BookOpen} onClick={() => setViewMode('master-guide')}>
                  Open 25-Section Master Guide
                </Button>
                <Link to="/interviews">
                  <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.6)' }}>
                    Practice Technical Bank
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* 6-Phase Placement Roadmap */}
          <section>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                6-Phase Placement Preparation Blueprint
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>Follow this structured preparation sequence to achieve maximum readiness.</p>
            </div>

            <div className="cards-grid-3">
              {placementStages.map((stg) => (
                <Card key={stg.stage} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">{stg.stage}</Badge>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stg.timeframe}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {stg.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55 }}>
                      {stg.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                    <Link to={stg.actionUrl}>
                      <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                        {stg.actionLabel}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Placement Interview Rounds Breakdown */}
          <section>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Anatomy of SDE Recruitment Rounds
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>What interviewers evaluate across each stage of the hiring pipeline.</p>
            </div>

            <div className="cards-grid-2">
              {hiringRounds.map((round, idx) => (
                <Card key={idx} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{round.type}</h3>
                    <Badge variant="neutral">{round.duration}</Badge>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong>Format: </strong>{round.format}
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    Pass Criterion: <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{round.passCriteria}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PlacementHubPage;
