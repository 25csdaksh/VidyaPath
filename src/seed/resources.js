const resourcesSeedData = [
  // ----------------------------------------------------
  // NOTES & CHEAT SHEETS
  // ----------------------------------------------------
  {
    title: 'DBMS Comprehensive Quick Revision Notes',
    slug: 'dbms-comprehensive-revision-notes',
    type: 'notes',
    category: 'DBMS',
    difficulty: 'Intermediate',
    url: 'https://w3schools.com/sql',
    description: 'High-yield revision notes covering 1NF-BCNF Normalization, B+ Trees, ACID properties, Transactions, and SQL Query Optimization.',
    tags: ['DBMS', 'SQL', 'Normalization', 'Revision Notes'],
    isFeatured: true,
  },
  {
    title: 'Operating Systems Core Concepts & Cheat Sheet',
    slug: 'os-core-concepts-cheat-sheet',
    type: 'cheat_sheet',
    category: 'OS',
    difficulty: 'Intermediate',
    url: 'https://geeksforgeeks.org/operating-systems',
    description: 'Summary tables of CPU scheduling algorithms, Deadlock Banker algorithm rules, Virtual Memory paging math, and IPC mechanisms.',
    tags: ['OS', 'Cheat Sheet', 'Paging', 'Concurrency'],
    isFeatured: true,
  },
  {
    title: 'Computer Networks Protocol Stack Cheat Sheet',
    slug: 'computer-networks-protocol-cheat-sheet',
    type: 'cheat_sheet',
    category: 'Networks',
    difficulty: 'Beginner',
    url: 'https://w3schools.com',
    description: 'OSI 7 Layers comparison, TCP vs UDP header diagrams, standard port numbers (21, 22, 53, 80, 443, 3306), and CIDR subnet calculation table.',
    tags: ['Networks', 'Cheat Sheet', 'TCP/IP', 'Subnetting'],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // RESUME BUILDING MASTER PLAYBOOK RESOURCES
  // ----------------------------------------------------
  {
    title: 'The Tech Resume Architecture: Standard Single-Page Format',
    slug: 'tech-resume-architecture-standard-format',
    type: 'syllabus_guide',
    category: 'General',
    difficulty: 'Beginner',
    url: 'https://hwpi.harvard.edu/files/ocs/files/hes-resume-cover-letter-guide.pdf',
    description: 'Guidelines on structuring the standard Harvard/Deedy technical resume: Header -> Education -> Skills -> Projects -> Experience -> Leadership. 1-page rule for undergraduates.',
    tags: ['Resume', 'Career', 'ATS Format', 'Harvard Format'],
    isFeatured: true,
  },
  {
    title: 'Crafting High-Impact Action-Verb Project Bullet Points',
    slug: 'crafting-high-impact-project-bullet-points',
    type: 'syllabus_guide',
    category: 'General',
    difficulty: 'Intermediate',
    url: 'https://www.inc.com/bill-murphy-jr/google-recruiters-say-these-5-words-are-the-secret-to-a-successful-resume.html',
    description: 'Using Google’s formula: "Accomplished [X] as measured by [Y] by doing [Z]". Eliminating vague phrases and highlighting quantifiable architectural decisions.',
    tags: ['Resume', 'Action Verbs', 'Impact Metrics', 'Google XYZ Formula'],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // HACKATHON STUDENT COMPLETE PLAYBOOK RESOURCES
  // ----------------------------------------------------
  {
    title: 'The 12-Step Hackathon Problem Statement Analyzer',
    slug: 'hackathon-problem-statement-analyzer',
    type: 'syllabus_guide',
    category: 'General',
    difficulty: 'Intermediate',
    url: 'https://sih.gov.in',
    description: 'Structured framework: Problem Statement -> Target Users -> Current Process -> Pain Points -> Root Cause -> Proposed Solution -> MVP Scope -> Architecture -> Success Metrics -> Risks -> Future Roadmap.',
    tags: ['Hackathon', 'Problem Analysis', 'MVP Planning', 'SIH'],
    isFeatured: true,
  },
  {
    title: 'Hackathon Pitch Deck (PPT) & 3-Minute Demo Playbook',
    slug: 'hackathon-pitch-deck-demo-playbook',
    type: 'syllabus_guide',
    category: 'General',
    difficulty: 'Intermediate',
    url: 'https://devpost.com',
    description: 'How to structure a winning 7-slide pitch deck (Problem, Solution, Architecture, Live Demo, Market Impact, Business Viability, Team) and ace jury Q&A.',
    tags: ['Hackathon', 'Pitching', 'PPT Guide', 'Demo Day'],
    isFeatured: true,
  },
];

module.exports = resourcesSeedData;
