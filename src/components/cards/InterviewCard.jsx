import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const InterviewCard = ({ question, onMarkComplete, isCompleted = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (!question) return null;

  const difficultyVariant =
    question.difficulty === 'Hard' ? 'danger' : question.difficulty === 'Medium' ? 'warning' : 'success';

  return (
    <div className="entity-card">
      <div className="entity-card-header">
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Badge variant="primary">{question.category}</Badge>
          <Badge variant="info">{question.topic}</Badge>
          <Badge variant={difficultyVariant}>{question.difficulty}</Badge>
        </div>
        {isCompleted && (
          <Badge variant="success">
            <CheckCircle2 size={12} /> Practiced
          </Badge>
        )}
      </div>

      <div>
        <h3 className="entity-card-title" style={{ fontSize: '1.05rem' }}>
          {question.question}
        </h3>
      </div>

      {expanded && (
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Model Answer:
          </div>
          {question.answer}

          {question.keyTakeaways && question.keyTakeaways.length > 0 && (
            <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '0.5rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--primary-800)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Sparkles size={12} /> Key Takeaways:
              </div>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                {question.keyTakeaways.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="entity-card-footer">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setExpanded((prev) => !prev)}
          style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <span>{expanded ? 'Hide Answer' : 'Reveal Answer'}</span>
          <ChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
        </button>

        {onMarkComplete && !isCompleted && (
          <Button
            variant="outline"
            size="sm"
            icon={CheckCircle2}
            onClick={() => onMarkComplete(question)}
          >
            Mark Practiced
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
