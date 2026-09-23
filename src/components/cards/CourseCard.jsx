import React from 'react';
import { GraduationCap, Star, Clock, ExternalLink } from 'lucide-react';
import Badge from '../common/Badge';

export const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <Badge variant="info">
          <GraduationCap size={12} /> {course.provider}
        </Badge>
        <Badge variant="secondary">{course.difficulty}</Badge>
      </div>

      <div>
        <h3 className="entity-card-title">{course.title}</h3>
        <p className="entity-card-desc" style={{ marginTop: '0.4rem' }}>
          {course.description}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        {course.rating && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)', fontWeight: 600 }}>
            <Star size={14} fill="currentColor" /> {course.rating}
          </span>
        )}
        {course.estimatedHours && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> ~{course.estimatedHours} hrs
          </span>
        )}
      </div>

      <div className="entity-card-footer">
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {course.institution || course.instructor || 'Online Specialization'}
        </span>
        <a
          href={course.url}
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
          Enroll Now <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
