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
      {/* Public Pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-cse" element={<AboutCSE />} />

        {/* Phase 2: Learning & Discovery */}
        <Route
          path="/resources/youtube"
          element={
            <ModulePlaceholder
              moduleName="YouTube Learning Resources Hub"
              category="Learning Directory"
              targetPhase="Phase 2"
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
        <Route
          path="/resources/coursera"
          element={
            <ModulePlaceholder
              moduleName="Coursera & MOOCs Certification Directory"
              category="Accredited Learning"
              targetPhase="Phase 2"
              description="Handpicked certifications from Stanford, DeepLearning.AI, IBM, and Google with direct links and financial aid guides."
              upcomingFeatures={[
                'Specialization and Professional Certificate indexing',
                'Estimated completion time and weekly workload calculator',
                'Financial aid application step-by-step guidance',
                'Skill tag search (Cloud, Deep Learning, Fullstack)',
              ]}
            />
          }
        />
        <Route
          path="/resources/projects"
          element={
            <ModulePlaceholder
              moduleName="Project Blueprints & Ideas Repository"
              category="Hands-on Practice"
              targetPhase="Phase 2"
              description="Tiered engineering project ideas featuring full system architecture diagrams, recommended tech stacks, and GitHub starters."
              upcomingFeatures={[
                'Tiered difficulty levels (Beginner, Intermediate, Production/Capstone)',
                'Full architectural blueprints and schema guides',
                'Recommended API integrations and starter boilerplate links',
                'Resume bullet-point generators for each project',
              ]}
            />
          }
        />
        <Route
          path="/resources/notes"
          element={
            <ModulePlaceholder
              moduleName="Notes, W3Schools & External Platforms"
              category="Knowledge Base"
              targetPhase="Phase 2"
              description="Semester-wise revision notes, quick-reference cheat sheets, and integrated links for W3Schools, LeetCode, and HackerRank."
              upcomingFeatures={[
                'Concise PDF/Markdown notes for OS, DBMS, CN, and TOC',
                'Direct links to LeetCode 75, NeetCode 150, and Striver A2Z sheets',
                'W3Schools language syntax cheat sheets',
                'Offline download options for fast semester prep',
              ]}
            />
          }
        />

        {/* Phase 3: Roadmaps & Practice */}
        <Route
          path="/roadmaps"
          element={
            <ModulePlaceholder
              moduleName="Interactive Coding Roadmaps"
              category="Career Guidance"
              targetPhase="Phase 3"
              description="Dynamic roadmap graphs covering Fullstack Web, AI/ML, DevOps, Cybersecurity, Systems, and DSA with progress checkoffs."
              upcomingFeatures={[
                'Interactive node-based visual roadmap graphs',
                'Milestone checkbox tracking saved to your database profile',
                'Curated reading & video materials per roadmap node',
                'Custom personal roadmap generator by graduation year',
              ]}
            />
          }
        />
        <Route
          path="/placement-hub"
          element={
            <ModulePlaceholder
              moduleName="Placement Hub & Company Archive"
              category="Career Acceleration"
              targetPhase="Phase 3"
              description="Tier-1/Tier-2 company hiring patterns, CTC breakdowns, eligibility criteria, online assessment formats, and campus drives."
              upcomingFeatures={[
                'FAANG / Product / Service company breakdown & CTC benchmarks',
                'Past online test (OT) question patterns and coding topics',
                'Eligibility filter (CGPA, Branch, Year)',
                'Live recruitment drive notification alerts',
              ]}
            />
          }
        />
        <Route
          path="/interview-prep"
          element={
            <ModulePlaceholder
              moduleName="Interview Preparation & CS Fundamentals"
              category="Career Acceleration"
              targetPhase="Phase 3"
              description="Comprehensive DSA patterns, System Design primers, and top 100 core subject interview questions."
              upcomingFeatures={[
                '14 Essential DSA patterns (Two Pointers, Sliding Window, Top K, etc.)',
                'Low-Level and High-Level System Design primers for students',
                'Top 50 interview questions for DBMS, OS, Computer Networks & OOPs',
                'Mock behavioral and HR interview question bank',
              ]}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ModulePlaceholder
              moduleName="Student Dashboard & Learning Analytics"
              category="User Center"
              targetPhase="Phase 3"
              description="Personal command center monitoring active roadmaps, daily problem streaks, saved items, and upcoming deadlines."
              upcomingFeatures={[
                'Active roadmap completion percentage meters',
                'Daily problem solving streak counter and GitHub-style heatmap',
                'Quick access to saved bookmarks and notes',
                'Target graduation timeline and readiness index',
              ]}
            />
          }
        />
        <Route
          path="/progress"
          element={
            <ModulePlaceholder
              moduleName="Progress Tracking & Heatmap"
              category="User Center"
              targetPhase="Phase 3"
              description="Detailed metrics and historical activity breakdown across quizzes, roadmaps, and DSA sheets."
              upcomingFeatures={[
                'Weekly and monthly activity logs',
                'Skill radar chart by CS domain',
                'Milestone completion certificates',
              ]}
            />
          }
        />

        {/* Phase 4: Opportunities & Practice */}
        <Route
          path="/hackathons"
          element={
            <ModulePlaceholder
              moduleName="Hackathon Hub"
              category="Opportunities"
              targetPhase="Phase 4"
              description="Real-time directory of national and global student hackathons with countdown timers, team matching, and prize details."
              upcomingFeatures={[
                'Live countdown timers for registration and submission deadlines',
                'Mode filter (Online, In-person, Hybrid)',
                'Team formation matchmaker board for students',
                'Direct registration links and submission reminders',
              ]}
            />
          }
        />
        <Route
          path="/announcements"
          element={
            <ModulePlaceholder
              moduleName="Department & Campus Announcements"
              category="Campus Connect"
              targetPhase="Phase 4"
              description="Central broadcast board for departmental notices, workshop announcements, tech fests, and placement alerts."
              upcomingFeatures={[
                'Priority tags (Urgent, Normal, Low)',
                'Category filters (Placements, Hackathons, Academics, Workshops)',
                'Push notifications for critical departmental notices',
              ]}
            />
          }
        />
        <Route
          path="/assessments"
          element={
            <ModulePlaceholder
              moduleName="Skill Assessment & Mock Arena"
              category="Skill Verification"
              targetPhase="Phase 4"
              description="Timed technical MCQs and coding quizzes to evaluate readiness in DSA, SQL, Web, and Core CS subjects."
              upcomingFeatures={[
                'Timed 20-minute rapid-fire technical quizzes',
                'Automated scoring and comprehensive answer explanations',
                'Weak-topic identification and targeted resource recommendations',
              ]}
            />
          }
        />

        {/* Phase 5: AI Tools & Utility */}
        <Route
          path="/chatbot"
          element={
            <ModulePlaceholder
              moduleName="AI Career Chatbot"
              category="AI Advisory"
              targetPhase="Phase 5"
              description="Context-aware AI career counselor capable of answering syllabus queries, reviewing project ideas, and debugging concepts."
              upcomingFeatures={[
                'Streamed AI responses tailored to CSE curricula and tech stacks',
                'Pre-engineered prompt templates (Code review, Resume bullet builder, Career advice)',
                'Domain-specific roadmapping and interview Q&A mock partner',
              ]}
            />
          }
        />
        <Route
          path="/resume-builder"
          element={
            <ModulePlaceholder
              moduleName="ATS-Optimized Resume Builder"
              category="Career Tool"
              targetPhase="Phase 5"
              description="Interactive resume builder designed specifically for CS students with standard single-page tech formats and ATS scoring."
              upcomingFeatures={[
                'Single-page tech resume templates (Standard Harvard / Deedy format)',
                'Real-time ATS keyword matching against job descriptions',
                'Direct PDF and LaTeX code export',
              ]}
            />
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ModulePlaceholder
              moduleName="Unified Bookmark System"
              category="Personal Library"
              targetPhase="Phase 2"
              description="Organized personal collections of saved roadmaps, interview questions, hackathons, and learning resources."
              upcomingFeatures={[
                'Categorized bookmark folders (Interview Prep, Weekend Watch, Hackathons)',
                'Quick-tagging and personal note annotations',
                'Export bookmarks to JSON or Markdown',
              ]}
            />
          }
        />
        <Route
          path="/notifications"
          element={
            <ModulePlaceholder
              moduleName="Notification Center"
              category="Platform Alerts"
              targetPhase="Phase 4"
              description="Personalized notifications for upcoming application deadlines, newly published resources, and announcements."
              upcomingFeatures={[
                'Deadline reminders 24 hours prior to placement/hackathon closures',
                'Mark as read / unread filters',
              ]}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ModulePlaceholder
              moduleName="Admin & Faculty Moderation Panel"
              category="Platform Governance"
              targetPhase="Phase 5"
              description="Role-based administration dashboard for approving student submissions, adding company drives, and broadcasting alerts."
              upcomingFeatures={[
                'Resource curation & approval queue',
                'Placement drive creator with deadline management',
                'Broadcast announcement authoring with urgent priority tagging',
                'User role management and student directory',
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
