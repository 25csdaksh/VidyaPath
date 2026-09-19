import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  Bookmark,
  Bell,
  Menu,
  X,
  Sparkles,
  User as UserIcon,
  LogIn
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          {onToggleSidebar && (
            <button
              className="navbar__sidebar-toggle"
              onClick={onToggleSidebar}
              aria-label="Toggle Navigation Sidebar"
            >
              <Menu size={20} />
            </button>
          )}

          <Link to="/" className="navbar__brand">
            <div className="navbar__logo-icon">
              <Compass size={22} />
            </div>
            <div className="navbar__brand-text">
              <span className="navbar__brand-title">CSE Career</span>
              <span className="navbar__brand-subtitle">PORTAL</span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar Trigger */}
        <div className="navbar__center">
          <div className="navbar__search-trigger" onClick={() => {}}>
            <Search size={16} className="navbar__search-icon" />
            <span className="navbar__search-placeholder">
              Search courses, roadmaps, projects, companies...
            </span>
            <kbd className="navbar__search-kbd">⌘K</kbd>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="navbar__right">
          <nav className="navbar__nav-links">
            <Link to="/about-cse" className="navbar__nav-link">
              About CSE
            </Link>
            <Link to="/roadmaps" className="navbar__nav-link">
              Roadmaps
            </Link>
            <Link to="/resources/youtube" className="navbar__nav-link">
              Resources
            </Link>
            <Link to="/placement-hub" className="navbar__nav-link">
              Placements
            </Link>
          </nav>

          <div className="navbar__divider" />

          {isAuthenticated && user ? (
            <div className="navbar__user-actions">
              <Link to="/bookmarks" className="navbar__icon-btn" title="Saved Bookmarks">
                <Bookmark size={18} />
              </Link>
              <Link to="/notifications" className="navbar__icon-btn" title="Notifications">
                <Bell size={18} />
                <span className="navbar__unread-dot" />
              </Link>
              <div className="navbar__user-profile">
                <div className="navbar__user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="navbar__user-meta">
                  <span className="navbar__user-name">{user.name}</span>
                  <Badge variant="brand" size="sm">
                    {user.role}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="navbar__auth-actions">
              <Link to="/login">
                <Button variant="ghost" size="sm" leftIcon={<LogIn size={16} />}>
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" leftIcon={<Sparkles size={16} />}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="navbar__mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-links">
            <Link to="/about-cse" onClick={() => setMobileMenuOpen(false)}>
              About CSE
            </Link>
            <Link to="/roadmaps" onClick={() => setMobileMenuOpen(false)}>
              Career Roadmaps
            </Link>
            <Link to="/resources/youtube" onClick={() => setMobileMenuOpen(false)}>
              Learning Hub
            </Link>
            <Link to="/placement-hub" onClick={() => setMobileMenuOpen(false)}>
              Placement Hub
            </Link>
            <Link to="/hackathons" onClick={() => setMobileMenuOpen(false)}>
              Hackathons
            </Link>
          </div>
          <div className="navbar__mobile-auth">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                >
                  Create Student Account
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
