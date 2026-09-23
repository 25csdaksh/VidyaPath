// ========================================================
// CSE RESUME BUILDING MASTER GUIDE DATA
// How to create, improve, customize, and use a placement-ready resume
// ========================================================

export const RESUME_CORE_PHILOSOPHY = {
  title: 'CSE RESUME BUILDING MASTER GUIDE',
  purpose: 'A practical English-language guide for CSE students preparing for internships, campus placements, hackathons, and entry-level software roles.',
  coreIdea: 'Your resume should make it easy for a recruiter to understand what you can build, what technologies you know, what you have achieved, and what evidence supports those claims.',
  finalRule: 'Your resume is not a list of everything you know. It is a compact evidence document. If you claim a skill, be ready to explain it. If you claim a project, be ready to demonstrate it. If you claim an achievement, be ready to prove it.',
};

export const RESUME_ELEMENTS = [
  { section: 'Header / Contact Information', desc: 'Name, professional email, phone, location, LinkedIn, GitHub, and portfolio links.' },
  { section: 'Professional Summary / Objective', desc: 'Optional 2–3 lines strictly focused on technical direction and verified skills.' },
  { section: 'Education', desc: 'B.Tech/B.E. degree, university name, expected graduation year, and CGPA.' },
  { section: 'Technical Skills', desc: 'Grouped categories: Languages, Frontend, Backend, Databases, Tools, Cloud, and AI/ML.' },
  { section: 'Projects (2–4 Strong)', desc: 'Action + problem + implementation + measurable outcome with live/code links.' },
  { section: 'Experience / Internship', desc: 'Concrete contributions, technologies used, and outcomes (if available).' },
  { section: 'Certifications', desc: 'Recognized professional credentials directly relevant to the target role.' },
  { section: 'Achievements / Hackathons', desc: 'Competitive programming ratings, hackathon milestones, and academic awards.' },
  { section: 'Positions of Responsibility', desc: 'Technical club leads, open-source maintainers, or event coordinators (when space permits).' },
  { section: 'Relevant Coursework', desc: 'DSA, DBMS, Operating Systems, Computer Networks, and System Design.' },
  { section: 'Verified Hyperlinks', desc: 'Working, clean links to GitHub repositories, live demo deployments, and LinkedIn.' },
];

