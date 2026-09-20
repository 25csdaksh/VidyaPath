// ========================================================
// CSE PLACEMENT HUB — INTERVIEW MASTER GUIDE DATA
// Questions • Answers • Projects • Communication • Etiquette • 12-Week Plan
// ========================================================

export const EVALUATION_AREAS = [
  { title: 'Programming & Problem Solving', desc: 'Translating logical thoughts into clean, correct, and bug-free code.' },
  { title: 'Data Structures & Algorithms (DSA)', desc: 'Time/space complexity analysis and choosing optimal data structures.' },
  { title: 'OOP & Language Fundamentals', desc: 'Classes, encapsulation, inheritance, polymorphism, and memory model.' },
  { title: 'DBMS + SQL', desc: 'Relational design, normalization, complex joins, indexing, and ACID transactions.' },
  { title: 'Operating Systems (OS)', desc: 'Processes vs threads, concurrency, deadlocks, virtual memory, and scheduling.' },
  { title: 'Computer Networks (CN)', desc: 'TCP/IP vs UDP, DNS lookup, HTTP/HTTPS, TLS handshake, and API design.' },
  { title: 'Projects & Engineering Depth', desc: 'Architecture, schema decisions, failure handling, and personal contributions.' },
  { title: 'Role-Specific Specialization', desc: 'Web, Full-Stack, AI/ML, Cybersecurity, Cloud/DevOps, or Data Science.' },
  { title: 'Communication & Reasoning', desc: 'Structured think-aloud problem solving and justifying technical trade-offs.' },
  { title: 'Debugging & Learning Ability', desc: 'Handling edge cases, locating runtime bugs, and adapting to hints.' },
  { title: 'Resume Accuracy & Ownership', desc: 'Verifiable claims, deep understanding of listed tools, and honest metrics.' },
];

export const PLACEMENT_PYRAMID = [
  { step: '1', title: 'FOUNDATION', desc: 'Programming syntax, Git/GitHub, basic terminal, and problem breakdown.' },
  { step: '2', title: 'CORE CS', desc: 'OOP design, DBMS & SQL, Operating Systems, and Computer Networks.' },
  { step: '3', title: 'DSA', desc: 'Arrays, Strings, LinkedLists, Stacks, Queues, Trees, Graphs, and DP.' },
  { step: '4', title: 'PROJECTS', desc: '1-2 practical production systems with APIs, database schemas, and clean UI.' },
  { step: '5', title: 'SPECIALIZATION', desc: 'Targeted domain skills (Web, AI/ML, Cloud, Security, or Data).' },
  { step: '6', title: 'RESUME', desc: 'ATS-optimized 1-page resume with measurable XYZ bullet points and links.' },
  { step: '7', title: 'MOCK INTERVIEWS', desc: 'Live timed coding dry-runs, technical deep dives, and STAR behavioral answers.' },
  { step: '8', title: 'COMPANY PREP', desc: 'Company-specific past question patterns, culture values, and targeted research.' },
];

export const TECHNICAL_QA_CATEGORIES = [
  { id: 'all', name: 'All Questions', count: 68 },
  { id: 'dsa', name: 'DSA & Algorithms', count: 10 },
  { id: 'oop', name: 'OOP Fundamentals', count: 6 },
  { id: 'dbms', name: 'DBMS & SQL', count: 7 },
  { id: 'os', name: 'Operating Systems', count: 5 },
  { id: 'cn', name: 'Computer Networks', count: 6 },
  { id: 'languages', name: 'Programming Languages', count: 5 },
  { id: 'web', name: 'Web & Full-Stack', count: 6 },
  { id: 'ai-ml', name: 'AI / Machine Learning', count: 6 },
  { id: 'security', name: 'Cybersecurity', count: 6 },
  { id: 'cloud', name: 'Cloud & DevOps', count: 5 },
  { id: 'projects', name: 'Project Defense', count: 8 },
  { id: 'hr', name: 'HR & Behavioral', count: 7 },
];

