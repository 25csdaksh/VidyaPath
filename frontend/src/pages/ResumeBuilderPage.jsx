import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  Download,
  Plus,
  Trash2,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import resumeService from '../services/resumeService';
import { getErrorDetails, extractErrorMessage } from '../utils/errorHandler';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ResumeBuilderPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Default empty resume model
  const createDefaultResume = () => ({
    title: 'Software Developer Resume',
    targetRole: 'Software Developer',
    header: {
      fullName: user?.name || 'Your Full Name',
      email: user?.email || 'email@example.com',
      phone: '+91 9876543210',
      location: 'Bangalore, India',
      githubUrl: 'https://github.com/username',
      linkedinUrl: 'https://linkedin.com/in/username',
      portfolioUrl: 'https://portfolio.dev',
    },
    summary: 'Proactive Computer Science Engineering student skilled in high-throughput backend services, distributed databases, and modern full-stack web architecture.',
    education: [
      {
        institution: 'National Institute of Technology',
        degree: 'B.Tech in Computer Science and Engineering',
        startYear: '2022',
        endYear: '2026',
        cgpaOrPercentage: '8.9 / 10.0',
        courseworkHighlights: ['DSA', 'OS', 'DBMS', 'Computer Networks'],
      },
    ],
    skills: {
      languages: ['C++', 'Java', 'Python', 'TypeScript', 'SQL'],
      frameworksAndLibraries: ['React.js', 'Node.js', 'Express', 'Spring Boot'],
      databasesAndStorage: ['PostgreSQL', 'MongoDB', 'Redis'],
      toolsAndCloud: ['Docker', 'AWS (S3, EC2)', 'Git', 'GitHub Actions', 'Linux'],
      coreConcepts: ['Data Structures & Algorithms', 'System Design', 'OOP', 'ACID Transactions'],
    },
    projects: [
      {
        title: 'Distributed Real-Time Collaboration Canvas',
        techStack: ['React', 'Node.js', 'Socket.IO', 'Redis', 'PostgreSQL'],
        githubLink: 'https://github.com/user/collab-canvas',
        liveLink: 'https://canvas-demo.vercel.app',
        bulletPoints: [
          'Engineered a low-latency collaborative drawing tool supporting 50+ concurrent editors with CRDT conflict resolution.',
          'Optimized WebSocket message broadcast throughput using Redis Pub/Sub, reducing sync lag to <35ms.',
          'Architected PostgreSQL persistence layer with indexed spatial queries for canvas snapshots.',
        ],
      },
    ],
    experience: [
      {
        role: 'Software Engineering Intern',
        company: 'CloudTech Solutions',
        location: 'Remote',
        startDate: 'Jun 2024',
        endDate: 'Aug 2024',
        isCurrent: false,
        bulletPoints: [
          'Developed 6 RESTful API endpoints for user analytics, processing 150,000+ daily telemetry events.',
          'Automated CI/CD deployment pipelines using GitHub Actions and AWS ECS, reducing deploy time by 60%.',
        ],
      },
    ],
    achievements: [
      {
        title: 'Global Hackathon Finalist',
        description: 'Ranked top 10 among 1,200+ teams in Smart India Hackathon for AI smart healthcare triage.',
        year: '2024',
      },
    ],
  });

  const fetchResumes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isAuthenticated) {
        // Fallback local resume for guest view
        const defaultR = createDefaultResume();
        setActiveResume(defaultR);
        setIsLoading(false);
        return;
      }

      const res = await resumeService.getUserResumes();
      const list = res.data || [];
      setResumes(list);

      if (list.length > 0) {
        setActiveResume(list[0]);
      } else {
        const defaultR = createDefaultResume();
        setActiveResume(defaultR);
      }
    } catch (err) {
      setError(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [isAuthenticated]);

  const handleSaveResume = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in to save your resume to your cloud account.', 'info');
      return;
    }

    setIsSaving(true);
    try {
      if (activeResume._id) {
        const res = await resumeService.updateResume(activeResume._id, activeResume);
        setActiveResume(res.data || activeResume);
        showToast('Resume saved successfully!', 'success');
      } else {
        const res = await resumeService.createResume(activeResume);
        const created = res.data || res;
        setActiveResume(created);
        setResumes((prev) => [created, ...prev]);
        showToast('New resume created and saved!', 'success');
      }
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to save resume.'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate dynamic ATS Score estimate
  const calculateAtsScore = () => {
    if (!activeResume) return 0;
    let score = 25; // Base layout structure
    if (activeResume.header?.fullName && activeResume.header?.email) score += 15;
    if (activeResume.header?.githubUrl || activeResume.header?.linkedinUrl) score += 15;
    if (activeResume.skills?.languages?.length > 3) score += 15;
    if (activeResume.projects?.length > 0) {
      score += 15;
      const hasBullets = activeResume.projects.some((p) => p.bulletPoints?.length > 1);
      if (hasBullets) score += 10;
    }
    if (activeResume.education?.length > 0) score += 5;
    return Math.min(100, score);
  };

  const atsScore = calculateAtsScore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><FileText size={14} /> ATS Resume Engine</Badge>
            <Badge variant="success">ATS Score: {atsScore}%</Badge>
          </div>
          <h1>Technical Resume Builder</h1>
          <p>
            Build, edit, and optimize your 1-page engineering resume with live ATS compliance preview.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="outline" icon={Printer} onClick={handlePrint}>
            Print / PDF
          </Button>
          <Button variant="primary" icon={Save} isLoading={isSaving} onClick={handleSaveResume}>
            Save Resume
          </Button>
        </div>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div className="resume-builder-grid">
          <Skeleton height={500} variant="rounded" />
          <Skeleton height={500} variant="rounded" />
        </div>
      ) : error ? (
        <ErrorState error={error} onRetry={fetchResumes} />
      ) : !activeResume ? (
        <EmptyState
          title="No Resume Initialized"
          message="Click below to start a new ATS-ready technical resume."
          actionLabel="Create Resume"
          onAction={() => setActiveResume(createDefaultResume())}
        />
      ) : (
        <div className="resume-builder-grid">
          {/* Left Column: Interactive Editor Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* ATS Score Card */}
            <Card style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderLeft: '4px solid #166534' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Estimated ATS Score</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-800)' }}>{atsScore} / 100</span>
              </div>
              <ProgressBar progress={atsScore} size="md" variant="primary" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {atsScore >= 85 ? 'Excellent ATS compliance! Ready for applications.' : 'Add quantified project impact and links to boost score.'}
              </div>
            </Card>

            {/* Header Info */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Full Name"
                  value={activeResume.header.fullName}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, fullName: e.target.value } })}
                />
                <Input
                  label="Email"
                  value={activeResume.header.email}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, email: e.target.value } })}
                />
                <Input
                  label="Phone"
                  value={activeResume.header.phone}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, phone: e.target.value } })}
                />
                <Input
                  label="Location"
                  value={activeResume.header.location}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, location: e.target.value } })}
                />
                <Input
                  label="GitHub URL"
                  value={activeResume.header.githubUrl}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, githubUrl: e.target.value } })}
                />
                <Input
                  label="LinkedIn URL"
                  value={activeResume.header.linkedinUrl}
                  onChange={(e) => setActiveResume({ ...activeResume, header: { ...activeResume.header, linkedinUrl: e.target.value } })}
                />
              </div>
            </Card>

            {/* Technical Skills */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Technical Skills (Comma Separated)</h3>
              <Input
                label="Languages"
                value={activeResume.skills?.languages?.join(', ') || ''}
                onChange={(e) => setActiveResume({
                  ...activeResume,
                  skills: { ...activeResume.skills, languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) },
                })}
              />
              <Input
                label="Frameworks & Libraries"
                value={activeResume.skills?.frameworksAndLibraries?.join(', ') || ''}
                onChange={(e) => setActiveResume({
                  ...activeResume,
                  skills: { ...activeResume.skills, frameworksAndLibraries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) },
                })}
              />
              <Input
                label="Databases & Cloud"
                value={activeResume.skills?.databasesAndStorage?.join(', ') || ''}
                onChange={(e) => setActiveResume({
                  ...activeResume,
                  skills: { ...activeResume.skills, databasesAndStorage: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) },
                })}
              />
            </Card>

            {/* Projects Editor */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Projects</h3>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  onClick={() => {
                    const newProj = {
                      title: 'New Real-World Project',
                      techStack: ['Node.js', 'PostgreSQL', 'Docker'],
                      githubLink: '',
                      liveLink: '',
                      bulletPoints: ['Engineered scalable backend service with XYZ formula.'],
                    };
                    setActiveResume({ ...activeResume, projects: [...(activeResume.projects || []), newProj] });
                  }}
                >
                  Add Project
                </Button>
              </div>

              {activeResume.projects?.map((proj, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                      label="Project Title"
                      value={proj.title}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        const updated = [...activeResume.projects];
                        updated[idx].title = e.target.value;
                        setActiveResume({ ...activeResume, projects: updated });
                      }}
                    />
                    <button
                      onClick={() => {
                        const updated = activeResume.projects.filter((_, i) => i !== idx);
                        setActiveResume({ ...activeResume, projects: updated });
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '8px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Input
                    label="Technologies (comma-separated)"
                    value={proj.techStack?.join(', ') || ''}
                    onChange={(e) => {
                      const updated = [...activeResume.projects];
                      updated[idx].techStack = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      setActiveResume({ ...activeResume, projects: updated });
                    }}
                  />
                  <Input
                    label="Bullet Points (one per line)"
                    type="text"
                    value={proj.bulletPoints?.join('\n') || ''}
                    onChange={(e) => {
                      const updated = [...activeResume.projects];
                      updated[idx].bulletPoints = e.target.value.split('\n').filter(Boolean);
                      setActiveResume({ ...activeResume, projects: updated });
                    }}
                  />
                </div>
              ))}
            </Card>
          </div>

          {/* Right Column: Live Sheet Preview */}
          <div>
            <div className="resume-preview-sheet" id="printable-resume">
              {/* Header */}
              <div className="resume-header-preview">
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                  {activeResume.header.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeResume.header.phone && <span>{activeResume.header.phone}</span>}
                  {activeResume.header.email && <span>• {activeResume.header.email}</span>}
                  {activeResume.header.location && <span>• {activeResume.header.location}</span>}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem', fontWeight: 600 }}>
                  {activeResume.header.githubUrl && <span>GitHub</span>}
                  {activeResume.header.linkedinUrl && <span>• LinkedIn</span>}
                  {activeResume.header.portfolioUrl && <span>• Portfolio</span>}
                </div>
              </div>

              {/* Education */}
              {activeResume.education && activeResume.education.length > 0 && (
                <div className="resume-section-preview">
                  <div className="resume-section-heading">Education</div>
                  {activeResume.education.map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                        <span>{edu.institution}</span>
                        <span>{edu.startYear} - {edu.endYear}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                        <span>{edu.degree}</span>
                        <span>CGPA: {edu.cgpaOrPercentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Skills */}
              {activeResume.skills && (
                <div className="resume-section-preview">
                  <div className="resume-section-heading">Technical Skills</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {activeResume.skills.languages?.length > 0 && (
                      <div><strong>Languages: </strong>{activeResume.skills.languages.join(', ')}</div>
                    )}
                    {activeResume.skills.frameworksAndLibraries?.length > 0 && (
                      <div><strong>Frameworks & Libraries: </strong>{activeResume.skills.frameworksAndLibraries.join(', ')}</div>
                    )}
                    {activeResume.skills.databasesAndStorage?.length > 0 && (
                      <div><strong>Databases & Cloud: </strong>{activeResume.skills.databasesAndStorage.join(', ')}</div>
                    )}
                    {activeResume.skills.coreConcepts?.length > 0 && (
                      <div><strong>Core Concepts: </strong>{activeResume.skills.coreConcepts.join(', ')}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {activeResume.projects && activeResume.projects.length > 0 && (
                <div className="resume-section-preview">
                  <div className="resume-section-heading">Key Technical Projects</div>
                  {activeResume.projects.map((proj, idx) => (
                    <div key={idx} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                        <span>{proj.title} | <span style={{ fontWeight: 400, color: '#475569', fontSize: '0.825rem' }}>{proj.techStack?.join(', ')}</span></span>
                      </div>
                      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', lineHeight: 1.5, color: '#334155', marginTop: '0.25rem' }}>
                        {proj.bulletPoints?.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {activeResume.experience && activeResume.experience.length > 0 && (
                <div className="resume-section-preview">
                  <div className="resume-section-heading">Experience & Internships</div>
                  {activeResume.experience.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                        <span>{exp.role} — {exp.company}</span>
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', lineHeight: 1.5, color: '#334155', marginTop: '0.25rem' }}>
                        {exp.bulletPoints?.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderPage;
