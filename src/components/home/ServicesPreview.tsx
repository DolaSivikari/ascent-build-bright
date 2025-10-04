import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paintbrush, Home, Building2, ParkingSquare, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Residential Painting",
    description: "Transform your home with expert interior and exterior painting. Premium materials, meticulous prep, and flawless finishes.",
    link: "/services/painting",
    features: ["Interior & Exterior", "Color Consultation", "Premium Finishes"]
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description: "Professional painting for offices, retail, and industrial spaces. Minimal disruption, maximum results.",
    link: "/services/commercial",
    features: ["After-Hours Work", "Large-Scale Projects", "Fast Turnaround"]
  },
  {
    icon: Home,
    title: "Stucco & EIFS",
    description: "Expert installation and repair of exterior insulation systems. Energy efficient, weather-resistant, beautiful.",
    link: "/services/stucco",
    features: ["Complete Systems", "Waterproofing", "Custom Textures"]
  },
  {
    icon: ParkingSquare,
    title: "Parking Garage Coating",
    description: "Heavy-duty coatings for parking structures. Traffic coatings, line striping, and waterproofing solutions.",
    link: "/services/parking-garage",
    features: ["Traffic Coatings", "Line Striping", "Protection Systems"]
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
      className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden" 
      aria-labelledby="services-heading"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="section-title mb-4 text-primary">
            Our Specialized Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From residential homes to large-scale commercial projects, we deliver exceptional results across all markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Link key={service.title} to={service.link} className="group">
              <Card
                className={`h-full p-6 card-hover border-2 hover:border-primary/50 transition-all duration-300 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/30">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold mb-3 text-primary group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="inline-flex items-center gap-2 font-semibold text-primary group-hover:text-secondary transition-colors text-sm">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Need a specialized service? <Link to="/services" className="text-primary hover:text-secondary font-semibold transition-colors">View all services</Link>
          </p>
          <Link to="/estimate">
            <Button className="btn-hero text-lg px-10 py-6 shadow-xl hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 group">
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
