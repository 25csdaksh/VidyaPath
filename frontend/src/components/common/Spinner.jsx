import React from 'react';

export const Spinner = ({ size = 'md', className = '', style = {} }) => {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';
  return <div className={`spinner ${sizeClass} ${className}`.trim()} style={style} role="status" aria-label="Loading" />;
};

export default Spinner;