export const RESUME_BLUEPRINT_SECTIONS = {
  header: {
    name: 'DAKSH SONI',
    title: 'Computer Science & Engineering Student | Aspiring Backend / Full-Stack Engineer',
    contact: 'Ahmedabad, Gujarat | +91 98765 43210 | daksh.soni@email.com',
    links: 'LinkedIn: linkedin.com/in/dakshsoni | GitHub: github.com/dakshsoni | Portfolio: dakshsoni.dev',
  },
  summary: 'CSE student with hands-on experience architecting scalable full-stack web applications using React, Node.js, PostgreSQL, and Redis. Passionate about distributed systems, RESTful API design, and cloud deployments, seeking an entry-level Software Engineer role.',
  education: {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'ABC University, Gujarat',
    period: 'Expected Graduation: May 2028',
    grade: 'CGPA: 8.85 / 10.0',
    coursework: 'Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming',
  },
  skills: {
    languages: 'C, C++, Java, Python, JavaScript (ES6+), TypeScript, SQL',
    frontend: 'React.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit',
    backend: 'Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication',
    databases: 'PostgreSQL, MongoDB, Redis, MySQL',
    toolsDevOps: 'Git, GitHub, Docker, Postman, Linux / Bash, CI/CD (GitHub Actions), AWS (S3, EC2)',
  },
  projects: [
    {
      title: 'DevCollab — Real-Time Collaborative Code Editor',
      tech: 'React, Node.js, Socket.IO, Redis, Docker',
      links: 'GitHub: github.com/dakshsoni/devcollab | Live Demo: devcollab-demo.com',
      bullets: [
        'Built a real-time collaborative code editor supporting multi-user simultaneous editing with <50ms sync latency using WebSockets and Operational Transformation.',
        'Engineered a distributed session state caching layer with Redis to handle 500+ concurrent active editing rooms without memory degradation.',
        'Containerized frontend and backend services using Docker Compose, achieving 1-command reproducible local and staging deployment.',
      ],
    },
    {
      title: 'MediCare — Hospital Management & Appointment Booking Platform',
      tech: 'React, Express.js, PostgreSQL, Prisma, Tailwind CSS',
      links: 'GitHub: github.com/dakshsoni/medicare | Live Demo: medicare-portal.com',
      bullets: [
        'Developed a role-based patient scheduling system featuring discrete portals for patients, doctors, and hospital administrators.',
        'Designed a normalized 3NF PostgreSQL schema with foreign key cascading and indexed queries, reducing appointment lookup time by 45%.',
        'Implemented secure JWT-based authentication with Argon2 password hashing and HTTP-only cookie token storage.',
      ],
    },
  ],
  experience: {
    role: 'Software Engineering Intern',
    company: 'TechCorp Solutions',
    period: 'Jun 2027 – Aug 2027',
    bullets: [
      'Developed 8 new RESTful API endpoints for the internal reporting dashboard using Node.js and PostgreSQL.',
      'Optimized slow database aggregations by adding composite indexes, reducing average query latency from 1.4s to 210ms.',
      'Wrote comprehensive unit and integration tests using Jest and Supertest, boosting backend code test coverage to 82%.',
    ],
  },
  certifications: [
    'Meta Front-End Developer Professional Certificate (Coursera) — 2027',
    'IBM Backend Development Specialization (Coursera) — 2027',
    'PostgreSQL Database Administration & Design — 2026',
  ],
  achievements: [
    'Winner (1st Place out of 65 teams) — National Hackathon 2027 for AI-enabled emergency dispatch prototype.',
    'Solved 350+ Algorithmic Problems across LeetCode and GeeksforGeeks (Max Rating: 1720+).',
    'Technical Lead — College Open Source Club; mentored 40+ junior students in Git and full-stack development.',
  ],
};

export const SUMMARY_FORMULAS = {
  weak: 'I am a hardworking and passionate CSE student looking for an opportunity to prove my skills in a good company.',
  weakExplanation: 'Contains no specific technical skills, no verified stack, no domain focus, and is entirely generic.',
  strongFormula: 'CSE student with experience building [Key Projects / Stack] using [Technology 1, 2, 3], with strong foundations in [DSA / Core CS / Domain]. Seeking an entry-level [Target Role] where I can contribute to [Type of Systems / Scale] and grow as a software engineer.',
  strongExamples: [
    {
      role: 'Full-Stack / Backend SDE',
      text: 'Final-year Computer Science student with hands-on experience building full-stack web applications using React, Node.js, Express, and PostgreSQL. Strong foundation in Data Structures, RESTful APIs, and database indexing. Seeking an entry-level Software Engineer role to engineer high-performance backend systems.',
    },
    {
      role: 'AI / Machine Learning Engineer',
      text: 'CSE student specializing in machine learning with experience training and deploying computer vision and NLP models using Python, PyTorch, scikit-learn, and FastAPI. Passionate about MLOps and production inference optimization, seeking an entry-level AI/ML Engineer role.',
    },
    {
      role: 'Frontend / UI Engineer',
      text: 'Computer Science student passionate about crafting responsive, accessible, and high-performance web applications using React, TypeScript, and modern CSS architectures. Experienced with state management, WebSockets, and Web Vitals optimization.',
    },
  ],
};

