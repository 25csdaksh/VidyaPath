import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import AiAssistantDrawer from '../components/ai/AiAssistantDrawer';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content-wrapper">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="page-container">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      <AiAssistantDrawer />
    </div>
  );
};

export default MainLayout;
