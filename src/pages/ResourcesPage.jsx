import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  Bookmark,
  Sparkles,
  Star,
  CheckCircle2,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import resourceService from '../services/resourceService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const ResourcesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Resource');

  const types = [
    { label: 'All Types', value: 'All' },
    { label: 'Lecture Notes', value: 'notes' },
    { label: 'Cheat Sheets', value: 'cheat_sheet' },
    { label: 'Official Docs', value: 'documentation' },
    { label: 'Syllabus Guides', value: 'syllabus_guide' },
    { label: 'External Platforms', value: 'external_platform' },
  ];

  const categories = ['All', 'DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'Cloud', 'Cybersecurity'];

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await resourceService.getResources({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        type: selectedType !== 'All' ? selectedType : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      });

      setResources(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedType, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedType !== 'All' ? { type: selectedType } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
    });
  };

  const handleTypeSelect = (typeVal) => {
    setSelectedType(typeVal);
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(typeVal !== 'All' ? { type: typeVal } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
    });
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedType !== 'All' ? { type: selectedType } : {}),
      ...(cat !== 'All' ? { category: cat } : {}),
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedCategory('All');
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><FileText size={14} /> Academic Materials</Badge>
            <Badge variant="neutral">{meta.total || resources.length} Curated Resources</Badge>
          </div>
          <h1>Learning Resources & Notes</h1>
          <p>
            Subject notes, quick-reference cheat sheets, syllabus guides, and verified documentation for CSE core subjects.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search notes, cheat sheets, topics (e.g., SQL, OS, Trees)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            style={{ width: '100%' }}
          />
          <Button type="submit" variant="primary">Search</Button>
        </form>

        <div className="filter-group">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Type:</span>
          {types.map((t) => (
            <button
              key={t.value}
              className={`filter-btn ${selectedType === t.value ? 'active' : ''}`}
              onClick={() => handleTypeSelect(t.value)}
            >
              {t.label}
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
            <Skeleton key={n} height={220} variant="rounded" />
          ))}
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchResources} />
      ) : resources.length === 0 ? (
        <EmptyState
          title="No Learning Resources Found"
          message="No resources matched your current filter or query."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <>
          <div className="cards-grid-3">
            {resources.map((res) => {
              const isSaved = isBookmarked(res._id);
              return (
                <Card key={res._id || res.slug} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <Badge variant="primary">{res.category}</Badge>
                      <Badge variant="info">{res.type?.replace('_', ' ')}</Badge>
                      {res.difficulty && <Badge variant="neutral">{res.difficulty}</Badge>}
                    </div>

                    <button
                      onClick={() => toggleBookmark(res, 'Resource')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isSaved ? 'var(--primary-800)' : 'var(--text-muted)',
                        padding: '4px',
                      }}
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark'}
                    >
                      <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {res.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {res.description}
                    </p>
                  </div>

                  {res.tags && res.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {res.tags.slice(0, 3).map((t) => (
                        <span key={t} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Star size={14} fill="currentColor" /> {res.rating || 4.8}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {res.downloadUrl && (
                        <a href={res.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" icon={Download}>PDF</Button>
                        </a>
                      )}
                      <a href={res.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm" icon={ExternalLink} iconPosition="right">Open</Button>
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
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

export default ResourcesPage;
