const interviewQuestionsSeedData = [
  // ----------------------------------------------------
  // DATA STRUCTURES & ALGORITHMS (DSA)
  // ----------------------------------------------------
  {
    category: 'DSA',
    topic: 'Arrays vs Linked Lists',
    difficulty: 'Easy',
    question: 'What is the difference between an array and a linked list?',
    answer: `Arrays store elements in contiguous memory in typical implementations and support O(1) indexed random access. Linked lists use nodes connected by pointer/reference links; access is O(n), while insertion/deletion can be O(1) when the node/position reference is already known.

### Memory & Cache Locality:
- **Arrays**: High cache locality due to contiguous blocks in RAM.
- **Linked Lists**: Extra memory overhead for pointers, potential memory fragmentation.`,
    tags: ['DSA', 'Arrays', 'LinkedList', 'Memory Layout', 'Time Complexity'],
    keyTakeaways: [
      'Arrays offer O(1) random indexing with high CPU cache locality.',
      'Linked lists allow O(1) insertion/deletion given a pointer, but O(n) sequential lookup.',
    ],
    commonPitfalls: ['Assuming inserting at the middle of an array is O(1).', 'Forgetting to check null pointer exceptions on linked list node traversals.'],
    isFeatured: true,
  },
  {
    category: 'DSA',
    topic: 'Time & Space Complexity',
    difficulty: 'Easy',
    question: 'What is time complexity and how is it measured with Big-O notation?',
    answer: `Time complexity describes how the running time of an algorithm grows asymptotically as the input size n scales.

### Common Complexity Classes:
- **O(1) Constant**: Hash map lookup, array indexing.
- **O(log n) Logarithmic**: Binary search on sorted arrays, balanced BST operations.
- **O(n) Linear**: Single loop linear search, array traversal.
- **O(n log n) Linearithmic**: Merge Sort, Quick Sort (average), Heap Sort.
- **O(n²) Quadratic**: Nested loops, Bubble / Insertion Sort.
- **O(2ⁿ) Exponential**: Recursive Fibonacci without memoization, subset generation.`,
    tags: ['DSA', 'Big-O', 'Complexity Analysis', 'Algorithms'],
    keyTakeaways: [
      'Big-O represents the upper bound (worst-case) asymptotic growth rate.',
      'Space complexity includes both auxiliary memory and recursion call stack space.',
    ],
    isFeatured: true,
  },
  {
    category: 'DSA',
    topic: 'Graph Traversals: BFS vs DFS',
    difficulty: 'Medium',
    question: 'What is the difference between BFS and DFS graph traversals and when is BFS optimal?',
    answer: `### BFS vs DFS:
- **BFS (Breadth-First Search)**: Explores nodes level-by-level using a Queue (FIFO). Space complexity is O(V) for queue storage. It is optimal for finding the shortest path in unweighted graphs.
- **DFS (Depth-First Search)**: Explores deep into child branches before backtracking using recursion or an explicit Stack (LIFO). Space complexity is O(h) where h is max recursion depth. Useful for cycle detection, topological sorting, and connected components.`,
    tags: ['DSA', 'Graphs', 'BFS', 'DFS', 'Shortest Path'],
    keyTakeaways: [
      'BFS uses a Queue and finds shortest unweighted paths.',
      'DFS uses a Stack/Recursion and is ideal for topological sort and maze/cycle exploration.',
    ],
    isFeatured: true,
  },
  {
    category: 'DSA',
    topic: 'Hash Tables & Collision Resolution',
    difficulty: 'Medium',
    question: 'How do hash tables work and how are hash collisions resolved?',
    answer: `A Hash Table maps keys to bucket indices using a deterministic hash function, providing average O(1) lookup, insert, and delete operations.

### Collision Resolution Techniques:
1. **Separate Chaining**: Each bucket contains a linked list or balanced binary tree (e.g. Red-Black Tree in Java 8+ HashMap) of colliding entries.
2. **Open Addressing**: Probes for the next available empty slot in the array using Linear Probing, Quadratic Probing, or Double Hashing.`,
    tags: ['DSA', 'Hash Table', 'Separate Chaining', 'Open Addressing', 'Collisions'],
    keyTakeaways: [
      'Average time complexity is O(1); worst case degrades to O(n) if all keys hash to the same bucket.',
      'Load Factor (α = n/k) triggers table resizing and rehashing when threshold is crossed.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // OBJECT ORIENTED PROGRAMMING (OOP)
  // ----------------------------------------------------
  {
    category: 'OOP',
    topic: 'Four Pillars of OOP',
    difficulty: 'Easy',
    question: 'Explain the four pillars of Object-Oriented Programming (OOP) with practical examples.',
    answer: `The 4 Pillars of OOP are:
1. **Encapsulation**: Bundling state (variables) and behavior (methods) together within a class and restricting direct access via access modifiers (private, protected, public) with getters/setters.
2. **Abstraction**: Exposing only essential interface details while hiding internal complex implementation mechanics (e.g. interfaces and abstract classes).
3. **Inheritance**: Allowing a child class to inherit fields and methods from a parent class to promote code reusability ('is-a' relationship).
4. **Polymorphism**: Ability of an object to take many forms. Includes Compile-Time (Method Overloading) and Runtime (Method Overriding via virtual dispatch).`,
    tags: ['OOP', 'Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
    keyTakeaways: [
      'Encapsulation protects data integrity; Abstraction hides implementation complexity.',
      'Overloading is compile-time (different signatures); Overriding is runtime (subclass implementation).',
    ],
    isFeatured: true,
  },
  {
    category: 'OOP',
    topic: 'Composition vs Inheritance',
    difficulty: 'Medium',
    question: 'Why is Composition favored over Inheritance ("Favor composition over inheritance") in software design?',
    answer: `### Composition vs Inheritance:
- **Inheritance ("is-a")**: Creates tight coupling between superclass and subclass. Changes to parent classes can break subclass behavior (fragile base class problem), and languages like Java/C# do not allow multiple class inheritance.
- **Composition ("has-a")**: Builds complex objects by combining independent, modular components as instance references. Promotes loose coupling, enables runtime polymorphic swapping of behaviors (Strategy Pattern), and simplifies unit testing with mocks.`,
    tags: ['OOP', 'Design Principles', 'Composition', 'Inheritance', 'SOLID'],
    keyTakeaways: [
      'Composition promotes loose coupling and dynamic runtime flexibility.',
      'Use inheritance only when a true immutable "is-a" taxonomy exists.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // DBMS & SQL
  // ----------------------------------------------------
  {
    category: 'DBMS',
    topic: 'Database Normalization',
    difficulty: 'Medium',
    question: 'What is database normalization and what are 1NF, 2NF, and 3NF?',
    answer: `Normalization is the process of structuring relational database tables to minimize data redundancy and eliminate insert, update, and delete anomalies.

### Normal Forms:
- **1NF (First Normal Form)**: Atomic column values (no multi-valued lists or nested tables) and a defined primary key.
- **2NF (Second Normal Form)**: Must be in 1NF and have NO partial dependency (every non-key attribute must depend on the entire primary key, not a subset of a composite key).
- **3NF (Third Normal Form)**: Must be in 2NF and have NO transitive dependency (non-key columns must depend directly on the primary key, not on another non-key column).`,
    tags: ['DBMS', 'Normalization', '1NF', '2NF', '3NF', 'Relational Schema'],
    keyTakeaways: [
      'Normalization prevents update anomalies and reduces storage redundancy.',
      'OLAP systems often denormalize for faster analytical read query performance.',
    ],
    isFeatured: true,
  },
  {
    category: 'DBMS',
    topic: 'Indexing & B-Trees',
    difficulty: 'Medium',
    question: 'How do B-Tree and B+ Tree indexes work in relational databases, and when should you avoid creating an index?',
    answer: `A B-Tree (and B+ Tree) is a self-balancing search tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time O(log N).

### How it works:
1. **B+ Tree Architecture**: All data records (or record pointers) are stored in the leaf nodes, while internal nodes only store keys for routing.
2. **Linked Leaf Nodes**: Leaf nodes are doubly linked together, making sequential range scans (e.g. \`WHERE age BETWEEN 20 AND 30\`) extremely fast without re-traversing internal tree branches.
3. **Reduced Disk I/O**: High fan-out (100+ child pointers) keeps tree height shallow (3-4 levels for millions of rows), minimizing disk seeks.

### When to AVOID Indexing:
- **Low-Cardinality Columns**: Columns with few distinct values (boolean flags, status codes).
- **Heavy Write Tables**: Every INSERT, UPDATE, DELETE incurs index recalculation overhead.
- **Small Tables**: Full table scans in memory are faster than index traversal for small datasets.`,
    tags: ['DBMS', 'Indexing', 'B-Tree', 'B+Tree', 'SQL Optimization'],
    keyTakeaways: [
      'B+ Trees store all actual record pointers in leaf nodes linked sequentially.',
      'Indexing speeds up SELECT queries at the cost of slower INSERT/UPDATE operations and memory overhead.',
    ],
    isFeatured: true,
  },
  {
    category: 'DBMS',
    topic: 'ACID Properties & Transactions',
    difficulty: 'Medium',
    question: 'Explain the ACID properties of database transactions with real-world banking examples.',
    answer: `ACID guarantees that database transactions are processed reliably:

1. **Atomicity ("All or Nothing")**: The entire transaction either completes successfully or rolls back completely with no partial changes.
2. **Consistency**: The database transitions from one valid state to another, satisfying all constraints, cascades, and schema invariants.
3. **Isolation**: Concurrent transactions execute without interfering with one another. Achieved via isolation levels (Read Committed, Repeatable Read, Serializable).
4. **Durability**: Once committed, changes are permanently recorded in non-volatile storage even across crashes via Write-Ahead Logging (WAL).`,
    tags: ['DBMS', 'ACID', 'Transactions', 'WAL', 'Isolation Levels'],
    keyTakeaways: [
      'Atomicity prevents partial execution via rollback logs.',
      'Isolation handles concurrency anomalies (Dirty Reads, Non-repeatable reads, Phantom reads).',
      'Durability is guaranteed using Write-Ahead Logging (WAL).',
    ],
    isFeatured: true,
  },
  {
    category: 'DBMS',
    topic: 'SQL Joins & WHERE vs HAVING',
    difficulty: 'Easy',
    question: 'What is the difference between INNER JOIN vs LEFT JOIN, and WHERE vs HAVING clauses?',
    answer: `### INNER JOIN vs LEFT JOIN:
- **INNER JOIN**: Returns only rows that have matching values in both joined tables.
- **LEFT JOIN**: Returns all rows from the left table, along with matching rows from the right table (or NULLs where no match exists).

### WHERE vs HAVING:
- **WHERE**: Filters individual rows BEFORE any aggregation (\`GROUP BY\`) is performed. Cannot contain aggregate functions.
- **HAVING**: Filters grouped records AFTER \`GROUP BY\` aggregation. Used with aggregate functions like \`COUNT()\`, \`SUM()\`, \`AVG()\`.`,
    tags: ['DBMS', 'SQL', 'Joins', 'WHERE', 'HAVING', 'Aggregation'],
    keyTakeaways: [
      'INNER JOIN keeps intersections; LEFT JOIN preserves left-hand records with NULL padding.',
      'WHERE filters before grouping; HAVING filters aggregated sets after grouping.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // OPERATING SYSTEMS (OS)
  // ----------------------------------------------------
  {
    category: 'OS',
    topic: 'Processes vs Threads & Concurrency',
    difficulty: 'Medium',
    question: 'What are the key architectural differences between a Process and a Thread? Explain context switching overhead.',
    answer: `### Process vs Thread:
| Aspect | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | An independent executing program in memory. | A lightweight execution unit within a process. |
| **Memory Space** | Has its own dedicated virtual address space (Code, Data, Heap, Stack). | Shares Code, Data, and Heap with parent process; has private Stack & Registers. |
| **Creation Cost** | High (allocating page tables, file descriptors, address space via fork). | Low (allocating thread stack and control block). |
| **Communication** | Inter-Process Communication (IPC: Sockets, Pipes, Shared Memory). | Direct shared memory variables (requires Mutex / Semaphore sync). |
| **Fault Isolation** | High (process crash does not affect other processes). | Low (unhandled thread exception can crash entire process). |

### Context Switching Overhead:
- Thread switch only saves CPU registers and stack pointer.
- Process switch also flushes the TLB and swaps page tables, causing cache misses and latency.`,
    tags: ['Operating Systems', 'Processes', 'Threads', 'Concurrency', 'Context Switching'],
    keyTakeaways: [
      'Threads share memory heap/code but have independent stacks.',
      'Process context switching flushes the TLB, incurring significant cache invalidation cost.',
    ],
    isFeatured: true,
  },
  {
    category: 'OS',
    topic: 'Deadlocks & Coffman Conditions',
    difficulty: 'Hard',
    question: 'What is a Deadlock in Operating Systems and what are the 4 Coffman conditions required for it to occur?',
    answer: `A Deadlock is a situation where two or more processes/threads are permanently blocked because each holds a resource that the other requires.

### The 4 Coffman Conditions (All 4 must hold simultaneously):
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process holds at least one resource while waiting to acquire additional resources held by others.
3. **No Preemption**: Resources cannot be forcibly seized from a process; they can only be released voluntarily.
4. **Circular Wait**: A closed chain of processes exists such that $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.

### Deadlock Prevention:
- Enforce strict hierarchical resource acquisition ordering to break Circular Wait.`,
    tags: ['Operating Systems', 'Deadlock', 'Coffman Conditions', 'Mutex', 'Concurrency'],
    keyTakeaways: [
      'All 4 Coffman conditions must hold simultaneously for a deadlock to occur.',
      'Breaking circular wait via global resource ordering is the standard engineering fix.',
    ],
    isFeatured: true,
  },
  {
    category: 'OS',
    topic: 'Virtual Memory & Page Faults',
    difficulty: 'Hard',
    question: 'How does Virtual Memory work, what is a Page Fault, and how does the LRU page replacement algorithm handle it?',
    answer: `### Virtual Memory Overview:
Virtual Memory gives each process the abstraction of a large, contiguous block of RAM using Paging:
- Memory is split into fixed-size **Pages** (typically 4KB) mapped to physical **Frames** via **Page Tables**.
- **TLB (Translation Lookaside Buffer)** acts as a hardware cache for address translations.

### Page Fault Handling:
1. Program accesses a page not mapped into physical RAM.
2. CPU triggers a Page Fault interrupt trapping into kernel mode.
3. OS reads missing page from disk swap space into an available frame. If RAM is full, **LRU Page Replacement** evicts the least recently accessed frame to disk.`,
    tags: ['Operating Systems', 'Virtual Memory', 'Page Fault', 'LRU Cache', 'Paging'],
    keyTakeaways: [
      'Virtual memory translates virtual addresses to physical frames using page tables and TLB.',
      'Page fault triggers disk I/O to load missing memory pages into RAM.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // COMPUTER NETWORKS (CN)
  // ----------------------------------------------------
  {
    category: 'CN',
    topic: 'TCP vs UDP & 3-Way Handshake',
    difficulty: 'Medium',
    question: 'Explain the TCP 3-Way Handshake process and compare TCP with UDP for latency-sensitive applications.',
    answer: `### TCP 3-Way Handshake:
1. **SYN**: Client sends SYN packet with Initial Sequence Number ($ISN_C$).
2. **SYN-ACK**: Server acknowledges with ACK ($ISN_C + 1$) and its own sequence number ($ISN_S$).
3. **ACK**: Client acknowledges with ACK ($ISN_S + 1$). Connection is now ESTABLISHED.

### TCP vs UDP Comparison:
- **TCP**: Connection-oriented, guaranteed in-order delivery, flow/congestion control, higher overhead. Ideal for HTTP/HTTPS, DB connections, file transfers.
- **UDP**: Connectionless, no retransmissions, zero connection handshake overhead. Ideal for live video streaming, DNS lookups, VoIP, and multiplayer gaming.`,
    tags: ['Computer Networks', 'TCP', 'UDP', '3-Way Handshake', 'Protocols'],
    keyTakeaways: [
      'TCP handshake establishes sequence numbers and confirms bidirectional connectivity.',
      'UDP trades reliability for ultra-low latency and minimal packet overhead.',
    ],
    isFeatured: true,
  },
  {
    category: 'CN',
    topic: 'Browser URL Navigation Lifecycle',
    difficulty: 'Medium',
    question: 'What happens behind the scenes when you enter a URL into a browser and press Enter?',
    answer: `### Step-by-Step URL Lifecycle:
1. **URL Parsing**: Browser parses protocol (https), hostname (api.example.com), port, and path.
2. **DNS Resolution**: Checks browser cache → OS cache → Router cache → Recursive DNS resolver to map domain to IP address.
3. **TCP Handshake & TLS Negotiation**: Establishes 3-way TCP connection and negotiates TLS 1.3 cryptographic session keys.
4. **HTTP Request/Response**: Browser sends HTTP GET request with headers/cookies; server processes request and returns HTTP 200 with HTML/JSON.
5. **DOM/CSSOM Rendering**: Browser parses HTML into DOM tree, CSS into CSSOM tree, builds Render Tree, calculates Layout, and paints pixels.`,
    tags: ['Computer Networks', 'Browser Lifecycle', 'DNS', 'TLS Handshake', 'HTTP/HTTPS'],
    keyTakeaways: [
      'Covers DNS lookup, TCP/TLS connection setup, HTTP exchange, and DOM/CSSOM rendering pipeline.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // SYSTEM DESIGN & WEB ARCHITECTURE
  // ----------------------------------------------------
  {
    category: 'System Design',
    topic: 'Caching Strategies & Redis Patterns',
    difficulty: 'Hard',
    question: 'How do you design a multi-tier caching layer for a high-traffic web application? Explain Cache-Aside, Write-Through, and Invalidation.',
    answer: `### Caching Patterns:
1. **Cache-Aside (Lazy Loading)**:
   - Application checks Cache (Redis). On hit, return data.
   - On miss, fetch from DB, store in Cache with a TTL, and return.
   - *Pros*: Resilient to cache failure, only requested data is cached.

2. **Write-Through**:
   - Application writes to Cache, and Cache immediately writes synchronously to DB before returning success.

3. **Cache Invalidation Strategies**:
   - **TTL (Time to Live)**: Automatic expiration ensuring eventual consistency.
   - **Event-Driven Eviction**: Publishing messages (e.g. Kafka/Redis PubSub) on record updates to delete stale cached keys.`,
    tags: ['System Design', 'Caching', 'Redis', 'Cache-Aside', 'Scalability'],
    keyTakeaways: [
      'Cache-Aside is the standard read-heavy caching pattern.',
      'Always set reasonable TTLs to prevent memory leaks and permanent staleness.',
    ],
    isFeatured: true,
  },
  {
    category: 'System Design',
    topic: 'REST API Design & Security Best Practices',
    difficulty: 'Medium',
    question: 'What principles define a production-grade RESTful API and how do you secure it against common web vulnerabilities?',
    answer: `### REST API Principles:
- **Resource-Oriented URIs**: Use nouns rather than verbs (e.g. \`GET /api/v1/orders/123\`).
- **Standard HTTP Methods**: \`GET\` (Read), \`POST\` (Create), \`PUT/PATCH\` (Update), \`DELETE\` (Remove).
- **Statelessness**: Every request contains all necessary credentials and context; no server-side session affinity.
- **Accurate Status Codes**: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Server Error.

### Production Security Defenses:
1. **Authentication & Authorization**: Signed JWT with short expiry and HttpOnly secure cookies.
2. **Rate Limiting**: Token bucket or sliding window algorithm in Redis.
3. **Input Validation & Sanitization**: Schema validation (Zod/Joi) and parameterized SQL queries against SQLi.
4. **CORS Configuration**: Restrict allowed origins to trusted client domains.`,
    tags: ['System Design', 'REST API', 'Security', 'JWT', 'Rate Limiting'],
    keyTakeaways: [
      'REST APIs should use resource nouns, standard HTTP verbs, and clear status codes.',
      'Defend with parameterized queries, strict JWT validation, rate limiting, and input sanitization.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // HR & BEHAVIORAL
  // ----------------------------------------------------
  {
    category: 'HR',
    topic: 'STAR Method & Conflict Resolution',
    difficulty: 'Easy',
    question: 'Describe a challenging technical disagreement you had in a team project and how you resolved it using the STAR method.',
    answer: `Use the **STAR Method** (Situation, Task, Action, Result) to structure technical behavioral answers:

- **Situation**: "During our 3rd-year capstone project, our 4-person team was building a real-time event booking platform under a tight 3-week deadline."
- **Task**: "We had a sharp disagreement on database architecture: one teammate wanted MongoDB for schema flexibility, while I advocated PostgreSQL because booking seats required strict ACID transactions and foreign-key seat locking."
- **Action**: "Rather than arguing hypothetically, I organized a 30-minute benchmark spike. I created a simulated race condition where two users booked the exact same seat simultaneously. I demonstrated that PostgreSQL row-level locks (\`SELECT ... FOR UPDATE\`) guaranteed zero double-bookings natively with clean SQL constraints, while MongoDB required complex two-phase commit logic. We agreed on PostgreSQL for transactions and Redis for session caching."
- **Result**: "We delivered the project 3 days ahead of schedule with zero double-booking bugs during our professor's live stress-testing demo and earned an A grade."`,
    tags: ['HR', 'Behavioral', 'STAR Method', 'Conflict Resolution', 'Soft Skills'],
    keyTakeaways: [
      'Structure behavioral answers using Situation -> Task -> Action -> Result.',
      'Resolve technical disagreements through objective benchmarking and data rather than opinions.',
    ],
    isFeatured: true,
  },
  {
    category: 'HR',
    topic: 'Tell Me About Yourself (Present-Past-Future)',
    difficulty: 'Easy',
    question: 'How should you answer "Tell me about yourself" in a technical software engineering interview?',
    answer: `Use the structured **Present → Past → Future** formula (keep it under 90 seconds):

1. **Present**: "I am currently a Computer Science student with a deep passion for building scalable distributed systems and full-stack web applications. Recently, I have been focused on designing microservices with Node.js, PostgreSQL, and Redis."
2. **Past**: "During my coursework and hackathons, I built several production-grade systems, including a real-time collaborative code editor that handles concurrent edits via WebSockets, where I learned the nuances of handling race conditions and low-latency state synchronization."
3. **Future**: "I'm excited about this Software Engineer role at [Company] because your team is solving large-scale high-throughput challenges in [Domain], and I am eager to contribute my backend engineering and problem-solving skills to your core products."`,
    tags: ['HR', 'Introduction', 'Elevator Pitch', 'Soft Skills'],
    keyTakeaways: [
      'Keep self-introduction concise (60-90 seconds) following Present -> Past -> Future.',
      'Highlight concrete technical achievements and connect directly to the target company mission.',
    ],
    isFeatured: true,
  },
];

module.exports = interviewQuestionsSeedData;
