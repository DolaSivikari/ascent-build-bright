import { Building2, Factory, School, Hospital, ShoppingBag, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CorporateSectors = () => {
  const sectors = [
    {
      icon: Building2,
      title: "Buildings",
      description: "Commercial, institutional, and high-rise construction projects",
      projects: "250+ Projects"
    },
    {
      icon: Factory,
      title: "Industrial",
      description: "Manufacturing facilities, warehouses, and heavy industrial infrastructure",
      projects: "180+ Projects"
    },
    {
      icon: School,
      title: "Education",
      description: "Universities, colleges, and K-12 educational facilities",
      projects: "120+ Projects"
    },
    {
      icon: Hospital,
      title: "Healthcare",
      description: "Hospitals, medical centers, and research facilities",
      projects: "95+ Projects"
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Shopping centers, mixed-use developments, and commercial spaces",
      projects: "140+ Projects"
    },
    {
      icon: Landmark,
      title: "Civic",
      description: "Government buildings, public infrastructure, and cultural facilities",
      projects: "110+ Projects"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent font-bold text-sm tracking-widest uppercase">
              Our Sectors
            </span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="section-title text-primary mb-4">
            Diverse Portfolio of Excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            From commercial buildings to critical infrastructure, we deliver exceptional results across multiple sectors
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent cursor-pointer bg-card"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {sector.description}
                  </p>
                  <div className="text-sm font-bold text-accent">
                    {sector.projects}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="text-primary hover:text-accent font-bold text-lg group transition-colors duration-300">
            View All Sectors
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporateSectors;
