import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, TrendingUp, Users, Calendar, Shield, Clock, CheckCircle, DollarSign } from "lucide-react";

const PropertyManagers = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Maximize ROI",
      description: "Quality work that increases property value and reduces long-term maintenance costs"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "We work around your tenants' schedules with minimal disruption to operations"
    },
    {
      icon: Users,
      title: "Volume Pricing",
      description: "Competitive rates for multi-unit projects and ongoing maintenance programs"
    },
    {
      icon: Shield,
      title: "Full Insurance",
      description: "$5M liability coverage and WSIB compliance for your protection"
    },
    {
      icon: Clock,
      title: "Fast Turnarounds",
      description: "3-day unit turnover process keeps your vacancy rates low"
    }
  ];

  const services = [
    {
      title: "Unit Turnovers",
      description: "Fast, efficient painting between tenants",
      roi: "Reduce vacancy time by 40%"
    },
    {
      title: "Common Area Maintenance",
      description: "Keep lobbies, hallways, and amenities looking their best",
      roi: "Increase tenant retention 25%"
    },
    {
      title: "Exterior Restoration",
      description: "Stucco, EIFS, and facade maintenance",
      roi: "Extend building life 15+ years"
    },
    {
      title: "Parking Garage Coatings",
      description: "Protective coatings and line striping",
      roi: "Prevent $50K+ in repairs"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Services for Property Managers - Multi-Unit Specialists"
        description="Trusted property management painting services across the GTA. Volume pricing, fast turnarounds, and minimal disruption for condos, apartments, and commercial properties."
        keywords="property management, condo painting, multi-unit painting, property maintenance, GTA"
      />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
                <Building className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm tracking-wider uppercase">For Property Managers</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Trusted Property Maintenance Partner
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Maximize property value and tenant satisfaction with our specialized multi-unit painting and restoration services. We understand the unique challenges of property management.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/estimate">
                  <Button size="lg" variant="secondary">Get Volume Quote</Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Focus */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Built for Property Management Success</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We help you maximize value, minimize downtime, and keep tenants happy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
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

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">120+</div>
                <div className="text-muted-foreground">Units Managed Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3-Day</div>
                <div className="text-muted-foreground">Average Turnover Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Tenant Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services with ROI */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Services That Deliver ROI</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every service designed to increase property value and tenant satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                      <TrendingUp className="w-6 h-6 text-secondary flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-lg">
                      <span className="text-sm font-bold text-primary">{service.roi}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process for Property Managers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Streamlined Process</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { step: "1", title: "Site Assessment", desc: "We inspect and provide detailed quote" },
                { step: "2", title: "Scheduling", desc: "Flexible timing around your tenants" },
                { step: "3", title: "Execution", desc: "Professional work with daily updates" },
                { step: "4", title: "Completion", desc: "Final inspection and documentation" }
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Discuss Your Property Needs</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Volume pricing available for multi-unit properties and ongoing maintenance contracts
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="text-lg">
                  Request Volume Quote
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg">
                  View Our Portfolio
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

export default PropertyManagers;
