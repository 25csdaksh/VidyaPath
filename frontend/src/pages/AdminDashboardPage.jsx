import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  Users,
  Code,
  Map,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Video,
  FileText,
  Trophy,
  Bell,
  Cpu,
  Activity,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';

// Services
import adminService from '../services/adminService';
import projectService from '../services/projectService';
import roadmapService from '../services/roadmapService';
import interviewService from '../services/interviewService';
import bookService from '../services/bookService';
import courseService from '../services/courseService';
import youtubeService from '../services/youtubeService';
import resourceService from '../services/resourceService';
import hackathonService from '../services/hackathonService';
import announcementService from '../services/announcementService';

import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails, extractErrorMessage } from '../utils/errorHandler';

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modals & Action states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Form State for each Entity
  const [formData, setFormData] = useState({});

  // Module Definitions
  const modules = [
    { id: 'overview', label: 'Platform Overview', icon: Activity, count: null },
    { id: 'users', label: 'Users & Students', icon: Users, count: stats?.overview?.totalUsers },
    { id: 'projects', label: 'Projects', icon: Code, count: stats?.contentCatalog?.projects },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map, count: stats?.contentCatalog?.roadmaps },
    { id: 'interviews', label: 'Interview Questions', icon: HelpCircle, count: stats?.contentCatalog?.interviews },
    { id: 'books', label: 'Books', icon: BookOpen, count: stats?.contentCatalog?.books },
    { id: 'courses', label: 'Courses', icon: GraduationCap, count: stats?.contentCatalog?.courses },
    { id: 'youtube', label: 'YouTube Resources', icon: Video, count: stats?.contentCatalog?.youtube },
    { id: 'resources', label: 'Learning Resources', icon: FileText, count: stats?.contentCatalog?.resources },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy, count: stats?.contentCatalog?.hackathons },
    { id: 'announcements', label: 'Announcements', icon: Bell, count: stats?.contentCatalog?.announcements },
    { id: 'skills', label: 'Skill Taxonomy', icon: Cpu, count: stats?.contentCatalog?.skills },
    { id: 'audit-logs', label: 'Audit Trail', icon: Clock, count: null },
  ];

  // Load Platform Stats
  const loadStats = async () => {
    try {
      const res = await adminService.getStats();
      setStats(res.data || res);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  // Load Tab Data
  const loadTabData = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: meta.limit,
        search: searchQuery.trim() || undefined,
        category: filterCategory !== 'ALL' ? filterCategory : undefined,
      };

      if (activeTab === 'overview') {
        await loadStats();
        setItems([]);
      } else if (activeTab === 'users') {
        const res = await adminService.getUsers({
          ...params,
          role: filterCategory !== 'ALL' ? filterCategory : undefined,
          status: filterStatus !== 'ALL' ? filterStatus : undefined,
        });
        setItems(res.data || res.users || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'projects') {
        const res = await projectService.getProjects(params);
        setItems(res.data || res.projects || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'roadmaps') {
        const res = await roadmapService.getAllRoadmaps();
        const roadmaps = res.data || res || [];
        setItems(roadmaps);
        setMeta({ page: 1, limit: 50, total: roadmaps.length, totalPages: 1 });
      } else if (activeTab === 'interviews') {
        const res = await interviewService.getQuestions(params);
        setItems(res.data || res.questions || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'books') {
        const res = await bookService.getBooks(params);
        setItems(res.data || res.books || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'courses') {
        const res = await courseService.getCourses(params);
        setItems(res.data || res.courses || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'youtube') {
        const res = await youtubeService.getYouTubeResources(params);
        setItems(res.data || res.resources || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'resources') {
        const res = await resourceService.getResources(params);
        setItems(res.data || res.resources || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'hackathons') {
        const res = await hackathonService.getHackathons(params);
        setItems(res.data || res.hackathons || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'announcements') {
        const res = await announcementService.getAnnouncements(params);
        setItems(res.data || res.announcements || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'skills') {
        const res = await adminService.getSkills(params);
        setItems(res.data || res.skills || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      } else if (activeTab === 'audit-logs') {
        const res = await adminService.getAuditLogs(params);
        setItems(res.data || res.logs || []);
        setMeta(res.meta || { page, limit: 15, total: res.data?.length || 0, totalPages: 1 });
      }
    } catch (err) {
      setError(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery, filterCategory, filterStatus, meta.limit]);

  useEffect(() => {
    loadTabData(1);
  }, [activeTab, filterCategory, filterStatus]);

  // Search trigger
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadTabData(1);
  };

  // Toggle Publish / Active status
  const handleTogglePublish = async (item, resourceType) => {
    try {
      const res = await adminService.togglePublish(resourceType, item._id);
      showToast(`${resourceType} status updated successfully!`, 'success');
      loadTabData(meta.page);
      loadStats();
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to toggle status.'), 'error');
    }
  };

  // Toggle User Active Status
  const handleToggleUserStatus = async (userItem) => {
    try {
      await adminService.toggleUserStatus(userItem._id);
      showToast(`User status updated to ${userItem.isActive ? 'Inactive' : 'Active'}!`, 'success');
      loadTabData(meta.page);
      loadStats();
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to update user status.'), 'error');
    }
  };

  // Open Create Modal with clean defaults
  const handleOpenCreate = () => {
    if (activeTab === 'users') {
      setFormData({ name: '', email: '', password: 'Password@123', role: 'student', semester: 1 });
    } else if (activeTab === 'projects') {
      setFormData({
        title: '',
        category: 'Full Stack',
        difficulty: 'MEDIUM',
        description: '',
        problemStatement: '',
        targetUsers: 'Engineering Students',
      });
    } else if (activeTab === 'roadmaps') {
      setFormData({ year: 'FY', semester: 1, title: '', description: '' });
    } else if (activeTab === 'interviews') {
      setFormData({ question: '', answer: '', category: 'DBMS', topic: 'Indexing', difficulty: 'Medium' });
    } else if (activeTab === 'books') {
      setFormData({
        title: '',
        authors: 'Author Name',
        category: 'Operating Systems',
        level: 'Intermediate',
        description: '',
        officialUrl: 'https://example.com',
      });
    } else if (activeTab === 'courses') {
      setFormData({
        title: '',
        provider: 'Coursera',
        category: 'Algorithms',
        difficulty: 'Beginner',
        url: 'https://coursera.org',
        description: '',
      });
    } else if (activeTab === 'youtube') {
      setFormData({
        title: '',
        channelName: '',
        category: 'DSA',
        difficulty: 'Beginner',
        description: '',
        videoUrl: 'https://youtube.com',
      });
    } else if (activeTab === 'resources') {
      setFormData({
        title: '',
        type: 'cheat_sheet',
        category: 'DSA',
        difficulty: 'Beginner',
        url: 'https://example.com',
        description: '',
      });
    } else if (activeTab === 'hackathons') {
      setFormData({
        name: '',
        organizer: '',
        description: '',
        registrationUrl: '',
        startDate: '',
        endDate: '',
        registrationDeadline: '',
        mode: 'Online',
      });
    } else if (activeTab === 'announcements') {
      setFormData({ title: '', description: '', category: 'Placements', priority: 'normal', isBroadcast: true });
    } else if (activeTab === 'skills') {
      setFormData({ name: '', category: 'Programming Languages', description: '', icon: 'Code' });
    }
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      authors: Array.isArray(item.authors) ? item.authors.join(', ') : item.authors || '',
    });
    setIsEditModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (item) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  // Submit Create
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      if (typeof payload.authors === 'string') {
        payload.authors = payload.authors.split(',').map((a) => a.trim());
      }

      if (activeTab === 'users') await adminService.createUser(payload);
      else if (activeTab === 'projects') await projectService.createProject(payload);
      else if (activeTab === 'roadmaps') await roadmapService.createRoadmap(payload);
      else if (activeTab === 'interviews') await interviewService.createQuestion(payload);
      else if (activeTab === 'books') await bookService.createBook(payload);
      else if (activeTab === 'courses') await courseService.createCourse(payload);
      else if (activeTab === 'youtube') await youtubeService.createYouTubeResource(payload);
      else if (activeTab === 'resources') await resourceService.createResource(payload);
      else if (activeTab === 'hackathons') await hackathonService.createHackathon(payload);
      else if (activeTab === 'announcements') await announcementService.createAnnouncement(payload);
      else if (activeTab === 'skills') await adminService.createSkill(payload);

      showToast('Record created successfully!', 'success');
      setIsCreateModalOpen(false);
      loadTabData(1);
      loadStats();
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to create record.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      if (typeof payload.authors === 'string') {
        payload.authors = payload.authors.split(',').map((a) => a.trim());
      }

      const id = editingItem._id;
      if (activeTab === 'users') await adminService.updateUser(id, payload);
      else if (activeTab === 'projects') await projectService.updateProject(id, payload);
      else if (activeTab === 'roadmaps') await roadmapService.updateRoadmap(id, payload);
      else if (activeTab === 'interviews') await interviewService.updateQuestion(id, payload);
      else if (activeTab === 'books') await bookService.updateBook(id, payload);
      else if (activeTab === 'courses') await courseService.updateCourse(id, payload);
      else if (activeTab === 'youtube') await youtubeService.updateYouTubeResource(id, payload);
      else if (activeTab === 'resources') await resourceService.updateResource(id, payload);
      else if (activeTab === 'hackathons') await hackathonService.updateHackathon(id, payload);
      else if (activeTab === 'announcements') await announcementService.updateAnnouncement(id, payload);
      else if (activeTab === 'skills') await adminService.updateSkill(id, payload);

      showToast('Record updated successfully!', 'success');
      setIsEditModalOpen(false);
      loadTabData(meta.page);
      loadStats();
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to update record.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Delete
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsSubmitting(true);
    try {
      const id = deletingItem._id;
      if (activeTab === 'users') await adminService.deleteUser(id);
      else if (activeTab === 'projects') await projectService.deleteProject(id);
      else if (activeTab === 'roadmaps') await roadmapService.deleteRoadmap(id);
      else if (activeTab === 'interviews') await interviewService.deleteQuestion(id);
      else if (activeTab === 'books') await bookService.deleteBook(id);
      else if (activeTab === 'courses') await courseService.deleteCourse(id);
      else if (activeTab === 'youtube') await youtubeService.deleteYouTubeResource(id);
      else if (activeTab === 'resources') await resourceService.deleteResource(id);
      else if (activeTab === 'hackathons') await hackathonService.deleteHackathon(id);
      else if (activeTab === 'announcements') await announcementService.deleteAnnouncement(id);
      else if (activeTab === 'skills') await adminService.deleteSkill(id);

      showToast('Record deleted successfully.', 'success');
      setIsDeleteModalOpen(false);
      loadTabData(meta.page);
      loadStats();
    } catch (err) {
      showToast(extractErrorMessage(err, 'Failed to delete record.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEntityTitle = (item) => {
    return item?.title || item?.name || item?.question || item?.userName || 'Catalog Record';
  };

  const formatTimestamp = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minHeight: 'calc(100vh - 140px)' }}>
      {/* Header */}
      <div className="page-header-flex" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <Badge variant="primary"><ShieldAlert size={14} /> Admin Control Center</Badge>
            <Badge variant="success">Role: {user?.role?.toUpperCase()}</Badge>
            <Badge variant="neutral">Audit Logging: ACTIVE</Badge>
          </div>
          <h1>VidyaPath Platform Governance Hub</h1>
          <p>
            Complete administrative lifecycle management across 11 portal modules, student governance, catalog publishing, and security audit trail.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => { loadStats(); loadTabData(meta.page); }}>
            Refresh Data
          </Button>
          {activeTab !== 'overview' && activeTab !== 'audit-logs' && (
            <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenCreate}>
              Create New
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Module Tabs */}
      <div className="ai-mode-bar" style={{ padding: '0.25rem 0', overflowX: 'auto', borderBottom: '1px solid var(--border-color)' }}>
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeTab === m.id;
          return (
            <button
              key={m.id}
              className={`ai-mode-pill ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(m.id);
                setSearchQuery('');
                setFilterCategory('ALL');
                setFilterStatus('ALL');
              }}
            >
              <Icon size={14} />
              <span>{m.label}</span>
              {m.count !== null && m.count !== undefined && (
                <span className="badge badge-sm" style={{ marginLeft: '4px', fontSize: '0.7rem' }}>
                  {m.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Platform Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Metric Cards */}
          <div className="stats-grid">
            <div className="stat-metric-card">
              <div className="stat-metric-icon"><Users size={22} /></div>
              <div>
                <div className="stat-metric-val">{stats?.overview?.totalUsers || 0}</div>
                <div className="stat-metric-lbl">Registered Students & Users</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon"><Code size={22} /></div>
              <div>
                <div className="stat-metric-val">{stats?.contentCatalog?.projects || 0}</div>
                <div className="stat-metric-lbl">Managed Projects</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon"><HelpCircle size={22} /></div>
              <div>
                <div className="stat-metric-val">{stats?.contentCatalog?.interviews || 0}</div>
                <div className="stat-metric-lbl">Interview Questions</div>
              </div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                <Activity size={22} />
              </div>
              <div>
                <div className="stat-metric-val">100%</div>
                <div className="stat-metric-lbl">API & MongoDB Status</div>
              </div>
            </div>
          </div>

          {/* Catalog Metrics Grid */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Structured Content Catalog Counts
            </h3>
            <div className="cards-grid-4">
              {[
                { title: 'Roadmaps', count: stats?.contentCatalog?.roadmaps, icon: Map, tab: 'roadmaps' },
                { title: 'Standard Books', count: stats?.contentCatalog?.books, icon: BookOpen, tab: 'books' },
                { title: 'Online Courses', count: stats?.contentCatalog?.courses, icon: GraduationCap, tab: 'courses' },
                { title: 'YouTube Playlists', count: stats?.contentCatalog?.youtube, icon: Video, tab: 'youtube' },
                { title: 'Learning Resources', count: stats?.contentCatalog?.resources, icon: FileText, tab: 'resources' },
                { title: 'Hackathons', count: stats?.contentCatalog?.hackathons, icon: Trophy, tab: 'hackathons' },
                { title: 'Announcements', count: stats?.contentCatalog?.announcements, icon: Bell, tab: 'announcements' },
                { title: 'Skills Taxonomy', count: stats?.contentCatalog?.skills, icon: Cpu, tab: 'skills' },
              ].map((c, idx) => {
                const Icon = c.icon;
                return (
                  <Card
                    key={idx}
                    style={{ padding: '1.25rem', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
                    onClick={() => setActiveTab(c.tab)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.title}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '4px' }}>
                          {c.count || 0}
                        </div>
                      </div>
                      <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-100)', color: 'var(--primary-800)' }}>
                        <Icon size={20} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Audit Logs Overview */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Recent Governance Audit Trail
              </h3>
              <Button variant="outline" size="sm" icon={Clock} onClick={() => setActiveTab('audit-logs')}>
                View Full Audit Logs
              </Button>
            </div>

            {stats?.recentAuditLogs?.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>No audit events logged yet.</div>
            ) : (
              <Card style={{ overflowX: 'auto', padding: 0 }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Module</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Resource</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Admin</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentAuditLogs?.map((log) => (
                      <tr key={log._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <Badge variant={log.action === 'DELETE' ? 'danger' : log.action === 'CREATE' ? 'success' : 'primary'}>
                            {log.action}
                          </Badge>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{log.resourceType}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{log.resourceTitle || '—'}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{log.userEmail}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{formatTimestamp(log.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* TABS 2-12: Entity Management & Audit Log Tables */}
      {activeTab !== 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Controls Bar: Search, Filters, Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1, maxWidth: '420px' }}>
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: 0 }}
              />
              <Button type="submit" variant="primary" icon={Search}>
                Filter
              </Button>
            </form>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Total: {meta.total} records
              </span>
            </div>
          </div>

          {/* Content Rows */}
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Skeleton key={n} height={70} variant="rounded" />
              ))}
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={() => loadTabData(meta.page)} />
          ) : items.length === 0 ? (
            <EmptyState
              title={`No ${activeTab} records found`}
              message={searchQuery ? 'Try clearing your search query.' : 'Create your first record using the button above.'}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeTab === 'audit-logs' ? (
                // Audit Logs Table
                <Card style={{ overflowX: 'auto', padding: 0 }}>
                  <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Entity</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Target Resource</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Admin Email</th>
                        <th style={{ padding: '0.75rem 1rem' }}>IP Address</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((log) => (
                        <tr key={log._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <Badge variant={log.action === 'DELETE' ? 'danger' : log.action === 'CREATE' ? 'success' : 'primary'}>
                              {log.action}
                            </Badge>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{log.resourceType}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{log.resourceTitle || '—'}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{log.userEmail}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{log.ipAddress}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{formatTimestamp(log.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              ) : (
                // Universal Item Cards
                items.map((item) => {
                  const title = getEntityTitle(item);
                  const isPublished =
                    item.status === 'Published' ||
                    item.isPublished === true ||
                    item.isActive === true ||
                    item.isBroadcast === true;

                  return (
                    <Card
                      key={item._id}
                      style={{
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                          {item.role && (
                            <Badge variant={item.role === 'admin' ? 'danger' : 'primary'}>
                              {item.role.toUpperCase()}
                            </Badge>
                          )}
                          {item.category && <Badge variant="neutral">{item.category}</Badge>}
                          {item.difficulty && <Badge variant="info">{item.difficulty}</Badge>}
                          {item.semester && <Badge variant="primary">Sem {item.semester}</Badge>}

                          {/* Publish/Status Indicator */}
                          <Badge variant={isPublished ? 'success' : 'neutral'}>
                            {isPublished ? 'Active / Published' : 'Draft / Inactive'}
                          </Badge>
                        </div>

                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                          {title}
                        </h3>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {item.email && <span>Email: {item.email}</span>}
                          {item.authors && <span>Authors: {Array.isArray(item.authors) ? item.authors.join(', ') : item.authors}</span>}
                          {item.provider && <span>Provider: {item.provider}</span>}
                          {item.channelName && <span>Channel: {item.channelName}</span>}
                          {item.organizer && <span>Organizer: {item.organizer}</span>}
                          <span>Created: {formatTimestamp(item.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Controls */}
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {activeTab === 'users' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={item.isActive ? UserX : UserCheck}
                            onClick={() => handleToggleUserStatus(item)}
                          >
                            {item.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={isPublished ? EyeOff : Eye}
                            onClick={() => {
                              const typeMap = {
                                projects: 'Project',
                                roadmaps: 'Roadmap',
                                interviews: 'InterviewQuestion',
                                books: 'Book',
                                courses: 'Course',
                                youtube: 'YouTubeResource',
                                resources: 'Resource',
                                hackathons: 'Hackathon',
                                announcements: 'Announcement',
                                skills: 'Skill',
                              };
                              handleTogglePublish(item, typeMap[activeTab] || 'Project');
                            }}
                          >
                            {isPublished ? 'Unpublish' : 'Publish'}
                          </Button>
                        )}

                        <Button variant="outline" size="sm" icon={Edit} onClick={() => handleOpenEdit(item)}>
                          Edit
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          icon={Trash2}
                          style={{ color: 'var(--color-danger)' }}
                          onClick={() => handleOpenDelete(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          )}

          {/* Pagination Bar */}
          {meta.totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                disabled={meta.page <= 1}
                onClick={() => loadTabData(meta.page - 1)}
              >
                Previous
              </Button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                icon={ChevronRight}
                disabled={meta.page >= meta.totalPages}
                onClick={() => loadTabData(meta.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* CREATE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`Create New ${activeTab.slice(0, -1).toUpperCase()}`}
      >
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeTab === 'users' && (
            <>
              <Input
                label="Full Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Initial Password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Select
                label="System Role"
                value={formData.role || 'student'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'admin', label: 'Administrator' },
                ]}
              />
            </>
          )}

          {activeTab === 'projects' && (
            <>
              <Input
                label="Project Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Category"
                value={formData.category || 'Full Stack'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                label="Problem Statement"
                value={formData.problemStatement || ''}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'interviews' && (
            <>
              <Input
                label="Interview Question"
                value={formData.question || ''}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
              />
              <Input
                label="Answer / Expected Takeaway"
                value={formData.answer || ''}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
              />
              <Input
                label="Topic"
                value={formData.topic || ''}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'books' && (
            <>
              <Input
                label="Book Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Authors (comma-separated)"
                value={formData.authors || ''}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                required
              />
              <Input
                label="Official Link"
                value={formData.officialUrl || ''}
                onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'courses' && (
            <>
              <Input
                label="Course Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Course URL"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'skills' && (
            <>
              <Input
                label="Skill Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </>
          )}

          {activeTab === 'announcements' && (
            <>
              <Input
                label="Announcement Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'hackathons' && (
            <>
              <Input
                label="Hackathon Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Organizer"
                value={formData.organizer || ''}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                required
              />
              <Input
                label="Registration URL"
                value={formData.registrationUrl || ''}
                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'roadmaps' && (
            <>
              <Input
                label="Roadmap Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'youtube' && (
            <>
              <Input
                label="Playlist / Video Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Channel Name"
                value={formData.channelName || ''}
                onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                required
              />
              <Input
                label="Video URL"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                required
              />
            </>
          )}

          {activeTab === 'resources' && (
            <>
              <Input
                label="Resource Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Resource URL"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Save & Publish'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${getEntityTitle(editingItem)}`}
      >
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeTab === 'users' && (
            <>
              <Input
                label="Full Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Select
                label="System Role"
                value={formData.role || 'student'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'admin', label: 'Administrator' },
                ]}
              />
            </>
          )}

          {activeTab !== 'users' && (
            <>
              <Input
                label="Title / Name / Question"
                value={formData.title || formData.name || formData.question || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    title: val,
                    name: val,
                    question: val,
                  });
                }}
                required
              />
              {formData.description !== undefined && (
                <Input
                  label="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              )}
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Update Record'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Permanent Deletion"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Are you sure you want to delete this {activeTab.slice(0, -1)}?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Target: <strong>"{getEntityTitle(deletingItem)}"</strong>
                <br />
                This action is permanent and will be logged in the system security audit trail.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
              onClick={handleDeleteConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Yes, Delete Record'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;
