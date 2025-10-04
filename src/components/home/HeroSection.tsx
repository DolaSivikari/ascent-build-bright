import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const depth = (index + 1) * 0.5;
        (layer as HTMLElement).style.transform = `translate(${xPos * depth}px, ${yPos * depth}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-800"
      aria-label="Hero section"
    >
      <div 
        className="absolute inset-0 opacity-30 parallax-layer"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="Modern residential construction project showcasing quality craftsmanship"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="animate-slide-up">
            <h1 className="hero-text text-primary-foreground mb-6">
              Build With<br />
              <span className="text-secondary">Confidence.</span>
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl font-medium">
              Mississauga-based specialists in residential painting & Stucco / EIFS — serving the GTA with premium craftsmanship.
            </p>
          </div>

          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 mb-12" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link to="/estimate">
              <Button className="btn-hero text-lg px-10 py-6">
                Request an Estimate
              </Button>
            </Link>
            <Link to="/projects">
              <Button className="btn-outline-hero text-lg px-10 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Portfolio
              </Button>
            </Link>
          </div>

          <div className="animate-slide-up flex flex-wrap items-center gap-8 text-primary-foreground/90" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm opacity-80">Call us today</div>
                <a href="tel:+19055550100" className="text-lg font-bold hover:text-secondary transition-colors">
                  (905) 555-0100
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-secondary" />
              <div className="text-sm">
                Licensed &<br />Insured
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-secondary" />
              <div className="text-sm">
                Serving<br />GTA
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
