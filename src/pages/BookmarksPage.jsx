import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Code,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Video,
  FileText,
  ArrowRight,
  FolderPlus,
  Folder,
  Tag,
  Plus,
  Edit2,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import bookmarkService from '../services/bookmarkService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorDetails } from '../utils/errorHandler';

export const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');

  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const types = ['All', 'Project', 'Book', 'Course', 'InterviewQuestion', 'Resource', 'YouTubeResource'];

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorDetails(null);
    try {
      const [bmRes, colRes] = await Promise.all([
        bookmarkService.getUserBookmarks({
          resourceType: selectedType !== 'All' ? selectedType : undefined,
          collectionId: selectedCollection !== 'All' ? selectedCollection : undefined,
        }),
        bookmarkService.getUserCollections(),
      ]);

      setBookmarks(bmRes.data || []);
      setCollections(colRes.data || []);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [selectedType, selectedCollection, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      const res = await bookmarkService.createCollection({
        name: newCollectionName.trim(),
        description: newCollectionDesc.trim(),
      });
      showToast('Collection created successfully!', 'success');
      setCollections([res.data || res, ...collections]);
      setIsCreateModalOpen(false);
      setNewCollectionName('');
      setNewCollectionDesc('');
    } catch (err) {
      showToast('Failed to create collection.', 'error');
    }
  };

  const handleDeleteCollection = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this collection? (Bookmarks inside will remain saved)')) return;

    try {
      await bookmarkService.deleteCollection(id);
      setCollections(collections.filter((c) => c._id !== id));
      if (selectedCollection === id) setSelectedCollection('All');
      showToast('Collection deleted.', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to delete collection.', 'error');
    }
  };

  const handleAssignCollection = async (bookmarkId, collectionId) => {
    try {
      await bookmarkService.updateBookmark(bookmarkId, { collectionId: collectionId || null });
      showToast('Bookmark collection updated.', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to update bookmark collection.', 'error');
    }
  };

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      await bookmarkService.deleteBookmark(bookmarkId);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
      showToast('Bookmark removed.', 'success');
    } catch (err) {
      showToast('Failed to remove bookmark.', 'error');
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Project':
        return Code;
      case 'Book':
        return BookOpen;
      case 'Course':
        return GraduationCap;
      case 'InterviewQuestion':
        return HelpCircle;
      case 'YouTubeResource':
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><Bookmark size={14} /> Saved Collections</Badge>
            <Badge variant="neutral">{bookmarks.length} Saved Items</Badge>
            <Badge variant="info">{collections.length} Custom Folders</Badge>
          </div>
          <h1>My Saved Bookmarks & Collections</h1>
          <p>
            Organize projects, interview questions, textbooks, and notes into custom structured folders.
          </p>
        </div>

        {isAuthenticated && (
          <Button variant="primary" icon={FolderPlus} onClick={() => setIsCreateModalOpen(true)}>
            New Collection Folder
          </Button>
        )}
      </div>

      {/* Collections Bar */}
      {isAuthenticated && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Folder size={16} color="var(--primary-800)" /> Custom Collections:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`filter-btn ${selectedCollection === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCollection('All')}
            >
              All Folders ({bookmarks.length})
            </button>
            {collections.map((col) => (
              <div
                key={col._id}
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <button
                  className={`filter-btn ${selectedCollection === col._id ? 'active' : ''}`}
                  onClick={() => setSelectedCollection(col._id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Tag size={12} />
                  {col.name}
                </button>
                <button
                  onClick={(e) => handleDeleteCollection(col._id, e)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 4px', fontSize: '0.75rem' }}
                  title="Delete collection"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Type Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {types.map((t) => (
          <button
            key={t}
            className={`filter-btn ${selectedType === t ? 'active' : ''}`}
            onClick={() => setSelectedType(t)}
          >
            {t === 'All' ? 'All Types' : t.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {/* 4 States Handling */}
      {!isAuthenticated ? (
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <Bookmark size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sign In to View Bookmarks</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Sign in to your student account to save and access your personalized collection of learning resources.
          </p>
          <Link to="/login">
            <Button variant="primary" size="lg">Sign In</Button>
          </Link>
        </Card>
      ) : isLoading ? (
        <div className="cards-grid-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} height={180} variant="rounded" />
          ))}
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchData} />
      ) : bookmarks.length === 0 ? (
        <EmptyState
          title="No Bookmarks Found"
          message={selectedCollection !== 'All' ? "No bookmarks saved in this folder yet." : "Explore projects, books, courses, and questions and click the bookmark icon to save them here."}
          actionLabel="Explore Projects"
          onAction={() => window.location.assign('/projects')}
        />
      ) : (
        <div className="cards-grid-3">
          {bookmarks.map((bm) => {
            const item = bm.resourceId || {};
            const Icon = getResourceIcon(bm.resourceType);
            const title = item.title || item.question || item.name || 'Saved Item';

            return (
              <Card key={bm._id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary-800)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <Badge variant="primary">{bm.resourceType}</Badge>
                    {bm.collectionId && (
                      <Badge variant="info">
                        📁 {bm.collectionId?.name || 'Folder'}
                      </Badge>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteBookmark(bm._id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px' }}
                    title="Remove Bookmark"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {title}
                  </h3>
                  {item.category && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category: {item.category}</span>}
                </div>

                {/* Move to Collection Selector */}
                {collections.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Folder:</span>
                    <select
                      value={bm.collectionId?._id || bm.collectionId || ''}
                      onChange={(e) => handleAssignCollection(bm._id, e.target.value)}
                      style={{
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                      }}
                    >
                      <option value="">(No Collection)</option>
                      {collections.map((col) => (
                        <option key={col._id} value={col._id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Saved {new Date(bm.createdAt).toLocaleDateString()}
                  </span>

                  {item.slug ? (
                    <Link to={`/projects/${item.slug}`}>
                      <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">View Details</Button>
                    </Link>
                  ) : item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" icon={ExternalLink} iconPosition="right">Open Link</Button>
                    </a>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Collection Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Bookmark Collection">
        <form onSubmit={handleCreateCollection} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Collection Name"
            placeholder="e.g. Placement 2026, DSA Must-Do, Web Dev..."
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            required
            autoFocus
          />
          <Input
            label="Description (Optional)"
            placeholder="e.g. Core materials for upcoming interviews"
            value={newCollectionDesc}
            onChange={(e) => setNewCollectionDesc(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Folder</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookmarksPage;
