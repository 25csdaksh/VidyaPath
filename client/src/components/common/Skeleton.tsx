import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return <div className={`skeleton skeleton--${variant} ${className}`} style={style} />;
};
