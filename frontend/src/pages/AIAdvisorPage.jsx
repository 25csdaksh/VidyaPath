import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Video,
  Code,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Zap,
  Award,
  Layers,
  ChevronRight,
  Flame,
  Shield,
  Cpu,
  Globe,
  Terminal,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import advisorService from '../services/advisorService';

export const AIAdvisorPage = () => {
  // Form State
  const [academicYear, setAcademicYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [targetRole, setTargetRole] = useState('Software Development Engineer (SDE)');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [focusDomain, setFocusDomain] = useState('General CSE');

  // Generation & Result State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [activePlanTab, setActivePlanTab] = useState('timetable'); // 'timetable' | 'books' | 'courses' | 'youtube' | 'projects' | 'strategy'
  const [completedTasks, setCompletedTasks] = useState({});
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const roleOptions = [
    { id: 'Software Development Engineer (SDE)', label: 'Software Development Engineer (SDE)', icon: Code, desc: 'DSA, System Design, Core CS, Problem Solving' },
    { id: 'Full-Stack Web Developer', label: 'Full-Stack Web Developer', icon: Globe, desc: 'React, Node.js, Next.js, PostgreSQL, REST APIs' },
    { id: 'AI / Machine Learning Engineer', label: 'AI / Machine Learning Engineer', icon: Cpu, desc: 'Python, PyTorch, Math, Neural Networks, MLOps' },
    { id: 'Cloud & DevOps Engineer', label: 'Cloud & DevOps Engineer', icon: Terminal, desc: 'Docker, Kubernetes, AWS, CI/CD Pipelines, Linux' },
    { id: 'Cybersecurity & Network Analyst', label: 'Cybersecurity & Network Analyst', icon: Shield, desc: 'Network Protocols, Cryptography, OWASP, Linux' },
  ];

  const yearOptions = [
    { year: 1, label: '1st Year (FY)', sub: 'Sem 1 & 2 • Foundations & Programming', defaultSem: 1 },
    { year: 2, label: '2nd Year (SY)', sub: 'Sem 3 & 4 • Core CS, DSA, DBMS & OS', defaultSem: 3 },
    { year: 3, label: '3rd Year (TY)', sub: 'Sem 5 & 6 • Advanced Systems & Tier-1 Projects', defaultSem: 5 },
    { year: 4, label: '4th Year (Final)', sub: 'Sem 7 & 8 • Placements, System Design & Capstone', defaultSem: 7 },
  ];

  // Handle plan generation
  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setLoadingStep(1);

    const stepTimer1 = setTimeout(() => setLoadingStep(2), 500);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1000);

    try {
      const response = await advisorService.generateStudyPlan({
        year: academicYear,
        semester,
        targetRole,
        skillLevel,
        weeklyHours,
        focusDomain,
      });

      setTimeout(() => {
        setGeneratedPlan(response.data || response);
        setIsLoading(false);
      }, 1400);
    } catch (err) {
      console.error('Error generating study plan:', err);
      // Even if API network error occurs, fallback gracefully
      setIsLoading(false);
    }

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
    };
  };

  // Auto generate on initial mount with 1st Year defaults
  useEffect(() => {
    handleGeneratePlan();
  }, []);

  const toggleTask = (taskKey) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const handleCopyMarkdown = () => {
    if (!generatedPlan) return;
    const plan = generatedPlan;
    const md = `# Personalized CSE Study Plan: Year ${plan.studentProfile.academicYear} - ${plan.studentProfile.targetRole}
**Academic Level:** ${plan.phaseTitle}
**Weekly Commitment:** ${plan.studentProfile.weeklyHours} Hours/Week
**Skill Level:** ${plan.studentProfile.skillLevel}

## 🎯 KEY GOALS & MILESTONES
${plan.keyGoals?.map((g) => `- ${g}`).join('\n')}

## 📚 RECOMMENDED TEXTBOOKS
${plan.curatedResources?.books?.map((b) => `### ${b.title} (${b.edition || 'Latest'})\n- Author: ${b.author}\n- Chapters: ${b.recommendedChapters?.join(', ') || 'Core chapters'}`).join('\n\n')}

## 🎓 RECOMMENDED COURSERA COURSES
${plan.curatedResources?.courses?.map((c) => `- [${c.title}](${c.url}) (${c.offeredBy || c.platform})`).join('\n')}

## 📺 RECOMMENDED YOUTUBE PLAYLISTS
${plan.curatedResources?.youtube?.map((y) => `- ${y.topic} (${y.creator} - ${y.language})`).join('\n')}

## 🛠️ HANDS-ON PROJECTS
${plan.curatedResources?.projects?.map((p) => `### ${p.title} (${p.difficulty})\n- Tech Stack: ${p.techStack?.join(', ')}\n- Problem: ${p.problemStatement}`).join('\n\n')}

## 📅 4-WEEK ACTION TIMETABLE
${plan.fourWeekSchedule?.map((w) => `### Week ${w.weekNumber}: ${w.title}\nMilestone: ${w.milestone}\n${w.dailyTasks.map((t) => `- [ ] ${t.day}: ${t.task} (${t.type})`).join('\n')}`).join('\n\n')}
`;

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3.5rem' }}>
      {/* ========================================================
          HERO BANNER: SANTORINI AEGEAN & NAVY ACADEMIC ADVISOR
          ======================================================== */}
      <section
        className="hero-banner"
        style={{
          background: 'var(--navy-hero-gradient)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(170, 192, 225, 0.25)',
        }}
      >
        <div style={{ maxWidth: '880px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Badge
              variant="primary"
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              <Sparkles size={15} /> AI ACADEMIC & CAREER ADVISOR
            </Badge>
            <Badge
              variant="neutral"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'var(--aegean-200)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '0.82rem',
              }}
            >
              MongoDB Knowledge Engine • 100% Verified Resources
            </Badge>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#ffffff',
            }}
          >
            Personalized CSE Study & Roadmap Generator
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '820px',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            Get an instant, customized 4-week execution blueprint tailored to your current academic year and target engineering role. Pinpoints the exact textbook chapters, Coursera certificates, YouTube playlists, and portfolio projects to master.
          </p>

          {/* Quick Year Navigation Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {yearOptions.map((y) => (
              <button
                key={y.year}
                onClick={() => {
                  setAcademicYear(y.year);
                  setSemester(y.defaultSem);
                }}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: academicYear === y.year ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                  background: academicYear === y.year ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                  color: academicYear === y.year ? 'var(--primary-900)' : '#ffffff',
                  fontWeight: academicYear === y.year ? 800 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <GraduationCap size={15} />
                {y.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          STUDENT PREFERENCES & ONBOARDING SELECTOR CARD
          ======================================================== */}
      <Card style={{ padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Target size={22} color="var(--primary-800)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Configure Your Student Profile & Goals
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Academic Year & Semester */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Academic Year
            </label>
            <select
              value={academicYear}
              onChange={(e) => {
                const yr = Number(e.target.value);
                setAcademicYear(yr);
                setSemester(yr === 1 ? 1 : yr === 2 ? 3 : yr === 3 ? 5 : 7);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value={1}>1st Year (FY) - Foundations & Programming</option>
              <option value={2}>2nd Year (SY) - Core CSE, DSA, DBMS & OS</option>
              <option value={3}>3rd Year (TY) - Advanced Systems & Specializations</option>
              <option value={4}>4th Year (Final) - Placements, System Design & Capstone</option>
            </select>
          </div>

          {/* Target Career Role */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Target Engineering Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              {roleOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Level */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Current Skill Level
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSkillLevel(lvl)}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: skillLevel === lvl ? '2px solid var(--primary-800)' : '1px solid var(--border-color)',
                    background: skillLevel === lvl ? 'var(--primary-800)' : 'var(--bg-secondary)',
                    color: skillLevel === lvl ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Time Commitment */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Weekly Study Commitment: <span style={{ color: 'var(--primary-800)' }}>{weeklyHours} Hours/Week</span>
            </label>
            <input
              type="range"
              min={6}
              max={35}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-800)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span>6 hrs (Light)</span>
              <span>15 hrs (Standard)</span>
              <span>35 hrs (Intense Sprint)</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          <Button
            variant="primary"
            size="lg"
            icon={Sparkles}
            onClick={handleGeneratePlan}
            disabled={isLoading}
          >
            {isLoading ? 'Synthesizing Knowledge Base...' : 'Generate My Tailored Study Plan'}
          </Button>
        </div>
      </Card>

      {/* ========================================================
          LOADING STATE ANIMATION
          ======================================================== */}
      {isLoading && (
        <Card style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--aegean-100)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <Sparkles size={28} className="animate-spin" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Synthesizing Knowledge Base for Year {academicYear}...
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            {loadingStep === 1 && '1. Querying verified MongoDB curriculum database...'}
            {loadingStep === 2 && '2. Curating best global textbooks, Coursera tracks & YouTube playlists...'}
            {loadingStep === 3 && '3. Assembling personalized 4-week actionable daily timetable...'}
          </p>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <ProgressBar value={loadingStep === 1 ? 35 : loadingStep === 2 ? 70 : 95} variant="primary" showLabel={false} />
          </div>
        </Card>
      )}

      {/* ========================================================
          GENERATED PLAN DASHBOARD
          ======================================================== */}
      {!isLoading && generatedPlan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-800)' }}>
                {generatedPlan.phaseTitle}
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {generatedPlan.studentProfile.targetRole} Roadmap
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                size="sm"
                icon={copiedMarkdown ? Check : Copy}
                onClick={handleCopyMarkdown}
              >
                {copiedMarkdown ? 'Markdown Copied!' : 'Copy Plan (Markdown)'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Printer}
                onClick={handlePrint}
              >
                Print Plan
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={RotateCcw}
                onClick={handleGeneratePlan}
              >
                Refresh Plan
              </Button>
            </div>
          </div>

          {/* Target Role Focus & Strategy Card */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Zap size={18} color="var(--primary-800)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Weekly Time Allocation Strategy
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {generatedPlan.roleStrategy?.advice}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                  {generatedPlan.roleStrategy?.weeklyDSAHours || 5}h
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Problem Solving / DSA</div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                  {generatedPlan.roleStrategy?.weeklyDevHours || 6}h
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Practical Projects</div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                  {generatedPlan.roleStrategy?.weeklyTheoryHours || 4}h
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Core Textbooks / Theory</div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              borderBottom: '2px solid var(--border-color)',
              paddingBottom: '0.5rem',
            }}
          >
            {[
              { id: 'timetable', label: '📅 4-Week Action Timetable', icon: Calendar },
              { id: 'books', label: '📚 Recommended Textbooks & Chapters', icon: BookOpen },
              { id: 'courses', label: '🎓 Coursera Certifications', icon: GraduationCap },
              { id: 'youtube', label: '📺 YouTube Lecture Playlists', icon: Video },
              { id: 'projects', label: '🛠️ Hands-on Projects', icon: Code },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePlanTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlanTab(tab.id)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: isActive ? 'var(--primary-800)' : 'var(--bg-secondary)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================
              TAB 1: 4-WEEK ACTION TIMETABLE
              ======================================================== */}
          {activePlanTab === 'timetable' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {generatedPlan.fourWeekSchedule?.map((week) => (
                <Card key={week.weekNumber} style={{ padding: '1.75rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <Badge variant="primary">Week {week.weekNumber}</Badge>
                        <Badge variant="neutral">{week.theme}</Badge>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {week.title}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Clock size={15} color="var(--primary-800)" />
                      <span>Target: {week.weeklyTargetHours} Hours</span>
                    </div>
                  </div>

                  {/* Milestone Banner */}
                  <div
                    style={{
                      background: 'var(--aegean-50)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.88rem',
                      color: 'var(--primary-900)',
                      fontWeight: 600,
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--primary-800)" />
                    <span><strong>Sprint Milestone: </strong>{week.milestone}</span>
                  </div>

                  {/* Daily Tasks List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {week.dailyTasks?.map((task, idx) => {
                      const taskKey = `w${week.weekNumber}-t${idx}`;
                      const isDone = completedTasks[taskKey];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleTask(taskKey)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isDone ? 'var(--aegean-50)' : 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '4px',
                              border: isDone ? '2px solid var(--primary-800)' : '2px solid var(--border-color)',
                              background: isDone ? 'var(--primary-800)' : 'var(--bg-secondary)',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isDone && <Check size={14} />}
                          </div>

                          <div style={{ minWidth: '75px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                            {task.day}
                          </div>

                          <div
                            style={{
                              fontSize: '0.9rem',
                              color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                              textDecoration: isDone ? 'line-through' : 'none',
                              flex: 1,
                            }}
                          >
                            {task.task}
                          </div>

                          <Badge variant="neutral" style={{ fontSize: '0.75rem' }}>
                            {task.type}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 2: RECOMMENDED TEXTBOOKS & CHAPTERS
              ======================================================== */}
          {activePlanTab === 'books' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {generatedPlan.curatedResources?.books?.map((book, idx) => (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Badge variant="primary">{book.subjectName || 'Core CSE'}</Badge>
                    <Badge variant="neutral">{book.type || 'Textbook'}</Badge>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {book.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      By {book.author} • {book.edition || 'Global Edition'}
                    </div>
                  </div>

                  {book.whyRead && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      💡 {book.whyRead}
                    </p>
                  )}

                  {book.recommendedChapters && book.recommendedChapters.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        Key Priority Chapters to Read:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {book.recommendedChapters.map((ch, cIdx) => (
                          <div key={cIdx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <ChevronRight size={14} color="var(--primary-800)" />
                            <span>{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 3: COURSERA CERTIFICATIONS
              ======================================================== */}
          {activePlanTab === 'courses' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {generatedPlan.curatedResources?.courses?.map((course, idx) => (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">{course.platform || 'Coursera'}</Badge>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {course.duration || 'Self-Paced'}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {course.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Offered by: <strong>{course.offeredBy || 'Top University'}</strong>
                    </div>
                  </div>

                  {course.skills && course.skills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {course.skills.map((s, sIdx) => (
                        <Badge key={sIdx} variant="neutral" style={{ fontSize: '0.75rem' }}>{s}</Badge>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                    <a href={course.url || 'https://www.coursera.org'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right" style={{ width: '100%' }}>
                        Open on {course.platform || 'Coursera'}
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 4: YOUTUBE PLAYLISTS
              ======================================================== */}
          {activePlanTab === 'youtube' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {generatedPlan.curatedResources?.youtube?.map((yt, idx) => (
                <Card key={idx} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">
                      <Video size={13} style={{ marginRight: '4px' }} /> {yt.creator}
                    </Badge>
                    <Badge variant="neutral">{yt.language || 'English / Hindi'}</Badge>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {yt.topic}
                  </h3>

                  {yt.bestFor && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                      ⭐ <strong>Best for: </strong>{yt.bestFor}
                    </p>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(yt.searchQuery || `${yt.creator} ${yt.topic}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right" style={{ width: '100%' }}>
                        Search on YouTube
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 5: HANDS-ON PROJECTS
              ======================================================== */}
          {activePlanTab === 'projects' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {generatedPlan.curatedResources?.projects?.map((proj, idx) => (
                <Card key={idx} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="primary">{proj.domain || 'Practical CSE'}</Badge>
                    <Badge variant="neutral">Difficulty: {proj.difficulty}</Badge>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {proj.problemStatement}
                    </p>
                  </div>

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Tech Stack
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {proj.techStack.map((tech, tIdx) => (
                          <Badge key={tIdx} variant="neutral" style={{ fontSize: '0.78rem' }}>{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Key Architectural Deliverables
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {proj.keyFeatures.map((feat, fIdx) => (
                          <div key={fIdx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <ChevronRight size={14} color="var(--primary-800)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAdvisorPage;
