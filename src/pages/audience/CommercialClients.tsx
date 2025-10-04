import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Clock, Shield, Users, Moon, CheckCircle, Building2, Zap } from "lucide-react";

const CommercialClients = () => {
  const benefits = [
    {
      icon: Moon,
      title: "After-Hours Work",
      description: "Night and weekend scheduling available to avoid disrupting your business operations"
    },
    {
      icon: Clock,
      title: "Fast-Track Scheduling",
      description: "Accelerated timelines when you need to meet tight deadlines"
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "$5M liability coverage and WSIB compliance - your business is protected"
    },
    {
      icon: Users,
      title: "Minimal Disruption",
      description: "Strategic planning and execution that keeps your business running smoothly"
    },
    {
      icon: Zap,
      title: "Low-VOC Materials",
      description: "Zero-odor, environmentally friendly products safe for occupied spaces"
    }
  ];

  const industries = [
    {
      title: "Office Buildings",
      description: "Professional finishes that create productive, attractive workspaces",
      features: ["After-hours scheduling", "Floor-by-floor coordination", "Common area refresh", "Conference room upgrades"]
    },
    {
      title: "Retail & Hospitality",
      description: "Fast turnarounds that minimize impact on customer-facing operations",
      features: ["Quick rebrands", "Night-shift work", "Storefront painting", "Seasonal updates"]
    },
    {
      title: "Industrial & Warehouses",
      description: "Durable coatings and safety markings for high-traffic environments",
      features: ["Epoxy floor coatings", "Safety line striping", "Machinery areas", "Loading docks"]
    },
    {
      title: "Healthcare & Education",
      description: "Specialized finishes meeting strict regulatory and safety standards",
      features: ["Antimicrobial coatings", "Low-VOC products", "School break scheduling", "Patient area coordination"]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Commercial Painting Services - Business & Industrial"
        description="Professional commercial painting services for offices, retail, industrial, and institutional facilities. After-hours scheduling, minimal disruption, and quality results."
        keywords="commercial painting, office painting, retail painting, industrial coatings, business painting, GTA"
      />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
                <Briefcase className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm tracking-wider uppercase">For Commercial Clients</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Keep Your Business Running While We Work
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Professional commercial painting and coating services designed around your operations. We deliver quality results with minimal disruption to your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/estimate">
                  <Button size="lg" variant="secondary">Request Commercial Quote</Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    View Commercial Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Businesses Choose Ascent</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We understand that downtime costs money. Our commercial services are built for efficiency.
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

            {/* Commercial Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto bg-muted/50 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">45K+</div>
                <div className="text-muted-foreground">Sq Ft Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Zero</div>
                <div className="text-muted-foreground">Business Disruptions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">On-Time Completion</div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized solutions for every commercial sector
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-3 mb-3">
                      <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <h3 className="text-2xl font-bold text-primary">{industry.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{industry.description}</p>
                    <ul className="space-y-2">
                      {industry.features.map((feature, idx) => (
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

        {/* Our Approach */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Commercial Approach</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  step: "1", 
                  title: "Site Survey", 
                  desc: "Detailed assessment and coordination planning" 
                },
                { 
                  step: "2", 
                  title: "Schedule Planning", 
                  desc: "Timeline that works around your operations" 
                },
                { 
                  step: "3", 
                  title: "Professional Execution", 
                  desc: "Quality work with daily progress reports" 
                },
                { 
                  step: "4", 
                  title: "Final Inspection", 
                  desc: "Walkthrough and warranty documentation" 
                }
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
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Facility?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a comprehensive commercial quote with flexible scheduling options
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="text-lg">
                  Get Commercial Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg">
                  Schedule Consultation
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

export default CommercialClients;
