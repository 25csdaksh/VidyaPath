import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Award,
  Zap,
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import interviewService from '../services/interviewService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const InterviewPracticePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'All');
  const [expandedIds, setExpandedIds] = useState({});
  const [practicedIds, setPracticedIds] = useState([]);

  const { isBookmarked, toggleBookmark } = useBookmarks('InterviewQuestion');
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const categories = ['All', 'DSA', 'DBMS', 'OS', 'CN', 'OOP', 'SQL', 'System Design', 'HR'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await interviewService.getQuestions({
        page,
        limit: 10,
        search: searchQuery.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
      });

      setQuestions(res.data || []);
      if (res.meta) setMeta(res.meta);

      if (isAuthenticated) {
        try {
          const pRes = await interviewService.getProgress();
          const pData = pRes.data || {};
          if (pData.practicedQuestions) {
            setPracticedIds(pData.practicedQuestions.map((q) => (typeof q === 'string' ? q : q._id)));
          }
        } catch {
          // Progress fetch optional
        }
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedCategory, selectedDifficulty, searchQuery, isAuthenticated]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(searchQuery ? { q: searchQuery } : {}),
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
    });
  };

  const toggleExpand = (qId) => {
    setExpandedIds((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleTogglePracticed = async (questionId) => {
    if (!isAuthenticated) {
      showToast('Please sign in to track your practiced questions.', 'info');
      return;
    }

    const isDone = practicedIds.includes(questionId);
    const updated = isDone
      ? practicedIds.filter((id) => id !== questionId)
      : [...practicedIds, questionId];

    setPracticedIds(updated);

    try {
      await interviewService.completeQuestion(questionId);
      showToast(isDone ? 'Question unmarked.' : 'Marked as practiced!', 'success');
    } catch (err) {
      showToast('Failed to update question progress.', 'error');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><HelpCircle size={14} /> Placement Question Bank</Badge>
            <Badge variant="neutral">{meta.total || questions.length} Questions</Badge>
            {isAuthenticated && (
              <Badge variant="success">
                <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
                {practicedIds.length} Practiced
              </Badge>
            )}
          </div>
          <h1>Technical Interview Question Bank</h1>
          <p>
            Curated high-frequency questions in DBMS, Operating Systems, Computer Networks, DSA, and System Design with detailed standard answers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
          <Input
            placeholder="Search questions (e.g., Indexing, Deadlock, TCP, Binary Tree)..."
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
              onClick={() => {
                setSelectedDifficulty(diff);
                setSearchParams({
                  page: '1',
                  ...(searchQuery ? { q: searchQuery } : {}),
                  ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
                  ...(diff !== 'All' ? { difficulty: diff } : {}),
                });
              }}
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
            onClick={() => {
              setSelectedCategory(cat);
              setSearchParams({
                page: '1',
                ...(searchQuery ? { q: searchQuery } : {}),
                ...(cat !== 'All' ? { category: cat } : {}),
                ...(selectedDifficulty !== 'All' ? { difficulty: selectedDifficulty } : {}),
              });
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} height={110} variant="rounded" />
          ))}
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchQuestions} />
      ) : questions.length === 0 ? (
        <EmptyState
          title="No Questions Found"
          message="No interview questions matched your current topic filter or query."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q) => {
            const isDone = practicedIds.includes(q._id);
            const isExpanded = !!expandedIds[q._id];
            const isSaved = isBookmarked(q._id);

            return (
              <div key={q._id} className="interview-qa-box">
                <div className="interview-question-row">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                    <div
                      className={`milestone-checkbox ${isDone ? 'checked' : ''}`}
                      onClick={() => handleTogglePracticed(q._id)}
                      role="checkbox"
                      aria-checked={isDone}
                      tabIndex={0}
                      title={isDone ? 'Marked as Practiced' : 'Mark as Practiced'}
                      style={{ marginTop: '3px' }}
                    >
                      {isDone && <CheckCircle2 size={16} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        <Badge variant="primary">{q.category}</Badge>
                        <Badge variant="info">{q.topic}</Badge>
                        <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Hard' ? 'danger' : 'warning'}>
                          {q.difficulty}
                        </Badge>
                      </div>
                      <h3
                        onClick={() => toggleExpand(q._id)}
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: isDone ? 'var(--primary-800)' : 'var(--text-primary)',
                          cursor: 'pointer',
                          lineHeight: 1.4,
                        }}
                      >
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => toggleBookmark(q, 'InterviewQuestion')}
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

                    <Button
                      variant="ghost"
                      size="sm"
                      icon={isExpanded ? ChevronUp : ChevronDown}
                      onClick={() => toggleExpand(q._id)}
                    >
                      {isExpanded ? 'Hide Answer' : 'View Answer'}
                    </Button>
                  </div>
                </div>

                {/* Collapsible Answer Panel */}
                {isExpanded && (
                  <div className="interview-answer-panel">
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Detailed Technical Answer:
                    </div>
                    <div style={{ whiteSpace: 'pre-line', color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.925rem', marginBottom: '1rem' }}>
                      {q.answer}
                    </div>

                    {/* Key Takeaways */}
                    {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                      <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.25rem' }}>
                          Key Takeaways for the Interviewer:
                        </div>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {q.keyTakeaways.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Common Pitfalls */}
                    {q.commonPitfalls && q.commonPitfalls.length > 0 && (
                      <div style={{ background: 'var(--color-danger-bg)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '0.25rem' }}>
                          Common Mistakes Candidates Make:
                        </div>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {q.commonPitfalls.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

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
        </div>
      )}
    </div>
  );
};

export default InterviewPracticePage;
