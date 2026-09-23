import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Moon,
  Sun,
  User,
  LogOut,
  Shield,
  Menu,
  Sparkles,
  BookOpen,
  Settings,
  Bell,
  Flame,
  CheckCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Search from '../common/Search';
import Dropdown from '../common/Dropdown';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Close notifications dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const userMenuItems = [
    { label: 'My Dashboard', icon: Sparkles, onClick: () => navigate('/dashboard') },
    { label: 'Profile Settings', icon: User, onClick: () => navigate('/profile') },
    { label: 'Bookmarks & Collections', icon: BookOpen, onClick: () => navigate('/bookmarks') },
    { divider: true },
    { label: 'Sign Out', icon: LogOut, onClick: () => logout(true) },
  ];

  return (
    <header className="app-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, maxWidth: '600px' }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          style={{ display: 'flex', alignItems: 'center', padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
        >
          <Menu size={20} />
        </button>

        <div className="navbar-search-wrapper" style={{ flex: 1, maxWidth: '420px' }}>
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            onClear={() => setSearchQuery('')}
            placeholder="Search projects, DSA, books, roadmap..."
          />
        </div>
      </div>

      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* AI Career Assistant Studio Button */}
        {isAuthenticated && (
          <Link
            to="/ai-assistant"
            style={{ textDecoration: 'none' }}
            title="Open AI Career Studio"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(22, 101, 52, 0.1)',
                color: '#166534',
                border: '1px solid rgba(22, 101, 52, 0.25)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Sparkles size={15} color="#166534" />
              <span className="navbar-pill-text">AI Assistant</span>
            </div>
          </Link>
        )}

        {/* Learning Streak Pill */}
        {isAuthenticated && (
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none' }}
            title="Your Daily Active Learning Streak. Keep it going!"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(234, 88, 12, 0.12)',
                color: '#ea580c',
                border: '1px solid rgba(234, 88, 12, 0.25)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Flame size={16} fill="#ea580c" />
              <span className="navbar-pill-text">Streak</span>
            </div>
          </Link>
        )}

        {/* Notifications Popover */}
        {isAuthenticated && (
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Notifications"
              title="Notifications"
              style={{
                position: 'relative',
                borderRadius: '50%',
                padding: '0.55rem',
                border: '1px solid var(--border-color)',
              }}
            >
              <Bell size={17} color="var(--text-primary)" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#dc2626',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '340px',
                  maxHeight: '440px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--bg-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                      Notifications
                    </span>
                    {unreadCount > 0 && <Badge variant="primary">{unreadCount} New</Badge>}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-800)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <CheckCheck size={14} /> Mark all read
                    </button>
                  )}
                </div>

                <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      No notifications at this time.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        onClick={() => {
                          markAsRead(n._id);
                          if (n.actionUrl) {
                            navigate(n.actionUrl);
                            setIsNotifOpen(false);
                          }
                        }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: '0.35rem',
                          background: n.isRead ? 'transparent' : 'var(--primary-50)',
                          borderLeft: n.isRead ? '3px solid transparent' : '3px solid var(--primary-800)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                            {n.title}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          style={{ borderRadius: '50%', padding: '0.55rem', border: '1px solid var(--border-color)' }}
        >
          {isDark ? <Sun size={17} color="#eab308" /> : <Moon size={17} color="var(--primary-800)" />}
        </button>

        {isAuthenticated ? (
          <Dropdown
            align="right"
            items={userMenuItems}
            trigger={
              <button
                className="btn btn-ghost btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.35rem 0.65rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.825rem',
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="navbar-user-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {user?.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {isAdmin ? 'Admin' : 'Student'}
                  </span>
                </div>
              </button>
            }
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/login" className="btn btn-outline btn-sm">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
