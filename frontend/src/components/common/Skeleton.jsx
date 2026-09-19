import React from 'react';

export const Skeleton = ({
  width = '100%',
  height = '1.25rem',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton height="1.5rem" width="60%" />
      <Skeleton height="1rem" width="90%" />
      <Skeleton height="1rem" width="75%" />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Skeleton height="1.75rem" width="80px" borderRadius="9999px" />
        <Skeleton height="1.75rem" width="80px" borderRadius="9999px" />
      </div>
    </div>
  );
};

export default Skeleton;
