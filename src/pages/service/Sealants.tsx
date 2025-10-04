import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Droplets, Shield, Wind, Thermometer, CheckCircle2, AlertTriangle } from "lucide-react";

const Sealants = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Sealants & Caulking - Professional Weatherproofing Services"
        description="Expert sealant and caulking services for commercial and residential buildings. Weatherproofing, air sealing, and waterproofing solutions across the GTA."
        keywords="sealants, caulking, weatherproofing, air sealing, waterproofing, building envelope, joint sealing, GTA"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Sealants & Caulking</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Protect your building envelope with expert sealant and caulking services. We prevent water infiltration, air leakage, and energy loss with premium materials and proven techniques.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Sealants Matter */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Quality Sealants Matter</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Droplets,
                  title: "Water Protection",
                  description: "Prevent costly water damage, mold growth, and structural deterioration"
                },
                {
                  icon: Wind,
                  title: "Air Sealing",
                  description: "Reduce drafts and improve HVAC efficiency by sealing air leaks"
                },
                {
                  icon: Thermometer,
                  title: "Energy Savings",
                  description: "Lower heating and cooling costs with proper building envelope sealing"
                },
                {
                  icon: Shield,
                  title: "Longevity",
                  description: "Extend building life by protecting against environmental damage"
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Sealant Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Window & Door Sealing",
                  description: "Perimeter caulking for windows and doors to prevent air and water infiltration",
                  applications: ["Residential windows", "Commercial curtain walls", "Storefront systems", "Door frames"]
                },
                {
                  title: "Expansion Joint Sealing",
                  description: "Movement joints in concrete, masonry, and building facades",
                  applications: ["Concrete control joints", "Masonry expansion joints", "Floor-to-wall joints", "Parking garage joints"]
                },
                {
                  title: "Facade & Cladding Sealing",
                  description: "Building envelope sealing for various exterior cladding systems",
                  applications: ["Panel joints", "Metal cladding", "Stone veneer", "EIFS terminations"]
                },
                {
                  title: "Interior Caulking",
                  description: "Interior sealing for finished spaces and wet areas",
                  applications: ["Kitchen & bath", "Baseboards & trim", "Acoustical sealing", "Fire-rated penetrations"]
                },
                {
                  title: "Re-Caulking & Restoration",
                  description: "Remove and replace failed or aged sealants",
                  applications: ["Sealant removal", "Joint preparation", "Premium replacement", "Historic restoration"]
                },
                {
                  title: "Specialized Sealing",
                  description: "Advanced applications requiring specific materials or techniques",
                  applications: ["Fire-rated sealants", "Traffic-bearing joints", "Chemical-resistant", "High-movement joints"]
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
                      {service.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Materials & Standards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Premium Materials & Standards</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Industry-Leading Sealant Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Silicone Sealants
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Excellent weatherability, UV resistance, and movement capability. Ideal for exterior facades, windows, and high-performance applications.
                      </p>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Polyurethane Sealants
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Superior adhesion and durability. Perfect for concrete joints, masonry, and areas requiring paintable sealants.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Hybrid Polymer Sealants
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Best of both worlds - paintable, low odor, and excellent performance. Great for interior and exterior applications.
                      </p>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Specialized Products
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Fire-rated, traffic-grade, and chemical-resistant sealants for specific performance requirements.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    Our Quality Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "ASTM C920 compliance for all elastomeric sealants",
                      "Proper joint design per ASTM C1193 guidelines",
                      "Three-sided adhesion prevention with backer rod",
                      "Surface preparation per manufacturer specifications",
                      "Quality control inspections at every phase",
                      "Extended warranties on materials and workmanship"
                    ].map((standard, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{standard}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Protect Your Building Envelope</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't let water damage and energy loss cost you thousands. Our expert sealant services provide long-lasting protection for your investment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary">Get a Free Assessment</Button>
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

export default Sealants;
