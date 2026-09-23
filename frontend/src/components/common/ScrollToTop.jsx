import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically resets window and container scroll position to the top (0, 0)
 * whenever the user navigates to a new route.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll window, document, and body to top
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Also reset scroll on main content wrapper if applicable
    const mainWrapper = document.querySelector('.main-content-wrapper');
    if (mainWrapper) {
      mainWrapper.scrollTop = 0;
    }
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
      pageContainer.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
