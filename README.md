# VidyaPath - Production-Ready CSE Career Portal 🚀

A centralized, scalable, high-performance career and learning platform for Computer Science Engineering (CSE) students.

---

## 🌟 Overview & Architecture

**VidyaPath** unifies 20 critical academic, career, and development modules into a seamless portal:

1. **About CSE** - Degree curriculum guide, core pillars, and specialization roadmaps
2. **YouTube Learning Hub** - Curated creators and playlists for DSA & Systems
3. **Coursera & MOOCs** - Accredited certifications & financial aid guidance
4. **Project Blueprints** - Tiered engineering project architectures & codebases
5. **Notes & Platforms** - Semester cheat sheets, W3Schools, LeetCode & HackerRank
6. **Hackathon Hub** - Live hackathon tracker with timers and team matching
7. **Announcements** - Departmental notices, workshop alerts, and drive broadcasts
8. **AI Career Chatbot** - Context-aware student advisor and code guide
9. **Personal Career Roadmap** - Milestone tracking tailored by target year
10. **ATS Resume Builder** - Tech-optimized resume generator with scoring
11. **Global Search** - Command-K search across all modules
12. **Bookmark System** - Folder-based personal library
13. **Placement Hub** - Company hiring patterns, CTC benchmarks, and eligibility
14. **Interview Preparation** - 14 DSA patterns, System Design, and CS core questions
15. **Coding Roadmaps** - Fullstack, AI/ML, DevOps, Cyber, Cloud, and Systems
16. **Skill Assessment** - Timed MCQs and coding practice arena
17. **Student Dashboard** - Daily streak counter, active progress, and saved items
18. **Progress Tracking** - Activity heatmaps and skill radar
19. **Notifications** - Deadline reminders and broadcast alerts
20. **Admin Panel** - Content moderation, placement manager, and student directory

---

## 🎨 Design System: 60:30:10 Dark Green Palette

- **60% Base Canvas**: Clean off-white (`#F8FAF8`, `#FFFFFF`, `#E5E9E6`)
- **30% Structure & Slate**: High-contrast typography (`#0F172A`, `#475569`, `#64748B`)
- **10% Brand Accent**: Deep Forest Green (`#064E3B`, `#0D5C3A`) with Emerald highlights (`#10B981`, `#059669`)

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, React Router, Vanilla CSS Tokens, Lucide React Icons
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT (Access/Refresh Tokens), Helmet, Rate Limiter

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Frontend Dev Server
```bash
npm run dev
```

### 3. Start Backend Dev Server
```bash
npm run dev:server
```

---

## 📂 Project Structure

```
VidyaPath/
├── client/                     # Vite + React + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI primitives (Button, Card, Badge, Input, etc.)
│   │   ├── context/            # AuthContext & Session management
│   │   ├── layouts/            # MainLayout, AuthLayout
│   │   ├── pages/              # 20 Module views & auth pages
│   │   ├── routes/             # AppRoutes with navigation mapping
│   │   ├── services/           # Axios API client with interceptors
│   │   └── styles/             # 60:30:10 Dark Green design tokens
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # DB & Environment config
│   │   ├── constants/          # Enums & Status codes
│   │   ├── middlewares/        # Auth, RBAC, Error & Rate Limiter
│   │   ├── models/             # Mongoose schemas (User, Profile, Resource, etc.)
│   │   ├── routes/             # REST API routers & health checks
│   │   └── utils/              # Standardized ApiResponse & JWT utilities
└── README.md
```

---

## 📄 License
MIT License. Built for Computer Science Engineering students.
