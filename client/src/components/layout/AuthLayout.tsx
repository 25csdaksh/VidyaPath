import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass, CheckCircle2 } from 'lucide-react';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__brand-side">
        <div className="auth-layout__brand-header">
          <Link to="/" className="auth-layout__logo">
            <div className="auth-layout__logo-icon">
              <Compass size={24} />
            </div>
            <span className="auth-layout__logo-title">CSE Career Portal</span>
          </Link>
        </div>

        <div className="auth-layout__hero-message">
          <span className="auth-layout__tag">Built for Computer Science Engineers</span>
          <h2>Accelerate your journey from student to top-tier engineer.</h2>
          <p>
            Join thousands of CSE peers preparing for tech placements, exploring roadmaps, and mastering coding skills.
          </p>

          <div className="auth-layout__features">
            <div className="auth-layout__feature-item">
              <CheckCircle2 size={18} className="auth-layout__check-icon" />
              <span>Structured semester roadmaps & curriculum guides</span>
            </div>
            <div className="auth-layout__feature-item">
              <CheckCircle2 size={18} className="auth-layout__check-icon" />
              <span>Curated YouTube channels, Coursera certifications & notes</span>
            </div>
            <div className="auth-layout__feature-item">
              <CheckCircle2 size={18} className="auth-layout__check-icon" />
              <span>Campus drive archives & interview prep sets</span>
            </div>
          </div>
        </div>

        <div className="auth-layout__brand-footer">
          <span>© {new Date().getFullYear()} CSE Career Portal</span>
        </div>
      </div>

      <div className="auth-layout__form-side">
        <div className="auth-layout__form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
