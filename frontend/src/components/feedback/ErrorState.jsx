import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ShieldAlert,
  Search,
  Clock,
  Server,
  WifiOff,
  RefreshCw,
  Lock,
  Home,
  ArrowLeft,
  LogIn,
} from 'lucide-react';
import Button from '../common/Button';
import { getErrorDetails, extractStatusCode } from '../../utils/errorHandler';

export const ErrorState = ({
  error,
  statusCode: propStatusCode,
  title: propTitle,
  message: propMessage,
  onRetry,
  onAction,
  actionLabel: propActionLabel,
  className = '',
}) => {
  const navigate = useNavigate();

  const errorDetails = error ? getErrorDetails(error) : null;
  const statusCode = propStatusCode || errorDetails?.statusCode || null;
  const title = propTitle || errorDetails?.title || 'Unable to Load Content';
  const message = propMessage || errorDetails?.message || 'An error occurred while connecting to the server. Please try again.';
  const isNetwork = errorDetails?.isNetworkError;

  // Determine icon & theme based on status code
  const getStatusPresentation = () => {
    if (isNetwork) {
      return {
        icon: WifiOff,
        bg: 'var(--color-warning-bg)',
        color: 'var(--color-warning)',
        defaultActionLabel: 'Retry Connection',
        handleAction: onRetry || (() => window.location.reload()),
      };
    }

    switch (statusCode) {
      case 401:
        return {
          icon: Lock,
          bg: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          defaultActionLabel: 'Sign In Again',
          handleAction: onAction || (() => navigate('/login')),
        };
      case 403:
        return {
          icon: ShieldAlert,
          bg: 'var(--color-danger-bg)',
          color: 'var(--color-danger)',
          defaultActionLabel: 'Return to Dashboard',
          handleAction: onAction || (() => navigate('/dashboard')),
        };
      case 404:
        return {
          icon: Search,
          bg: 'var(--primary-100)',
          color: 'var(--primary-800)',
          defaultActionLabel: 'Browse All Roadmaps',
          handleAction: onAction || (() => navigate('/roadmap')),
        };
      case 429:
        return {
          icon: Clock,
          bg: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          defaultActionLabel: 'Wait and Retry',
          handleAction: onRetry,
        };
      case 500:
      default:
        return {
          icon: Server,
          bg: 'var(--color-danger-bg)',
          color: 'var(--color-danger)',
          defaultActionLabel: 'Retry Request',
          handleAction: onRetry,
        };
    }
  };

  const presentation = getStatusPresentation();
  const Icon = presentation.icon;
  const actionLabel = propActionLabel || errorDetails?.actionLabel || presentation.defaultActionLabel;
  const handleAction = onRetry || onAction || presentation.handleAction;

  return (
    <div
      className={`state-container ${className}`.trim()}
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="state-icon-wrapper"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          background: presentation.bg,
          color: presentation.color,
        }}
      >
        <Icon size={32} />
      </div>

      <h3 className="state-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        {title}
      </h3>

      <p className="state-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {message}
      </p>

      {handleAction && (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="primary" size="md" icon={RefreshCw} onClick={handleAction}>
            {actionLabel}
          </Button>
          {statusCode === 403 && (
            <Button variant="outline" size="md" icon={Home} onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorState;
