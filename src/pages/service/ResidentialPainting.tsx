import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import paintingProject from "@/assets/painting-project.jpg";

const ResidentialPainting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Residential Painting Services"
        description="Professional interior and exterior painting services across the GTA. Premium coatings, expert surface prep, and color consultation. Request a free estimate today."
        keywords="residential painting, interior painting, exterior painting, house painters Mississauga, painting contractor GTA"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Residential Painting
              </h1>
              <p className="text-xl opacity-90">
                Interior & Exterior — Professional painting services across the GTA
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <OptimizedImage
                  src={paintingProject}
                  alt="Professional residential painting project showcasing interior and exterior painting with premium finishes, detailed surface prep, and expert color application"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full mb-8"
                  priority
                />
                
                <Card className="p-6 bg-muted/30 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Typical Timeline
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Small jobs (1–3 rooms):</strong> 2–5 days</li>
                    <li><strong>Full exterior painting:</strong> 5–12 business days (weather permitting)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Timeline includes drying times and client walkthrough.
                  </p>
                </Card>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
                  Interior & Exterior Painting
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  A great paint job starts with preparation. At Ascent Group Construction, our painting service emphasizes surface prep, high-quality coatings, and meticulous application to deliver durable, beautiful finishes for homes across the GTA.
                </p>

                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  What's Included
                </h3>
                <div className="space-y-3 mb-8">
                  {[
                    "Detailed surface inspection & documented scope",
                    "Cleaning, light carpentry repairs, caulking, and sanding",
                    "Primer & two-coat application with premium paint brands",
                    "Low-VOC options available",
                    "Color consultation with digital color mockups (upon request)",
                    "Final walkthrough and touch-up list",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Card className="p-6 mb-8 border-2">
                  <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                    Quality & Materials
                  </h3>
                  <p className="text-muted-foreground">
                    We partner with premium paint brands chosen for durability and color retention. Options for anti-microbial and eco-friendly paints are available.
                  </p>
                </Card>

                <Card className="p-6 mb-8 bg-muted/30 border-2">
                  <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                    Pricing Guide
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Estimates are provided per square foot. Use our estimator for an instant range — for detailed pricing we perform a site visit.
                  </p>
                  <Link to="/estimate">
                    <Button className="btn-hero w-full">
                      Get Instant Estimate
                    </Button>
                  </Link>
                </Card>

                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 mb-8">
                  <Card className="p-4 border-2">
                    <h4 className="font-bold text-primary mb-2">Do you move furniture?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, for interior projects we handle protective covering and light furniture moving.
                    </p>
                  </Card>
                  <Card className="p-4 border-2">
                    <h4 className="font-bold text-primary mb-2">Are you insured?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, fully insured with WSIB coverage.
                    </p>
                  </Card>
                </div>

                <Link to="/estimate">
                  <Button size="lg" className="btn-hero w-full">
                    Request a Painting Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Ready to Transform Your Home?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a free estimate or view our recent painting projects
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

export default ResidentialPainting;
