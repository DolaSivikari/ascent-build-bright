import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";

const heroSlides = [
  {
    title: "Building Excellence",
    subtitle: "Across Canada",
    description: "Leading construction company delivering complex commercial, industrial, and institutional projects with precision, safety, and innovation.",
    image: heroImage,
    cta: {
      primary: { text: "Explore Our Work", link: "/projects" },
      secondary: { text: "Our Capabilities", link: "/services" },
    },
  },
];

const CorporateHeroSection = () => {
  const [currentSlide] = useState(0);
  const slide = heroSlides[currentSlide];

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_explore_work_click', {
        event_category: 'engagement',
        event_label: 'Hero CTA',
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Navy Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, hsl(210 45% 22% / 0.95) 0%, hsl(210 45% 22% / 0.7) 40%, hsl(210 45% 22% / 0.3) 70%, transparent 100%)'
          }}
        />
      </div>

      {/* Diagonal Yellow Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-secondary z-10 hidden lg:block"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground font-bold text-sm uppercase tracking-wider">
              Industry Leaders Since 1906
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-6 leading-[0.95] tracking-tight">
            {slide.title}
            <br />
            <span className="text-secondary">{slide.subtitle}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to={slide.cta.primary.link}>
              <Button 
                variant="pcl-primary" 
                size="lg" 
                className="text-base px-10 py-6"
                onClick={handleCtaClick}
              >
                {slide.cta.primary.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={slide.cta.secondary.link}>
              <Button 
                variant="pcl-outline" 
                size="lg"
                className="text-base px-10 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                {slide.cta.secondary.text}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          {[
            { icon: Shield, label: "Safety First", value: "Zero Harm" },
            { icon: Award, label: "Projects Delivered", value: "10,000+" },
            { icon: Users, label: "Skilled Workforce", value: "5,500+" },
            { icon: Award, label: "Industry Awards", value: "150+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded">
              <stat.icon className="w-8 h-8 text-secondary mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporateHeroSection;
