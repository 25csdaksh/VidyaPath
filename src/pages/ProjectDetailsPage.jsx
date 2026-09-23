import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Code,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle2,
  Server,
  Database,
  Layers,
  ShieldCheck,
  TestTube,
  Rocket,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import Input from '../components/common/Input';
import ProgressBar from '../components/common/ProgressBar';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import projectService from '../services/projectService';
import dashboardService from '../services/dashboardService';
import { useBookmarks } from '../hooks/useBookmarks';
import { useProjectProgress } from '../hooks/useProjectProgress';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails } from '../utils/errorHandler';

export const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const { isBookmarked, toggleBookmark } = useBookmarks('Project');
  const { progress, updateProgress, isSaving } = useProjectProgress(project?._id);

  // Local form state for tracker
  const [trackerStatus, setTrackerStatus] = useState('Idea');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const fetchProjectDetails = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await projectService.getProjectBySlug(slug);
      const proj = res.data || res;
      setProject(proj);

      // Record in Recently Viewed
      if (proj && proj._id) {
        dashboardService.recordRecentView({
          resourceType: 'Project',
          resourceId: proj._id,
          title: proj.title,
          category: proj.category,
          url: `/projects/${proj.slug}`,
        }).catch(() => {});
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [slug]);

  // Sync progress state when loaded
  useEffect(() => {
    if (progress) {
      if (progress.status) setTrackerStatus(progress.status);
      if (progress.customRepoUrl) setRepoUrl(progress.customRepoUrl);
      if (progress.liveDemoUrl) setDemoUrl(progress.liveDemoUrl);
      if (progress.studentNotes) setNotes(progress.studentNotes);
    }
  }, [progress]);

  const handleSaveProgress = async (e) => {
    e.preventDefault();
    if (!project?._id) return;
    await updateProgress({
      projectId: project._id,
      status: trackerStatus,
      customRepoUrl: repoUrl,
      liveDemoUrl: demoUrl,
      studentNotes: notes,
    });
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case 'LOW':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'HIGH':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Back Link */}
      <div>
        <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Project Hub
        </Link>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={180} variant="rounded" />
          <div className="project-detail-layout">
            <Skeleton height={400} variant="rounded" />
            <Skeleton height={400} variant="rounded" />
          </div>
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchProjectDetails} />
      ) : !project ? (
        <EmptyState
          title="Project Not Found"
          message="We could not find the requested software project."
          actionLabel="Browse All Projects"
          onAction={() => window.location.assign('/projects')}
        />
      ) : (
        <>
          {/* Project Title Header Banner */}
          <Card style={{ padding: '2.5rem 2rem', background: 'var(--bg-secondary)', borderLeft: '6px solid #166534' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <Badge variant="primary">{project.category}</Badge>
                  <Badge variant={getDifficultyVariant(project.difficulty)}>
                    {project.difficulty} Difficulty
                  </Badge>
                  {project.status && <Badge variant="neutral">{project.status}</Badge>}
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {project.title}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '800px' }}>
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button
                  variant={isBookmarked(project._id) ? 'primary' : 'outline'}
                  icon={Bookmark}
                  onClick={() => toggleBookmark(project, 'Project')}
                >
                  {isBookmarked(project._id) ? 'Bookmarked' : 'Save Project'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Main 2-Column Details Layout */}
          <div className="project-detail-layout">
            {/* Left Column: Architecture, APIs, Features */}
            <div>
              {/* Problem Statement */}
              <div className="detail-section-box">
                <h2 className="detail-section-title">
                  <FileText size={20} color="var(--primary-800)" /> Problem Statement & Target Users
                </h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  {project.problemStatement}
                </div>
                {project.targetUsers && (
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Target Audience: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{project.targetUsers}</span>
                  </div>
                )}
              </div>

              {/* Core Features */}
              {project.features && project.features.length > 0 && (
                <div className="detail-section-box">
                  <h2 className="detail-section-title">
                    <Layers size={20} color="var(--primary-800)" /> Key Production Features
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {project.features.map((feat, idx) => (
                      <div key={idx} style={{ padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                          {feat.title}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {feat.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Architecture */}
              {project.architecture && (
                <div className="detail-section-box">
                  <h2 className="detail-section-title">
                    <Server size={20} color="var(--primary-800)" /> System Architecture Design
                  </h2>
                  {project.architecture.pattern && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Architectural Pattern: </span>
                      <Badge variant="primary">{project.architecture.pattern}</Badge>
                    </div>
                  )}
                  {project.architecture.overview && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {project.architecture.overview}
                    </p>
                  )}
                  {project.architecture.diagramNotes && (
                    <div className="code-snippet-box">
                      {project.architecture.diagramNotes}
                    </div>
                  )}
                </div>
              )}

              {/* API Endpoints Contract */}
              {project.apiRequirements && project.apiRequirements.length > 0 && (
                <div className="detail-section-box">
                  <h2 className="detail-section-title">
                    <Code size={20} color="var(--primary-800)" /> REST API Specifications
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {project.apiRequirements.map((api, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Badge variant={api.method === 'GET' ? 'success' : api.method === 'POST' ? 'primary' : 'warning'}>
                            {api.method}
                          </Badge>
                          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600 }}>
                            {api.endpoint}
                          </code>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {api.description} {api.authRequired && <Badge variant="neutral" style={{ marginLeft: '0.4rem' }}>Auth</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume Talking Points */}
              {project.resumeGuidance && (
                <div className="detail-section-box">
                  <h2 className="detail-section-title">
                    <Rocket size={20} color="var(--primary-800)" /> Resume Bullet Point Formulas
                  </h2>
                  {project.resumeGuidance.bulletPointTemplates && (
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {project.resumeGuidance.bulletPointTemplates.map((bullet, idx) => (
                        <li key={idx} style={{ marginBottom: '0.35rem' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {project.resumeGuidance.impactKeywords && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Impact Keywords:</span>
                      {project.resumeGuidance.impactKeywords.map((k) => (
                        <Badge key={k} variant="neutral">{k}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Interview Talking Points */}
              {project.interviewQuestions && project.interviewQuestions.length > 0 && (
                <div className="detail-section-box">
                  <h2 className="detail-section-title">
                    <HelpCircle size={20} color="var(--primary-800)" /> Technical Interview Questions & Talking Points
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {project.interviewQuestions.map((q, idx) => (
                      <div key={idx} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                          Q{idx + 1}: {q.question}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                          <strong>Expected Discussion: </strong>{q.expectedTalkingPoints}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Student Tracker, Technology Stack, Prerequisites, Security */}
            <div>
              {/* Student Build Progress Tracker */}
              <div className="detail-section-box" style={{ borderLeft: '4px solid #166534', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 className="detail-section-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Rocket size={18} color="var(--primary-800)" /> Build Progress Tracker
                  </h3>
                  <Badge variant={trackerStatus === 'Completed' || trackerStatus === 'Deployed' ? 'success' : 'primary'}>
                    {trackerStatus}
                  </Badge>
                </div>

                {isAuthenticated ? (
                  <form onSubmit={handleSaveProgress} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                        Build Status:
                      </label>
                      <select
                        value={trackerStatus}
                        onChange={(e) => setTrackerStatus(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                        }}
                      >
                        <option value="Idea">Idea / Reviewing Spec</option>
                        <option value="Planning">Planning & Architecture</option>
                        <option value="Building">Building & Coding (Active)</option>
                        <option value="Testing">Testing & Benchmarking</option>
                        <option value="Deployed">Deployed to Cloud / Staging</option>
                        <option value="Completed">Completed & Resume Ready</option>
                      </select>
                    </div>

                    <Input
                      label="Your GitHub Repo Link"
                      placeholder="https://github.com/username/project"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />

                    <Input
                      label="Live Demo Link"
                      placeholder="https://project-demo.vercel.app"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                    />

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                        Student Implementation Notes:
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Log architectural decisions, trade-offs, or challenges encountered..."
                        rows={2}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="sm" isLoading={isSaving} style={{ width: '100%', marginTop: '0.25rem' }}>
                      Save Project Progress
                    </Button>
                  </form>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '0.5rem 0' }}>
                    <p style={{ marginBottom: '0.75rem' }}>Sign in to track your build stages, milestone commits, and link your live demo.</p>
                    <Link to="/login">
                      <Button variant="outline" size="sm" style={{ width: '100%' }}>Sign In to Track</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Technology Stack */}
              {project.technologyStack && (
                <div className="detail-section-box">
                  <h3 className="detail-section-title">Tech Stack</h3>
                  {project.technologyStack.frontend && project.technologyStack.frontend.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>FRONTEND</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.technologyStack.frontend.map((t) => (
                          <Badge key={t} variant="primary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologyStack.backend && project.technologyStack.backend.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>BACKEND</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.technologyStack.backend.map((t) => (
                          <Badge key={t} variant="info">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologyStack.database && project.technologyStack.database.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>DATABASE & CACHING</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.technologyStack.database.map((t) => (
                          <Badge key={t} variant="success">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.technologyStack.devops && project.technologyStack.devops.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>DEVOPS & CLOUD</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.technologyStack.devops.map((t) => (
                          <Badge key={t} variant="neutral">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Prerequisites */}
              {project.prerequisites && project.prerequisites.length > 0 && (
                <div className="detail-section-box">
                  <h3 className="detail-section-title">Prerequisites</h3>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {project.prerequisites.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Security & Testing Guidelines */}
              {project.security && project.security.length > 0 && (
                <div className="detail-section-box">
                  <h3 className="detail-section-title">
                    <ShieldCheck size={18} color="var(--primary-800)" /> Security Guidelines
                  </h3>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {project.security.map((sec, idx) => (
                      <li key={idx}>{sec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testing Checklist */}
              {project.testing && project.testing.length > 0 && (
                <div className="detail-section-box">
                  <h3 className="detail-section-title">
                    <TestTube size={18} color="var(--primary-800)" /> Testing Standards
                  </h3>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {project.testing.map((test, idx) => (
                      <li key={idx}>{test}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
