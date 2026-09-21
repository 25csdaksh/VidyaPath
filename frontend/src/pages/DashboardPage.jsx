import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Map,
  Code,
  HelpCircle,
  Award,
  Bookmark,
  TrendingUp,
  Flame,
  ArrowRight,
  CheckCircle2,
  Clock,
  User,
  ExternalLink,
  Target,
  Briefcase,
  Building2,
  Layers,
  Folder,
  Bell,
  Eye,
  GitBranch,
  PlayCircle,
  BookOpen,
  Calendar,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import dashboardService from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails } from '../utils/errorHandler';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await dashboardService.getDashboardMetrics();
      setMetrics(res.data || res);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'Project':
        return <Code size={14} />;
      case 'Book':
        return <BookOpen size={14} />;
      case 'YouTube':
        return <PlayCircle size={14} />;
      case 'Roadmap':
        return <Map size={14} />;
      case 'InterviewQuestion':
        return <HelpCircle size={14} />;
      default:
        return <Eye size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome & Navigation Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant="primary"><Sparkles size={14} /> Student Dashboard</Badge>
            <Badge variant="neutral">{user?.role === 'admin' ? 'Administrator' : 'CSE Undergrad'}</Badge>
            {metrics?.activitySummary?.currentStreak > 0 && (
              <Badge variant="warning">
                <Flame size={13} style={{ marginRight: '4px' }} />
                {metrics.activitySummary.currentStreak} Day Streak
              </Badge>
            )}
          </div>
          <h1>Welcome back, {user?.name || 'Engineer'}!</h1>
          <p>
            Track your semester curriculum progress, active projects, interview readiness, and personalized career goals.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/bookmarks">
            <Button variant="outline" size="sm" icon={Folder}>
              My Collections ({metrics?.bookmarks?.totalCount || 0})
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" icon={User}>
              Edit Profile
            </Button>
          </Link>
          <Link to="/roadmap">
            <Button variant="primary" size="sm" icon={Map}>
              Continue Roadmap
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={140} variant="rounded" />
          <div className="stats-grid">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} height={110} variant="rounded" />
            ))}
          </div>
          <div className="cards-grid-2">
            <Skeleton height={320} variant="rounded" />
            <Skeleton height={320} variant="rounded" />
          </div>
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchDashboardData} />
      ) : !metrics ? (
        <EmptyState
          title="No Dashboard Data Available"
          message="Start exploring roadmaps and projects to generate activity metrics."
          actionLabel="Explore Roadmap"
          onAction={() => window.location.assign('/roadmap')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Pillar 10: Career Goal & Target Vision Card */}
          <Card style={{ padding: '1.75rem', background: 'var(--aegean-50)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Target size={18} color="var(--primary-800)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary-800)' }}>
                    Active Career Target
                  </span>
                </div>

                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {metrics.profile?.careerGoal || metrics.profile?.targetRole || 'Define Your Target Engineering Role'}
                </h2>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {metrics.profile?.targetRole
                    ? `Aiming for ${metrics.profile.targetRole} positions • Class of ${metrics.profile.graduationYear || '2026'}`
                    : 'Set your dream job role and target companies in your profile to tailor your personalized study plan.'}
                </p>

                {metrics.profile?.targetCompanies && metrics.profile.targetCompanies.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building2 size={13} /> Dream Companies:
                    </span>
                    {metrics.profile.targetCompanies.map((comp, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          background: 'var(--bg-secondary)',
                          color: 'var(--primary-800)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          boxShadow: 'var(--shadow-xs)',
                        }}
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Link to="/profile">
                  <Button variant="primary" size="sm" icon={Target}>
                    {metrics.profile?.careerGoal ? 'Update Goal' : 'Set Career Goal'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Quick Metrics Stats Grid */}
          <div className="stats-grid">
            <div className="stat-metric-card">
              <div className="stat-metric-icon">
                <Map size={24} />
              </div>
              <div>
                <div className="stat-metric-val">{metrics.roadmapProgress?.overallPercentage || 0}%</div>
                <div className="stat-metric-lbl">Curriculum Completed</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon">
                <HelpCircle size={24} />
              </div>
              <div>
                <div className="stat-metric-val">{metrics.interviewProgress?.totalPracticed || 0}</div>
                <div className="stat-metric-lbl">Interview Questions</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon">
                <Code size={24} />
              </div>
              <div>
                <div className="stat-metric-val">{metrics.projectProgress?.totalTracked || 0}</div>
                <div className="stat-metric-lbl">Tracked Projects ({metrics.projectProgress?.completedCount || 0} Deployed)</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                <Flame size={24} />
              </div>
              <div>
                <div className="stat-metric-val">{metrics.activitySummary?.currentStreak || 1} Days</div>
                <div className="stat-metric-lbl">Learning Streak (Best: {metrics.activitySummary?.longestStreak || 1}d)</div>
              </div>
            </div>
          </div>

          {/* Pillar 4: In-Progress & Tracked Projects Section */}
          <Card style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code size={20} color="var(--primary-800)" /> In-Progress Portfolio Projects
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Your live build stages, repository links, and custom milestones saved in your account.
                </p>
              </div>
              <Link to="/projects">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Browse Project Hub
                </Button>
              </Link>
            </div>

            {(!metrics.projectProgress?.items || metrics.projectProgress.items.length === 0) ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <Code size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Projects Tracked Yet</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Choose a Tier-1 project from our catalog, track your build stages (Planning, Building, Testing, Deployed), and link your GitHub repository.
                </p>
                <Link to="/projects">
                  <Button variant="primary" size="sm">Explore Projects</Button>
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {metrics.projectProgress.items.map((item) => {
                  const proj = item.project || {};
                  const statusColors = {
                    Planning: 'neutral',
                    Building: 'primary',
                    Testing: 'warning',
                    Deployed: 'success',
                    Completed: 'success',
                  };

                  return (
                    <div
                      key={item._id}
                      style={{
                        padding: '1.25rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge variant={statusColors[item.status] || 'primary'}>{item.status}</Badge>
                        <Badge variant="neutral">{proj.difficulty || 'Intermediate'}</Badge>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {proj.title || 'Portfolio Project'}
                        </h3>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Category: {proj.category || 'Full Stack'}
                        </p>
                      </div>

                      {item.completedMilestones && item.completedMilestones.length > 0 && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={13} color="var(--primary-700)" />
                          {item.completedMilestones.length} Milestones Completed
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.8rem', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                        {item.customRepoUrl && (
                          <a
                            href={item.customRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontWeight: 600 }}
                          >
                            <GitBranch size={14} /> Repo
                          </a>
                        )}
                        {item.liveDemoUrl && (
                          <a
                            href={item.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-800)', fontWeight: 600 }}
                          >
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                        <Link
                          to={`/projects/${proj.slug || ''}`}
                          style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-800)', fontWeight: 700 }}
                        >
                          Update Build <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* 2-Column Placement Readiness & Profile Breakdown */}
          <div className="cards-grid-2">
            {/* Placement Readiness Breakdown */}
            <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="var(--primary-800)" /> Placement Readiness Scores
                </h2>
                <Badge variant="primary">Target 80%+</Badge>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Data Structures & Algorithms</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                      {metrics.interviewProgress?.readinessScores?.dsaScore || 20}%
                    </span>
                  </div>
                  <ProgressBar progress={metrics.interviewProgress?.readinessScores?.dsaScore || 20} size="sm" variant="primary" />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Core CS Fundamentals (DBMS, OS, CN)</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                      {metrics.interviewProgress?.readinessScores?.coreCsScore || 30}%
                    </span>
                  </div>
                  <ProgressBar progress={metrics.interviewProgress?.readinessScores?.coreCsScore || 30} size="sm" variant="primary" />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Tier-1 Project Portfolio</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                      {metrics.interviewProgress?.readinessScores?.projectsScore || 15}%
                    </span>
                  </div>
                  <ProgressBar progress={metrics.interviewProgress?.readinessScores?.projectsScore || 15} size="sm" variant="primary" />
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/interview-practice">
                  <Button variant="outline" size="sm" icon={HelpCircle}>
                    Practice Questions
                  </Button>
                </Link>
                <Link to="/placement-hub">
                  <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                    Full Strategy
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Profile Completion & Academic Summary */}
            <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={20} color="var(--primary-800)" /> Profile & Academic Status
                </h2>
                <Badge variant={metrics.profileCompletion?.isComplete ? 'success' : 'warning'}>
                  {metrics.profileCompletion?.percentage || 30}% Complete
                </Badge>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <ProgressBar progress={metrics.profileCompletion?.percentage || 30} size="md" variant="primary" />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.75rem', lineHeight: 1.5 }}>
                  {metrics.profile?.college
                    ? `${metrics.profile.college} • Semester ${metrics.profile.semester || 1} • ${metrics.profile.specialization || 'General CSE'}`
                    : 'Add your university details, competitive programming handles, and skills to personalize recommendations.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Folder size={18} color="var(--primary-800)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Saved in Collections</span>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {metrics.bookmarks?.totalCount || 0}
                </span>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <Link to="/profile">
                  <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                    Complete Profile Details
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Pillar 7: Dynamic Tailored Recommendations */}
          {metrics.recommendedNextActions && metrics.recommendedNextActions.length > 0 && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} color="var(--primary-800)" /> Recommended Next Steps For You
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Personalized milestones calculated from your academic progress and career targets.
                </p>
              </div>

              <div className="cards-grid-3">
                {metrics.recommendedNextActions.map((act, idx) => (
                  <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Badge variant={act.priority === 'High' ? 'danger' : 'primary'}>{act.type}</Badge>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: act.priority === 'High' ? 'var(--color-danger)' : 'var(--primary-800)' }}>
                        {act.priority} Priority
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{act.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, flex: 1 }}>
                      {act.description}
                    </p>
                    <Link to={act.actionUrl?.startsWith('/api') ? act.actionUrl.replace('/api', '') : act.actionUrl}>
                      <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                        Execute Action
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pillar 8: Recently Viewed Resources */}
          {metrics.recentlyViewed && metrics.recentlyViewed.length > 0 && (
            <div>
              <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={20} color="var(--primary-800)" /> Recently Viewed Resources
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Quickly jump back into the textbooks, roadmaps, and project architectures you recently studied.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {metrics.recentlyViewed.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.url || '/'}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        padding: '1.2rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-600)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge variant="primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {getResourceTypeIcon(item.resourceType)}
                          {item.resourceType}
                        </Badge>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Clock size={11} /> {formatTimeAgo(item.viewedAt)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        {item.title || 'Learning Resource'}
                      </h4>

                      {item.category && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {item.category}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

