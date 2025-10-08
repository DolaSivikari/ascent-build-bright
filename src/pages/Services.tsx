import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Paintbrush, 
  Building2, 
  Home, 
  Wrench, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Briefcase
} from "lucide-react";

const Services = () => {
  const paintingServices = [
    {
      title: "Residential Painting",
      description: "Transform your home with expert interior and exterior painting services",
      link: "/services/painting",
      features: ["Color Consultation", "Premium Finishes", "Full Surface Prep", "Clean Workspace"]
    },
    {
      title: "Commercial Painting",
      description: "Professional painting for offices, retail, and industrial spaces",
      link: "/services/commercial",
      features: ["After-Hours Work", "Minimal Disruption", "Large-Scale Projects", "Fast Turnaround"]
    },
    {
      title: "Condo & Multi-Unit",
      description: "Specialized painting for property managers and condo boards",
      link: "/services/condo",
      features: ["Volume Pricing", "Tenant Coordination", "Board Presentations", "Phased Scheduling"]
    }
  ];

  const exteriorServices = [
    {
      title: "Stucco & EIFS",
      description: "Complete installation, repair, and restoration of exterior cladding systems",
      link: "/services/stucco",
      features: ["New Installation", "Crack Repair", "Water Damage", "Energy Efficient"]
    },
    {
      title: "Metal Cladding & Panels",
      description: "Modern building facades with architectural metal systems",
      link: "/services/metal-cladding",
      features: ["ACM Panels", "Standing Seam", "Rainscreen Systems", "Custom Fabrication"]
    },
    {
      title: "Sealants & Caulking",
      description: "Professional weatherproofing and building envelope protection",
      link: "/services/sealants",
      features: ["Waterproofing", "Air Sealing", "Joint Sealing", "Building Envelope"]
    },
    {
      title: "Masonry",
      description: "Brick, block, and stone construction and restoration services",
      link: "/services/masonry",
      features: ["Structural Work", "Tuckpointing", "Stone Veneer", "Chimney Repair"]
    }
  ];

  const specialtyServices = [
    {
      title: "Parking Garage Coating",
      description: "Heavy-duty protective coatings for parking structures",
      link: "/services/parking-garage",
      features: ["Traffic Coatings", "Line Striping", "Waterproofing", "Concrete Repair"]
    },
    {
      title: "Suite Buildouts",
      description: "Complete interior construction and tenant improvements",
      link: "/services/suite-buildouts",
      features: ["Office Buildouts", "Retail Fit-Outs", "Medical Suites", "Turnkey Solutions"]
    },
    {
      title: "Tile & Flooring",
      description: "Expert installation of tile and resilient flooring",
      link: "/services/tile-flooring",
      features: ["Ceramic & Porcelain", "Natural Stone", "LVT/LVP", "Commercial Grade"]
    }
  ];

  const audiences = [
    {
      title: "Homeowners",
      description: "Personalized service for your most valuable investment",
      icon: Home,
      link: "/for/homeowners"
    },
    {
      title: "Property Managers",
      description: "Reliable service for multi-unit properties",
      icon: Building,
      link: "/for/property-managers"
    },
    {
      title: "Commercial Clients",
      description: "Professional solutions for businesses",
      icon: Briefcase,
      link: "/for/commercial"
    }
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <Link to={service.link}>
      <Card className="h-full card-hover border-2 group overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {service.description}
          </p>
          <ul className="space-y-2 mb-4">
            {service.features.map((feature: string) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Services"
        description="Professional painting, stucco, and construction services across the GTA. Expert craftsmanship for residential and commercial projects."
        keywords="painting services, stucco installation, EIFS, exterior painting, interior painting, commercial painting, residential construction"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-primary/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Professional Construction Services
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Expert painting, exterior systems, and specialty construction for residential and commercial properties
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-lg">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link to="/our-process">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                    Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services - Tabbed View */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our comprehensive range of construction services organized by specialty
                </p>
              </div>

              <Tabs defaultValue="painting" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12 h-auto">
                  <TabsTrigger value="painting" className="text-base py-4 gap-2">
                    <Paintbrush className="w-5 h-5" />
                    Painting Services
                  </TabsTrigger>
                  <TabsTrigger value="exterior" className="text-base py-4 gap-2">
                    <Building2 className="w-5 h-5" />
                    Exterior Systems
                  </TabsTrigger>
                  <TabsTrigger value="specialty" className="text-base py-4 gap-2">
                    <Wrench className="w-5 h-5" />
                    Specialty Services
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="painting" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {paintingServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exterior" className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exteriorServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="specialty" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {specialtyServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Who We Serve</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tailored solutions for every type of client
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {audiences.map((audience, index) => (
                  <Link key={audience.title} to={audience.link}>
                    <Card className="p-8 h-full card-hover border-2 group text-center"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0,
                        animation: 'slide-up 0.6s ease-out forwards'
                      }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <audience.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
                        {audience.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {audience.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">The Ascent Advantage</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  What sets us apart from the competition
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Licensed & Insured",
                    description: "Full licensing, WSIB coverage, and comprehensive liability insurance"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Quality Materials",
                    description: "Premium brands like Benjamin Moore and Sherwin-Williams"
                  },
                  {
                    icon: Users,
                    title: "Experienced Team",
                    description: "15+ years of expertise with certified professionals"
                  },
                  {
                    icon: Building2,
                    title: "Project Management",
                    description: "Dedicated coordinator for every project from start to finish"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Transparent Pricing",
                    description: "Clear estimates with detailed breakdowns and no hidden fees"
                  },
                  {
                    icon: Shield,
                    title: "Warranty Backed",
                    description: "Comprehensive workmanship warranty on all projects"
                  }
                ].map((advantage, index) => (
                  <Card
                    key={advantage.title}
                    className="p-6 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <advantage.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{advantage.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a free, detailed estimate with no obligation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 shadow-lg">
                    Request Free Estimate
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
