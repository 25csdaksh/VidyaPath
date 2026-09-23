# VidyaPath Database Architecture & ER Documentation

This document describes the complete MongoDB schema design, relationships, indexing strategies, and lifecycle behaviors implemented in Mongoose for the **CSE Career Portal**.

---

## 1. Entity-Relationship Overview

```
User ──(1:1)── Profile
User ──(1:1)── UserProgress
User ──(1:N)── RoadmapProgress ──(N:1)── Roadmap ──(1:N)── RoadmapItem
User ──(1:N)── ProjectProgress ──(N:1)── Project
User ──(1:N)── Bookmark ──(N:1)── [Project | InterviewQuestion | DSAProblem | Book | Course | YouTubeResource | Resource | Roadmap | Hackathon]
User ──(1:N)── BookmarkCollection
User ──(1:N)── Resume ──(1:N)── ResumeVersion
User ──(1:N)── Notification
User ──(1:N)── AIConversation
```

---

## 2. Models & Schema Details

### 2.1 Identity & User Profile
- **`User`** (`backend/src/models/User.js`):
  - Primary authentication model.
  - Fields: `name`, `email` (lowercase, unique index), `password` (`select: false`), `role` (`student` | `admin`), `isActive`, timestamps.
  - Pre-save bcrypt hashing hook with 12 salt rounds.
  - Methods: `comparePassword()`, `changedPasswordAfter()`.

- **`Profile`** (`backend/src/models/Profile.js`):
  - Extended student portfolio details.
  - Fields: `user` (1:1 ref User), `profilePhoto`, `college`, `degree`, `branch`, `semester` (1-8), `graduationYear`, `bio`, `location`, `linkedin`, `github`, `portfolio`, `careerGoal`, `specialization`, `skills` (ref Skill).
  - Index: `{ specialization: 1, semester: 1 }`.

- **`Skill`** (`backend/src/models/Skill.js`):
  - Canonical taxonomy of technical competencies (Languages, Frameworks, Core CS, Cloud, AI).
  - Fields: `name` (unique), `category`, `description`, `icon`, `proficiencyLevels`.

---

### 2.2 4-Year Career Roadmaps & Progress
- **`Roadmap`** (`backend/src/models/Roadmap.js`):
  - Academic year and semester milestones.
  - Fields: `year` (`FY`, `SY`, `TY`, `FINAL_YEAR`), `semester` (1-8), `title`, `slug` (unique), `description`, `careerPaths`, `skills` (ref Skill), `subjects`, `projects` (ref Project), `resources` (ref Resource), `order`.
  - Compound Index: `{ year: 1, semester: 1 }` (unique).

- **`RoadmapItem`** (`backend/src/models/RoadmapItem.js`):
  - Granular topic nodes per semester roadmap.
  - Fields: `roadmap` (ref Roadmap), `topicName`, `category`, `description`, `learnGuide`, `practiceChecklist`, `buildMilestones`, `testChecklist`, `explainPrompts`, `interviewPrepPrompts`, `relatedResources`, `relatedBooks`, `order`.
  - Compound Index: `{ roadmap: 1, order: 1 }`.

- **`RoadmapProgress`** (`backend/src/models/RoadmapProgress.js`):
  - Student completion tracking for each semester roadmap.
  - Fields: `user` (ref User), `roadmap` (ref Roadmap), `completedItems` (ref RoadmapItem), `itemCheckpoints` (learn, practice, build, test, explain, interviewReady flags), `progressPercentage`, `lastActiveAt`.
  - Compound Index: `{ user: 1, roadmap: 1 }` (unique).

---

