# 📊 VidyaPath — Datasets, Knowledge Base & Seed Data

> **Curriculum Datasets • Seed Records • Mongoose Schemas • Academic Knowledge Base**

This branch contains the curated datasets, seed files, and schema structures for **VidyaPath (CHARUSAT Vidyapath | CSE Career Branch Ecosystem)**.

---

## 📂 Directory Overview

```
.
├── curriculum/          # Structured JSON knowledge base for 4 Academic Years
│   ├── 1st_year_foundation.json          # Sem 1 & 2 (C, Web, Math, Electronics, Logic)
│   ├── 2nd_year_core_cse.json            # Sem 3 & 4 (DSA, OOP, OS, DBMS, DAA)
│   ├── 3rd_year_specialization.json      # Sem 5 & 6 (Networks, SE, Cloud, AI, Electives)
│   ├── 4th_year_placement_capstone.json  # Sem 7 & 8 (Major Project, System Design, Placements)
│   └── all_years_curriculum.json         # Master aggregate dataset
│
├── seed_data/           # JavaScript Seed Datasets & Loaders for MongoDB
│   ├── books.js              # Standard engineering textbooks (CLRS, Galvin, Korth, Tanenbaum)
│   ├── courses.js            # Coursera, NPTEL, edX, and free certification paths
│   ├── projects.js           # Industry-level tiered capstone project ideas & architectures
│   ├── interviewQuestions.js # Blind 75 / NeetCode 150 DSA questions & CS core solutions
│   ├── hackathons.js         # SIH & national hackathon guide records
│   ├── resources.js          # Semester-wise syllabus and notes
│   ├── roadmap.js            # Semester-wise milestones & checklist data
│   ├── skills.js             # Categorized tech skills and domains
│   ├── youtubeResources.js   # Top YouTube channel & playlist curation
│   ├── announcements.js      # Placement & academic announcement templates
│   └── seed.js               # Database seeding orchestration runner
│
└── schemas/             # Mongoose Data Models & Document Schemas (28 Models)
    ├── User.js, Profile.js, AuditLog.js
    ├── Book.js, Course.js, Project.js, Hackathon.js
    ├── InterviewQuestion.js, DSAProblem.js, Resource.js
    ├── Roadmap.js, RoadmapItem.js, RoadmapProgress.js
    ├── Bookmark.js, BookmarkCollection.js
    └── CurriculumKnowledge.js, AIConversation.js
```

---

## 💡 How to Use These Datasets

### 1. In MongoDB / Express Backend:
You can run the seeder script to populate your database with all data:
```bash
node seed_data/seed.js
```

### 2. In Custom AI / LLM Context or RAG Pipelines:
The JSON files in `curriculum/` are pre-structured with:
- Semester mapping
- Subject core competencies
- Recommended textbooks
- Practice problems & milestones
- Industry readiness rubrics
