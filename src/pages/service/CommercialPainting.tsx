import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, CheckCircle2, Clock, Shield, Users, Wrench } from "lucide-react";

const CommercialPainting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Commercial Painting Services"
        description="Professional commercial painting for office buildings, retail spaces, industrial facilities, and multi-unit properties across the GTA. Minimal disruption, maximum results."
        keywords="commercial painting, office painting, retail painting, industrial painting, commercial contractors, business painting services"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">Commercial Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Commercial Painting Excellence
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Professional painting solutions for businesses, retail spaces, offices, and industrial facilities across Southern Ontario
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-xl">
                    Request Commercial Quote
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Sectors */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="section-title text-primary mb-4">Industries We Serve</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Specialized painting services tailored to your industry's unique requirements
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Building2,
                    title: "Office Buildings",
                    description: "Corporate offices, professional spaces, and business centers",
                    features: ["After-hours scheduling", "Minimal disruption", "Quick turnaround"]
                  },
                  {
                    icon: Users,
                    title: "Retail Spaces",
                    description: "Stores, malls, showrooms, and customer-facing areas",
                    features: ["Brand color matching", "Durable finishes", "Fast execution"]
                  },
                  {
                    icon: Wrench,
                    title: "Industrial Facilities",
                    description: "Warehouses, manufacturing plants, and production spaces",
                    features: ["Heavy-duty coatings", "Safety compliance", "Large-scale projects"]
                  },
                  {
                    icon: Building2,
                    title: "Multi-Unit Residential",
                    description: "Condos, apartments, and property management companies",
                    features: ["Tenant coordination", "Volume pricing", "Property enhancement"]
                  },
                  {
                    icon: Shield,
                    title: "Healthcare & Education",
                    description: "Hospitals, clinics, schools, and institutions",
                    features: ["Low-VOC paints", "Health-safe materials", "Flexible scheduling"]
                  },
                  {
                    icon: Building2,
                    title: "Hospitality",
                    description: "Hotels, restaurants, and service businesses",
                    features: ["Guest experience focus", "Off-season scheduling", "Quick refresh"]
                  }
                ].map((sector, index) => (
                  <Card key={sector.title} className="p-6 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <sector.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">{sector.title}</h3>
                    <p className="text-muted-foreground mb-4">{sector.description}</p>
                    <ul className="space-y-2">
                      {sector.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Comprehensive Commercial Solutions
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">Interior Commercial Painting</h3>
                  <ul className="space-y-3">
                    {[
                      "Office walls and ceilings",
                      "Conference rooms and lobbies",
                      "Hallways and common areas",
                      "Retail display areas",
                      "Warehouse interiors",
                      "Restrooms and facilities",
                      "Specialty finishes and accents"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">Exterior Commercial Painting</h3>
                  <ul className="space-y-3">
                    {[
                      "Building facades and walls",
                      "Parking structures",
                      "Loading docks",
                      "Storefronts and signage",
                      "Metal surfaces and trim",
                      "Industrial equipment",
                      "Safety markings and zones"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                The Ascent Commercial Advantage
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Flexible Scheduling",
                    description: "Work around your business hours - nights, weekends, or holidays"
                  },
                  {
                    icon: Shield,
                    title: "$5M Liability Coverage",
                    description: "Fully insured with comprehensive commercial coverage"
                  },
                  {
                    icon: Users,
                    title: "Project Managers",
                    description: "Dedicated coordinator for seamless communication"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Quality Guarantee",
                    description: "Written warranties on all materials and workmanship"
                  }
                ].map((feature, index) => (
                  <Card key={feature.title} className="p-6 text-center card-hover"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'fade-in 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Our Commercial Process
              </h2>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Initial Consultation",
                    description: "Site visit, scope assessment, and detailed requirements gathering"
                  },
                  {
                    step: "02",
                    title: "Detailed Proposal",
                    description: "Comprehensive quote with timeline, materials, and project plan"
                  },
                  {
                    step: "03",
                    title: "Schedule Coordination",
                    description: "Align project timeline with your business operations"
                  },
                  {
                    step: "04",
                    title: "Professional Execution",
                    description: "Skilled crew, quality materials, minimal disruption"
                  },
                  {
                    step: "05",
                    title: "Final Inspection",
                    description: "Walkthrough, touch-ups, and project sign-off"
                  }
                ].map((phase) => (
                  <div key={phase.step} className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-bold text-primary">{phase.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold mb-2 text-primary">{phase.title}</h3>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
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
                Ready to Transform Your Commercial Space?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a detailed commercial painting quote - fast, professional, competitive
              </p>
              <Link to="/estimate">
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-xl hover:scale-105 transition-all">
                  Request Commercial Quote
                </Button>
              </Link>
              <p className="mt-6 opacity-80">
                Call us: <a href="tel:+19055550100" className="font-bold hover:text-secondary transition-colors">(905) 555-0100</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommercialPainting;
