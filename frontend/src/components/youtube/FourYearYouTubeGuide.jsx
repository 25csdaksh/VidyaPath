import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Search,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  CheckCircle2,
  Tv,
  Compass,
  Award,
  ArrowRight,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Input from '../common/Input';
import Button from '../common/Button';

// Top 20 Recommended Channels
export const TOP_CHANNELS_DATA = [
  {
    name: 'CodeWithHarry',
    category: 'Programming & Web',
    bestFor: 'Programming, Python, C/C++, Java, Web Development, Git, Projects',
    subscribers: '5M+',
    searchUrl: 'https://www.youtube.com/results?search_query=CodeWithHarry',
    icon: '💻',
    tags: ['C/C++', 'Python', 'Web Dev', 'Java', 'Git'],
  },
  {
    name: 'Apna College',
    category: 'DSA & Placements',
    bestFor: 'C++, DSA, Java, Web Development, SQL, Placement Preparation',
    subscribers: '4.5M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Apna%20College',
    icon: '🎓',
    tags: ['DSA', 'C++', 'Java', 'Placement Prep', 'Web Dev'],
  },
  {
    name: 'Gate Smashers',
    category: 'Core CS Subjects',
    bestFor: 'DBMS, OS, Computer Networks, Software Engineering, TOC, Compiler',
    subscribers: '1.8M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Gate%20Smashers',
    icon: '⚡',
    tags: ['DBMS', 'OS', 'CN', 'Software Engg', 'TOC'],
  },
  {
    name: "Jenny's Lectures CS/IT",
    category: 'Core CS & DSA',
    bestFor: "DSA, DBMS, OS, CN, TOC, Compiler, core CS",
    subscribers: '1.4M+',
    searchUrl: "https://www.youtube.com/results?search_query=Jenny%27s%20Lectures%20CS/IT",
    icon: '📚',
    tags: ['DSA', 'DBMS', 'OS', 'CN', 'Compiler'],
  },
  {
    name: 'Neso Academy',
    category: 'CS Theory & Hardware',
    bestFor: 'DSA, DBMS, OS, CN, Digital Logic, TOC, Compiler, theory',
    subscribers: '2.3M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Neso%20Academy',
    icon: '🏛️',
    tags: ['Digital Logic', 'OS', 'CN', 'Theory', 'DSA'],
  },
  {
    name: 'Abdul Bari',
    category: 'Algorithms & Complexity',
    bestFor: 'Algorithms, DSA, complexity, programming concepts',
    subscribers: '1M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Abdul%20Bari',
    icon: '🧠',
    tags: ['Algorithms', 'Time Complexity', 'Dynamic Prog', 'Graphs'],
  },
  {
    name: 'Striver / take U forward',
    category: 'DSA & Interview Prep',
    bestFor: 'DSA, problem solving, interview preparation, SDE Sheets',
    subscribers: '700K+',
    searchUrl: 'https://www.youtube.com/results?search_query=Striver%20/%20take%20U%20forward',
    icon: '🚀',
    tags: ['A2Z DSA Sheet', 'SDE Sheet', 'LeetCode', 'Interview Prep'],
  },
  {
    name: 'freeCodeCamp.org',
    category: 'Comprehensive Full Courses',
    bestFor: 'Full courses: programming, web, Python, databases, AI/ML, cloud',
    subscribers: '9.5M+',
    searchUrl: 'https://www.youtube.com/results?search_query=freeCodeCamp.org',
    icon: '🔥',
    tags: ['Full Courses', 'Python', 'Web Dev', 'Cloud', 'AI/ML'],
  },
  {
    name: 'Programming with Mosh',
    category: 'Clean Code Fundamentals',
    bestFor: 'Programming fundamentals, Python, Java, web development',
    subscribers: '3.8M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Programming%20with%20Mosh',
    icon: '🎯',
    tags: ['Python', 'Java', 'JavaScript', 'Clean Code'],
  },
  {
    name: 'Kunal Kushwaha',
    category: 'Java, DSA & Open Source',
    bestFor: 'Java, DSA, Git/GitHub, open-source and developer roadmap',
    subscribers: '600K+',
    searchUrl: 'https://www.youtube.com/results?search_query=Kunal%20Kushwaha',
    icon: '🌱',
    tags: ['Java DSA', 'Git/GitHub', 'Open Source', 'DevOps Intro'],
  },
  {
    name: 'Chai aur Code',
    category: 'Modern Web & Full-Stack',
    bestFor: 'JavaScript, TypeScript, React, backend, Git, full-stack in depth',
    subscribers: '500K+',
    searchUrl: 'https://www.youtube.com/results?search_query=Chai%20aur%20Code',
    icon: '☕',
    tags: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Full-Stack'],
  },
  {
    name: 'Telusko',
    category: 'Java & Backend Basics',
    bestFor: 'Java, Python, JavaScript, backend, programming fundamentals',
    subscribers: '2.2M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Telusko',
    icon: '☕',
    tags: ['Java', 'Spring Boot', 'Python', 'Backend'],
  },
  {
    name: 'Java Brains',
    category: 'Enterprise Java & Spring',
    bestFor: 'Java, Spring, backend, software engineering',
    subscribers: '700K+',
    searchUrl: 'https://www.youtube.com/results?search_query=Java%20Brains',
    icon: '☕',
    tags: ['Spring Boot', 'Microservices', 'Java Enterprise'],
  },
  {
    name: 'Krish Naik',
    category: 'AI / ML / Data Science',
    bestFor: 'Machine Learning, Deep Learning, NLP, Data Science',
    subscribers: '950K+',
    searchUrl: 'https://www.youtube.com/results?search_query=Krish%20Naik',
    icon: '🤖',
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Data Science'],
  },
  {
    name: 'StatQuest with Josh Starmer',
    category: 'Math & ML Visualized',
    bestFor: 'Statistics, ML, probability, intuitive explanations',
    subscribers: '1.2M+',
    searchUrl: 'https://www.youtube.com/results?search_query=StatQuest%20with%20Josh%20Starmer',
    icon: '📊',
    tags: ['Statistics', 'ML Algorithms', 'PCA', 'Neural Nets'],
  },
  {
    name: '3Blue1Brown',
    category: 'Visual Math Intuition',
    bestFor: 'Math intuition, linear algebra, calculus, probability',
    subscribers: '6.2M+',
    searchUrl: 'https://www.youtube.com/results?search_query=3Blue1Brown',
    icon: '📐',
    tags: ['Linear Algebra', 'Calculus', 'Neural Networks', 'Math Intuition'],
  },
  {
    name: 'CS50',
    category: 'Harvard CS Foundation',
    bestFor: 'Computer science fundamentals and programming',
    subscribers: '2.1M+',
    searchUrl: 'https://www.youtube.com/results?search_query=CS50',
    icon: '🎓',
    tags: ['CS Fundamentals', 'Memory', 'Algorithms', 'AI Intro'],
  },
  {
    name: 'NetworkChuck',
    category: 'Networking & Cloud',
    bestFor: 'Networking, Linux, cloud and cybersecurity fundamentals',
    subscribers: '3.6M+',
    searchUrl: 'https://www.youtube.com/results?search_query=NetworkChuck',
    icon: '🌐',
    tags: ['Networking', 'Linux', 'Docker', 'Cybersecurity'],
  },
  {
    name: 'Professor Messer',
    category: 'Certifications & Security',
    bestFor: 'Networking, security and certification-style fundamentals',
    subscribers: '1M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Professor%20Messer',
    icon: '🛡️',
    tags: ['CompTIA Security+', 'Network+', 'Cybersecurity'],
  },
  {
    name: 'Fireship',
    category: 'Fast-Paced Modern Tech',
    bestFor: 'Short, fast explanations of modern web/cloud/dev technologies',
    subscribers: '3.2M+',
    searchUrl: 'https://www.youtube.com/results?search_query=Fireship',
    icon: '⚡',
    tags: ['100 Seconds', 'Web Tech', 'Cloud', 'Architecture'],
  },
];

