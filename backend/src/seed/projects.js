const projectsSeedData = [
  // ----------------------------------------------------
  // BACKEND / SYSTEM DESIGN
  // ----------------------------------------------------
  {
    title: 'Distributed Rate Limiter with Redis & Token Bucket Algorithm',
    slug: 'distributed-rate-limiter-redis',
    category: 'Backend',
    difficulty: 'HIGH',
    description: 'High-throughput API rate limiting middleware using the Token Bucket and Sliding Window Log algorithms across distributed microservices.',
    problemStatement: 'Modern APIs face brute-force attacks and resource exhaustion from unthrottled traffic. Standard in-memory rate limiting fails across multiple horizontal Node.js replicas.',
    targetUsers: 'API Gateway engineers, SaaS platform teams, and backend microservice architects.',
    features: [
      { title: 'Token Bucket & Sliding Window', description: 'Dual algorithm support with millisecond-precision Lua scripts in Redis.' },
      { title: 'Tiered IP & API Key Quotas', description: 'Dynamic rate tiers (Free: 60 req/min, Pro: 1000 req/min, Enterprise: Custom).' },
      { title: 'Standard HTTP 429 Headers', description: 'Includes X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After headers.' },
    ],
    mvp: {
      scope: 'Express middleware connected to Redis Cluster evaluating 10,000 req/sec under 2ms latency overhead.',
      coreMilestones: ['Implement Redis atomic Lua scripts', 'Benchmark with autocannon / k6', 'Integrate with Express/Fastify'],
    },
    technologyStack: {
      frontend: ['React (Admin Dashboard)'],
      backend: ['Node.js', 'Express.js', 'Go (Optional Proxy)'],
      database: ['Redis (Cluster / Sentinel)', 'PostgreSQL (Usage Logs)'],
      devops: ['Docker', 'Prometheus', 'Grafana'],
      tools: ['k6 (Load Testing)', 'Jest'],
    },
    prerequisites: ['Redis data structures', 'Operating System concurrency', 'Express middleware pipeline'],
    architecture: {
      pattern: 'Distributed Gateway Middleware with In-Memory Caching',
      overview: 'Incoming requests pass through an Express middleware that executes an atomic Redis Lua script checking remaining tokens before proxying to internal services.',
      diagramNotes: 'Client -> Nginx Load Balancer -> Node.js Gateway -> Redis Cluster -> Service Workers',
    },
    databaseRequirements: {
      type: 'Redis Key-Value + PostgreSQL Relational Logs',
      schemaDesign: 'Key format: ratelimit:{apiKey}:{windowMinute}, TTL: 60 seconds.',
      indexingStrategy: 'Composite index on { api_key, created_at } in Postgres logs.',
    },
    apiRequirements: [
      { method: 'GET', endpoint: '/api/v1/resource', description: 'Protected demo endpoint throttled by the middleware', authRequired: true },
      { method: 'GET', endpoint: '/api/v1/metrics/usage', description: 'Real-time throughput and quota utilization metrics', authRequired: true },
    ],
    security: ['API Key hashing via SHA-256', 'Redis AUTH password and TLS in transit', 'NoSQL injection prevention'],
    testing: ['Unit tests for token refill math', 'Concurrency race condition tests using 100 simultaneous workers'],
    deployment: {
      targetPlatform: 'Docker Container on AWS ECS / DigitalOcean Droplet',
      ciCdGuide: 'GitHub Actions running k6 performance regression tests before image build.',
    },
    futureScope: ['Dynamic penalty box for persistent offenders', 'Geographic IP clustering'],
    resumeGuidance: {
      impactKeywords: ['Distributed Systems', 'Redis Lua Scripts', 'Rate Limiting', 'High Concurrency', 'k6 Benchmarking'],
      bulletPointTemplates: [
        'Architected a distributed rate limiter in Node.js and Redis utilizing atomic Lua scripts to eliminate race conditions under 10,000 req/sec load.',
        'Reduced API latency overhead to <1.8ms while maintaining accurate sliding-window quota enforcement across 4 horizontally scaled replicas.',
      ],
    },
    interviewQuestions: [
      { question: 'Why use Lua scripts instead of standard Redis GET and SET commands?', expectedTalkingPoints: 'Atomic execution on Redis single thread eliminates race conditions without distributed locks.' },
      { question: 'Compare Token Bucket vs Leaky Bucket vs Sliding Window Counter.', expectedTalkingPoints: 'Token Bucket allows bursts up to bucket capacity; Leaky Bucket forces constant rate; Sliding Window prevents double-burst at boundary.' },
    ],
    status: 'Published',
  },

  // ----------------------------------------------------
  // GENERATIVE AI / LLM
  // ----------------------------------------------------
  {
    title: 'AI Resume & ATS Skill Analyzer with Retrieval-Augmented Generation (RAG)',
    slug: 'ai-resume-ats-analyzer-rag',
    category: 'Generative AI / LLM',
    difficulty: 'MEDIUM',
    description: 'Intelligent resume screening platform using PDF parsing, vector embeddings, and LLM prompting to score candidate resumes against job descriptions.',
    problemStatement: 'Job seekers struggle to understand ATS rejection reasons, while recruiters receive hundreds of unstructured resumes with no automated keyword/skill semantic alignment.',
    targetUsers: 'Job candidates, university career centers, and technical recruiters.',
    features: [
      { title: 'PDF Parsing & Section Chunking', description: 'Extracts Education, Experience, Skills, and Projects cleanly.' },
      { title: 'Semantic Vector Match Score', description: 'Calculates cosine similarity between resume chunks and job requirements.' },
      { title: 'Actionable Improvement Suggestions', description: 'Gives targeted feedback on missing technologies and phrasing.' },
    ],
    mvp: {
      scope: 'Upload single-page tech resume PDF, paste Job Description, and receive an ATS match score with line-by-line feedback.',
      coreMilestones: ['PDF text extraction with pdf-parse', 'Embedding generation via OpenAI / HuggingFace', 'Cosine similarity ranking'],
    },
    technologyStack: {
      frontend: ['React', 'TypeScript', 'Tailwind/Vanilla CSS'],
      backend: ['Node.js', 'Express.js', 'Python (FastAPI microservice)'],
      database: ['ChromaDB / Pinecone (Vector Store)', 'MongoDB (User Resumes)'],
      devops: ['Docker', 'AWS S3 (Encrypted PDF storage)'],
      tools: ['OpenAI API / Llama 3', 'pdf-parse'],
    },
    prerequisites: ['Vector embeddings concepts', 'REST API design', 'Basic Python/Node async flows'],
    architecture: {
      pattern: 'Client-Server with Vector Semantic RAG Microservice',
      overview: 'The frontend uploads a resume to Node.js backend -> parses text -> Python embedding worker generates dense vectors -> ChromaDB queries similarity against JD -> LLM synthesizes actionable critique.',
    },
    databaseRequirements: {
      type: 'MongoDB Document + ChromaDB Vector Store',
      schemaDesign: 'MongoDB stores user resume metadata; ChromaDB stores 1536-dim embedding vectors per section chunk.',
    },
    apiRequirements: [
      { method: 'POST', endpoint: '/api/v1/resume/analyze', description: 'Upload PDF and JD for real-time analysis', authRequired: true },
      { method: 'GET', endpoint: '/api/v1/resume/history', description: 'List historical resume scores', authRequired: true },
    ],
    security: ['Zero retention of private candidate data without consent', 'PDF malware/bomb validation', 'Sanitized prompts against prompt injection'],
    testing: ['Tested against 50 diverse resume formats (Harvard, Deedy, LaTeX)', 'Semantic score correlation validation'],
    deployment: {
      targetPlatform: 'Vercel (Frontend) + Render / AWS ECS (Backend)',
    },
    futureScope: ['Direct export of optimized LaTeX / Markdown templates', 'Real-time job board integration'],
    resumeGuidance: {
      impactKeywords: ['RAG Pipeline', 'Vector Databases', 'Semantic Search', 'LangChain / LlamaIndex', 'Cosine Similarity'],
      bulletPointTemplates: [
        'Built an AI resume scoring engine using ChromaDB vector search and LLMs, achieving an 89% accuracy correlation with human technical recruiter evaluations.',
        'Engineered an asynchronous text-chunking pipeline processing multi-page PDFs in under 1.5 seconds using Node.js streams and AWS S3.',
      ],
    },
    interviewQuestions: [
      { question: 'What is cosine similarity and why is it preferred over Euclidean distance for embeddings?', expectedTalkingPoints: 'Cosine similarity measures angular direction rather than magnitude, which normalizes for text length differences.' },
      { question: 'How do you mitigate prompt injection when passing user-uploaded resume text to an LLM?', expectedTalkingPoints: 'Strict input boundary delimiters, schema-constrained output parsing (JSON schema), and separate system prompts.' },
    ],
    status: 'Published',
  },

  // ----------------------------------------------------
  // CYBERSECURITY / NETWORKING
  // ----------------------------------------------------
  {
    title: 'Automated Web Vulnerability & Port Scanner (OWASP Top 10)',
    slug: 'web-vulnerability-port-scanner',
    category: 'Cybersecurity',
    difficulty: 'MEDIUM',
    description: 'Security auditing tool that performs automated TCP port scanning, HTTP security header verification, and detects common web vulnerabilities (XSS, SQLi, CORS misconfigurations).',
    problemStatement: 'Developers frequently deploy web applications with exposed administrative ports, missing security headers (CSP, HSTS), and vulnerable query parameters without automated audits.',
    targetUsers: 'Security engineers, ethical hackers, and dev teams conducting pre-deployment checks.',
    features: [
      { title: 'Concurrent TCP SYN Port Scanner', description: 'Scans common ports (21, 22, 80, 443, 3306, 5432, 27017) using worker threads.' },
      { title: 'Security Header Audit', description: 'Evaluates Content-Security-Policy, HSTS, X-Frame-Options, and CORS policies.' },
      { title: 'SQLi & XSS Surface Probe', description: 'Injects non-destructive test payloads into query parameters to detect error-based SQLi.' },
    ],
    mvp: {
      scope: 'Command-line tool + Web UI scanning a given target domain and generating a detailed PDF/JSON security audit report.',
      coreMilestones: ['Socket-based port scanner in Node/Python', 'HTTP response header parser', 'Report generator'],
    },
    technologyStack: {
      frontend: ['React', 'Chart.js'],
      backend: ['Node.js (net module)', 'Python (Scapy / Requests)'],
      database: ['SQLite / MongoDB (Scan Reports)'],
      devops: ['Docker'],
      tools: ['Nmap', 'Wireshark'],
    },
    prerequisites: ['TCP/IP protocol fundamentals', 'HTTP header mechanics', 'OWASP vulnerability standards'],
    architecture: {
      pattern: 'Worker Task Queue with Report Generator',
      overview: 'User enters target URL -> Node.js queues scan job in Redis Bull queue -> worker executes socket probes -> aggregates findings -> generates severity scorecard.',
    },
    databaseRequirements: {
      type: 'MongoDB',
      schemaDesign: 'ScanResult collection storing target, openPorts array, vulnerabilities array with CVSS severity scores.',
    },
    apiRequirements: [
      { method: 'POST', endpoint: '/api/v1/scan', description: 'Initiate a security scan on authorized domain', authRequired: true },
      { method: 'GET', endpoint: '/api/v1/scan/:id/report', description: 'Fetch completed vulnerability report', authRequired: true },
    ],
    security: ['Strict domain ownership verification (DNS TXT or meta tag) before full scan', 'Rate-limited probing to prevent accidental DoS'],
    testing: ['Tested against intentionally vulnerable test targets (DVWA / OWASP Juice Shop)'],
    deployment: {
      targetPlatform: 'Docker container with raw network socket permissions',
    },
    futureScope: ['SSL/TLS certificate expiration & cipher suite analyzer', 'Scheduled weekly scans'],
    resumeGuidance: {
      impactKeywords: ['OWASP Top 10', 'Socket Programming', 'TCP Port Scanner', 'Security Auditing', 'Vulnerability Assessment'],
      bulletPointTemplates: [
        'Developed an automated vulnerability scanner auditing 15+ OWASP Top 10 vectors and TCP ports with asynchronous worker threads.',
        'Engineered strict domain-verification protocols preventing unauthorized scanning and generated CVSS-scored vulnerability reports.',
      ],
    },
    interviewQuestions: [
      { question: 'Explain how a TCP 3-way handshake works and what a SYN scan is.', expectedTalkingPoints: 'SYN scan sends SYN packet; if SYN-ACK is received, port is open; scanner sends RST to tear down without completing handshake.' },
      { question: 'What is the purpose of Content-Security-Policy (CSP) headers?', expectedTalkingPoints: 'Restricts sources from which scripts, styles, and media can be loaded, preventing Cross-Site Scripting (XSS) attacks.' },
    ],
    status: 'Published',
  },

  // ----------------------------------------------------
  // FULL STACK / REAL-TIME
  // ----------------------------------------------------
  {
    title: 'Collaborative Real-Time Code Editor with Operational Transformation & WebSockets',
    slug: 'realtime-collaborative-code-editor',
    category: 'Full Stack',
    difficulty: 'HIGH',
    description: 'Multiplayer code editor enabling simultaneous editing by multiple developers with live cursor presence, syntax highlighting, and code execution.',
    problemStatement: 'Remote technical interviews and pair programming require real-time conflict-free collaborative text editing and synchronized execution.',
    targetUsers: 'Remote developers, interviewers, and student study groups.',
    features: [
      { title: 'Operational Transformation / CRDT', description: 'Conflict-free synchronized document state across concurrent keystrokes.' },
      { title: 'Live Multi-Cursor Presence', description: 'Displays color-coded user cursors and text selections in real time.' },
      { title: 'Isolated Code Execution Sandbox', description: 'Runs Python, JavaScript, C++, and Java inside secure Docker containers.' },
    ],
    mvp: {
      scope: 'Create room, share link, 4 users edit code simultaneously with zero desync, and execute code returning stdout/stderr.',
      coreMilestones: ['Monaco Editor integration', 'WebSocket room broadcast server', 'Docker execution container'],
    },
    technologyStack: {
      frontend: ['React', 'Monaco Editor (VS Code engine)', 'WebSockets (Socket.io / Yjs)'],
      backend: ['Node.js', 'Express.js', 'Socket.io', 'Docker Engine API'],
      database: ['Redis (Pub/Sub & Room State)', 'PostgreSQL (Snippet Archive)'],
      devops: ['Docker', 'AWS EC2'],
      tools: ['Yjs (CRDT)', 'Judge0 / Custom Sandbox'],
    },
    prerequisites: ['WebSockets protocol', 'CRDT / OT algorithms', 'Docker sandbox execution'],
    architecture: {
      pattern: 'Event-Driven WebSocket Hub with Sandboxed Worker Pool',
      overview: 'React Monaco editor binds to Yjs CRDT -> synchronizes document deltas via Socket.io to Node.js backend -> Redis Pub/Sub distributes updates across server nodes -> code execution runs in ephemeral Docker containers.',
    },
    databaseRequirements: {
      type: 'Redis In-Memory State + PostgreSQL Snippet Archive',
      schemaDesign: 'Rooms stored in Redis with 24-hour TTL; saved project snapshots saved in Postgres.',
    },
    apiRequirements: [
      { method: 'POST', endpoint: '/api/v1/rooms', description: 'Create a new collaboration session', authRequired: true },
      { method: 'POST', endpoint: '/api/v1/rooms/:id/run', description: 'Execute code in secure Docker sandbox', authRequired: true },
    ],
    security: ['Docker container resource limits (512MB RAM, 1 CPU core, no network access, 5s timeout)', 'Sanitized code inputs'],
    testing: ['Simulated 50 concurrent keystrokes from 5 clients to verify document convergence with zero character loss'],
    deployment: {
      targetPlatform: 'AWS EC2 with Docker daemon socket access',
    },
    futureScope: ['Voice/Video WebRTC integration', 'Git repo clone & commit integration'],
    resumeGuidance: {
      impactKeywords: ['CRDT / Yjs', 'WebSockets / Socket.io', 'Monaco Editor', 'Docker Sandboxing', 'Real-Time Collaboration'],
      bulletPointTemplates: [
        'Built a real-time collaborative code editor using Monaco Editor, Yjs CRDT, and WebSockets, achieving sub-40ms document synchronization across distributed clients.',
        'Engineered an isolated Docker code execution sandbox executing C++, Python, and Java with CPU/memory constraints and 5-second timeouts.',
      ],
    },
    interviewQuestions: [
      { question: 'How do CRDTs (Conflict-free Replicated Data Types) resolve concurrent edits without a central locking server?', expectedTalkingPoints: 'State-based or operation-based mathematical commutativity where operations can be applied in any order yielding the identical final state.' },
      { question: 'How do you prevent a malicious user from running `rm -rf /` or a fork bomb in an online compiler?', expectedTalkingPoints: 'Non-root execution in unprivileged Docker containers, seccomp profiles, disabling network interfaces, and strict cgroups memory/PID limits.' },
    ],
    status: 'Published',
  },

  // ----------------------------------------------------
  // CLOUD / DEVOPS / INFRASTRUCTURE
  // ----------------------------------------------------
  {
    title: 'Automated Microservices CI/CD Pipeline & Monitoring Dashboard with Prometheus',
    slug: 'microservices-cicd-prometheus-monitoring',
    category: 'Cloud / DevOps',
    difficulty: 'MEDIUM',
    description: 'Production-ready infrastructure boilerplate with Docker containerization, GitHub Actions CI/CD, Kubernetes manifests, and Prometheus/Grafana observability metrics.',
    problemStatement: 'Engineering students often build monolithic projects without learning production deployment pipelines, container orchestration, health monitoring, and zero-downtime releases.',
    targetUsers: 'DevOps engineers, cloud architects, and backend engineering teams.',
    features: [
      { title: 'Automated GitHub Actions Pipeline', description: 'Runs unit tests, static code analysis (SonarQube), builds Docker images, and pushes to DockerHub.' },
      { title: 'Kubernetes Rolling Deployments', description: 'Deployments, Services, Ingress, and Horizontal Pod Autoscaler (HPA) configs.' },
      { title: 'Prometheus & Grafana Metrics', description: 'Live dashboard tracking request rates, p95/p99 latencies, CPU/Memory saturation, and 5xx error rates.' },
    ],
    mvp: {
      scope: 'Deploy a multi-tier microservice on a local Minikube/K3s or AWS EKS cluster with full monitoring dashboard.',
      coreMilestones: ['Multi-stage Dockerfile optimization', 'GitHub Actions workflow', 'Grafana metric dashboard export'],
    },
    technologyStack: {
      frontend: ['Grafana', 'React Admin'],
      backend: ['Node.js', 'Go'],
      database: ['PostgreSQL'],
      devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana', 'Helm'],
      tools: ['SonarQube', 'k6'],
    },
    prerequisites: ['Linux shell scripting', 'Docker container mechanics', 'Kubernetes core resources (Pods, Deployments, Services)'],
    architecture: {
      pattern: 'Container Orchestrated Microservices with Sidecar Metrics Exporter',
      overview: 'Microservices export Prometheus metrics on `/metrics` endpoint -> Prometheus server scrapes metrics every 15s -> Grafana visualizes RED metrics (Rate, Errors, Duration).',
    },
    databaseRequirements: {
      type: 'Prometheus Time-Series DB + PostgreSQL',
      schemaDesign: 'Time-series metric storage with 15-day retention policy.',
    },
    apiRequirements: [
      { method: 'GET', endpoint: '/metrics', description: 'Prometheus scrapable metrics format', authRequired: false },
      { method: 'GET', endpoint: '/healthz', description: 'Kubernetes liveness and readiness probe', authRequired: false },
    ],
    security: ['Kubernetes Secrets management', 'Role-Based Access Control (RBAC) in cluster', 'Read-only root filesystems on containers'],
    testing: ['Load testing with k6 triggering Kubernetes Horizontal Pod Autoscaler (HPA) from 2 to 6 pods'],
    deployment: {
      targetPlatform: 'AWS EKS / DigitalOcean Kubernetes / Minikube',
    },
    futureScope: ['ArgoCD GitOps deployment sync', 'Distributed tracing with OpenTelemetry and Jaeger'],
    resumeGuidance: {
      impactKeywords: ['CI/CD Pipelines', 'Kubernetes HPA', 'Prometheus & Grafana', 'RED Metrics', 'Docker Multi-Stage'],
      bulletPointTemplates: [
        'Engineered an automated CI/CD pipeline using GitHub Actions and Docker multi-stage builds, reducing image footprint by 65% and deployment cycle time by 80%.',
        'Configured Prometheus and Grafana dashboards monitoring RED metrics and set up Kubernetes HPA scaling pods dynamically under load.',
      ],
    },
    interviewQuestions: [
      { question: 'What is the difference between Liveness Probe and Readiness Probe in Kubernetes?', expectedTalkingPoints: 'Liveness restarts failed containers; Readiness removes pod from service load balancing until it is ready to accept traffic.' },
      { question: 'Explain the RED method and the USE method in systems monitoring.', expectedTalkingPoints: 'RED = Rate, Errors, Duration (request-centric); USE = Utilization, Saturation, Errors (resource-centric).' },
    ],
    status: 'Published',
  },
];

module.exports = projectsSeedData;
