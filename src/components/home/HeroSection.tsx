import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroPoster from "/assets/hero-poster.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ projects: 0, years: 0, coverage: 0, satisfaction: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate counters
          const duration = 1600;
          const targets = { projects: 500, years: 16, coverage: 60, satisfaction: 98 };
          const steps = 60;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setCounters({
              projects: Math.floor(targets.projects * progress),
              years: Math.floor(targets.years * progress),
              coverage: Math.floor(targets.coverage * progress),
              satisfaction: Math.floor(targets.satisfaction * progress),
            });

            if (step >= steps) {
              clearInterval(timer);
              setCounters(targets);
            }
          }, duration / steps);

          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Poster Image with Parallax - Always loaded */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <img
          src={heroPoster}
          alt=""
          className="w-full h-[120%] object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[hsl(var(--deep-blue))]/90" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              currentColor 50px,
              currentColor 51px
            )`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Tagline Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-white">Small jobs welcome • No project too small</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-heading font-extrabold text-white mb-6 transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            Small jobs. <span className="text-secondary">Big care.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`max-w-2xl mx-auto text-lg md:text-xl text-white/95 mb-6 transition-all duration-600 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            From a leaky faucet to a fresh-painted room or a tidy patio repair — fast, friendly, affordable. Free estimates in 24–48 hours.
          </p>

          {/* Short intro */}
          <p
            className={`max-w-3xl mx-auto text-base text-white/90 mb-10 transition-all duration-600 delay-250 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We help homeowners with quick repairs, painting, tiling and outdoor touch-ups — no large project minimums, no confusing jargon, just straightforward pricing and dependable service.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-600 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold text-base px-8 py-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Link to="/estimate">
                Get a Fast Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/5 border-2 border-white/30 text-white hover:bg-white/15 font-semibold text-base px-8 py-6 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <a href="#packages">See Starter Packages</a>
            </Button>
          </div>

          {/* Trust Strip */}
          <div
            className={`text-center mb-6 transition-all duration-600 delay-350 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm text-white/80 max-w-2xl mx-auto">
              <span className="font-semibold text-secondary">Small jobs welcome</span> • Typical homeowner jobs start from affordable packages • 30-day workmanship guarantee • <span className="text-secondary">★ 4.8</span> average from real customers
            </p>
          </div>

          {/* Micro CTA Row */}
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-600 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link to="/estimate" className="text-sm text-white/90 hover:text-secondary underline transition-colors">
              Free Estimate — 24–48 hrs
            </Link>
            <span className="text-white/50 hidden sm:inline">|</span>
            <Link to="/estimate" className="text-sm text-white/90 hover:text-secondary underline transition-colors">
              Upload a Photo for a Quick Ballpark
            </Link>
          </div>

          {/* Quick Benefits */}
          <div
            className={`grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 transition-all duration-600 delay-450 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-white/95 text-sm leading-relaxed">
                  <span className="font-semibold">Friendly teams</span> who treat your home like theirs — small-job specialists.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-white/95 text-sm leading-relaxed">
                  <span className="font-semibold">Transparent pricing</span> & clear timelines — no surprises.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-white/95 text-sm leading-relaxed">
                  <span className="font-semibold">Fast booking:</span> same-week availability for most jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
