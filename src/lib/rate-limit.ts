const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const RATE_LIMIT_KEY_PREFIX = 'form_submit_';

interface RateLimitData {
  count: number;
  resetTime: number;
}

export const checkRateLimit = (formType: string): { allowed: boolean; resetTime?: number } => {
  const key = `${RATE_LIMIT_KEY_PREFIX}${formType}`;
  const now = Date.now();
  
  try {
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      // First submission
      localStorage.setItem(key, JSON.stringify({ count: 1, resetTime: now + RATE_LIMIT_WINDOW }));
      return { allowed: true };
    }
    
    const data: RateLimitData = JSON.parse(stored);
    
    if (now > data.resetTime) {
      // Window expired, reset
      localStorage.setItem(key, JSON.stringify({ count: 1, resetTime: now + RATE_LIMIT_WINDOW }));
      return { allowed: true };
    }
    
    if (data.count >= 1) {
      // Already submitted within window
      return { allowed: false, resetTime: data.resetTime };
    }
    
    // Increment count
    data.count++;
    localStorage.setItem(key, JSON.stringify(data));
    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true }; // Fail open
  }
};

export const getRemainingTime = (resetTime: number): number => {
  return Math.max(0, Math.ceil((resetTime - Date.now()) / 1000));
};
