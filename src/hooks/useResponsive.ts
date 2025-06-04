
import { useState, useCallback } from 'react';

export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

interface ResponsiveConfig {
  desktop: { width: 1200, height: 800 };
  tablet: { width: 768, height: 1024 };
  mobile: { width: 375, height: 667 };
}

const breakpoints: ResponsiveConfig = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 }
};

export const useResponsive = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');

  const getBreakpointStyles = useCallback((breakpoint: Breakpoint) => {
    const config = breakpoints[breakpoint];
    return {
      width: `${config.width}px`,
      height: `${config.height}px`,
      maxWidth: '100%',
      margin: '0 auto',
      transition: 'all 0.3s ease'
    };
  }, []);

  const getCanvasClass = useCallback((breakpoint: Breakpoint) => {
    switch (breakpoint) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-3xl';
      default:
        return 'max-w-6xl';
    }
  }, []);

  return {
    currentBreakpoint,
    setCurrentBreakpoint,
    getBreakpointStyles,
    getCanvasClass,
    breakpoints
  };
};
