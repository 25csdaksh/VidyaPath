import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Map,
  Code,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Video,
  FileText,
  Trophy,
  Award,
  Bell,
  Bookmark,
  FileCheck,
  User,
  Sparkles,
  ShieldAlert,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

export const Sidebar = ({ isOpen, isCollapsed, onClose }) => {
  const { isAuthenticated, user } = useAuth();

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, requiresAuth: true },
    { label: 'AI Study Advisor', path: '/advisor', icon: Sparkles },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot, requiresAuth: true },
    { label: 'About CSE', path: '/about-cse', icon: Compass },
    { label: '4-Year Roadmap', path: '/roadmap', icon: Map },
    { label: 'Project Hub', path: '/projects', icon: Code },
    { label: 'Placement Hub', path: '/placement-hub', icon: Award },
    { label: 'Interview Prep', path: '/interviews', icon: HelpCircle },
    { label: 'Standard Books', path: '/books', icon: BookOpen },
    { label: 'Online Courses', path: '/courses', icon: GraduationCap },
    { label: 'YouTube Hub', path: '/youtube', icon: Video },
    { label: 'Notes & Syllabus', path: '/resources', icon: FileText },
    { label: 'Hackathons', path: '/hackathons', icon: Trophy },
    { label: 'Resume Guide', path: '/resume-guide', icon: FileCheck },
    { label: 'Resume Builder', path: '/resumes', icon: FileCheck, requiresAuth: true },
    { label: 'Announcements', path: '/announcements', icon: Bell },
    { label: 'My Bookmarks', path: '/bookmarks', icon: Bookmark, requiresAuth: true },
    { label: 'Profile', path: '/profile', icon: User, requiresAuth: true },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin Control', path: '/admin', icon: ShieldAlert, requiresAuth: true });
  }

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center' }}>
        <NavLink to="/" onClick={handleNavClick} className="sidebar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo size="sm" />
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          if (item.requiresAuth && !isAuthenticated) return null;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          VidyaPath v1.0.0
          <br />
          CSE Career Platform
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