export const ALL_INTERVIEW_QA = [
  // ==========================================
  // 3. DSA INTERVIEW QUESTIONS (10 Q&As)
  // ==========================================
  {
    id: 'dsa-1',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is the difference between an array and a linked list?',
    answer: 'Arrays store elements in contiguous memory in typical implementations and support O(1) indexed access. Linked lists use nodes connected by references; access is O(n), while insertion/deletion can be O(1) when the node/position reference is already known.',
    keyPoints: ['Array: Contiguous memory, O(1) random access, fixed size in static arrays', 'Linked List: Non-contiguous pointer nodes, O(n) access, O(1) dynamic insert/delete if position is known', 'Cache locality: Arrays have superior CPU cache performance due to spatial locality'],
  },
  {
    id: 'dsa-2',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is time complexity and how is it measured?',
    answer: 'Time complexity describes how the running time of an algorithm grows asymptotically with the input size n. Example: Linear search is O(n), binary search on sorted data is O(log n), and nested comparisons typically yield O(n²).',
    keyPoints: ['Big-O (O): Upper bound / worst-case growth rate', 'Omega (Ω): Lower bound / best-case', 'Theta (Θ): Tight bound when upper and lower asymptotic bounds match'],
  },
  {
    id: 'dsa-3',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is a stack and what are its common practical applications?',
    answer: 'A stack is a Last-In, First-Out (LIFO) data structure where insertions and deletions happen at the same end (top). Common uses include function-call execution stacks, undo/redo operations in text editors, matching parentheses, and expression evaluation.',
    keyPoints: ['LIFO order: push O(1), pop O(1), peek O(1)', 'Applications: Recursion call stack, Monotonic Stack, Backtracking, DFS graph traversal'],
  },
  {
    id: 'dsa-4',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is a queue and where is it commonly used?',
    answer: 'A queue is a First-In, First-Out (FIFO) data structure where elements are inserted at the rear (enqueue) and removed from the front (dequeue). Common uses include OS CPU task scheduling, print spooling, network packet buffering, and Breadth-First Search (BFS).',
    keyPoints: ['FIFO order: enqueue O(1), dequeue O(1)', 'Variants: Circular Queue, Double-ended Queue (Deque), Priority Queue (Heap)'],
  },
  {
    id: 'dsa-5',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is a hash table and how are collisions handled?',
    answer: 'A hash table is a key-value data structure that uses a hash function to map keys to bucket indices. Average lookup, insertion, and deletion are O(1). Collisions are handled using Separate Chaining (linked lists or red-black trees in buckets) or Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).',
    keyPoints: ['Average time: O(1), Worst-case time: O(n) if all keys hash to the same bucket', 'Load Factor (α = n/k): Triggers dynamic table resizing when exceeded (e.g. 0.75 in Java HashMap)'],
  },
  {
    id: 'dsa-6',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is the difference between BFS and DFS?',
    answer: 'BFS (Breadth-First Search) explores nodes level by level and commonly uses a queue; DFS (Depth-First Search) explores as deep as possible along each branch before backtracking and uses recursion or a stack. BFS is optimal for finding the shortest path in unweighted graphs.',
    keyPoints: ['BFS: Queue-based, level-order, shortest path in unweighted graphs, space O(V)', 'DFS: Stack/recursion-based, topological sort, cycle detection, connected components, space O(height)'],
  },
  {
    id: 'dsa-7',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is recursion and what are its essential components?',
    answer: 'Recursion is a programming technique where a function calls itself on a smaller subproblem until it reaches a terminating base case. Without a well-defined base case, recursion leads to a stack overflow error. Useful for tree traversals, divide-and-conquer, and backtracking.',
    keyPoints: ['Must have: 1. Base case (stopping condition), 2. Recursive step moving toward the base case', 'Consumes memory on the call stack proportional to recursion depth (O(depth) auxiliary space)'],
  },
  {
    id: 'dsa-8',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is binary search and what is its prerequisite?',
    answer: 'Binary search is an efficient search algorithm that works on a sorted array or monotonic search space. It repeatedly compares the target with the middle element, halving the search space each step. Time complexity is O(log n), space is O(1) iterative.',
    keyPoints: ['Prerequisite: Data must be sorted or function must be monotonic', 'Calculation: mid = left + (right - left) / 2 to avoid integer overflow'],
  },
  {
    id: 'dsa-9',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'What is dynamic programming (DP) and when should it be applied?',
    answer: 'Dynamic Programming is an algorithmic optimization technique that solves complex problems by breaking them into overlapping subproblems and storing subproblem results to avoid redundant calculations. It requires two properties: Overlapping Subproblems and Optimal Substructure.',
    keyPoints: ['Memoization (Top-Down): Recursive with a cache table', 'Tabulation (Bottom-Up): Iterative building from smallest base states up', 'Eliminates exponential O(2ⁿ) complexity down to polynomial O(n) or O(n²)'],
  },
  {
    id: 'dsa-10',
    category: 'dsa',
    categoryLabel: 'DSA & Algorithms',
    question: 'How do you systematically approach a live coding problem in an interview?',
    answer: 'Follow the 10-step structured framework: Clarify requirements → Ask about constraints & edge cases → Propose brute force → Analyze complexity → Optimize with data structure → Write clean code → Dry-run with an example → Test edge cases → Summarize time/space complexity.',
    keyPoints: ['Always think aloud so the interviewer hears your thought process', 'Never jump straight to writing code before aligning on the algorithm and constraints'],
  },

  // ==========================================
  // 4. OOP INTERVIEW QUESTIONS (6 Q&As)
  // ==========================================
  {
    id: 'oop-1',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'What are the four pillars of Object-Oriented Programming (OOP)?',
    answer: 'The four pillars are Encapsulation (bundling data and methods with access control), Abstraction (hiding implementation details and showing only essential features), Inheritance (deriving new classes from existing ones), and Polymorphism (ability of an entity to take many forms).',
    keyPoints: ['Encapsulation: Data hiding via private/protected fields & getters/setters', 'Abstraction: Abstract classes & interfaces', 'Inheritance: Code reuse via "is-a" relationship', 'Polymorphism: Compile-time (overloading) & Runtime (overriding)'],
  },
  {
    id: 'oop-2',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'What is the difference between encapsulation and abstraction?',
    answer: 'Encapsulation is about information hiding and bundling state with behavior to control access (e.g. private variables accessed via public methods). Abstraction is about hiding complexity by exposing an essential contract or interface without revealing the internal implementation details.',
    keyPoints: ['Encapsulation = "How to contain and protect internal data"', 'Abstraction = "What operations can be performed without knowing internal implementation"'],
  },
  {
    id: 'oop-3',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'When should inheritance be used in software design?',
    answer: 'Inheritance should be used when there is a genuine, strict "is-a" relationship between the subclass and parent class (e.g. Dog is an Animal), and polymorphic substitution (Liskov Substitution Principle) holds true. If the relationship is "has-a", composition should be preferred.',
    keyPoints: ['Follow Liskov Substitution Principle (LSP): Subclass must be substitutable for base class', 'Prefer Composition over Inheritance when reusing functionality without a true hierarchical relationship'],
  },
  {
    id: 'oop-4',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'What is the difference between method overloading and method overriding?',
    answer: 'Method overloading occurs within the same class when multiple methods share the same name but have different parameter lists (compile-time/static polymorphism). Method overriding occurs when a subclass provides a specific implementation of a method declared in its parent class with the exact same signature (runtime/dynamic polymorphism).',
    keyPoints: ['Overloading: Same name, different parameters, compile-time resolution', 'Overriding: Same name, same parameters, subclass implementation, runtime resolution via vtable / dynamic dispatch'],
  },
  {
    id: 'oop-5',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'What is the difference between an interface and an abstract class?',
    answer: 'An interface defines a contract specifying what a class must do without defining how (pure abstraction, supports multiple inheritance of type in Java/C#). An abstract class can have both abstract methods and concrete method implementations with internal state/constructors (cannot be instantiated directly).',
    keyPoints: ['Interface: Contract definition, multiple interfaces can be implemented', 'Abstract Class: Partial implementation, shared state/fields, single inheritance hierarchy'],
  },
  {
    id: 'oop-6',
    category: 'oop',
    categoryLabel: 'OOP Fundamentals',
    question: 'Why is composition often preferred over inheritance in modern engineering?',
    answer: 'Composition builds complex objects by combining simpler objects ("has-a" relationship) rather than inheriting from base classes ("is-a"). It prevents fragile base-class problems, reduces tight coupling, allows behavior to be swapped dynamically at runtime, and makes testing easier.',
    keyPoints: ['Reduces tight coupling between parent and child classes', 'Allows runtime behavior change via Dependency Injection / Strategy pattern', 'Avoids deep, unmaintainable inheritance hierarchies'],
  },

  // ==========================================
  // 5. DBMS + SQL INTERVIEW QUESTIONS (7 Q&As)
  // ==========================================
  {
    id: 'dbms-1',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is database normalization and why is it used?',
    answer: 'Normalization is the process of structuring relational database tables to minimize data redundancy and prevent update, insertion, and deletion anomalies. Common normal forms include 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), and BCNF.',
    keyPoints: ['1NF: Eliminate duplicate columns & ensure atomic values', '2NF: 1NF + all non-key attributes fully functionally dependent on primary key', '3NF: 2NF + eliminate transitive functional dependencies', 'Trade-off: Denormalization is sometimes used in analytics for faster read query performance'],
  },
  {
    id: 'dbms-2',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is the difference between a primary key and a foreign key?',
    answer: 'A primary key is a column or set of columns that uniquely identifies each row in a table (must be unique and cannot contain NULL). A foreign key is a column that refers to the primary key of another table, establishing a referential integrity relationship between the two tables.',
    keyPoints: ['Primary Key: Unique identifier, creates a clustered index by default, NOT NULL', 'Foreign Key: References parent primary key, enforces referential integrity, can accept NULL values'],
  },
  {
    id: 'dbms-3',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is a database index and what are its trade-offs?',
    answer: 'An index is a data structure (commonly B+ Tree or Hash) that speeds up data retrieval operations on specific table columns without scanning every row. Trade-off: While it drastically accelerates SELECT queries, it consumes disk storage and adds write overhead to INSERT, UPDATE, and DELETE operations.',
    keyPoints: ['B+ Tree Index: Balanced search tree, excellent for range queries (BETWEEN, <, >) and sorting', 'Clustered Index: Determines physical order of data on disk (only one per table)', 'Non-Clustered Index: Separate structure containing pointers back to data rows'],
  },
  {
    id: 'dbms-4',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is the difference between an INNER JOIN and a LEFT JOIN?',
    answer: 'An INNER JOIN returns only records that have matching values in both tables. A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table and matched records from the right table; if no match exists, NULL values are returned for right-side columns.',
    keyPoints: ['INNER JOIN: Intersection of matching rows', 'LEFT JOIN: All left table rows + matched right table rows (NULL if no match)', 'RIGHT JOIN: All right table rows + matched left table rows', 'FULL OUTER JOIN: Union of all rows from both tables'],
  },
  {
    id: 'dbms-5',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is the difference between WHERE and HAVING in SQL?',
    answer: 'WHERE is used to filter individual rows before any aggregations or groupings take place. HAVING is used to filter grouped data after the GROUP BY clause and aggregate functions (COUNT, SUM, AVG) have been calculated.',
    keyPoints: ['WHERE: Row-level filter, applied before GROUP BY, cannot use aggregate functions', 'HAVING: Group-level filter, applied after GROUP BY, works directly with aggregate functions'],
  },
  {
    id: 'dbms-6',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'What is a database transaction and what are the ACID properties?',
    answer: 'A transaction is a single logical unit of work that contains one or more SQL operations. ACID properties guarantee database reliability: Atomicity (all or nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions do not interfere), and Durability (committed changes persist even after crashes).',
    keyPoints: ['Atomicity: Rollback on any failure', 'Consistency: Preserves foreign keys, constraints, and valid state', 'Isolation: Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)', 'Durability: Write-Ahead Logging (WAL) ensures persistence to disk'],
  },
  {
    id: 'dbms-7',
    category: 'dbms',
    categoryLabel: 'DBMS & SQL',
    question: 'How would you systematically diagnose and optimize a slow SQL query in production?',
    answer: '1. Inspect the execution plan using EXPLAIN ANALYZE to identify sequential scans and high-cost joins. 2. Verify that appropriate indexes exist on filtered/joined columns. 3. Avoid SELECT *; fetch only required columns. 4. Check for N+1 query patterns or non-sargable functions in WHERE clauses (e.g. WHERE YEAR(date)=2024). 5. Measure query latency before and after index optimization.',
    keyPoints: ['Use EXPLAIN / EXPLAIN ANALYZE to inspect query plan & index usage', 'Avoid wildcards on leading characters (LIKE %abc fails index)', 'Add composite indexes for frequent multi-column WHERE and ORDER BY filters'],
  },

  // ==========================================
  // 6. OPERATING SYSTEMS INTERVIEW QUESTIONS (5 Q&As)
  // ==========================================
  {
    id: 'os-1',
    category: 'os',
    categoryLabel: 'Operating Systems',
    question: 'What is the difference between a process and a thread?',
    answer: 'A process is an executing program with its own independent memory address space, file descriptors, and security context. A thread is the smallest unit of CPU execution within a process; multiple threads within the same process share the process\'s heap memory, code, and data segment, but have their own registers and stack.',
    keyPoints: ['Process: Heavyweight, isolated memory space, inter-process communication (IPC) required', 'Thread: Lightweight, shared memory space within process, fast context switching, synchronization required'],
  },
  {
    id: 'os-2',
    category: 'os',
    categoryLabel: 'Operating Systems',
    question: 'What is a context switch and what overhead does it introduce?',
    answer: 'A context switch is the process where the OS saves the execution state (CPU registers, program counter, stack pointer) of a currently running process or thread and loads the saved state of another task so it can execute. Overhead: CPU cycles spent saving state, cache misses (TLB invalidation in process switches), and scheduler computations.',
    keyPoints: ['Saves PCB/TCB registers, program counter, and memory pointers', 'Process context switch invalidates TLB cache; thread context switch within same process avoids TLB flush'],
  },
  {
    id: 'os-3',
    category: 'os',
    categoryLabel: 'Operating Systems',
    question: 'What is a deadlock and what are the four Coffman conditions required for it to occur?',
    answer: 'Deadlock is a state where two or more processes are permanently blocked because each holds a resource that the other needs. The four necessary Coffman conditions are: 1. Mutual Exclusion (non-shareable resources), 2. Hold and Wait (holding a resource while requesting another), 3. No Preemption (resources cannot be forcibly taken), 4. Circular Wait (circular chain of processes waiting on each other).',
    keyPoints: ['Prevention: Break any one of the 4 Coffman conditions (e.g. acquire resources in strict global order to prevent circular wait)', 'Avoidance: Banker\'s Algorithm for safe state allocation'],
  },
  {
    id: 'os-4',
    category: 'os',
    categoryLabel: 'Operating Systems',
    question: 'What is virtual memory and how does paging work?',
    answer: 'Virtual memory is a memory management technique that provides each process with the illusion of a large, contiguous address space while physical memory (RAM) is divided into fixed-size chunks called page frames. Virtual address pages are mapped to physical frames via page tables; if a requested page is not in RAM, a page fault occurs and the OS fetches it from disk.',
    keyPoints: ['Paging: Divides virtual address into Page Number + Offset', 'Translation Lookaside Buffer (TLB): High-speed hardware cache for page table entries', 'Page Fault: Triggered when virtual page is not currently resident in physical RAM'],
  },
  {
    id: 'os-5',
    category: 'os',
    categoryLabel: 'Operating Systems',
    question: 'What is CPU scheduling and what are common scheduling algorithms?',
    answer: 'CPU scheduling is the OS mechanism that decides which process in the ready queue gets CPU core execution time. Common algorithms include First-Come-First-Served (FCFS), Shortest Job First (SJF), Round Robin (time quantum-based for time-sharing), and Multi-Level Feedback Queue (MLFQ).',
    keyPoints: ['Preemptive vs Non-Preemptive scheduling', 'Round Robin: Time-slice quantum prevents starvation in interactive multi-user systems'],
  },

  // ==========================================
  // 7. COMPUTER NETWORKS INTERVIEW QUESTIONS (6 Q&As)
  // ==========================================
  {
    id: 'cn-1',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What happens under the hood when you enter a URL into a browser and hit Enter?',
    answer: '1. Browser checks cache (browser, OS, router). 2. DNS resolution converts domain to IP. 3. TCP 3-way handshake (SYN, SYN-ACK, ACK) establishes connection on port 80/443. 4. TLS handshake negotiates encryption for HTTPS. 5. Browser sends HTTP GET request. 6. Server processes request, queries DB, and returns HTTP response (HTML/JSON). 7. Browser parses HTML, fetches CSS/JS, builds DOM/CSSOM, and renders page.',
    keyPoints: ['DNS Lookup -> TCP Handshake -> TLS Handshake -> HTTP Request/Response -> DOM Tree Render'],
  },
  {
    id: 'cn-2',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What is the difference between TCP and UDP?',
    answer: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, and guarantees ordered delivery with error checking, retransmissions, and flow/congestion control. UDP (User Datagram Protocol) is connectionless, lightweight, and transmits packets without delivery confirmation or reordering, making it ideal for low-latency streaming and gaming.',
    keyPoints: ['TCP: 3-way handshake, reliable, retransmission, ordered, flow control (HTTP, FTP, SSH)', 'UDP: Connectionless, lower latency, packet loss possible, no handshake (DNS, VoIP, Live Video)'],
  },
  {
    id: 'cn-3',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What is DNS and how does resolution work recursively?',
    answer: 'DNS (Domain Name System) is a hierarchical distributed naming system that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.190.46). Recursive lookup checks Local DNS Resolver -> Root Server (.) -> TLD Server (.com) -> Authoritative Nameserver.',
    keyPoints: ['DNS Records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verification)', 'DNS Caching occurs at browser, OS resolver, router, and ISP resolver to minimize lookup latency'],
  },
  {
    id: 'cn-4',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What is the difference between HTTP and HTTPS?',
    answer: 'HTTP (Hypertext Transfer Protocol) transmits plain-text data over TCP port 80 without encryption. HTTPS (HTTP Secure) transmits data over TLS/SSL encryption on port 443, ensuring confidentiality (eavesdropping protection), data integrity (tamper protection), and server authentication via digital certificates.',
    keyPoints: ['HTTP: Port 80, plain text, vulnerable to Man-in-the-Middle (MITM) inspection', 'HTTPS: Port 443, TLS encrypted session, authenticated with X.509 SSL certificates'],
  },
  {
    id: 'cn-5',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What is an IP address and what is the difference between IPv4 and IPv6?',
    answer: 'An IP address is a logical network layer identifier assigned to devices on a TCP/IP network for packet routing. IPv4 uses 32-bit addresses formatted as 4 octets (giving ~4.3 billion addresses). IPv6 uses 128-bit hexadecimal addresses to provide a virtually limitless address pool (3.4 × 10³⁸ addresses) and eliminate NAT complexity.',
    keyPoints: ['IPv4: 32-bit (e.g. 192.168.1.1), address exhaustion mitigated by NAT and private subnets', 'IPv6: 128-bit (e.g. 2001:0db8:85a3::8a2e:0370:7334), built-in IPSec support'],
  },
  {
    id: 'cn-6',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    question: 'What is a REST API and what are its core architectural constraints?',
    answer: 'A REST (Representational State Transfer) API is a standardized architectural style for web services. Core constraints include: Statelessness (each request contains all necessary context), Client-Server separation, Uniform Interface (using standard HTTP verbs: GET, POST, PUT, DELETE, PATCH with JSON resources), and Cacheability.',
    keyPoints: ['HTTP Verbs: GET (Read), POST (Create), PUT/PATCH (Update), DELETE (Remove)', 'Status Codes: 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error)', 'Stateless: Server stores no client session context between requests'],
  },

  // ==========================================
  // 8. PROGRAMMING LANGUAGES CHEAT SHEETS (5 Q&As)
  // ==========================================
  {
    id: 'lang-1',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    question: 'C / C++: What are the core topics to prepare for technical interviews?',
    answer: 'Master pointers vs references, dynamic memory management (malloc/free vs new/delete), stack vs heap memory layout, Standard Template Library (STL vectors, maps, unordered_maps, sets, priority_queues), RAII (Resource Acquisition Is Initialization), smart pointers (unique_ptr, shared_ptr), copy constructors, and vtable virtual function mechanics.',
    keyPoints: ['Pointers & pointer arithmetic, dangling pointers & memory leaks', 'STL Containers & iterator invalidation rules', 'Virtual destructor necessity in polymorphic base classes'],
  },
  {
    id: 'lang-2',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    question: 'Java: What are the high-frequency interview topics to master?',
    answer: 'Master JVM memory architecture (Heap, Stack, Metaspace), Garbage Collection mechanisms (Generational GC: Young/Old generation), Java Collections Framework (ArrayList vs LinkedList, HashMap collision handling with red-black trees, ConcurrentHashMap), String immutability and String Pool, Exception handling hierarchy (Checked vs Unchecked), and Spring Boot fundamentals.',
    keyPoints: ['HashMap: buckets array + LinkedList transitioning to Red-Black Tree at threshold 8', 'String is immutable to ensure security, thread safety, and string pool caching', 'Checked (compile-time) vs Unchecked (RuntimeException) exceptions'],
  },
  {
    id: 'lang-3',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    question: 'Python: What are the essential concepts tested in software interviews?',
    answer: 'Master built-in data structure complexities (lists, dicts, sets, tuples), list comprehensions, args and kwargs, mutability vs immutability, decorators, generators and iterators (yield keyword), Global Interpreter Lock (GIL) implications for multithreading vs multiprocessing, and virtual environments.',
    keyPoints: ['GIL: Python interpreter executes only one thread of bytecode at a time per process', 'Generators: Lazy evaluation with yield to stream large datasets without memory blowup', 'Decorators: Higher-order functions wrapping functions to extend behavior'],
  },
  {
    id: 'lang-4',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    question: 'JavaScript / TypeScript: What are the core runtime and type concepts tested?',
    answer: 'Master variable scoping (var, let, const), closures, the JavaScript Event Loop (Call Stack, Microtask Queue for Promises, Macrotask Queue for setTimeout), Promises and async/await error handling, prototypical inheritance, DOM event bubbling/capturing, and TypeScript static type interfaces, generics, and union types.',
    keyPoints: ['Event Loop: Microtasks (Promise.then) execute before next Macrotask (setTimeout/setInterval)', 'Closures: Inner functions retaining access to outer lexical scope variables after execution', 'TypeScript interfaces vs types and generics for type-safe reusable APIs'],
  },
  {
    id: 'lang-5',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    question: 'SQL: What query writing patterns are essential for technical screening?',
    answer: 'Master complex multi-table INNER and LEFT JOINs, GROUP BY with aggregate functions and HAVING clauses, subqueries (correlated vs non-correlated), window functions (ROW_NUMBER(), RANK(), DENSE_RANK(), OVER (PARTITION BY ...)), date/time manipulation, and indexing strategies.',
    keyPoints: ['Window Functions: ROW_NUMBER() vs RANK() vs DENSE_RANK() for top-N ranking queries', 'Correlated subqueries evaluate once per outer query row; joins are usually more optimal'],
  },

  // ==========================================
  // 9. WEB / FULL-STACK INTERVIEW QUESTIONS (6 Q&As)
  // ==========================================
  {
    id: 'web-1',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'What is the difference between frontend and backend architectures?',
    answer: 'Frontend handles client-side user experience, component layout, form interactions, and rendering state in the browser (HTML, CSS, JS, React). Backend handles business logic execution, data access layers, authentication, security validation, background asynchronous workers, and database transactions on the server.',
    keyPoints: ['Frontend: Client rendering, responsive UI, client routing, state management', 'Backend: API endpoints, business logic, authorization, database queries, caching, queues'],
  },
  {
    id: 'web-2',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'How does JSON Web Token (JWT) authentication work and what are its security trade-offs?',
    answer: 'A JWT is a compact, URL-safe token containing three parts: Header, Payload (claims), and Signature. The server issues a signed JWT upon successful user login; the client sends it in the Authorization: Bearer <token> header on subsequent requests. Trade-off: Stateless verification eliminates database lookup overhead, but immediate token revocation is difficult before expiration without a Redis token blacklist.',
    keyPoints: ['Structure: header.payload.signature (HMAC-SHA256 or RSA)', 'Security: Store in httpOnly, secure, sameSite cookies to protect against XSS token theft', 'Revocation: Short-lived access tokens (15 mins) paired with rotating refresh tokens'],
  },
  {
    id: 'web-3',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'What is Cross-Origin Resource Sharing (CORS) and why does the browser enforce it?',
    answer: 'CORS is a browser security mechanism that restricts web applications running on one domain (origin) from making HTTP requests to a different domain, preventing malicious sites from stealing authenticated data. The server specifies allowed origins, HTTP methods, and headers via Access-Control-Allow-Origin response headers.',
    keyPoints: ['Same-Origin Policy: Matches protocol, domain, and port', 'Preflight Request: Browser sends OPTIONS preflight request before complex requests (POST with JSON)'],
  },
  {
    id: 'web-4',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'What is caching and what are the two hardest problems in caching?',
    answer: 'Caching is storing copies of data in high-speed storage (e.g. Redis, browser cache, CDN) so future requests serve results in sub-millisecond latency without hitting the primary database. The two classic hard problems are Cache Invalidation (knowing when cached data is stale) and Cache Consistency (keeping cache and DB synchronized under concurrent writes).',
    keyPoints: ['Patterns: Cache-Aside (Lazy Loading), Write-Through, Write-Behind', 'Eviction Policies: LRU (Least Recently Used), LFU, TTL (Time-to-Live) expiration'],
  },
  {
    id: 'web-5',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'How would you systematically secure a modern full-stack web application?',
    answer: '1. Enforce HTTPS with TLS 1.3. 2. Validate and sanitize all user inputs on the backend (Zod/Joi). 3. Use parameterized SQL queries / ORM to prevent SQL Injection. 4. Store password hashes using Argon2 or bcrypt with salt. 5. Protect against XSS using framework auto-escaping and Content Security Policy (CSP). 6. Prevent CSRF using SameSite cookies. 7. Enforce token-bucket rate limiting to prevent brute-force attacks.',
    keyPoints: ['Never trust client input; validate on server', 'Use parameterized queries', 'Implement rate limiting & secure cookie flags'],
  },
  {
    id: 'web-6',
    category: 'web',
    categoryLabel: 'Web & Full-Stack',
    question: 'What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?',
    answer: 'In CSR (traditional React SPA), the server sends a bare HTML shell and bundle JS; the browser downloads JS, executes it, and renders the DOM. In SSR (Next.js), the server generates full HTML with pre-populated data on each request before sending to client, delivering superior SEO, faster First Contentful Paint (FCP), and social media link previews.',
    keyPoints: ['CSR: Faster subsequent page transitions, higher initial load time, poor SEO out-of-the-box', 'SSR: Fast First Contentful Paint, full SEO indexing, higher server compute overhead'],
  },

  // ==========================================
  // 10. AI / ML INTERVIEW QUESTIONS (6 Q&As)
  // ==========================================
  {
    id: 'aiml-1',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'What is the fundamental difference between Artificial Intelligence and Machine Learning?',
    answer: 'Artificial Intelligence is the broad discipline of engineering systems capable of performing tasks that typically require human intelligence. Machine Learning is a specific subfield of AI where computer algorithms learn statistical patterns directly from data to make predictions rather than being explicitly rule-programmed.',
    keyPoints: ['AI = Broad field (Expert systems, Robotics, Search algorithms, ML)', 'ML = Data-driven learning algorithms (Supervised, Unsupervised, Reinforcement Learning)'],
  },
  {
    id: 'aiml-2',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'What is the difference between supervised and unsupervised learning?',
    answer: 'Supervised learning trains models on labeled datasets where each training example has known input features and target ground-truth labels (e.g. classification, regression). Unsupervised learning finds intrinsic hidden patterns, clusters, or dimensionality representations in unlabeled data (e.g. K-Means clustering, PCA).',
    keyPoints: ['Supervised: Labeled targets (Linear Regression, Random Forest, Neural Networks)', 'Unsupervised: No target labels (K-Means, DBSCAN, PCA, Autoencoders)'],
  },
  {
    id: 'aiml-3',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'What is overfitting and how do you detect and mitigate it?',
    answer: 'Overfitting occurs when a model learns noise and specific training sample details rather than the underlying general distribution, resulting in near-perfect training accuracy but poor validation performance. Mitigation: 1. Collect more training data. 2. Apply regularization (L1/L2, Dropout). 3. Simplify model architecture. 4. Use K-Fold Cross-Validation. 5. Early stopping during training.',
    keyPoints: ['Symptom: High training accuracy with declining validation/test accuracy', 'Techniques: L1 (Lasso) / L2 (Ridge) penalty, Dropout, Data Augmentation, Early Stopping'],
  },
  {
    id: 'aiml-4',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'What is the difference between precision and recall, and how do you choose between them?',
    answer: 'Precision measures out of all predicted positive cases, how many were actually positive (TP / (TP + FP)). Recall measures out of all actual positive cases in the dataset, how many were correctly identified (TP / (TP + FN)). Choose precision when false positives are costly (e.g. spam email detection); choose recall when false negatives are critical (e.g. medical diagnosis, fraud detection).',
    keyPoints: ['Precision = TP / (TP + FP) [Minimizes False Alarms]', 'Recall = TP / (TP + FN) [Minimizes Missed True Cases]', 'F1-Score: Harmonic mean balancing precision and recall'],
  },
  {
    id: 'aiml-5',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'Why do we split data into training, validation, and test datasets?',
    answer: 'The training set fits the model parameters (weights/biases). The validation set tunes hyperparameters (learning rate, tree depth) and guides model selection without data leakage. The held-out test set provides an unbiased final evaluation metric of how the selected model will generalize to unseen production data.',
    keyPoints: ['Training (~70%): Model parameter fitting', 'Validation (~15%): Hyperparameter tuning & model selection', 'Test (~15%): Unbiased final performance estimate'],
  },
  {
    id: 'aiml-6',
    category: 'ai-ml',
    categoryLabel: 'AI / Machine Learning',
    question: 'How do you deploy a machine learning model into a production software system?',
    answer: '1. Package data preprocessing and model weights together (ONNX / Joblib / TorchScript). 2. Expose an inference REST API endpoint using FastAPI or TorchServe. 3. Containerize the service with Docker for environment reproducibility. 4. Validate input schemas with Pydantic. 5. Implement low-latency caching (Redis) for frequent predictions. 6. Monitor model latency, throughput, and data drift over time.',
    keyPoints: ['Containerized FastAPI microservice with input validation', 'Monitor data drift and inference latency in production'],
  },

  // ==========================================
  // 11. CYBERSECURITY INTERVIEW QUESTIONS (6 Q&As)
  // ==========================================
  {
    id: 'sec-1',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'What is the fundamental difference between authentication and authorization?',
    answer: 'Authentication is the process of verifying who a user is (identity verification via passwords, MFA, or biometric keys). Authorization is the process of verifying what specific resources or operations an authenticated user is permitted to access (permissions, role-based access control).',
    keyPoints: ['Authentication (AuthN): "Who are you?" (Login credentials, OAuth, JWT)', 'Authorization (AuthZ): "What are you allowed to do?" (RBAC, ABAC permissions)'],
  },
  {
    id: 'sec-2',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'What is the difference between hashing and encryption?',
    answer: 'Hashing is a one-way cryptographic transformation that converts input data into a fixed-length digest; it cannot be reversed to retrieve the original plain text (used for password storage and data integrity verification). Encryption is a two-way reversible process using cryptographic keys to preserve data confidentiality.',
    keyPoints: ['Hashing: One-way (SHA-256, bcrypt, Argon2) - cannot decrypt', 'Encryption: Two-way reversible with key (AES symmetric, RSA asymmetric)'],
  },
  {
    id: 'sec-3',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'What is SQL Injection (SQLi) and how is it permanently prevented?',
    answer: 'SQL Injection is a vulnerability where untrusted user input alters the intended logical structure of a database query (e.g. entering \' OR \'1\'=\'1). Primary prevention: Always use Parameterized Queries (Prepared Statements) or ORM abstraction, which treat user input strictly as literal values rather than executable SQL syntax.',
    keyPoints: ['Vulnerability: String concatenation into SQL queries', 'Remediation: Prepared statements with parameterized placeholders, input validation'],
  },
  {
    id: 'sec-4',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'What is Cross-Site Scripting (XSS) and what are its primary types?',
    answer: 'XSS occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute malicious JavaScript in victims\' browsers. Types: Stored XSS (saved in database), Reflected XSS (reflected in immediate URL/request response), and DOM-based XSS (manipulation of DOM on client). Prevention: Context-aware output encoding, Content Security Policy (CSP), and HttpOnly cookie flags.',
    keyPoints: ['Types: Stored, Reflected, DOM-based', 'Impact: Session cookie theft, keystroke logging, credential harvesting', 'Remediation: Contextual HTML escaping, Content Security Policy (CSP)'],
  },
  {
    id: 'sec-5',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'What is the Principle of Least Privilege in security architecture?',
    answer: 'The Principle of Least Privilege dictates that every user, service, process, and application module should be granted only the minimal set of permissions and access rights necessary to perform its intended legitimate task, reducing the blast radius of any potential compromise.',
    keyPoints: ['Minimizes attack surface and limits lateral movement in case of a breach', 'Apply to: Database user accounts, AWS IAM roles, API keys, Linux file permissions'],
  },
  {
    id: 'sec-6',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    question: 'How should you discuss cybersecurity projects in job interviews?',
    answer: 'Always emphasize that all vulnerability scanning, penetration testing, and security simulations were conducted exclusively in controlled lab environments on systems you personally owned or had explicit written authorization to test. Discuss the defensive remediation controls, root cause analysis, and secure coding practices you implemented.',
    keyPoints: ['State ethical boundaries and authorized lab testing upfront', 'Focus on defensive engineering, patch remediation, and security monitoring'],
  },

  // ==========================================
  // 12. CLOUD / DEVOPS INTERVIEW QUESTIONS (5 Q&As)
  // ==========================================
  {
    id: 'cloud-1',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    question: 'What is CI/CD and what benefits does it deliver to software teams?',
    answer: 'CI (Continuous Integration) is the practice of frequently merging code changes into a central repository where automated builds, unit tests, and security scans run to catch bugs early. CD (Continuous Delivery/Deployment) automates packaging and deploying validated code to staging and production environments, accelerating release frequency and reducing deployment risk.',
    keyPoints: ['CI: Automated linting, testing, and security scanning on pull requests', 'CD: Automated container image builds and zero-downtime deployment releases'],
  },
  {
    id: 'cloud-2',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    question: 'What is Docker and how does it solve deployment inconsistencies?',
    answer: 'Docker is an open-source containerization platform that packages an application along with all its required dependencies, libraries, system binaries, and configuration files into an immutable lightweight container image. This guarantees that the application runs identically across development laptops, testing environments, and cloud servers.',
    keyPoints: ['Encapsulates code + runtime + libraries in an immutable image', 'Eliminates "works on my machine" inconsistencies across cloud environments'],
  },
  {
    id: 'cloud-3',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    question: 'What is the difference between a Virtual Machine (VM) and a Docker Container?',
    answer: 'A Virtual Machine virtualizes complete hardware and runs a full guest operating system on top of a hypervisor, consuming gigabytes of storage and taking minutes to boot. A Docker container virtualizes at the OS level, sharing the host OS kernel while running in isolated user spaces, allowing containers to start in milliseconds with minimal resource overhead.',
    keyPoints: ['VM: Full Guest OS, hypervisor, heavy resource usage, slower boot', 'Container: Shares host OS kernel, lightweight (MBs), millisecond startup'],
  },
  {
    id: 'cloud-4',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    question: 'Why is application monitoring and observability essential in production?',
    answer: 'Monitoring allows engineering teams to observe system health metrics (CPU/memory), application throughput, response latency, and error rates in real time. Observability enables engineers to diagnose why a distributed system is malfunctioning through Metrics (Prometheus), Logs (ELK), and Distributed Tracing (OpenTelemetry).',
    keyPoints: ['The Three Pillars of Observability: Metrics, Logs, and Traces', 'Alerts notify on threshold breaches before users experience prolonged downtime'],
  },
  {
    id: 'cloud-5',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    question: 'What is the difference between horizontal scaling and vertical scaling?',
    answer: 'Vertical scaling (Scaling Up) means adding more compute power (CPU, RAM, SSD) to a single existing server machine. Horizontal scaling (Scaling Out) means adding more machine instances to distribute incoming workload across a pool of servers using a load balancer (Nginx, AWS ALB), providing higher availability and fault tolerance.',
    keyPoints: ['Vertical Scaling: Single machine upgrade, hardware limits, single point of failure', 'Horizontal Scaling: Multiple distributed instances, load balanced, high availability'],
  },

  // ==========================================
  // 13. PROJECT QUESTIONS — MASTER DEFENSE (8 Q&As)
  // ==========================================
  {
    id: 'proj-1',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'Tell me about your project.',
    answer: 'Use the Structured 9-Part Framework:\n1. Problem: "We noticed [real-world problem]..."\n2. User: "...which affected [target user]."\n3. My Role: "I architected the backend and database layer..."\n4. Architecture: "The system uses a Node/Express backend with PostgreSQL and Redis caching..."\n5. Key Feature: "The core capability is [primary technical feature]..."\n6. Tech Decision: "We chose PostgreSQL for ACID relational integrity..."\n7. Challenge: "Our biggest bottleneck was [race condition/latency], which I resolved by [Redis locks]..."\n8. Result: "The system achieved [measured performance or functional milestone]..."\n9. Future Scope: "Next, we plan to implement [distributed queues/K8s]."',
    keyPoints: ['Structure: Problem -> Target User -> Architecture -> Tech Decisions -> Challenge -> Results'],
  },
  {
    id: 'proj-2',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'Why did you choose this specific technology stack?',
    answer: 'Always provide a requirement-driven justification: "We chose PostgreSQL because our data schema required strict ACID transactional consistency for payment orders. We selected Redis because our rate limiting and session tokens required sub-2ms lookup latency. We chose React on the frontend for component modularity and efficient virtual DOM diffing."',
    keyPoints: ['Never say "because it was popular" or "because my friend used it"', 'Tie technology choice to technical requirements: concurrency, data consistency, latency, or ecosystem libraries'],
  },
  {
    id: 'proj-3',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'What was your biggest technical challenge and how did you resolve it?',
    answer: 'Use the STAR challenge structure: "During peak test simulations, we encountered race conditions where multiple concurrent requests double-booked the same appointment slot. I investigated the issue using database locks, evaluated pessimistic vs optimistic locking, and implemented Redis atomic distributed locks with a 5-second TTL. This eliminated double-booking errors across 500 simultaneous simulated users."',
    keyPoints: ['Explain the problem -> What you investigated -> Technical solution -> Measurable result & learning'],
  },
  {
    id: 'proj-4',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'How is your database designed and indexed?',
    answer: 'Explain entities, primary/foreign key relationships, normalization level (3NF), and indexing: "Our database has Users, Orders, and Products tables. We placed composite indexes on { user_id, order_date } because our dashboard frequently filters by user and sorts chronologically. For high-volume read queries, we implemented Redis Cache-Aside to reduce DB load by 70%."',
    keyPoints: ['Be ready to whiteboard entity relationships and justify why specific indexes were created'],
  },
  {
    id: 'proj-5',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'How does authentication and authorization work in your application?',
    answer: 'Explain the complete lifecycle: "When a user logs in, passwords hashed with Argon2 are verified against the database. Upon success, the server issues a signed JWT containing user ID and role claims stored in an httpOnly secure cookie. For protected routes, an Express middleware verifies the token signature and checks if the role matches the required permission matrix."',
    keyPoints: ['Explain hashing algorithm, token structure, middleware validation, and logout/expiry handling'],
  },
  {
    id: 'proj-6',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'What happens if your API, database, or external service fails?',
    answer: 'Discuss resilience: "Our API includes centralized error-handling middleware that catches unhandled exceptions, logs structured errors, and returns clean HTTP 500 JSON without exposing stack traces. For external third-party API calls, we implemented exponential backoff retries and fallback cached data so the application degrades gracefully rather than crashing."',
    keyPoints: ['Discuss input validation, retry mechanisms, circuit breakers, fallback responses, and logging'],
  },
  {
    id: 'proj-7',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'How would you scale this project if user traffic increased by 100x?',
    answer: 'Identify bottlenecks first: "1. Stateless Backend: Move any session state to Redis so backend instances can scale horizontally behind an Nginx load balancer. 2. Database: Implement read-replicas for read-heavy traffic and connection pooling with PgBouncer. 3. Caching: Cache frequently requested queries in Redis and static assets on a CDN. 4. Async Queues: Offload heavy tasks (emails, reports) to RabbitMQ background workers."',
    keyPoints: ['1. Load Balancer -> 2. Redis Caching -> 3. DB Read Replicas -> 4. Asynchronous Message Queues'],
  },
  {
    id: 'proj-8',
    category: 'projects',
    categoryLabel: 'Project Defense',
    question: 'What did YOU personally build vs what was copied or pre-built?',
    answer: 'Be exact and confident: "I personally architected the database schema, wrote the JWT authentication middleware, built the 12 REST API endpoints with Zod validation, and integrated the Redis caching layer. My teammate built the frontend UI components, while we collaborated on API contract definitions and Docker deployment."',
    keyPoints: ['Never claim work you did not build; interviewers immediately test depth on claimed code'],
  },

  // ==========================================
  // 17. HR & BEHAVIORAL QUESTIONS (7 Q&As)
  // ==========================================
  {
    id: 'hr-1',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Tell me about yourself.',
    answer: 'Use the Present -> Past -> Future Framework:\n• Present: "I am a final-year Computer Science student passionate about full-stack engineering and distributed systems."\n• Past: "Over the past three years, I built [Project Name], an e-commerce platform handling concurrent orders, and completed certifications in [Domain]."\n• Future: "I am looking for an SDE-1 role at [Company] where I can contribute to high-scale backend services and grow alongside your engineering team."',
    keyPoints: ['Keep it under 90 seconds', 'Connect your background directly to what the company needs'],
  },
  {
    id: 'hr-2',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Why should we hire you over other candidates?',
    answer: 'Connect 2–3 verified strengths: "1. Strong Core Fundamentals: I have a solid foundation in DSA, DBMS, and OS, having solved 300+ algorithmic problems. 2. Practical Engineering: I have built and deployed real production-style projects with testing and Docker. 3. Fast Learner: When our hackathon project required Redis, I picked it up and integrated caching within 24 hours."',
    keyPoints: ['Anchor claims to tangible evidence from projects, competitive programming, or coursework'],
  },
  {
    id: 'hr-3',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'What is your greatest technical or personal weakness?',
    answer: 'Pick a real, manageable weakness and show your system to improve: "Earlier, I had a tendency to jump straight into coding before fully designing the architecture on paper, which sometimes caused refactoring delays. To fix this, I now mandate creating a quick architecture diagram and API contract draft before writing any code."',
    keyPoints: ['Avoid fake strengths disguised as weaknesses (e.g. "I work too hard")', 'State a real challenge and explain the concrete mechanism you use to manage it'],
  },
  {
    id: 'hr-4',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Tell me about a time you failed and what you learned from it.',
    answer: 'Use Situation -> Action -> Result -> Lesson: "In a college hackathon, our team built too many ambitious features without testing the core integration flow. 2 hours before submission, our API failed under demo load. From that experience, I learned the importance of defining an MVP first, setting integration milestones early, and automated testing."',
    keyPoints: ['Focus on accountability and the positive permanent behavioral change that resulted'],
  },
  {
    id: 'hr-5',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Tell me about a conflict or disagreement you had in a team project.',
    answer: 'Use objective conflict resolution: "During our major project, my teammate wanted to use MongoDB while I advocated for PostgreSQL because our financial data required strict ACID constraints. Rather than arguing opinions, I created a quick benchmark comparison showing the relational foreign-key benefits for our schema. We discussed it objectively and agreed on PostgreSQL."',
    keyPoints: ['Focus on objective reasoning, constructive communication, and professional respect'],
  },
  {
    id: 'hr-6',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Why do you want to work for our company?',
    answer: 'Demonstrate company-specific research: "I have been following [Company]\'s work in [specific product/technology area]. I was particularly impressed by your recent engineering blog post on [technical architecture/scale]. My background in building [relevant project skill] aligns directly with your team\'s mission, and I want to solve problems at this scale."',
    keyPoints: ['Never give generic praise that could apply to any company', 'Mention specific products, tech stack, or engineering achievements of the company'],
  },
  {
    id: 'hr-7',
    category: 'hr',
    categoryLabel: 'HR & Behavioral',
    question: 'Where do you see yourself in 3 to 5 years?',
    answer: 'Focus on skill and responsibility growth: "In 3 to 5 years, I see myself as a strong, reliable Software Engineer who has mastered system architecture, owns end-to-end features in production, mentors junior developers, and contributes to key technical design decisions for the team."',
    keyPoints: ['Focus on technical depth, leadership growth, and business impact rather than arbitrary titles'],
  },
];

