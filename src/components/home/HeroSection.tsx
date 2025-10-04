import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Award, Shield, Play } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      setMousePosition({ x: xPos, y: yPos });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-slate-900"
      aria-label="Hero section"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Primary Image Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out',
          }}
          role="img"
          aria-label="Modern residential construction project showcasing quality craftsmanship"
        />
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-primary/30 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 0.8}px, ${-mousePosition.y * 0.8}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>
      
      {/* Diagonal Accent Stripe */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -right-1/4 w-full h-[200%] bg-secondary rotate-12 transform origin-top-right" 
             style={{ width: '40%' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="animate-slide-up">
            <div className="inline-block mb-4 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Mississauga's Premier Construction Firm
              </span>
            </div>
            
            <h1 className="hero-text text-primary-foreground mb-6 leading-tight">
              Build With<br />
              <span className="relative inline-block">
                <span className="text-secondary">Confidence.</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent" />
              </span>
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl font-medium leading-relaxed">
              Award-winning specialists in residential painting & Stucco / EIFS — transforming homes across the GTA with precision, innovation, and care.
            </p>
          </div>

          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 mb-12" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link to="/estimate">
              <Button className="btn-hero text-lg px-10 py-7 shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300 group">
                Request an Estimate
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link to="/projects">
              <Button className="text-lg px-10 py-7 bg-transparent backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all duration-300 group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                View Portfolio
              </Button>
            </Link>
          </div>

          <div className="animate-slide-up flex flex-wrap items-center gap-8 text-primary-foreground/90" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-secondary/30">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="text-sm opacity-80 font-medium">Call us today</div>
                <a href="tel:+19055550100" className="text-xl font-bold hover:text-secondary transition-colors">
                  (905) 555-0100
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group">
              <Award className="w-8 h-8 text-secondary group-hover:rotate-12 transition-transform" />
              <div className="text-sm leading-tight">
                <strong className="block">Licensed & Insured</strong>
                <span className="opacity-80">WSIB Compliant</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group">
              <Shield className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
              <div className="text-sm leading-tight">
                <strong className="block">Serving GTA</strong>
                <span className="opacity-80">50km Radius</span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-sm text-primary-foreground/70 mb-3 uppercase tracking-wider font-semibold">Trusted By</p>
            <div className="flex flex-wrap gap-6 items-center opacity-60">
              <div className="px-4 py-2 border border-primary-foreground/30 rounded-lg text-sm font-medium">850+ Projects</div>
              <div className="px-4 py-2 border border-primary-foreground/30 rounded-lg text-sm font-medium">7 Years Excellence</div>
              <div className="px-4 py-2 border border-primary-foreground/30 rounded-lg text-sm font-medium">99% Safety Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
