import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Shield, Zap, Droplets, Thermometer, Award, FileCheck, Clock } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import stuccoDetail from "@/assets/stucco-detail.jpg";

const StuccoEIFS = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Expert EIFS & Stucco Installation | Energy-Efficient Exterior Systems"
        description="Professional EIFS and Stucco installation by certified contractors. Superior insulation (R5-R10+), advanced moisture management, and manufacturer-backed warranties. Serving GTA."
        keywords="EIFS installation, exterior insulation finish system, stucco contractor, StoPowerwall, DrainScreen, energy efficient cladding, EIFS repair Mississauga"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Certified EIFS Installers</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                EIFS & Stucco Systems
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Superior insulation, weather protection, and architectural beauty in one advanced exterior system
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-xl">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link to="/blog/complete-guide-eifs-systems">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                    Learn About EIFS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="section-title text-primary mb-4">Why EIFS is the Superior Choice</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Modern EIFS systems deliver unmatched performance, combining continuous insulation with advanced moisture management
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Thermometer,
                    title: "Superior Insulation",
                    stat: "R5-R10+",
                    description: "Continuous insulation eliminates thermal bridging, reducing energy costs by 20-30%"
                  },
                  {
                    icon: Droplets,
                    title: "Moisture Management",
                    stat: "DrainScreen",
                    description: "Integrated drainage planes meet IBC code requirements and prevent water damage"
                  },
                  {
                    icon: Shield,
                    title: "Impact Resistant",
                    stat: "Crack Defense",
                    description: "Flexible system with reinforcement resists cracking from building movement"
                  },
                  {
                    icon: Zap,
                    title: "Energy Savings",
                    stat: "20-30%",
                    description: "Reduced heating and cooling costs with continuous thermal envelope"
                  }
                ].map((benefit, index) => (
                  <Card key={benefit.title} className="p-6 text-center card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <benefit.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-secondary mb-2">{benefit.stat}</div>
                    <h3 className="text-lg font-heading font-bold mb-2 text-primary">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* System Details */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
                  Complete EIFS System Technology
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ascent Group is a certified installer of advanced EIFS systems including StoPowerwall® - the industry leader in exterior insulation and finish systems. Our installations meet and exceed all building code requirements.
                </p>

                <Card className="p-6 mb-6 bg-primary/5 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary flex items-center gap-2">
                    <FileCheck className="w-6 h-6 text-secondary" />
                    Code Compliant Systems
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>2018 IECC air barrier requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>IBC water-resistive barrier standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Marine and moist climate drainage requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>ASTM performance standards</span>
                    </li>
                  </ul>
                </Card>

                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Multi-Layer Protection System
                </h3>
                <div className="space-y-4 mb-8">
                  {[
                    {
                      layer: "StoGuard® WRB",
                      description: "Air and water-resistive barrier - first line of defense against moisture infiltration"
                    },
                    {
                      layer: "Continuous Insulation",
                      description: "R5.0 to R10+ rigid foam board mechanically fastened for superior thermal performance"
                    },
                    {
                      layer: "Sto DrainScreen®",
                      description: "Drainage mat creating defined space for moisture management and code compliance"
                    },
                    {
                      layer: "Reinforced Base Coat",
                      description: "Polymer-modified cement with embedded mesh for impact resistance"
                    },
                    {
                      layer: "Sto Crack Defense",
                      description: "Optional high-tensile reinforcement controlling cracking at stress points"
                    },
                    {
                      layer: "Premium Finish",
                      description: "Textured or smooth finish in unlimited colors - including StoCast Brick, Wood, and Stone options"
                    }
                  ].map((item, index) => (
                    <div key={item.layer} className="flex gap-4">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-primary text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-primary mb-1">{item.layer}</div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <OptimizedImage
                  src={stuccoDetail}
                  alt="Professional EIFS installation detail showcasing complete multi-layer system with continuous insulation, drainage plane, and premium textured finish"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full mb-8"
                  priority
                />

                <Card className="p-6 mb-6 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary flex items-center gap-2">
                    <Clock className="w-6 h-6 text-secondary" />
                    Professional Installation Process
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Substrate Preparation:</strong> Thorough inspection, repairs, and flashing installation
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>WRB Installation:</strong> StoGuard air and moisture barrier with sealed seams
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Insulation Attachment:</strong> Mechanical fastening with quality control verification
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Drainage Layer:</strong> DrainScreen installation for enhanced moisture management
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Base Coat & Mesh:</strong> Reinforced application with optional Crack Defense
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Finish Application:</strong> Professional texture and color application
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-2">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary flex items-center gap-2">
                    <Award className="w-6 h-6 text-secondary" />
                    Quality Assurance Guarantee
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Every EIFS installation includes:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Manufacturer specification compliance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Multi-point quality control inspections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Workmanship warranty coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Material warranty registration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Maintenance guidelines provided</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Comprehensive EIFS & Stucco Services
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Complete System Installation",
                    description: "Full EIFS systems from substrate to finish",
                    services: [
                      "New construction EIFS",
                      "Renovation over existing cladding",
                      "StoPowerwall ci systems",
                      "DrainScreen moisture management",
                      "Custom finish selection",
                      "Color consultation"
                    ]
                  },
                  {
                    title: "Repair & Restoration",
                    description: "Expert repair of existing EIFS and stucco",
                    services: [
                      "Crack repair and prevention",
                      "Water damage remediation",
                      "Impact damage repair",
                      "Flashing replacement",
                      "Texture matching",
                      "Finish restoration"
                    ]
                  },
                  {
                    title: "Specialty Applications",
                    description: "Advanced EIFS solutions",
                    services: [
                      "Sto Crack Defense fortification",
                      "Fire-resistant systems",
                      "Hurricane impact systems",
                      "Architectural details",
                      "Real masonry veneers",
                      "StoCast Brick & Wood"
                    ]
                  }
                ].map((category, index) => (
                  <Card key={category.title} className="p-6 border-2 card-hover"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">{category.title}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.services.map((service) => (
                        <li key={service} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12 text-primary">
                Why Choose Ascent Group for EIFS
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Certified Installers",
                    description: "Factory-trained in EIFS application with ongoing education on latest techniques"
                  },
                  {
                    title: "Manufacturer Partnerships",
                    description: "Authorized Sto contractor with access to premium systems and extended warranties"
                  },
                  {
                    title: "Building Science Expertise",
                    description: "Deep understanding of moisture management, thermal performance, and code compliance"
                  },
                  {
                    title: "Quality Materials Only",
                    description: "We use only approved manufacturer components - no substitutions or shortcuts"
                  },
                  {
                    title: "Comprehensive Planning",
                    description: "Detailed assessment, system selection guidance, and moisture management strategy"
                  },
                  {
                    title: "Long-Term Support",
                    description: "Maintenance guidelines, warranty registration, and responsive post-installation service"
                  }
                ].map((reason) => (
                  <Card key={reason.title} className="p-6 border-l-4 border-l-primary">
                    <h3 className="text-lg font-heading font-bold mb-2 text-primary">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Ready to Experience EIFS Benefits?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Get a comprehensive assessment and detailed estimate from certified EIFS professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-xl">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg px-10 py-6 rounded-xl">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
              <p className="mt-8 opacity-80">
                Questions? Call us at <a href="tel:+19055550100" className="font-bold hover:text-secondary transition-colors">(905) 555-0100</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StuccoEIFS;
