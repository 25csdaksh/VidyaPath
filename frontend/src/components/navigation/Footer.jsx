import React from 'react';

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem 2rem',
        marginTop: 'auto',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div>
        © {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)' }}>VidyaPath</strong>. Built for Computer Science Engineering students.
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="#about" style={{ color: 'var(--text-secondary)' }}>About</a>
        <a href="#roadmap" style={{ color: 'var(--text-secondary)' }}>Roadmaps</a>
        <a href="#projects" style={{ color: 'var(--text-secondary)' }}>Projects</a>
        <a href="#privacy" style={{ color: 'var(--text-secondary)' }}>Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;
