import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  FolderGit2,
  Milestone,
  Briefcase,
  Sparkles
} from 'lucide-react';
import './MobileNav.css';

export const MobileNav: React.FC = () => {
  const navItems = [
    { title: 'Home', path: '/', icon: <Home size={20} /> },
    { title: 'Roadmap', path: '/roadmap', icon: <Milestone size={20} /> },
    { title: 'Projects', path: '/projects', icon: <FolderGit2 size={20} /> },
    { title: 'Placement', path: '/placement', icon: <Briefcase size={20} /> },
    { title: 'AI Guide', path: '/ai-assistant', icon: <Sparkles size={20} /> },
  ];

  return (
    <nav className="mobile-nav" aria-label="Mobile Navigation">
      <div className="mobile-nav__container">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `mobile-nav__item ${isActive ? 'mobile-nav__item--active' : ''}`
            }
          >
            <span className="mobile-nav__icon">{item.icon}</span>
            <span className="mobile-nav__label">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
