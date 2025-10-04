import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paintbrush, Home, ClipboardList, ArrowRight, Sparkles } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Residential Painting",
    description: "Interior and exterior painting with professional prep, premium coatings & color consultations.",
    link: "/services/painting",
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Home,
    title: "Stucco / EIFS",
    description: "Complete EIFS systems with superior insulation, weatherproofing, and custom finishes.",
    link: "/services/stucco",
    color: "from-orange-500/10 to-amber-500/10",
    iconColor: "text-orange-600",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description: "Full-service project coordination from planning through completion with dedicated support.",
    link: "/services",
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-600",
  },
];

const ServicesPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('services-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="services-section" 
      className="py-24 bg-background relative overflow-hidden" 
      aria-labelledby="services-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">What We Do</span>
          </div>
          <h2 id="services-heading" className="section-title mb-4 text-primary">
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to your residential needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group relative p-8 border-2 border-border hover:border-primary/50 transition-all duration-500 overflow-hidden bg-gradient-to-br ${service.color} ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl" aria-hidden="true">
                  <service.icon className={`w-10 h-10 ${service.iconColor} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-heading font-bold mb-4 text-primary group-hover:text-secondary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <Link to={service.link} className="group/link inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
              </Link>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/estimate">
            <Button className="btn-hero text-lg px-10 py-7 shadow-xl hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 group">
              Get a Free Estimate
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
