import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [], showHome = true, className = '' }) => {
  return (
    <nav className={`breadcrumb-nav ${className}`.trim()} aria-label="Breadcrumb">
      {showHome && (
        <div className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link" style={{ display: 'flex', alignItems: 'center' }}>
            <Home size={14} />
          </Link>
          {items.length > 0 && <ChevronRight size={14} color="var(--text-muted)" />}
        </div>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="breadcrumb-item">
            {isLast || !item.link ? (
              <span className="breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.link} className="breadcrumb-link">
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight size={14} color="var(--text-muted)" />}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
