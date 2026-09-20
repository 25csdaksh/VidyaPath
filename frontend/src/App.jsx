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

// 23 Ordered Pages
import HomePage from './pages/HomePage'; // 1. Home
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
                {/* Main App Layout */}
                <Route element={<MainLayout />}>
                  {/* 1. Home */}
                  <Route path="/" element={<HomePage />} />

                  {/* 2. About CSE */}
                  <Route path="/about-cse" element={<AboutCsePage />} />

                  {/* 3. Career Roadmap */}
                  <Route path="/roadmap" element={<RoadmapPage />} />

                  {/* 4. Project Hub */}
                  <Route path="/projects" element={<ProjectsPage />} />

                  {/* 5. Project Details */}
                  <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

                  {/* 6. Learning Resources */}
                  <Route path="/resources" element={<ResourcesPage />} />

                  {/* 7. Books */}
                  <Route path="/books" element={<BooksPage />} />

                  {/* 8. Courses */}
                  <Route path="/courses" element={<CoursesPage />} />

                  {/* 9. YouTube */}
                  <Route path="/youtube" element={<YouTubePage />} />

                  {/* 10. Hackathon Hub */}
                  <Route path="/hackathons" element={<HackathonsPage />} />

                  {/* 11. Hackathon Details */}
                  <Route path="/hackathons/:id" element={<HackathonDetailsPage />} />

                  {/* 12. Placement Hub */}
                  <Route path="/placement-hub" element={<PlacementHubPage />} />

                  {/* 13. Interview Practice */}
                  <Route path="/interviews" element={<InterviewPracticePage />} />

                  {/* 14. Resume Guide */}
                  <Route path="/resume-guide" element={<ResumeGuidePage />} />

                  {/* AI Study Advisor & Curriculum Generator */}
                  <Route path="/advisor" element={<AIAdvisorPage />} />

                  {/* 15. Resume Builder (Protected) */}
                  <Route
                    path="/resumes"
                    element={
                      <ProtectedRoute>
                        <ResumeBuilderPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 16. Announcements */}
                  <Route path="/announcements" element={<AnnouncementsPage />} />

                  {/* 17. Global Search */}
                  <Route path="/search" element={<GlobalSearchPage />} />

                  {/* 18. Bookmarks (Protected) */}
                  <Route
                    path="/bookmarks"
                    element={
                      <ProtectedRoute>
                        <BookmarksPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 19. Student Dashboard (Protected) */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 20. Profile (Protected) */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* AI Career Assistant (Protected) */}
                  <Route
                    path="/ai-assistant"
                    element={
                      <ProtectedRoute>
                        <AiAssistantPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 23. Admin Dashboard (Protected) */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Design System Reference */}
                  <Route path="/foundation-demo" element={<FoundationDemoPage />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Authentication Routes wrapped in AuthLayout */}
                <Route element={<AuthLayout />}>
                  {/* 21. Login */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* 22. Register */}
                  <Route path="/register" element={<RegisterPage />} />
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
