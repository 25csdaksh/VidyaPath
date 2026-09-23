import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight, CheckCircle, BookOpen, Code } from 'lucide-react';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

export const RoadmapCard = ({ roadmap, progressPercentage = 0 }) => {
  if (!roadmap) return null;

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <Badge variant="primary">Year {roadmap.year}</Badge>
        <Badge variant="info">Semester {roadmap.semester}</Badge>
      </div>

      <div>
        <h3 className="entity-card-title">{roadmap.title}</h3>
        <p className="entity-card-desc" style={{ marginTop: '0.4rem' }}>
          {roadmap.description}
        </p>
      </div>

      {roadmap.subjects && roadmap.subjects.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Core Focus:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {roadmap.subjects.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {progressPercentage > 0 && (
        <ProgressBar
          value={progressPercentage}
          label="Your Progress"
          size="sm"
          variant={progressPercentage === 100 ? 'success' : 'primary'}
        />
      )}

      <div className="entity-card-footer">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Map size={14} /> Full Curriculum
        </span>
        <Link
          to={`/roadmap/semester/${roadmap.semester}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--primary-800)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Explore Roadmap <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RoadmapCard;
