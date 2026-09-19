import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import './ErrorState.css';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected issue while loading this content. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`error-state ${className}`}>
      <div className="error-state__icon-wrapper">
        <AlertTriangle className="error-state__icon" size={32} />
      </div>
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RotateCcw size={16} />}
          onClick={onRetry}
          className="error-state__retry-btn"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
