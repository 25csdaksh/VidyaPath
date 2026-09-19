import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import './NotFound.css';

export const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found__container">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__description">
          The requested resource or module could not be found. It might have been relocated, or is scheduled for release in the upcoming phase.
        </p>

        <div className="not-found__actions">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home size={18} />}>
              Return to Home
            </Button>
          </Link>
          <Link to="/about-cse">
            <Button variant="outline" size="md" leftIcon={<HelpCircle size={18} />}>
              Explore CSE Guide
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
