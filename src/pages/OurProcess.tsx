import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardCheck, 
  Hammer, 
  Paintbrush, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Users
} from "lucide-react";

const OurProcess = () => {
  const processSteps = [
    {
      step: 1,
      icon: ClipboardCheck,
      title: "Pre-Project Planning",
      duration: "1-3 days",
      description: "We start with understanding your vision and requirements",
      details: [
        "Initial consultation (phone or in-person)",
        "Site inspection and measurements",
        "Detailed project scope discussion",
        "Material selection and color consultation",
        "Transparent pricing with written estimate",
        "Timeline and scheduling planning"
      ],
      deliverables: ["Written estimate", "Project timeline", "Material samples"]
    },
    {
      step: 2,
      icon: Hammer,
      title: "Preparation & Protection",
      duration: "1-2 days",
      description: "Proper preparation is the foundation of quality results",
      details: [
        "Complete furniture and floor protection",
        "Surface cleaning and degreasing",
        "Crack filling and patching",
        "Sanding and surface smoothing",
        "Priming of all surfaces",
        "Masking and taping precision work"
      ],
      deliverables: ["Protected space", "Prepped surfaces", "Quality inspection"]
    },
    {
      step: 3,
      icon: Paintbrush,
      title: "Professional Execution",
      duration: "Varies by project",
      description: "Expert application with attention to every detail",
      details: [
        "Premium materials and tools",
        "Multiple coats for durability",
        "Consistent application techniques",
        "Quality control at each stage",
        "Daily progress updates",
        "Clean workspace maintained"
      ],
      deliverables: ["Professional finish", "Daily updates", "Photo documentation"]
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Completion & Quality Assurance",
      duration: "1 day",
      description: "We don't leave until you're completely satisfied",
      details: [
        "Thorough final inspection",
        "Touch-ups and corrections",
        "Complete cleanup and removal",
        "Final walkthrough with client",
        "Warranty documentation",
        "Care and maintenance instructions"
      ],
      deliverables: ["Final inspection", "Warranty papers", "Maintenance guide"]
    }
  ];

  const qualityStandards = [
    {
      icon: Shield,
      title: "Quality Materials",
      description: "We use only premium, industry-leading paints and materials with manufacturer warranties"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "98% of our projects are completed on or ahead of schedule without compromising quality"
    },
    {
      icon: Users,
      title: "Skilled Craftsmen",
      description: "Our team brings decades of combined experience and ongoing training in latest techniques"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Process"
        description="Discover how Ascent Group Construction delivers exceptional results through our proven 4-step process - from consultation to completion with guaranteed satisfaction."
        keywords="construction process, painting process, project timeline, quality assurance, GTA contractor"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">How We Work</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Proven Process</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              From initial consultation to final walkthrough, we follow a systematic approach 
              that ensures quality, transparency, and your complete satisfaction at every step.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={step.step} className="mb-16 last:mb-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Step Info */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                          <step.icon className="w-8 h-8 text-secondary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                            Step {step.step}
                          </div>
                          <h2 className="text-3xl font-bold text-primary">{step.title}</h2>
                        </div>
                      </div>
                      
                      <div className="mb-4 inline-block px-3 py-1 bg-secondary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">
                        {step.description}
                      </p>

                      <div className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="text-sm font-semibold text-muted-foreground mb-3">
                          You Receive:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((deliverable, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visual Card */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <Card className="overflow-hidden shadow-xl border-2 hover:border-primary/30 transition-all">
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-12">
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
                              <div className="text-5xl font-bold text-primary">
                                {step.step}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
                            <p className="text-muted-foreground">
                              This phase ensures {step.title.toLowerCase()} meets our high standards and your expectations.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center my-8">
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Quality Standards</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every project is backed by our commitment to excellence and attention to detail
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {qualityStandards.map((standard, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <standard.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{standard.title}</h3>
                    <p className="text-muted-foreground">{standard.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your vision and show you exactly how we'll bring it to life
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="text-lg">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg">
                  <Phone className="mr-2 w-5 h-5" />
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

export default OurProcess;
