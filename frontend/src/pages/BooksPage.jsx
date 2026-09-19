import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import BookCard from '../components/cards/BookCard';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import bookService from '../services/bookService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

export const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Book');

  const categories = [
    'All',
    'DSA',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'System Design',
    'AI',
    'Machine Learning',
    'Programming',
  ];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Research'];

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await bookService.getBooks({
        page,
        limit: 9,
        search: searchQuery.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        level: selectedLevel !== 'All' ? selectedLevel : undefined,
      });

      setBooks(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedCategory, selectedLevel, searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
            <Badge variant="primary"><BookOpen size={14} /> Academic Standards</Badge>
            <Badge variant="neutral">{meta.total || books.length} Standard Textbooks</Badge>
          </div>
          <h1>International CSE Textbooks</h1>
          <p>
            Definitive computer science textbooks recommended by top universities (MIT, Stanford, Berkeley, IITs).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search books by title, author (e.g., Cormen, Tanenbaum, Russell)..."
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
        <ErrorState error={errorDetails} onRetry={fetchBooks} />
      ) : books.length === 0 ? (
        <EmptyState
          title="No Books Found"
          message="No textbooks matched your filter criteria."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <>
          <div className="cards-grid-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                isBookmarked={isBookmarked(book._id)}
                onBookmark={() => toggleBookmark(book, 'Book')}
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

export default BooksPage;
