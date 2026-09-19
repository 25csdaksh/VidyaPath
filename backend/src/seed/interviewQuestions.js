const interviewQuestionsSeedData = [
  // ----------------------------------------------------
  // DBMS & SQL
  // ----------------------------------------------------
  {
    category: 'DBMS',
    topic: 'Indexing & B-Trees',
    difficulty: 'Medium',
    question: 'How do B-Tree and B+ Tree indexes work in relational databases, and when should you avoid creating an index?',
    answer: `A B-Tree (and B+ Tree) is a self-balancing search tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time $O(\\log N)$.

### How it works:
1. **B+ Tree Architecture**: All data records (or record pointers) are stored in the leaf nodes, while internal nodes only store keys for routing.
2. **Linked Leaf Nodes**: Leaf nodes are doubly linked together, making sequential range scans (e.g. \`WHERE age BETWEEN 20 AND 30\`) extremely fast without re-traversing internal tree branches.
3. **Reduced Disk I/O**: Because each node fits in a disk page block (typically 4KB-16KB) with a high fan-out (100+ child pointers), tree height is very shallow (typically 3-4 levels for millions of rows), minimizing disk seeks.

### When to AVOID Indexing:
- **Low-Cardinality Columns**: Columns with very few distinct values (e.g., boolean flags \`is_active\`, gender \`M/F\`). The query planner will prefer a full table scan.
- **Heavy Write/Insert Tables**: Every \`INSERT\`, \`UPDATE\`, or \`DELETE\` requires updating the index tree, which introduces write overhead.
- **Small Tables**: For tables with only a few hundred rows, reading the entire table from memory is faster than tree traversal.
- **Unqueried Columns**: Indexes consume disk and memory (Buffer Pool) space.`,
    tags: ['DBMS', 'Indexing', 'B-Tree', 'B+Tree', 'SQL Optimization'],
    keyTakeaways: [
      'B+ Trees store all actual record pointers in leaf nodes linked sequentially.',
      'Indexing speeds up SELECT queries at the cost of slower INSERT/UPDATE operations and memory overhead.',
      'Avoid indexing low-cardinality columns.',
    ],
    commonPitfalls: ['Creating too many indexes on high-frequency write tables.', 'Assuming an index is always used without running EXPLAIN ANALYZE.'],
    isFeatured: true,
  },
  {
    category: 'DBMS',
    topic: 'ACID Properties & Transactions',
    difficulty: 'Medium',
    question: 'Explain the ACID properties of database transactions with real-world banking examples.',
    answer: `ACID guarantees that database transactions are processed reliably:

1. **Atomicity ("All or Nothing")**:
   - The entire transaction either completes successfully or rolls back completely with no partial changes.
   - *Example*: Transferring $100 from Account A to Account B requires deducting from A and adding to B. If the server crashes after deducting from A, the deduction is rolled back.

2. **Consistency**:
   - The database moves from one valid state to another, satisfying all constraints, cascades, and schema rules.
   - *Example*: Total money in Account A + Account B remains constant before and after transfer.

3. **Isolation**:
   - Concurrent transactions execute without interfering with one another. Intermediate states are invisible to other transactions.
   - Achieved via Isolation Levels: *Read Uncommitted, Read Committed, Repeatable Read, Serializable*.
   - *Example*: While Account A is transferring money to B, a third party querying A's balance will not see an uncommitted intermediate deduction.

4. **Durability**:
   - Once a transaction commits, changes are permanently recorded in non-volatile storage even in the event of a power outage or crash.
   - Achieved using **Write-Ahead Logging (WAL)** where logs are written to disk before database pages are flushed.`,
    tags: ['DBMS', 'ACID', 'Transactions', 'WAL', 'Isolation Levels'],
    keyTakeaways: [
      'Atomicity prevents partial execution via rollback logs.',
      'Isolation handles concurrency anomalies (Dirty Reads, Non-repeatable reads, Phantom reads).',
      'Durability is guaranteed using Write-Ahead Logging (WAL).',
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
| **Memory Space** | Has its own dedicated virtual address space (Code, Data, Heap, Stack). | Shares Code, Data, and Heap with parent process; has its own private Stack & Registers. |
| **Creation Cost** | High (allocating page tables, file descriptors, address space via \`fork()\`). | Low (allocating thread stack and control block). |
| **Communication** | Inter-Process Communication (IPC: Sockets, Pipes, Shared Memory, Message Queues). | Direct shared memory variables (requires Mutex / Semaphore synchronization). |
| **Fault Isolation** | High (if one process crashes, others are unaffected). | Low (an unhandled exception in one thread can crash the entire process). |

### Context Switching Overhead:
- **Thread Context Switch**: Saves CPU registers, Program Counter (PC), and stack pointer. Very fast because the memory address space remains unchanged.
- **Process Context Switch**: In addition to registers and PC, the OS must switch the memory address space (flushing the Translation Lookaside Buffer - TLB and swapping page table registers), which causes significant CPU cache misses and higher latency.`,
    tags: ['Operating Systems', 'Processes', 'Threads', 'Concurrency', 'Context Switching'],
    keyTakeaways: [
      'Threads share memory heap/code but have independent stacks.',
      'Process context switching flushes the TLB, incurring significant cache invalidation cost.',
    ],
    isFeatured: true,
  },
  {
    category: 'OS',
    topic: 'Virtual Memory & Page Replacement',
    difficulty: 'Hard',
    question: 'How does Virtual Memory work, what is a Page Fault, and how does the LRU (Least Recently Used) page replacement algorithm handle it?',
    answer: `### Virtual Memory Overview:
Virtual Memory gives each process the illusion of having a large, contiguous block of RAM, even if physical RAM is limited and fragmented.
- Memory is divided into fixed-size chunks called **Pages** (typically 4KB). Physical RAM is divided into matching **Frames**.
- The **Memory Management Unit (MMU)** uses **Page Tables** to translate Virtual Addresses to Physical Addresses.
- **TLB (Translation Lookaside Buffer)** acts as a hardware cache for fast address translations.

### What is a Page Fault?
A Page Fault occurs when a program tries to access a virtual memory page that is not currently mapped into physical RAM (it has been swapped out to disk or not yet loaded).
1. The CPU raises a Page Fault interrupt.
2. The OS traps into kernel mode and identifies the missing page on disk (swap space).
3. If physical RAM is full, a **Page Replacement Algorithm** selects a "victim frame" to evict to disk.
4. The requested page is read from disk into the freed frame, the page table is updated, and the instruction restarts.

### LRU (Least Recently Used) Page Replacement:
- Evicts the page that has not been accessed for the longest period of time (based on temporal locality).
- Implementation: Can be implemented in $O(1)$ time using a **Doubly Linked List + Hash Map** (HashMap stores node pointers; most recently accessed page moves to the head; eviction drops from the tail).`,
    tags: ['Operating Systems', 'Virtual Memory', 'Page Fault', 'LRU Cache', 'Paging'],
    keyTakeaways: [
      'Virtual memory translates virtual addresses to physical frames using page tables and the TLB.',
      'Page fault triggers disk I/O to load missing memory pages into RAM.',
      'LRU exploits temporal locality to minimize page faults.',
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
Before data can be transmitted over TCP, a reliable bidirectional connection is established:
1. **SYN**: Client sends a SYN segment with an Initial Sequence Number ($ISN_C$) to the server. (State: *SYN_SENT*)
2. **SYN-ACK**: Server acknowledges with ACK ($ISN_C + 1$) and sends its own Initial Sequence Number ($ISN_S$). (State: *SYN_RCVD*)
3. **ACK**: Client acknowledges with ACK ($ISN_S + 1$). The connection is now in *ESTABLISHED* state and data transmission can begin.

### TCP vs UDP Comparison:

| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (Handshake required) | Connectionless (Fire and forget) |
| **Reliability** | Guaranteed delivery (retransmits lost packets) | No guarantee (packets may drop or arrive out-of-order) |
| **Ordering** | Strict sequence ordering | No ordering guarantees |
| **Overhead** | Header size: 20-60 bytes | Minimal header: 8 bytes |
| **Flow/Congestion** | Yes (Sliding Window & Congestion Control) | None (transmits at application rate) |
| **Use Cases** | Web pages (HTTP/HTTPS), Email (SMTP), File Transfer (FTP), Databases | Live streaming, DNS, VoIP, Online multiplayer gaming, WebRTC |`,
    tags: ['Computer Networks', 'TCP', 'UDP', '3-Way Handshake', 'Protocols'],
    keyTakeaways: [
      'TCP handshake establishes sequence numbers and confirms bidirectional connectivity.',
      'UDP trades reliability for ultra-low latency and minimal packet overhead.',
    ],
    isFeatured: true,
  },

  // ----------------------------------------------------
  // SYSTEM DESIGN & HIGH CONCURRENCY
  // ----------------------------------------------------
  {
    category: 'System Design',
    topic: 'Horizontal vs Vertical Scaling & Caching Strategies',
    difficulty: 'Hard',
    question: 'How do you design a multi-tier caching layer for a high-traffic web application? Explain Cache-Aside, Write-Through, and Cache Invalidation.',
    answer: `### Caching Patterns:

1. **Cache-Aside (Lazy Loading)**:
   - Application first checks the Cache (e.g. Redis).
   - If *Cache Hit*, return data immediately.
   - If *Cache Miss*, read from primary DB, store in Cache with a TTL, and return.
   - *Pros*: Only requested data is cached; cache node failures are resilient.
   - *Cons*: Cache miss incurs 3 round trips (Cache -> DB -> Cache write).

2. **Write-Through**:
   - Application writes data to the Cache, and the Cache immediately writes synchronously to the DB before confirming success.
   - *Pros*: Cache is never stale; read hits are guaranteed fresh.
   - *Cons*: Slower writes due to dual synchronous writes.

3. **Write-Back (Write-Behind)**:
   - Application writes to Cache only; Cache asynchronously batches writes to the DB in the background.
   - *Pros*: Ultra-fast write throughput.
   - *Cons*: Risk of data loss if cache crashes before flushing to disk.

### Cache Invalidation Strategies:
- **TTL (Time to Live)**: Automatic expiration ensuring eventually consistent freshness.
- **Event-Driven Eviction**: Publishing events (e.g. Redis Pub/Sub, Kafka) when a record updates to delete/invalidate the cached key explicitly.`,
    tags: ['System Design', 'Caching', 'Redis', 'Cache-Aside', 'Scalability'],
    keyTakeaways: [
      'Cache-Aside is the most popular read-heavy pattern.',
      'Always set reasonable TTLs to prevent memory leaks and permanent staleness.',
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
];

module.exports = interviewQuestionsSeedData;
