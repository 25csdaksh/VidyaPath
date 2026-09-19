import React from 'react';

export const Card = ({
  children,
  interactive = false,
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  const cardClass = `glass-card ${interactive ? 'glass-card-interactive' : ''} ${className}`.trim();

  return (
    <div className={cardClass} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
