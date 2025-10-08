import { CheckCircle2, Wrench, HardHat, Cog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    icon: HardHat,
    {
      title: "Project Management",
      description: "Comprehensive oversight from conception to completion",
      features: [
        "Strategic planning and scheduling",
        "Budget management and cost control",
        "Quality assurance programs",
        "Risk mitigation strategies"
      ]
    },
    {
      title: "Construction Services",
      description: "Full-spectrum construction capabilities",
      features: [
        "General contracting",
        "Design-build solutions",
        "Construction management",
        "Program management"
      ]
    },
    {
      title: "Specialized Solutions",
      description: "Advanced technical expertise",
      features: [
        "Building information modeling (BIM)",
        "Sustainable construction practices",
        "Advanced safety protocols",
        "Technology integration"
      ]
    }
  ];

const CorporateCapabilities = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent font-bold text-sm tracking-widest uppercase">
              Our Capabilities
            </span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="section-title mb-4">
            Comprehensive Construction Solutions
          </h2>
          <p className="text-xl text-white/80">
            Delivering complex projects with proven expertise and innovation
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {capabilities.map((capability, index) => (
            <Card
              key={capability.title}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
                animation: 'scale-in 0.5s ease-out forwards',
              }}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center mb-6">
                  <capability.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {capability.description}
                </p>
                <ul className="space-y-3">
                  {capability.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-sm text-white/70">Safety Record</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-sm text-white/70">On-Time Delivery</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">1,200+</div>
            <div className="text-sm text-white/70">Skilled Workers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">50+</div>
            <div className="text-sm text-white/70">Industry Awards</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateCapabilities;
