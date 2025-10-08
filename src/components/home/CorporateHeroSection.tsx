import { Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CorporateHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Building Excellence Across Canada",
      subtitle: "CONSTRUCTION LEADERSHIP",
      description: "Delivering complex construction projects with precision, safety, and innovation",
      image: "/assets/hero-home.jpg",
      cta: "Explore Our Work"
    },
    {
      title: "Industrial & Commercial Solutions",
      subtitle: "COMPREHENSIVE SERVICES",
      description: "From planning to completion, we build the infrastructure that powers communities",
      image: "/assets/project-office-tower.jpg",
      cta: "Our Capabilities"
    },
    {
      title: "Sustainable Construction Practices",
      subtitle: "ENVIRONMENTAL COMMITMENT",
      description: "Leading the industry in sustainable building methods and green technology",
      image: "/assets/project-commercial-stucco.jpg",
      cta: "Learn More"
    }
  ];

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl text-white space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-16 bg-accent" />
            <span className="text-accent font-bold text-sm tracking-widest uppercase">
              {heroSlides[currentSlide].subtitle}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-text text-white drop-shadow-lg">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="btn-primary-corporate group"
              onClick={() => {
                if (typeof window !== 'undefined' && 'gtag' in window) {
                  (window as any).gtag('event', 'cta_explore_work_click');
                }
              }}
            >
              {heroSlides[currentSlide].cta}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="btn-outline-corporate"
            >
              Contact Us
            </Button>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
              <div className="text-sm text-white/80 mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">$2B+</div>
              <div className="text-sm text-white/80 mt-1">Annual Revenue</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">25+</div>
              <div className="text-sm text-white/80 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              currentSlide === index 
                ? 'w-12 bg-accent' 
                : 'w-8 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Yellow Triangle */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 hidden lg:block">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="h-full w-full"
        >
          <polygon points="100,0 100,100 50,100" fill="hsl(45 100% 51%)" fillOpacity="0.9" />
        </svg>
      </div>
    </section>
  );
};

export default CorporateHeroSection;