export const ACTION_VERBS_BY_CATEGORY = [
  {
    category: 'Development & Engineering',
    verbs: ['Built', 'Developed', 'Architected', 'Engineered', 'Spearheaded', 'Constructed', 'Implemented', 'Created', 'Refactored'],
    usage: 'Use for describing core features, full applications, and foundational system creation.',
  },
  {
    category: 'Optimization & Performance',
    verbs: ['Optimized', 'Accelerated', 'Reduced', 'Enhanced', 'Minimized', 'Streamlined', 'Scaled', 'Boosted', 'Upgraded'],
    usage: 'Use when describing database tuning, latency drops, caching, and memory reduction.',
  },
  {
    category: 'Integration & DevOps',
    verbs: ['Integrated', 'Deployed', 'Containerized', 'Automated', 'Orchestrated', 'Configured', 'Provisioned', 'Migrated'],
    usage: 'Use for CI/CD pipelines, Docker, cloud services (AWS/GCP), and 3rd-party API integrations.',
  },
  {
    category: 'Security & Quality Assurance',
    verbs: ['Secured', 'Authenticated', 'Validated', 'Tested', 'Audited', 'Sanitized', 'Monitored', 'Hardened'],
    usage: 'Use for JWT auth, input validation, unit testing, OWASP defenses, and error handling.',
  },
  {
    category: 'Data & Machine Learning',
    verbs: ['Trained', 'Fine-Tuned', 'Preprocessed', 'Evaluated', 'Indexed', 'Analyzed', 'Aggregated', 'Synthesized'],
    usage: 'Use for data pipelines, ML models, query tuning, and feature engineering.',
  },
];

export const PROJECT_BULLET_EXAMPLES = [
  {
    category: 'Full-Stack Web Application',
    projectName: 'School & Hospital Management Portal (React + Node.js + PostgreSQL)',
    badBullet: 'Made a website for school management using React and Node.',
    goodBullets: [
      'Built a role-based management platform using React, Node.js, and PostgreSQL with discrete workflows for 4 user roles (Admin, Doctor, Patient, Staff).',
      'Implemented secure JWT authentication with Argon2 password hashing and HTTP-only cookie session handling.',
      'Designed a normalized 3NF PostgreSQL schema with foreign key constraints and indexed queries, accelerating reporting queries by 45%.',
    ],
  },
  {
    category: 'AI / Machine Learning',
    projectName: 'Plant Disease Classification System (PyTorch + MobileNetV2 + FastAPI)',
    badBullet: 'Used deep learning to classify plant leaves.',
    goodBullets: [
      'Developed a plant disease classification prototype in PyTorch by fine-tuning a MobileNetV2 architecture on 54,000+ leaf images across 38 crop categories.',
      'Achieved 95.2% top-1 validation accuracy and optimized inference pipeline using TorchScript, reducing single-image evaluation latency to <65ms.',
      'Built a lightweight REST inference API with FastAPI and containerized the service using Docker for cross-platform deployment.',
    ],
  },
  {
    category: 'Backend & Distributed Systems',
    projectName: 'High-Throughput URL Shortener & Analytics (Go / Node + Redis + Postgres)',
    badBullet: 'Created a link shortener with database.',
    goodBullets: [
      'Architected a distributed URL shortening service capable of handling 5,000+ redirect requests per second with Base62 token encoding.',
      'Integrated Redis Cache-Aside layer for hot redirect URLs, achieving sub-4ms response latency and offloading 85% of traffic from the primary database.',
      'Implemented token bucket rate limiting to prevent API abuse and automated daily clickstream analytics batching.',
    ],
  },
  {
    category: 'Cybersecurity & Networks',
    projectName: 'Automated Network Port & Vulnerability Scanner (Python + Scapy)',
    badBullet: 'Made a script to scan ports on network.',
    goodBullets: [
      'Engineered an asynchronous multi-threaded TCP/UDP port scanner in Python utilizing raw sockets and Scapy.',
      'Implemented automated banner grabbing and service signature matching against the CVE vulnerability database.',
      'Generated structured JSON and PDF audit reports with remediation recommendations for detected outdated server daemons.',
    ],
  },
];

