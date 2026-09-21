import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  Compass,
  Code2,
  Database,
  Cpu,
  Shield,
  Brain,
  Globe,
  CheckCircle2,
  Zap,
  Filter,
  GraduationCap,
  Scale,
  Star,
  FileText,
  Library,
  BookMarked,
  Info,
  Check,
} from 'lucide-react';
import BookCard from '../components/cards/BookCard';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import bookService from '../services/bookService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

// ==========================================
// 1. ALL 19 SUBJECT CATEGORIES BOOK DATA
// ==========================================
const ALL_CATEGORIES_BOOKS = [
  {
    categoryNumber: 1,
    categoryName: 'Programming Languages',
    icon: '💻',
    books: [
      { area: 'C', title: 'The C Programming Language', authors: 'Brian W. Kernighan & Dennis M. Ritchie', level: 'Fundamentals / systems', tag: 'Beginner' },
      { area: 'C', title: 'C Programming: A Modern Approach', authors: 'K. N. King', level: 'Beginner–Intermediate', tag: 'Beginner' },
      { area: 'C++', title: 'The C++ Programming Language', authors: 'Bjarne Stroustrup', level: 'Intermediate–Advanced', tag: 'Intermediate' },
      { area: 'C++', title: 'Effective Modern C++', authors: 'Scott Meyers', level: 'Advanced C++ practices', tag: 'Advanced' },
      { area: 'Java', title: 'Core Java, Volume I', authors: 'Cay S. Horstmann', level: 'Beginner–Intermediate', tag: 'Beginner' },
      { area: 'Java', title: 'Effective Java', authors: 'Joshua Bloch', level: 'Advanced / best practices', tag: 'Advanced' },
      { area: 'Python', title: 'Python Crash Course', authors: 'Eric Matthes', level: 'Beginner', tag: 'Beginner' },
      { area: 'Python', title: 'Fluent Python', authors: 'Luciano Ramalho', level: 'Intermediate–Advanced', tag: 'Intermediate' },
      { area: 'JavaScript', title: 'JavaScript: The Definitive Guide', authors: 'David Flanagan', level: 'Intermediate–Advanced', tag: 'Intermediate' },
      { area: 'JavaScript', title: "You Don't Know JS Yet", authors: 'Kyle Simpson', level: 'Deep JavaScript concepts', tag: 'Intermediate' },
      { area: 'Go', title: 'The Go Programming Language', authors: 'Alan A. A. Donovan & Brian W. Kernighan', level: 'Intermediate', tag: 'Intermediate' },
      { area: 'Rust', title: 'The Rust Programming Language', authors: 'Steve Klabnik & Carol Nichols', level: 'Modern systems programming', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 2,
    categoryName: 'Data Structures & Algorithms',
    icon: '🌲',
    books: [
      { area: 'Algorithms', title: 'Introduction to Algorithms (CLRS)', authors: 'Cormen, Leiserson, Rivest & Stein', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'Algorithms', title: 'Algorithms', authors: 'Robert Sedgewick & Kevin Wayne', level: 'University / Practical', tag: 'Intermediate' },
      { area: 'Data Structures', title: 'Data Structures and Algorithms in Java', authors: 'Michael T. Goodrich et al.', level: 'University', tag: 'Intermediate' },
      { area: 'Problem Solving', title: 'The Algorithm Design Manual', authors: 'Steven S. Skiena', level: 'Algorithm design', tag: 'Advanced' },
      { area: 'Competitive Programming', title: 'Competitive Programming', authors: 'Steven Halim et al.', level: 'Advanced practice', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 3,
    categoryName: 'Web Development',
    icon: '🌐',
    books: [
      { area: 'HTML/CSS', title: 'Learning Web Design', authors: 'Jennifer Robbins', level: 'Beginner', tag: 'Beginner' },
      { area: 'JavaScript', title: 'JavaScript: The Definitive Guide', authors: 'David Flanagan', level: 'Advanced reference', tag: 'Advanced' },
      { area: 'React', title: 'Learning React', authors: 'Alex Banks & Eve Porcello', level: 'Intermediate', tag: 'Intermediate' },
      { area: 'Web Architecture', title: 'Web Scalability for Startup Engineers', authors: 'Artur Ejsmont', level: 'Intermediate–Advanced', tag: 'Advanced' },
      { area: 'Backend', title: 'Node.js Design Patterns', authors: 'Mario Casciaro & Luciano Mammino', level: 'Advanced', tag: 'Advanced' },
      { area: 'Web APIs', title: 'Designing Web APIs', authors: 'Brenda Jin, Saurabh Sahni & Amir Shevat', level: 'Intermediate', tag: 'Intermediate' },
      { area: 'Security', title: 'Web Application Security', authors: 'Andrew Hoffman', level: 'Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 4,
    categoryName: 'Databases & Data Management',
    icon: '🗄️',
    books: [
      { area: 'DBMS', title: 'Database System Concepts', authors: 'Abraham Silberschatz, Henry Korth & S. Sudarshan', level: 'University', tag: 'Intermediate' },
      { area: 'DBMS', title: 'Fundamentals of Database Systems', authors: 'Elmasri & Navathe', level: 'University', tag: 'Intermediate' },
      { area: 'SQL', title: 'SQL Cookbook', authors: 'Anthony Molinaro', level: 'Practical', tag: 'Intermediate' },
      { area: 'Data Systems', title: 'Designing Data-Intensive Applications', authors: 'Martin Kleppmann', level: 'Advanced / industry', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 5,
    categoryName: 'Operating Systems',
    icon: '⚙️',
    books: [
      { area: 'OS', title: 'Operating System Concepts', authors: 'Abraham Silberschatz, Peter B. Galvin & Greg Gagne', level: 'University', tag: 'Intermediate' },
      { area: 'OS', title: 'Modern Operating Systems', authors: 'Andrew S. Tanenbaum & Herbert Bos', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'Systems', title: 'Operating Systems: Three Easy Pieces', authors: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau', level: 'University / practical', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 6,
    categoryName: 'Computer Networks',
    icon: '🔌',
    books: [
      { area: 'Networking', title: 'Computer Networking: A Top-Down Approach', authors: 'James Kurose & Keith Ross', level: 'University', tag: 'Intermediate' },
      { area: 'Networking', title: 'Computer Networks', authors: 'Andrew S. Tanenbaum & David J. Wetherall', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'TCP/IP', title: 'TCP/IP Illustrated', authors: 'W. Richard Stevens', level: 'Advanced reference', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 7,
    categoryName: 'Computer Architecture & Digital Systems',
    icon: '🖥️',
    books: [
      { area: 'Architecture', title: 'Computer Organization and Design', authors: 'David A. Patterson & John L. Hennessy', level: 'University', tag: 'Intermediate' },
      { area: 'Architecture', title: 'Computer Architecture: A Quantitative Approach', authors: 'John L. Hennessy & David A. Patterson', level: 'Advanced', tag: 'Advanced' },
      { area: 'Digital Logic', title: 'Digital Design', authors: 'M. Morris Mano & Michael D. Ciletti', level: 'University', tag: 'Beginner' },
    ],
  },
  {
    categoryNumber: 8,
    categoryName: 'Software Engineering',
    icon: '📋',
    books: [
      { area: 'SE', title: 'Software Engineering', authors: 'Ian Sommerville', level: 'University', tag: 'Intermediate' },
      { area: 'SE', title: "Software Engineering: A Practitioner's Approach", authors: 'Roger S. Pressman & Bruce R. Maxim', level: 'University / practical', tag: 'Intermediate' },
      { area: 'Agile', title: 'Agile Software Development', authors: 'Alistair Cockburn', level: 'Intermediate', tag: 'Intermediate' },
      { area: 'Clean Code', title: 'Clean Code', authors: 'Robert C. Martin', level: 'Professional practice', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 9,
    categoryName: 'Software Architecture & Design',
    icon: '🏗️',
    books: [
      { area: 'Architecture', title: 'Software Architecture in Practice', authors: 'Len Bass, Paul Clements & Rick Kazman', level: 'Advanced', tag: 'Advanced' },
      { area: 'Patterns', title: 'Design Patterns', authors: 'Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides', level: 'Advanced', tag: 'Advanced' },
      { area: 'Refactoring', title: 'Refactoring', authors: 'Martin Fowler', level: 'Advanced / professional', tag: 'Advanced' },
      { area: 'System Design', title: 'Designing Data-Intensive Applications', authors: 'Martin Kleppmann', level: 'Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 10,
    categoryName: 'Artificial Intelligence',
    icon: '🤖',
    books: [
      { area: 'AI', title: 'Artificial Intelligence: A Modern Approach', authors: 'Stuart Russell & Peter Norvig', level: 'University / comprehensive', tag: 'Advanced' },
      { area: 'AI', title: 'Artificial Intelligence: Foundations of Computational Agents', authors: 'David Poole & Alan Mackworth', level: 'University', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 11,
    categoryName: 'Machine Learning & Model Training',
    icon: '🧠',
    books: [
      { area: 'ML', title: 'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow', authors: 'Aurélien Géron', level: 'Practical / Intermediate', tag: 'Intermediate' },
      { area: 'ML', title: 'An Introduction to Statistical Learning', authors: 'Gareth James et al.', level: 'University / Intermediate', tag: 'Intermediate' },
      { area: 'ML', title: 'The Elements of Statistical Learning', authors: 'Trevor Hastie, Robert Tibshirani & Jerome Friedman', level: 'Advanced', tag: 'Research' },
      { area: 'ML', title: 'Pattern Recognition and Machine Learning', authors: 'Christopher M. Bishop', level: 'Advanced', tag: 'Research' },
      { area: 'ML', title: 'Probabilistic Machine Learning: An Introduction', authors: 'Kevin P. Murphy', level: 'Advanced', tag: 'Advanced' },
      { area: 'ML', title: 'Probabilistic Machine Learning: Advanced Topics', authors: 'Kevin P. Murphy', level: 'Advanced / Research', tag: 'Research' },
      { area: 'Deep Learning', title: 'Deep Learning', authors: 'Ian Goodfellow, Yoshua Bengio & Aaron Courville', level: 'Advanced', tag: 'Research' },
      { area: 'Reinforcement Learning', title: 'Reinforcement Learning: An Introduction', authors: 'Richard S. Sutton & Andrew G. Barto', level: 'Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 12,
    categoryName: 'Data Science',
    icon: '📊',
    books: [
      { area: 'Data Science', title: 'Python for Data Analysis', authors: 'Wes McKinney', level: 'Practical', tag: 'Beginner' },
      { area: 'Data Science', title: 'Practical Statistics for Data Scientists', authors: 'Peter Bruce, Andrew Bruce & Peter Gedeck', level: 'Intermediate', tag: 'Intermediate' },
      { area: 'Visualization', title: 'Fundamentals of Data Visualization', authors: 'Claus O. Wilke', level: 'Intermediate', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 13,
    categoryName: 'Cybersecurity',
    icon: '🛡️',
    books: [
      { area: 'Security', title: 'Computer Security: Principles and Practice', authors: 'William Stallings & Lawrie Brown', level: 'University', tag: 'Intermediate' },
      { area: 'Security', title: 'Security Engineering', authors: 'Ross Anderson', level: 'Advanced', tag: 'Advanced' },
      { area: 'Network Security', title: 'Cryptography and Network Security', authors: 'William Stallings', level: 'University', tag: 'Intermediate' },
      { area: 'Web Security', title: 'Web Application Security', authors: 'Andrew Hoffman', level: 'Advanced', tag: 'Advanced' },
      { area: 'Practical Security', title: "The Web Application Hacker's Handbook", authors: 'Dafydd Stuttard & Marcus Pinto', level: 'Advanced / legacy reference', tag: 'Advanced' },
      { area: 'Malware', title: 'Practical Malware Analysis', authors: 'Michael Sikorski & Andrew Honig', level: 'Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 14,
    categoryName: 'Cryptography',
    icon: '🔐',
    books: [
      { area: 'Cryptography', title: 'Introduction to Modern Cryptography', authors: 'Jonathan Katz & Yehuda Lindell', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'Cryptography', title: 'Understanding Cryptography', authors: 'Christof Paar & Jan Pelzl', level: 'University', tag: 'Intermediate' },
      { area: 'Cryptography', title: 'Serious Cryptography', authors: 'Jean-Philippe Aumasson', level: 'Practical / Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 15,
    categoryName: 'Cloud Computing & Distributed Systems',
    icon: '☁️',
    books: [
      { area: 'Distributed Systems', title: 'Distributed Systems', authors: 'Maarten van Steen & Andrew S. Tanenbaum', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'Cloud', title: 'Cloud Computing: Concepts, Technology & Architecture', authors: 'Thomas Erl, Zaigham Mahmood & Ricardo Puttini', level: 'Professional', tag: 'Intermediate' },
      { area: 'Systems', title: 'Designing Distributed Systems', authors: 'Brendan Burns', level: 'Practical', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 16,
    categoryName: 'Compilers & Programming Languages Theory',
    icon: '📜',
    books: [
      { area: 'Compilers', title: 'Compilers: Principles, Techniques, and Tools', authors: 'Alfred V. Aho, Monica S. Lam, Ravi Sethi & Jeffrey D. Ullman', level: 'University / Advanced', tag: 'Advanced' },
      { area: 'PL Theory', title: 'Types and Programming Languages', authors: 'Benjamin C. Pierce', level: 'Advanced', tag: 'Research' },
    ],
  },
  {
    categoryNumber: 17,
    categoryName: 'Theory of Computation',
    icon: '🧮',
    books: [
      { area: 'TOC', title: 'Introduction to Automata Theory, Languages, and Computation', authors: 'John E. Hopcroft, Rajeev Motwani & Jeffrey D. Ullman', level: 'University', tag: 'Intermediate' },
      { area: 'TOC', title: 'Introduction to the Theory of Computation', authors: 'Michael Sipser', level: 'University', tag: 'Intermediate' },
    ],
  },
  {
    categoryNumber: 18,
    categoryName: 'Mathematics for CSE',
    icon: '📐',
    books: [
      { area: 'Discrete Math', title: 'Discrete Mathematics and Its Applications', authors: 'Kenneth H. Rosen', level: 'University', tag: 'Beginner' },
      { area: 'Linear Algebra', title: 'Introduction to Linear Algebra', authors: 'Gilbert Strang', level: 'University', tag: 'Beginner' },
      { area: 'Probability', title: 'Introduction to Probability', authors: 'Joseph K. Blitzstein & Jessica Hwang', level: 'University', tag: 'Intermediate' },
      { area: 'Statistics', title: 'All of Statistics', authors: 'Larry Wasserman', level: 'Advanced', tag: 'Advanced' },
    ],
  },
  {
    categoryNumber: 19,
    categoryName: 'DevOps, Git & Engineering Practice',
    icon: '🚀',
    books: [
      { area: 'Git', title: 'Pro Git', authors: 'Scott Chacon & Ben Straub', level: 'Practical; free official book', tag: 'Beginner' },
      { area: 'DevOps', title: 'The DevOps Handbook', authors: 'Gene Kim, Jez Humble, Patrick Debois & John Willis', level: 'Professional', tag: 'Intermediate' },
      { area: 'DevOps', title: 'Accelerate', authors: 'Nicole Forsgren, Jez Humble & Gene Kim', level: 'Professional / research-informed', tag: 'Intermediate' },
    ],
  },
];

// ==========================================
// 2. SECTION 20: 4-YEAR PORTAL PLACEMENT
// ==========================================
const FOUR_YEAR_PLACEMENT = [
  {
    year: '1st Year (FY)',
    primaryBooks: 'K&R C; Python Crash Course; Learning Web Design; Discrete Mathematics (Rosen)',
    studentGoal: 'Programming logic, web basics, Git, math foundations',
    icon: '🌱',
  },
  {
    year: '2nd Year (SY)',
    primaryBooks: 'CLRS; Core Java; Database System Concepts; OS Concepts; Top-Down Networking',
    studentGoal: 'Core CSE + DSA + databases + systems',
    icon: '⚡',
  },
  {
    year: '3rd Year (TY)',
    primaryBooks: 'AIMA; Hands-On ML (Géron); Deep Learning; Security/crypto; advanced web/cloud books',
    studentGoal: 'Choose specialization and build serious projects',
    icon: '🚀',
  },
  {
    year: '4th Year (Final)',
    primaryBooks: 'Designing Data-Intensive Applications; advanced ML/security/system books; domain-specific references',
    studentGoal: 'Major project, internship, deployment, interviews/research',
    icon: '🎓',
  },
];

// ==========================================
// 3. SECTION 23: BEST CORE SHORTLIST
// ==========================================
const CORE_SHORTLIST = [
  { area: 'Programming', title: 'The C Programming Language', authors: 'Kernighan & Ritchie', badge: 'Foundational' },
  { area: 'DSA', title: 'Introduction to Algorithms (CLRS)', authors: 'Cormen, Leiserson, Rivest & Stein', badge: 'Standard Text' },
  { area: 'Java/OOP', title: 'Core Java, Volume I', authors: 'Cay S. Horstmann', badge: 'Industry Choice' },
  { area: 'Web', title: 'Learning Web Design', authors: 'Jennifer Robbins', badge: 'Web Primer' },
  { area: 'JavaScript', title: 'JavaScript: The Definitive Guide', authors: 'David Flanagan', badge: 'The Bible' },
  { area: 'DBMS', title: 'Database System Concepts', authors: 'Silberschatz, Korth & Sudarshan', badge: 'University Core' },
  { area: 'OS', title: 'Operating System Concepts', authors: 'Silberschatz, Galvin & Gagne', badge: 'Dinosaur Book' },
  { area: 'Networks', title: 'Computer Networking: A Top-Down Approach', authors: 'Kurose & Ross', badge: 'University Core' },
  { area: 'AI', title: 'Artificial Intelligence: A Modern Approach', authors: 'Russell & Norvig', badge: 'AIMA Standard' },
  { area: 'ML', title: 'Hands-On Machine Learning', authors: 'Aurélien Géron', badge: 'Industry Primer' },
  { area: 'Deep Learning', title: 'Deep Learning', authors: 'Goodfellow, Bengio & Courville', badge: 'MIT Press' },
  { area: 'Cybersecurity', title: 'Computer Security: Principles and Practice', authors: 'Stallings & Brown', badge: 'Core Standard' },
  { area: 'Cryptography', title: 'Cryptography and Network Security', authors: 'William Stallings', badge: 'Standard Text' },
  { area: 'Systems', title: 'Designing Data-Intensive Applications', authors: 'Martin Kleppmann', badge: 'Must Read' },
];

export const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active top tab: 'guide' | 'shortlist' | 'placement' | 'difficulty_copyright' | 'database'
  const [activeTab, setActiveTab] = useState('guide');

  // Search and Category filters for Section 1-19 Guide
  const [guideSearch, setGuideSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('ALL');
  const [selectedTagFilter, setSelectedTagFilter] = useState('ALL');

  // Database Playlists state (Existing backend integration)
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [dbSearchQuery, setDbSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDbCategory, setSelectedDbCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDbLevel, setSelectedDbLevel] = useState(searchParams.get('level') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('Book');

  const dbCategories = [
    'All',
    'DSA',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'System Design',
    'AI',
    'Machine Learning',
    'Programming',
  ];
  const dbLevels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Research'];

  // Fetch Database Books from Backend
  const fetchBooks = useCallback(async () => {
    if (activeTab !== 'database') return;
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await bookService.getBooks({
        page,
        limit: 9,
        search: dbSearchQuery.trim() || undefined,
        category: selectedDbCategory !== 'All' ? selectedDbCategory : undefined,
        level: selectedDbLevel !== 'All' ? selectedDbLevel : undefined,
      });

      setBooks(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchParams, selectedDbCategory, selectedDbLevel, dbSearchQuery]);

  useEffect(() => {
    if (activeTab === 'database') {
      fetchBooks();
    }
  }, [activeTab, fetchBooks]);

  const handleDbSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
      ...(selectedDbCategory !== 'All' ? { category: selectedDbCategory } : {}),
      ...(selectedDbLevel !== 'All' ? { level: selectedDbLevel } : {}),
    });
  };

  const resetDbFilters = () => {
    setDbSearchQuery('');
    setSelectedDbCategory('All');
    setSelectedDbLevel('All');
    setSearchParams({ page: '1' });
  };

  // Filtered 19-Category Books
  const filteredCategoryGroups = useMemo(() => {
    return ALL_CATEGORIES_BOOKS.map((group) => {
      if (selectedCatFilter !== 'ALL' && group.categoryNumber !== parseInt(selectedCatFilter, 10)) {
        return null;
      }

      const matchingBooks = group.books.filter((b) => {
        const matchesSearch =
          !guideSearch.trim() ||
          b.title.toLowerCase().includes(guideSearch.toLowerCase()) ||
          b.authors.toLowerCase().includes(guideSearch.toLowerCase()) ||
          b.area.toLowerCase().includes(guideSearch.toLowerCase()) ||
          b.level.toLowerCase().includes(guideSearch.toLowerCase());

        const matchesTag = selectedTagFilter === 'ALL' || b.tag === selectedTagFilter;

        return matchesSearch && matchesTag;
      });

      if (matchingBooks.length === 0) return null;

      return {
        ...group,
        books: matchingBooks,
      };
    }).filter(Boolean);
  }, [guideSearch, selectedCatFilter, selectedTagFilter]);

  // Helper for tag style
  const getTagBadge = (tag) => {
    switch (tag) {
      case 'Beginner':
        return { label: '🟢 Beginner', bg: '#dcfce7', color: '#166534', border: '#bbf7d0' };
      case 'Intermediate':
        return { label: '🔵 Intermediate', bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' };
      case 'Advanced':
        return { label: '🟠 Advanced', bg: '#ffedd5', color: '#9a3412', border: '#fed7aa' };
      case 'Research':
        return { label: '🔴 Research', bg: '#fee2e2', color: '#991b1b', border: '#fecaca' };
      default:
        return { label: tag, bg: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: 'var(--border-color)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      {/* ========================================================
          HERO BANNER: SANTORINI AEGEAN & NAVY
          ======================================================== */}
      <div
        style={{
          background: 'var(--navy-hero-gradient)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-navy)',
          border: '1px solid rgba(170, 192, 225, 0.25)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
              }}
            >
              <BookOpen size={16} /> INTERNATIONAL CSE BOOK GUIDE
            </span>
            <span
              style={{
                background: 'rgba(170, 192, 225, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--aegean-200)',
              }}
            >
              Programming • Web Development • AI/ML • Cybersecurity • Core Computer Science
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.2,
              marginBottom: '0.75rem',
              color: '#ffffff',
            }}
          >
            Definitive CSE Academic & Reference Textbooks
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '850px',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            A curated reference of widely recognized university-level textbooks and professional industry bibles (MIT, Stanford, Berkeley, IITs). Prioritizes established academic textbooks and rigorous engineering foundations.
          </p>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              maxWidth: '750px',
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(6px)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-200)' }}>19 Areas</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)' }}>Subject-wise Catalog</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(6px)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>70+ Books</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)' }}>Standard Global Editions</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(6px)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--aegean-300)' }}>14 Core</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)' }}>Essential Shortlist</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(6px)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>4 Years</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)' }}>FY to Final Year Mapping</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          HOW TO USE THIS LIST CALLOUT
          ======================================================== */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Info size={18} color="var(--primary-800)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            How to Use This Book Guide
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          This guide is a curated list of widely recognized university-level and professional books for Computer Science and Engineering. There is no single worldwide authority that officially approves every CS book. Instead, this list prioritizes established academic textbooks and widely used professional references. Exact books should be matched to your university syllabus and the student's level.
        </p>
      </div>

      {/* ========================================================
          MAIN NAVIGATION TABS
          ======================================================== */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '0.2rem',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'guide', label: '📖 19-Category Master Guide', icon: Library },
          { id: 'shortlist', label: '⭐ Best Core Shortlist (Sec 23)', icon: Star },
          { id: 'placement', label: '🎓 4-Year University Placement (Sec 20)', icon: GraduationCap },
          { id: 'difficulty_copyright', label: '⚖️ Difficulty & Legal Access (Sec 21-22)', icon: Scale },
          { id: 'database', label: '🔍 Database Catalog & Saved Bookmarks', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '10px 10px 0 0',
                fontWeight: 700,
                fontSize: '0.925rem',
                cursor: 'pointer',
                border: 'none',
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--primary-800)' : 'var(--text-muted)',
                borderBottom: isActive ? '3px solid var(--primary-800)' : '3px solid transparent',
                marginBottom: '-2px',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: 19-CATEGORY COMPREHENSIVE BOOK GUIDE
          ======================================================== */}
      {activeTab === 'guide' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filter & Search Bar */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '1.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                Difficulty:
              </span>
              {['ALL', 'Beginner', 'Intermediate', 'Advanced', 'Research'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedTagFilter(lvl)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    background: selectedTagFilter === lvl ? 'var(--primary-800)' : 'var(--bg-primary)',
                    color: selectedTagFilter === lvl ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: selectedTagFilter === lvl ? 'var(--primary-800)' : 'var(--border-color)',
                  }}
                >
                  {lvl === 'ALL' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flex: '1 1 300px', maxWidth: '420px' }}>
              <Input
                placeholder="Search book title, author (e.g., K&R, CLRS, Silberschatz, Tanenbaum)..."
                value={guideSearch}
                onChange={(e) => setGuideSearch(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Render 19 Categories */}
          {filteredCategoryGroups.length === 0 ? (
            <EmptyState
              title="No Textbooks Found"
              message={`No books matched your search query "${guideSearch}".`}
              actionLabel="Clear Filters"
              onAction={() => {
                setGuideSearch('');
                setSelectedCatFilter('ALL');
                setSelectedTagFilter('ALL');
              }}
            />
          ) : (
            filteredCategoryGroups.map((group) => (
              <div
                key={group.categoryNumber}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--border-color-subtle)', paddingBottom: '0.85rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{group.icon}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {group.categoryNumber}. {group.categoryName}
                  </h2>
                  <Badge variant="primary" style={{ marginLeft: 'auto', background: 'var(--lavender-100)', color: 'var(--lavender-900)' }}>
                    {group.books.length} Books
                  </Badge>
                </div>

                {/* Table View of Books */}
                <div className="roadmap-table-wrap">
                  <table className="roadmap-table">
                    <thead>
                      <tr>
                        <th style={{ width: '16%' }}>Area</th>
                        <th style={{ width: '34%' }}>Book Title</th>
                        <th style={{ width: '28%' }}>Author(s)</th>
                        <th style={{ width: '22%' }}>Level / Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.books.map((b, idx) => {
                        const tagInfo = getTagBadge(b.tag);
                        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(b.title + ' ' + b.authors + ' book')}`;

                        return (
                          <tr key={idx}>
                            <td>
                              <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                                {b.area}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                <a
                                  href={googleSearchUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                  }}
                                >
                                  {b.title} <ExternalLink size={12} color="var(--primary-800)" />
                                </a>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                {b.authors}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <span
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    background: tagInfo.bg,
                                    color: tagInfo.color,
                                    border: `1px solid ${tagInfo.border}`,
                                  }}
                                >
                                  {tagInfo.label}
                                </span>
                                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                                  {b.level}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: BEST CORE SHORTLIST (SECTION 23)
          ======================================================== */}
      {activeTab === 'shortlist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Star size={22} color="#f59e0b" fill="#f59e0b" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                23. Best Core Set If the Portal Needs a Shortlist
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              If a student or educator only focuses on one quintessential, internationally revered textbook per core area, this 14-book collection represents the gold standard.
            </p>

            <div className="roadmap-table-wrap">
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th style={{ width: '18%' }}>Area</th>
                    <th style={{ width: '42%' }}>Book Title</th>
                    <th style={{ width: '25%' }}>Author(s)</th>
                    <th style={{ width: '15%' }}>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {CORE_SHORTLIST.map((item, idx) => {
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(item.title + ' ' + item.authors + ' book')}`;
                    return (
                      <tr key={idx}>
                        <td><strong style={{ color: 'var(--primary-800)' }}>{item.area}</strong></td>
                        <td>
                          <a
                            href={searchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            {item.title} <ExternalLink size={12} color="var(--primary-800)" />
                          </a>
                        </td>
                        <td><span style={{ color: 'var(--text-secondary)' }}>{item.authors}</span></td>
                        <td>
                          <span style={{ background: 'var(--lavender-100)', color: 'var(--lavender-900)', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                            {item.badge}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: 4-YEAR PLACEMENT MATRIX (SECTION 20)
          ======================================================== */}
      {activeTab === 'placement' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <GraduationCap size={22} color="var(--primary-800)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                20. Recommended 4-Year Placement in a CSE Portal
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Mapping standard textbooks to the 4-year undergraduate trajectory to maximize depth and semester goal alignment.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {FOUR_YEAR_PLACEMENT.map((stage) => (
                <div
                  key={stage.year}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem 1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '1.3rem' }}>{stage.icon}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--primary-900)' }}>
                        {stage.year}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <strong>Student Goal:</strong> {stage.studentGoal}
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1.1rem', borderRadius: '10px', border: '1px solid var(--lavender-200)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Primary Textbooks
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {stage.primaryBooks}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: DIFFICULTY TAGS & COPYRIGHT NOTE (SECTION 21-22)
          ======================================================== */}
      {activeTab === 'difficulty_copyright' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 21 */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Layers size={22} color="var(--primary-800)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                21. Suggested Difficulty Tags for Your Portal
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Standardized taxonomy to help students select books corresponding to their technical readiness.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-success)', marginBottom: '0.35rem' }}>
                  🟢 Beginner
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  First exposure; assumes little or no prior computer science or programming knowledge. (e.g. K&R, Python Crash Course).
                </p>
              </div>

              <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-info)', marginBottom: '0.35rem' }}>
                  🔵 Intermediate
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Student already knows programming fundamentals and core CS basics. (e.g. Tanenbaum OS, Kurose Networking, Hands-On ML).
                </p>
              </div>

              <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-warning)', marginBottom: '0.35rem' }}>
                  🟠 Advanced
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  University upper-level or professional engineering material. (e.g. CLRS, Kleppmann DDIA, Dragon Book Compilers).
                </p>
              </div>

              <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-danger)', marginBottom: '0.35rem' }}>
                  🔴 Research
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Mathematically or technically intensive; suitable after strong theoretical foundations. (e.g. Bishop PRML, Goodfellow Deep Learning).
                </p>
              </div>
            </div>
          </div>

          {/* Section 22 */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Scale size={22} color="var(--primary-800)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                22. Important Copyright & Ethical Access Note
              </h2>
            </div>

            <div style={{ background: 'var(--lavender-50)', border: '1px solid var(--lavender-300)', padding: '1.25rem', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 0.75rem 0' }}>
                These are copyrighted academic and professional textbooks unless a specific edition is legally available under an open license (such as <em>Pro Git</em> or <em>Operating Systems: Three Easy Pieces</em>).
              </p>
              <p style={{ margin: 0 }}>
                <strong>Portal Policy:</strong> Store bibliographic metadata, summaries, links to legitimate publisher pages (MIT Press, O'Reilly, Pearson, McGraw-Hill), university library catalog links, and legally available open-access editions. Do not distribute unauthorized PDF copies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: DATABASE CATALOG & SAVED BOOKMARKS
          ======================================================== */}
      {activeTab === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="page-header-flex">
            <div className="page-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Badge variant="primary"><BookOpen size={14} /> Academic Catalog</Badge>
                <Badge variant="neutral">{meta.total || books.length} Standard Textbooks</Badge>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                Database Textbooks & Bookmarking
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                Browse server-persisted textbooks, filter by level and category, or save them to your student profile bookmarks.
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="filter-bar">
            <form onSubmit={handleDbSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
              <Input
                placeholder="Search books by title, author (e.g., Cormen, Tanenbaum, Russell)..."
                value={dbSearchQuery}
                onChange={(e) => setDbSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button type="submit" variant="primary">Search</Button>
            </form>

            <div className="filter-group">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Level:</span>
              {dbLevels.map((lvl) => (
                <button
                  key={lvl}
                  className={`filter-btn ${selectedDbLevel === lvl ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDbLevel(lvl);
                    setSearchParams({
                      page: '1',
                      ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
                      ...(selectedDbCategory !== 'All' ? { category: selectedDbCategory } : {}),
                      ...(lvl !== 'All' ? { level: lvl } : {}),
                    });
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {dbCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedDbCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDbCategory(cat);
                  setSearchParams({
                    page: '1',
                    ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
                    ...(cat !== 'All' ? { category: cat } : {}),
                    ...(selectedDbLevel !== 'All' ? { level: selectedDbLevel } : {}),
                  });
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4 States Handling */}
          {isLoading ? (
            <div className="cards-grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} height={240} variant="rounded" />
              ))}
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={fetchBooks} />
          ) : books.length === 0 ? (
            <EmptyState
              title="No Books Found"
              message="No textbooks matched your filter criteria in the database."
              actionLabel="Reset Filters"
              onAction={resetDbFilters}
            />
          ) : (
            <>
              <div className="cards-grid-3">
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    isBookmarked={isBookmarked(book._id)}
                    onBookmark={() => toggleBookmark(book, 'Book')}
                  />
                ))}
              </div>

              {meta.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <Pagination
                    currentPage={meta.page || 1}
                    totalPages={meta.totalPages}
                    onPageChange={(p) => {
                      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: p.toString() });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
