import React from 'react';
import Spinner from '../common/Spinner';

export const FullPageLoader = ({ message = 'Loading VidyaPath Hub...' }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        zIndex: 99999,
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="lg" />
      </div>
      <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>
        {message}
      </p>
    </div>
  );
};

export default FullPageLoader;
