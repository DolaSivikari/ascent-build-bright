import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import SplashOverlay from '../../src/components/SplashOverlay';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    timeline: vi.fn(() => ({
      set: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    to: vi.fn((target, vars) => {
      if (vars.onComplete) vars.onComplete();
    }),
  },
}));

describe('SplashOverlay', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('renders when onlyFirstVisit is false', () => {
    render(<SplashOverlay onlyFirstVisit={false} maxWait={50} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('does not render when already seen and onlyFirstVisit is true', () => {
    localStorage.setItem('ascent_splash_seen_v1', '1');
    render(<SplashOverlay onlyFirstVisit={true} maxWait={50} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders skip button and handles click', async () => {
    render(<SplashOverlay onlyFirstVisit={false} maxWait={50} />);
    
    const skipButton = screen.getByRole('button', { name: /skip entrance animation/i });
    expect(skipButton).toBeInTheDocument();
    
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('ascent_splash_seen_v1')).toBe('1');
    });
  });

  test('calls onFinish callback when skip is clicked', async () => {
    const onFinish = vi.fn();
    render(<SplashOverlay onlyFirstVisit={false} maxWait={50} onFinish={onFinish} />);
    
    const skipButton = screen.getByRole('button', { name: /skip entrance animation/i });
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
    });
  });

  test('skip button handles Enter key press', () => {
    render(<SplashOverlay onlyFirstVisit={false} maxWait={50} />);
    
    const skipButton = screen.getByRole('button', { name: /skip entrance animation/i });
    fireEvent.keyDown(skipButton, { key: 'Enter' });
    
    expect(localStorage.getItem('ascent_splash_seen_v1')).toBe('1');
  });
});