export const PREPARATION_PLAN_12_WEEKS = [
  {
    weeks: 'Weeks 1–2',
    focus: 'Programming & Complexity',
    dailyWork: 'Language syntax revision (C++/Java/Python) + 3–5 basic DSA problems daily + Time/Space complexity analysis.',
    output: 'Language Cheat Sheet & Time Complexity notes',
    badge: 'Foundation',
  },
  {
    weeks: 'Weeks 3–4',
    focus: 'Arrays, Strings & Linked Lists',
    dailyWork: 'Two Pointers, Sliding Window, Fast/Slow Pointers, Linked List reversals, and cycle detection problems.',
    output: '30+ Solved Array/String/LinkedList Problems',
    badge: 'DSA Core I',
  },
  {
    weeks: 'Weeks 5–6',
    focus: 'Stacks, Queues, Trees & Graphs',
    dailyWork: 'Monotonic Stack, BST traversals, BFS/DFS graph traversals, Dijkstra, and Topological Sort.',
    output: '40+ Solved Tree/Graph Problems',
    badge: 'DSA Core II',
  },
  {
    weeks: 'Week 7',
    focus: 'Object-Oriented Programming (OOP)',
    dailyWork: 'OOP 4 pillars, abstract classes vs interfaces, design patterns (Singleton, Factory, Observer), and language questions.',
    output: 'OOP Interview Concept Notes & Code Examples',
    badge: 'Core CS I',
  },
  {
    weeks: 'Week 8',
    focus: 'DBMS & SQL Mastery',
    dailyWork: 'Complex SQL queries (JOINs, GROUP BY, Window functions), 1NF-3NF normalization, indexes, and ACID transactions.',
    output: 'SQL Query Practice Set & Schema Notes',
    badge: 'Core CS II',
  },
  {
    weeks: 'Week 9',
    focus: 'Operating Systems & Computer Networks',
    dailyWork: 'Processes vs threads, deadlock conditions, virtual memory paging, TCP vs UDP, DNS, HTTP/HTTPS, and OSI model.',
    output: 'OS & Networking Quick Revision Guide',
    badge: 'Core CS III',
  },
  {
    weeks: 'Week 10',
    focus: 'Project Deep Dive & Defense',
    dailyWork: 'Document architecture diagrams, database ER schemas, failure handling, Redis/Kafka usage, and personal contributions.',
    output: 'Project Interview Master Defense Notes',
    badge: 'Projects',
  },
  {
    weeks: 'Week 11',
    focus: 'Specialization Q&A (Web / AI / Cloud / Sec)',
    dailyWork: 'Role-specific interview preparation in your chosen field (React/Node, PyTorch/FastAPI, Docker/AWS, or OWASP).',
    output: 'Role-Specific Specialization Q&A Deck',
    badge: 'Specialization',
  },
  {
    weeks: 'Week 12',
    focus: 'Mock Interviews & HR Preparation',
    dailyWork: '3-5 live peer mock interviews + 60-second self-introduction + STAR behavioral answers + resume final audit.',
    output: 'Placement-Ready Candidate Pack',
    badge: 'Recruitment',
  },
];

