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

        {/* Residential Painting */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Paintbrush className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold text-primary">
                    Residential Painting
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform your home with professional interior and exterior painting services. We use premium coatings and meticulous prep work to ensure a flawless, long-lasting finish.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "Interior & exterior painting",
                    "Premium paint brands & materials",
                    "Professional color consultation",
                    "Surface preparation & repair",
                    "Multi-coat application",
                    "Clean-up & protection",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link to="/services/painting">
                    <Button variant="outline" className="border-2">Learn More</Button>
                  </Link>
                  <Link to="/estimate">
                    <Button className="btn-hero">Get a Painting Estimate</Button>
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <OptimizedImage
                  src={paintingProject}
                  alt="Professional residential exterior painting project showcasing premium finishes and expert craftsmanship"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stucco / EIFS */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <OptimizedImage
                  src={stuccoDetail}
                  alt="Professional stucco and EIFS installation detail showing high-quality exterior cladding system with superior insulation and weatherproofing"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold text-primary">
                    Stucco / EIFS
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Expert installation of Exterior Insulation and Finish Systems (EIFS) and traditional stucco. Superior insulation, weatherproofing, and lasting beauty for your home's exterior.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "Complete EIFS systems installation",
                    "Traditional stucco application",
                    "Superior insulation & energy efficiency",
                    "Weather-resistant finishes",
                    "Custom textures & colors",
                    "Repair & restoration services",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link to="/services/stucco">
                    <Button variant="outline" className="border-2">Learn More</Button>
                  </Link>
                  <Link to="/estimate">
                    <Button className="btn-hero">Get a Stucco Estimate</Button>
                  </Link>
                </div>
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
