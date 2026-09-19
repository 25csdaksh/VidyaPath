import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  Bookmark,
  Sparkles,
  BotMessageSquare,
  LayoutDashboard,
  Menu,
  X,
  LogIn
} from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import './Navbar.css';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  const primaryTabs = [
    { title: 'HOME', path: '/' },
    { title: 'ABOUT CSE', path: '/about-cse' },
    { title: 'LEARN', path: '/learn' },
    { title: 'PROJECT HUB', path: '/projects' },
    { title: 'HACKATHON HUB', path: '/hackathons' },
    { title: 'PLACEMENT HUB', path: '/placement' },
    { title: 'CAREER ROADMAP', path: '/roadmap' },
    { title: 'RESUME', path: '/resume' },
    { title: 'RESOURCES', path: '/resources' },
    { title: 'ANNOUNCEMENTS', path: '/announcements' },
  ];

  return (
    <>
      <header className="navbar">
        {/* Top Tier Bar */}
        <div className="navbar__top-tier">
          <div className="navbar__container">
            {/* Left: Brand Logo & Title */}
            <div className="navbar__left">
              {onToggleSidebar && (
                <button
                  className="navbar__sidebar-toggle"
                  onClick={onToggleSidebar}
                  aria-label="Toggle Navigation Drawer"
                >
                  <Menu size={20} />
                </button>
              )}

              <Link to="/" className="navbar__brand">
                <div className="navbar__logo-icon">
                  <Compass size={22} />
                </div>
                <div className="navbar__brand-text">
                  <span className="navbar__brand-title">VidyaPath</span>
                  <span className="navbar__brand-subtitle">CSE CAREER PORTAL</span>
                </div>
              </Link>
            </div>

            {/* Center: Universal Command-K Search Trigger */}
            <div className="navbar__center">
              <button
                className="navbar__search-trigger"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Open Global Search"
              >
                <Search size={16} className="navbar__search-icon" />
                <span className="navbar__search-placeholder">
                  Search 20 modules: projects, DSA, interview Q&A, books...
                </span>
                <kbd className="navbar__search-kbd">⌘K</kbd>
              </button>
            </div>

            {/* Right: AI Assistant, Bookmarks, Dashboard, Profile / Auth */}
            <div className="navbar__right">
              <Link to="/ai-assistant">
                <Button variant="secondary" size="sm" leftIcon={<BotMessageSquare size={16} />}>
                  AI Assistant
                </Button>
              </Link>

              <Link to="/bookmarks" className="navbar__icon-btn" title="My Bookmarks">
                <Bookmark size={18} />
              </Link>

              {isAuthenticated && user ? (
                <div className="navbar__user-section">
                  <Link to="/dashboard" className="navbar__icon-btn" title="Student Dashboard">
                    <LayoutDashboard size={18} />
                  </Link>

                  <div className="navbar__user-badge">
                    <div className="navbar__user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="navbar__user-name">{user.name.split(' ')[0]}</span>
                  </div>

                  <Button variant="ghost" size="sm" onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="navbar__auth-actions">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" leftIcon={<LogIn size={15} />}>
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm" leftIcon={<Sparkles size={15} />}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="navbar__mobile-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier Bar: Primary 10 Navigation Pillars */}
        <nav className="navbar__tabs-tier" aria-label="Primary Navigation">
          <div className="navbar__tabs-container">
            {primaryTabs.map((tab, idx) => (
              <NavLink
                key={idx}
                to={tab.path}
                className={({ isActive }) =>
                  `navbar__tab-item ${isActive ? 'navbar__tab-item--active' : ''}`
                }
              >
                {tab.title}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="navbar__mobile-dropdown">
            <div className="navbar__mobile-search">
              <button
                className="navbar__search-trigger navbar__search-trigger--mobile"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
              >
                <Search size={16} />
                <span>Search everything...</span>
                <kbd className="navbar__search-kbd">⌘K</kbd>
              </button>
            </div>

            <div className="navbar__mobile-tabs">
              {primaryTabs.map((tab, idx) => (
                <NavLink
                  key={idx}
                  to={tab.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `navbar__mobile-tab-item ${isActive ? 'navbar__mobile-tab-item--active' : ''}`
                  }
                >
                  {tab.title}
                </NavLink>
              ))}
              <NavLink
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="navbar__mobile-tab-item"
              >
                BOOKMARKS
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="navbar__mobile-tab-item"
              >
                STUDENT DASHBOARD
              </NavLink>
              <NavLink
                to="/ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="navbar__mobile-tab-item"
              >
                AI CAREER ASSISTANT
              </NavLink>
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
                    Create Free Student Profile
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

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
