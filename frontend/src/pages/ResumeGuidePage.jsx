import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code,
  Zap,
  Target,
  Award,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const ResumeGuidePage = () => {
  const actionVerbs = [
    { cat: 'Development & Architecture', verbs: ['Architected', 'Engineered', 'Developed', 'Spearheaded', 'Constructed', 'Refactored'] },
    { cat: 'Performance & Optimization', verbs: ['Optimized', 'Accelerated', 'Reduced', 'Enhanced', 'Minimized', 'Streamlined'] },
    { cat: 'DevOps & Scaling', verbs: ['Containerized', 'Automated', 'Deployed', 'Orchestrated', 'Integrated', 'Provisioned'] },
    { cat: 'Data & Intelligence', verbs: ['Trained', 'Indexed', 'Analyzed', 'Evaluated', 'Synthesized', 'Aggregated'] },
  ];

  const xyzExamples = [
    {
      bad: 'Built an e-commerce website using React and Node.js.',
      good: 'Engineered a full-stack e-commerce platform using React, Node.js, and Redis caching, reducing page load latency by 42% for 10,000+ simulated concurrent requests.',
    },
    {
      bad: 'Created a machine learning model for image classification.',
      good: 'Fine-tuned a ResNet-50 computer vision pipeline in PyTorch, achieving 94.6% validation accuracy and deployed inference endpoint with <80ms P99 latency via Docker.',
    },
    {
      bad: 'Worked on database queries and API optimization.',
      good: 'Optimized PostgreSQL indexing and connection pooling, decreasing database query execution time from 1.2s to 180ms across 50,000 daily active user records.',
    },
  ];

  const atsRules = [
    { title: 'Single-Column Clean Layout', desc: 'ATS parsers read top-to-bottom, left-to-right. Multi-column tables often scramble parsed text.' },
    { title: 'Standard Section Headings', desc: 'Use clear names: Technical Skills, Work Experience, Projects, Education, Certifications.' },
    { title: 'Verifiable Live & Repo Links', desc: 'Ensure GitHub repositories and live deployments (Vercel/Render) are hyperlinked cleanly.' },
    { title: 'Quantifiable Metrics', desc: 'Always quantify impact with numbers: %, ms latency, active users, RPS (requests per second).' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Banner */}
      <section className="hero-banner" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #166534 50%, #14532d 100%)' }}>
        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          <Badge variant="primary" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
            <FileText size={14} /> Resume Architecture & ATS Blueprint
          </Badge>
          <h1 className="hero-title">
            The CSE Engineering Resume Blueprint
          </h1>
          <p className="hero-subtitle">
            How to craft a 1-page high-impact technical resume that breezes through Applicant Tracking Systems (ATS) and lands top product interviews.
          </p>
          <div className="hero-actions">
            <Link to="/resumes">
              <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                Launch Live Resume Builder
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.6)' }}>
                View Project Formulas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Google XYZ Formula Section */}
      <section>
        <div style={{ marginBottom: '2rem' }}>
          <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>Core Writing Formula</Badge>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            The Google XYZ Bullet Point Formula
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Every bullet point on your resume should follow: <strong>"Accomplished [X], as measured by [Y], by doing [Z]"</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {xyzExamples.map((ex, idx) => (
            <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--color-danger)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', background: 'var(--color-danger-bg)', padding: '2px 8px', borderRadius: '4px' }}>AVOID</span>
                <span style={{ fontSize: '0.925rem' }}>{ex.bad}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--primary-800)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', background: 'var(--primary-100)', padding: '2px 8px', borderRadius: '4px' }}>RECOMMENDED</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 }}>{ex.good}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* High-Impact Action Verbs */}
      <section>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            High-Impact Technical Action Verbs
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Start each bullet point with powerful active engineering verbs.</p>
        </div>

        <div className="cards-grid-2">
          {actionVerbs.map((v) => (
            <Card key={v.cat} style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{v.cat}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {v.verbs.map((verb) => (
                  <Badge key={verb} variant="primary" style={{ fontSize: '0.85rem' }}>{verb}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ATS Compliance Rules */}
      <section>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            ATS Parser Optimization Rules
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Ensure your resume achieves a 90%+ pass rate on modern Applicant Tracking Systems.</p>
        </div>

        <div className="cards-grid-2">
          {atsRules.map((rule, idx) => (
            <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary-800)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.title}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {rule.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeGuidePage;
