// Hackathon Student Complete Playbook Data (Sections 1 to 22)
// Comprehensive guide for CSE students: Problem -> Analysis -> Team -> Solution -> Prototype -> PPT -> Demo -> Pitch -> Q&A

export const HACKATHON_PLAYBOOK_OVERVIEW = {
  title: "Hackathon Student Complete Playbook",
  subtitle: "Problem Statement → Analysis → Team → Solution → Prototype → PPT → Demo → Pitch → Q&A",
  tagline: "A practical engineering & product handbook for CSE students competing in 24h/36h/48h hackathons, SIH, and global developer challenges.",
  formula: "PROBLEM → USER → ROOT CAUSE → MVP → ARCHITECTURE → BUILD → TEST → DEPLOY → DEMO → PITCH → Q&A",
  corePrinciples: [
    {
      title: "Problem Over Features",
      desc: "The goal is not to build every possible feature. The goal is to identify the most critical user pain point and prove a credible, working solution.",
      icon: "Target",
      color: "var(--navy-800, #312e81)"
    },
    {
      title: "End-to-End Golden Path",
      desc: "A small working end-to-end user flow (Input → Process → Output) beats a 10-screen broken mockup every single time in front of judges.",
      icon: "Zap",
      color: "var(--color-success, #0d9488)"
    },
    {
      title: "Evidence & Validation",
      desc: "Judges look for real data, measurable test results, legitimate user persona grounding, and clear technical reasoning for your stack.",
      icon: "Award",
      color: "var(--navy-700, #103b9b)"
    },
    {
      title: "Communication & Delivery",
      desc: "Great engineering with a chaotic pitch loses. Moderate engineering with a stellar problem hook, live demo, and crisp Q&A wins podiums.",
      icon: "Sparkles",
      color: "var(--color-warning, #d97706)"
    }
  ]
};

// Section 2: Before the Hackathon Preparation Checklist (7 Items)
export const PRE_HACKATHON_CHECKLIST = [
  {
    id: "prep_skills",
    category: "Team Audit",
    title: "1. Know Your Team's Concrete Skillsets",
    description: "Map out who excels in Frontend (React/Next.js/Tailwind), Backend (Node/FastAPI/Spring), AI/ML (PyTorch/RAG/APIs), Database (Postgres/MongoDB), UI/UX (Figma), and Presentation/Research.",
    tip: "Do not guess during kickoff. Assign a primary and secondary role to all 3-5 members beforehand."
  },
  {
    id: "prep_starter",
    category: "Code Starters",
    title: "2. Maintain a Reusable Project Starter Kit",
    description: "Keep a tested GitHub template with React + Vite/Next.js frontend, Express/FastAPI backend, pre-configured JWT/OAuth auth boilerplate, standard folder structure, and a clean README.",
    tip: "Never spend the first 3 hours configuring Tailwind, ESLint, or CORS errors from scratch."
  },
  {
    id: "prep_design",
    category: "Assets & Design",
    title: "3. Pre-Build Design System & PPT Slide Template",
    description: "Have a clean Figma UI kit (colors, button variants, card layouts, Lucide icon pack) and a 12-slide standard presentation deck ready with dark/light themes.",
    tip: "Consistent typography and cohesive colors make your prototype look 10x more mature."
  },
  {
    id: "prep_git",
    category: "Version Control",
    title: "4. Drill Git Branching & Merge Protocol",
    description: "Ensure every member knows how to create feature branches, commit meaningful diffs, pull remote main, rebase/merge, and resolve merge conflicts quickly without panicking.",
    tip: "Rule: Never push broken code directly to 'main'. Branch out -> Test locally -> PR / Fast Merge."
  },
  {
    id: "prep_tools",
    category: "Tech Stack",
    title: "5. Pre-Select Known APIs, SDKs & Toolchains",
    description: "Prepare a curated cheat sheet of trusted APIs (OpenAI/Gemini/Groq, Supabase/Firebase, Stripe/Razorpay mock, Mapbox, Twilio/SendGrid, WebSockets).",
    tip: "Hackathons are for solving problems with reliable tools, not for learning an esoteric language from zero."
  },
  {
    id: "prep_mockdata",
    category: "Data Readiness",
    title: "6. Seed Demo & Synthetic Test Datasets",
    description: "Prepare realistic dummy data (JSON/CSV) for edge scenarios. Clearly label synthetic data so judges respect transparency.",
    tip: "A healthcare or logistics demo looks amateurish with 'test1', 'asdf' and placeholder Lorem Ipsum."
  },
  {
    id: "prep_comms",
    category: "Team Protocol",
    title: "7. Establish Communication & Blocker Protocol",
    description: "Agree on one central task board (GitHub Projects / Trello / Notion), setup a Discord/WhatsApp war room, and designate a Tech Lead who breaks ties when time is tight.",
    tip: "If a teammate is blocked for >20 minutes, they must report it immediately."
  }
];

