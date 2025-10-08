import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ascent Group Construction project site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold">500+ Projects Delivered | Zero Lost-Time Incidents</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-text text-white mb-6 animate-slide-up">
            Building Excellence,
            <span className="block text-secondary">Delivering Trust</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            From preconstruction planning to final handover, Ascent Group combines{" "}
            <span className="font-semibold text-secondary">Canadian craftsmanship</span> with{" "}
            <span className="font-semibold text-secondary">cutting-edge technology</span> to deliver 
            construction projects on time, on budget, and beyond expectations.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-secondary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="font-bold text-secondary">15+</span>
              </div>
              <span className="text-sm font-medium">Years of Excellence</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-secondary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="font-bold text-secondary">COR</span>
              </div>
              <span className="text-sm font-medium">Safety Certified</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-secondary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="font-bold text-secondary">LEED</span>
              </div>
              <span className="text-sm font-medium">Accredited Professionals</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/estimate">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                Request Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/projects">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold rounded-2xl backdrop-blur-sm bg-white/10 transition-all duration-300"
              >
                <Play className="mr-2" size={20} />
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Client Logos - Subtle */}
          <div className="mt-12 pt-8 border-t border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-white/70 text-sm mb-4">Trusted by leading organizations across the GTA</p>
            <div className="flex flex-wrap gap-8 items-center opacity-60">
              <span className="text-white font-semibold text-sm">PCL Construction</span>
              <span className="text-white font-semibold text-sm">Bird Construction</span>
              <span className="text-white font-semibold text-sm">EllisDon</span>
              <span className="text-white font-semibold text-sm">Procore Technologies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
