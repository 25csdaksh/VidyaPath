import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowRight, Bookmark, Layers } from 'lucide-react';
import Badge from '../common/Badge';

export const ProjectCard = ({ project, onBookmark, isBookmarked = false }) => {
  if (!project) return null;

  const difficultyVariant =
    project.difficulty === 'HIGH' ? 'danger' : project.difficulty === 'MEDIUM' ? 'warning' : 'success';

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Badge variant="primary">{project.category}</Badge>
          <Badge variant={difficultyVariant}>{project.difficulty}</Badge>
        </div>
        {onBookmark && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={(e) => {
              e.preventDefault();
              onBookmark(project);
            }}
            aria-label="Bookmark project"
            style={{ padding: '0.3rem', color: isBookmarked ? 'var(--primary-800)' : 'var(--text-muted)' }}
          >
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div>
        <h3 className="entity-card-title">{project.title}</h3>
        <p className="entity-card-desc" style={{ marginTop: '0.5rem' }}>
          {project.description}
        </p>
      </div>

      {project.technologyStack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {[
            ...(project.technologyStack.frontend || []),
            ...(project.technologyStack.backend || []),
            ...(project.technologyStack.database || []),
          ]
            .slice(0, 4)
            .map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
        </div>
      )}

      <div className="entity-card-footer">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Layers size={14} /> Production Tier-1
        </span>
        <Link
          to={`/projects/${project.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--primary-800)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          View Specs <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
