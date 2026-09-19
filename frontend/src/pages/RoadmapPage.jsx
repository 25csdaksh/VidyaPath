import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Map,
  CheckCircle2,
  Circle,
  BookOpen,
  Code,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ExternalLink,
  Award,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import roadmapService from '../services/roadmapService';
import dashboardService from '../services/dashboardService';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { useAuth } from '../context/AuthContext';
import { getErrorDetails } from '../utils/errorHandler';

export const RoadmapPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSem = parseInt(searchParams.get('sem') || '1', 10);
  const [selectedSem, setSelectedSem] = useState(initialSem >= 1 && initialSem <= 8 ? initialSem : 1);
  const [roadmapData, setRoadmapData] = useState(null);
  const [items, setItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  const { completedItemIds, toggleMilestone } = useRoadmapProgress(roadmapData?._id, selectedSem);

  const semesters = [
    { sem: 1, year: 'FY', label: 'Sem 1 • Foundations' },
    { sem: 2, year: 'FY', label: 'Sem 2 • Data Structures' },
    { sem: 3, year: 'SY', label: 'Sem 3 • OOP & Architecture' },
    { sem: 4, year: 'SY', label: 'Sem 4 • OS & DBMS' },
    { sem: 5, year: 'TY', label: 'Sem 5 • Networks & Web' },
    { sem: 6, year: 'TY', label: 'Sem 6 • Cloud & Internships' },
    { sem: 7, year: 'FINAL', label: 'Sem 7 • AI & Capstone' },
    { sem: 8, year: 'FINAL', label: 'Sem 8 • Placement Season' },
  ];

  const fetchRoadmap = useCallback(async (sem) => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await roadmapService.getRoadmapBySemester(sem);
      const data = res.data || res;
      const rm = data.roadmap || data;
      setRoadmapData(rm);
      setItems(data.items || []);

      if (isAuthenticated && rm?._id) {
        dashboardService.recordRecentView({
          resourceType: 'Roadmap',
          resourceId: rm._id,
          title: rm.title || `Semester ${sem} Roadmap`,
          category: `Semester ${sem}`,
          url: `/roadmap?sem=${sem}`,
        }).catch(() => {});
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchRoadmap(selectedSem);
  }, [selectedSem, fetchRoadmap]);

  const handleSemesterChange = (sem) => {
    setSelectedSem(sem);
    setSearchParams({ sem });
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const progressPercentage = items.length > 0
    ? Math.round((completedItemIds.length / items.length) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary">4-Year Engineering Track</Badge>
            <Badge variant="neutral">Semester {selectedSem} of 8</Badge>
          </div>
          <h1>CSE Career & Curriculum Roadmap</h1>
          <p>
            Structured milestones, core subject mastery, practical development goals, and interview preparation checkpoints.
          </p>
        </div>
      </div>

      {/* Semester Navigation Bar */}
      <div className="semester-nav-pills">
        {semesters.map((s) => (
          <button
            key={s.sem}
            className={`semester-pill ${selectedSem === s.sem ? 'active' : ''}`}
            onClick={() => handleSemesterChange(s.sem)}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={140} variant="rounded" />
          <Skeleton height={80} variant="rounded" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} height={120} variant="rounded" />
            ))}
          </div>
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={() => fetchRoadmap(selectedSem)} />
      ) : !roadmapData ? (
        <EmptyState
          title="No Roadmap Found"
          message={`No roadmap details are currently published for Semester ${selectedSem}.`}
          actionLabel="Try Semester 1"
          onAction={() => handleSemesterChange(1)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Semester Overview Banner */}
          <Card style={{ padding: '2rem', background: 'var(--bg-secondary)', borderLeft: '5px solid #166534' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>{roadmapData.year} Year</Badge>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {roadmapData.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
                  {roadmapData.description}
                </p>
              </div>

              {/* Progress Summary */}
              <div style={{ minWidth: '220px', background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Your Progress</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                    {progressPercentage}%
                  </span>
                </div>
                <ProgressBar progress={progressPercentage} size="md" variant="primary" />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                  {completedItemIds.length} of {items.length} milestones completed
                </div>
              </div>
            </div>

            {/* Career Focus Tags */}
            {roadmapData.careerPaths && roadmapData.careerPaths.length > 0 && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Target Career Paths:</span>
                {roadmapData.careerPaths.map((cp) => (
                  <Badge key={cp} variant="neutral">{cp}</Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Academic Subjects Row */}
          {roadmapData.subjects && roadmapData.subjects.length > 0 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Core Academic Subjects ({roadmapData.subjects.length})
              </h3>
              <div className="cards-grid-3">
                {roadmapData.subjects.map((sub, idx) => (
                  <Card key={idx} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Badge variant={sub.isCore ? 'primary' : 'neutral'}>
                        {sub.isCore ? 'Core Subject' : 'Elective'}
                      </Badge>
                      {sub.credits && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{sub.credits} Credits</span>}
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sub.name}</h4>
                    {sub.description && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                        {sub.description}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Structured Milestones Timeline */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Milestone Execution Checklist ({items.length})
              </h3>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Click checkbox to track your milestone completion
              </span>
            </div>

            {items.length === 0 ? (
              <EmptyState
                title="No Detailed Milestones Added"
                message="Detailed curriculum milestones for this semester are being curated."
              />
            ) : (
              <div className="roadmap-timeline">
                {items.map((item, index) => {
                  const isChecked = completedItemIds.includes(item._id);
                  const isExpanded = !!expandedItems[item._id];

                  return (
                    <div key={item._id} className={`milestone-item ${isChecked ? 'completed' : ''}`}>
                      <div
                        className={`milestone-checkbox ${isChecked ? 'checked' : ''}`}
                        onClick={() => toggleMilestone(item._id, roadmapData._id, items.length)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                      >
                        {isChecked && <CheckCircle2 size={16} />}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                              <Badge variant="neutral">Milestone {index + 1}</Badge>
                              <Badge variant="info">{item.category}</Badge>
                            </div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: isChecked ? 'var(--primary-800)' : 'var(--text-primary)' }}>
                              {item.topicName}
                            </h4>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            icon={isExpanded ? ChevronUp : ChevronDown}
                            iconPosition="right"
                            onClick={() => toggleExpand(item._id)}
                          >
                            {isExpanded ? 'Collapse' : 'Details'}
                          </Button>
                        </div>

                        {item.description && (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                            {item.description}
                          </p>
                        )}

                        {/* Collapsible Deep Details */}
                        {isExpanded && (
                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {item.learnGuide && (
                              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Learning Roadmap:</div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                                  {item.learnGuide}
                                </p>
                              </div>
                            )}

                            {/* Practice Checklist */}
                            {item.practiceChecklist && item.practiceChecklist.length > 0 && (
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Practice Checklist:</div>
                                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                  {item.practiceChecklist.map((task, idx) => (
                                    <li key={idx}>
                                      {task.task}
                                      {task.resourceLink && (
                                        <a href={task.resourceLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                                          [Open Resource]
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Build Milestones */}
                            {item.buildMilestones && item.buildMilestones.length > 0 && (
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Hands-on Build Specs:</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  {item.buildMilestones.map((b, idx) => (
                                    <div key={idx} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{b.title}</div>
                                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{b.specification}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
