import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Terminal,
  Cpu,
  Database,
  Network,
  Shield,
  BrainCircuit,
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const AboutCsePage = () => {
  const pillars = [
    {
      title: 'Algorithms & Computation',
      icon: Terminal,
      desc: 'Mastery of time/space complexity analysis, data structures, graph algorithms, dynamic programming, and computational thinking.',
      tags: ['DSA', 'Complexity Analysis', 'Discrete Math'],
    },
    {
      title: 'Systems & Hardware Interface',
      icon: Cpu,
      desc: 'Understanding how code executes on physical machines: digital logic, instruction set architecture (ISA), memory hierarchies, and OS kernels.',
      tags: ['Computer Architecture', 'OS', 'Compilers'],
    },
    {
      title: 'Data & Distributed Architecture',
      icon: Database,
      desc: 'Designing scalable transactional databases, relational schemas, indexing strategies, caching layers, and distributed consensus.',
      tags: ['DBMS', 'SQL/NoSQL', 'Distributed Systems'],
    },
    {
      title: 'Networking & Security',
      icon: Network,
      desc: 'Deep knowledge of OSI/TCP-IP stacks, transport protocols, socket programming, cryptography, authentication, and cybersecurity.',
      tags: ['Computer Networks', 'TCP/IP', 'Cybersecurity'],
    },
    {
      title: 'Modern AI & Machine Intelligence',
      icon: BrainCircuit,
      desc: 'Mathematical foundations of machine learning, neural networks, computer vision, natural language processing, and deep learning architectures.',
      tags: ['Machine Learning', 'Deep Learning', 'Data Science'],
    },
    {
      title: 'Engineering Best Practices',
      icon: Code,
      desc: 'Software design patterns, clean code principles, CI/CD pipelines, containerization, microservices architecture, and code reviews.',
      tags: ['System Design', 'DevOps', 'Docker/K8s'],
    },
  ];

  const careerTracks = [
    {
      role: 'Software Development Engineer (SDE)',
      focus: 'High-throughput backend services, full-stack web applications, scalable APIs, and performance optimization.',
      demand: 'Extremely High',
    },
    {
      role: 'Cloud & DevOps Engineer',
      focus: 'Infrastructure as code (Terraform), Kubernetes orchestration, cloud services (AWS/GCP/Azure), and CI/CD pipelines.',
      demand: 'High',
    },
    {
      role: 'Machine Learning / AI Engineer',
      focus: 'Training ML models, deploying inference microservices, vector search pipelines, and LLM orchestration.',
      demand: 'Exponential Growth',
    },
    {
      role: 'Systems & Embedded Engineer',
      focus: 'Kernel development, device drivers, low-latency C++ programming, real-time operating systems (RTOS), and IoT.',
      demand: 'High Specialized',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Header Banner */}
      <section className="hero-banner" style={{ background: 'var(--navy-hero-gradient)' }}>
        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
          <Badge variant="primary" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
            <Compass size={14} /> Computer Science & Engineering Discipline
          </Badge>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            The Science, Architecture, and Engineering of Computing.
          </h1>
          <p className="hero-subtitle">
            Computer Science & Engineering is not just learning syntax — it is the rigorous study of computation, system design, architectural scalability, and building technology that transforms industries.
          </p>
          <div className="hero-actions">
            <Link to="/roadmap">
              <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore 8-Semester Roadmap
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)' }}>
                View Industry Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Year Progression Overview */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            The 4-Year Undergraduate CSE Arc
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>How a student evolves from beginner programmer to professional software engineer.</p>
        </div>

        <div className="cards-grid-4">
          <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #166534' }}>
            <Badge variant="primary">Year 1 • Sem 1 & 2</Badge>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Foundations & Logic</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Procedural programming in C/C++, discrete mathematics, basic data structures, Linux command line, and Git version control.
            </p>
          </Card>

          <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #15803d' }}>
            <Badge variant="primary">Year 2 • Sem 3 & 4</Badge>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Core Computer Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Advanced Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Operating Systems, DBMS & SQL, and Computer Architecture.
            </p>
          </Card>

          <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #047857' }}>
            <Badge variant="primary">Year 3 • Sem 5 & 6</Badge>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Specialization & Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Computer Networks, Compiler Design, Distributed Systems, Cloud Computing, Full-Stack Development, and Summer Internship Prep.
            </p>
          </Card>

          <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #b45309' }}>
            <Badge variant="warning">Year 4 • Sem 7 & 8</Badge>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Capstone & Placements</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Major Capstone Project, System Design interviews, mock technical screenings, advanced electives (AI/ML/Security), and campus placements.
            </p>
          </Card>
        </div>
      </section>

      {/* Core Academic Pillars */}
      <section>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Core Pillars of Computer Science
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>The foundational academic disciplines that define world-class computer engineering.</p>
        </div>

        <div className="cards-grid-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--primary-100)',
                      color: 'var(--primary-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pillar.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, flex: 1 }}>
                  {pillar.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {pillar.tags.map((t) => (
                    <Badge key={t} variant="neutral">{t}</Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Major Career Pathways */}
      <section>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Prominent Career Opportunities
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>What high-impact roles awaits CSE graduates across global technology leaders.</p>
        </div>

        <div className="cards-grid-2">
          {careerTracks.map((track) => (
            <Card key={track.role} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{track.role}</h3>
                <Badge variant="success">{track.demand}</Badge>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.55 }}>
                {track.focus}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutCsePage;
