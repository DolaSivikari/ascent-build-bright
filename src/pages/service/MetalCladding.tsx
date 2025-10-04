import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, Shield, Zap, Wind, Sparkles } from "lucide-react";

const MetalCladding = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Metal Cladding & Panels - Commercial Building Facades"
        description="Expert metal cladding and panel installation for commercial buildings. ACM panels, metal siding, architectural metal systems, and facade solutions across the GTA."
        keywords="metal cladding, ACM panels, metal siding, architectural metal, building facades, commercial cladding, GTA"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Metal Cladding & Panels</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Modern, durable building facades with metal cladding systems. We deliver sleek architectural aesthetics combined with superior weather protection and long-term performance.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Metal Cladding?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Durability",
                  description: "Weather-resistant, low maintenance, and built to last decades"
                },
                {
                  icon: Sparkles,
                  title: "Modern Aesthetics",
                  description: "Sleek, contemporary appearance with unlimited design possibilities"
                },
                {
                  icon: Zap,
                  title: "Fast Installation",
                  description: "Efficient installation reduces project timelines and costs"
                },
                {
                  icon: Wind,
                  title: "Weather Performance",
                  description: "Superior protection against wind, rain, and temperature extremes"
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

        {/* Systems & Products */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Metal Cladding Systems</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "ACM Panels",
                  description: "Aluminum Composite Material panels for modern facades",
                  features: ["Alucobond systems", "Reynobond panels", "ALPOLIC cladding", "Custom colors & finishes"]
                },
                {
                  title: "Standing Seam Metal",
                  description: "Concealed fastener systems for clean, modern lines",
                  features: ["Architectural metal roofing", "Wall panel systems", "Snap-lock & mechanical seam", "Multiple profile options"]
                },
                {
                  title: "Metal Wall Panels",
                  description: "Insulated and non-insulated metal wall systems",
                  features: ["Insulated metal panels (IMP)", "Single-skin panels", "Ribbed & corrugated", "Flush & reveal joints"]
                },
                {
                  title: "Rainscreen Systems",
                  description: "Ventilated facade systems with cavity wall design",
                  features: ["Pressure-equalized design", "Drainage & ventilation", "Various attachment methods", "Energy efficiency"]
                },
                {
                  title: "Architectural Metal",
                  description: "Custom fabricated metal elements and features",
                  features: ["Column covers", "Soffit & fascia", "Louvers & screens", "Decorative panels"]
                },
                {
                  title: "Metal Siding",
                  description: "Commercial and industrial metal siding applications",
                  features: ["Vertical & horizontal", "Multiple gauges", "Pre-finished options", "Retrofit applications"]
                }
              ].map((system, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <span>{system.title}</span>
                    </CardTitle>
                    <CardDescription>{system.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {system.features.map((feature, idx) => (
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

        {/* Materials & Finishes */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Materials & Finish Options</h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Material Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Aluminum
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Lightweight, corrosion-resistant, excellent for ACM panels and architectural applications. Available in various alloys and gauges.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Steel
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Galvanized and Galvalume coated steel for strength and durability. Ideal for standing seam and metal wall panels.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Zinc & Copper
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Premium materials for distinctive, long-lasting facades. Natural patina development for unique aesthetics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Finish Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          PVDF Coating
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Premium 70% PVDF finishes (Kynar 500, Hylar 5000) for superior fade and chalk resistance. 25+ year warranties.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Anodized Aluminum
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Electrolytically sealed finish for durability and consistent appearance. Clear or color anodized options.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Textured & Special
                        </h4>
                        <p className="text-sm text-muted-foreground pl-7">
                          Wood grain, stucco embossed, metallic, and custom textures. Unlimited color matching available.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Expertise */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Expert Installation & Engineering</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Our Installation Standards</CardTitle>
                  <CardDescription>
                    Metal cladding requires precision engineering and expert installation. We deliver both.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Design & Engineering</h4>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Structural load calculations",
                          "Thermal movement accommodation",
                          "Wind load and seismic considerations",
                          "Building code compliance",
                          "Shop drawing development"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Installation Excellence</h4>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Precision panel alignment",
                          "Proper fastening & attachment",
                          "Weather-tight sealing",
                          "Quality control inspections",
                          "Manufacturer certification"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Metal Cladding Applications</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Commercial Buildings",
                  items: ["Office towers", "Retail centers", "Mixed-use developments", "Corporate campuses"]
                },
                {
                  title: "Industrial Facilities",
                  items: ["Manufacturing plants", "Warehouses", "Distribution centers", "Cold storage"]
                },
                {
                  title: "Institutional",
                  items: ["Educational facilities", "Healthcare buildings", "Government buildings", "Recreation centers"]
                }
              ].map((application, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{application.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {application.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Transform Your Building's Facade</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create a distinctive, high-performance building exterior with metal cladding. Let's discuss your project requirements and design vision.
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

export default MetalCladding;
