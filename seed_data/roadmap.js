const roadmapSeedData = [
  // ----------------------------------------------------
  // FIRST YEAR (FY)
  // ----------------------------------------------------
  {
    year: 'FY',
    semester: 1,
    title: 'Semester 1: Computational Thinking & Foundations',
    slug: 'fy-semester-1',
    description: 'Build algorithmic problem solving, structured programming in C, digital logic basics, and foundational mathematics.',
    careerPaths: ['Foundations', 'Software Engineering Core'],
    order: 1,
    subjects: [
      { code: 'CS101', name: 'Programming & Problem Solving in C', credits: 4, isCore: true },
      { code: 'MA101', name: 'Engineering Calculus & Linear Algebra', credits: 4, isCore: true },
      { code: 'EC101', name: 'Digital Logic & Computer Hardware Basics', credits: 3, isCore: true },
    ],
    items: [
      {
        topicName: 'C Programming & Memory Model',
        category: 'DSA',
        description: 'Variables, pointers, stack vs heap, dynamic memory allocation (malloc/free), structs.',
        learnGuide: 'Understand how memory is laid out in RAM, stack frames during recursion, and pointer arithmetic.',
        practiceChecklist: [
          { task: 'Implement dynamic array resizing in C', resourceLink: 'https://w3schools.com/c' },
          { task: 'Master pointer-to-pointer references and memory leaks via Valgrind', resourceLink: 'https://geeksforgeeks.org/c-pointers' },
        ],
        interviewPrepPrompts: [{ question: 'What happens in memory during a segmentation fault?', concept: 'Memory Architecture' }],
      },
      {
        topicName: 'Discrete Mathematics & Logic',
        category: 'CoreCS',
        description: 'Propositional logic, set theory, relations, combinatorics, proof by induction.',
        learnGuide: 'Mathematical bedrock for time complexity analysis, graph theory, and cryptography.',
        practiceChecklist: [{ task: 'Prove algorithm correctness using mathematical induction' }],
      },
    ],
  },
  {
    year: 'FY',
    semester: 2,
    title: 'Semester 2: Data Structures Introduction & Python',
    slug: 'fy-semester-2',
    description: 'Transition from basic syntax to linear data structures, object-oriented concepts, and Python automation.',
    careerPaths: ['Core CS', 'Web & Data Foundations'],
    order: 2,
    subjects: [
      { code: 'CS102', name: 'Data Structures Fundamentals in C/C++', credits: 4, isCore: true },
      { code: 'CS103', name: 'Python Programming & Scripting', credits: 3, isCore: true },
      { code: 'MA102', name: 'Discrete Mathematics & Probability', credits: 4, isCore: true },
    ],
    items: [
      {
        topicName: 'Linear Data Structures (Arrays, Linked Lists, Stacks, Queues)',
        category: 'DSA',
        description: 'Implementation from scratch: Singly & Doubly Linked Lists, Circular Queues, Monotonic Stacks.',
        learnGuide: 'Focus on time vs space complexity, cache locality of arrays vs pointer chasing in linked lists.',
        practiceChecklist: [
          { task: 'Solve Reverse Linked List and Detect Cycle on LeetCode' },
          { task: 'Implement Min-Stack with O(1) retrieval' },
        ],
      },
      {
        topicName: 'Git & GitHub Collaboration',
        category: 'DevOps',
        description: 'Branching strategies, pull requests, resolving merge conflicts, and commit hygiene.',
        learnGuide: 'Industry standard for open-source contributions and production development.',
        practiceChecklist: [{ task: 'Create a GitHub profile repository and commit markdown notes daily' }],
      },
    ],
  },

  // ----------------------------------------------------
  // SECOND YEAR (SY) - CORE CSE
  // ----------------------------------------------------
  {
    year: 'SY',
    semester: 3,
    title: 'Semester 3: Core DSA, OOP & Computer Networks',
    slug: 'sy-semester-3',
    description: 'Master non-linear data structures, object-oriented design in Java/C++, and the TCP/IP networking stack.',
    careerPaths: ['Software Engineer', 'Full-Stack Developer', 'Systems Engineer'],
    order: 3,
    subjects: [
      { code: 'CS201', name: 'Advanced Data Structures & Algorithms', credits: 4, isCore: true },
      { code: 'CS202', name: 'Object-Oriented Programming (Java / C++)', credits: 4, isCore: true },
      { code: 'CS203', name: 'Computer Networks & Protocols', credits: 4, isCore: true },
    ],
    items: [
      {
        topicName: 'Trees, Binary Search Trees & Heaps',
        category: 'DSA',
        description: 'Tree traversals (Inorder, Preorder, Postorder, Level-order), BST validation, Priority Queues.',
        learnGuide: 'Master recursive and iterative DFS/BFS. Understand balanced trees (AVL/Red-Black).',
        practiceChecklist: [
          { task: 'Solve Lowest Common Ancestor (LCA) in Binary Tree' },
          { task: 'Implement Top K Frequent Elements using Min-Heap' },
        ],
        interviewPrepPrompts: [{ question: 'Explain how heapify works in O(N) time complexity.', concept: 'Binary Heap' }],
      },
      {
        topicName: 'Object-Oriented Design & SOLID Principles',
        category: 'CoreCS',
        description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, Factory & Singleton patterns.',
        learnGuide: 'Learn how to write clean, maintainable, extensible code and defend design decisions.',
        practiceChecklist: [{ task: 'Design a Parking Lot system using OOP principles in Java/C++' }],
      },
      {
        topicName: 'Computer Networks & Socket Programming',
        category: 'Networks',
        description: 'OSI 7 Layers, TCP 3-way handshake vs UDP, DNS resolution flow, HTTP/1.1 vs HTTP/2 vs HTTP/3, WebSockets.',
        learnGuide: 'Understand packet headers, sequence numbers, congestion control, and TCP flow control.',
        practiceChecklist: [
          { task: 'Build a multi-client TCP chat server using socket programming in C/Node.js/Python' },
          { task: 'Capture and inspect HTTP/DNS packets using Wireshark' },
        ],
      },
    ],
  },
  {
    year: 'SY',
    semester: 4,
    title: 'Semester 4: Operating Systems, DBMS & Full-Stack Web',
    slug: 'sy-semester-4',
    description: 'Master kernel architectures, concurrency/deadlocks, relational schema design, SQL indexing, and modern web apps.',
    careerPaths: ['Backend Developer', 'Full-Stack Engineer', 'Database Administrator'],
    order: 4,
    subjects: [
      { code: 'CS204', name: 'Operating Systems & Concurrency', credits: 4, isCore: true },
      { code: 'CS205', name: 'Database Management Systems & SQL', credits: 4, isCore: true },
      { code: 'CS206', name: 'Full-Stack Web Development (MERN / Next.js)', credits: 3, isCore: true },
    ],
    items: [
      {
        topicName: 'Operating Systems: Process Scheduling & Concurrency',
        category: 'OS',
        description: 'Process control blocks, fork(), threads, mutexes, semaphores, deadlock detection (Banker algorithm).',
        learnGuide: 'Understand context switching costs, race conditions, and synchronization primitives.',
        practiceChecklist: [
          { task: 'Solve the Producer-Consumer problem using Semaphores and Mutexes' },
          { task: 'Simulate CPU scheduling algorithms (Round Robin, SRTF) in C++' },
        ],
        interviewPrepPrompts: [{ question: 'What is the difference between a process and a thread in memory?', concept: 'Operating Systems' }],
      },
      {
        topicName: 'DBMS: Relational Modeling, Normalization & Indexing',
        category: 'Database',
        description: '1NF, 2NF, 3NF, BCNF, ACID transactions, B-Tree indexes, WAL (Write-Ahead Logging), isolation levels.',
        learnGuide: 'Learn how database storage engines work on disk and how to write optimized queries.',
        practiceChecklist: [
          { task: 'Write complex SQL queries involving JOINs, Window Functions, and subqueries' },
          { task: 'Use EXPLAIN ANALYZE on PostgreSQL/MySQL to optimize slow queries' },
        ],
      },
      {
        topicName: 'Graphs & Dynamic Programming',
        category: 'DSA',
        description: 'Dijkstra, Bellman-Ford, Floyd-Warshall, Topological Sort, 0/1 Knapsack, Longest Common Subsequence.',
        learnGuide: 'Learn state representation, base cases, recurrence relations, and space optimization.',
        practiceChecklist: [
          { task: 'Solve Course Schedule (Cycle detection in Directed Graph)' },
          { task: 'Solve Coin Change and Edit Distance on LeetCode' },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // THIRD YEAR (TY) - ADVANCED & SPECIALIZATION
  // ----------------------------------------------------
  {
    year: 'TY',
    semester: 5,
    title: 'Semester 5: System Design, Cloud & Advanced Specialization',
    slug: 'ty-semester-5',
    description: 'High-level system design, Docker containerization, AWS cloud infrastructure, and chosen domain tracks.',
    careerPaths: ['Full-Stack', 'Cloud / DevOps', 'AI / ML', 'Cybersecurity'],
    order: 5,
    subjects: [
      { code: 'CS301', name: 'Distributed Systems & System Design', credits: 4, isCore: true },
      { code: 'CS302', name: 'Cloud Computing & DevOps Foundations', credits: 3, isCore: true },
      { code: 'CS303', name: 'Domain Elective I (AI/ML / Cybersecurity / Web3)', credits: 3, isCore: false },
    ],
    items: [
      {
        topicName: 'High-Level System Design & Scalability',
        category: 'Systems',
        description: 'Horizontal vs Vertical scaling, Load Balancers, Caching strategies (Redis), CDN, Database Sharding, CAP theorem.',
        learnGuide: 'Design systems that handle 100k+ concurrent requests with high availability and fault tolerance.',
        practiceChecklist: [
          { task: 'Design a URL Shortener (TinyURL) with rate limiting and Redis caching' },
          { task: 'Design a Notification Service with message queues (Kafka / RabbitMQ)' },
        ],
      },
      {
        topicName: 'Docker Containerization & CI/CD Pipelines',
        category: 'DevOps',
        description: 'Multi-stage Dockerfiles, Docker Compose orchestration, automated tests and builds via GitHub Actions.',
        learnGuide: 'Containerize frontend and backend services for reproducible production deployments.',
        practiceChecklist: [{ task: 'Dockerize a multi-service app (React + Node + Postgres + Redis) with docker-compose' }],
      },
    ],
  },
  {
    year: 'TY',
    semester: 6,
    title: 'Semester 6: Placement Preparation, Mock Drives & Internship',
    slug: 'ty-semester-6',
    description: 'Intensive interview problem-solving, company test patterns, resume engineering, and summer internship execution.',
    careerPaths: ['Placement Ready', 'Software Engineer Intern'],
    order: 6,
    subjects: [
      { code: 'CS304', name: 'Algorithms in Industry & Competitive Programming', credits: 3, isCore: true },
      { code: 'CS305', name: 'Software Engineering & Agile Methodologies', credits: 3, isCore: true },
      { code: 'CS306', name: 'Domain Elective II (Deep Learning / Cloud Security)', credits: 3, isCore: false },
    ],
    items: [
      {
        topicName: '14 Core DSA Interview Patterns',
        category: 'DSA',
        description: 'Two Pointers, Sliding Window, Fast/Slow Pointers, Merge Intervals, Top K Elements, Monotonic Queue, Binary Search on Answer.',
        learnGuide: 'Recognize the underlying problem pattern in under 2 minutes during technical screening.',
        practiceChecklist: [
          { task: 'Complete Striver SDE Sheet or NeetCode 150 pattern problem sets' },
          { task: 'Participate in 10 LeetCode / Codeforces weekly timed contests' },
        ],
      },
      {
        topicName: 'ATS Resume Finalization & GitHub Portfolio',
        category: 'Career',
        description: 'Action-verb bullet points, quantified impact metrics, verified project demos, and technical leadership entries.',
        learnGuide: 'Ensure 0% unverified claims, single-page standard format, and ATS keyword matching.',
        practiceChecklist: [{ task: 'Generate an ATS-validated single page resume using the VidyaPath Resume Builder' }],
      },
    ],
  },

  // ----------------------------------------------------
  // FINAL YEAR (FINAL_YEAR) - INDUSTRY & PLACEMENT
  // ----------------------------------------------------
  {
    year: 'FINAL_YEAR',
    semester: 7,
    title: 'Semester 7: Campus Placement Drives & Major Capstone I',
    slug: 'final-year-semester-7',
    description: 'On-campus placement drives (Product & Service companies), technical rounds, HR screening, and capstone engineering.',
    careerPaths: ['Full-Time Software Engineer', 'Product Specialist'],
    order: 7,
    subjects: [
      { code: 'CS401', name: 'Major Capstone Project Phase I', credits: 6, isCore: true },
      { code: 'CS402', name: 'Advanced Distributed Architectures', credits: 3, isCore: false },
    ],
    items: [
      {
        topicName: 'Campus Placement OT (Online Test) Mastery',
        category: 'Placement',
        description: 'Timed aptitude, DSA coding questions, CS fundamentals MCQs, and speed optimization.',
        learnGuide: 'Practice with previous year hiring question banks from Google, Microsoft, Amazon, Cisco, and TCS Digital.',
        practiceChecklist: [{ task: 'Complete 20 mock placement online assessments on the Placement Hub' }],
      },
    ],
  },
  {
    year: 'FINAL_YEAR',
    semester: 8,
    title: 'Semester 8: Capstone Deployment & Industry Transition',
    slug: 'final-year-semester-8',
    description: 'Production capstone deployment, performance profiling, final thesis presentation, and corporate onboarding preparation.',
    careerPaths: ['Associate Software Engineer', 'Cloud Architect'],
    order: 8,
    subjects: [
      { code: 'CS403', name: 'Major Capstone Project Phase II & Defense', credits: 8, isCore: true },
      { code: 'CS404', name: 'Professional Ethics & Tech Entrepreneurship', credits: 2, isCore: true },
    ],
    items: [
      {
        topicName: 'Production Engineering & System Observability',
        category: 'DevOps',
        description: 'Logging, Prometheus/Grafana metrics, error tracking with Sentry, graceful zero-downtime deployments.',
        learnGuide: 'Learn how production systems are maintained and debugged under live traffic.',
        practiceChecklist: [{ task: 'Deploy Capstone Project to production cloud with SSL, monitoring, and automated backups' }],
      },
    ],
  },
];

module.exports = roadmapSeedData;
