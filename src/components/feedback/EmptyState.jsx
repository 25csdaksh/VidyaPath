import React from 'react';
import { Inbox } from 'lucide-react';
import Button from '../common/Button';

export const EmptyState = ({
  title = 'No items found',
  description = 'There are currently no items matching your criteria or filters.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`state-container ${className}`.trim()}>
      <div
        className="state-icon-wrapper"
        style={{
          background: 'var(--primary-50)',
          color: 'var(--primary-800)',
        }}
      >
        <Icon size={32} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-desc">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} style={{ marginTop: '0.5rem' }}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