// Section 3: 10-Question Problem Statement Analysis Method
export const PROBLEM_ANALYSIS_10_QUESTIONS = [
  {
    num: 1,
    question: "What is the exact problem?",
    prompt: "Rewrite the problem in your own words in 1–2 crisp, unambiguous sentences.",
    example: "Small rural clinics struggle to track vaccine cold-chain compliance, leading to 24% spoiled doses going undetected before administration."
  },
  {
    num: 2,
    question: "Who is affected? (Primary & Secondary)",
    prompt: "Identify the exact primary user persona (who operates the tool) and secondary stakeholders (beneficiaries, regulators, managers).",
    example: "Primary: Clinic nurses and field health workers. Secondary: District medical officers and rural patients."
  },
  {
    num: 3,
    question: "What happens today? (Current Workflow)",
    prompt: "Understand step-by-step how the user attempts to solve or work around this pain point today without your solution.",
    example: "Workers log analog dial temperatures on paper clipboards twice daily; logs are filed in physical binders and audited monthly."
  },
  {
    num: 4,
    question: "Why is it a problem? (Quantified Impact)",
    prompt: "Identify the cost, time wasted, safety risk, accessibility gap, or operational friction caused by the current process.",
    example: "Zero real-time alerts if power fails overnight; ruined batches cost ₹1.8M annually and risk delivering ineffective vaccines to children."
  },
  {
    num: 5,
    question: "What are the explicit requirements?",
    prompt: "Extract every non-negotiable requirement directly mentioned in the hackathon statement or theme guidelines.",
    example: "Must operate offline/low-bandwidth, support multi-lingual input, and provide an automated alert dispatch mechanism."
  },
  {
    num: 6,
    question: "What is implied but not stated? (Assumptions)",
    prompt: "List necessary assumptions separately. Never present an unverified assumption as a proven fact to judges.",
    example: "Assumed: Users have basic Android smartphones with intermittent 2G/4G connectivity at least once every 24 hours."
  },
  {
    num: 7,
    question: "What data is available or required?",
    prompt: "Identify input data, expected output, source format, sampling frequency, privacy constraints, and compliance factors.",
    example: "Input: IoT sensor telemetry / manual dial scan via camera. Output: Temperature threshold alert + tamper-evident audit log."
  },
  {
    num: 8,
    question: "What constraints exist?",
    prompt: "Audit time limits, cloud compute budget, hardware limitations, offline requirements, security rules, and user digital literacy.",
    example: "24-hour hackathon build time, zero budget for expensive proprietary hardware sensors, must run on low-end mobile browsers."
  },
  {
    num: 9,
    question: "What would make a useful MVP?",
    prompt: "Select the absolute smallest demonstrable feature set that fully proves the core hypothesis from input to output.",
    example: "1) Mobile camera photo upload -> OCR reads dial -> Threshold check -> WhatsApp alert trigger -> Real-time admin dashboard map."
  },
  {
    num: 10,
    question: "How will success be measured?",
    prompt: "Define 2–5 concrete, measurable or demonstrable outcomes you will present during your pitch.",
    example: "1) OCR dial detection latency < 800ms. 2) Offline sync queue works without data loss. 3) Simulated 100% alert dispatch rate."
  }
];

// Section 4: Problem Statement Analysis Template (12 Fields)
export const PROBLEM_STATEMENT_TEMPLATE_FIELDS = [
  { field: "Problem", key: "problem", placeholder: "One clear sentence describing the core pain point." },
  { field: "Target User", key: "targetUser", placeholder: "Who will use or directly benefit from the solution?" },
  { field: "Current Process", key: "currentProcess", placeholder: "How the problem is handled today (manual, broken, expensive)." },
  { field: "Pain Points", key: "painPoints", placeholder: "3–5 concrete pain points (e.g. 1. High error rate, 2. No real-time visibility, 3. Manual delay)." },
  { field: "Root Cause", key: "rootCause", placeholder: "Why the problem occurs in the existing architecture or system." },
  { field: "Proposed Solution", key: "proposedSolution", placeholder: "One-sentence solution value proposition." },
  { field: "Core Features (MVP)", key: "coreFeatures", placeholder: "Only the 3-4 essential features needed for the live demonstration." },
  { field: "Technology Rationale", key: "techRationale", placeholder: "Why each specific framework, database, or API was chosen." },
  { field: "Data Flow", key: "dataFlow", placeholder: "Input data → Processing / AI logic → Output / Actionable result." },
  { field: "Success Metrics", key: "successMetrics", placeholder: "What measurable improvements or latency/accuracy benchmarks will be proven?" },
  { field: "Risks & Mitigations", key: "risks", placeholder: "Technical, data privacy, connectivity, or operational risks and fallbacks." },
  { field: "Future Scope", key: "futureScope", placeholder: "High-value features intentionally excluded from the hackathon MVP (Phase 2 & 3)." }
];

// Section 5: The 7-Step Build Method
export const BUILD_METHOD_7_STEPS = [
  {
    step: 1,
    name: "Understand",
    timeline: "0% - 5%",
    description: "Read the problem statement 3-5 times as a team. Highlight key users, pain points, mandatory constraints, and evaluation criteria. Align completely before opening your IDE.",
    action: "Team alignment session: No coding until everyone can explain the problem in one sentence."
  },
  {
    step: 2,
    name: "Research",
    timeline: "5% - 10%",
    description: "Inspect existing market solutions, research papers, public datasets, government portals, and competitor gaps. Identify why existing tools fail the target user.",
    action: "Document 2-3 direct competitor weaknesses and verify API feasibility."
  },
  {
    step: 3,
    name: "Define",
    timeline: "10% - 15%",
    description: "Lock the User Persona, Core MVP Scope (Must-Haves only), and 3 demonstrable success metrics. Cut every secondary idea to the 'Future Scope' list.",
    action: "Draft the 1-page Problem Analysis Document."
  },
  {
    step: 4,
    name: "Design",
    timeline: "15% - 25%",
    description: "Design the end-to-end User Flow, High-Level Architecture Diagram, Database Schema (tables & relationships), and API Request/Response JSON contracts.",
    action: "Figma wireframe of 3 core screens + Swagger/Postman JSON contract agreed by frontend & backend."
  },
  {
    step: 5,
    name: "Build",
    timeline: "25% - 70%",
    description: "Implement the critical path first! Connect Frontend -> API -> Database -> AI/ML/External Service. Make the end-to-end data loop work before polishing styling.",
    action: "Achieve First Golden Path Run (Data submitted on UI -> stored in DB -> displayed on Dashboard)."
  },
  {
    step: 6,
    name: "Validate",
    timeline: "70% - 85%",
    description: "Perform end-to-end user journey testing, edge case handling (empty states, invalid inputs, network delay), and security checks. Have a teammate test without any explanation.",
    action: "Fix 404s, unhandled promise rejections, CORS errors, and test on actual mobile viewport."
  },
  {
    step: 7,
    name: "Demo & Pitch",
    timeline: "85% - 100%",
    description: "Craft a crisp 12-slide presentation, seed realistic demo records, rehearse the 3-minute pitch with a stopwatch, prepare offline backup recordings, and divide Q&A roles.",
    action: "Run 3 complete dry runs with strict timing."
  }
];

