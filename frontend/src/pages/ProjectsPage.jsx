import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Code,
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  FolderGit2,
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
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
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Project');

  const categories = ['All', 'Full Stack', 'Backend', 'Systems', 'AI/ML', 'DevOps', 'Cybersecurity', 'Cloud'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Industry Tier-1'];

  const fetchProjects = useCallback(async () => {
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
  }, [searchParams, selectedCategory, selectedDifficulty, searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(cat !== 'All' ? { category: cat } : {}),
      ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const handleDifficultySelect = (diff) => {
    setSelectedDifficulty(diff);
    setSearchParams({
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
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Sparkles size={14} /> Real-World Engineering</Badge>
            <Badge variant="neutral">{meta.total || projects.length} Projects Available</Badge>
          </div>
          <h1>Industry Project Hub</h1>
          <p>
            Build production-ready, resume-worthy projects with architecture diagrams, schema specifications, and interview talking points.
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
  );
};

export default ProjectsPage;
