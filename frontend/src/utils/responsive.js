import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../config/constants';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width <= BREAKPOINTS.MOBILE,
    isTablet: windowSize.width > BREAKPOINTS.MOBILE && windowSize.width <= BREAKPOINTS.TABLET,
    isDesktop: windowSize.width > BREAKPOINTS.TABLET,
    isMobileOrTablet: windowSize.width <= BREAKPOINTS.TABLET
  };
};