// Section 6: MVP Bucketing (MoSCoW Framework)
export const MVP_BUCKETS = {
  mustHave: {
    title: "🟢 Must Have (Critical Path - 70% Effort)",
    rule: "Without these features, the solution CANNOT demonstrate the core problem being solved.",
    examples: [
      "User problem trigger (Input form / camera upload / telemetry stream)",
      "Core processing engine (Algorithm, LLM pipeline, business calculation)",
      "Primary output presentation (Real-time alert, status dashboard, recommendation card)",
      "Essential state persistence (Database record creation & retrieval)"
    ]
  },
  shouldHave: {
    title: "🟡 Should Have (Credibility & Usability - 20% Effort)",
    rule: "Features that significantly enhance usefulness, visual credibility, or judge trust if time allows.",
    examples: [
      "Authentication / Role-based views (e.g., Worker vs Supervisor portal)",
      "Interactive data visualizations (Recharts/Chart.js graphs instead of raw tables)",
      "Toast notifications and polished loading/empty states",
      "Export summary (PDF/CSV download report)"
    ]
  },
  couldHave: {
    title: "🔴 Could Have (Strictly Bonus - 10% Effort or Post-Hackathon)",
    rule: "Nice-to-have features that must NEVER endanger the core live demonstration.",
    examples: [
      "Social login (Google/GitHub OAuth) if basic email/mock login suffices",
      "Complex payment gateway integration when mock token flow is enough",
      "Dark/Light theme toggle (nice, but won't win a hackathon by itself)",
      "Multi-tenant billing or advanced microservice scaling"
    ]
  }
};

// Section 7: Team Formation & 7 Core Roles
export const TEAM_ROLES = [
  {
    id: "lead",
    role: "Team Lead / Product Owner",
    keyTasks: "Problem interpretation, MVP scope gating, task allocation, deadline tracking, architectural tie-breaker, and cross-team integration orchestration.",
    skillsNeeded: "Systems thinking, product clarity, agile coordination, decisive under pressure.",
    deliverables: "Scope Document, GitHub Project board, Final Integration sign-off."
  },
  {
    id: "research",
    role: "Research / Domain Specialist",
    keyTasks: "Deep-dive into regulations, user workflows, industry stats, competitor benchmarks, data sourcing, ROI calculation, and validation evidence.",
    skillsNeeded: "Analytical research, documentation, domain empathy, statistics synthesis.",
    deliverables: "Problem validation metrics, dataset curation, business model slide data."
  },
  {
    id: "frontend",
    role: "UI/UX & Frontend Engineer",
    keyTasks: "User flow architecture, responsive web/mobile interface, component system, state management, micro-interactions, and visual polish.",
    skillsNeeded: "React/Next.js, Tailwind/Vanilla CSS, Lucide icons, responsive layout, Figma.",
    deliverables: "High-fidelity interactive prototype, accessible web app, clean demo UI."
  },
  {
    id: "backend",
    role: "Backend & Database Architect",
    keyTasks: "REST/GraphQL API endpoints, database schema design, indexing, authentication middleware, business logic, and third-party webhooks.",
    skillsNeeded: "Node/Express, Python/FastAPI, PostgreSQL, Prisma/Mongoose, Docker.",
    deliverables: "Robust API server, seed scripts, error-handling middleware, API documentation."
  },
  {
    id: "aiml",
    role: "AI/ML & Data Engineer",
    keyTasks: "Dataset cleaning, prompt engineering/RAG pipeline, model fine-tuning or inference API integration, evaluation metrics (precision/recall/latency).",
    skillsNeeded: "Python, PyTorch/scikit-learn, LangChain/LlamaIndex, OpenAI/Gemini SDKs, Vector DB.",
    deliverables: "Working AI endpoint, response parser, prompt benchmark logs, fallback logic."
  },
  {
    id: "devops",
    role: "DevOps & QA Engineer",
    keyTasks: "Git branch management, CI/CD, cloud deployment (Vercel/Render/Fly.io), environment variables management, end-to-end testing, and demo disaster recovery.",
    skillsNeeded: "Docker, Vercel, Supabase, Bash, Postman test collections, logging.",
    deliverables: "Live HTTPS production URL, local backup server, seeded test users."
  },
  {
    id: "pitch",
    role: "Pitch Master & PPT Designer",
    keyTasks: "Pitch storyline crafting, 12-slide presentation design, speaker cue cards, live demo staging, timing rehearsal, and judge Q&A defense preparation.",
    skillsNeeded: "Storytelling, Canva/Figma/PowerPoint, public speaking, composure under questioning.",
    deliverables: "12-Slide Final PPT, Pitch Script, Backup Demo Video recording."
  }
];

