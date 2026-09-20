import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Sparkles,
  ExternalLink,
  Award,
  Database,
  BookOpen,
} from 'lucide-react';
import CourseCard from '../components/cards/CourseCard';
import FourYearCourseraGuide from '../components/coursera/FourYearCourseraGuide';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import courseService from '../services/courseService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Top view tab: 'guide' (4-Year Coursera Certificate Guide) | 'database' (DB explorer & bookmarks)
  const initialTab = searchParams.get('tab') === 'database' ? 'database' : 'guide';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Database search & filter state
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedProvider, setSelectedProvider] = useState(searchParams.get('provider') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Course');

  const providers = ['All', 'Coursera', 'NPTEL', 'Stanford Online', 'MIT OCW', 'edX', 'DeepLearning.AI'];
  const categories = ['All', 'AI_ML', 'DataScience', 'FullStack', 'Cloud_DevOps', 'Cybersecurity', 'Algorithms', 'CoreCS'];

  const fetchCourses = useCallback(async () => {
    if (activeTab !== 'database') return;
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await courseService.getCourses({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        provider: selectedProvider !== 'All' ? selectedProvider : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      });

      setCourses(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchParams, selectedProvider, selectedCategory, searchQuery]);

  useEffect(() => {
    if (activeTab === 'database') {
      fetchCourses();
    }
  }, [activeTab, fetchCourses]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({
      tab,
      ...(tab === 'database' && searchQuery ? { q: searchQuery } : {}),
      ...(tab === 'database' && selectedProvider !== 'All' ? { provider: selectedProvider } : {}),
      ...(tab === 'database' && selectedCategory !== 'All' ? { category: selectedCategory } : {}),
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      tab: 'database',
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedProvider !== 'All' ? { provider: selectedProvider } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProvider('All');
    setSelectedCategory('All');
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
            color: activeTab === 'guide' ? '#0056b3' : 'var(--text-muted)',
            borderBottom: activeTab === 'guide' ? '3px solid #0056b3' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <GraduationCap size={18} /> 📜 4-Year Coursera Certificate Guide
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
            color: activeTab === 'database' ? '#0056b3' : 'var(--text-muted)',
            borderBottom: activeTab === 'database' ? '3px solid #0056b3' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Database size={18} /> 🔍 Database Course Explorer & Bookmarks
        </button>
      </div>

      {/* TAB 1: 4-YEAR COMPREHENSIVE COURSERA CERTIFICATE GUIDE */}
      {activeTab === 'guide' && <FourYearCourseraGuide />}

      {/* TAB 2: DATABASE COURSE EXPLORER */}
      {activeTab === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header */}
          <div className="page-header-flex">
            <div className="page-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Badge variant="primary"><GraduationCap size={14} /> Certified Specializations</Badge>
                <Badge variant="neutral">{meta.total || courses.length} Courses Available</Badge>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                Database Course Explorer & Saved Bookmarks
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                Filter by provider and category, or bookmark your favorite courses to access anytime in your student dashboard.
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="filter-bar">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
              <Input
                placeholder="Search by course name, instructor, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button type="submit" variant="primary">Search</Button>
            </form>

            <div className="filter-group">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Provider:</span>
              {providers.map((prov) => (
                <button
                  key={prov}
                  className={`filter-btn ${selectedProvider === prov ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedProvider(prov);
                    setSearchParams({
                      tab: 'database',
                      page: '1',
                      ...(searchQuery ? { q: searchQuery } : {}),
                      ...(prov !== 'All' ? { provider: prov } : {}),
                      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
                    });
                  }}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Row */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchParams({
                    tab: 'database',
                    page: '1',
                    ...(searchQuery ? { q: searchQuery } : {}),
                    ...(selectedProvider !== 'All' ? { provider: selectedProvider } : {}),
                    ...(cat !== 'All' ? { category: cat } : {}),
                  });
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4 States Handling */}
          {isLoading ? (
            <div className="cards-grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} height={260} variant="rounded" />
              ))}
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={fetchCourses} />
          ) : courses.length === 0 ? (
            <EmptyState
              title="No Courses Found"
              message="No courses matched your query. Try selecting 'All' providers or categories."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <div className="cards-grid-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    isBookmarked={isBookmarked(course._id)}
                    onBookmark={() => toggleBookmark(course, 'Course')}
                  />
                ))}
              </div>

              {meta.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <Pagination
                    currentPage={meta.page || 1}
                    totalPages={meta.totalPages}
                    onPageChange={(p) => {
                      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: p.toString() });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
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

export default CoursesPage;
