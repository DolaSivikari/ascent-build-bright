import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, MapPin, Calendar, Ruler, Download, ExternalLink } from "lucide-react";
import projectCommercialStucco from "@/assets/project-commercial-stucco.jpg";
import projectModernCondo from "@/assets/project-modern-condo.jpg";
import projectOfficeTower from "@/assets/project-office-tower.jpg";

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  type: string;
  size: string;
  duration: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  materials: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "downtown-office-tower",
    title: "Downtown Toronto Office Tower Renovation",
    location: "Downtown Toronto, ON",
    type: "Commercial",
    size: "125,000 sq ft",
    duration: "18 months",
    image: projectOfficeTower,
    challenge: "A 1970s office tower required comprehensive facade restoration while maintaining full occupancy. The building's aging exterior posed water infiltration risks and energy efficiency concerns.",
    solution: "We implemented a phased approach using advanced scaffolding systems to work on different building sections while tenants remained in operation. Modern EIFS cladding with enhanced insulation was installed, and all glazing was replaced with high-performance units.",
    results: [
      "40% improvement in building energy efficiency",
      "Zero disruption to tenant operations",
      "Completed 2 weeks ahead of schedule",
      "LEED Silver certification achieved"
    ],
    testimonial: {
      quote: "Ascent Group's professionalism and technical expertise transformed our aging building into a modern, energy-efficient asset. Their ability to work around our tenants was exceptional.",
      author: "David Chen",
      role: "Property Manager, Toronto Commercial Properties"
    },
    materials: ["EIFS Cladding System", "Low-E Glass Units", "Aluminum Curtain Wall", "Waterproofing Membrane"]
  },
  {
    id: "luxury-condo-complex",
    title: "Luxury Waterfront Condo Complex",
    location: "Mississauga, ON",
    type: "Residential",
    size: "300 units",
    duration: "24 months",
    image: projectModernCondo,
    challenge: "Delivering high-end finishes across 300 residential units while coordinating with multiple trades and maintaining strict quality control standards. The waterfront location presented logistical challenges.",
    solution: "Implemented a digital project management system for real-time coordination between trades. Established dedicated quality control checkpoints and used prefabricated components where possible to ensure consistency and accelerate timeline.",
    results: [
      "98% first-time pass rate on final inspections",
      "Delivered on budget with zero change orders",
      "All 300 units met premium finish standards",
      "Featured in Toronto Architectural Digest"
    ],
    testimonial: {
      quote: "The attention to detail and craftsmanship in every unit exceeded our expectations. Ascent Group proved they can deliver luxury at scale.",
      author: "Sarah Williams",
      role: "Development Director, Waterfront Developments Inc."
    },
    materials: ["Premium Hardwood Flooring", "Quartz Countertops", "Custom Millwork", "Designer Fixtures"]
  },
  {
    id: "heritage-building-restoration",
    title: "Heritage Building Facade Restoration",
    location: "Old Toronto, ON",
    type: "Heritage/Commercial",
    size: "45,000 sq ft",
    duration: "14 months",
    image: projectCommercialStucco,
    challenge: "Restoring a 1920s heritage building's original stucco facade while meeting modern building codes and heritage preservation guidelines. Original materials and techniques had to be matched precisely.",
    solution: "Our team worked closely with heritage consultants to recreate authentic stucco mixes using period-appropriate materials. Advanced non-invasive repair techniques preserved 70% of the original facade while reinforcing structural integrity.",
    results: [
      "Heritage designation maintained",
      "Toronto Heritage Award recipient",
      "Original architectural details preserved",
      "50-year structural warranty achieved"
    ],
    testimonial: {
      quote: "Ascent Group demonstrated rare expertise in heritage restoration. They treated our building with the reverence it deserved while bringing it into the 21st century.",
      author: "Dr. Michael Roberts",
      role: "Heritage Consultant, Toronto Historical Society"
    },
    materials: ["Historic Lime-Based Stucco", "Terracotta Restoration", "Custom Stone Repairs", "Heritage Paint Systems"]
  }
];

const CaseStudies = () => {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const types = ["All", "Commercial", "Residential", "Heritage/Commercial"];

  const filteredCases = selectedType === "All" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.type === selectedType);

  const openModal = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Case Studies - Project Deep Dives"
        description="Explore in-depth case studies of Ascent Group Construction's most challenging and innovative projects across Toronto and the GTA."
        keywords="construction case studies, project portfolio, Toronto construction, commercial projects, residential projects"
      />
      <SkipToContent />
      <Header />
      
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary to-deep-blue overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Building2 className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Project Deep Dives
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover how we tackle complex construction challenges with innovative solutions and expert craftsmanship
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-muted/30 sticky top-16 z-20 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className="min-w-[120px]"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCases.map((caseStudy) => (
                <Card 
                  key={caseStudy.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => openModal(caseStudy)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={caseStudy.image} 
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{caseStudy.type}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        {caseStudy.location}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          {caseStudy.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {caseStudy.duration}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {caseStudy.challenge}
                    </p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Read Full Case Study
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedCase && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-heading pr-8">{selectedCase.title}</DialogTitle>
                  <DialogDescription className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedCase.location}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Badge>{selectedCase.type}</Badge>
                      <span className="text-sm">{selectedCase.size}</span>
                      <span className="text-sm">{selectedCase.duration}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 mt-6">
                  <img 
                    src={selectedCase.image} 
                    alt={selectedCase.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="text-lg">Challenge</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedCase.challenge}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                      <CardHeader>
                        <CardTitle className="text-lg">Solution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedCase.solution}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-secondary/10 border-secondary/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          {selectedCase.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-secondary font-bold">✓</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Client Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg italic mb-4">"{selectedCase.testimonial.quote}"</p>
                      <p className="text-sm font-semibold">{selectedCase.testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{selectedCase.testimonial.role}</p>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Materials & Specifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline">{material}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <Download className="mr-2 w-4 h-4" />
                      Download PDF Case Study
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href="/contact">Request Similar Project Quote</a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