export const CODING_COMMUNICATION_SCRIPT = [
  { step: 'Step 1', title: 'Restate the Problem', desc: 'Repeat the problem statement in your own words to confirm alignment with the interviewer.' },
  { step: 'Step 2', title: 'Ask Constraints & Edge Cases', desc: 'Ask: "What is the maximum value of n?", "Can array contain duplicates/negatives?", "What if input is empty?"' },
  { step: 'Step 3', title: 'Propose a Brute-Force Solution', desc: 'Briefly explain the simplest brute-force solution so the interviewer knows you have a working baseline.' },
  { step: 'Step 4', title: 'Explain Why It Is Too Slow', desc: 'State why the brute-force is suboptimal (e.g. "O(n²) time complexity will time out for n = 10⁵").' },
  { step: 'Step 5', title: 'Propose the Optimized Approach', desc: 'Explain your chosen data structure/technique (e.g. "Using a Hash Map with two pointers reduces time to O(n)").' },
  { step: 'Step 6', title: 'State Time and Space Complexity', desc: 'Explicitly state Big-O time and space complexity before writing code; wait for interviewer nod.' },
  { step: 'Step 7', title: 'Write Clean Modular Code', desc: 'Write clean code while thinking aloud, using meaningful variable names and helper functions.' },
  { step: 'Step 8', title: 'Dry-Run with an Example', desc: 'Walk through your code line-by-line using a small test example, tracing variable values.' },
  { step: 'Step 9', title: 'Test Edge Cases', desc: 'Test null, empty array, single element, negative numbers, and duplicate values.' },
  { step: 'Step 10', title: 'Summarize the Final Solution', desc: 'Conclude: "This solution runs in O(n) time and O(1) space, handling all edge cases correctly."' },
];

