import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '50vh',
        gap: '1.25rem',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          color: 'var(--primary-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Compass size={40} />
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800 }}>404</h1>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600 }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', lineHeight: 1.6 }}>
        The page or career resource you are looking for does not exist or has been relocated.
      </p>
      <Link to="/">
        <Button variant="primary" icon={Home}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
