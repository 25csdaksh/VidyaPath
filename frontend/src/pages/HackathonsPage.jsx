import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Trophy,
  Search,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import HackathonCard from '../components/cards/HackathonCard';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import hackathonService from '../services/hackathonService';
import { getErrorDetails } from '../utils/errorHandler';

export const HackathonsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hackathons, setHackathons] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [selectedMode, setSelectedMode] = useState(searchParams.get('mode') || 'All');

  const statuses = ['All', 'Active', 'Upcoming', 'Past'];
  const modes = ['All', 'Online', 'Offline', 'Hybrid'];

  const fetchHackathons = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await hackathonService.getHackathons({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        status: selectedStatus !== 'All' ? selectedStatus : undefined,
        mode: selectedMode !== 'All' ? selectedMode : undefined,
      });

      setHackathons(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedStatus, selectedMode, searchQuery]);

  useEffect(() => {
    fetchHackathons();
  }, [fetchHackathons]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedStatus !== 'All' ? { status: selectedStatus } : {}),
      ...(selectedMode !== 'All' ? { mode: selectedMode } : {}),
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedMode('All');
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Trophy size={14} /> Competitions & Playbook</Badge>
            <Badge variant="neutral">{meta.total || hackathons.length} Live Competitions</Badge>
          </div>
          <h1>Hackathon Hub & Playbook</h1>
          <p>
            National and global developer competitions, problem themes, team requirements, and live registration links.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search hackathons, organizers (e.g., SIH, Google, MLH)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            style={{ width: '100%' }}
          />
          <Button type="submit" variant="primary">Search</Button>
        </form>

        <div className="filter-group">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              className={`filter-btn ${selectedStatus === st ? 'active' : ''}`}
              onClick={() => {
                setSelectedStatus(st);
                setSearchParams({
                  page: '1',
                  ...(searchQuery ? { q: searchQuery } : {}),
                  ...(st !== 'All' ? { status: st } : {}),
                  ...(selectedMode !== 'All' ? { mode: selectedMode } : {}),
                });
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {modes.map((m) => (
          <button
            key={m}
            className={`filter-btn ${selectedMode === m ? 'active' : ''}`}
            onClick={() => {
              setSelectedMode(m);
              setSearchParams({
                page: '1',
                ...(searchQuery ? { q: searchQuery } : {}),
                ...(selectedStatus !== 'All' ? { status: selectedStatus } : {}),
                ...(m !== 'All' ? { mode: m } : {}),
              });
            }}
          >
            {m === 'All' ? 'All Formats' : `${m} Format`}
          </button>
        ))}
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div className="cards-grid-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} height={280} variant="rounded" />
          ))}
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchHackathons} />
      ) : hackathons.length === 0 ? (
        <EmptyState
          title="No Hackathons Found"
          message="No competitions matched your search query or filters."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <>
          <div className="cards-grid-3">
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon._id} hackathon={hackathon} />
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

export default HackathonsPage;