// Section 8: Communication & Standup Protocol
export const COMMUNICATION_RULES = {
  rule1: "One Source of Truth: All tasks live on GitHub Projects, Trello, or Notion with Owner + Output + Deadline + Dependencies.",
  rule2: "Strict Status Format: Updates must use DONE / NEXT / BLOCKED syntax.",
  standupExample: {
    good: "Backend auth API is DONE. NEXT I am building the sensor ingestion webhook. BLOCKED because frontend hasn't finalized the JSON payload schema.",
    bad: "Working on backend."
  },
  rule3: "20-Minute Blocker Escalation: Never spend >20 minutes silently stuck on a library bug or environment issue without alerting the team.",
  rule4: "Interface Contract First: Frontend and Backend must agree on request/response JSON schemas BEFORE coding begins.",
  rule5: "Technical Disagreements Protocol: Compare evidence, implementation time required, and demo impact. If tied, Team Lead decides within 3 minutes.",
  rule6: "Final Architecture Freeze: Freeze all database schemas and major architectural changes at the 75% time mark."
};

// Section 9: GitHub Workflow for Hackathons
export const GITHUB_WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Protected 'main' Branch",
    desc: "'main' must ALWAYS remain stable and demo-ready. Never commit untested code directly to main."
  },
  {
    step: 2,
    title: "Short-Lived Feature Branches",
    desc: "Create branches named feat/login, feat/sensor-feed, feat/dashboard-ui, fix/cors-headers. Keep branches focused on single tasks."
  },
  {
    step: 3,
    title: "Small, Atomic Commits",
    desc: "Commit often with clear messages (e.g. feat(api): add ocr verification endpoint). Makes rolling back broken code effortless."
  },
  {
    step: 4,
    title: "Frequent Pulls & Fast Merges",
    desc: "Pull main into your feature branch before creating a PR to resolve conflicts locally while they are small."
  },
  {
    step: 5,
    title: "Zero Secrets in Git",
    desc: "Always include .env in .gitignore. Provide .env.example with dummy keys. Never commit live OpenAI/AWS API keys."
  },
  {
    step: 6,
    title: "Complete README.md",
    desc: "Include project title, live demo URL, architecture diagram, tech stack badges, local setup commands, and team member credits."
  }
];

// Section 10: Suggested 9-Component Architecture
export const ARCHITECTURE_COMPONENTS = [
  { name: "User / Client Layer", detail: "Mobile Browser / Web Application / Desktop PWA responsive interface." },
  { name: "Frontend Client", detail: "React / Next.js / Vite SPA with client state, Lucide UI, and input validation." },
  { name: "API Gateway / Backend", detail: "FastAPI / Node Express / NestJS handling routing, middleware, and business logic." },
  { name: "Database & Cache", detail: "PostgreSQL / Supabase (relational integrity) or Redis (caching & rate limits)." },
  { name: "AI / ML Service", detail: "Python inference service or LLM orchestration (RAG / LangChain / Vision API)." },
  { name: "External Integrations", detail: "SMS/WhatsApp alerts (Twilio), Maps (Mapbox), Payment mock, Government open data." },
  { name: "Auth & Security", detail: "JWT tokens / Supabase Auth / Role-based access control (RBAC)." },
  { name: "Deployment & Hosting", detail: "Frontend on Vercel/Netlify, Backend on Render/Railway/Fly.io, DB on Neon/Supabase." },
  { name: "Logging & Observability", detail: "Console structured logs, Sentry error tracking, health check endpoint (/api/health)." }
];

// Section 11: Technology Selection by Layer
export const TECH_SELECTION_MATRIX = [
  {
    layer: "Frontend",
    recommendation: "React / Next.js + TypeScript + TailwindCSS",
    rationale: "Massive component ecosystem, instant hot-reloading, rich UI libraries (Lucide, Radix, Framer Motion), and universal judge familiarity."
  },
  {
    layer: "Backend",
    recommendation: "Python FastAPI or Node.js (Express / NestJS)",
    rationale: "FastAPI offers auto-generated Swagger UI docs and native async Python AI integration. Express offers lightning-fast JavaScript prototyping."
  },
  {
    layer: "Database",
    recommendation: "PostgreSQL (via Supabase / Neon) or MongoDB",
    rationale: "Postgres guarantees relational integrity and offers pgvector for embeddings. MongoDB works well for dynamic, schema-less prototypes."
  },
  {
    layer: "AI / ML",
    recommendation: "OpenAI / Gemini / Groq APIs + LangChain + ChromaDB",
    rationale: "Fast inference, state-of-the-art vision/text capability, and minimal cold-start compute requirements during a timed competition."
  },
  {
    layer: "Deployment",
    recommendation: "Vercel (Frontend) + Render / Railway (Backend) + Supabase (DB)",
    rationale: "Zero-config git push deployments with free tier SSL certificates, automated preview URLs, and robust uptime."
  },
  {
    layer: "Communication",
    recommendation: "REST / JSON for 90% of apps; WebSockets for genuine real-time live feeds",
    rationale: "Keep communication protocols simple. Do not build microservice gRPC queues unless the problem explicitly demands high-throughput streams."
  }
];

