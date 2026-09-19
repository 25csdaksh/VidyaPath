import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Video,
  Search,
  ExternalLink,
  Clock,
  Sparkles,
  Bookmark,
  PlayCircle,
  Layers,
  Compass,
  Code2,
  Terminal,
  Brain,
  Shield,
  Cloud,
  Database,
  Network,
  Cpu,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Check,
  Laptop,
  Tv,
  Flame,
  Filter,
  Globe,
  FileCode2,
  GraduationCap,
  Sparkle,
  Radio,
  Share2,
  CheckSquare,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';
import youtubeService from '../services/youtubeService';
import { useBookmarks } from '../hooks/useBookmarks';
import { getErrorDetails } from '../utils/errorHandler';

// ==========================================
// 1. TOP 20 RECOMMENDED CHANNELS DATA
// ==========================================
const TOP_CHANNELS = [
  {
    name: 'CodeWithHarry',
    category: 'Programming & Web',
    bestFor: 'Programming, Python, C/C++, Java, Web Development, Git, Projects',
    subscribers: '5M+',
    language: 'Hindi / English',
    searchUrl: 'https://www.youtube.com/results?search_query=CodeWithHarry',
    icon: '💻',
    tags: ['C/C++', 'Python', 'Web Dev', 'Java', 'Git'],
  },
  {
    name: 'Apna College',
    category: 'DSA & Placements',
    bestFor: 'C++, DSA, Java, Web Development, SQL, Placement Preparation',
    subscribers: '4.5M+',
    language: 'Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Apna%20College',
    icon: '🎓',
    tags: ['DSA', 'C++', 'Java', 'Placement Prep', 'Web Dev'],
  },
  {
    name: 'Gate Smashers',
    category: 'Core CS Subjects',
    bestFor: 'DBMS, OS, Computer Networks, Software Engineering, TOC, Compiler',
    subscribers: '1.8M+',
    language: 'Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Gate%20Smashers',
    icon: '⚡',
    tags: ['DBMS', 'OS', 'CN', 'Software Engg', 'TOC'],
  },
  {
    name: "Jenny's Lectures CS/IT",
    category: 'Core CS & DSA',
    bestFor: "DSA, DBMS, OS, CN, TOC, Compiler, Core CS",
    subscribers: '1.4M+',
    language: 'English / Hindi',
    searchUrl: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT",
    icon: '📚',
    tags: ['DSA', 'DBMS', 'OS', 'CN', 'Compiler'],
  },
  {
    name: 'Neso Academy',
    category: 'CS Theory & Hardware',
    bestFor: 'DSA, DBMS, OS, CN, Digital Logic, TOC, Compiler, Theory',
    subscribers: '2.3M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Neso%20Academy',
    icon: '🏛️',
    tags: ['Digital Logic', 'OS', 'CN', 'Theory', 'DSA'],
  },
  {
    name: 'Abdul Bari',
    category: 'Algorithms & Complexity',
    bestFor: 'Algorithms, DSA, Complexity Analysis, Programming Concepts',
    subscribers: '1M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Abdul%20Bari',
    icon: '🧠',
    tags: ['Algorithms', 'Time Complexity', 'Dynamic Prog', 'Graphs'],
  },
  {
    name: 'Striver / take U forward',
    category: 'DSA & Interview Prep',
    bestFor: 'DSA, Problem Solving, SDE Sheets, Interview Preparation',
    subscribers: '700K+',
    language: 'English / Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Striver%20/%20take%20U%20forward',
    icon: '🚀',
    tags: ['A2Z DSA Sheet', 'SDE Sheet', 'LeetCode', 'Interview Prep'],
  },
  {
    name: 'freeCodeCamp.org',
    category: 'Comprehensive Full Courses',
    bestFor: 'Full courses: Programming, Web, Python, Databases, AI/ML, Cloud',
    subscribers: '9.5M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=freeCodeCamp.org',
    icon: '🔥',
    tags: ['Full Courses', 'Python', 'Web Dev', 'Cloud', 'AI/ML'],
  },
  {
    name: 'Programming with Mosh',
    category: 'Clean Code Fundamentals',
    bestFor: 'Programming Fundamentals, Python, Java, Web Development',
    subscribers: '3.8M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Programming%20with%20Mosh',
    icon: '🎯',
    tags: ['Python', 'Java', 'JavaScript', 'Clean Code'],
  },
  {
    name: 'Kunal Kushwaha',
    category: 'Java, DSA & Open Source',
    bestFor: 'Java, DSA, Git/GitHub, Open-Source and Developer Roadmaps',
    subscribers: '600K+',
    language: 'English / Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha',
    icon: '🌱',
    tags: ['Java DSA', 'Git/GitHub', 'Open Source', 'DevOps Intro'],
  },
  {
    name: 'Chai aur Code',
    category: 'Modern Web & Full-Stack',
    bestFor: 'JavaScript, TypeScript, React, Backend, Git, Full-Stack in Depth',
    subscribers: '500K+',
    language: 'Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code',
    icon: '☕',
    tags: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Full-Stack'],
  },
  {
    name: 'Telusko',
    category: 'Java & Backend Basics',
    bestFor: 'Java, Python, JavaScript, Backend, Programming Fundamentals',
    subscribers: '2.2M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Telusko',
    icon: '☕',
    tags: ['Java', 'Spring Boot', 'Python', 'Backend'],
  },
  {
    name: 'Java Brains',
    category: 'Enterprise Java & Spring',
    bestFor: 'Java, Spring Boot, Microservices, Backend Architecture',
    subscribers: '700K+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Java%20Brains',
    icon: '☕',
    tags: ['Spring Boot', 'Microservices', 'Java Enterprise'],
  },
  {
    name: 'Krish Naik',
    category: 'AI / ML / Data Science',
    bestFor: 'Machine Learning, Deep Learning, NLP, Generative AI, Data Science',
    subscribers: '950K+',
    language: 'English / Hindi',
    searchUrl: 'https://www.youtube.com/results?search_query=Krish%20Naik',
    icon: '🤖',
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Data Science'],
  },
  {
    name: 'StatQuest with Josh Starmer',
    category: 'Math & ML Visualized',
    bestFor: 'Statistics, ML, Probability, Intuitive Math Step-by-Step',
    subscribers: '1.2M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=StatQuest%20with%20Josh%20Starmer',
    icon: '📊',
    tags: ['Statistics', 'ML Algorithms', 'PCA', 'Neural Nets'],
  },
  {
    name: '3Blue1Brown',
    category: 'Visual Math Intuition',
    bestFor: 'Math Intuition, Linear Algebra, Calculus, Neural Networks, Probability',
    subscribers: '6.2M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=3Blue1Brown',
    icon: '📐',
    tags: ['Linear Algebra', 'Calculus', 'Neural Networks', 'Math Intuition'],
  },
  {
    name: 'CS50',
    category: 'Harvard CS Foundation',
    bestFor: 'Computer Science Fundamentals, C, Python, SQL, Web, AI',
    subscribers: '2.1M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=CS50',
    icon: '🎓',
    tags: ['CS Fundamentals', 'Memory', 'Algorithms', 'AI Intro'],
  },
  {
    name: 'NetworkChuck',
    category: 'Networking & Cloud',
    bestFor: 'Networking, Linux, Cloud, Docker, Cybersecurity Fundamentals',
    subscribers: '3.6M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=NetworkChuck',
    icon: '🌐',
    tags: ['Networking', 'Linux', 'Docker', 'Cybersecurity'],
  },
  {
    name: 'Professor Messer',
    category: 'Certifications & Security',
    bestFor: 'Networking, Security+, Network+, CompTIA Certification Fundamentals',
    subscribers: '1M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Professor%20Messer',
    icon: '🛡️',
    tags: ['CompTIA Security+', 'Network+', 'Cybersecurity'],
  },
  {
    name: 'Fireship',
    category: 'Fast-Paced Modern Tech',
    bestFor: 'Short, fast explanations of modern Web, Cloud & Developer Technologies (100 Seconds of Code)',
    subscribers: '3.2M+',
    language: 'English',
    searchUrl: 'https://www.youtube.com/results?search_query=Fireship',
    icon: '⚡',
    tags: ['100 Seconds', 'Web Tech', 'Cloud', 'Architecture'],
  },
];

