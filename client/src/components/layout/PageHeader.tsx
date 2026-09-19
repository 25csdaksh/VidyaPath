import React from 'react';
import './PageHeader.css';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
}) => {
  return (
    <div className="page-header">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="page-header__breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="page-header__breadcrumb-item">
              {crumb.href ? (
                <a href={crumb.href}>{crumb.label}</a>
              ) : (
                <span className="page-header__breadcrumb-current">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className="page-header__breadcrumb-sep">/</span>}
            </span>
          ))}
        </nav>
      )}

      <div className="page-header__content">
        <div className="page-header__title-group">
          <div className="page-header__title-wrapper">
            <h1 className="page-header__title">{title}</h1>
            {badge && <div className="page-header__badge">{badge}</div>}
          </div>
          {description && <p className="page-header__description">{description}</p>}
        </div>

        {actions && <div className="page-header__actions">{actions}</div>}
      </div>
    </div>
  );
};
