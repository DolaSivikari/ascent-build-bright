import { CheckCircle2, Wrench, HardHat, Cog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    icon: HardHat,
    title: "Project Management",
    description: "End-to-end project delivery with proven methodologies",
    features: [
      "Design-Build Services",
      "Construction Management",
      "Project Scheduling",
      "Cost Control",
    ],
  },
  {
    icon: Wrench,
    title: "Construction Services",
    description: "Comprehensive construction solutions for complex projects",
    features: [
      "General Contracting",
      "Civil Works",
      "Structural Systems",
      "Quality Assurance",
    ],
  },
  {
    icon: Cog,
    title: "Specialized Solutions",
    description: "Advanced capabilities for unique project requirements",
    features: [
      "Advanced Manufacturing",
      "Sustainable Building",
      "Technology Integration",
      "Post-Construction Support",
    ],
  },
];

const CorporateCapabilities = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(210 45% 22%) 0, hsl(210 45% 22%) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px',
        }} />
      </div>

      {/* Diagonal Yellow Stripe */}
      <div 
        className="absolute top-0 left-0 w-full h-32 bg-secondary transform -skew-y-2 origin-top-left -mt-16"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Comprehensive Construction Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Integrated services delivering value from concept to completion
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

        {/* Stats Bar */}
        <div className="bg-primary rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Safety Record", value: "1.2M+", suffix: "safe hours" },
              { label: "On-Time Delivery", value: "98%", suffix: "completion rate" },
              { label: "Skilled Workers", value: "5,500+", suffix: "professionals" },
              { label: "Industry Awards", value: "150+", suffix: "recognitions" },
            ].map((stat) => (
              <div key={stat.label} className="p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateCapabilities;
