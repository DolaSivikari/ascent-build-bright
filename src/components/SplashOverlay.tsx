import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '@/assets/ascent-logo-optimized.webp';

type Props = {
  waitImages?: string[];
  onlyFirstVisit?: boolean;
  maxWait?: number;
  onFinish?: () => void;
};

const SplashOverlay = ({
  waitImages = [],
  onlyFirstVisit = true,
  maxWait = 3500,
  onFinish,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Check first-visit preference
  useEffect(() => {
    try {
      if (onlyFirstVisit && typeof window !== 'undefined') {
        const seen = localStorage.getItem('ascent_splash_seen_v1');
        if (seen) return;
      }
    } catch (e) {
      // ignore storage errors
    }
    setVisible(true);
  }, [onlyFirstVisit]);

  // GSAP animation lifecycle
  useEffect(() => {
    if (!visible) return;
    
    const el = rootRef.current;
    if (!el) return;

    const logoEl = el.querySelector('.splash-logo') as HTMLElement | null;
    const tagEl = el.querySelector('.splash-tag') as HTMLElement | null;
    const shapesEl = el.querySelector('.splash-shapes') as HTMLElement | null;
    const skipBtn = el.querySelector('.splash-skip') as HTMLElement | null;

    // Focus skip button for accessibility
    if (skipBtn) {
      skipBtn.focus();
    }

    // Entrance timeline
    const tl = gsap.timeline();
    tl.set(el, { autoAlpha: 1 });
    tl.fromTo(
      logoEl,
      { y: 20, autoAlpha: 0, scale: 0.95 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
      0
    );
    tl.fromTo(
      tagEl,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
      0.4
    );
    tl.fromTo(
      shapesEl,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
      0.9
    );

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;

      const out = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          try {
            localStorage.setItem('ascent_splash_seen_v1', '1');
          } catch (e) {
            // ignore storage errors
          }
          setVisible(false);
          onFinish?.();
        },
      });
      out.to(el, { yPercent: -100, autoAlpha: 0, duration: 0.8 });
    };

    // Wait for fonts
    const waitForFonts = async () => {
      if ((document as any).fonts && (document as any).fonts.ready) {
        try {
          await (document as any).fonts.ready;
        } catch (e) {
          // ignore errors
        }
      }
    };

    // Wait for images
    const waitForImages = async () => {
      const urls = waitImages.filter(Boolean);
      if (!urls.length) return;
      await Promise.all(
        urls.map(
          (u) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = u;
            })
        )
      );
    };

    const timeout = window.setTimeout(() => finish(), maxWait);
    
    Promise.all([waitForFonts(), waitForImages()])
      .then(() => {
        clearTimeout(timeout);
        window.setTimeout(() => finish(), 300);
      })
      .catch(() => {
        clearTimeout(timeout);
        finish();
      });

    return () => {
      tl.kill();
      window.clearTimeout(timeout);
    };
  }, [visible, waitImages, maxWait, onFinish]);

  if (!visible) return null;

  const handleSkip = () => {
    try {
      localStorage.setItem('ascent_splash_seen_v1', '1');
    } catch (e) {
      // ignore storage errors
    }
    const el = rootRef.current;
    if (el) {
      gsap.to(el, {
        yPercent: -100,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          setVisible(false);
          onFinish?.();
        },
      });
    }
  };

  return (
    <div
      ref={rootRef}
      className="splash-overlay"
      aria-hidden={!visible}
      role="dialog"
      aria-label="Loading"
    >
      <div className="splash__inner">
        <img 
          src={logo} 
          alt="Ascent Group Construction" 
          className="splash-logo splash__logo"
        />
        <div className="splash-tag splash__tag">Building Bright Futures</div>
        <div className="splash-shapes splash__shapes">
          <span className="shape shape--rect" aria-hidden="true"></span>
          <span className="shape shape--circle" aria-hidden="true"></span>
          <span className="shape shape--line" aria-hidden="true"></span>
        </div>
        <button
          className="splash-skip mt-6 text-sm underline text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-3 py-1"
          onClick={handleSkip}
          onKeyDown={(e) => e.key === 'Enter' && handleSkip()}
          aria-label="Skip entrance animation"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};

export default SplashOverlay;
