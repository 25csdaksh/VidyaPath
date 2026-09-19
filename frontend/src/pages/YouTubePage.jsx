import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Video,
  Search,
  ExternalLink,
  Clock,
  Sparkles,
  Bookmark,
  PlayCircle,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import youtubeService from '../services/youtubeService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const YouTubePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('YouTubeResource');

  const categories = ['All', 'DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'DevOps', 'SystemDesign', 'Math'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Complete Series'];

  const fetchYouTubeResources = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await youtubeService.getYouTubeResources({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        level: selectedLevel !== 'All' ? selectedLevel : undefined,
      });

      setResources(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedCategory, selectedLevel, searchQuery]);

  useEffect(() => {
    fetchYouTubeResources();
  }, [fetchYouTubeResources]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(selectedLevel !== 'All' ? { level: selectedLevel } : {}),
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Video size={14} /> Video Playlists</Badge>
            <Badge variant="neutral">{meta.total || resources.length} Curated Channels</Badge>
          </div>
          <h1>Top Free YouTube Learning Playlists</h1>
          <p>
            Curated, complete video series from the best technical educators (Striver, Abdul Bari, Traversy Media, Kunal Kushwaha).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search playlists, channel names (e.g., Striver, Abdul Bari)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            style={{ width: '100%' }}
          />
          <Button type="submit" variant="primary">Search</Button>
        </form>

        <div className="filter-group">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Level:</span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              className={`filter-btn ${selectedLevel === lvl ? 'active' : ''}`}
              onClick={() => {
                setSelectedLevel(lvl);
                setSearchParams({
                  page: '1',
                  ...(searchQuery ? { q: searchQuery } : {}),
                  ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
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
                ...(selectedLevel !== 'All' ? { level: selectedLevel } : {}),
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
                <Card key={item._id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
  );
};

export default YouTubePage;
