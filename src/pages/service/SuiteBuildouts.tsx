import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, HardHat, Ruler, Palette, Shield } from "lucide-react";

const SuiteBuildouts = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Suite Buildouts & Interior Renovations - Commercial Interior Construction"
        description="Expert suite buildouts and interior renovations for commercial spaces, offices, retail, and multi-unit buildings. Full-service tenant improvements and custom interior construction."
        keywords="suite buildouts, interior renovations, tenant improvements, office renovations, commercial interior, retail buildouts, GTA"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Suite Buildouts & Interior Renovations</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Transform your commercial space with expert interior construction, from complete suite buildouts to targeted renovations. We deliver functional, beautiful spaces on time and on budget.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Interior Construction Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete Suite Buildouts",
                  description: "Full interior construction from bare shell to move-in ready spaces",
                  features: ["Space planning", "Framing & drywall", "Electrical & HVAC coordination", "Finish carpentry"]
                },
                {
                  title: "Office Renovations",
                  description: "Modernize your workspace with functional, inspiring office interiors",
                  features: ["Open office concepts", "Private offices & meeting rooms", "Break rooms & amenities", "Technology integration"]
                },
                {
                  title: "Retail Buildouts",
                  description: "Create engaging retail environments that drive customer experience",
                  features: ["Custom millwork", "Display fixtures", "Brand-aligned finishes", "ADA compliance"]
                },
                {
                  title: "Medical Office Fit-Outs",
                  description: "Specialized construction for healthcare and medical facilities",
                  features: ["Exam room buildouts", "Reception & waiting areas", "Code compliance", "Infection control measures"]
                },
                {
                  title: "Multi-Unit Renovations",
                  description: "Coordinated interior upgrades for condos and apartment buildings",
                  features: ["Unit standardization", "Phased scheduling", "Minimal disruption", "Common area upgrades"]
                },
                {
                  title: "Tenant Improvements",
                  description: "Customize leased spaces to meet specific business needs",
                  features: ["Landlord coordination", "Permit management", "Budget optimization", "Fast-track scheduling"]
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <span>{service.title}</span>
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Buildout Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Ruler,
                  title: "1. Planning & Design",
                  description: "Space planning, design consultation, and detailed project scope development"
                },
                {
                  icon: HardHat,
                  title: "2. Pre-Construction",
                  description: "Permitting, vendor coordination, material selection, and scheduling"
                },
                {
                  icon: Building2,
                  title: "3. Construction",
                  description: "Expert execution with daily progress updates and quality control"
                },
                {
                  icon: CheckCircle2,
                  title: "4. Completion",
                  description: "Final walkthrough, punch list resolution, and client handover"
                }
              ].map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <step.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Ascent for Interior Construction</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Minimal Disruption",
                  description: "We understand occupied buildings. Our team works efficiently with noise control, dust containment, and flexible scheduling to minimize impact on your operations."
                },
                {
                  icon: Palette,
                  title: "Design-Build Expertise",
                  description: "From concept to completion, we provide integrated design-build services that streamline the process and deliver cohesive, functional interiors."
                },
                {
                  icon: CheckCircle2,
                  title: "Quality Craftsmanship",
                  description: "Our skilled tradespeople deliver exceptional finish quality with attention to detail that makes spaces stand out and last."
                }
              ].map((capability, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <capability.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <CardTitle>{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your interior construction project. From initial concepts to final walkthrough, we're with you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary">Get a Free Estimate</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
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

export default SuiteBuildouts;
