import { Building2, Factory, GraduationCap, Heart, ShoppingBag, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sectors = [
  {
    icon: Building2,
    title: "Buildings",
    description: "Office towers, commercial complexes, and mixed-use developments",
    projects: 2400,
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Manufacturing facilities, warehouses, and distribution centers",
    projects: 1800,
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Schools, universities, and research facilities",
    projects: 950,
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Hospitals, clinics, and medical research centers",
    projects: 720,
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Shopping centers, restaurants, and hospitality venues",
    projects: 1200,
  },
  {
    icon: Landmark,
    title: "Civic",
    description: "Government buildings, infrastructure, and public facilities",
    projects: 530,
  },
];

const CorporateSectors = () => {

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Diverse Sectors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering excellence across multiple industries with proven expertise
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {sectors.map((sector, index) => (
            <Card
              key={sector.title}
              className="group overflow-hidden border hover:border-secondary transition-all duration-300 hover:shadow-lg bg-white"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'fade-in 0.6s ease-out forwards',
              }}
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/5 rounded flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                  <sector.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {sector.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {sector.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-secondary">{sector.projects.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">projects completed</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/services">
            <Button variant="pcl-outline" size="lg" className="text-base px-10">
              View All Sectors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CorporateSectors;
