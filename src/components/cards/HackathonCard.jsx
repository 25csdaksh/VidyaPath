import React from 'react';
import { Trophy, Calendar, Users, ExternalLink } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export const HackathonCard = ({ hackathon }) => {
  if (!hackathon) return null;

  const statusVariant =
    hackathon.status === 'Active' ? 'success' : hackathon.status === 'Upcoming' ? 'warning' : 'secondary';

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <Badge variant={statusVariant}>
          <Trophy size={12} /> {hackathon.status || 'Upcoming'}
        </Badge>
        <Badge variant="secondary">{hackathon.mode || 'Online'}</Badge>
      </div>

      <div>
        <h3 className="entity-card-title">{hackathon.name}</h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Organized by {hackathon.organizer}
        </p>
        <p className="entity-card-desc" style={{ marginTop: '0.5rem' }}>
          {hackathon.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={14} color="var(--primary-800)" />
          <span>Deadline: <strong>{formatDate(hackathon.registrationDeadline)}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Users size={14} color="var(--text-muted)" />
          <span>{hackathon.teamSize || '1-4 Members'}</span>
        </div>
      </div>

      <div className="entity-card-footer">
        <span style={{ fontSize: '0.775rem', color: 'var(--color-warning)', fontWeight: 600 }}>
          {hackathon.prizeInformation || 'Prizes & Certificates'}
        </span>
        <a
          href={hackathon.registrationUrl}
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
          Register <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default HackathonCard;
