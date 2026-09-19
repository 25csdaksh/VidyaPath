import React from 'react';
import { BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import Badge from '../common/Badge';

export const BookCard = ({ book, onBookmark, isBookmarked = false }) => {
  if (!book) return null;

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <Badge variant="primary">{book.category}</Badge>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Badge variant="secondary">{book.level}</Badge>
          {onBookmark && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.preventDefault();
                onBookmark(book);
              }}
              aria-label="Bookmark book"
              style={{ padding: '0.2rem', color: isBookmarked ? 'var(--primary-800)' : 'var(--text-muted)' }}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="entity-card-title">{book.title}</h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          by {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
        </p>
        <p className="entity-card-desc" style={{ marginTop: '0.5rem' }}>
          {book.description}
        </p>
      </div>

      <div className="entity-card-footer">
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {book.publisher || 'Academic Textbook'}
        </span>
        <a
          href={book.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--primary-800)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Publisher Catalog <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default BookCard;