// Section 12: Time Pressure Execution Timeline (7 Phases)
export const TIME_EXECUTION_TIMELINE = [
  {
    phase: "Phase 1: Kickoff & Scope",
    range: "0% – 10%",
    duration24h: "0h – 2.5h",
    focus: "Read problem 5x, agree on 1-sentence value prop, define MVP vs Future scope, assign 7 roles, setup repo & env."
  },
  {
    phase: "Phase 2: Contracts & Schema",
    range: "10% – 20%",
    duration24h: "2.5h – 5h",
    focus: "Draw architecture diagram, design DB tables, build Figma UI wireframes, agree on REST endpoint JSON request/response formats."
  },
  {
    phase: "Phase 3: Core Critical Path",
    range: "20% – 60%",
    duration24h: "5h – 14.5h",
    focus: "Intensive coding! Build DB models, implement core API routes, build primary UI screens, connect end-to-end data pipeline."
  },
  {
    phase: "Phase 4: Advanced Integration",
    range: "60% – 75%",
    duration24h: "14.5h – 18h",
    focus: "Integrate AI/ML model, external APIs, notifications, data visualization charts, and role authentication."
  },
  {
    phase: "Phase 5: Polish & QA",
    range: "75% – 85%",
    duration24h: "18h – 20.5h",
    focus: "Architecture freeze! Fix bugs, handle empty/loading states, mobile responsiveness, input validations, error toasts."
  },
  {
    phase: "Phase 6: Deploy & Slides",
    range: "85% – 95%",
    duration24h: "20.5h – 23h",
    focus: "Deploy to production Vercel/Render, seed realistic test records, design 12-slide PPT, write GitHub README, record backup video."
  },
  {
    phase: "Phase 7: Rehearsal & Defense",
    range: "95% – 100%",
    duration24h: "23h – 24h",
    focus: "Feature freeze! Rehearse 3-minute pitch with stopwatch 3x, test backup demo tabs, review 13 Q&A answers, rest."
  }
];

// Section 13: 12-Slide Hackathon PPT Master Framework
export const PPT_12_SLIDES = [
  {
    slideNumber: 1,
    title: "1. Title & Value Proposition",
    purpose: "Hook the room in the first 5 seconds.",
    content: "Project Name, 1-line punchy value proposition, team name, member names & roles, university/organization.",
    visual: "High-res logo, sleek dark/light theme, clean typography.",
    proTip: "Make the one-liner solve a problem, not just describe a technology (e.g., 'Real-time cold chain monitoring for rural healthcare' vs 'A React app with IoT')."
  },
  {
    slideNumber: 2,
    title: "2. Problem Statement & Stakeholders",
    purpose: "Ground the problem in real human and economic pain.",
    content: "What is happening, exactly who suffers (User Persona), and the quantified scale of the problem (₹/$, lives, hours wasted).",
    visual: "Stat callout box (e.g. '24% Vaccine Spoilage Rate') + Persona snippet.",
    proTip: "Never say 'everyone has this problem'. Be hyper-specific about who experiences it first."
  },
  {
    slideNumber: 3,
    title: "3. Current Situation & Broken Workflow",
    purpose: "Explain why existing tools and manual methods fail.",
    content: "How users attempt to solve it today, existing product limitations, and the root cause of systemic failure.",
    visual: "Comparison flow: 'Today's Broken Workflow' vs 'The Information Gap'.",
    proTip: "Highlight the specific bottleneck that your technology removes."
  },
  {
    slideNumber: 4,
    title: "4. Proposed Solution & Core Features",
    purpose: "Introduce your product as the natural remedy.",
    content: "High-level concept statement + 3 to 4 core MVP features that eliminate the root cause.",
    visual: "Clean product overview diagram or hero mockup.",
    proTip: "Focus on outcomes and capabilities rather than listing 20 tiny button features."
  },
  {
    slideNumber: 5,
    title: "5. How It Works (End-to-End Flow)",
    purpose: "Show logical clarity in your product journey.",
    content: "Step 1: Input/Capture → Step 2: Processing/AI Engine → Step 3: Actionable Output/Alert.",
    visual: "3-step horizontal flowchart with intuitive icons.",
    proTip: "Keep this dead simple so non-technical judges immediately grasp the mechanics."
  },
  {
    slideNumber: 6,
    title: "6. Technology & System Architecture",
    purpose: "Demonstrate solid CSE engineering foundations.",
    content: "Frontend, Backend, Database, AI Pipeline, Cloud Infrastructure, and why each specific tool was selected.",
    visual: "Clean, professional block diagram (Client -> API Gateway -> Service -> DB -> AI).",
    proTip: "Justify choices: 'FastAPI for asynchronous vision processing' beats 'we used Python because we know it'."
  },
  {
    slideNumber: 7,
    title: "7. Key Innovation & Unfair Advantage",
    purpose: "Show why your implementation is distinctive.",
    content: "What is technically or operationally unique? (e.g., Offline-first sync, edge OCR compression, multi-modal cross-verification).",
    visual: "Feature comparison matrix vs conventional alternatives.",
    proTip: "Avoid unsupported buzzword claims like '100% Unhackable Quantum AI'. State verifiable advantages."
  },
  {
    slideNumber: 8,
    title: "8. Live Prototype & Core Screens",
    purpose: "Prove you actually wrote software during the hackathon.",
    content: "High-resolution screenshots of the working product, highlighting the critical user workflow.",
    visual: "Side-by-side device frames showing Mobile App + Admin Dashboard.",
    proTip: "This slide serves as an immediate visual safety net if projector/internet issues occur during live demo."
  },
  {
    slideNumber: 9,
    title: "9. Impact, Validation & Benchmarks",
    purpose: "Prove engineering efficacy with hard data.",
    content: "Latency test results, AI accuracy/F1-score, simulated user tests, estimated cost reduction, and feedback.",
    visual: "Metric counters (e.g. '820ms End-to-End Latency | 94.2% OCR Precision | 100% Offline Resilience').",
    proTip: "Even synthetic benchmark numbers prove you care about measuring engineering output."
  },
  {
    slideNumber: 10,
    title: "10. Business, Adoption & Scalability Model",
    purpose: "Show that this project can survive in the real world.",
    content: "Target deployment audience, cost-per-user/clinic, government/B2B adoption pathway, and scalability strategy.",
    visual: "Simple adoption roadmap or unit economics summary.",
    proTip: "Judges love solutions that understand operational rollouts and unit costs."
  },
  {
    slideNumber: 11,
    title: "11. Future Scope & Roadmap (Phase 2 & 3)",
    purpose: "Demonstrate strategic vision beyond the 24-hour prototype.",
    content: "Phase 2 (1–3 Months): Hardware sensor integration, automated SMS gateway. Phase 3 (6+ Months): Predictive ML models, state-wide rollout.",
    visual: "Milestone timeline showing MVP → Beta → Production.",
    proTip: "This shows judges you deliberately scoped the MVP rather than forgetting features."
  },
  {
    slideNumber: 12,
    title: "12. Team, GitHub & Strong Closing",
    purpose: "Leave an unforgettable professional impression.",
    content: "Team member photos/roles, GitHub repository QR code, Live Demo URL, and 1 final punchy closing statement.",
    visual: "Team grid + QR code for immediate judge phone scanning.",
    proTip: "End with confidence: 'We built [Project Name] to solve [Problem] for [User] — and we are ready for questions!'"
  }
];

