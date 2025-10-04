import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Heart, Palette, Shield, Clock, DollarSign, CheckCircle } from "lucide-react";

const Homeowners = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Personalized Service",
      description: "We treat your home like our own, with care and respect throughout the entire process"
    },
    {
      icon: Palette,
      title: "Color Consultation",
      description: "Free professional color consultation to help you choose the perfect palette"
    },
    {
      icon: Shield,
      title: "Home Protection",
      description: "Complete furniture and floor protection - your home stays clean and safe"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "We work around your schedule to minimize disruption to your daily life"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees - detailed written estimates you can understand"
    }
  ];

  const services = [
    {
      title: "Interior Painting",
      description: "Transform your living spaces with fresh, beautiful colors",
      features: ["Living rooms & bedrooms", "Kitchens & bathrooms", "Trim & baseboards", "Ceiling work"]
    },
    {
      title: "Exterior Painting",
      description: "Protect and beautify your home's exterior",
      features: ["Siding & trim", "Weather-resistant coatings", "Deck & fence staining", "Pressure washing"]
    },
    {
      title: "Cabinet Refinishing",
      description: "Update your kitchen without the cost of replacement",
      features: ["Kitchen cabinets", "Bathroom vanities", "Custom color matching", "Factory-quality finish"]
    },
    {
      title: "Stucco & EIFS",
      description: "Expert installation and repair of exterior systems",
      features: ["EIFS installation", "Stucco repair", "Waterproofing", "Energy efficiency"]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Services for Homeowners - Residential Painting & Stucco"
        description="Trusted residential painting and stucco services for homeowners across the GTA. Quality craftsmanship, transparent pricing, and personalized service for your home."
        keywords="residential painting, homeowner services, house painting, home improvement, GTA"
      />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
                <Home className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm tracking-wider uppercase">For Homeowners</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Home Deserves the Best
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Transform your house into your dream home with professional painting and finishing services. We combine quality craftsmanship with personalized service to exceed your expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/estimate">
                  <Button size="lg" variant="secondary">Get Free Estimate</Button>
                </Link>
                <Link to="/our-process">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    See Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Homeowners Choose Ascent</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We understand that your home is your biggest investment and your personal sanctuary
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <benefit.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Residential Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions for every part of your home
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-primary">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free, no-obligation estimate and color consultation today
            </p>
            <Link to="/estimate">
              <Button size="lg" variant="secondary" className="text-lg">
                Request Free Estimate
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Homeowners;
