import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PaintCalculator from "@/components/PaintCalculator";
import CertificationModal from "@/components/CertificationModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, CheckCircle2, Calculator, PlayCircle, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import resourcesData from "@/data/resources.json";
import blueprintBg from "@/assets/blueprint-bg.jpg";

const Resources = () => {
  const [selectedCert, setSelectedCert] = useState<{
    name: string;
    description: string;
    verificationUrl?: string;
  } | null>(null);

  const featuredResources = resourcesData.resources.filter(r => r.featured).slice(0, 4);
  const categories = ["All", ...Array.from(new Set(resourcesData.resources.map(r => r.category)))];

  const certifications = [
    {
      name: "WSIB Compliant",
      description: "Workplace Safety and Insurance Board certified for worker protection and safety compliance.",
      logo: "🛡️"
    },
    {
      name: "TCA Member",
      description: "Toronto Construction Association member, adhering to industry standards and best practices.",
      logo: "🏗️"
    },
    {
      name: "COR Certified",
      description: "Certificate of Recognition for health and safety management systems.",
      logo: "✓"
    },
    {
      name: "EnergyStar Partner",
      description: "Committed to energy-efficient practices and sustainable building solutions.",
      logo: "⭐"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Your Construction Resource Hub | Guides, Tools & Expert Insights"
        description="Access comprehensive guides, calculators, certifications, and expert resources from Ascent Group Construction. Download free PDFs, use our tools, and get answers to your questions."
        keywords="construction resources, painting guides, stucco maintenance, cost calculator, WSIB certified, construction tools, FAQ"
      />
      <Header />
      
      <main>
        {/* Hero Section with Blueprint Background */}
        <section 
          className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.85)), url(${blueprintBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Construction Resource Hub
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Guides, tools, and expert insights from Ascent Group Construction
            </p>
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </section>

        {/* Featured Guides Section */}
        <section className="container mx-auto px-4 py-16 border-b">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular guides and downloads to help you plan and execute your project successfully
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-12 h-12 text-primary" />
                    <Badge className="bg-secondary text-primary">{resource.type}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {resource.topics.slice(0, 3).map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools & Calculators Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Tools & Calculators</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interactive tools to help you plan and budget your project
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Paint Calculator */}
              <PaintCalculator />

              {/* Project Cost Estimator */}
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <Calculator className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Project Cost Estimator</h3>
                    <p className="text-muted-foreground">
                      Get instant estimates for your painting, stucco, or EIFS project
                    </p>
                  </div>
                  <Link to="/estimate">
                    <Button size="lg" className="w-full">
                      Launch Estimator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon - Material Selector */}
            <div className="max-w-3xl mx-auto mt-8">
              <Card className="border-dashed border-2">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    <strong>Coming Soon:</strong> Interactive Material Selector Tool
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications & Compliance Section */}
        <section className="container mx-auto px-4 py-16 border-b">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Certifications & Compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest industry standards and certifications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-5xl">{cert.logo}</div>
                  <div>
                    <h3 className="font-bold mb-1">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">Click to learn more</p>
                  </div>
                  <Shield className="w-6 h-6 text-primary mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Resources */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">All Resources</h2>
          
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-8 flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => {
              const filteredResources = category === "All" 
                ? resourcesData.resources 
                : resourcesData.resources.filter(r => r.category === category);

              return (
                <TabsContent key={category} value={category}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="outline">{resource.category}</Badge>
                            <span className="text-xs text-muted-foreground">{resource.type}</span>
                          </div>
                          <h3 className="font-bold mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {resource.description}
                          </p>
                          <Button variant="outline" className="w-full" size="sm">
                            <Download className="w-3 h-3 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        {/* Video & Media Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Video Resources</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch our process and learn from our experts
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Video Placeholder 1 */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-primary opacity-70" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Our Construction Process</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    See how we deliver exceptional results from consultation to completion
                  </p>
                  <Badge>Coming Soon</Badge>
                </CardContent>
              </Card>

              {/* Video Placeholder 2 */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-primary opacity-70" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sustainability at Ascent</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Learn about our commitment to energy-efficient and eco-friendly practices
                  </p>
                  <Badge>Coming Soon</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about our services, pricing, and process
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {resourcesData.faqs.map((section, sectionIdx) => (
              <div key={sectionIdx} className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">{section.category}</h3>
                <Accordion type="single" collapsible className="bg-card rounded-lg shadow-sm">
                  {section.questions.map((item, idx) => (
                    <AccordionItem key={idx} value={`${sectionIdx}-${idx}`}>
                      <AccordionTrigger className="px-6 text-left font-semibold hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Need Expert Guidance?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Schedule a free consultation with our construction experts. We'll help you plan your project, select materials, and provide accurate estimates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/estimate">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                    Get Free Estimate
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />

      {/* Certification Modal */}
      {selectedCert && (
        <CertificationModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          certification={selectedCert}
        />
      )}
    </div>
  );
};

export default Resources;
