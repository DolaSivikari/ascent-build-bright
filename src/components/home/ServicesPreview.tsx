import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paintbrush, Home, ClipboardList, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Residential Painting",
    description: "Interior and exterior painting with professional prep, premium coatings & color consultations.",
    link: "/services/painting",
  },
  {
    icon: Home,
    title: "Stucco / EIFS",
    description: "Complete EIFS systems with superior insulation, weatherproofing, and custom finishes.",
    link: "/services/stucco",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description: "Full-service project coordination from planning through completion with dedicated support.",
    link: "/services",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4 text-primary">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to your residential needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="p-8 card-hover border-2 border-border hover:border-primary/50 transition-all"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'slide-up 0.6s ease-out forwards',
              }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              <Link to={service.link}>
                <Button variant="ghost" className="group font-semibold text-primary hover:text-secondary p-0">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/estimate">
            <Button className="btn-hero text-lg px-8 py-6">
              Get a Painting Estimate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
