import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Hammer, CheckCircle2, Shield, Sparkles, Mountain, Building } from "lucide-react";

const Masonry = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Masonry Services - Block, Brick, Stone Construction & Restoration"
        description="Expert masonry services including block, brick, and stone construction, repair, and restoration. Structural masonry, decorative stone work, and heritage restoration across the GTA."
        keywords="masonry, brick work, stone masonry, block construction, masonry restoration, tuck pointing, stone veneer, GTA"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Mountain className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Masonry Services</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Timeless craftsmanship in block, brick, and stone. From structural foundations to decorative facades, our skilled masons deliver work that stands the test of time.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Masonry Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Concrete Block (CMU)",
                  description: "Structural and architectural concrete masonry units",
                  features: ["Foundation walls", "Structural walls", "Sound barriers", "Decorative block"]
                },
                {
                  title: "Brick Masonry",
                  description: "Traditional and modern brick construction and repair",
                  features: ["Face brick facades", "Structural brick", "Brick veneer", "Brick patterns & bonds"]
                },
                {
                  title: "Natural Stone",
                  description: "Premium stone installation and restoration",
                  features: ["Stone veneer", "Cut stone", "Rubble stone", "Flagstone"]
                },
                {
                  title: "Restoration & Repair",
                  description: "Preserve and restore existing masonry structures",
                  features: ["Tuck pointing", "Brick replacement", "Stone repair", "Heritage restoration"]
                },
                {
                  title: "Masonry Reinforcement",
                  description: "Structural strengthening and seismic upgrades",
                  features: ["Rebar placement", "Grout injection", "Masonry anchors", "Structural ties"]
                },
                {
                  title: "Specialty Masonry",
                  description: "Custom masonry features and architectural elements",
                  features: ["Fireplaces & chimneys", "Outdoor kitchens", "Retaining walls", "Decorative features"]
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

        {/* Materials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Premium Masonry Materials</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-6 h-6 text-primary" />
                    Concrete Masonry Units
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Standard CMU (8\", 10\", 12\")",
                      "Architectural block with various textures",
                      "Split-face and ground-face units",
                      "Specialty shapes and sizes",
                      "Sound-absorbing units",
                      "Insulated CMU options"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hammer className="w-6 h-6 text-primary" />
                    Brick & Stone Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Clay brick in various colors & textures",
                      "Engineering brick for durability",
                      "Thin brick veneer systems",
                      "Natural limestone, granite, sandstone",
                      "Manufactured stone veneer",
                      "Custom-cut stone pieces"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Restoration Expertise */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Masonry Restoration & Repair</h2>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Expert Restoration Services</CardTitle>
                  <CardDescription>
                    Preserve the beauty and structural integrity of your masonry with our specialized restoration services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Tuck Pointing & Repointing</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Remove deteriorated mortar and replace with fresh, color-matched mortar. Proper joint profiles and mortar mixes preserve historical accuracy while ensuring durability.
                      </p>
                      <h4 className="font-semibold mb-3">Brick & Stone Replacement</h4>
                      <p className="text-sm text-muted-foreground">
                        Carefully remove and replace damaged units with matching materials. Expert color and texture matching ensures seamless repairs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Cleaning & Sealing</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Professional masonry cleaning removes years of dirt and stains. Breathable sealers protect against water and efflorescence while maintaining vapor permeability.
                      </p>
                      <h4 className="font-semibold mb-3">Structural Repairs</h4>
                      <p className="text-sm text-muted-foreground">
                        Address cracks, bowing, and structural issues with engineered solutions including reinforcement, ties, and rebuilding when necessary.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">The Ascent Masonry Advantage</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Sparkles,
                  title: "Master Craftsmen",
                  description: "Our masons bring decades of experience and pride in their craft. Every joint, every course is executed with precision and care."
                },
                {
                  icon: Shield,
                  title: "Built to Last",
                  description: "We use premium materials, proper techniques, and proven methods. Our masonry work is engineered and built for generations of service."
                },
                {
                  icon: CheckCircle2,
                  title: "Heritage Expertise",
                  description: "Specialized knowledge in heritage and historical masonry restoration. We understand traditional methods and materials for authentic restorations."
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
            <h2 className="text-3xl font-bold mb-4">Build with Confidence</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're building new or restoring old, our masonry experts deliver exceptional quality and lasting value.
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

export default Masonry;