export const INTERVIEW_ETIQUETTE_RULES = [
  { rule: 'Join 5–10 Minutes Early', desc: 'Test camera, microphone, internet stability, and screen sharing ahead of time.' },
  { rule: 'Professional Environment', desc: 'Ensure good lighting, clean quiet background, and professional attire.' },
  { rule: 'Resume & Links at Hand', desc: 'Keep your resume, project demo URLs, and GitHub repos readily accessible in browser tabs.' },
  { rule: 'No Screen Reading / Cheating', desc: 'Never read answers from another screen or AI chatbot; interviewers detect unnatural eye movements instantly.' },
  { rule: 'Positive & Respectful Demeanor', desc: 'Never speak negatively about past professors, teammates, or previous employers.' },
  { rule: 'Clarify When Confused', desc: 'Do not guess in silence. Say: "Could you please clarify if the input array is sorted?"' },
  { rule: 'Calm Error Correction', desc: 'If you spot a bug during dry-run, stay calm and say: "I noticed this edge case; let me adjust the condition."' },
  { rule: 'Ask Thoughtful Closing Questions', desc: 'Show genuine intellectual curiosity about the team’s engineering challenges and culture.' },
];

export const QUESTIONS_TO_ASK_INTERVIEWER = [
  'What would a successful first 3 to 6 months in this role look like?',
  'What kinds of technical and architectural challenges is the engineering team currently solving?',
  'How does the team handle code reviews, CI/CD deployments, and testing in production?',
  'What technologies and tools would a junior engineer work with most frequently?',
  'How does the engineering leadership support continuous learning and mentorship for junior developers?',
];

