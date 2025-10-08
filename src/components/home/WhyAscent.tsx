import { Award, Shield, Cpu, Handshake, Leaf, Lightbulb } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence in Execution", description: "Every project receives the same commitment to quality, precision, and craftsmanship." },
  { icon: Shield, title: "Safety First, Always", description: "500+ projects with zero lost-time incidents. COR-certified safety protocols on every site." },
  { icon: Cpu, title: "Innovation & Technology", description: "Autodesk Construction Cloud, Bluebeam, and BIM coordination reduce rework and improve accuracy." },
  { icon: Handshake, title: "Client Partnership", description: "Collaborative approach with clients, architects, and trades ensures your vision becomes reality." },
  { icon: Leaf, title: "Sustainable Building", description: "LEED-certified expertise and sustainable practices deliver long-term value." },
  { icon: Lightbulb, title: "Transparent Communication", description: "Real-time insights via Procore and shared dashboards—no surprises, just collaboration." }
];

const WhyAscent = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Label + Question Format */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Ascent Advantage</span>
          </div>
          <h2 className="section-title mb-4 text-primary">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of working with a construction partner who values excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
