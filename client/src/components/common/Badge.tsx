import React from 'react';
import './Badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`} {...props}>
      {icon && <span className="badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