### 2.3 Project Hub & Building Status
- **`Project`** (`backend/src/models/Project.js`):
  - Tiered real-world engineering project specifications.
  - Fields: `title`, `slug` (unique), `category` (AI/ML, GenAI, Cyber, WebDev, FullStack, Backend, DataScience, DevOps, Mobile, IoT, Web3, Systems), `difficulty` (`LOW`, `MEDIUM`, `HIGH`), `description`, `problemStatement`, `targetUsers`, `features`, `mvp`, `technologyStack`, `prerequisites`, `skills` (ref Skill), `architecture`, `databaseRequirements`, `apiRequirements`, `security`, `testing`, `deployment`, `futureScope`, `resumeGuidance`, `interviewQuestions`, `status`, `createdBy`, `updatedBy`.
  - Indexes: `{ category: 1, difficulty: 1 }` and full text search `{ title: 'text', description: 'text', problemStatement: 'text' }`.

- **`ProjectProgress`** (`backend/src/models/ProjectProgress.js`):
  - Active building lifecycle for a student on a project.
  - Fields: `user` (ref User), `project` (ref Project), `status` (`Idea` | `Planning` | `Building` | `Testing` | `Deployed` | `Completed`), `customRepoUrl`, `liveDemoUrl`, `completedMilestones`, `studentNotes`.
  - Compound Index: `{ user: 1, project: 1 }` (unique).

---

### 2.4 Placement Hub, Interviews & DSA Practice
- **`InterviewQuestion`** (`backend/src/models/InterviewQuestion.js`):
  - Comprehensive question archives across CS fundamentals & behavioural rounds.
  - Fields: `question`, `answer`, `category` (`DSA`, `OOP`, `DBMS`, `SQL`, `OS`, `CN`, `Programming`, `Web`, `AI/ML`, `Cybersecurity`, `Cloud/DevOps`, `Project`, `HR`, `Behavioral`, `System Design`), `topic`, `difficulty` (`Easy`, `Medium`, `Hard`), `tags`, `keyTakeaways`, `commonPitfalls`, `relatedProjects`, `relatedSkills`.
  - Compound Index: `{ category: 1, topic: 1, difficulty: 1 }` and text index.

- **`DSAProblem`** (`backend/src/models/DSAProblem.js`):
  - Categorized DSA problem sets by fundamental topic.
  - Fields: `title`, `slug` (unique), `topic` (Arrays, Strings, LinkedList, Stacks, Queues, Trees, Graphs, Hashing, Searching, Sorting, Recursion, DP, Trie, Bit Manipulation), `difficulty`, `conceptSummary`, `timeComplexity`, `spaceComplexity`, `commonPatterns`, `solutionApproach`, `externalLinks`, `relatedInterviewQuestions`.
  - Compound Index: `{ topic: 1, difficulty: 1 }`.

---

### 2.5 Learning Resources & Books
- **`Book`** (`backend/src/models/Book.js`):
  - Legitimate standard academic textbooks and reference guides.
  - Fields: `title`, `authors`, `category` (Programming, DSA, WebDev, DBMS, OS, Networks, Systems, AI, Math), `level` (`Beginner`, `Intermediate`, `Advanced`, `Research`), `description`, `publisher`, `edition`, `officialUrl` (publisher/legal catalog), `libraryUrl`, `coverImageUrl`, `tags`.
  - Compound Index: `{ category: 1, level: 1 }` and text search.

- **`Resource`** (`backend/src/models/Resource.js`):
  - Notes, cheat sheets, and documentation links.
  - Fields: `title`, `slug` (unique), `type` (`notes`, `cheat_sheet`, `documentation`, `external_platform`, `syllabus_guide`), `category`, `difficulty`, `url`, `description`, `tags`, `isFeatured`, `downloadUrl`, `rating`.

- **`Course`** (`backend/src/models/Course.js`):
  - Accredited certifications and MOOCs from Coursera, edX, Stanford Online, etc.
  - Fields: `title`, `provider`, `instructor`, `institution`, `category`, `difficulty`, `url`, `description`, `isFree`, `hasFinancialAid`, `estimatedHours`, `rating`, `skillsTaught`, `tags`.