// ==========================================
// 2. 4-YEAR COMPLETE SUBJECT-WISE GUIDE DATA
// ==========================================
const FOUR_YEAR_SUBJECTS = {
  FY: {
    yearLabel: '1st Year (FY)',
    title: 'Foundation Year',
    focus: 'Programming + Engineering Fundamentals, Web Basics, Mathematics, Computer/Digital Fundamentals & Communication.',
    studyPattern: 'Primary channel → Topic search → Practice → Backup channel only if needed.',
    subjects: [
      {
        id: 'fy-1',
        title: 'C / C++ Programming Fundamentals',
        icon: '💻',
        category: 'Programming',
        whatYouLearn: 'Variables, data types, operators, conditions, loops, functions, arrays, strings, pointers/references, structures and basic problem solving.',
        channels: [
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Apna College', url: 'https://www.youtube.com/results?search_query=Apna%20College' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=Programming%20with%20Mosh' },
        ],
        searches: [
          { query: 'C programming basics', url: 'https://www.youtube.com/results?search_query=C%20programming%20basics' },
          { query: 'C++ full course beginner', url: 'https://www.youtube.com/results?search_query=C%2B%2B%20full%20course%20beginner' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-2',
        title: 'Python Basics',
        icon: '🐍',
        category: 'Programming',
        whatYouLearn: 'Syntax, variables, conditions, loops, functions, lists/dictionaries, modules and beginner problem solving.',
        channels: [
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=Programming%20with%20Mosh' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'Python for beginners', url: 'https://www.youtube.com/results?search_query=Python%20for%20beginners' },
          { query: 'Python full course', url: 'https://www.youtube.com/results?search_query=Python%20full%20course' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-3',
        title: 'HTML & CSS',
        icon: '🎨',
        category: 'Web Basics',
        whatYouLearn: 'HTML structure, forms, semantic elements; CSS, Flexbox, Grid and responsive design.',
        channels: [
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Chai aur Code', url: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code' },
        ],
        searches: [
          { query: 'HTML CSS full course', url: 'https://www.youtube.com/results?search_query=HTML%20CSS%20full%20course' },
          { query: 'responsive web design', url: 'https://www.youtube.com/results?search_query=responsive%20web%20design' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-4',
        title: 'JavaScript Basics',
        icon: '⚡',
        category: 'Web Basics',
        whatYouLearn: 'Variables, functions, arrays/objects, events, DOM, form validation and basic dynamic pages.',
        channels: [
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Chai aur Code', url: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'JavaScript beginner', url: 'https://www.youtube.com/results?search_query=JavaScript%20beginner' },
          { query: 'JavaScript DOM', url: 'https://www.youtube.com/results?search_query=JavaScript%20DOM' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-5',
        title: 'Git & GitHub',
        icon: '🌿',
        category: 'Tools & DevOps',
        whatYouLearn: 'Repositories, commits, branches, merge conflicts, pull requests, collaboration and basic version control workflow.',
        channels: [
          { name: 'Kunal Kushwaha', url: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'Git GitHub for beginners', url: 'https://www.youtube.com/results?search_query=Git%20GitHub%20for%20beginners' },
          { query: 'Git and GitHub full course', url: 'https://www.youtube.com/results?search_query=Git%20and%20GitHub%20full%20course' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-6',
        title: 'Engineering Mathematics / Calculus',
        icon: '📐',
        category: 'Mathematics',
        whatYouLearn: 'Calculus, differentiation, integration, multivariable calculus, and related engineering mathematics used later in algorithms, AI/ML and performance analysis.',
        channels: [
          { name: '3Blue1Brown', url: 'https://www.youtube.com/results?search_query=3Blue1Brown' },
          { name: 'Khan Academy', url: 'https://www.youtube.com/results?search_query=Khan%20Academy' },
          { name: 'Professor Leonard', url: 'https://www.youtube.com/results?search_query=Professor%20Leonard' },
        ],
        searches: [
          { query: 'calculus easy explanation', url: 'https://www.youtube.com/results?search_query=calculus%20easy%20explanation' },
          { query: 'engineering mathematics calculus', url: 'https://www.youtube.com/results?search_query=engineering%20mathematics%20calculus' },
        ],
        easyMethod: 'Watch intuition first → solve examples by hand → then practice university questions.',
      },
      {
        id: 'fy-7',
        title: 'Linear Algebra / Matrices',
        icon: '🔢',
        category: 'Mathematics',
        whatYouLearn: 'Vectors, matrices, matrix operations, determinants, eigenvalues/eigenvectors, transformations and the geometric intuition needed for AI/ML and computer graphics.',
        channels: [
          { name: '3Blue1Brown', url: 'https://www.youtube.com/results?search_query=3Blue1Brown' },
          { name: 'Khan Academy', url: 'https://www.youtube.com/results?search_query=Khan%20Academy' },
          { name: 'MIT OpenCourseWare', url: 'https://www.youtube.com/results?search_query=MIT%20OpenCourseWare' },
        ],
        searches: [
          { query: 'linear algebra intuition', url: 'https://www.youtube.com/results?search_query=linear%20algebra%20intuition' },
          { query: 'matrices linear algebra', url: 'https://www.youtube.com/results?search_query=matrices%20linear%20algebra' },
        ],
        easyMethod: 'Watch intuition first → solve examples by hand → then practice university questions.',
      },
      {
        id: 'fy-8',
        title: 'Discrete Mathematics',
        icon: '🧩',
        category: 'Mathematics',
        whatYouLearn: 'Sets, relations, functions, propositional logic, graph theory, combinatorics, recurrence relations and proof techniques.',
        channels: [
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: 'TrevTutor', url: 'https://www.youtube.com/results?search_query=TrevTutor' },
        ],
        searches: [
          { query: 'discrete mathematics CSE', url: 'https://www.youtube.com/results?search_query=discrete%20mathematics%20CSE' },
          { query: 'discrete math logic sets relations', url: 'https://www.youtube.com/results?search_query=discrete%20math%20logic%20sets%20relations' },
        ],
        easyMethod: 'Watch intuition first → solve examples by hand → then practice university questions.',
      },
      {
        id: 'fy-9',
        title: 'Digital Logic / Computer Fundamentals',
        icon: '🔌',
        category: 'Hardware & Theory',
        whatYouLearn: 'Number systems, binary arithmetic, Boolean algebra, logic gates, combinational/sequential circuits, flip-flops, memory and CPU basics.',
        channels: [
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'All About Electronics', url: 'https://www.youtube.com/results?search_query=All%20About%20Electronics' },
        ],
        searches: [
          { query: 'digital logic CSE', url: 'https://www.youtube.com/results?search_query=digital%20logic%20CSE' },
          { query: 'boolean algebra logic gates', url: 'https://www.youtube.com/results?search_query=boolean%20algebra%20logic%20gates' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'fy-10',
        title: 'Engineering Science & Communication',
        icon: '🗣️',
        category: 'Engineering & Soft Skills',
        whatYouLearn: 'Common engineering science subjects (Physics/Chemistry/Basic Electrical) and technical communication, report writing, presentation skills depending on university syllabus.',
        channels: [
          { name: 'NPTEL', url: 'https://www.youtube.com/results?search_query=NPTEL' },
          { name: 'Khan Academy', url: 'https://www.youtube.com/results?search_query=Khan%20Academy' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
        ],
        searches: [
          { query: 'engineering physics basics', url: 'https://www.youtube.com/results?search_query=engineering%20physics%20basics' },
          { query: 'professional communication engineering', url: 'https://www.youtube.com/results?search_query=professional%20communication%20engineering' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
    ],
  },
  SY: {
    yearLabel: '2nd Year (SY)',
    title: 'Core Computer Science',
    focus: 'DSA, OOP, DBMS, OS, Computer Networks, and Discrete/Theory foundations.',
    studyPattern: 'Primary channel → Topic search → Practice → Backup channel only if needed.',
    subjects: [
      {
        id: 'sy-1',
        title: 'Data Structures & Algorithms (DSA)',
        icon: '🌲',
        category: 'Core CS / Placements',
        whatYouLearn: 'Arrays, linked lists, stacks, queues, trees, heaps, hashing, graphs, searching, sorting, recursion and time/space complexity.',
        channels: [
          { name: 'Striver / take U forward', url: 'https://www.youtube.com/results?search_query=Striver%20/%20take%20U%20forward' },
          { name: 'Apna College', url: 'https://www.youtube.com/results?search_query=Apna%20College' },
          { name: 'Abdul Bari', url: 'https://www.youtube.com/results?search_query=Abdul%20Bari' },
          { name: "Jenny's Lectures CS/IT", url: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT" },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
        ],
        searches: [
          { query: 'DSA full course', url: 'https://www.youtube.com/results?search_query=DSA%20full%20course' },
          { query: 'DSA arrays linked list trees graphs', url: 'https://www.youtube.com/results?search_query=DSA%20arrays%20linked%20list%20trees%20graphs' },
          { query: 'time space complexity', url: 'https://www.youtube.com/results?search_query=time%20space%20complexity' },
        ],
        easyMethod: 'Watch 30–45 min → code along → solve 3–5 problems → build a mini feature.',
      },
      {
        id: 'sy-2',
        title: 'Object-Oriented Programming (OOP)',
        icon: '📦',
        category: 'Core CS',
        whatYouLearn: 'Classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces, abstract classes and exceptions.',
        channels: [
          { name: 'Kunal Kushwaha', url: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha' },
          { name: 'Apna College', url: 'https://www.youtube.com/results?search_query=Apna%20College' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Java Brains', url: 'https://www.youtube.com/results?search_query=Java%20Brains' },
        ],
        searches: [
          { query: 'Java OOP', url: 'https://www.youtube.com/results?search_query=Java%20OOP' },
          { query: 'OOP concepts C++', url: 'https://www.youtube.com/results?search_query=OOP%20concepts%20C%2B%2B' },
          { query: 'OOP full course', url: 'https://www.youtube.com/results?search_query=OOP%20full%20course' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'sy-3',
        title: 'Java Programming',
        icon: '☕',
        category: 'Programming Language',
        whatYouLearn: 'Core Java syntax, OOP in Java, Collections Framework (List, Set, Map), exceptions, multithreading, file I/O and basic application development.',
        channels: [
          { name: 'Kunal Kushwaha', url: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Telusko', url: 'https://www.youtube.com/results?search_query=Telusko' },
          { name: 'Java Brains', url: 'https://www.youtube.com/results?search_query=Java%20Brains' },
        ],
        searches: [
          { query: 'Java full course beginner', url: 'https://www.youtube.com/results?search_query=Java%20full%20course%20beginner' },
          { query: 'Core Java OOP', url: 'https://www.youtube.com/results?search_query=Core%20Java%20OOP' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'sy-4',
        title: 'Database Management Systems (DBMS)',
        icon: '🗄️',
        category: 'Core CS / Systems',
        whatYouLearn: 'Relational model, ER modeling, keys, normalization (1NF, 2NF, 3NF, BCNF), SQL, joins, indexes, ACID transactions, concurrency control.',
        channels: [
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: "Jenny's Lectures CS/IT", url: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT" },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'DBMS full course CSE', url: 'https://www.youtube.com/results?search_query=DBMS%20full%20course%20CSE' },
          { query: 'SQL DBMS normalization joins', url: 'https://www.youtube.com/results?search_query=SQL%20DBMS%20normalization%20joins' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'sy-5',
        title: 'SQL / PostgreSQL / MySQL',
        icon: '📊',
        category: 'Databases & Practical',
        whatYouLearn: 'Queries, CRUD, aggregate functions, GROUP BY/HAVING, INNER/OUTER joins, subqueries, constraints, indexing, views and practical schema creation.',
        channels: [
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Apna College', url: 'https://www.youtube.com/results?search_query=Apna%20College' },
        ],
        searches: [
          { query: 'SQL full course', url: 'https://www.youtube.com/results?search_query=SQL%20full%20course' },
          { query: 'SQL joins queries', url: 'https://www.youtube.com/results?search_query=SQL%20joins%20queries' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'sy-6',
        title: 'Operating Systems (OS)',
        icon: '⚙️',
        category: 'Core CS / Systems',
        whatYouLearn: 'Processes, threads, CPU scheduling algorithms, synchronization (semaphores, mutex), deadlocks, memory management, paging, virtual memory, file systems.',
        channels: [
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: "Jenny's Lectures CS/IT", url: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT" },
          { name: 'Knowledge Gate', url: 'https://www.youtube.com/results?search_query=Knowledge%20Gate' },
        ],
        searches: [
          { query: 'Operating System CSE', url: 'https://www.youtube.com/results?search_query=Operating%20System%20CSE' },
          { query: 'OS process scheduling deadlock', url: 'https://www.youtube.com/results?search_query=OS%20process%20scheduling%20deadlock' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'sy-7',
        title: 'Computer Networks (CN)',
        icon: '🌐',
        category: 'Core CS / Systems',
        whatYouLearn: 'OSI 7 layers & TCP/IP stack, IP addressing & CIDR subnetting, Ethernet, routing protocols (RIP/OSPF/BGP), TCP vs UDP, DNS, HTTP/HTTPS, TLS, network security basics.',
        channels: [
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: "Jenny's Lectures CS/IT", url: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT" },
        ],
        searches: [
          { query: 'Computer Networks CSE', url: 'https://www.youtube.com/results?search_query=Computer%20Networks%20CSE' },
          { query: 'TCP IP subnetting DNS HTTP', url: 'https://www.youtube.com/results?search_query=TCP%20IP%20subnetting%20DNS%20HTTP' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'sy-8',
        title: 'Discrete Mathematics / Theory',
        icon: '🧮',
        category: 'Theory & Logic',
        whatYouLearn: 'Advanced logic, relations, graph algorithms, trees, combinatorics, generating functions and proof techniques connected to algorithms.',
        channels: [
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'TrevTutor', url: 'https://www.youtube.com/results?search_query=TrevTutor' },
        ],
        searches: [
          { query: 'discrete mathematics CSE', url: 'https://www.youtube.com/results?search_query=discrete%20mathematics%20CSE' },
          { query: 'graph theory combinatorics', url: 'https://www.youtube.com/results?search_query=graph%20theory%20combinatorics' },
        ],
        easyMethod: 'Watch intuition first → solve examples by hand → then practice university questions.',
      },
      {
        id: 'sy-9',
        title: 'Linux Basics',
        icon: '🐧',
        category: 'Operating Environment',
        whatYouLearn: 'Command line terminal navigation, file system permissions (chmod, chown), package managers, processes, shell scripting and developer server basics.',
        channels: [
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: 'Kunal Kushwaha', url: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha' },
        ],
        searches: [
          { query: 'Linux for beginners', url: 'https://www.youtube.com/results?search_query=Linux%20for%20beginners' },
          { query: 'Linux command line CSE', url: 'https://www.youtube.com/results?search_query=Linux%20command%20line%20CSE' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
    ],
  },
  TY: {
    yearLabel: '3rd Year (TY)',
    title: 'Advanced CSE + Specialization',
    focus: 'AI/ML, Software Engineering, Advanced Web, Cloud, Cybersecurity, and Data Science. (Electives vary by university).',
    studyPattern: 'Primary channel → Topic search → Practice → Backup channel only if needed.',
    subjects: [
      {
        id: 'ty-1',
        title: 'Artificial Intelligence (AI)',
        icon: '🤖',
        category: 'AI / Specialization',
        whatYouLearn: 'Search strategies (BFS, DFS, A*, minimax), intelligent agents, heuristic search, knowledge representation, propositional and predicate logic, rule-based systems.',
        channels: [
          { name: 'CS50', url: 'https://www.youtube.com/results?search_query=CS50' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'NPTEL', url: 'https://www.youtube.com/results?search_query=NPTEL' },
        ],
        searches: [
          { query: 'Artificial Intelligence CSE', url: 'https://www.youtube.com/results?search_query=Artificial%20Intelligence%20CSE' },
          { query: 'AI full course', url: 'https://www.youtube.com/results?search_query=AI%20full%20course' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'ty-2',
        title: 'Machine Learning (ML)',
        icon: '🧠',
        category: 'AI / Specialization',
        whatYouLearn: 'Supervised vs unsupervised learning, Linear & Logistic Regression, Decision Trees, Random Forests, SVM, K-Means clustering, evaluation metrics (accuracy, precision, recall, F1, ROC), feature engineering.',
        channels: [
          { name: 'Krish Naik', url: 'https://www.youtube.com/results?search_query=Krish%20Naik' },
          { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/results?search_query=StatQuest%20with%20Josh%20Starmer' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'Machine Learning full course', url: 'https://www.youtube.com/results?search_query=Machine%20Learning%20full%20course' },
          { query: 'ML classification regression clustering', url: 'https://www.youtube.com/results?search_query=ML%20classification%20regression%20clustering' },
        ],
        easyMethod: 'Watch 30–45 min → code along → solve 3–5 problems → build a mini feature.',
      },
      {
        id: 'ty-3',
        title: 'Deep Learning',
        icon: '🕸️',
        category: 'AI / Specialization',
        whatYouLearn: 'Neural networks, activation functions, forward and backward propagation, loss functions, optimizers (Adam, SGD), CNNs for computer vision, RNNs/Transformers for sequence models, PyTorch / TensorFlow.',
        channels: [
          { name: 'Krish Naik', url: 'https://www.youtube.com/results?search_query=Krish%20Naik' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: '3Blue1Brown', url: 'https://www.youtube.com/results?search_query=3Blue1Brown' },
        ],
        searches: [
          { query: 'Deep Learning full course', url: 'https://www.youtube.com/results?search_query=Deep%20Learning%20full%20course' },
          { query: 'neural networks backpropagation', url: 'https://www.youtube.com/results?search_query=neural%20networks%20backpropagation' },
        ],
        easyMethod: 'Watch 30–45 min → code along → solve 3–5 problems → build a mini feature.',
      },
      {
        id: 'ty-4',
        title: 'Data Science',
        icon: '📈',
        category: 'Data / Specialization',
        whatYouLearn: 'Python for data analysis, NumPy arrays, pandas DataFrames, exploratory data analysis (EDA), data cleaning, matplotlib / seaborn visualization, statistical hypothesis testing.',
        channels: [
          { name: 'Krish Naik', url: 'https://www.youtube.com/results?search_query=Krish%20Naik' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Alex The Analyst', url: 'https://www.youtube.com/results?search_query=Alex%20The%20Analyst' },
        ],
        searches: [
          { query: 'Data Science full course', url: 'https://www.youtube.com/results?search_query=Data%20Science%20full%20course' },
          { query: 'pandas numpy data analysis', url: 'https://www.youtube.com/results?search_query=pandas%20numpy%20data%20analysis' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'ty-5',
        title: 'Statistics & Probability',
        icon: '🎲',
        category: 'Math / Foundation',
        whatYouLearn: 'Descriptive statistics, random variables, probability distributions (Normal, Binomial, Poisson), Bayes theorem, central limit theorem, hypothesis testing supporting ML & Data Science.',
        channels: [
          { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/results?search_query=StatQuest%20with%20Josh%20Starmer' },
          { name: '3Blue1Brown', url: 'https://www.youtube.com/results?search_query=3Blue1Brown' },
          { name: 'Khan Academy', url: 'https://www.youtube.com/results?search_query=Khan%20Academy' },
        ],
        searches: [
          { query: 'statistics probability easy', url: 'https://www.youtube.com/results?search_query=statistics%20probability%20easy' },
          { query: 'probability CSE ML', url: 'https://www.youtube.com/results?search_query=probability%20CSE%20ML' },
        ],
        easyMethod: 'Watch intuition first → solve examples by hand → then practice university questions.',
      },
      {
        id: 'ty-6',
        title: 'Software Engineering',
        icon: '📋',
        category: 'Engineering & Process',
        whatYouLearn: 'Software Development Life Cycle (SDLC), Agile/Scrum methodology, SRS documentation, UML diagrams (use case, class, sequence), design principles, software testing (unit, integration), CI/CD fundamentals.',
        channels: [
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
          { name: "Jenny's Lectures CS/IT", url: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT" },
          { name: 'Neso Academy', url: 'https://www.youtube.com/results?search_query=Neso%20Academy' },
        ],
        searches: [
          { query: 'Software Engineering CSE', url: 'https://www.youtube.com/results?search_query=Software%20Engineering%20CSE' },
          { query: 'SDLC Agile UML testing', url: 'https://www.youtube.com/results?search_query=SDLC%20Agile%20UML%20testing' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'ty-7',
        title: 'Advanced Web Development / Full Stack',
        icon: '🚀',
        category: 'Web / Specialization',
        whatYouLearn: 'React/Next.js component state, hooks, router; Node.js/Express REST APIs, MongoDB/PostgreSQL, JWT authentication, state management, full-stack app deployment on Vercel/Render.',
        channels: [
          { name: 'Chai aur Code', url: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Fireship', url: 'https://www.youtube.com/results?search_query=Fireship' },
        ],
        searches: [
          { query: 'React full course', url: 'https://www.youtube.com/results?search_query=React%20full%20course' },
          { query: 'Node.js Express full course', url: 'https://www.youtube.com/results?search_query=Node.js%20Express%20full%20course' },
          { query: 'full stack web development', url: 'https://www.youtube.com/results?search_query=full%20stack%20web%20development' },
        ],
        easyMethod: 'Watch 30–45 min → code along → solve 3–5 problems → build a mini feature.',
      },
      {
        id: 'ty-8',
        title: 'TypeScript',
        icon: '🛡️',
        category: 'Web & Systems',
        whatYouLearn: 'Static typing for JavaScript, type annotations, interfaces, types vs interfaces, generics, union/intersection types, TypeScript with React and Node.js.',
        channels: [
          { name: 'Chai aur Code', url: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Fireship', url: 'https://www.youtube.com/results?search_query=Fireship' },
        ],
        searches: [
          { query: 'TypeScript full course', url: 'https://www.youtube.com/results?search_query=TypeScript%20full%20course' },
          { query: 'TypeScript for beginners', url: 'https://www.youtube.com/results?search_query=TypeScript%20for%20beginners' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'ty-9',
        title: 'Cloud Computing',
        icon: '☁️',
        category: 'Cloud / Infrastructure',
        whatYouLearn: 'Cloud models (IaaS, PaaS, SaaS), virtualization, AWS core services (EC2, S3, RDS, Lambda, VPC), containerization with Docker, container orchestration with Kubernetes basics.',
        channels: [
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: 'AWS', url: 'https://www.youtube.com/results?search_query=AWS' },
          { name: 'TechWorld with Nana', url: 'https://www.youtube.com/results?search_query=TechWorld%20with%20Nana' },
        ],
        searches: [
          { query: 'cloud computing full course', url: 'https://www.youtube.com/results?search_query=cloud%20computing%20full%20course' },
          { query: 'AWS beginner', url: 'https://www.youtube.com/results?search_query=AWS%20beginner' },
          { query: 'Docker Kubernetes cloud', url: 'https://www.youtube.com/results?search_query=Docker%20Kubernetes%20cloud' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'ty-10',
        title: 'Cybersecurity',
        icon: '🔐',
        category: 'Security / Specialization',
        whatYouLearn: 'CIA triad, symmetric/asymmetric cryptography, hashing (SHA, bcrypt), authentication vs authorization, secure communication (SSL/TLS), network defense, firewalls.',
        channels: [
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: 'Professor Messer', url: 'https://www.youtube.com/results?search_query=Professor%20Messer' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
        ],
        searches: [
          { query: 'cybersecurity for beginners', url: 'https://www.youtube.com/results?search_query=cybersecurity%20for%20beginners' },
          { query: 'network security CSE', url: 'https://www.youtube.com/results?search_query=network%20security%20CSE' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'ty-11',
        title: 'Web Security',
        icon: '🛡️',
        category: 'Security & Practical',
        whatYouLearn: 'OWASP Top 10 vulnerabilities: SQL Injection, XSS, CSRF, IDOR, broken authentication, security headers (CORS, CSP), input validation, password hashing and safe API design.',
        channels: [
          { name: 'PortSwigger Web Security Academy', url: 'https://www.youtube.com/results?search_query=PortSwigger%20Web%20Security%20Academy' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
        ],
        searches: [
          { query: 'web application security', url: 'https://www.youtube.com/results?search_query=web%20application%20security' },
          { query: 'OWASP web security', url: 'https://www.youtube.com/results?search_query=OWASP%20web%20security' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
    ],
  },
  FINAL: {
    yearLabel: '4th Year (Final)',
    title: 'Industry + Specialization + Major Project',
    focus: 'Specialization, System/Project Skills, Internships, Deployment, Portfolio, Interviews and Major Capstone Project.',
    studyPattern: 'Primary channel → Topic search → Practice → Backup channel only if needed.',
    subjects: [
      {
        id: 'final-1',
        title: 'System Design',
        icon: '🏗️',
        category: 'High-Level Architecture',
        whatYouLearn: 'High-Level Design (HLD), Low-Level Design (LLD), scalability, load balancing, caching (Redis/Memcached), database partitioning/sharding, message queues (Kafka, RabbitMQ), microservices vs monolith, CAP theorem.',
        channels: [
          { name: 'Gaurav Sen', url: 'https://www.youtube.com/results?search_query=Gaurav%20Sen' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'ByteByteGo', url: 'https://www.youtube.com/results?search_query=ByteByteGo' },
        ],
        searches: [
          { query: 'system design for beginners', url: 'https://www.youtube.com/results?search_query=system%20design%20for%20beginners' },
          { query: 'system design interview', url: 'https://www.youtube.com/results?search_query=system%20design%20interview' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'final-2',
        title: 'Distributed Systems',
        icon: '🌐',
        category: 'Core Distributed CS',
        whatYouLearn: 'Distributed consensus (Raft, Paxos), clock synchronization, replication, fault tolerance, RPCs (gRPC), eventual consistency, and scalable distributed storage.',
        channels: [
          { name: 'ByteByteGo', url: 'https://www.youtube.com/results?search_query=ByteByteGo' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'MIT OpenCourseWare', url: 'https://www.youtube.com/results?search_query=MIT%20OpenCourseWare' },
        ],
        searches: [
          { query: 'distributed systems CSE', url: 'https://www.youtube.com/results?search_query=distributed%20systems%20CSE' },
          { query: 'distributed systems explained', url: 'https://www.youtube.com/results?search_query=distributed%20systems%20explained' },
        ],
        easyMethod: 'Watch concept → draw your own diagram → make 1-page notes → solve 10–15 questions.',
      },
      {
        id: 'final-3',
        title: 'Cloud & DevOps',
        icon: '🚢',
        category: 'DevOps & Deployment',
        whatYouLearn: 'CI/CD pipelines (GitHub Actions, GitLab CI), Docker multi-stage builds, Kubernetes pods & deployments, Infrastructure as Code (Terraform), monitoring & logging (Prometheus, Grafana).',
        channels: [
          { name: 'TechWorld with Nana', url: 'https://www.youtube.com/results?search_query=TechWorld%20with%20Nana' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
        ],
        searches: [
          { query: 'DevOps full course', url: 'https://www.youtube.com/results?search_query=DevOps%20full%20course' },
          { query: 'Docker Kubernetes CI CD', url: 'https://www.youtube.com/results?search_query=Docker%20Kubernetes%20CI%20CD' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'final-4',
        title: 'Advanced AI/ML / Specialization',
        icon: '✨',
        category: 'Advanced AI Track',
        whatYouLearn: 'Large Language Models (LLMs), Transformers, prompt engineering, RAG pipelines, fine-tuning, ML model serving with FastAPI/Docker, and MLOps deployment.',
        channels: [
          { name: 'Krish Naik', url: 'https://www.youtube.com/results?search_query=Krish%20Naik' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/results?search_query=StatQuest%20with%20Josh%20Starmer' },
        ],
        searches: [
          { query: 'advanced machine learning', url: 'https://www.youtube.com/results?search_query=advanced%20machine%20learning' },
          { query: 'ML model deployment', url: 'https://www.youtube.com/results?search_query=ML%20model%20deployment' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'final-5',
        title: 'Advanced Cybersecurity / Ethical Security',
        icon: '🛡️',
        category: 'Security Track',
        whatYouLearn: 'Penetration testing methodologies, vulnerability scanning, security audits, defensive security engineering, secure architecture reviews in authorized sandbox environments.',
        channels: [
          { name: 'PortSwigger Web Security Academy', url: 'https://www.youtube.com/results?search_query=PortSwigger%20Web%20Security%20Academy' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/results?search_query=NetworkChuck' },
          { name: 'Professor Messer', url: 'https://www.youtube.com/results?search_query=Professor%20Messer' },
        ],
        searches: [
          { query: 'ethical hacking beginner', url: 'https://www.youtube.com/results?search_query=ethical%20hacking%20beginner' },
          { query: 'web security OWASP', url: 'https://www.youtube.com/results?search_query=web%20security%20OWASP' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'final-6',
        title: 'Software Architecture & Design Patterns',
        icon: '📐',
        category: 'Design & Code Quality',
        whatYouLearn: 'Creational, Structural, and Behavioral Gang of Four (GoF) design patterns (Singleton, Factory, Observer, Strategy, Decorator), SOLID principles, Clean Code architecture and refactoring.',
        channels: [
          { name: 'Gaurav Sen', url: 'https://www.youtube.com/results?search_query=Gaurav%20Sen' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
        ],
        searches: [
          { query: 'software architecture design patterns', url: 'https://www.youtube.com/results?search_query=software%20architecture%20design%20patterns' },
          { query: 'design patterns Java', url: 'https://www.youtube.com/results?search_query=design%20patterns%20Java' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'final-7',
        title: 'Interview / Placement Preparation',
        icon: '🎯',
        category: 'Career & Placement',
        whatYouLearn: 'DSA revision & problem solving, core CS subjects viva preparation (DBMS, OS, CN, OOP), behavioral interview questions (STAR method), technical project deep-dives, resume polishing, GitHub portfolio.',
        channels: [
          { name: 'Striver / take U forward', url: 'https://www.youtube.com/results?search_query=Striver%20/%20take%20U%20forward' },
          { name: 'Apna College', url: 'https://www.youtube.com/results?search_query=Apna%20College' },
          { name: 'Kunal Kushwaha', url: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha' },
          { name: 'Gate Smashers', url: 'https://www.youtube.com/results?search_query=Gate%20Smashers' },
        ],
        searches: [
          { query: 'placement DSA', url: 'https://www.youtube.com/results?search_query=placement%20DSA' },
          { query: 'DBMS OS CN interview', url: 'https://www.youtube.com/results?search_query=DBMS%20OS%20CN%20interview' },
          { query: 'resume project interview', url: 'https://www.youtube.com/results?search_query=resume%20project%20interview' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
      {
        id: 'final-8',
        title: 'Major Project / Deployment',
        icon: '🚀',
        category: 'Capstone & Execution',
        whatYouLearn: 'Problem definition → SRS & architecture → UI/UX design → database modeling → robust API backend → automated testing → cloud deployment (AWS/Vercel) → documentation → final viva presentation.',
        channels: [
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'CodeWithHarry', url: 'https://www.youtube.com/results?search_query=CodeWithHarry' },
          { name: 'Chai aur Code', url: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code' },
          { name: 'Fireship', url: 'https://www.youtube.com/results?search_query=Fireship' },
        ],
        searches: [
          { query: 'full stack project', url: 'https://www.youtube.com/results?search_query=full%20stack%20project' },
          { query: 'deploy React Node MongoDB', url: 'https://www.youtube.com/results?search_query=deploy%20React%20Node%20MongoDB' },
          { query: 'project architecture', url: 'https://www.youtube.com/results?search_query=project%20architecture' },
        ],
        easyMethod: 'Watch beginner explanation → reproduce examples yourself → make a small practice project.',
      },
    ],
  },
};

// ==========================================
// 3. SPECIALIZATION LEARNING PATHS DATA
// ==========================================
const SPECIALIZATION_TRACKS = [
  {
    path: 'Full-Stack / Software Development',
    icon: '💻',
    color: '#7c3aed',
    steps: ['HTML / CSS / JS', 'React / Next.js', 'Node / Express', 'SQL / NoSQL', 'REST / GraphQL APIs', 'Testing & CI/CD', 'Cloud Deployment'],
  },
  {
    path: 'AI / Machine Learning',
    icon: '🤖',
    color: '#a855f7',
    steps: ['Python Basics', 'NumPy & pandas', 'Statistics & Prob', 'Machine Learning', 'Deep Learning', 'PyTorch / TF', 'Model Deployment'],
  },
  {
    path: 'Cybersecurity & Defense',
    icon: '🛡️',
    color: '#6d28d9',
    steps: ['Computer Networks', 'Linux Systems', 'Security Basics', 'Web Security (OWASP)', 'Hands-on Labs', 'Defensive Engg'],
  },
  {
    path: 'Data Science & Analytics',
    icon: '📊',
    color: '#8b5cf6',
    steps: ['Python Programming', 'SQL Queries', 'Statistics & EDA', 'pandas & Seaborn', 'Data Storytelling', 'ML Foundations', 'Data Projects'],
  },
  {
    path: 'Cloud & DevOps Engineering',
    icon: '☁️',
    color: '#581c87',
    steps: ['Linux Command Line', 'Networking Basics', 'Git & GitHub', 'Docker Containers', 'CI/CD Pipelines', 'AWS / Azure Cloud', 'Kubernetes'],
  },
];

// ==========================================
// MAIN YOUTUBE LEARNING PAGE COMPONENT
// ==========================================
export const YouTubePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active top navigation view: 'curriculum' | 'channels' | 'specializations' | 'database'
  const [activeTab, setActiveTab] = useState('curriculum');

  // Filter for 4-year curriculum: 'ALL' | 'FY' | 'SY' | 'TY' | 'FINAL'
  const [curriculumYear, setCurriculumYear] = useState('ALL');
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Creator directory search & category filter
  const [channelSearch, setChannelSearch] = useState('');
  const [selectedChannelCategory, setSelectedChannelCategory] = useState('All');

  // Database Playlists state
  const [resources, setResources] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [dbSearchQuery, setDbSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDbCategory, setSelectedDbCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDbLevel, setSelectedDbLevel] = useState(searchParams.get('level') || 'All');

  const { isBookmarked, toggleBookmark } = useBookmarks('YouTubeResource');

  const dbCategories = ['All', 'DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'DevOps', 'SystemDesign', 'Math'];
  const dbLevels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Complete Series'];

  // Toggle subject accordion
  const toggleSubject = (id) => {
    setExpandedSubjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllSubjects = () => {
    const all = {};
    Object.values(FOUR_YEAR_SUBJECTS).forEach((yearObj) => {
      yearObj.subjects.forEach((s) => {
        all[s.id] = true;
      });
    });
    setExpandedSubjects(all);
  };

  const collapseAllSubjects = () => {
    setExpandedSubjects({});
  };

  // Fetch Database Playlists from Backend
  const fetchYouTubeResources = useCallback(async () => {
    if (activeTab !== 'database') return;
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const res = await youtubeService.getYouTubeResources({
        page,
        limit: 9,
        search: dbSearchQuery.trim() || undefined,
        category: selectedDbCategory !== 'All' ? selectedDbCategory : undefined,
        level: selectedDbLevel !== 'All' ? selectedDbLevel : undefined,
      });

      setResources(res.data || []);
      if (res.meta) setMeta(res.meta);
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchParams, selectedDbCategory, selectedDbLevel, dbSearchQuery]);

  useEffect(() => {
    if (activeTab === 'database') {
      fetchYouTubeResources();
    }
  }, [activeTab, fetchYouTubeResources]);

  const handleDbSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      page: '1',
      ...(dbSearchQuery ? { q: dbSearchQuery } : {}),
      ...(selectedDbCategory !== 'All' ? { category: selectedDbCategory } : {}),
      ...(selectedDbLevel !== 'All' ? { level: selectedDbLevel } : {}),
    });
  };

  // Filtered list of subjects for Tab 1
  const filteredSubjectsByYear = useMemo(() => {
    const years = curriculumYear === 'ALL' ? ['FY', 'SY', 'TY', 'FINAL'] : [curriculumYear];
    const result = {};

    years.forEach((yr) => {
      const yearObj = FOUR_YEAR_SUBJECTS[yr];
      if (!yearObj) return;

      const filtered = yearObj.subjects.filter((subj) => {
        if (!curriculumSearch.trim()) return true;
        const q = curriculumSearch.toLowerCase();
        return (
          subj.title.toLowerCase().includes(q) ||
          subj.whatYouLearn.toLowerCase().includes(q) ||
          subj.category.toLowerCase().includes(q) ||
          subj.channels.some((c) => c.name.toLowerCase().includes(q))
        );
      });

      if (filtered.length > 0) {
        result[yr] = {
          ...yearObj,
          subjects: filtered,
        };
      }
    });

    return result;
  }, [curriculumYear, curriculumSearch]);

  // Filtered Channels for Tab 2
  const filteredChannels = useMemo(() => {
    return TOP_CHANNELS.filter((ch) => {
      const matchSearch =
        !channelSearch.trim() ||
        ch.name.toLowerCase().includes(channelSearch.toLowerCase()) ||
        ch.bestFor.toLowerCase().includes(channelSearch.toLowerCase()) ||
        ch.tags.some((t) => t.toLowerCase().includes(channelSearch.toLowerCase()));

      const matchCat =
        selectedChannelCategory === 'All' ||
        ch.category.toLowerCase().includes(selectedChannelCategory.toLowerCase());

      return matchSearch && matchCat;
    });
  }, [channelSearch, selectedChannelCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      {/* ========================================================
          HERO BANNER: LAVENDER & EGG-WHITE PREMIUM GLASS
          ======================================================== */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 35%, #6d28d9 75%, #7e22ce 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(109, 40, 217, 0.35)',
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 180, 254, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '20%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

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
                letterSpacing: '0.04em',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Youtube size={16} color="#fca5a5" /> CSE 4-YEAR YOUTUBE LEARNING MASTER GUIDE
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(216, 180, 254, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#e9d5ff',
              }}
            >
              <Sparkles size={14} /> Subject-wise • Easy Explanation • Clickable Links
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
            CSE 4-Year YouTube Video Directory
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '820px',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            Built from the official CSE 4-Year Roadmap & International Book Guide. Follow the dual-channel method:
            1 primary easy explanation channel + 1 backup channel, paired with direct 1-click YouTube topic searches!
          </p>

          {/* Quick Metrics Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              maxWidth: '750px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f3e8ff' }}>4 Years</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>FY → SY → TY → Final</div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f3e8ff' }}>38 Topics</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>Full CSE Syllabus</div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f3e8ff' }}>20+ Channels</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>Top Global Tech Creators</div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f3e8ff' }}>80+ Links</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>Direct Topic Searches</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          HOW TO USE THIS GUIDE (COLLAPSIBLE / ACCENT BANNER)
          ======================================================== */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--lavender-100)',
              color: 'var(--primary-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lightbulb size={18} />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            How to Use This YouTube Guide for 10x Better Retention
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              1
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Pick One Primary Channel:</strong> First learn the subject from one easy-explanation creator. Do not jump midway.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              2
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Use Backup Channel for Doubts:</strong> If a specific topic (e.g. recursion or deadlocks) is unclear, watch the second channel.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              3
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Click Direct Topic Searches:</strong> Jump right into YouTube search results curated with the best keywords for exams.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              4
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Code-Along & Mini Projects:</strong> For coding subjects (C++, Python, Web, Java), always type code alongside the video.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              5
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>1-Page Diagrams for Core Subjects:</strong> For OS, CN & DBMS, draw block diagrams and solve 10–15 practice questions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span
              style={{
                background: 'var(--lavender-100)',
                color: 'var(--primary-800)',
                fontWeight: 700,
                fontSize: '0.85rem',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              6
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Match With University Syllabus:</strong> Use videos as the conceptual layer, then verify exam formats with your university syllabus.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          NAVIGATION TABS (Curriculum | Top Channels | Specializations | DB Playlists)
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
        <button
          onClick={() => setActiveTab('curriculum')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'curriculum' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'curriculum' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'curriculum' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <GraduationCap size={18} /> 4-Year Subject Video Guide
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'channels' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'channels' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'channels' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Tv size={18} /> Top 20 Creator Directory
        </button>

        <button
          onClick={() => setActiveTab('specializations')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'specializations' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'specializations' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'specializations' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Compass size={18} /> Specialization Learning Order
        </button>

        <button
          onClick={() => setActiveTab('database')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px 10px 0 0',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'database' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'database' ? 'var(--primary-800)' : 'var(--text-muted)',
            borderBottom: activeTab === 'database' ? '3px solid var(--primary-800)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Database size={18} /> Database Playlist Explorer
        </button>
      </div>

      {/* ========================================================
          TAB 1: 4-YEAR COMPLETE SUBJECT VIDEO GUIDE
          ======================================================== */}
      {activeTab === 'curriculum' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filter & Search Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-secondary)',
              padding: '1rem 1.25rem',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Year Selector Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                Year:
              </span>
              {[
                { id: 'ALL', label: 'All 4 Years' },
                { id: 'FY', label: '1st Year (FY)' },
                { id: 'SY', label: '2nd Year (SY)' },
                { id: 'TY', label: '3rd Year (TY)' },
                { id: 'FINAL', label: '4th Year (Final)' },
              ].map((yr) => (
                <button
                  key={yr.id}
                  onClick={() => setCurriculumYear(yr.id)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    transition: 'all 0.2s ease',
                    background: curriculumYear === yr.id ? 'var(--primary-800)' : 'var(--bg-primary)',
                    color: curriculumYear === yr.id ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: curriculumYear === yr.id ? 'var(--primary-800)' : 'var(--border-color)',
                  }}
                >
                  {yr.label}
                </button>
              ))}
            </div>

            {/* Search Input & Expand/Collapse */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: '1 1 300px', maxWidth: '480px' }}>
              <Input
                placeholder="Search subject (e.g., DSA, OS, DBMS, Calculus, React)..."
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />

              <Button variant="ghost" size="sm" onClick={expandAllSubjects} title="Expand All Topics">
                Expand
              </Button>
              <Button variant="ghost" size="sm" onClick={collapseAllSubjects} title="Collapse All Topics">
                Collapse
              </Button>
            </div>
          </div>

          {/* Render Subject Accordions Grouped by Year */}
          {Object.keys(filteredSubjectsByYear).length === 0 ? (
            <EmptyState
              title="No Subjects Found"
              message={`No topics matched your search query "${curriculumSearch}".`}
              actionLabel="Clear Search"
              onAction={() => setCurriculumSearch('')}
            />
          ) : (
            Object.entries(filteredSubjectsByYear).map(([yearKey, yearObj]) => (
              <div
                key={yearKey}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Year Section Header */}
                <div
                  style={{
                    borderBottom: '2px solid var(--border-color-subtle)',
                    paddingBottom: '1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, var(--lavender-700), var(--lavender-900))',
                        color: '#ffffff',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {yearObj.yearLabel}
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {yearObj.title}
                    </h2>
                    <Badge variant="neutral">{yearObj.subjects.length} Subjects</Badge>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', margin: 0 }}>
                    <strong>Main focus:</strong> {yearObj.focus}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                    <Zap size={14} /> Suggested Study Pattern: {yearObj.studyPattern}
                  </div>
                </div>

                {/* Subject Cards Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {yearObj.subjects.map((subject, idx) => {
                    const isExpanded = expandedSubjects[subject.id] !== false; // default expanded

                    return (
                      <div
                        key={subject.id}
                        style={{
                          borderRadius: '14px',
                          border: isExpanded ? '1px solid var(--lavender-300)' : '1px solid var(--border-color)',
                          background: isExpanded ? 'var(--bg-surface)' : 'var(--bg-primary)',
                          transition: 'all 0.25s ease',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Subject Card Header / Toggle Button */}
                        <div
                          onClick={() => toggleSubject(subject.id)}
                          style={{
                            padding: '1rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.25rem' }}>{subject.icon}</span>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                              {idx + 1}. {subject.title}
                            </span>
                            <span
                              style={{
                                background: 'var(--lavender-100)',
                                color: 'var(--lavender-900)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '6px',
                              }}
                            >
                              {subject.category}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                              {isExpanded ? 'Hide Details' : 'View Videos'}
                            </span>
                            {isExpanded ? (
                              <ChevronUp size={18} color="var(--primary-800)" />
                            ) : (
                              <ChevronDown size={18} color="var(--text-muted)" />
                            )}
                          </div>
                        </div>

                        {/* Expandable Content Area */}
                        {isExpanded && (
                          <div
                            style={{
                              padding: '0 1.25rem 1.25rem 1.25rem',
                              borderTop: '1px solid var(--border-color-subtle)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              marginTop: '0.25rem',
                              paddingTop: '1rem',
                            }}
                          >
                            {/* What You Learn */}
                            <div>
                              <div
                                style={{
                                  fontSize: '0.825rem',
                                  fontWeight: 700,
                                  color: 'var(--text-muted)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.04em',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                What You Learn
                              </div>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                {subject.whatYouLearn}
                              </p>
                            </div>

                            {/* Recommended YouTube Channels & Direct Search */}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1rem',
                              }}
                            >
                              {/* Left Column: Channels */}
                              <div
                                style={{
                                  background: 'var(--bg-secondary)',
                                  padding: '1rem',
                                  borderRadius: '10px',
                                  border: '1px solid var(--border-color)',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.825rem',
                                    fontWeight: 700,
                                    color: 'var(--primary-800)',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                  }}
                                >
                                  <Youtube size={14} /> Recommended Channels
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                  {subject.channels.map((ch) => (
                                    <a
                                      key={ch.name}
                                      href={ch.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                        background: 'var(--lavender-50)',
                                        color: 'var(--primary-800)',
                                        border: '1px solid var(--lavender-200)',
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '8px',
                                        fontSize: '0.825rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'all 0.15s ease',
                                      }}
                                    >
                                      {ch.name} <ExternalLink size={12} />
                                    </a>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column: Direct YouTube Topic Searches */}
                              <div
                                style={{
                                  background: 'var(--bg-secondary)',
                                  padding: '1rem',
                                  borderRadius: '10px',
                                  border: '1px solid var(--border-color)',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.825rem',
                                    fontWeight: 700,
                                    color: '#b45309',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                  }}
                                >
                                  <Search size={14} /> Direct 1-Click Topic Searches
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                  {subject.searches.map((s) => (
                                    <a
                                      key={s.query}
                                      href={s.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        background: '#fef3c7',
                                        color: '#92400e',
                                        border: '1px solid #fde68a',
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '8px',
                                        fontSize: '0.825rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'all 0.15s ease',
                                      }}
                                    >
                                      🔍 {s.query} <ExternalLink size={12} />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Easy Method / Action Advice */}
                            <div
                              style={{
                                background: 'var(--bg-tertiary)',
                                padding: '0.65rem 0.9rem',
                                borderRadius: '8px',
                                fontSize: '0.825rem',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <CheckCircle2 size={16} color="var(--primary-800)" style={{ flexShrink: 0 }} />
                              <span>
                                <strong>Easy Method:</strong> {subject.easyMethod}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: TOP 20 CREATOR DIRECTORY
          ======================================================== */}
      {activeTab === 'channels' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header & Filter */}
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
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Top 20 Recommended YouTube Channels
              </h2>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                The world’s best computer science educators with curated focus areas and direct channel links.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flex: '1 1 280px', maxWidth: '420px' }}>
              <Input
                placeholder="Search creator, topic, or language..."
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Channel Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredChannels.map((channel) => (
              <Card
                key={channel.name}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'var(--lavender-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                      }}
                    >
                      {channel.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                        {channel.name}
                      </h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                        {channel.category}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-muted)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {channel.subscribers}
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Best For:
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {channel.bestFor}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {channel.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.725rem',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Open Channel CTA */}
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color-subtle)' }}>
                  <a
                    href={channel.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="primary" size="sm" style={{ width: '100%' }} icon={ExternalLink} iconPosition="right">
                      Open Channel / Search
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: SPECIALIZATION LEARNING ORDERS & 4-YEAR STUDY RULES
          ======================================================== */}
      {activeTab === 'specializations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 1: Choose a Specialization After Core CSE */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--lavender-100)',
                  color: 'var(--primary-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={20} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Choose a Specialization After Core CSE
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Once you finish 2nd Year (SY) fundamentals (DSA, OOP, DBMS, OS, CN), choose your career specialization track and follow this systematic sequence:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {SPECIALIZATION_TRACKS.map((track) => (
                <div
                  key={track.path}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{track.icon}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {track.path}
                    </h3>
                  </div>

                  {/* Flow Steps */}
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {track.steps.map((step, sIdx) => (
                      <React.Fragment key={step}>
                        <div
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--lavender-300)',
                            color: 'var(--primary-900)',
                            fontWeight: 700,
                            fontSize: '0.825rem',
                            padding: '0.45rem 0.8rem',
                            borderRadius: '8px',
                            boxShadow: 'var(--shadow-xs)',
                          }}
                        >
                          {sIdx + 1}. {step}
                        </div>
                        {sIdx < track.steps.length - 1 && (
                          <ArrowRight size={14} color="var(--primary-800)" style={{ flexShrink: 0 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: 4-Year Golden Study Rules */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--lavender-100)',
                  color: 'var(--primary-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award size={20} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                The 4-Year CSE Study Rules
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Golden rules for engineering students to balance video tutorials with hands-on development.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  1. FY (Foundation Rule)
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Focus on programming fundamentals, web basics (HTML/CSS/JS), calculus & discrete mathematics, and Git version control.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  2. SY (Core CS Heavyweight)
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Focus heavily on DSA + OOP + DBMS + OS + Computer Networks. These form 80% of technical interview rounds.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  3. TY (Specialization & Projects)
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Choose your domain (Full-Stack, AI/ML, Cloud, Security) and build 2–3 serious, production-quality projects.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                  4. Final Year (Industry & Deployment)
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Deliver your Capstone Major Project, complete internships, polish system design, finalize your resume and ace technical interviews.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--lavender-50)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--lavender-300)',
                  gridColumn: '1 / -1',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.35rem' }}>
                  5. Golden Tutorial Principle
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  For every subject, use videos as the <strong>explanation layer</strong>—not as the entire learning process. Active practice, problem solving on LeetCode/HackerRank, and writing code from scratch are essential for mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: DATABASE PLAYLIST EXPLORER (LIVE DB & BOOKMARKS)
          ======================================================== */}
      {activeTab === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Search & Filter Bar */}
          <div className="filter-bar">
            <form onSubmit={handleDbSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: '260px', gap: '0.5rem' }}>
              <Input
                placeholder="Search playlists, channel names (e.g., Striver, Abdul Bari, Traversy)..."
                value={dbSearchQuery}
                onChange={(e) => setDbSearchQuery(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
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

          {/* Render Database Playlists */}
          {isLoading ? (
            <div className="cards-grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} height={240} variant="rounded" />
              ))}
            </div>
          ) : errorDetails ? (
            <ErrorState error={errorDetails} onRetry={fetchYouTubeResources} />
          ) : resources.length === 0 ? (
            <EmptyState
              title="No Playlists Found"
              message="No YouTube resources matched your filter criteria in the database."
              actionLabel="Reset Filters"
              onAction={() => {
                setDbSearchQuery('');
                setSelectedDbCategory('All');
                setSelectedDbLevel('All');
                setSearchParams({ page: '1' });
              }}
            />
          ) : (
            <>
              <div className="cards-grid-3">
                {resources.map((item) => {
                  const isSaved = isBookmarked(item._id);
                  const targetUrl = item.playlistUrl || item.videoUrl;

                  return (
                    <Card
                      key={item._id}
                      style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <Badge variant="primary">{item.category}</Badge>
                          <Badge variant="neutral">{item.difficulty}</Badge>
                        </div>

                        <button
                          onClick={() => toggleBookmark(item, 'YouTubeResource')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isSaved ? 'var(--primary-800)' : 'var(--text-muted)',
                            padding: '4px',
                          }}
                          title={isSaved ? 'Remove Bookmark' : 'Bookmark'}
                        >
                          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '0.825rem',
                            fontWeight: 600,
                            color: 'var(--primary-800)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          Channel: {item.channelName}
                        </div>
                        <h3
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      {item.topicsCovered && item.topicsCovered.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {item.topicsCovered.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                background: 'var(--bg-tertiary)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              • {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border-color-subtle)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {item.estimatedHours ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.825rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            <Clock size={14} /> ~{item.estimatedHours} Hours
                          </div>
                        ) : (
                          <div />
                        )}

                        {targetUrl && (
                          <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="sm" icon={PlayCircle} iconPosition="left">
                              Watch on YouTube
                            </Button>
                          </a>
                        )}
                      </div>
                    </Card>
                  );
                })}
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

export default YouTubePage;
