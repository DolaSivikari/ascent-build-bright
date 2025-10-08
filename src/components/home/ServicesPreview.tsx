import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Layers, FileText, Cpu, Hammer, Leaf, ArrowRight } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Preconstruction & Consulting",
    description: "Feasibility studies, cost estimation, value engineering, and risk assessment using Procore and Bluebeam.",
    link: "/services#preconstruction",
    color: "from-primary/10 to-primary/5"
  },
  {
    icon: Building2,
    title: "Construction Management",
    description: "CM at Risk, Multi-Prime, P3 delivery with real-time cost control and collaboration.",
    link: "/services#construction-management",
    color: "from-secondary/10 to-secondary/5"
  },
  {
    icon: Layers,
    title: "Design-Build & Turnkey",
    description: "Single-source delivery integrating design and construction for faster completion.",
    link: "/services#design-build",
    color: "from-primary/10 to-primary/5"
  },
  {
    icon: Cpu,
    title: "Virtual Design & Construction",
    description: "3D/4D BIM, laser scanning, clash detection with Autodesk Construction Cloud.",
    link: "/services#vdc",
    color: "from-secondary/10 to-secondary/5"
  },
  {
    icon: Hammer,
    title: "General Contracting",
    description: "Trade coordination, procurement, quality control for commercial and industrial projects.",
    link: "/services#general-contracting",
    color: "from-primary/10 to-primary/5"
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    description: "LEED certification, green retrofits, energy-efficient systems.",
    link: "/services#sustainable",
    color: "from-secondary/10 to-secondary/5"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            Comprehensive Construction Solutions
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From initial concept to final handover, we deliver full-spectrum construction services backed by technology, expertise, and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border-border/50 bg-card overflow-hidden group" style={{ animationDelay: `${index * 100}ms`, animation: 'fade-in 0.6s ease-out forwards' }}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link to={service.link} className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group/link">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              Explore All Services
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