// Section 14: PPT Design Rules
export const PPT_DESIGN_RULES = [
  { rule: "One Slide = One Main Message", desc: "Never combine problem, architecture, and business model on the same slide. Let each message breathe." },
  { rule: "Visuals Over Text Blocks", desc: "Replace bullet paragraphs with high-contrast diagrams, workflow arrows, metric badges, and UI screenshots." },
  { rule: "Readable From 20 Feet", desc: "Use minimum 24pt for body text and 36pt+ for headings. If judges in the back row have to squint, you lose points." },
  { rule: "Consistent Color Palette", desc: "Stick to 1 primary color, 1 secondary accent, and dark/light neutrals. Don't use rainbow styling across slides." },
  { rule: "Show the Product Early", desc: "Judges get impatient after 90 seconds. Show prototype screenshots by Slide 4 or 5." },
  { rule: "Zero Unexplained Buzzwords", desc: "If you write 'Federated Blockchain Transformer', you must be ready to explain the mathematical loss function." },
  { rule: "Keep Deep Tech in Appendix", desc: "Place full database ER diagrams, API Swagger specs, and algorithm pseudocode in backup slides after Slide 12 for Q&A." }
];

// Section 15: 9-Step Speaking Pitch Sequence
export const PITCH_SPEAKING_SEQUENCE = [
  {
    step: 1,
    name: "The Hook",
    timing: "0:00 – 0:20 (20s)",
    scriptTemplate: "'Respected judges, every year in rural India, ₹1.8 Crore worth of life-saving vaccines spoil unnoticed due to broken cold chains. Meet [Product Name].'"
  },
  {
    step: 2,
    name: "The Concrete Pain",
    timing: "0:20 – 0:45 (25s)",
    scriptTemplate: "'Today, clinic nurses record fridge dials on paper clipboards twice a day. If power trips at 2 AM, spoiled vaccines are administered to children without anyone knowing.'"
  },
  {
    step: 3,
    name: "The Solution",
    timing: "0:45 – 1:05 (20s)",
    scriptTemplate: "'[Product Name] is an offline-first computer vision monitor. A field nurse snaps a 1-second photo of the analog dial, our edge OCR extracts temperature, and alerts dispatch instantly.'"
  },
  {
    step: 4,
    name: "The Live Demo (Critical)",
    timing: "1:05 – 2:05 (60s)",
    scriptTemplate: "'Let us show you live. Here is the mobile interface. We upload a test cold-box dial at 12°C. Notice the instant OCR reading in 400ms, and watch the District Dashboard trigger a high-risk red alert!'"
  },
  {
    step: 5,
    name: "Technology & Architecture",
    timing: "2:05 – 2:30 (25s)",
    scriptTemplate: "'Under the hood, we built a lightweight FastAPI service running an edge OCR pipeline, backed by PostgreSQL on Supabase and a responsive React client.'"
  },
  {
    step: 6,
    name: "Validation & Benchmarks",
    timing: "2:30 – 2:50 (20s)",
    scriptTemplate: "'We validated our system across 150 simulated dial conditions: achieving 94.2% recognition precision, sub-second latency, and 100% offline data sync.'"
  },
  {
    step: 7,
    name: "Impact & Feasibility",
    timing: "2:50 – 3:10 (20s)",
    scriptTemplate: "'At ₹150 per clinic per year on existing smartphones, this solution saves over 4,000 vaccine vials per district without requiring expensive IoT retrofitting.'"
  },
  {
    step: 8,
    name: "Future Roadmap",
    timing: "3:10 – 3:20 (10s)",
    scriptTemplate: "'With more time, our Phase 2 will introduce automated SMS IVR calls for non-smartphone nurses and predictive compressor failure analytics.'"
  },
  {
    step: 9,
    name: "The Punchy Close",
    timing: "3:20 – 3:30 (10s)",
    scriptTemplate: "'[Product Name] brings cold chain visibility to the last mile. Thank you, and we look forward to your questions!'"
  }
];

// Section 16: Demo Strategy & The Golden Path
export const DEMO_STRATEGY_RULES = [
  {
    title: "The 'Golden Path' Rule",
    detail: "Prepare a rehearsed 90-second workflow where every input value is pre-tested and guaranteed to succeed without unexpected validation errors."
  },
  {
    title: "Seeded Realistic Test Data",
    detail: "Populate the database before the pitch with 20-50 realistic records, chart points, and user avatars so the UI looks active and alive."
  },
  {
    title: "Zero Dependency on Unstable Wi-Fi",
    detail: "Keep a local backup running on localhost:3000 + localhost:8000 in case venue Wi-Fi throttles during your stage presentation."
  },
  {
    title: "Pre-Opened Browser Tabs",
    detail: "Open all needed tabs (App Login, Admin Dashboard, Test Input, DB Studio, PPT) before walking on stage. Never type URLs while speaking."
  },
  {
    title: "30-Second Screen Recording Fallback",
    detail: "Record a crisp 1080p MP4 screen capture of the working flow as an absolute safety net. If live internet fails, play the video without panicking."
  },
  {
    title: "Controlled Failure Demonstration",
    detail: "Show 1 deliberate error case (e.g. invalid input rejected with a clean red warning) only if it highlights robust engineering validation."
  },
  {
    title: "Zero Exposed Secrets on Stage",
    detail: "Ensure terminal windows, .env files, and database passwords are hidden from the presentation display."
  }
];

