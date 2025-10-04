import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Grid3X3, CheckCircle2, Sparkles, Droplets, Layers, Shield } from "lucide-react";

const TileFlooring = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Tile & Flooring Installation - Commercial & Residential"
        description="Professional tile and flooring installation services for commercial and residential projects. Ceramic, porcelain, natural stone, luxury vinyl, and specialty flooring across the GTA."
        keywords="tile installation, flooring, ceramic tile, porcelain tile, stone flooring, LVT, commercial flooring, GTA"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Grid3X3 className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Tile & Flooring Installation</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Transform spaces with beautiful, durable flooring solutions. From elegant tile installations to high-performance commercial flooring, we deliver precision workmanship every time.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Flooring Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Ceramic & Porcelain Tile",
                  description: "Classic and modern tile installations for any application",
                  features: ["Floor tile", "Wall tile", "Large format tile", "Mosaic work"]
                },
                {
                  title: "Natural Stone",
                  description: "Premium stone flooring with expert installation",
                  features: ["Marble", "Granite", "Limestone", "Slate & travertine"]
                },
                {
                  title: "Luxury Vinyl",
                  description: "High-performance LVT and LVP flooring systems",
                  features: ["Luxury vinyl tile", "Vinyl plank", "Sheet vinyl", "Designer patterns"]
                },
                {
                  title: "Commercial Flooring",
                  description: "Durable flooring for high-traffic commercial spaces",
                  features: ["VCT tile", "Rubber flooring", "Epoxy coatings", "Specialty systems"]
                },
                {
                  title: "Bathroom & Wet Areas",
                  description: "Waterproof installations for moisture-prone spaces",
                  features: ["Shower tile & pans", "Bathroom floors", "Pool areas", "Commercial washrooms"]
                },
                {
                  title: "Specialty Installations",
                  description: "Custom flooring solutions for unique requirements",
                  features: ["Heated floor systems", "Decorative patterns", "Transitions & thresholds", "Custom borders"]
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

        {/* Installation Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Installation Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Surface Preparation",
                    description: "Proper substrate preparation is critical for long-lasting installations. We ensure surfaces are level, clean, and properly primed.",
                    points: ["Substrate inspection & repair", "Leveling compounds as needed", "Moisture testing", "Crack isolation membranes"]
                  },
                  {
                    title: "Waterproofing",
                    description: "Protect your investment with proper waterproofing in wet areas. We use industry-leading waterproofing systems.",
                    points: ["Shower pan systems", "Waterproof membranes", "Seam sealing", "Proper slope & drainage"]
                  },
                  {
                    title: "Precision Installation",
                    description: "Expert tile and flooring installation with attention to pattern, layout, and quality. Every detail matters.",
                    points: ["Layout planning", "Premium thin-set mortars", "Proper spacing & alignment", "Quality grout application"]
                  },
                  {
                    title: "Finishing & Protection",
                    description: "Complete the job with proper finishing, sealing, and protection to ensure beauty and durability.",
                    points: ["Grout sealing", "Stone sealing", "Caulking & transitions", "Final cleaning & inspection"]
                  }
                ].map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        {step.title}
                      </CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Material Options */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Flooring Materials We Work With</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Grid3X3,
                  title: "Tile Options",
                  items: ["Ceramic", "Porcelain", "Glass tile", "Metal tile"]
                },
                {
                  icon: Layers,
                  title: "Stone Types",
                  items: ["Marble", "Granite", "Limestone", "Slate"]
                },
                {
                  icon: Sparkles,
                  title: "Vinyl Products",
                  items: ["LVT", "LVP", "Sheet vinyl", "VCT"]
                },
                {
                  icon: Shield,
                  title: "Specialty",
                  items: ["Epoxy", "Rubber", "Cork", "Heated systems"]
                }
              ].map((category, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <category.icon className="w-12 h-12 text-primary mx-auto mb-3" />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Ascent for Flooring</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Sparkles,
                  title: "Precision Craftsmanship",
                  description: "Our installers are meticulous about layout, pattern alignment, and grout lines. The difference is in the details, and we get them right."
                },
                {
                  icon: Droplets,
                  title: "Waterproofing Experts",
                  description: "Proper waterproofing is essential in wet areas. We're certified in industry-leading waterproofing systems to protect your investment."
                },
                {
                  icon: Shield,
                  title: "Warranty Protection",
                  description: "We stand behind our work with comprehensive warranties. Quality materials and expert installation mean flooring that performs for years."
                }
              ].map((advantage, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <advantage.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <CardTitle>{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Beautiful New Floors?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              From selection to installation, we guide you through every step. Let's create the perfect flooring solution for your space.
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

export default TileFlooring;
