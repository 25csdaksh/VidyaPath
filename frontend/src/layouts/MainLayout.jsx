import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import AiAssistantDrawer from '../components/ai/AiAssistantDrawer';

export const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 900) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setDesktopCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-container ${desktopCollapsed ? 'sidebar-collapsed' : ''}`}>
      {mobileSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeMobileSidebar}
          aria-label="Close menu"
        />
      )}
      <Sidebar
        isOpen={mobileSidebarOpen}
        isCollapsed={desktopCollapsed}
        onClose={closeMobileSidebar}
      />
      <div className={`main-content-wrapper ${desktopCollapsed ? 'collapsed' : ''}`}>
        <Navbar onToggleSidebar={toggleSidebar} isSidebarCollapsed={desktopCollapsed} />
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