export const PLACEMENT_PROJECT_LEVELS = [
  {
    tier: 'Beginner / Foundation',
    examples: 'CRUD Todo app, Expense tracker, Weather app, Quiz portal, Portfolio website',
    whatItProves: 'Basic programming syntax, Git commits, clean UI layout, and foundational logic.',
  },
  {
    tier: 'Intermediate / Practical',
    examples: 'E-commerce store, Hospital/School portal, Blog CMS with auth, Inventory tracker',
    whatItProves: 'REST APIs, database modeling, authentication (JWT), error handling, testing, and deployment.',
  },
  {
    tier: 'Advanced / Specialization',
    examples: 'Real-time collaborative editor, Distributed URL shortener, AI vision pipeline, Security scanner, Multi-tenant SaaS',
    whatItProves: 'System architecture, caching (Redis), concurrency/WebSockets, Docker containers, scalability, and measurable metrics.',
  },
];

export const GITHUB_LINKEDIN_GUIDELINES = {
  github: [
    { title: 'Clean & Professional Profile', desc: 'Use a clear photo, updated bio with target role, and pinned top 3-4 repositories.' },
    { title: 'Comprehensive Repository READMEs', desc: 'Every pinned repo must have: Project Overview, Architecture Diagram, Tech Stack, Setup Steps, API Endpoints, and Screenshots/GIFs.' },
    { title: 'Meaningful Commit History', desc: 'Avoid single "initial commit" dumps; show progressive development over time with descriptive commit messages.' },
    { title: 'Zero Secrets in Code', desc: 'Ensure .env files, API keys, database credentials, and auth secrets are strictly excluded via .gitignore.' },
  ],
  linkedin: [
    { title: 'Matching Role Headline', desc: 'Align headline with resume: "CSE Student | Full-Stack Developer | React, Node.js, PostgreSQL".' },
    { title: 'Consistent Timelines & Projects', desc: 'Ensure graduation dates, project names, and internship details exactly match your resume.' },
    { title: 'Keyword-Rich About Section', desc: 'Summarize your technical strengths, core technologies, and active problem-solving journey.' },
    { title: 'Feature Live Demo & GitHub Links', desc: 'Add clickable project demo links and GitHub links under the Featured and Projects sections.' },
  ],
};

export const ATS_RULES = [
  { rule: 'Single-Column Layout', desc: 'ATS software parses documents top-to-bottom. Multi-column templates and split tables frequently scramble section ordering.' },
  { rule: 'Standard Section Headings', desc: 'Use canonical headings: EDUCATION, TECHNICAL SKILLS, PROJECTS, EXPERIENCE, CERTIFICATIONS, ACHIEVEMENTS.' },
  { rule: 'No Text in Images or Canvases', desc: 'Never put critical skills, names, or contact information inside graphics, icons, skill rating bars, or raster images.' },
  { rule: 'Selectable & Copyable PDF Text', desc: 'Always verify that text in your exported PDF can be selected, copied, and pasted cleanly into a plain text editor.' },
  { rule: 'Accurate Tech Stack Spelling', desc: 'Always use proper casing: "JavaScript", "TypeScript", "PostgreSQL", "MongoDB", "Node.js", "C++", "PyTorch".' },
  { rule: 'Keyword Matching Against JD', desc: 'Incorporate genuine matching keywords from the job description (e.g. "REST APIs", "Unit Testing", "Docker").' },
  { rule: 'Standard Font Families', desc: 'Use clean, universally installed fonts: Inter, Roboto, Arial, Calibri, Helvetica, or Times New Roman.' },
  { rule: 'One Page Length for Freshers', desc: 'Keep the document strictly to 1 page unless you have extensive professional work experience.' },
];

