import React from 'react';

export const Badge = ({
  children,
  variant = 'primary', // primary, success, warning, danger, info
  icon: Icon,
  className = '',
  style = {},
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} style={style}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};

export default Badge;
