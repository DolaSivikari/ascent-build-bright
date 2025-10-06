import { useEffect } from 'react';

/**
 * PerformanceMonitor - Tracks Core Web Vitals and reports to console
 * For production: integrate with analytics (GA4, Vercel Analytics, etc.)
 */
const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Check for Web Vitals API support
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP) - Target: < 2.5s
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (import.meta.env.DEV) {
          console.log('🎯 LCP:', lastEntry.renderTime || lastEntry.loadTime, 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay (FID) - Target: < 100ms
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (import.meta.env.DEV) {
            console.log('⚡ FID:', entry.processingStart - entry.startTime, 'ms');
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift (CLS) - Target: < 0.1
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (import.meta.env.DEV) {
          console.log('📐 CLS:', clsValue.toFixed(4));
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry && import.meta.env.DEV) {
        console.log('🚀 TTFB:', navigationEntry.responseStart - navigationEntry.requestStart, 'ms');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null; // This is a monitoring-only component
};

export default PerformanceMonitor;