export const ROLE_KEYWORDS_DIRECTORY = [
  {
    role: 'Software Development Engineer (SDE / Core)',
    skills: ['C++', 'Java', 'Python', 'Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'DBMS', 'SQL', 'Operating Systems', 'Computer Networks', 'Git', 'REST APIs', 'Unit Testing', 'System Design'],
  },
  {
    role: 'Frontend Engineer',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'HTML5', 'CSS3 / Sass', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs', 'WebSockets', 'Responsive Design', 'Web Vitals', 'Jest / React Testing Library'],
  },
  {
    role: 'Backend Engineer',
    skills: ['Node.js', 'Express.js', 'Java (Spring Boot)', 'Python (FastAPI/Django)', 'PostgreSQL', 'MongoDB', 'Redis', 'RESTful APIs', 'Microservices', 'JWT Auth', 'Docker', 'Database Indexing', 'Kafka / RabbitMQ'],
  },
  {
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL / MongoDB', 'TypeScript', 'REST APIs', 'Redis Caching', 'Docker', 'Git', 'CI/CD', 'Authentication (OAuth/JWT)', 'Cloud Deployment (AWS/Vercel)'],
  },
  {
    role: 'AI / Machine Learning Engineer',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'Pandas', 'Computer Vision (OpenCV)', 'NLP (HuggingFace Transformers)', 'FastAPI', 'Docker', 'Model Evaluation', 'Data Preprocessing', 'MLOps'],
  },
  {
    role: 'Data Analyst / Data Engineer',
    skills: ['Python', 'SQL (Advanced Window Functions)', 'Pandas', 'NumPy', 'PostgreSQL', 'Power BI / Tableau', 'Data Cleaning', 'ETL Pipelines', 'Statistical Analysis', 'BigQuery', 'Apache Spark'],
  },
  {
    role: 'Cybersecurity Analyst / Engineer',
    skills: ['Linux / Bash', 'Computer Networks (TCP/IP, Wireshark)', 'OWASP Top 10', 'Penetration Testing (Burp Suite)', 'Cryptography & Hashing', 'SIEM & Log Analysis', 'Python Scripting', 'Vulnerability Assessment'],
  },
  {
    role: 'Cloud & DevOps Engineer',
    skills: ['Linux System Administration', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions / Jenkins)', 'AWS (EC2, S3, IAM, Lambda)', 'Terraform (IaC)', 'Nginx', 'Prometheus & Grafana', 'Bash Scripting'],
  },
];

export const FATAL_RESUME_MISTAKES = [
  { mistake: 'Spelling and Grammar Errors', fix: 'Proofread multiple times and run through spellcheckers. A typo in "JavaScript" or "PostgreSQL" signals carelessness.' },
  { mistake: 'Unprofessional Email Address', fix: 'Use "firstname.lastname@gmail.com" instead of "coolgamer99@gmail.com".' },
  { mistake: 'Multi-Page Resume with Fluff', fix: 'Freshers should strictly stick to 1 page containing high-density, evidence-backed bullets.' },
  { mistake: 'Listing Every Tech You Ever Glanced At', fix: 'Only list technologies you can explain from first principles and defend on a whiteboard.' },
  { mistake: 'Fake Metrics & Inflated Numbers', fix: 'Never write "boosted revenue by 500%" for a college project. Write genuine metrics: "reduced DB latency from 1.2s to 180ms" or "evaluated on 5,000 test images".' },
  { mistake: 'Vague Bullets ("Made a website")', fix: 'Use the Action + Tech + Result formula: "Architected a full-stack portal using React and PostgreSQL with role-based auth".' },
  { mistake: 'Broken GitHub / LinkedIn / Demo Links', fix: 'Click every single link in the exported PDF before submitting to ensure 200 OK responses.' },
  { mistake: 'Subjective Skill Rating Bars (e.g. Java 85%)', fix: 'ATS cannot parse progress bars, and arbitrary percentage ratings are meaningless to interviewers.' },
  { mistake: 'Including Irrelevant Personal Data', fix: 'Omit marital status, religion, age, father\'s name, and full physical street address.' },
  { mistake: 'Sending One Generic Resume to All Roles', fix: 'Customize your skills order and project highlights for the specific job description.' },
  { mistake: 'Complex Graphical Tables & Columns', fix: 'Stick to clean, single-column standard typography for 100% ATS readability.' },
  { mistake: 'Unprofessional File Naming', fix: 'Name the file "Daksh_Soni_Resume.pdf" instead of "final_v2_new_updated.pdf".' },
];

