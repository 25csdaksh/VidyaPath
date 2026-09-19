import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import CourseCard from '../components/cards/CourseCard';
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
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedProvider, setSelectedProvider] = useState(searchParams.get('provider') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Course');

  const providers = ['All', 'Coursera', 'NPTEL', 'Stanford Online', 'MIT OCW', 'edX', 'DeepLearning.AI'];
  const categories = ['All', 'AI_ML', 'DataScience', 'FullStack', 'Cloud_DevOps', 'Algorithms', 'CoreCS'];

  const fetchCourses = useCallback(async () => {
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
  }, [searchParams, selectedProvider, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
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
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><GraduationCap size={14} /> Certified Specializations</Badge>
            <Badge variant="neutral">{meta.total || courses.length} Courses Available</Badge>
          </div>
          <h1>Online Courses & University Specializations</h1>
          <p>
            Curated high-yield courses from Stanford, MIT, DeepLearning.AI, and NPTEL with financial aid guidance.
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
  );
};

export default CoursesPage;
