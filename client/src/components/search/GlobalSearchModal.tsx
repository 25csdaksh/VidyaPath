import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Compass,
  FolderGit2,
  Layers,
  BookOpen,
  Milestone,
  Trophy,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '../common/Badge';
import './GlobalSearchModal.css';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Project' | 'Interview' | 'Roadmap' | 'Book' | 'Hackathon' | 'Resource' | 'Announcement';
  path: string;
  badge?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Search catalog index across all 20 modules
  const searchIndex: SearchResultItem[] = [
    {
      id: 's-1',
      title: 'Distributed Rate Limiter with Redis & Token Bucket',
      subtitle: 'System Design & High Concurrency Backend Project',
      category: 'Project',
      path: '/projects',
      badge: 'High Difficulty',
    },
    {
      id: 's-2',
      title: 'AI Resume & ATS Skill Matcher with Vector DB',
      subtitle: 'Generative AI & LLM Embeddings Capstone',
      category: 'Project',
      path: '/projects',
      badge: 'Medium Difficulty',
    },
    {
      id: 's-3',
      title: 'Explain Database Indexing: B-Trees vs Hash Indexes',
      subtitle: 'DBMS Core Interview Question with query plans',
      category: 'Interview',
      path: '/placement',
      badge: 'DBMS',
    },
    {
      id: 's-4',
      title: 'Operating Systems: Virtual Memory & Page Replacement',
      subtitle: 'OS Core Interview Question (LRU, FIFO, Clock)',
      category: 'Interview',
      path: '/placement',
      badge: 'Operating Systems',
    },
    {
      id: 's-5',
      title: 'Semester 3: Data Structures & Algorithms Roadmap',
      subtitle: 'Trees, Graphs, DP & Time Complexity 6-stage tracker',
      category: 'Roadmap',
      path: '/roadmap',
      badge: 'SY Track',
    },
    {
      id: 's-6',
      title: 'Full-Stack Software Engineering 4-Year Path',
      subtitle: 'Frontend to Distributed Systems & DevOps',
      category: 'Roadmap',
      path: '/roadmap',
      badge: 'Specialization',
    },
    {
      id: 's-7',
      title: 'Database System Concepts (Silberschatz, Korth, Sudarshan)',
      subtitle: 'Official Academic Standard Reference for DBMS',
      category: 'Book',
      path: '/resources',
      badge: 'Core Subject',
    },
    {
      id: 's-8',
      title: 'Introduction to Algorithms (CLRS - 4th Edition)',
      subtitle: 'Comprehensive International DSA Reference Book',
      category: 'Book',
      path: '/resources',
      badge: 'Algorithms',
    },
    {
      id: 's-9',
      title: 'Smart India Hackathon & Global AI Hackathons',
      subtitle: 'Playbook, 12-Step Problem Statement Analyzer & Pitch Deck',
      category: 'Hackathon',
      path: '/hackathons',
      badge: 'Live Tracker',
    },
    {
      id: 's-10',
      title: 'Google & Microsoft Campus Placement Drive Archives',
      subtitle: 'Hiring patterns, Online Assessment (OT) questions & CTC breakdown',
      category: 'Interview',
      path: '/placement',
      badge: 'Placement',
    },
    {
      id: 's-11',
      title: 'ATS-Friendly Tech Resume Template (Standard Harvard / Deedy)',
      subtitle: 'Single-page technical resume builder with real-time score',
      category: 'Resource',
      path: '/resume',
      badge: 'Tool',
    },
    {
      id: 's-12',
      title: 'Curated YouTube Channels for CSE',
      subtitle: 'Striver, Abdul Bari, Traversy Media, 3Blue1Brown & MIT OCW',
      category: 'Resource',
      path: '/learn',
      badge: 'Video Hub',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Project', 'Interview', 'Roadmap', 'Book', 'Hackathon', 'Resource'];

  const filteredResults = searchIndex.filter((item) => {
    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Project':
        return <FolderGit2 size={16} />;
      case 'Interview':
        return <Layers size={16} />;
      case 'Roadmap':
        return <Milestone size={16} />;
      case 'Book':
        return <BookOpen size={16} />;
      case 'Hackathon':
        return <Trophy size={16} />;
      case 'Resource':
        return <Sparkles size={16} />;
      default:
        return <Compass size={16} />;
    }
  };

  const handleSelectResult = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="search-modal__backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Box */}
        <div className="search-modal__header">
          <Search size={20} className="search-modal__search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal__input"
            placeholder="Search projects, DSA topics, interview questions, roadmaps, books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-modal__clear-btn" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
          <kbd className="search-modal__esc-badge">ESC</kbd>
        </div>

        {/* Filter Pills */}
        <div className="search-modal__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`search-modal__filter-pill ${
                activeCategory === cat ? 'search-modal__filter-pill--active' : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-modal__results">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                className="search-modal__result-item"
                onClick={() => handleSelectResult(item.path)}
              >
                <div className="search-modal__result-icon">{getCategoryIcon(item.category)}</div>
                <div className="search-modal__result-content">
                  <div className="search-modal__result-title-row">
                    <span className="search-modal__result-title">{item.title}</span>
                    {item.badge && (
                      <Badge variant="brand" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="search-modal__result-subtitle">{item.subtitle}</span>
                </div>
                <ArrowRight size={14} className="search-modal__result-arrow" />
              </div>
            ))
          ) : (
            <div className="search-modal__empty">
              <Compass size={32} className="search-modal__empty-icon" />
              <p className="search-modal__empty-title">No matching resources found for "{query}"</p>
              <span className="search-modal__empty-desc">
                Try searching for "DSA", "Redis", "Operating Systems", "Coursera", or "Hackathon".
              </span>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="search-modal__footer">
          <span>Navigate with <strong>↑</strong> <strong>↓</strong> and <strong>Enter</strong></span>
          <span className="search-modal__footer-brand">VidyaPath Universal Index</span>
        </div>
      </div>
    </div>
  );
};
