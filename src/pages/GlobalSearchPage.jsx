import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Code,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Trophy,
  Map,
  Bell,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import searchService from '../services/searchService';
import { getErrorDetails } from '../utils/errorHandler';

export const GlobalSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const executeSearch = async (term) => {
    if (!term || !term.trim()) {
      setSearchData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await searchService.search(term.trim());
      setSearchData(res.data || res);
    } catch (err) {
      setError(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchInput(queryParam);
    if (queryParam) {
      executeSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const results = searchData?.results || {
    projects: [],
    books: [],
    courses: [],
    interviews: [],
    resources: [],
    hackathons: [],
    announcements: [],
    roadmap: [],
  };

  const total = searchData?.totalResults || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Search size={14} /> Universal Index</Badge>
            {total > 0 && <Badge variant="success">{total} Matches Found</Badge>}
          </div>
          <h1>Global Portal Search</h1>
          <p>
            Search across projects, interview questions, textbooks, courses, hackathons, and curriculum roadmaps.
          </p>
        </div>
      </div>

      {/* Main Search Input Form */}
      <Card style={{ padding: '1.5rem', background: 'var(--bg-secondary)' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
          <Input
            placeholder="Search keywords (e.g. Distributed, React, Operating Systems, Graphs, Hackathon)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            icon={Search}
            style={{ flex: 1 }}
            autoFocus
          />
          <Button type="submit" variant="primary" size="lg">
            Search Portal
          </Button>
        </form>
      </Card>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={120} variant="rounded" />
          <div className="cards-grid-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Skeleton key={n} height={180} variant="rounded" />
            ))}
          </div>
        </div>
      ) : error ? (
        <ErrorState error={error} onRetry={() => executeSearch(queryParam)} />
      ) : !queryParam ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
          <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Enter a search term to begin
          </h3>
          <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.925rem' }}>
            Type any technology, computer science topic, textbook author, or contest name above.
          </p>
        </div>
      ) : total === 0 ? (
        <EmptyState
          title={`No Results for "${queryParam}"`}
          message="Try searching for general terms like 'DBMS', 'DSA', 'React', 'OS', or 'Stanford'."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Projects Section */}
          {results.projects.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code size={20} color="var(--primary-800)" /> Software Projects ({results.projects.length})
                </h2>
                <Link to={`/projects?q=${encodeURIComponent(queryParam)}`} style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  View in Project Hub &rarr;
                </Link>
              </div>
              <div className="cards-grid-3">
                {results.projects.map((p) => (
                  <Link to={`/projects/${p.slug}`} key={p._id} style={{ textDecoration: 'none' }}>
                    <Card interactive style={{ padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Badge variant="primary">{p.category}</Badge>
                        <Badge variant="neutral">{p.difficulty}</Badge>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.description}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Interview Questions Section */}
          {results.interviews.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={20} color="var(--primary-800)" /> Interview Questions ({results.interviews.length})
                </h2>
                <Link to={`/interviews?q=${encodeURIComponent(queryParam)}`} style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  Practice All &rarr;
                </Link>
              </div>
              <div className="cards-grid-2">
                {results.interviews.map((q) => (
                  <Link to="/interviews" key={q._id} style={{ textDecoration: 'none' }}>
                    <Card interactive style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Badge variant="primary">{q.category}</Badge>
                        <Badge variant="info">{q.topic}</Badge>
                        <Badge variant="neutral">{q.difficulty}</Badge>
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{q.question}</h3>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Textbooks Section */}
          {results.books.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={20} color="var(--primary-800)" /> Textbooks ({results.books.length})
                </h2>
                <Link to="/books" style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  View All Books &rarr;
                </Link>
              </div>
              <div className="cards-grid-3">
                {results.books.map((b) => (
                  <Card key={b._id} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Badge variant="primary">{b.category}</Badge>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{b.title}</h3>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>By: {b.authors?.join(', ')}</div>
                    {b.officialUrl && (
                      <a href={b.officialUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">Catalog Link</Button>
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Courses Section */}
          {results.courses.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={20} color="var(--primary-800)" /> Online Courses ({results.courses.length})
                </h2>
                <Link to="/courses" style={{ fontSize: '0.85rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  View All Courses &rarr;
                </Link>
              </div>
              <div className="cards-grid-3">
                {results.courses.map((c) => (
                  <Card key={c._id} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Badge variant="primary">{c.provider}</Badge>
                      <Badge variant="neutral">{c.difficulty}</Badge>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</h3>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">Open Course</Button>
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchPage;