export const PLACEMENT_CHECKLIST_ITEMS = [
  { id: 'c1', text: 'Resume is exactly one page, ATS-formatted, and every single listed claim is 100% accurate' },
  { id: 'c2', text: 'GitHub repositories are public, organized, with clean commits and professional READMEs' },
  { id: 'c3', text: 'At least 2 production-style projects can be explained deeply from problem to architecture' },
  { id: 'c4', text: 'One major project can be explained from system architecture down to code-level trade-offs' },
  { id: 'c5', text: 'DSA fundamentals (Arrays, Strings, LinkedLists, Trees, Graphs, DP) practiced with 150+ problems' },
  { id: 'c6', text: 'Core CS revised: OOP (4 pillars), DBMS (ACID, Normalization, Joins), OS (Concurrency, Deadlocks), CN (TCP, DNS, HTTP)' },
  { id: 'c7', text: 'Complex SQL queries (JOINs, GROUP BY, Window functions) can be written comfortably on a whiteboard' },
  { id: 'c8', text: 'Primary programming language (Java / C++ / Python / JS) fundamentals and memory model are rock solid' },
  { id: 'c9', text: 'Target specialization interview questions (Web, AI/ML, Cloud, Security, Data) are prepared' },
  { id: 'c10', text: 'Completed 3 to 5 realistic mock interviews with peers or mentors' },
  { id: 'c11', text: '60-second "Tell Me About Yourself" (Present-Past-Future) practiced aloud until natural' },
  { id: 'c12', text: '2-3 minute project overview narrative practiced without hesitation' },
  { id: 'c13', text: '10-step coding interview think-aloud communication script practiced' },
  { id: 'c14', text: 'Online interview camera, microphone, internet, and 3 thoughtful questions for interviewer prepared' },
];