export const INTERVIEW_SELF_INTRO_SCRIPT = {
  timing: '60 – 90 Seconds',
  framework: 'Present → Past → Future',
  script: `"Hello, I'm [Your Name], a final-year Computer Science student at [Your College].
My primary technical passion lies in [Full-Stack Engineering / Distributed Systems / AI].
Over the past few years, I have developed strong foundations in Data Structures, Algorithms, and Core CS while building production-style projects.
One of my key projects is [Project Name], where I [one-sentence problem and technical solution].
I have also [internship experience / hackathon achievement / competitive programming milestone].
I am excited about this [Software Engineer] role at [Company Name] because your team is solving large-scale challenges in [domain], and I am eager to contribute my backend and problem-solving skills to your core products."`,
};

export const PATRL_PROJECT_FRAMEWORK = [
  { step: 'P', title: 'Problem', desc: 'What real-world problem or inefficiency did you identify?' },
  { step: 'A', title: 'Approach', desc: 'What overall system architecture and user flow did you design to solve it?' },
  { step: 'T', title: 'Technology', desc: 'Why did you select this specific tech stack (e.g. PostgreSQL vs MongoDB, Redis for caching)?' },
  { step: 'R', title: 'Result', desc: 'What measurable outcome, benchmark, or user workflow was achieved?' },
  { step: 'L', title: 'Learning', desc: 'What technical challenge failed initially, how did you fix it, and what would you improve in v2?' },
];

export const PROJECT_DEFENSE_QUESTIONS = [
  'Why did you choose PostgreSQL over MongoDB for this project?',
  'What was your specific personal contribution versus your teammates\' work?',
  'How did you design and normalize the database schema, and where are the indexes placed?',
  'How does authentication and session security work under the hood?',
  'What happens to your system if traffic spikes by 100x tomorrow?',
  'What was the most difficult bug you encountered and how did you locate it?',
  'How did you test your application for edge cases and concurrent race conditions?',
  'What security risks (SQLi, XSS, CSRF, rate limits) did you consider and patch?',
  'If you had another 2 months, what would you re-architect in version 2.0?',
];

export const RESUME_INTERVIEW_PREP_MATRIX = [
  { pillar: '1. Definition', desc: 'What is the concept/technology in standard computer science terms?' },
  { pillar: '2. Why', desc: 'Why did you choose this technology over alternative options?' },
  { pillar: '3. Implementation', desc: 'How exactly did you code, configure, or integrate it in your project?' },
  { pillar: '4. Trade-Off', desc: 'What are the performance limitations, memory costs, or scaling trade-offs of this decision?' },
  { pillar: '5. Evidence', desc: 'Where in your GitHub repository or live demo can you point to this code?' },
];

export const RESUME_AUDIT_CHECKLIST_ITEMS = [
  { id: 'r1', text: 'Resume is strictly one page (unless having significant multi-year industry experience)' },
  { id: 'r2', text: 'Target role (e.g. SDE, Full-Stack, Backend, AI/ML) is immediately clear from the top header' },
  { id: 'r3', text: 'Name is prominent and contact details include professional email, phone, and city/state' },
  { id: 'r4', text: 'GitHub, LinkedIn, and portfolio hyperlinks are working and open cleanly' },
  { id: 'r5', text: 'Education includes degree, university name, expected graduation year, and accurate CGPA' },
  { id: 'r6', text: 'Technical skills are grouped logically into Languages, Frontend, Backend, Databases, Tools' },
  { id: 'r7', text: 'Every listed skill is something you can defend from first principles in a live interview' },
  { id: 'r8', text: 'Includes 2–3 strong, distinctive projects with technical depth rather than tutorial clones' },
  { id: 'r9', text: 'Project bullets follow: Action Verb + Tech Stack + Implementation Feature + Measurable Outcome' },
  { id: 'r10', text: 'Experience/Internship entries emphasize personal engineering contributions and outcomes' },
  { id: 'r11', text: 'Certifications and hackathon achievements are verifiable and accurately stated' },
  { id: 'r12', text: 'Single-column, clean ATS layout with standard font typography (no text in images/canvases)' },
  { id: 'r13', text: 'All technology names have correct casing (e.g. "JavaScript", "TypeScript", "PostgreSQL", "Node.js")' },
  { id: 'r14', text: 'Zero spelling mistakes, typos, or grammatical inconsistencies' },
  { id: 'r15', text: 'Exported PDF opens correctly and all text can be selected and copied as plain text' },
  { id: 'r16', text: 'File is professionally named (e.g. "Daksh_Soni_Resume.pdf" or "Daksh_Soni_Software_Engineer_Resume.pdf")' },
];

