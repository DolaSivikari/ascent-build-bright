import { Award, Shield, Users, TrendingUp } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Award,
      value: "15+",
      label: "Years in Business",
      description: "Serving the GTA since 2009"
    },
    {
      icon: Users,
      value: "500+",
      label: "Happy Clients",
      description: "Trusted by homeowners across Ontario"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Satisfaction Guarantee",
      description: "We stand behind our work"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Referral Rate",
      description: "Clients recommend us to friends"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {badge.value}
              </div>
              <div className="text-lg font-semibold mb-1">
                {badge.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Fully Insured & Licensed</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">CertainTeed Certified</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Benjamin Moore Authorized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
