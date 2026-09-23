import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showPercentage = true,
  variant = 'primary', // primary, success, warning, danger
  size = 'md', // sm, md, lg
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const height = size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px';

  let fillBackground = 'var(--primary-gradient)';
  if (variant === 'success') fillBackground = 'var(--color-success)';
  if (variant === 'warning') fillBackground = 'var(--color-warning)';
  if (variant === 'danger') fillBackground = 'var(--color-danger)';

  return (
    <div className={`progress-bar-container ${className}`.trim()}>
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="progress-bar-track" style={{ height }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, background: fillBackground }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
