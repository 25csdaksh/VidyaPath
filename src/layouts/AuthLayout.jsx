import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import Logo from '../components/common/Logo';

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect to dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card glass-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              textDecoration: 'none',
              marginBottom: '0.75rem',
            }}
          >
            <Logo size="xl" />
          </Link>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            CSE Career & Placement Preparation Platform
          </p>
        </div>

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AuthLayout;
