import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParkingSquare, CheckCircle2, Shield, AlertTriangle, Wrench, Clock } from "lucide-react";

const ParkingGarage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Parking Garage Painting Services"
        description="Professional parking garage painting and coating services. Traffic coatings, line striping, waterproofing, and concrete restoration for underground and above-ground parking structures."
        keywords="parking garage painting, parkade coating, traffic coatings, line striping, concrete sealing, parking structure restoration"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <ParkingSquare className="w-5 h-5" />
                <span className="font-semibold">Specialized Service</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Parking Garage Coating Experts
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Professional coating systems for underground and above-ground parking structures. Protect your investment with durable, safe, compliant solutions.
              </p>
              <Link to="/estimate">
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-xl">
                  Get Parking Garage Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Complete Parking Structure Solutions
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: ParkingSquare,
                    title: "Traffic Deck Coatings",
                    description: "Heavy-duty epoxy and polyurethane systems designed for vehicle traffic",
                    features: [
                      "Chemical resistant",
                      "Abrasion resistant", 
                      "Waterproof membranes",
                      "Anti-slip surfaces"
                    ]
                  },
                  {
                    icon: AlertTriangle,
                    title: "Safety Line Striping",
                    description: "High-visibility traffic markings and directional signage",
                    features: [
                      "Parking stalls",
                      "Traffic lanes",
                      "Safety zones",
                      "Handicap spaces"
                    ]
                  },
                  {
                    icon: Shield,
                    title: "Concrete Sealing",
                    description: "Protective sealers to prevent water infiltration and damage",
                    features: [
                      "Crack prevention",
                      "Chloride protection",
                      "Freeze-thaw resistance",
                      "Extended lifespan"
                    ]
                  },
                  {
                    icon: Wrench,
                    title: "Structural Repairs",
                    description: "Concrete restoration and preparation before coating",
                    features: [
                      "Spall repair",
                      "Crack filling",
                      "Joint sealing",
                      "Surface leveling"
                    ]
                  },
                  {
                    icon: CheckCircle2,
                    title: "Ceiling & Wall Coating",
                    description: "Protective coatings for exposed concrete surfaces",
                    features: [
                      "Moisture barriers",
                      "Mold prevention",
                      "Bright, reflective",
                      "Easy maintenance"
                    ]
                  },
                  {
                    icon: Clock,
                    title: "Maintenance Programs",
                    description: "Scheduled maintenance to extend coating life",
                    features: [
                      "Regular inspections",
                      "Touch-up services",
                      "Re-striping",
                      "Preventive care"
                    ]
                  }
                ].map((service, index) => (
                  <Card key={service.title} className="p-6 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards'
                    }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12 text-primary">
                Why Parking Garage Coating Matters
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Parking garages face unique challenges: vehicle traffic, de-icing salts, moisture exposure, and temperature fluctuations. Without proper protection, concrete deteriorates rapidly, leading to expensive structural repairs.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <Card className="p-6 bg-destructive/10 border-destructive/20">
                    <h3 className="text-xl font-heading font-bold mb-4 text-destructive">Without Proper Coating:</h3>
                    <ul className="space-y-2">
                      {[
                        "Concrete spalling and deterioration",
                        "Rebar corrosion and structural damage",
                        "Water infiltration and freeze damage",
                        "Unsafe driving surfaces",
                        "Expensive emergency repairs",
                        "Shortened structure lifespan"
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-destructive mt-1">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 bg-secondary/10 border-secondary/20">
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">With Professional Coating:</h3>
                    <ul className="space-y-2">
                      {[
                        "Protected concrete surface",
                        "Extended structural life by 15-20 years",
                        "Waterproof membrane protection",
                        "Safe, slip-resistant surface",
                        "Lower long-term maintenance costs",
                        "Enhanced property value"
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-16 text-primary">
                Our Professional Approach
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6 text-primary">Preparation is Everything</h3>
                  <p className="text-muted-foreground mb-4">
                    We understand that surface preparation determines coating success. Our team thoroughly prepares every surface before applying protective systems.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Pressure washing and cleaning",
                      "Concrete crack repair",
                      "Spall and damage restoration",
                      "Surface profiling for adhesion",
                      "Moisture testing",
                      "Primer application"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6 text-primary">Minimal Disruption</h3>
                  <p className="text-muted-foreground mb-4">
                    We know your parking facility needs to remain operational. We work with your schedule to minimize impact on tenants and visitors.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Phased approach by level or zone",
                      "Night and weekend scheduling",
                      "Quick-cure coating options",
                      "Traffic control and signage",
                      "Temporary parking solutions",
                      "Fast turnaround times"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Systems We Use */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12 text-primary">
                Premium Coating Systems
              </h2>

              <div className="space-y-6">
                {[
                  {
                    name: "Epoxy Traffic Coatings",
                    description: "Heavy-duty epoxy systems for high-traffic areas. Chemical resistant, abrasion resistant, and long-lasting.",
                    applications: ["Main drive lanes", "Ramps", "High-traffic zones"]
                  },
                  {
                    name: "Polyurethane Topcoats",
                    description: "UV-stable topcoats for exposed areas. Flexible, weather-resistant, and maintains color.",
                    applications: ["Exterior levels", "Roof decks", "Sun-exposed areas"]
                  },
                  {
                    name: "Waterproof Membranes",
                    description: "Seamless waterproofing systems to prevent water infiltration and protect structural concrete.",
                    applications: ["Occupied spaces below", "Critical protection zones"]
                  },
                  {
                    name: "Anti-Slip Additives",
                    description: "Textured finishes providing excellent traction in wet conditions for safety compliance.",
                    applications: ["Ramps", "Pedestrian areas", "Safety zones"]
                  }
                ].map((system) => (
                  <Card key={system.name} className="p-6 border-l-4 border-l-primary">
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">{system.name}</h3>
                    <p className="text-muted-foreground mb-3">{system.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {system.applications.map((app) => (
                        <span key={app} className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                          {app}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Protect Your Parking Investment
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Professional parking garage coating extends structure life by decades. Get a comprehensive assessment and quote today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/estimate">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 shadow-xl">
                    Request Free Assessment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-10 py-6">
                    Contact Our Team
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

export default ParkingGarage;
