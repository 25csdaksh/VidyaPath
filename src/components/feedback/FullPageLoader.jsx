import React from 'react';
import Spinner from '../common/Spinner';
import Logo from '../common/Logo';

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
      <Logo size="lg" />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="md" />
      </div>
      <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600 }}>
        {message}
      </p>
    </div>
  );
};

export default FullPageLoader;