// Complete 4-Year Subjects
export const FOUR_YEAR_SUBJECTS_DATA = {
  FY: {
    yearLabel: '1st Year (FY)',
    title: 'Foundation',
    focus: 'Programming + engineering fundamentals, web basics, mathematics, computer/digital fundamentals and communication.',
    studyPattern: 'Primary channel → topic search → practice → backup channel only if needed.',
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
        whatYouLearn: 'Repositories, commits, branches, collaboration and basic version control.',
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
        whatYouLearn: 'Calculus and related engineering mathematics used later in algorithms, AI/ML and performance analysis.',
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
        whatYouLearn: 'Vectors, matrices, transformations and the intuition needed for AI/ML and computer graphics.',
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
        whatYouLearn: 'Sets, relations, functions, logic, graphs, combinatorics and proof techniques.',
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
        whatYouLearn: 'Number systems, binary arithmetic, Boolean algebra, logic gates, digital circuits, memory and CPU basics.',
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
        category: 'Engineering & Communication',
        whatYouLearn: 'Common engineering subjects such as physics/chemistry/electronics/communication depending on university.',
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
    focus: 'DSA, OOP, DBMS, OS, Computer Networks and discrete/theory foundations.',
    studyPattern: 'Primary channel → topic search → practice → backup channel only if needed.',
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
        whatYouLearn: 'Classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces and exceptions.',
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
        whatYouLearn: 'Core Java syntax, OOP, collections, exceptions, files and basic application development.',
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
        whatYouLearn: 'Tables, keys, normalization, SQL, joins, indexes, transactions and database design.',
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
        whatYouLearn: 'Queries, joins, grouping, subqueries, constraints, indexes and practical database work.',
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
        whatYouLearn: 'Processes, threads, CPU scheduling, memory management, virtual memory, file systems, synchronization and deadlocks.',
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
        whatYouLearn: 'OSI/TCP-IP, IP addressing, subnetting, Ethernet, routing, TCP/UDP, DNS, HTTP/HTTPS and network security basics.',
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
        whatYouLearn: 'Logic, relations, graphs, trees, combinatorics and proof techniques connected to algorithms.',
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
        whatYouLearn: 'Command line, files, permissions, processes and developer/server basics.',
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
    focus: 'AI/ML, software engineering, advanced web, cloud, cybersecurity and data science. The exact electives vary by university.',
    studyPattern: 'Primary channel → topic search → practice → backup channel only if needed.',
    subjects: [
      {
        id: 'ty-1',
        title: 'Artificial Intelligence (AI)',
        icon: '🤖',
        category: 'AI / Specialization',
        whatYouLearn: 'Search/problem solving, intelligent agents, knowledge and core AI concepts.',
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
        whatYouLearn: 'Supervised/unsupervised learning, classification, regression, clustering, evaluation and feature engineering.',
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
        whatYouLearn: 'Neural networks, backpropagation, CNNs, sequence models and practical model training.',
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
        whatYouLearn: 'Python, NumPy, pandas, statistics, data cleaning, visualization and analysis.',
        channels: [
          { name: 'Krish Naik', url: 'https://www.youtube.com/results?search_query=Krish%20Naik' },
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=freeCodeCamp.org' },
          { name: 'Alex The Analyst', url: 'https://www.youtube.com/results?search_query=Alex%20The%20Analian' },
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
        whatYouLearn: 'Probability, distributions, statistical reasoning and concepts supporting data science/ML.',
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
        whatYouLearn: 'SDLC, requirements, UML, design principles, testing, version control, Agile and project management.',
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
        whatYouLearn: 'React/Angular/Vue, backend APIs, databases, authentication, testing and deployment.',
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
        whatYouLearn: 'Types, interfaces, generics and scalable frontend/backend development.',
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
        whatYouLearn: 'Virtual machines, storage, databases, networking, containers, serverless and deployment.',
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
        whatYouLearn: 'Authentication, authorization, encryption concepts, secure coding, network security, Linux and security monitoring.',
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
        whatYouLearn: 'Common web vulnerabilities, authentication/security controls and secure development.',
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
    focus: 'Specialization, system/project skills, internships, deployment, portfolio, interviews and major project.',
    studyPattern: 'Primary channel → topic search → practice → backup channel only if needed.',
    subjects: [
      {
        id: 'final-1',
        title: 'System Design',
        icon: '🏗️',
        category: 'Architecture',
        whatYouLearn: 'Scalable systems, architecture, APIs, databases, caching, queues and distributed-system trade-offs.',
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
        category: 'Distributed Systems',
        whatYouLearn: 'Distributed computing concepts, scalability, reliability and coordination.',
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
        whatYouLearn: 'CI/CD, containers, deployment, monitoring and cloud-native engineering.',
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
        category: 'Advanced AI',
        whatYouLearn: 'Advanced model training, evaluation, deployment and domain-specific AI depending on chosen path.',
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
        whatYouLearn: 'Security testing, web security, networks and defensive practices in authorized environments.',
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
        category: 'Design Patterns',
        whatYouLearn: 'Architecture styles, design patterns, refactoring and maintainable software design.',
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
        category: 'Interview & Placement',
        whatYouLearn: 'DSA, core CS, aptitude, project discussion, communication, resume, GitHub and portfolio.',
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
        whatYouLearn: 'Problem definition → requirements → architecture → UI/database → implementation → testing → deployment → documentation → viva.',
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

export const SPECIALIZATION_TRACKS_DATA = [
  {
    path: 'Full-Stack / Software Development',
    icon: '💻',
    steps: ['HTML / CSS / JS', 'React', 'Node / Express', 'SQL / NoSQL', 'APIs', 'Testing', 'Cloud'],
  },
  {
    path: 'AI / Machine Learning',
    icon: '🤖',
    steps: ['Python', 'NumPy / pandas', 'Statistics', 'Machine Learning', 'Deep Learning', 'Model Deployment'],
  },
  {
    path: 'Cybersecurity & Defense',
    icon: '🛡️',
    steps: ['Networking', 'Linux', 'Security Fundamentals', 'Web Security', 'Labs', 'Defensive Engineering'],
  },
  {
    path: 'Data Science & Analytics',
    icon: '📊',
    steps: ['Python', 'SQL', 'Statistics', 'pandas', 'Visualization', 'Machine Learning', 'Data Projects'],
  },
  {
    path: 'Cloud & DevOps Engineering',
    icon: '☁️',
    steps: ['Linux', 'Networking', 'Git', 'Docker', 'CI/CD', 'Cloud', 'Kubernetes / Observability'],
  },
];

export const FourYearYouTubeGuide = () => {
  const [subView, setSubView] = useState('curriculum'); // 'curriculum' | 'creators' | 'specialization'
  const [curriculumYear, setCurriculumYear] = useState('ALL');
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [channelSearch, setChannelSearch] = useState('');

  const toggleSubject = (id) => {
    setExpandedSubjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all = {};
    Object.values(FOUR_YEAR_SUBJECTS_DATA).forEach((y) => {
      y.subjects.forEach((s) => {
        all[s.id] = true;
      });
    });
    setExpandedSubjects(all);
  };

  const collapseAll = () => setExpandedSubjects({});

  // Filtered Subjects
  const filteredSubjects = useMemo(() => {
    const years = curriculumYear === 'ALL' ? ['FY', 'SY', 'TY', 'FINAL'] : [curriculumYear];
    const result = {};

    years.forEach((yr) => {
      const yearObj = FOUR_YEAR_SUBJECTS_DATA[yr];
      if (!yearObj) return;

      const matched = yearObj.subjects.filter((s) => {
        if (!curriculumSearch.trim()) return true;
        const q = curriculumSearch.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.whatYouLearn.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.channels.some((c) => c.name.toLowerCase().includes(q))
        );
      });

      if (matched.length > 0) {
        result[yr] = { ...yearObj, subjects: matched };
      }
    });

    return result;
  }, [curriculumYear, curriculumSearch]);

  // Filtered Creators
  const filteredCreators = useMemo(() => {
    return TOP_CHANNELS_DATA.filter((ch) => {
      if (!channelSearch.trim()) return true;
      const q = channelSearch.toLowerCase();
      return (
        ch.name.toLowerCase().includes(q) ||
        ch.bestFor.toLowerCase().includes(q) ||
        ch.category.toLowerCase().includes(q) ||
        ch.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [channelSearch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 35%, #6d28d9 75%, #7e22ce 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          boxShadow: '0 20px 40px -15px rgba(109, 40, 217, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.16)',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            <Video size={16} /> CSE 4-YEAR YOUTUBE LEARNING GUIDE
          </span>
          <span style={{ fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 600 }}>
            Subject-wise • Easy Explanation • Multiple YouTube Channels • Clickable Links
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff' }}>
          YouTube Video Directory: FY → SY → TY → Final Year
        </h2>

        <p style={{ fontSize: '0.975rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '820px', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
          Built from the CSE 4-Year Roadmap & International Book Guide. Follow the dual-channel method:
          1 primary easy-explanation channel + 1 backup channel, paired with direct 1-click search links!
        </p>

        {/* Quick Nav Switches */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubView('curriculum')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: subView === 'curriculum' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
              color: subView === 'curriculum' ? '#4c1d95' : '#ffffff',
            }}
          >
            🎓 4-Year Subject Guide ({Object.values(FOUR_YEAR_SUBJECTS_DATA).reduce((acc, y) => acc + y.subjects.length, 0)} Subjects)
          </button>
          <button
            onClick={() => setSubView('creators')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: subView === 'creators' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
              color: subView === 'creators' ? '#4c1d95' : '#ffffff',
            }}
          >
            📺 Top 20 Creators
          </button>
          <button
            onClick={() => setSubView('specialization')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: subView === 'specialization' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
              color: subView === 'specialization' ? '#4c1d95' : '#ffffff',
            }}
          >
            🚀 Specialization Sequences & Study Rules
          </button>
        </div>
      </div>

      {/* How to Use This Guide */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Lightbulb size={18} color="var(--primary-800)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            How to Use This Guide
          </h3>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
          <li><strong>First learn the subject from one easy-explanation channel.</strong></li>
          <li><strong>If a topic is still unclear, use a second channel for a different explanation.</strong></li>
          <li><strong>Use the topic-search link to jump directly to videos on that subject.</strong></li>
          <li><strong>Do not watch every channel completely; choose ONE primary channel + ONE backup channel.</strong></li>
          <li><strong>For coding subjects, always code along with the video and build a small project.</strong></li>
          <li><strong>For core subjects, make short notes and solve questions after each topic.</strong></li>
        </ul>
      </div>

      {/* SUB-VIEW 1: CURRICULUM */}
      {subView === 'curriculum' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
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
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    background: curriculumYear === yr.id ? 'var(--primary-800)' : 'var(--bg-primary)',
                    color: curriculumYear === yr.id ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: curriculumYear === yr.id ? 'var(--primary-800)' : 'var(--border-color)',
                  }}
                >
                  {yr.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flex: '1 1 260px', maxWidth: '420px' }}>
              <Input
                placeholder="Search subject (DSA, OS, React, Calculus)..."
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                icon={Search}
                style={{ width: '100%' }}
              />
              <Button variant="ghost" size="sm" onClick={expandAll}>Expand</Button>
              <Button variant="ghost" size="sm" onClick={collapseAll}>Collapse</Button>
            </div>
          </div>

          {/* Render Years */}
          {Object.entries(filteredSubjects).map(([yKey, yearObj]) => (
            <div
              key={yKey}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '18px',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
              }}
            >
              <div style={{ borderBottom: '2px solid var(--border-color-subtle)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <Badge variant="primary" style={{ background: '#7c3aed', color: '#ffffff' }}>{yearObj.yearLabel}</Badge>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{yearObj.title}</h3>
                </div>
                <p style={{ margin: '0 0 0.35rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <strong>Main focus:</strong> {yearObj.focus}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  <Zap size={13} style={{ display: 'inline', marginRight: '4px' }} /> Suggested study pattern: {yearObj.studyPattern}
                </div>
              </div>

              {/* Subject Accordions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {yearObj.subjects.map((sub, idx) => {
                  const isExpanded = expandedSubjects[sub.id] !== false;
                  return (
                    <div
                      key={sub.id}
                      style={{
                        borderRadius: '12px',
                        border: isExpanded ? '1px solid var(--lavender-300)' : '1px solid var(--border-color)',
                        background: isExpanded ? 'var(--bg-surface)' : 'var(--bg-primary)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        onClick={() => toggleSubject(sub.id)}
                        style={{
                          padding: '0.9rem 1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span>{sub.icon}</span>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {idx + 1}. {sub.title}
                          </strong>
                          <span style={{ fontSize: '0.725rem', background: 'var(--lavender-100)', color: 'var(--lavender-900)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            {sub.category}
                          </span>
                        </div>
                        {isExpanded ? <ChevronUp size={16} color="var(--primary-800)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                      </div>

                      {isExpanded && (
                        <div style={{ padding: '0 1.1rem 1.1rem 1.1rem', borderTop: '1px solid var(--border-color-subtle)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                              What You Learn
                            </div>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {sub.whatYouLearn}
                            </p>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                            <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.4rem' }}>
                                Recommended Channels
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {sub.channels.map((c) => (
                                  <a
                                    key={c.name}
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      fontSize: '0.8rem',
                                      fontWeight: 600,
                                      background: 'var(--lavender-50)',
                                      color: 'var(--primary-800)',
                                      border: '1px solid var(--lavender-200)',
                                      padding: '0.25rem 0.6rem',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                    }}
                                  >
                                    {c.name} <ExternalLink size={10} />
                                  </a>
                                ))}
                              </div>
                            </div>

                            <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b45309', marginBottom: '0.4rem' }}>
                                Direct YouTube Searches
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {sub.searches.map((s) => (
                                  <a
                                    key={s.query}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      fontSize: '0.8rem',
                                      fontWeight: 600,
                                      background: '#fef3c7',
                                      color: '#92400e',
                                      border: '1px solid #fde68a',
                                      padding: '0.25rem 0.6rem',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                    }}
                                  >
                                    🔍 {s.query} <ExternalLink size={10} />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div style={{ background: 'var(--bg-tertiary)', padding: '0.55rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={14} color="var(--primary-800)" />
                            <span><strong>Easy method:</strong> {sub.easyMethod}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 2: TOP 20 CREATORS */}
      {subView === 'creators' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Top Recommended YouTube Channels</h3>
            <div style={{ width: '300px' }}>
              <Input
                placeholder="Filter creators..."
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                icon={Search}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredCreators.map((ch) => (
              <Card key={ch.name} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{ch.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary-800)', fontWeight: 600 }}>{ch.category}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{ch.subscribers}</span>
                </div>

                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong>Best for:</strong> {ch.bestFor}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <a href={ch.searchUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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

      {/* SUB-VIEW 3: SPECIALIZATIONS & STUDY RULES */}
      {subView === 'specialization' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Specialization Sequences */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Choose a Specialization After Core CSE</h3>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Suggested sequential learning orders for top career tracks:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SPECIALIZATION_TRACKS_DATA.map((t) => (
                <div key={t.path} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{t.icon}</span> {t.path}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {t.steps.map((st, i) => (
                      <React.Fragment key={st}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, background: 'var(--bg-secondary)', border: '1px solid var(--lavender-300)', color: 'var(--primary-900)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                          {i + 1}. {st}
                        </span>
                        {i < t.steps.length - 1 && <ArrowRight size={12} color="var(--primary-800)" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Year Study Rules */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>4-Year Study Rules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.9rem' }}>1. FY Rule:</strong>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Focus on programming fundamentals, web basics, mathematics and Git.
                </p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.9rem' }}>2. SY Rule:</strong>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Focus heavily on DSA + OOP + DBMS + OS + CN.
                </p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.9rem' }}>3. TY Rule:</strong>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Choose a specialization and build 2–3 serious projects.
                </p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--primary-800)', fontSize: '0.9rem' }}>4. Final Year Rule:</strong>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Major project + internship/industry skills + deployment + resume + interview preparation.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '1rem', background: 'var(--lavender-50)', border: '1px solid var(--lavender-300)', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--primary-900)' }}>
              <strong>Rule 5 (Essential Practice):</strong> For every subject, use videos as the explanation layer—not as the entire learning process. Active coding and practice is essential.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FourYearYouTubeGuide;
