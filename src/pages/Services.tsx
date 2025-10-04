import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Paintbrush, Home, CheckCircle2 } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import paintingProject from "@/assets/painting-project.jpg";
import stuccoDetail from "@/assets/stucco-detail.jpg";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Services"
        description="Expert residential painting and Stucco/EIFS installation across the GTA. Premium materials, professional craftsmanship, and transparent pricing."
        keywords="painting services, stucco installation, EIFS, exterior painting, interior painting, residential construction services"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl opacity-90">
                Professional construction solutions for your residential property
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="section-title text-primary mb-4">Our Specialized Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From residential homes to large-scale commercial projects, we deliver exceptional results across all markets
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Residential Painting",
                    icon: Paintbrush,
                    description: "Complete interior and exterior painting for homeowners",
                    link: "/services/painting",
                    features: ["Interior & Exterior", "Color Consultation", "Premium Finishes"]
                  },
                  {
                    title: "Commercial Painting",
                    icon: Home,
                    description: "Professional painting for offices, retail, and industrial spaces",
                    link: "/services/commercial",
                    features: ["Minimal Disruption", "After-Hours Work", "Large-Scale Projects"]
                  },
                  {
                    title: "Stucco & EIFS",
                    icon: Home,
                    description: "Expert installation and repair of exterior cladding systems",
                    link: "/services/stucco",
                    features: ["Complete Systems", "Repairs", "Energy Efficient"]
                  },
                  {
                    title: "Condo & Multi-Unit",
                    icon: Home,
                    description: "Specialized services for property managers and condo boards",
                    link: "/services/condo",
                    features: ["Fast Turnaround", "Volume Pricing", "Tenant Coordination"]
                  },
                  {
                    title: "Parking Garage Coating",
                    icon: Home,
                    description: "Heavy-duty coatings for parking structures and parkades",
                    link: "/services/parking-garage",
                    features: ["Traffic Coatings", "Line Striping", "Waterproofing"]
                  },
                  {
                    title: "Suite Buildouts & Renovations",
                    icon: Home,
                    description: "Complete interior construction and tenant improvements",
                    link: "/services/suite-buildouts",
                    features: ["Office Buildouts", "Retail Fit-Outs", "Medical Suites"]
                  },
                  {
                    title: "Sealants & Caulking",
                    icon: Paintbrush,
                    description: "Professional weatherproofing and building envelope sealing",
                    link: "/services/sealants",
                    features: ["Waterproofing", "Air Sealing", "Joint Sealing"]
                  },
                  {
                    title: "Masonry",
                    icon: Home,
                    description: "Block, brick, and stone construction and restoration",
                    link: "/services/masonry",
                    features: ["Structural Masonry", "Restoration", "Stone Work"]
                  },
                  {
                    title: "Tile & Flooring",
                    icon: Paintbrush,
                    description: "Expert tile and flooring installation for all spaces",
                    link: "/services/tile-flooring",
                    features: ["Ceramic & Porcelain", "Natural Stone", "LVT/LVP"]
                  },
                  {
                    title: "Metal Cladding & Panels",
                    icon: Home,
                    description: "Modern building facades with metal cladding systems",
                    link: "/services/metal-cladding",
                    features: ["ACM Panels", "Standing Seam", "Rainscreen"]
                  }
                ].map((service, index) => (
                  <Link key={service.title} to={service.link}>
                    <Card className="p-6 h-full card-hover border-2 group"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0,
                        animation: 'slide-up 0.6s ease-out forwards'
                      }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Industries We Serve
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Residential Homes",
                  "Condominiums",
                  "Office Buildings",
                  "Retail Spaces",
                  "Industrial Facilities",
                  "Hotels & Hospitality",
                  "Healthcare",
                  "Educational Institutions",
                  "Property Management",
                  "Parking Structures",
                  "Warehouses",
                  "Commercial Plazas"
                ].map((industry, index) => (
                  <Card key={industry} className="p-4 text-center card-hover"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                      animation: 'fade-in 0.4s ease-out forwards'
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
                    <span className="font-semibold text-sm">{industry}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12 text-primary">
                The Ascent Advantage
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Licensed & Insured",
                    description: "Full licensing and comprehensive insurance for your peace of mind",
                  },
                  {
                    title: "Quality Materials",
                    description: "Premium brands and eco-friendly options for lasting results",
                  },
                  {
                    title: "Experienced Team",
                    description: "15+ years of expertise in residential construction",
                  },
                  {
                    title: "Transparent Pricing",
                    description: "Clear estimates with no hidden fees or surprises",
                  },
                  {
                    title: "Project Management",
                    description: "Dedicated coordination from start to finish",
                  },
                  {
                    title: "Warranty Backed",
                    description: "Comprehensive warranty coverage on all work",
                  },
                ].map((advantage, index) => (
                  <Card
                    key={advantage.title}
                    className="p-6 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards',
                    }}
                  >
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a free, no-obligation estimate today
              </p>
              <Link to="/estimate">
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-[var(--shadow-glow)] hover:scale-105 transition-all">
                  Request Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
