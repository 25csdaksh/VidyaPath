import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Server,
  Zap,
  Lock,
  Mail,
  User,
  Search as SearchIcon,
  Code,
  BookOpen,
  GraduationCap,
  Trophy,
  HelpCircle,
  Map,
  Layers,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

// Common Components
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Search from '../components/common/Search';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';
import Tabs from '../components/common/Tabs';
import Dropdown from '../components/common/Dropdown';
import Pagination from '../components/common/Pagination';
import Breadcrumb from '../components/common/Breadcrumb';
import Spinner from '../components/common/Spinner';
import Skeleton, { CardSkeleton } from '../components/common/Skeleton';

// Feedback Components
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';

// Domain Cards
import ProjectCard from '../components/cards/ProjectCard';
import CourseCard from '../components/cards/CourseCard';
import BookCard from '../components/cards/BookCard';
import HackathonCard from '../components/cards/HackathonCard';
import InterviewCard from '../components/cards/InterviewCard';
import RoadmapCard from '../components/cards/RoadmapCard';

import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const FoundationDemoPage = () => {
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  // State for interactive component demos
  const [activeTab, setActiveTab] = useState('buttons');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('Full Stack / Software Engineering');
  const [currentPage, setCurrentPage] = useState(1);
  const [progressVal, setProgressVal] = useState(65);
  const [healthStatus, setHealthStatus] = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);

  // Sample Mock Data for Domain Cards
  const sampleProject = {
    _id: 'p1',
    title: 'Real-Time Collaborative Code Editor',
    slug: 'realtime-collaborative-code-editor',
    category: 'Full Stack',
    difficulty: 'HIGH',
    description: 'Cloud-native multi-user collaborative IDE with OT/CRDT conflict resolution and code execution sandbox.',
    technologyStack: {
      frontend: ['React', 'TypeScript', 'Monaco Editor'],
      backend: ['Node.js', 'WebSockets', 'Redis'],
      database: ['MongoDB', 'PostgreSQL'],
    },
  };

  const sampleCourse = {
    _id: 'c1',
    title: 'Machine Learning Specialization',
    provider: 'Coursera',
    institution: 'Stanford University & DeepLearning.AI',
    difficulty: 'Intermediate',
    description: 'Master fundamental AI concepts and practical machine learning skills taught by Andrew Ng.',
    rating: 4.9,
    estimatedHours: 40,
    url: 'https://coursera.org',
  };

  const sampleBook = {
    _id: 'b1',
    title: 'Introduction to Algorithms (CLRS)',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    category: 'DSA',
    level: 'Intermediate',
    description: 'The definitive international benchmark textbook on algorithms, data structures, dynamic programming, and computational complexity.',
    publisher: 'MIT Press (4th Edition)',
    officialUrl: 'https://mitpress.mit.edu',
  };

  const sampleHackathon = {
    _id: 'h1',
    name: 'Smart India AI Innovation Hackathon 2026',
    organizer: 'AICTE & Ministry of Education',
    status: 'Upcoming',
    mode: 'Hybrid',
    description: 'Nationwide engineering competition solving open challenges in healthcare AI, smart governance, and cybersecurity.',
    registrationDeadline: new Date(Date.now() + 86400000 * 14).toISOString(),
    teamSize: '3-6 Members',
    prizeInformation: '₹10,00,000 Total Prize Pool',
    registrationUrl: 'https://sih.gov.in',
  };

  const sampleQuestion = {
    _id: 'q1',
    question: 'Explain ACID Properties in DBMS and how Isolation is implemented.',
    category: 'DBMS',
    topic: 'Transactions & Concurrency',
    difficulty: 'Medium',
    answer: 'ACID stands for Atomicity (all-or-nothing transactions), Consistency (invariants preserved), Isolation (concurrent execution gives same result as serial), and Durability (committed data survives crashes). Isolation is typically enforced via Two-Phase Locking (2PL) or Multi-Version Concurrency Control (MVCC).',
    keyTakeaways: [
      'Atomicity is managed by Write-Ahead Logging (WAL) / Undo logs.',
      'Isolation levels range from Read Uncommitted to Serializable.',
      'MVCC creates snapshot versions for readers avoiding blocking writes.',
    ],
  };

  const sampleRoadmap = {
    _id: 'r1',
    year: 'SY',
    semester: 3,
    title: 'Semester 3: Core DSA, OOP & Computer Networks',
    description: 'Master binary trees, graphs, object-oriented software engineering principles, and the 7-layer OSI networking stack.',
    subjects: [
      { name: 'Data Structures & Algorithms' },
      { name: 'Object-Oriented Programming (Java/C++)' },
      { name: 'Computer Networks' },
    ],
  };

  const checkBackendHealth = async () => {
    setHealthLoading(true);
    try {
      const res = await api.get('/health');
      setHealthStatus(res);
      toast.success('Backend API connected and healthy on port 5000.', 'Backend Online');
    } catch (err) {
      setHealthStatus({ error: err.message });
      toast.error('Could not connect to backend server at :5000', 'Connection Failed');
    } finally {
      setHealthLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const demoTabs = [
    { id: 'buttons', label: 'Buttons & Controls', icon: Zap },
    { id: 'cards', label: 'Domain Cards', icon: Layers, badge: '6 Cards' },
    { id: 'feedback', label: 'States & Modals', icon: HelpCircle },
    { id: 'navigation', label: 'Navigation & Tabs', icon: Map },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Breadcrumb Navigation Demo */}
      <Breadcrumb
        items={[
          { label: 'Developer Hub', link: '#' },
          { label: 'Design System', link: '#' },
          { label: 'Interactive Component Library' },
        ]}
      />

      {/* Header Banner */}
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Badge variant="primary">
            <Sparkles size={14} /> Design System Foundation
          </Badge>
          <Badge variant="success">60:30:10 Light Balance</Badge>
          <Badge variant="info">Dark Green Brand</Badge>
        </div>
        <h1 className="page-title">Reusable UI Component Library</h1>
        <p className="page-subtitle" style={{ maxWidth: '800px' }}>
          Clean, academic, professional, career-focused components built in Vanilla CSS without blue as the primary brand. Responsive across Mobile, Tablet, and Desktop.
        </p>
      </div>

      {/* Backend Connectivity Status Bar */}
      <Card style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                padding: '0.65rem',
                borderRadius: '10px',
                background: healthStatus?.success ? 'var(--color-success-bg)' : 'var(--bg-tertiary)',
                color: healthStatus?.success ? 'var(--primary-800)' : 'var(--text-muted)',
              }}
            >
              <Server size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Backend Service Integration</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Proxy: <code>/api</code> → <code>http://localhost:5000</code>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {healthStatus?.success ? (
              <Badge variant="success">API Online (200 OK)</Badge>
            ) : (
              <Badge variant="warning">Checking API...</Badge>
            )}
            <Button variant="outline" size="sm" loading={healthLoading} onClick={checkBackendHealth}>
              Ping Server
            </Button>
          </div>
        </div>
      </Card>

      {/* Component Category Tabs */}
      <Tabs tabs={demoTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: BUTTONS & CONTROLS */}
      {activeTab === 'buttons' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Buttons Showcase */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Button Variants (Dark Green Brand)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Button variant="primary">Primary (Forest Green)</Button>
              <Button variant="secondary">Secondary Neutral</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Action</Button>
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Button Sizes</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" size="md">Medium Button</Button>
              <Button variant="primary" size="lg">Large Button</Button>
            </div>
          </Card>

          {/* Inputs, Select, Search & Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Input & Search Fields</h3>
              <Input
                label="Student Name"
                placeholder="Enter your full name"
                icon={User}
                helperText="Required for certificates and resume export."
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="student@university.edu"
                icon={Mail}
              />
              <Search
                value={searchValue}
                onChange={setSearchValue}
                onClear={() => setSearchValue('')}
                placeholder="Search across all modules..."
              />
            </Card>

            <Card style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Select & Progress Bars</h3>
              <Select
                label="Engineering Specialization"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  'Full Stack / Software Engineering',
                  'AI / ML & Data Science',
                  'Cybersecurity & Networks',
                  'Cloud Computing / DevOps',
                  'Systems & Embedded Engineering',
                ]}
              />

              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ProgressBar
                  value={progressVal}
                  label="Semester 3 Roadmap Completion"
                  size="md"
                />
                <ProgressBar
                  value={90}
                  label="Interview Readiness Score"
                  variant="success"
                  size="sm"
                />
                <ProgressBar
                  value={45}
                  label="Project Milestone Progress"
                  variant="warning"
                  size="lg"
                />
              </div>
            </Card>
          </div>

          {/* Badges & Accolades */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Badges & Status Indicators</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              <Badge variant="primary"><Sparkles size={12} /> Primary Dark Green</Badge>
              <Badge variant="success"><CheckCircle2 size={12} /> Completed</Badge>
              <Badge variant="warning"><AlertTriangle size={12} /> Upcoming Deadline</Badge>
              <Badge variant="danger"><AlertCircle size={12} /> Hard Difficulty</Badge>
              <Badge variant="info"><Info size={12} /> Academic Certified</Badge>
              <Badge variant="secondary">Standard Resource</Badge>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: DOMAIN CARDS */}
      {activeTab === 'cards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Domain-Specific Reusable Cards</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '-1.5rem', fontSize: '0.925rem' }}>
            High-density, academic-grade card components with badges, tech tags, action triggers, and progress metrics.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* 1. ProjectCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>1. ProjectCard</h4>
              <ProjectCard project={sampleProject} onBookmark={() => toast.success('Project added to bookmarks.')} />
            </div>

            {/* 2. CourseCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>2. CourseCard</h4>
              <CourseCard course={sampleCourse} />
            </div>

            {/* 3. BookCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>3. BookCard</h4>
              <BookCard book={sampleBook} onBookmark={() => toast.success('Book bookmarked.')} />
            </div>

            {/* 4. HackathonCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>4. HackathonCard</h4>
              <HackathonCard hackathon={sampleHackathon} />
            </div>

            {/* 5. InterviewCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>5. InterviewCard</h4>
              <InterviewCard
                question={sampleQuestion}
                onMarkComplete={() => toast.success('Question marked as practiced! +5 Score')}
              />
            </div>

            {/* 6. RoadmapCard */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>6. RoadmapCard</h4>
              <RoadmapCard roadmap={sampleRoadmap} progressPercentage={65} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FEEDBACK, STATES & MODALS */}
      {activeTab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Toast Triggers */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>Toast Notifications</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Trigger animated feedback toasts with Dark Green success and structured alerts:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => toast.success('Semester 3 checkpoint recorded successfully.', 'Milestone Completed')}
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={AlertCircle}
                onClick={() => toast.error('Unauthorized access or invalid token.', 'Authentication Failed')}
              >
                Trigger Error Toast
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={AlertTriangle}
                onClick={() => toast.warning('Registration deadline closes in 48 hours.', 'Deadline Alert')}
              >
                Trigger Warning Toast
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Info}
                onClick={() => toast.info('New System Design guide available.', 'Curriculum Update')}
              >
                Trigger Info Toast
              </Button>
            </div>
          </Card>

          {/* Modal Trigger */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Modal Dialog</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Accessible modal dialog with body scroll locking, escape key listeners, and backdrop click actions.
            </p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Sample Modal Dialog
            </Button>
          </Card>

          {/* Modal Instance */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create Custom Bookmark Collection"
            footer={
              <>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    toast.success('Collection created successfully.');
                    setIsModalOpen(false);
                  }}
                >
                  Save Collection
                </Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input label="Collection Name" placeholder="e.g. FAANG Preparation Core" required />
              <Input label="Description" placeholder="Notes & reference problems..." />
            </div>
          </Modal>

          {/* Empty & Error States */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Empty State Pattern</h4>
              <EmptyState
                title="No Projects Saved"
                description="You have not bookmarked any Tier-1 project specifications yet."
                actionLabel="Explore Project Hub"
                onAction={() => toast.info('Navigating to Projects Hub...')}
              />
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Error State Pattern</h4>
              <ErrorState
                title="Unable to load interview questions"
                message="The connection to the question bank service timed out. Please try again."
                onRetry={() => toast.info('Retrying connection...')}
              />
            </div>
          </div>

          {/* Skeletons & Spinners */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Async Skeletons & Spinners</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: NAVIGATION, DROPDOWNS & PAGINATION */}
      {activeTab === 'navigation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Dropdown Menu Showcase */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Dropdown Menus</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Dropdown
                label="Filter by Semester"
                items={[
                  { label: 'Semester 1: Foundations', onClick: () => toast.info('Selected Semester 1') },
                  { label: 'Semester 2: Advanced C & Math', onClick: () => toast.info('Selected Semester 2') },
                  { label: 'Semester 3: Core DSA & OOP', onClick: () => toast.info('Selected Semester 3') },
                  { label: 'Semester 4: DBMS & OS', onClick: () => toast.info('Selected Semester 4') },
                  { divider: true },
                  { label: 'View All 8 Semesters', onClick: () => toast.info('Viewing all') },
                ]}
              />

              <Dropdown
                label="Sort Options"
                items={[
                  { label: 'Most Popular', onClick: () => toast.info('Sorted by Popularity') },
                  { label: 'Difficulty: High to Low', onClick: () => toast.info('Sorted by Difficulty') },
                  { label: 'Newest Additions', onClick: () => toast.info('Sorted by Newest') },
                ]}
              />
            </div>
          </Card>

          {/* Pagination Controls */}
          <Card style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pagination Control</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Current Page: <strong>{currentPage}</strong> of <strong>10</strong>
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={(p) => {
                setCurrentPage(p);
                toast.info(`Switched to page ${p}`);
              }}
              hasNextPage={currentPage < 10}
              hasPrevPage={currentPage > 1}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default FoundationDemoPage;
