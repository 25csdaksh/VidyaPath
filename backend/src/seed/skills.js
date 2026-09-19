const skillsSeedData = [
  // Programming Languages
  { name: 'C', category: 'Programming Languages', description: 'Procedural programming, pointers, and memory management' },
  { name: 'C++', category: 'Programming Languages', description: 'Object-oriented programming, STL, and low-latency systems' },
  { name: 'Java', category: 'Programming Languages', description: 'Enterprise systems, JVM internals, multithreading, and OOP' },
  { name: 'Python', category: 'Programming Languages', description: 'Scripting, backend development, AI/ML, and data analysis' },
  { name: 'JavaScript', category: 'Programming Languages', description: 'Asynchronous event-driven web programming and runtime engines' },
  { name: 'TypeScript', category: 'Programming Languages', description: 'Strict syntactical superset of JavaScript adding static types' },
  { name: 'Go (Golang)', category: 'Programming Languages', description: 'Concurrent, garbage-collected language for cloud microservices' },
  { name: 'Rust', category: 'Programming Languages', description: 'Memory safety without garbage collection, systems programming' },
  { name: 'SQL', category: 'Programming Languages', description: 'Declarative language for relational database query operations' },

  // Data Structures & Algorithms
  { name: 'Arrays & Strings', category: 'Data Structures & Algorithms', description: 'Linear memory buffers, two-pointers, sliding window' },
  { name: 'Linked Lists', category: 'Data Structures & Algorithms', description: 'Singly, doubly, and circular linked dynamic node chains' },
  { name: 'Stacks & Queues', category: 'Data Structures & Algorithms', description: 'LIFO and FIFO data buffers, monotonic stacks, priority queues' },
  { name: 'Trees & Binary Search Trees', category: 'Data Structures & Algorithms', description: 'Hierarchical node graphs, AVL, Red-Black, Segment trees' },
  { name: 'Graphs', category: 'Data Structures & Algorithms', description: 'Adjacency list/matrix, BFS, DFS, Dijkstra, Bellman-Ford' },
  { name: 'Dynamic Programming', category: 'Data Structures & Algorithms', description: 'Memoization, tabulation, optimal substructure, overlapping subproblems' },
  { name: 'Greedy Algorithms', category: 'Data Structures & Algorithms', description: 'Local optimization strategies, interval scheduling, Huffman coding' },
  { name: 'Bit Manipulation', category: 'Data Structures & Algorithms', description: 'Bitwise operations, XOR tricks, masks, and binary arithmetic' },

  // Core Computer Science
  { name: 'Operating Systems', category: 'Core Computer Science', description: 'Processes, threads, scheduling, virtual memory, paging, concurrency' },
  { name: 'Database Management Systems', category: 'Core Computer Science', description: 'ACID properties, B-Trees, normalization, indexing, transaction isolation' },
  { name: 'Computer Networks', category: 'Core Computer Science', description: 'OSI 7 layers, TCP/IP, DNS, HTTP/3, WebSockets, socket programming' },
  { name: 'Object-Oriented Design', category: 'Core Computer Science', description: 'SOLID principles, design patterns (Factory, Singleton, Strategy)' },
  { name: 'System Design', category: 'Core Computer Science', description: 'Scalability, load balancing, caching, sharding, distributed consensus' },

  // Web Development
  { name: 'React', category: 'Frontend Development', description: 'Declarative component-based UI library with virtual DOM' },
  { name: 'Next.js', category: 'Frontend Development', description: 'React framework for server-side rendering and static site generation' },
  { name: 'Node.js', category: 'Backend Development', description: 'V8-powered asynchronous non-blocking event-driven runtime' },
  { name: 'Express.js', category: 'Backend Development', description: 'Minimalist, fast web framework for Node.js REST APIs' },
  { name: 'PostgreSQL', category: 'Database & Storage', description: 'Open-source relational database with advanced indexing and JSON support' },
  { name: 'MongoDB', category: 'Database & Storage', description: 'Document-oriented NoSQL database with dynamic BSON schemas' },
  { name: 'Redis', category: 'Database & Storage', description: 'In-memory key-value data store used for caching and message queuing' },

  // DevOps & Cloud
  { name: 'Docker', category: 'DevOps & Cloud', description: 'Containerization engine for packaging applications and dependencies' },
  { name: 'Kubernetes', category: 'DevOps & Cloud', description: 'Container orchestration platform for automated scaling and deployment' },
  { name: 'AWS (Amazon Web Services)', category: 'DevOps & Cloud', description: 'EC2, S3, RDS, Lambda, VPC, IAM, and cloud architecture' },
  { name: 'CI/CD Pipelines', category: 'DevOps & Cloud', description: 'Automated testing, build, and deployment via GitHub Actions' },
  { name: 'Linux System Administration', category: 'DevOps & Cloud', description: 'Bash scripting, process management, permissions, and networking' },

  // AI & Machine Learning
  { name: 'PyTorch', category: 'AI / Machine Learning', description: 'Tensors and dynamic neural networks with GPU acceleration' },
  { name: 'Large Language Models (LLMs)', category: 'AI / Machine Learning', description: 'Transformers, embeddings, prompt engineering, and fine-tuning' },
  { name: 'Vector Databases', category: 'AI / Machine Learning', description: 'Pinecone, Chroma, Milvus for semantic similarity search' },

  // Cybersecurity
  { name: 'Network Security', category: 'Cybersecurity', description: 'Firewalls, VPNs, packet analysis with Wireshark, port scanning' },
  { name: 'OWASP Top 10', category: 'Cybersecurity', description: 'Web vulnerability mitigation: SQLi, XSS, CSRF, IDOR, SSRF' },
  { name: 'Cryptography', category: 'Cybersecurity', description: 'Symmetric/asymmetric encryption, hashing, RSA, AES, digital signatures' },
];

module.exports = skillsSeedData;