// Section 17: 13 Essential Q&A Questions & Answers
export const QA_DEFENSE_QUESTIONS = [
  {
    id: "qa1",
    question: "1. Why is this problem important and why now?",
    answer: "Focus on quantified human/economic impact, recent regulatory shifts, technology affordability, or infrastructure availability that makes this solution viable today."
  },
  {
    id: "qa2",
    question: "2. Who is your exact target user and have you talked to one?",
    answer: "Describe your specific primary persona, their daily pain point, and any domain research, surveys, or interviews that verified your assumptions."
  },
  {
    id: "qa3",
    question: "3. Why did you choose this specific tech stack over alternatives?",
    answer: "Give technical reasoning: 'FastAPI for asynchronous Python AI pipeline compatibility, PostgreSQL for relational audit compliance, and React for modular component velocity.'"
  },
  {
    id: "qa4",
    question: "4. How is your solution different from existing competitors / products?",
    answer: "Highlight your unique angle: e.g. 10x lower cost, offline-first operation, zero specialized hardware requirement, or seamless integration into existing workflows."
  },
  {
    id: "qa5",
    question: "5. How did you validate that your solution actually works?",
    answer: "Present your testing metrics: number of test runs, benchmark datasets, simulated load, precision/recall scores, or latency response times."
  },
  {
    id: "qa6",
    question: "6. What dataset or external APIs did you use and where did you get it?",
    answer: "State whether data was public open data (Kaggle/Gov portal), proprietary API, or synthetically generated with clear parameter boundaries."
  },
  {
    id: "qa7",
    question: "7. How accurate / reliable is your AI component?",
    answer: "State realistic test accuracy (e.g. 92-95%), explain your validation test split, and mention your confidence threshold scoring fallback."
  },
  {
    id: "qa8",
    question: "8. How would this architecture scale to 100,000 concurrent users?",
    answer: "Discuss stateless API design, Redis caching, read-replicas in PostgreSQL, asynchronous Celery/Kafka task queues, and CDN asset caching."
  },
  {
    id: "qa9",
    question: "9. How do you handle security, data privacy, and authentication?",
    answer: "Mention JWT token expiry, bcrypt password hashing, encrypted HTTPS/TLS in transit, parameterized SQL queries against injection, and RBAC middleware."
  },
  {
    id: "qa10",
    question: "10. What happens if the external AI API or internet connection fails?",
    answer: "Demonstrate graceful degradation: offline IndexedDB sync queue, fallback rule-based heuristics, and cached response buffers."
  },
  {
    id: "qa11",
    question: "11. How would you monetize or sustain this project practically?",
    answer: "Outline a clear model: SaaS subscription per clinic/institution, open-core enterprise support, or government procurement grant pathway."
  },
  {
    id: "qa12",
    question: "12. What would you build next with 3 months of engineering time?",
    answer: "Refer to your Phase 2 & 3 roadmap: automated hardware integration, predictive analytics, multi-regional language support, and mobile apps."
  },
  {
    id: "qa13",
    question: "13. What exact part did each team member build?",
    answer: "Give credit clearly and concisely: Lead handled scope & API contracts, Frontend built the React UI, Backend built FastAPI & DB schema, AI built the vision pipeline."
  }
];

// Section 18: Common Hackathon Mistakes (12 Pitfalls & Fixes)
export const COMMON_HACKATHON_MISTAKES = [
  {
    mistake: "1. Coding Before Understanding the Problem",
    impact: "Building a complex app that solves the wrong issue.",
    fix: "Spend the first 10% of time reading, dissecting, and defining the 10-question problem scope."
  },
  {
    mistake: "2. Massive Feature Bloat (Trying to Build Everything)",
    impact: "Delivering 8 broken half-finished features instead of 1 working solution.",
    fix: "Ruthlessly cut scope. Build only the 3 Must-Have MVP features for the golden demo path."
  },
  {
    mistake: "3. Over-Engineering Technology for Clout",
    impact: "Spending 6 hours setting up Kubernetes or Kafka for a 5-user demo app.",
    fix: "Choose the simplest reliable stack your team already knows inside and out."
  },
  {
    mistake: "4. Building UI Screens Without Working Backend",
    impact: "App crashes the second a judge asks to type custom input.",
    fix: "Connect frontend to real database/API routes by hour 10. Avoid static dummy buttons."
  },
  {
    mistake: "5. Leaving Integration to the Final 2 Hours",
    impact: "Unresolvable CORS errors, schema mismatches, and merge panics on deadline.",
    fix: "Integrate frontend and backend on Hour 6 with mock JSON contracts, then iterate."
  },
  {
    mistake: "6. Zero Fallback for API or Internet Outages",
    impact: "Complete demo failure on stage when venue Wi-Fi drops.",
    fix: "Run a local fallback server (localhost) and keep a 30s screen recording ready."
  },
  {
    mistake: "7. No Measurable Validation or Benchmarks",
    impact: "Judges dismiss claims as hypothetical student guesswork.",
    fix: "Record latency times, test runs, OCR accuracy, or simulated cost savings on your slides."
  },
  {
    mistake: "8. Poor Git Practices & Merge Hell",
    impact: "Accidentally overwriting a teammate's 8 hours of work.",
    fix: "Use short feature branches, commit frequently, never push directly to main without testing."
  },
  {
    mistake: "9. 'Lone Wolf' Teammate Syndrome",
    impact: "One person codes everything while others cannot answer judge questions.",
    fix: "Distribute tasks across all 7 roles; every member must understand the full architecture."
  },
  {
    mistake: "10. Wild Unsubstantiated PPT Claims",
    impact: "Saying 'our AI has 100% accuracy' destroys judge credibility immediately.",
    fix: "Be honest about prototype limitations and explain how production would bridge the gap."
  },
  {
    mistake: "11. Overloading Presentation Slides with Text",
    impact: "Judges read walls of text instead of listening to your spoken pitch.",
    fix: "One slide = one main idea. Use flowcharts, metrics, and screenshots with 24pt+ fonts."
  },
  {
    mistake: "12. Skipping Pitch & Demo Rehearsals",
    impact: "Getting cut off by the buzzer at 3:00 minutes before even showing the product.",
    fix: "Rehearse with a stopwatch at least 3 times before entering the judging room."
  }
];

