import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, CheckCircle2, Users, Clock, Shield, PaintBucket } from "lucide-react";

const CondoPainting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Condo Painting Services | Multi-Unit Residential"
        description="Professional condo painting services for individual units, common areas, and building exteriors. Property management specialists serving the GTA."
        keywords="condo painting, apartment painting, multi-unit painting, property management painting, condo building painting, residential painting"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Building className="w-5 h-5" />
                <span className="font-semibold">Multi-Unit Residential</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Condo & Apartment Painting Specialists
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Trusted by property managers and condo boards across the GTA. Individual units, common areas, and building exteriors.
              </p>
              <Link to="/estimate">
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-xl">
                  Get Property Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Complete Condo Painting Solutions
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: Building,
                    title: "Individual Units",
                    features: [
                      "Turnkey unit painting",
                      "Between-tenant refresh",
                      "Owner-occupied units",
                      "Move-in ready preparation",
                      "Flexible scheduling"
                    ]
                  },
                  {
                    icon: Users,
                    title: "Common Areas",
                    features: [
                      "Lobbies and hallways",
                      "Amenity rooms",
                      "Fitness centers",
                      "Party rooms",
                      "Underground parking"
                    ]
                  },
                  {
                    icon: PaintBucket,
                    title: "Building Exteriors",
                    features: [
                      "Balconies and railings",
                      "Exterior walls",
                      "Trim and accents",
                      "Parkade ceilings",
                      "Stairwells"
                    ]
                  }
                ].map((service, index) => (
                  <Card key={service.title} className="p-6 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">{service.title}</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary text-center">
                  Property Management Programs
                </h3>
                <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We understand the unique needs of property managers and condo boards. Our specialized programs provide consistent quality, competitive pricing, and reliable service.
                </p>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: "Volume Pricing", desc: "Discounts for multiple units" },
                    { label: "Scheduled Maintenance", desc: "Annual refresh programs" },
                    { label: "Tenant Coordination", desc: "Minimal disruption" },
                    { label: "Quick Turnaround", desc: "Fast unit turnover" }
                  ].map((benefit) => (
                    <div key={benefit.label} className="text-center">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-bold text-primary mb-1">{benefit.label}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Why Property Managers Choose Ascent
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Fast Turnaround",
                    description: "2-3 day unit turnovers. Get units rent-ready quickly."
                  },
                  {
                    icon: Shield,
                    title: "Fully Insured",
                    description: "$5M liability coverage. Certificate of insurance provided."
                  },
                  {
                    icon: Users,
                    title: "Tenant Friendly",
                    description: "Respectful crew. Minimal disruption. Clear communication."
                  },
                  {
                    icon: CheckCircle2,
                    title: "Consistent Quality",
                    description: "Same high standards every time. Guaranteed satisfaction."
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
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Our Condo Painting Process
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: "Schedule",
                    title: "Coordinate with Tenants/Owners",
                    description: "We work with your schedule and communicate directly with residents when needed."
                  },
                  {
                    step: "Protect",
                    title: "Comprehensive Protection",
                    description: "Floors, fixtures, and furnishings carefully protected. Clean work area maintained."
                  },
                  {
                    step: "Prepare",
                    title: "Surface Preparation",
                    description: "Patch holes, sand surfaces, prime as needed for perfect adhesion."
                  },
                  {
                    step: "Paint",
                    title: "Professional Application",
                    description: "Multiple coats with premium low-VOC paints. Even coverage, crisp lines."
                  },
                  {
                    step: "Inspect",
                    title: "Quality Check & Cleanup",
                    description: "Final walkthrough, touch-ups, complete cleanup. Ready for move-in."
                  }
                ].map((phase) => (
                  <Card key={phase.step} className="p-6 flex gap-6 items-start card-hover">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-xl font-bold text-primary">{phase.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold mb-2 text-primary">{phase.title}</h3>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-12 text-center border-2">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <blockquote className="text-2xl font-heading mb-6 text-primary">
                  "Ascent Group has been our go-to painting contractor for 3 years. Their consistency, reliability, and quality keep our tenants happy and our units renting quickly."
                </blockquote>
                <div className="text-lg">
                  <div className="font-bold">Jennifer Martinez</div>
                  <div className="text-muted-foreground">Property Manager, Lakeshore Condominiums</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Partner with Ascent Group
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Join the property managers who trust us for reliable, high-quality condo painting services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 shadow-xl">
                    Get Property Quote
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-10 py-6">
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

export default CondoPainting;
