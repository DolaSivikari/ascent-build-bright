import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Building2, 
  Layers, 
  Cpu, 
  Hammer, 
  Leaf,
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Briefcase,
  Shield
} from "lucide-react";

const Services = () => {
  const coreServices = [
    {
      icon: FileText,
      title: "Preconstruction & Consulting",
      description: "Strategic planning sets the foundation for project success",
      features: [
        "Feasibility studies & site analysis",
        "Cost estimation & budgeting",
        "Value engineering & optimization",
        "Risk assessment & mitigation",
        "Permitting & regulatory compliance",
        "Schedule development & planning"
      ],
      benefits: "Accurate budgets using Procore analytics and historical data from 500+ projects. Identify cost savings early through value engineering.",
      link: "/estimate"
    },
    {
      icon: Building2,
      title: "Construction Management",
      description: "Expert oversight from groundbreaking to completion",
      features: [
        "CM at Risk delivery",
        "Multi-Prime coordination",
        "Real-time cost tracking with Procore",
        "Schedule management & acceleration",
        "Quality control & inspections",
        "Stakeholder collaboration"
      ],
      benefits: "Proven track record managing $2M-$50M projects with zero lost-time incidents. Real-time dashboards keep clients informed.",
      link: "/estimate"
    },
    {
      icon: Layers,
      title: "Design-Build & Turnkey",
      description: "Single-source delivery for faster completion",
      features: [
        "Integrated design & construction",
        "Early cost certainty",
        "Reduced project timelines",
        "Single point of accountability",
        "Collaborative problem-solving",
        "Fast-track delivery options"
      ],
      benefits: "20-30% faster delivery than traditional methods. Early involvement reduces change orders and maximizes budget efficiency.",
      link: "/estimate"
    },
    {
      icon: Cpu,
      title: "Virtual Design & Construction (VDC)",
      description: "Technology-driven precision and coordination",
      features: [
        "3D/4D BIM modeling",
        "Laser scanning & as-builts",
        "Clash detection & coordination",
        "Digital collaboration with Autodesk Cloud",
        "Quantity take-offs & estimating",
        "Construction sequencing"
      ],
      benefits: "Minimize rework through clash detection. Coordinate MEP, structural, and architectural systems before construction starts.",
      link: "/estimate"
    },
    {
      icon: Hammer,
      title: "General Contracting",
      description: "Comprehensive project execution and trade coordination",
      features: [
        "Trade procurement & coordination",
        "Site supervision & management",
        "Quality assurance & testing",
        "COR-certified safety protocols",
        "Material procurement",
        "Progress reporting & documentation"
      ],
      benefits: "Trusted relationships with 100+ trade partners. COR certification and zero lost-time incidents across 500+ projects.",
      link: "/estimate"
    },
    {
      icon: Leaf,
      title: "Sustainable Building & LEED",
      description: "Environmentally responsible construction",
      features: [
        "LEED certification support (all levels)",
        "Energy-efficient systems design",
        "Green material sourcing",
        "Waste diversion programs (85% rate)",
        "Building envelope optimization",
        "Renewable energy integration"
      ],
      benefits: "LEED AP professionals guide certification. 15+ LEED projects completed with average 30% energy cost reduction.",
      link: "/estimate"
    }
  ];

  const sectors = [
    {
      icon: Building,
      title: "Commercial",
      description: "Office buildings, retail spaces, mixed-use developments",
      link: "/projects"
    },
    {
      icon: Shield,
      title: "Institutional",
      description: "Healthcare facilities, educational buildings, government",
      link: "/projects"
    },
    {
      icon: Building2,
      title: "Industrial",
      description: "Manufacturing facilities, warehouses, distribution centers",
      link: "/projects"
    },
    {
      icon: Users,
      title: "Multi-Residential",
      description: "Condos, apartments, senior living facilities",
      link: "/projects"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Construction Management Services | Toronto & GTA"
        description="Comprehensive construction services: preconstruction planning, CM at Risk, design-build, VDC/BIM, general contracting, and LEED-certified sustainable building. Serving commercial, institutional, and industrial sectors."
        keywords="construction management Toronto, design-build contractor, preconstruction services, BIM coordination, LEED certified, general contractor GTA, CM at risk, virtual design construction"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 mb-6">
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Full-Spectrum Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Construction Solutions Built for Success</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              From preconstruction consulting to final handover, we deliver comprehensive construction services backed by technology, expertise, and 15+ years of proven results.
            </p>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Integrated construction services leveraging Procore, Autodesk Construction Cloud, and Bluebeam for transparency and efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {coreServices.map((service, index) => (
                <Card 
                  key={index}
                  className="card-hover border-border/50 overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms`, animation: 'fade-in 0.6s ease-out forwards' }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-secondary/5 rounded-lg mb-6">
                      <p className="text-sm text-muted-foreground italic">
                        <strong className="text-primary font-semibold">Why it matters:</strong> {service.benefits}
                      </p>
                    </div>

                    <Link to={service.link}>
                      <Button variant="outline" className="w-full group/btn">
                        Request Consultation
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors We Serve */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Sectors We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Diverse experience across commercial, institutional, industrial, and multi-residential projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {sectors.map((sector, index) => (
                <Card 
                  key={index}
                  className="card-hover text-center group"
                  style={{ animationDelay: `${index * 100}ms`, animation: 'fade-in 0.6s ease-out forwards' }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <sector.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{sector.title}</h3>
                    <p className="text-sm text-muted-foreground">{sector.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology & Tools */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title mb-6">Technology-Driven Excellence</h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                We leverage industry-leading platforms to deliver transparency, collaboration, and efficiency on every project
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border border-border/50">
                  <h3 className="font-bold text-xl mb-3 text-primary">Procore</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time project management, cost tracking, document control, and RFI workflows
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl border border-border/50">
                  <h3 className="font-bold text-xl mb-3 text-secondary">Autodesk Construction Cloud</h3>
                  <p className="text-sm text-muted-foreground">
                    BIM coordination, model management, clash detection, and design collaboration
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border border-border/50">
                  <h3 className="font-bold text-xl mb-3 text-primary">Bluebeam</h3>
                  <p className="text-sm text-muted-foreground">
                    Digital markups, take-offs, submittal management, and document coordination
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Build Something Exceptional</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Schedule a consultation to discuss your construction project. We'll provide transparent budgeting, realistic timelines, and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl">
                  Request Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-6 text-lg font-semibold rounded-2xl backdrop-blur-sm">
                  View Our Work
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

export default Services;