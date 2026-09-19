import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Video,
  Award,
  FolderGit2,
  FileCode2,
  Trophy,
  Megaphone,
  BotMessageSquare,
  Milestone,
  FileText,
  Briefcase,
  Layers,
  HelpCircle,
  Bookmark,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sections: NavSection[] = [
    {
      heading: 'Platform Overview',
      items: [
        { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { title: 'About CSE', path: '/about-cse', icon: <GraduationCap size={18} /> },
        { title: 'Progress & Streaks', path: '/progress', icon: <TrendingUp size={18} /> },
      ],
    },
    {
      heading: 'Learning & Practice Hub',
      items: [
        { title: 'YouTube Hub', path: '/resources/youtube', icon: <Video size={18} /> },
        { title: 'Coursera Directory', path: '/resources/coursera', icon: <Award size={18} /> },
        { title: 'Project Blueprints', path: '/resources/projects', icon: <FolderGit2 size={18} /> },
        { title: 'Notes & Platforms', path: '/resources/notes', icon: <FileCode2 size={18} /> },
        { title: 'Coding Roadmaps', path: '/roadmap', icon: <Milestone size={18} />, badge: 'Popular' },
        { title: 'Skill Assessments', path: '/assessments', icon: <HelpCircle size={18} /> },
      ],
    },
    {
      heading: 'Career & Opportunities',
      items: [
        { title: 'Placement Hub', path: '/placement', icon: <Briefcase size={18} /> },
        { title: 'Interview Preparation', path: '/interview-prep', icon: <Layers size={18} /> },
        { title: 'Hackathon Hub', path: '/hackathons', icon: <Trophy size={18} />, badge: 'Live' },
        { title: 'Announcements', path: '/announcements', icon: <Megaphone size={18} /> },
        { title: 'Resume Builder', path: '/resume', icon: <FileText size={18} /> },
        { title: 'AI Career Chatbot', path: '/ai-assistant', icon: <BotMessageSquare size={18} />, badge: 'AI' },
      ],
    },
    {
      heading: 'Personal & Admin',
      items: [
        { title: 'Bookmarks & Saved', path: '/bookmarks', icon: <Bookmark size={18} /> },
        { title: 'Admin Moderation', path: '/admin', icon: <ShieldAlert size={18} />, badge: 'Staff' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar__backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          {sections.map((section, idx) => (
            <div key={idx} className="sidebar__section">
              <span className="sidebar__heading">{section.heading}</span>
              <nav className="sidebar__nav">
                {section.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                    }
                  >
                    <span className="sidebar__link-icon">{item.icon}</span>
                    <span className="sidebar__link-title">{item.title}</span>
                    {item.badge && (
                      <span className="sidebar__link-badge">{item.badge}</span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
