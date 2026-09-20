import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Layouts & Guards
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage'; // Public Theme & Landing Showcase Page
import AboutCsePage from './pages/AboutCsePage'; // 2. About CSE
import RoadmapPage from './pages/RoadmapPage'; // 3. Career Roadmap
import ProjectsPage from './pages/ProjectsPage'; // 4. Project Hub
import ProjectDetailsPage from './pages/ProjectDetailsPage'; // 5. Project Details
import ResourcesPage from './pages/ResourcesPage'; // 6. Learning Resources
import BooksPage from './pages/BooksPage'; // 7. Books
import CoursesPage from './pages/CoursesPage'; // 8. Courses
import YouTubePage from './pages/YouTubePage'; // 9. YouTube
import HackathonsPage from './pages/HackathonsPage'; // 10. Hackathon Hub
import HackathonDetailsPage from './pages/HackathonDetailsPage'; // 11. Hackathon Details
import PlacementHubPage from './pages/PlacementHubPage'; // 12. Placement Hub
import InterviewPracticePage from './pages/InterviewPracticePage'; // 13. Interview Practice
import ResumeGuidePage from './pages/ResumeGuidePage'; // 14. Resume Guide
import ResumeBuilderPage from './pages/ResumeBuilderPage'; // 15. Resume Builder
import AnnouncementsPage from './pages/AnnouncementsPage'; // 16. Announcements
import GlobalSearchPage from './pages/GlobalSearchPage'; // 17. Global Search
import BookmarksPage from './pages/BookmarksPage'; // 18. Bookmarks
import DashboardPage from './pages/DashboardPage'; // 19. Student Dashboard
import ProfilePage from './pages/ProfilePage'; // 20. Profile
import LoginPage from './pages/LoginPage'; // 21. Login
import RegisterPage from './pages/RegisterPage'; // 22. Register
import AdminDashboardPage from './pages/AdminDashboardPage'; // 23. Admin Dashboard
import AiAssistantPage from './pages/AiAssistantPage'; // AI Career Assistant
import AIAdvisorPage from './pages/AIAdvisorPage'; // AI Academic Advisor & Study Plan Generator

import FoundationDemoPage from './pages/FoundationDemoPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                {/* 1. Public Landing / Theme Showcase Page */}
                <Route path="/" element={<LandingPage />} />

                {/* 2. Public Authentication Gateway (Login & Register) */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* 3. Protected Internal Portal (Requires Login / Sign Up) */}
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Student Dashboard */}
                  <Route path="/dashboard" element={<DashboardPage />} />

                  {/* About CSE */}
                  <Route path="/about-cse" element={<AboutCsePage />} />

                  {/* Career Roadmap */}
                  <Route path="/roadmap" element={<RoadmapPage />} />

                  {/* AI Study Advisor & Curriculum Generator */}
                  <Route path="/advisor" element={<AIAdvisorPage />} />

                  {/* Project Hub */}
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

                  {/* Learning Resources & Academics */}
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/youtube" element={<YouTubePage />} />

                  {/* Hackathons Hub */}
                  <Route path="/hackathons" element={<HackathonsPage />} />
                  <Route path="/hackathons/:id" element={<HackathonDetailsPage />} />

                  {/* Placement Hub & Interview Practice */}
                  <Route path="/placement-hub" element={<PlacementHubPage />} />
                  <Route path="/interviews" element={<InterviewPracticePage />} />

                  {/* Resume Guide & Live Builder */}
                  <Route path="/resume-guide" element={<ResumeGuidePage />} />
                  <Route path="/resumes" element={<ResumeBuilderPage />} />

                  {/* Announcements & Global Search */}
                  <Route path="/announcements" element={<AnnouncementsPage />} />
                  <Route path="/search" element={<GlobalSearchPage />} />

                  {/* Bookmarks & Student Profile */}
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* AI Career Assistant */}
                  <Route path="/ai-assistant" element={<AiAssistantPage />} />

                  {/* Admin Dashboard (Admin Role Only) */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Design System Reference */}
                  <Route path="/foundation-demo" element={<FoundationDemoPage />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
