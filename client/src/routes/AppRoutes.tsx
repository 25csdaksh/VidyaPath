import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Home } from '../pages/Home';
import { AboutCSE } from '../pages/AboutCSE';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { NotFound } from '../pages/error/NotFound';
import { ModulePlaceholder } from '../pages/common/ModulePlaceholder';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Primary Routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        {/* 1. HOME */}
        <Route path="/" element={<Home />} />

        {/* 2. ABOUT CSE */}
        <Route path="/about-cse" element={<AboutCSE />} />

        {/* 3. LEARN */}
        <Route
          path="/learn"
          element={
            <ModulePlaceholder
              moduleName="Learn Hub: Video & Course Directory"
              category="Learning Directory"
              targetPhase="Phase 7"
              description="Curated high-yield video channels, topic-wise playlists for DSA, Web Dev, AI/ML, and Core CS with direct chapter navigation."
              upcomingFeatures={[
                'Channel categorization by subject (Striver, Abdul Bari, Traversy, 3Blue1Brown, etc.)',
                'Difficulty filters (Beginner, Intermediate, Advanced)',
                'Curated playlist progress checkmarks',
                'Direct bookmarking to your personal profile',
              ]}
            />
          }
        />

        {/* 4. PROJECT HUB */}
        <Route
          path="/projects"
          element={
            <ModulePlaceholder
              moduleName="Project Hub & Architectural Blueprint Library"
              category="Hands-on Practice"
              targetPhase="Phase 6"
              description="Searchable repository of real-world CSE engineering projects (Low, Medium, High) with complete system architecture, database design, API specs, and resume bullet generators."
              upcomingFeatures={[
                '12 Domain categories (AI/ML, GenAI, Cyber, FullStack, Backend, DevOps, Systems, Web3)',
                'Full system architecture diagrams and database schema designs',
                'Interactive project progress tracker (Idea → Planning → Building → Testing → Deployed)',
                'Prerequisite roadmap topics and interview defense questions',
              ]}
            />
          }
        />

        {/* 5. HACKATHON HUB */}
        <Route
          path="/hackathons"
          element={
            <ModulePlaceholder
              moduleName="Hackathon Hub & Problem Analyzer"
              category="Opportunities"
              targetPhase="Phase 9"
              description="Real-time directory of student hackathons with live countdown timers, a 12-step Problem Statement Analyzer, team role management, and pitch preparation checklists."
              upcomingFeatures={[
                'Live countdown timers for registration and submission deadlines',
                '12-Step Problem Statement Analyzer (Root Cause, Solution, MVP, Architecture, Success Metrics)',
                'Team role allocation builder (Lead, Frontend, Backend, AI/ML, Pitch/PPT)',
                'Demo day pitch deck checklist and technical Q&A preparation',
              ]}
            />
          }
        />

        {/* 6. PLACEMENT HUB */}
        <Route
          path="/placement"
          element={
            <ModulePlaceholder
              moduleName="Placement Hub & Interview Preparation"
              category="Career Acceleration"
              targetPhase="Phase 8"
              description="Comprehensive interview question archives (DSA, OOP, DBMS, OS, Computer Networks, System Design), 14 core DSA pattern masteries, and company-specific hiring insights."
              upcomingFeatures={[
                '14 Core DSA pattern deep-dives (Two Pointers, Sliding Window, Fast/Slow Pointers, Top K)',
                'Top interview Q&As for DBMS (SQL, ACID, Indexing) and OS (Processes, Virtual Memory)',
                'Company hiring archives (CTC benchmarks, Online Assessment test patterns, past questions)',
                'Topic-wise solved/attempted/bookmarked practice tracker',
              ]}
            />
          }
        />
        <Route path="/placement-hub" element={<Navigate to="/placement" replace />} />
        <Route path="/interview-prep" element={<Navigate to="/placement" replace />} />

        {/* 7. CAREER ROADMAP */}
        <Route
          path="/roadmap"
          element={
            <ModulePlaceholder
              moduleName="Personal Career Roadmap (FY to Final Year)"
              category="Career Guidance"
              targetPhase="Phase 5"
              description="Interactive 4-year and 8-semester roadmap with 6-stage milestone checkpoints (Learn, Practice, Build, Test, Explain, Interview Ready) and progress tracking."
              upcomingFeatures={[
                '4-Year progression: FY (Foundations), SY (Core CSE), TY (Specialization), Final Year (Industry Capstone)',
                'Semester 1 to Semester 8 detailed syllabus and milestone checkoffs',
                'Granular progress bars per subject (e.g. DSA: 60% Complete)',
                'Specialization roadmaps: Fullstack, AI/ML, DevOps, Cybersecurity, Systems & Cloud',
              ]}
            />
          }
        />
        <Route path="/roadmaps" element={<Navigate to="/roadmap" replace />} />

        {/* 8. RESUME */}
        <Route
          path="/resume"
          element={
            <ModulePlaceholder
              moduleName="ATS-Optimized Resume Builder & Analyzer"
              category="Career Tool"
              targetPhase="Phase 10"
              description="Engineered specifically for CS engineering students with single-page tech templates (Harvard / Deedy format), real-time ATS scoring, and PDF export."
              upcomingFeatures={[
                'Section editors: Header, Summary, Education, Skills, Projects, Experience, Hackathons',
                'Role-specific keyword optimization (SWE, Frontend, Backend, AI/ML, DevOps, Cyber)',
                'Zero fake metrics policy: strictly validates student inputs and projects',
                'One-click PDF export and LaTeX template generation',
              ]}
            />
          }
        />
        <Route path="/resume-builder" element={<Navigate to="/resume" replace />} />

        {/* 9. RESOURCES */}
        <Route
          path="/resources"
          element={
            <ModulePlaceholder
              moduleName="International CSE Books & Legal Resource Guide"
              category="Knowledge Base"
              targetPhase="Phase 7"
              description="Legitimate publisher and open-access links to standard computer science reference textbooks across Algorithms, DBMS, OS, Networks, and System Design."
              upcomingFeatures={[
                'Book directory (CLRS, Silberschatz, Tanenbaum, Designing Data-Intensive Applications)',
                'Categorized by difficulty (Beginner, Intermediate, Advanced)',
                'Official library, publisher, and legal open-access citations',
                'Direct bookmarking to your personal reading list',
              ]}
            />
          }
        />
        <Route path="/resources/youtube" element={<Navigate to="/learn" replace />} />
        <Route path="/resources/coursera" element={<Navigate to="/learn" replace />} />
        <Route path="/resources/projects" element={<Navigate to="/projects" replace />} />
        <Route path="/resources/notes" element={<Navigate to="/resources" replace />} />

        {/* 10. ANNOUNCEMENTS */}
        <Route
          path="/announcements"
          element={
            <ModulePlaceholder
              moduleName="Campus & Department Announcements"
              category="Campus Connect"
              targetPhase="Phase 16"
              description="Broadcast board for departmental updates, placement drive alerts, hackathon registrations, workshops, and exam notices with priority badges."
              upcomingFeatures={[
                'Priority tags: Urgent, Normal, Low',
                'Category filters: Placements, Hackathons, Academics, Workshops',
                'Direct deadline reminders and bookmarking',
              ]}
            />
          }
        />

        {/* SECONDARY UTILITIES */}
        <Route
          path="/ai-assistant"
          element={
            <ModulePlaceholder
              moduleName="AI Career Assistant"
              category="AI Advisory"
              targetPhase="Phase 13"
              description="Context-aware AI career mentor referencing VidyaPath's structured knowledge base, roadmaps, project blueprints, and interview banks."
              upcomingFeatures={[
                'Semester-aware guidance ("What should I learn after DSA in Semester 3?")',
                'Project concept review and architectural feedback',
                'Mock technical interview defense partner',
                'Clear distinction between portal knowledge and generative suggestions',
              ]}
            />
          }
        />
        <Route path="/chatbot" element={<Navigate to="/ai-assistant" replace />} />

        <Route
          path="/bookmarks"
          element={
            <ModulePlaceholder
              moduleName="My Bookmarks & Saved Collections"
              category="Personal Library"
              targetPhase="Phase 12"
              description="Organized personal collections of saved projects, interview questions, books, courses, hackathons, and roadmap nodes."
              upcomingFeatures={[
                'Category filters: All, Projects, Interview Q&A, Books, Hackathons, Courses',
                'Custom bookmark collections and folder organization',
                'Export saved resources to Markdown or JSON',
              ]}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ModulePlaceholder
              moduleName="Student Dashboard & Career Readiness Index"
              category="User Center"
              targetPhase="Phase 14"
              description="Personal command center monitoring active 4-year roadmap progress, DSA solved counts, active project milestones, and personalized next recommended actions."
              upcomingFeatures={[
                'Career Progress %, DSA %, Projects %, Resume %, Placement % overview meters',
                'Next Recommended Actions engine based on actual student progress',
                'Daily problem streak tracker and GitHub-style learning heatmap',
              ]}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ModulePlaceholder
              moduleName="Student Profile & Academic Portfolio"
              category="User Center"
              targetPhase="Phase 2"
              description="Manage your college, branch, current semester (1-8), graduation year, target specializations, GitHub/LinkedIn links, and verified skills."
              upcomingFeatures={[
                'Semester & specialization selector to customize portal recommendations',
                'Target role selector (Full-Stack, AI/ML, Cloud/DevOps, Cyber)',
                'Portfolio and resume link synchronization',
              ]}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ModulePlaceholder
              moduleName="Admin Governance & Content Management"
              category="Staff Only"
              targetPhase="Phase 15"
              description="Role-based administration panel for managing project blueprints, placement drives, announcements, book catalogs, and user moderation."
              upcomingFeatures={[
                'Project & Resource seed manager with schema validation',
                'Placement drive creator with eligibility criteria and deadline timers',
                'Urgent announcement broadcast engine',
                'Platform analytics and audit logs',
              ]}
            />
          }
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth Pages wrapped in AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};