- **`YouTubeResource`** (`backend/src/models/YouTubeResource.js`):
  - Curated high-yield video channels and playlists.
  - Fields: `title`, `channelName`, `playlistUrl`, `videoUrl`, `category`, `difficulty`, `description`, `topicsCovered`, `estimatedHours`, `language`, `tags`.

---

### 2.6 Hackathons & Announcements
- **`Hackathon`** (`backend/src/models/Hackathon.js`):
  - Live hackathon directory with countdowns and problem themes.
  - Fields: `name`, `organizer`, `description`, `registrationUrl`, `startDate`, `endDate`, `registrationDeadline`, `location`, `mode` (`Online`, `Offline`, `Hybrid`), `teamSize`, `eligibility`, `prizeInformation`, `technology`, `problemThemes`, `status` (`Upcoming`, `Active`, `Past`), `bannerImageUrl`.

- **`Announcement`** (`backend/src/models/Announcement.js`):
  - Broadcast notices with priority tagging.
  - Fields: `title`, `description`, `category` (`Hackathons`, `Internships`, `Placements`, `Courses`, `Workshops`, `Competitions`, `CSE Events`, `Deadlines`), `priority` (`low`, `normal`, `urgent`), `actionUrl`, `actionLabel`, `authorName`, `deadline`, `expiresAt`, `isBroadcast`.

---

### 2.7 Bookmarks & Personal Library
- **`Bookmark`** (`backend/src/models/Bookmark.js`):
  - Unified bookmarking referencing any resource type polymorphically via `refPath`.
  - Fields: `user` (ref User), `resourceType` (`Project` | `InterviewQuestion` | `DSAProblem` | `Book` | `Course` | `YouTubeResource` | `Resource` | `Roadmap` | `Hackathon`), `resourceId` (refPath), `collectionId` (ref BookmarkCollection), `notes`.
  - Compound Unique Index: `{ user: 1, resourceType: 1, resourceId: 1 }` (prevents duplicates).

- **`BookmarkCollection`** (`backend/src/models/BookmarkCollection.js`):
  - Custom user-created folders for organizing bookmarks.
  - Fields: `user` (ref User), `name`, `description`, `isPrivate`.
  - Compound Unique Index: `{ user: 1, name: 1 }`.

---

### 2.8 Resume Builder & Versions
- **`Resume`** (`backend/src/models/Resume.js`):
  - Structured ATS resume definition.
  - Fields: `user` (ref User), `title`, `targetRole` (SWE, Frontend, Backend, FullStack, AI/ML, DataScience, Cyber, Cloud), `header`, `summary`, `education`, `skills`, `projects`, `experience`, `internships`, `certifications`, `hackathons`, `achievements`, `leadership`, `atsScoreEstimate`, `activeVersion`.

- **`ResumeVersion`** (`backend/src/models/ResumeVersion.js`):
  - Snapshot history for version rollbacks.
  - Fields: `resume` (ref Resume), `versionNumber`, `snapshotData`, `changeSummary`.
  - Compound Unique Index: `{ resume: 1, versionNumber: 1 }`.

---

### 2.9 Intelligence, Analytics & Notifications
- **`UserProgress`** (`backend/src/models/UserProgress.js`):
  - Aggregated readiness metrics and learning streak.
  - Fields: `user` (ref User, unique), `currentStreak`, `longestStreak`, `lastActiveDate`, `dsaSolvedProblems`, `interviewPracticedQuestions`, `readinessScores`, `activityHeatmap` (`[{ date, activityCount }]`).

- **`AIConversation`** (`backend/src/models/AIConversation.js`):
  - Session history for context-aware AI career counseling.
  - Fields: `user` (ref User), `title`, `sessionContext` (`semester`, `specialization`, `targetRole`), `messages` (`[{ role, content, sourceReferences, createdAt }]`), `isArchived`.

- **`Notification`** (`backend/src/models/Notification.js`):
  - Real-time student alerts for deadlines and broadcasts.
  - Fields: `user` (ref User), `title`, `message`, `category`, `isRead`, `actionUrl`.
