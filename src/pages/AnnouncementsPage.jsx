import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bell,
  Search,
  ExternalLink,
  Calendar,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import announcementService from '../services/announcementService';
import { getErrorDetails } from '../utils/errorHandler';

export const AnnouncementsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [announcements, setAnnouncements] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  const categories = ['All', 'Placement', 'Academic', 'Hackathon', 'Workshop', 'General'];

  const fetchAnnouncements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await announcementService.getAnnouncements({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      });

      setAnnouncements(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setError(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
    });
  };

  const getPriorityVariant = (priority) => {
    switch (priority?.toUpperCase()) {
      case 'HIGH':
        return 'danger';
      case 'MEDIUM':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Bell size={14} /> Official Notice Board</Badge>
            <Badge variant="neutral">{meta.total || announcements.length} Active Broadcasts</Badge>
          </div>
          <h1>Campus & Career Announcements</h1>
          <p>
            Official notifications regarding placement drives, hackathon registrations, academic milestones, and workshops.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search announcements (e.g., Placement, Hackathon, Exam)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            style={{ width: '100%' }}
          />
          <Button type="submit" variant="primary">Search</Button>
        </form>

        <div className="filter-group">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams({
                  page: '1',
                  ...(searchQuery ? { q: searchQuery } : {}),
                  ...(cat !== 'All' ? { category: cat } : {}),
                });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div className="cards-grid-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} height={200} variant="rounded" />
          ))}
        </div>
      ) : error ? (
        <ErrorState error={error} onRetry={fetchAnnouncements} />
      ) : announcements.length === 0 ? (
        <EmptyState
          title="No Announcements Found"
          message="There are currently no active announcements matching your filter."
          actionLabel="Reset Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSearchParams({ page: '1' });
          }}
        />
      ) : (
        <>
          <div className="cards-grid-3">
            {announcements.map((ann) => (
              <Card key={ann._id} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: ann.priority === 'High' ? '4px solid #dc2626' : '4px solid #166534' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Badge variant={getPriorityVariant(ann.priority)}>{ann.priority || 'Normal'} Priority</Badge>
                    <Badge variant="primary">{ann.category || 'General'}</Badge>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {ann.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {ann.description}
                  </p>
                </div>

                {ann.actionUrl && (
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    <a href={ann.actionUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" icon={ExternalLink} iconPosition="right">
                        View Official Notice / Link
                      </Button>
                    </a>
                  </div>
                )}
              </Card>
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

export default AnnouncementsPage;