export const LANGUAGE_COMPARISON_MATRIX = [
  { language: 'C / C++', topics: 'Pointers/references, manual memory management (malloc/free, new/delete), stack vs heap, STL containers (vector, map, unordered_map), compilation stages, RAII, classes, virtual functions, and time complexity.' },
  { language: 'Java', topics: 'JVM architecture (ClassLoader, JVM Memory, JIT compiler), OOP principles, Collections Framework (ArrayList, HashMap, ConcurrentHashMap), Exception handling, Interfaces vs Abstract classes, Garbage Collection algorithms, and Spring Boot basics.' },
  { language: 'Python', topics: 'Core data structures (lists, dicts, sets, tuples), functions, modules, decorators, generators/yield, virtual environments, GIL (Global Interpreter Lock), OOP in Python, and common libraries (NumPy, Pandas, FastAPI).' },
  { language: 'JavaScript / TypeScript', topics: 'Scope & Closures, Promises & Async/Await, Event Loop & Microtask Queue, DOM Manipulation, ES6+ modules, Prototypes, TypeScript types/interfaces, Generics, and strict type checking.' },
  { language: 'SQL', topics: 'Complex multi-table JOINs, GROUP BY & HAVING, window functions (ROW_NUMBER, RANK), subqueries & CTEs, B-Tree indexes, ACID transactions, and query plan optimization with EXPLAIN.' },
];

