import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Code,
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  FolderGit2,
  Database,
  Layers,
  Compass,
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import IndustryProjectsMasterGuide from '../components/projects/IndustryProjectsMasterGuide';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import projectService from '../services/projectService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Top view tab: 'guide' (60 Industry Projects Master Guide) | 'database' (DB Project Explorer)
  const initialTab = searchParams.get('tab') === 'database' ? 'database' : 'guide';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Database search & filter state
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Project');

  const categories = ['All', 'Full Stack', 'Backend', 'Systems', 'AI/ML', 'DevOps', 'Cybersecurity', 'Cloud'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Industry Tier-1'];

  const fetchProjects = useCallback(async () => {
    if (activeTab !== 'database') return;
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const categoryParam = selectedCategory !== 'All' ? selectedCategory : undefined;
      const difficultyParam = selectedDifficulty !== 'All' ? selectedDifficulty : undefined;

      const res = await projectService.getProjects({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        category: categoryParam,
        difficulty: difficultyParam,
      });

      setProjects(res.data || []);
      if (res.meta) {
        setMeta(res.meta);
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchParams, selectedCategory, selectedDifficulty, searchQuery]);

  useEffect(() => {
    if (activeTab === 'database') {
      fetchProjects();
    }
  }, [activeTab, fetchProjects]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({
      tab,
      ...(tab === 'database' && searchQuery ? { q: searchQuery } : {}),
      ...(tab === 'database' && selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(tab === 'database' && selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      tab: 'database',
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({
      tab: 'database',
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(cat !== 'All' ? { category: cat } : {}),
      ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const handleDifficultySelect = (diff) => {
    setSelectedDifficulty(diff);
    setSearchParams({
      tab: 'database',
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(diff !== 'All' ? { difficulty: diff } : {}),
    });
  };

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchParams({ tab: 'database', page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '3.5rem' }}>
      {/* Top View Switcher Navigation Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '0.2rem',
          overflowX: 'auto',
        }}
      >
        <button
          onClick={() => handleTabChange('guide')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'guide' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'guide' ? '#6441a5' : 'var(--text-muted)',
            borderBottom: activeTab === 'guide' ? '3px solid #6441a5' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Code size={18} /> 🚀 Industry Projects Master Guide (60 Projects)
        </button>

        <button
          onClick={() => handleTabChange('database')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'database' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'database' ? '#6441a5' : 'var(--text-muted)',
            borderBottom: activeTab === 'database' ? '3px solid #6441a5' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Database size={18} /> 🔍 Database Project Explorer & Bookmarks
        </button>
      </div>

      {/* TAB 1: 60-PROJECT MASTER INDUSTRY GUIDE */}
      {activeTab === 'guide' && <IndustryProjectsMasterGuide />}

      {/* TAB 2: DATABASE PROJECT EXPLORER */}
      {activeTab === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Page Header */}
          <div className="page-header-flex">
            <div className="page-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Badge variant="primary"><Sparkles size={14} /> Real-World Engineering</Badge>
                <Badge variant="neutral">{meta.total || projects.length} Projects Available</Badge>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                Database Project Explorer & Saved Bookmarks
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                Filter by difficulty and technology category, or bookmark your favorite blueprints to access anytime in your student dashboard.
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="filter-bar">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
              <Input
                placeholder="Search by title, tech stack (e.g., Redis, Kafka, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button type="submit" variant="primary">Search</Button>
            </form>

            <div className="filter-group">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Difficulty:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => handleDifficultySelect(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4 States Handling */}
          {isLoading ? (
            <div className="cards-grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} height={300} variant="rounded" />
              ))}
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={fetchProjects} />
          ) : projects.length === 0 ? (
            <EmptyState
              title="No Projects Matched Your Search"
              message="Try adjusting your keywords or clearing the category and difficulty filters."
              actionLabel="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <div className="cards-grid-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id || project.slug}
                    project={project}
                    isBookmarked={isBookmarked(project._id)}
                    onBookmark={() => toggleBookmark(project, 'Project')}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <Pagination
                    currentPage={meta.page || 1}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
