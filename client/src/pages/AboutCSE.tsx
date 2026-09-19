import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  Cpu,
  Database,
  Globe2,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import './AboutCSE.css';

export const AboutCSE: React.FC = () => {
  const corePillars = [
    {
      title: 'Data Structures & Algorithms',
      icon: <Terminal size={20} />,
      desc: 'The fundamental building block for computational problem-solving, time-complexity analysis, and coding interviews.',
      topics: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Greedy Algorithms'],
    },
    {
      title: 'Database Management Systems',
      icon: <Database size={20} />,
      desc: 'Relational data modeling, SQL indexing, ACID properties, normalization, NoSQL storage, and distributed architectures.',
      topics: ['SQL & Schema Design', 'Indexes & Query Optimization', 'Transactions (ACID)', 'MongoDB & Redis'],
    },
    {
      title: 'Operating Systems & Concurrency',
      icon: <Cpu size={20} />,
      desc: 'Process lifecycle, multithreading, memory virtualization, kernel architecture, paging, and IPC protocols.',
      topics: ['Threads & Semaphores', 'Virtual Memory', 'CPU Scheduling', 'File Systems'],
    },
    {
      title: 'Computer Networks',
      icon: <Globe2 size={20} />,
      desc: 'OSI 7-Layer model, TCP/IP stack, routing protocols, DNS resolution, HTTP/HTTPS, WebSockets, and network security.',
      topics: ['TCP / UDP', 'HTTP/3 & WebSockets', 'DNS & TLS Handshake', 'Load Balancing'],
    },
  ];

  const specializationTracks = [
    {
      title: 'Full-Stack Software Engineering',
      demand: 'Extremely High',
      skills: ['React/Next.js', 'Node.js/Go/Java', 'PostgreSQL/MongoDB', 'Docker & CI/CD'],
      roles: ['Frontend Engineer', 'Backend Engineer', 'Full-Stack Developer'],
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      demand: 'High Growth',
      skills: ['Python', 'PyTorch/TensorFlow', 'LLM Prompting/Fine-tuning', 'Vector Databases'],
      roles: ['ML Engineer', 'Data Scientist', 'AI Research Assistant'],
    },
    {
      title: 'Cloud & DevOps Engineering',
      demand: 'High Demand',
      skills: ['AWS/GCP', 'Kubernetes', 'Terraform (IaC)', 'Observability & Linux'],
      roles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)'],
    },
    {
      title: 'Cybersecurity & InfoSec',
      demand: 'High Demand',
      skills: ['Ethical Hacking', 'Cryptography', 'Network Security', 'OWASP Top 10'],
      roles: ['Security Analyst', 'Penetration Tester', 'Security Engineer'],
    },
  ];

  return (
    <div className="about-cse-page">
      <PageHeader
        title="About Computer Science Engineering"
        description="Comprehensive guide to the CSE degree, foundational pillars, career specializations, and industry expectations."
        badge={<Badge variant="brand">Academic & Career Guide</Badge>}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About CSE' },
        ]}
      />

      {/* Intro Overview Card */}
      <section className="about-cse__overview">
        <Card variant="brand">
          <CardBody>
            <div className="about-cse__intro-grid">
              <div>
                <span className="about-cse__tag">Discipline Overview</span>
                <h2>What is Computer Science Engineering?</h2>
                <p>
                  Computer Science Engineering (CSE) is an interdisciplinary branch that integrates computer software
                  and hardware engineering. It encompasses theoretical foundations of information, algorithm design,
                  system architectures, artificial intelligence, and scalable software application development.
                </p>
              </div>
              <div className="about-cse__quick-stats">
                <div className="about-cse__stat-item">
                  <span className="about-cse__stat-val">4</span>
                  <span className="about-cse__stat-label">Years of Rigorous Study</span>
                </div>
                <div className="about-cse__stat-item">
                  <span className="about-cse__stat-val">8</span>
                  <span className="about-cse__stat-label">Curated Semesters</span>
                </div>
                <div className="about-cse__stat-item">
                  <span className="about-cse__stat-val">100+</span>
                  <span className="about-cse__stat-label">Career Specializations</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* 4 Core Pillars */}
      <section className="about-cse__section">
        <div className="about-cse__section-header">
          <span className="about-cse__eyebrow">Academic Foundation</span>
          <h2>The Four Core Pillars of CS</h2>
          <p>These subjects form the bedrock of almost every technical interview and systems engineering role.</p>
        </div>

        <div className="about-cse__pillars-grid">
          {corePillars.map((pillar, idx) => (
            <Card key={idx} variant="default">
              <CardHeader>
                <div className="about-cse__pillar-icon">{pillar.icon}</div>
                <Badge variant="neutral" size="sm">Core Subject</Badge>
              </CardHeader>
              <CardBody>
                <h3 className="about-cse__pillar-title">{pillar.title}</h3>
                <p className="about-cse__pillar-desc">{pillar.desc}</p>
                <div className="about-cse__topics-list">
                  {pillar.topics.map((t, tIdx) => (
                    <div key={tIdx} className="about-cse__topic-item">
                      <CheckCircle2 size={14} className="about-cse__topic-check" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Specialization Tracks */}
      <section className="about-cse__section">
        <div className="about-cse__section-header">
          <span className="about-cse__eyebrow">Career Opportunities</span>
          <h2>Key Specialization Paths</h2>
          <p>Choose a focus area by your 3rd year to build deep projects and industry-ready skills.</p>
        </div>

        <div className="about-cse__tracks-grid">
          {specializationTracks.map((track, idx) => (
            <Card key={idx} variant="default" className="about-cse__track-card">
              <CardBody>
                <div className="about-cse__track-top">
                  <h3 className="about-cse__track-title">{track.title}</h3>
                  <Badge variant="success" size="sm">{track.demand}</Badge>
                </div>

                <div className="about-cse__track-block">
                  <span className="about-cse__block-label">Key Technologies:</span>
                  <div className="about-cse__pill-list">
                    {track.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="about-cse__skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="about-cse__track-block">
                  <span className="about-cse__block-label">Target Industry Roles:</span>
                  <p className="about-cse__roles-text">{track.roles.join(' • ')}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
