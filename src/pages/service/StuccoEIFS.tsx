import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import stuccoDetail from "@/assets/stucco-detail.jpg";

const StuccoEIFS = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Stucco & EIFS Installation Services"
        description="Expert Stucco and EIFS installation, repair, and restoration across the GTA. Superior insulation, weather-resistant finishes, and manufacturer-backed warranties."
        keywords="stucco installation, EIFS, exterior insulation, stucco repair, EIFS contractor Mississauga, stucco GTA"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Stucco & EIFS Systems
              </h1>
              <p className="text-xl opacity-90">
                Expert installation, repair, and restoration across the GTA
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
                  High-Performance Exterior Systems
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ascent Group specializes in modern Stucco/EIFS systems that combine insulation and cladding for energy performance and visual appeal. Our crews install, repair, and finish systems to manufacturer standards, ensuring longevity and warranty compliance.
                </p>

                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Services Include
                </h3>
                <div className="space-y-3 mb-8">
                  {[
                    "Full system installations (substrate prep, WRB, insulation, basecoat, finish)",
                    "Repairs and patching (crack remediation, flashing replacement)",
                    "Texture & finish options: fine aggregate, synthetic stucco, textured finishes",
                    "Color matching services",
                    "Moisture management and flashing integration",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Card className="p-6 mb-8 border-2 bg-muted/30">
                  <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                    Technical Approach
                  </h3>
                  <p className="text-muted-foreground">
                    We follow manufacturer specifications and perform QA checks at each stage: substrate inspection, weather-resistive barrier integrity, mechanical fastening, base coat thickness, mesh embedding, and finish application.
                  </p>
                </Card>

                <Link to="/estimate">
                  <Button size="lg" className="btn-hero w-full">
                    Request a Stucco/EIFS Estimate
                  </Button>
                </Link>
              </div>

              <div>
                <OptimizedImage
                  src={stuccoDetail}
                  alt="Professional stucco and EIFS installation detail showcasing complete system with insulation integration, moisture management, and premium textured finish"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full mb-8"
                  priority
                />

                <Card className="p-6 mb-8 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Timeline & Staging
                  </h3>
                  <p className="text-muted-foreground">
                    Projects staged by substrate access and weather windows. We provide a project schedule with milestones and site protection details.
                  </p>
                </Card>

                <Card className="p-6 mb-8 bg-primary/5 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Pricing & Estimator
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Per-square-foot pricing varies by system complexity. Use our estimator for an initial range — request a site visit for a fixed proposal.
                  </p>
                  <Link to="/estimate">
                    <Button className="btn-hero w-full">
                      Get Instant Estimate
                    </Button>
                  </Link>
                </Card>

                <Card className="p-6 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Warranty & Maintenance
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Manufacturer-backed warranty options available. We provide maintenance guidelines and seasonal inspection recommendations.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive warranty coverage</li>
                    <li>• Seasonal inspection services</li>
                    <li>• Maintenance plan options</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12 text-primary">
                Why Choose EIFS?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center border-2">
                  <div className="text-4xl font-bold text-secondary mb-3">Superior</div>
                  <h3 className="text-lg font-bold mb-2 text-primary">Insulation</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrated insulation layer improves energy efficiency and comfort
                  </p>
                </Card>
                <Card className="p-6 text-center border-2">
                  <div className="text-4xl font-bold text-secondary mb-3">Weather</div>
                  <h3 className="text-lg font-bold mb-2 text-primary">Resistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed to withstand freeze-thaw cycles and moisture
                  </p>
                </Card>
                <Card className="p-6 text-center border-2">
                  <div className="text-4xl font-bold text-secondary mb-3">Custom</div>
                  <h3 className="text-lg font-bold mb-2 text-primary">Finishes</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited color and texture options to match your vision
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Ready to Upgrade Your Exterior?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a free estimate or schedule a site assessment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-[var(--shadow-glow)] hover:scale-105 transition-all">
                    Request Estimate
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold text-lg px-10 py-6 rounded-xl">
                    View Projects
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

export default StuccoEIFS;
