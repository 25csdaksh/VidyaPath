import React from 'react';
import { Inbox } from 'lucide-react';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__icon-wrapper">
        {icon || <Inbox className="empty-state__icon" size={32} />}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};
