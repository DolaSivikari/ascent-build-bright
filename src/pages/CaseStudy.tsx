import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Ruler, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import caseStudiesData from "@/data/case-studies.json";

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = id ? caseStudiesData.caseStudies[id as keyof typeof caseStudiesData.caseStudies] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={caseStudy.title}
        description={caseStudy.challenge}
        keywords={`${caseStudy.category}, case study, ${caseStudy.location}, construction project`}
      />
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]">
          <OptimizedImage
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Link to="/projects" className="inline-flex items-center gap-2 text-white mb-6 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <Badge className="mb-4 bg-secondary text-primary">{caseStudy.category}</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {caseStudy.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{caseStudy.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{caseStudy.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{caseStudy.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <span>{caseStudy.size}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <section>
                <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Results Achieved</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.results.map((result, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{result}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.gallery.map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <OptimizedImage
                        src={image}
                        alt={`${caseStudy.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Testimonial */}
              <section className="bg-muted/50 p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-6xl text-primary leading-none">"</div>
                  <div>
                    <p className="text-xl italic mb-4 text-foreground">
                      {caseStudy.testimonial.quote}
                    </p>
                    <div>
                      <p className="font-semibold">{caseStudy.testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Project Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Client</p>
                      <p className="font-semibold">{caseStudy.client}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-semibold">{caseStudy.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-semibold">{caseStudy.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Project Size</p>
                      <p className="font-semibold">{caseStudy.size}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Services Provided</h3>
                  <ul className="space-y-2">
                    {caseStudy.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Specifications</h3>
                  <div className="space-y-3 text-sm">
                    {Object.entries(caseStudy.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-muted-foreground">{key}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Start Your Project</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Ready for similar results? Get your free estimate today.
                  </p>
                  <Link to="/estimate">
                    <Button variant="secondary" className="w-full">
                      Get Free Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
