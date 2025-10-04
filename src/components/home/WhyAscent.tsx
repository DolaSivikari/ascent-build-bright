import { Award, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "Premium materials and expert techniques ensure lasting results that exceed expectations.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Local team dedicated to building trust and relationships throughout the GTA.",
  },
  {
    icon: Sparkles,
    title: "Tech-Led Innovation",
    description: "Modern scheduling, transparent estimates, and cutting-edge materials for your project.",
  },
];

const WhyAscent = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4 text-primary">Why Choose Ascent?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of working with a construction partner who values excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'slide-up 0.6s ease-out forwards',
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-glow)]">
                <value.icon className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                {value.title}
              </h3>
              <p className="text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAscent;
