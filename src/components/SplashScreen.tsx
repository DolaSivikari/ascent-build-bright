import { useEffect, useState } from 'react';
import logo from '@/assets/ascent-logo-optimized.webp';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total animation duration: last animation delay (1.4s) + duration (0.5s) + buffer (0.3s) = 2.2s
    const ANIMATION_DURATION = 2200;
    const FADE_OUT_DURATION = 400;

    const timer = setTimeout(() => {
      setIsVisible(false);
      
      // Wait for fade out transition to complete
      setTimeout(() => {
        onComplete();
      }, FADE_OUT_DURATION);
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`splash-overlay ${!isVisible ? 'splash-overlay--fade-out' : ''}`}
      aria-label="Loading"
      role="progressbar"
    >
      <div className="splash__inner">
        <img 
          src={logo} 
          alt="Ascent Group Construction" 
          className="splash__logo"
        />
        <div className="splash__tag">Building Bright Futures</div>
        <div className="splash__shapes">
          <span className="shape shape--rect" aria-hidden="true"></span>
          <span className="shape shape--circle" aria-hidden="true"></span>
          <span className="shape shape--line" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
