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
            <span className="text-sm font-medium text-white">Licensed & Insured • GTA's Trusted Builder</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-heading font-extrabold text-white mb-6 transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.2",
              letterSpacing: "-0.01em",
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            Building Toronto's Future
            <br />
            <span className="text-secondary">Affordably, One Project at a Time</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`max-w-2xl mx-auto text-base md:text-lg text-white/95 mb-8 transition-all duration-600 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            Quality residential and commercial construction across the GTA. From small renovations to full builds—honest pricing, WSIB-certified crews, and free quotes in 24 hours.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-600 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold text-base px-8 py-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Link to="/estimate">
                Get Free Quote in 24hrs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/5 border-2 border-white/30 text-white hover:bg-white/15 font-semibold text-base px-8 py-6 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <a href="tel:+14165550100">(416) 555-0100</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap justify-center gap-6 mb-10 text-white/95 transition-all duration-600 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">WSIB Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Serving All GTA</span>
            </div>
          </div>

          {/* Animated Stats */}
          <div
            ref={statsRef}
            className={`flex flex-wrap justify-center gap-8 bg-black/20 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            role="list"
            aria-label="Company statistics"
          >
            <div className="text-center min-w-[120px]" role="listitem">
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-1">
                {counters.projects}+
              </div>
              <div className="text-sm text-white/90 font-medium">Projects Completed</div>
            </div>
            <div className="text-center min-w-[120px]" role="listitem">
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-1">
                {counters.years}
              </div>
              <div className="text-sm text-white/90 font-medium">Years Experience</div>
            </div>
            <div className="text-center min-w-[120px]" role="listitem">
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-1">
                {counters.coverage}km
              </div>
              <div className="text-sm text-white/90 font-medium">GTA Coverage</div>
            </div>
            <div className="text-center min-w-[120px]" role="listitem">
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-1">
                {counters.satisfaction}%
              </div>
              <div className="text-sm text-white/90 font-medium">Client Satisfaction</div>
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