export const THIRTY_DAY_IMPROVEMENT_PLAN = [
  {
    phase: 'Days 1–3',
    title: 'Data Collection & Inventory Audit',
    task: 'Gather all transcripts, CGPA, complete project list, GitHub URLs, certification links, and hackathon records into a master document.',
    deliverable: 'Master Raw Resume Inventory Document',
  },
  {
    phase: 'Days 4–6',
    title: 'Target Role Selection & First Draft',
    task: 'Select your primary target engineering role (e.g. Backend, Full-Stack, SDE) and create your clean single-column 1-page layout.',
    deliverable: '1-Page Draft Skeleton',
  },
  {
    phase: 'Days 7–10',
    title: 'High-Impact Project Bullets Rewrite',
    task: 'Rewrite all project descriptions using strong action verbs, technical architecture decisions, and genuine measurable outcomes.',
    deliverable: 'Refined Action-Oriented Project Entries',
  },
  {
    phase: 'Days 11–14',
    title: 'GitHub Repositories Quality Spring Cleaning',
    task: 'Add professional README files with architecture diagrams, setup steps, screenshots, and clean up .env secrets on all pinned repos.',
    deliverable: '3–4 Clean, Pinned GitHub Repositories',
  },
  {
    phase: 'Days 15–18',
    title: 'LinkedIn & Portfolio Alignment',
    task: 'Update LinkedIn headline, about summary, project links, and portfolio website so all details match your resume word-for-word.',
    deliverable: 'Synchronized LinkedIn & Portfolio Profiles',
  },
  {
    phase: 'Days 19–21',
    title: 'Role-Specific Tailored Variations',
    task: 'Create 2–3 customized variations of your resume targeting specific job descriptions (e.g. Backend Focus vs Full-Stack Focus).',
    deliverable: '2–3 Tailored PDF Versions',
  },
  {
    phase: 'Days 22–25',
    title: 'Live Verbal Defense Practice',
    task: 'Practice the 60–90s self-introduction and P-A-T-R-L project explanation aloud until you can speak without hesitation.',
    deliverable: 'Fluent 90s Pitch & Project Defense Narrative',
  },
  {
    phase: 'Days 26–28',
    title: 'Peer & Mentor Mock Review',
    task: 'Conduct 2 peer resume reviews, test ATS parsing with online text extraction, and note any confusing bullet points.',
    deliverable: 'Peer Feedback Action Item Log',
  },
  {
    phase: 'Days 29–30',
    title: 'Final PDF Export & Verification',
    task: 'Perform final spellcheck, link testing, PDF text selection audit, and save with professional naming convention.',
    deliverable: 'Placement-Ready Master PDF Copies',
  },
];

export const PRE_APPLICATION_CHECKLIST = [
  { id: 'p1', text: 'Target job description carefully reviewed and understood' },
  { id: 'p2', text: 'Resume skills and projects customized to highlight required technologies' },
  { id: 'p3', text: 'Most relevant 2–3 projects moved to prominent positions' },
  { id: 'p4', text: 'Every listed technical skill verified against your real ability to explain it' },
  { id: 'p5', text: 'Every GitHub, LinkedIn, and Demo link clicked and confirmed working' },
  { id: 'p6', text: 'Spelling and grammar checked with zero typos' },
  { id: 'p7', text: 'Education and internship dates checked for consistency' },
  { id: 'p8', text: 'Zero false or exaggerated claims included' },
  { id: 'p9', text: 'Exported PDF tested for text selectability' },
  { id: 'p10', text: 'Ready to explain every bullet point using the P-A-T-R-L framework' },
];
