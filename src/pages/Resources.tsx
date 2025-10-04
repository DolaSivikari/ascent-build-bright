import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import resourcesData from "@/data/resources.json";

const Resources = () => {
  const featuredResources = resourcesData.resources.filter(r => r.featured);
  const categories = ["All", ...Array.from(new Set(resourcesData.resources.map(r => r.category)))];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Resources & Downloads"
        description="Free guides, checklists, and resources for your painting and stucco projects. Download expert tips and comprehensive FAQs."
        keywords="painting guide, stucco maintenance, home improvement resources, contractor FAQs, project checklists"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Resources & Downloads</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Expert guides, helpful checklists, and comprehensive FAQs to help you make informed decisions about your project.
            </p>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="container mx-auto px-4 py-16 border-b">
          <h2 className="text-3xl font-bold mb-8">Featured Downloads</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow border-2 border-primary/20">
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
                  <Button className="w-full btn-hero">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
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

        {/* FAQ Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to the most common questions about our services, pricing, and process.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {resourcesData.faqs.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">{section.category}</h3>
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
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Our team is here to help. Contact us for personalized advice and a free consultation.
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
    </div>
  );
};

export default Resources;