export const PROJECT_LEVELS = [
  { level: 'Foundation', recommended: '1–2 small projects', whatItProves: 'Programming + Git + Basic UI', example: 'Expense tracker / Quiz app / Developer portfolio' },
  { level: 'Practical', recommended: '1–2 medium projects', whatItProves: 'DBMS + REST APIs + Auth + Testing', example: 'Student / Clinic / Inventory management system' },
  { level: 'Specialization', recommended: '1 strong project', whatItProves: 'Role-specific engineering depth', example: 'AI/ML, cybersecurity, cloud or full-stack project' },
  { level: 'Major', recommended: '1 high-level project', whatItProves: 'End-to-end architecture + scale + deployment', example: 'Multi-tenant SaaS / AI platform / Security analysis tool' },
];

export const PROJECT_WORTHY_CRITERIA = [
  'Solves a clear user problem rather than being a generic cloned counter app.',
  'Has a complete, working end-to-end user flow with responsive frontend and robust backend.',
  'Uses a sensible, normalized relational or documented document database schema.',
  'Implements secure authentication (JWT / Argon2 / OAuth) and role-based authorization where needed.',
  'Uses structured RESTful API design with request validation and clean error response schemas.',
  'Includes comprehensive error handling without exposing backend server stack traces.',
  'Has unit or integration tests appropriate to the core business logic.',
  'Is deployed on a live domain (Vercel, Render, AWS) or has a 1-command Docker setup.',
  'Features a professional GitHub README with architectural diagrams, API docs, and setup steps.',
  'Demonstrates measurable testing or performance results (e.g. "reduced latency by 45% with Redis").',
  'You can explain every single design trade-off and line of code from first principles.',
  'Reflects your genuine individual engineering contributions rather than copy-pasted tutorial code.',
];

export const RESUME_PROJECT_TEMPLATE = {
  title: 'PROJECT NAME | Tech Stack (e.g. React, Node.js, PostgreSQL, Redis, Docker)',
  bullets: [
    '• Built [what product] to solve [problem] for [target user group].',
    '• Implemented [2–3 key technical features: e.g. JWT auth, Redis caching, WebSocket updates].',
    '• Designed [PostgreSQL 3NF schema / REST API] and deployed using [Docker & Render/AWS].',
    '• Optimized/measured [metric: e.g. 60% query speedup / 99.9% uptime] using [method: e.g. Redis caching / index tuning].',
  ],
  links: 'GitHub: https://github.com/username/project | Live Demo: https://project-demo.com',
};

export const PORTAL_MODULES = [
  { title: 'Interview Dashboard', desc: 'Personalized readiness score, streak tracking, and preparation calendar.' },
  { title: 'DSA Practice Bank', desc: 'Topic-wise problems with time complexity benchmarks and dry-run code explanations.' },
  { title: 'Core CS Foundations', desc: 'Curated deep-dives in OOP, DBMS, Operating Systems, and Computer Networks.' },
  { title: 'Language Masteries', desc: 'C++, Java, Python, JavaScript, TypeScript, and advanced SQL query sets.' },
  { title: 'Role Specializations', desc: 'Targeted Q&A decks for Web, Full-Stack, AI/ML, Cloud/DevOps, and Cybersecurity.' },
  { title: 'Project Interview Defense', desc: 'Generate and practice custom architecture, failure handling, and scalability questions.' },
  { title: 'HR & Behavioral Bank', desc: 'STAR-format behavioral responses, conflict resolution, and self-introduction scripts.' },
  { title: 'Mock Interview Simulator', desc: 'Timed coding questions, think-aloud practice scripts, and peer evaluations.' },
  { title: 'ATS Resume Builder & Auditor', desc: 'Analyze resume bullet points against Google XYZ formulas and target job descriptions.' },
  { title: 'Company-Specific Intel', desc: 'Verified past recruitment questions, hiring patterns, and technical bar standards.' },
  { title: 'Interview Etiquette & Checklist', desc: 'Online tech setup verification, body language protocols, and questions to ask.' },
  { title: 'Placement Application Tracker', desc: 'Track job applications, OA deadlines, technical rounds, and offer letters.' },
];

