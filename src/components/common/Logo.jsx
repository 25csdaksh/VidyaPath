import React from 'react';
import logoImg from '../../assets/logo.png';

export const Logo = ({
  size = 'md', // sm, md, lg, xl, 2xl
  showSubtitle = false,
  className = '',
  style = {},
  imgStyle = {},
  variant = 'contained', // 'contained' (with clean white capsule), 'plain'
}) => {
  const sizeMap = {
    xs: { height: '24px', pad: '2px 4px', font: '0.9rem' },
    sm: { height: '32px', pad: '2px 5px', font: '1.1rem' },
    md: { height: '40px', pad: '3px 6px', font: '1.3rem' },
    lg: { height: '52px', pad: '4px 8px', font: '1.5rem' },
    xl: { height: '70px', pad: '6px 10px', font: '1.8rem' },
    '2xl': { height: '90px', pad: '8px 12px', font: '2.2rem' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`vidyapath-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        ...style,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: variant === 'contained' ? '#ffffff' : 'transparent',
          borderRadius: '8px',
          padding: variant === 'contained' ? currentSize.pad : 0,
          boxShadow: variant === 'contained' ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        <img
          src={logoImg}
          alt="VidyaPath - Gyan Anupath"
          style={{
            height: currentSize.height,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            ...imgStyle,
          }}
        />
      </div>

      {showSubtitle && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: currentSize.font,
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            VidyaPath
          </span>
          <span
            style={{
              fontSize: '0.725rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            GYAN ANUPATH • LEARN • PLAN • GROW
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
