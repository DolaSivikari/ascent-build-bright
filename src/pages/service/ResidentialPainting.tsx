import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import paintingProject from "@/assets/painting-project.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResidentialPainting = () => {
  const processSteps = [
    {
      number: "01",
      title: "Consultation & Assessment",
      description: "Free on-site visit to assess surfaces, discuss color preferences, and provide detailed scope of work."
    },
    {
      number: "02",
      title: "Surface Preparation",
      description: "Thorough cleaning, repairs, sanding, caulking, and priming. This critical step ensures long-lasting results."
    },
    {
      number: "03",
      title: "Paint Application",
      description: "Premium paint applied in multiple coats using professional techniques for flawless coverage and finish."
    },
    {
      number: "04",
      title: "Quality Check & Walkthrough",
      description: "Final inspection with you to ensure complete satisfaction. Touch-ups completed before project sign-off."
    }
  ];

  const faqs = [
    {
      question: "Do you move furniture?",
      answer: "Yes, for interior projects we handle protective covering and light furniture moving. We recommend removing valuable items and clearing the workspace when possible."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we're fully insured with comprehensive liability coverage and WSIB. All our painters are trained professionals."
    },
    {
      question: "How long does paint last?",
      answer: "With proper preparation and premium materials: exterior paint lasts 7-10 years, interior paint lasts 5-10 years depending on wear and tear."
    },
    {
      question: "Can you match existing colors?",
      answer: "Absolutely! We use advanced color matching technology to perfectly match any existing color from a sample."
    },
    {
      question: "Do you work in winter?",
      answer: "Exterior painting requires temperatures above 50°F. We schedule weather-dependent projects during optimal conditions and can complete interior work year-round."
    },
    {
      question: "What paint brands do you use?",
      answer: "We use premium brands including Benjamin Moore, Sherwin-Williams, and Behr. We select based on project requirements and client preferences."
    }
  ];

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
                    <li><strong>Full interior house:</strong> 5–10 business days</li>
                    <li><strong>Full exterior painting:</strong> 7–14 business days (weather permitting)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Timeline includes prep, drying times, and client walkthrough.
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
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Proven Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We follow a systematic approach to ensure every project exceeds expectations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 relative hover:shadow-lg transition-shadow">
                  <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary w-8 h-8" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about our painting services
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
