import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Trophy,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Award,
  Sparkles,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import hackathonService from '../services/hackathonService';
import { getErrorDetails } from '../utils/errorHandler';

export const HackathonDetailsPage = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const fetchDetails = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await hackathonService.getHackathonById(id);
      setHackathon(res.data || res);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Back Link */}
      <div>
        <Link to="/hackathons" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Hackathon Hub
        </Link>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={200} variant="rounded" />
          <div className="cards-grid-2">
            <Skeleton height={300} variant="rounded" />
            <Skeleton height={300} variant="rounded" />
          </div>
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchDetails} />
      ) : !hackathon ? (
        <EmptyState
          title="Hackathon Not Found"
          message="The requested hackathon could not be found."
          actionLabel="View All Hackathons"
          onAction={() => window.location.assign('/hackathons')}
        />
      ) : (
        <>
          {/* Header Banner */}
          <Card style={{ padding: '2.5rem 2rem', background: 'var(--bg-secondary)', borderLeft: '6px solid #166534' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <Badge variant={hackathon.status === 'Active' ? 'success' : hackathon.status === 'Upcoming' ? 'primary' : 'neutral'}>
                    {hackathon.status}
                  </Badge>
                  <Badge variant="info">{hackathon.mode}</Badge>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Organized by: <strong style={{ color: 'var(--text-primary)' }}>{hackathon.organizer}</strong>
                  </span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {hackathon.name}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '800px' }}>
                  {hackathon.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href={hackathon.registrationUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" icon={ExternalLink} iconPosition="right">
                    Register on Official Portal
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          {/* Details Grid */}
          <div className="cards-grid-2">
            {/* Timeline & Logistics */}
            <div className="detail-section-box">
              <h2 className="detail-section-title">
                <Calendar size={20} color="var(--primary-800)" /> Schedule & Key Deadlines
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Registration Deadline:</span>
                  <strong style={{ color: 'var(--color-danger)' }}>
                    {new Date(hackathon.registrationDeadline).toLocaleDateString()}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Hackathon Start Date:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {new Date(hackathon.startDate).toLocaleDateString()}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Hackathon End Date:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {new Date(hackathon.endDate).toLocaleDateString()}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Venue / Location:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{hackathon.location}</strong>
                </div>
              </div>
            </div>

            {/* Eligibility & Prizes */}
            <div className="detail-section-box">
              <h2 className="detail-section-title">
                <Award size={20} color="var(--primary-800)" /> Prizes & Participation
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--color-warning-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-warning)', marginBottom: '0.25rem' }}>PRIZE POOL</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {hackathon.prizeInformation}
                  </div>
                </div>

                <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Team Size: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{hackathon.teamSize}</strong>
                </div>

                <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Eligibility: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{hackathon.eligibility}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Themes & Tech Stacks */}
          {((hackathon.problemThemes && hackathon.problemThemes.length > 0) || (hackathon.technology && hackathon.technology.length > 0)) && (
            <div className="detail-section-box">
              <h2 className="detail-section-title">
                <Layers size={20} color="var(--primary-800)" /> Problem Themes & Focus Areas
              </h2>
              {hackathon.problemThemes && hackathon.problemThemes.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>THEMES</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {hackathon.problemThemes.map((theme, idx) => (
                      <Badge key={idx} variant="primary">{theme}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {hackathon.technology && hackathon.technology.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TECHNOLOGIES & PLATFORMS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {hackathon.technology.map((tech, idx) => (
                      <Badge key={idx} variant="neutral">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HackathonDetailsPage;
