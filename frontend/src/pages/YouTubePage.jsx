import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Video,
  Search,
  ExternalLink,
  Clock,
  Bookmark,
  PlayCircle,
  Database,
  GraduationCap,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import FourYearYouTubeGuide from '../components/youtube/FourYearYouTubeGuide';
import youtubeService from '../services/youtubeService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const YouTubePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Top view tab: 'guide' | 'database'
  const [activeTab, setActiveTab] = useState('guide');

  // Database Playlists state
  const [resources, setResources] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [dbSearchQuery, setDbSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDbCategory, setSelectedDbCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDbLevel, setSelectedDbLevel] = useState(searchParams.get('level') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('YouTubeResource');

  const dbCategories = ['All', 'DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'DevOps', 'SystemDesign', 'Math'];
  const dbLevels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Complete Series'];

  // Fetch Database Playlists from Backend
  const fetchYouTubeResources = useCallback(async () => {
    if (activeTab !== 'database') return;
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await youtubeService.getYouTubeResources({
        page,
        limit: 9,
        search: dbSearchQuery.trim() || undefined,
        category: selectedDbCategory !== 'All' ? selectedDbCategory : undefined,
        level: selectedDbLevel !== 'All' ? selectedDbLevel : undefined,
      });

      setResources(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchParams, selectedDbCategory, selectedDbLevel, dbSearchQuery]);

  useEffect(() => {
    if (activeTab === 'database') {
      fetchYouTubeResources();
    }
  }, [activeTab, fetchYouTubeResources]);

  const handleDbSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
      ...(selectedDbCategory !== 'All' ? { category: selectedDbCategory } : {}),
      ...(selectedDbLevel !== 'All' ? { level: selectedDbLevel } : {}),
    });
  };

  const resetFilters = () => {
    setDbSearchQuery('');
    setSelectedDbCategory('All');
    setSelectedDbLevel('All');
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '3rem' }}>
      {/* View Switcher Tabs */}
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
          onClick={() => setActiveTab('guide')}
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
            color: activeTab === 'guide' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'guide' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <GraduationCap size={18} /> 🎓 4-Year Subject YouTube Guide
        </button>

        <button
          onClick={() => setActiveTab('database')}
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
            color: activeTab === 'database' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'database' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Database size={18} /> 🔍 Database Playlist Explorer & Bookmarks
        </button>
      </div>

      {/* TAB 1: 4-YEAR COMPREHENSIVE SUBJECT YOUTUBE GUIDE */}
      {activeTab === 'guide' && <FourYearYouTubeGuide />}

      {/* TAB 2: DATABASE PLAYLIST EXPLORER */}
      {activeTab === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header */}
          <div className="page-header-flex">
            <div className="page-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Badge variant="primary"><Video size={14} /> Video Playlists</Badge>
                <Badge variant="neutral">{meta.total || resources.length} Curated Series</Badge>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                Database Video Playlists & Saved Bookmarks
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                Filter by level and category, or bookmark your favorite tutorials to access anytime in your student dashboard.
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="filter-bar">
            <form onSubmit={handleDbSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
              <Input
                placeholder="Search playlists, channel names (e.g., Striver, Abdul Bari)..."
                value={dbSearchQuery}
                onChange={(e) => setDbSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button type="submit" variant="primary">Search</Button>
            </form>

            <div className="filter-group">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Level:</span>
              {dbLevels.map((lvl) => (
                <button
                  key={lvl}
                  className={`filter-btn ${selectedDbLevel === lvl ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDbLevel(lvl);
                    setSearchParams({
                      page: '1',
                      ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
                      ...(selectedDbCategory !== 'All' ? { category: selectedDbCategory } : {}),
                      ...(lvl !== 'All' ? { level: lvl } : {}),
                    });
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {dbCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedDbCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDbCategory(cat);
                  setSearchParams({
                    page: '1',
                    ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
                    ...(cat !== 'All' ? { category: cat } : {}),
                    ...(selectedDbLevel !== 'All' ? { level: selectedDbLevel } : {}),
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
                <Skeleton key={n} height={240} variant="rounded" />
              ))}
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={fetchYouTubeResources} />
          ) : resources.length === 0 ? (
            <EmptyState
              title="No Playlists Found"
              message="No YouTube resources matched your filter criteria."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <div className="cards-grid-3">
                {resources.map((item) => {
                  const isSaved = isBookmarked(item._id);
                  const targetUrl = item.playlistUrl || item.videoUrl;

                  return (
                    <Card key={item._id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <Badge variant="primary">{item.category}</Badge>
                          <Badge variant="neutral">{item.difficulty}</Badge>
                        </div>

                        <button
                          onClick={() => toggleBookmark(item, 'YouTubeResource')}
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
                        <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--primary-800)', marginBottom: '0.25rem' }}>
                          Channel: {item.channelName}
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          {item.title}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description}
                        </p>
                      </div>

                      {item.topicsCovered && item.topicsCovered.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {item.topicsCovered.slice(0, 3).map((topic) => (
                            <span key={topic} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>
                              • {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.estimatedHours ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                            <Clock size={14} /> ~{item.estimatedHours} Hours
                          </div>
                        ) : <div />}

                        {targetUrl && (
                          <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="sm" icon={PlayCircle} iconPosition="left">
                              Watch on YouTube
                            </Button>
                          </a>
                        )}
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
      )}
    </div>
  );
};

export default YouTubePage;