// Section 20: Final 60-Minute Countdown Checklist (11 Critical Checkpoints)
export const FINAL_60_MINUTE_CHECKLIST = [
  {
    id: "check_golden_path",
    title: "1. Core Demo Golden Path Works 100%",
    desc: "Test the exact 90-second user workflow 3 times end-to-end without touching unseeded edge buttons."
  },
  {
    id: "check_deploy_url",
    title: "2. Live Production URL & SSL Verified",
    desc: "Verify that the live Vercel/Render link loads on mobile data/guest Wi-Fi without SSL certificate errors."
  },
  {
    id: "check_env_secrets",
    title: "3. Environment Variables & API Keys Secure",
    desc: "Confirm no secret keys or database connection strings are exposed on public GitHub repos or frontend source code."
  },
  {
    id: "check_github_readme",
    title: "4. GitHub Repo Clean with Setup README",
    desc: "Ensure README has Project Title, Architecture Diagram, Tech Badges, Setup Commands, and Team credits."
  },
  {
    id: "check_arch_diagram",
    title: "5. High-Level Architecture Diagram Ready",
    desc: "Slide 6 and README contain a crisp block diagram showing client, API, DB, AI, and external services."
  },
  {
    id: "check_ppt_final",
    title: "6. Presentation Deck Finalized & Exported to PDF",
    desc: "Export PPT to a local PDF backup so broken fonts or missing PowerPoint software won't ruin your slides."
  },
  {
    id: "check_seed_data",
    title: "7. Realistic Demo Data Pre-Seeded in Database",
    desc: "Database contains 20+ realistic records so tables, charts, and activity feeds look bustling and mature."
  },
  {
    id: "check_role_qa",
    title: "8. Team Members Assigned Specific Q&A Domains",
    desc: "Lead = Product & Scope, Frontend = UI & State, Backend = DB & Scale, AI = Model & Accuracy."
  },
  {
    id: "check_pitch_timed",
    title: "9. Pitch Rehearsed with Strict 3-Minute Stopwatch",
    desc: "Run a full dry run with speaking transitions and ensure the live demo begins before the 1:15 mark."
  },
  {
    id: "check_backup_media",
    title: "10. Offline Video & Screenshots Backup Ready",
    desc: "Have a 1080p MP4 screen recording and screenshot folder ready on desktop in case venue Wi-Fi fails."
  },
  {
    id: "check_team_alignment",
    title: "11. Every Member Can Explain Problem & Their Role",
    desc: "Ensure all team members can confidently state the core value proposition and their exact code contribution."
  }
];

// Section 22: Connection to Your CSE 4-Year Roadmap
export const HACKATHON_ROADMAP_MAPPING = [
  {
    year: "FY: First Year (Foundations)",
    target: "Beginner Hackathons & Web / Scripting Prototypes",
    focus: "HTML/CSS/JS, Python utilities, simple CRUD, UI mockups, Git team collaboration.",
    recommendedEvents: "College Internal Hackathons, Hacktoberfest, MLH Rookie Tracks, Devpost Beginner Sprints.",
    outcomeGoal: "Overcome fear of 24-hour coding, build first team repository, and present your first working prototype."
  },
  {
    year: "SY: Second Year (Core CSE)",
    target: "System, Database & Full-Stack Application Hackathons",
    focus: "DSA optimization, relational DBMS (PostgreSQL), REST APIs (Node/FastAPI), authentication, state management.",
    recommendedEvents: "State-Level Hackathons, Smart India Hackathon (SIH) College Internal Rounds, GDSC Solutions Challenge.",
    outcomeGoal: "Build robust full-stack applications with real databases, solid API contracts, and clean component architectures."
  },
  {
    year: "TY: Third Year (Specialization)",
    target: "AI/ML, Cloud, Web3 or Domain Specialization Hackathons",
    focus: "LLM agents, RAG pipelines, computer vision, vector search, microservices, containerization, cloud deployment.",
    recommendedEvents: "Smart India Hackathon (SIH National Final), HackCBS, ETHIndia, AI/Cloud Corporate Hackathons.",
    outcomeGoal: "Achieve top-10 or podium finishes with technically distinctive architectures and measurable validation data."
  },
  {
    year: "Final Year (Capstone & National Impact)",
    target: "National Flagship Competitions, Startup Incubators & Capstone Product",
    focus: "Production-grade resilience, unit economics, security compliance, patentable innovation, venture pitch.",
    recommendedEvents: "SIH Grand Finale, Google Solution Challenge Top 100, Imagine Cup, National Innovation Competitions.",
    outcomeGoal: "Transform a winning hackathon prototype into your Major Capstone Project, placement portfolio highlight, or venture."
  }
];
