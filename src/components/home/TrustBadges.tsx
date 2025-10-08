import { Award, Shield, Users, TrendingUp } from "lucide-react";

const TrustBadges = () => {
  const stats = [
    { icon: Award, value: "500+", label: "Projects Completed", description: "Across commercial, institutional, and industrial sectors" },
    { icon: Shield, value: "Zero", label: "Lost-Time Incidents", description: "Industry-leading safety record with COR certification" },
    { icon: Users, value: "98%", label: "Client Satisfaction", description: "Repeat clients and referrals drive our growth" },
    { icon: TrendingUp, value: "15+", label: "Years of Excellence", description: "Delivering trusted construction services since 2009" }
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group" style={{ animationDelay: `${index * 100}ms`, animation: 'fade-in 0.6s ease-out forwards' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-5xl font-bold mb-2 text-secondary group-hover:scale-105 transition-transform">{stat.value}</div>
              <div className="text-lg font-semibold mb-2 text-white">{stat.label}</div>
              <p className="text-sm text-white/80 max-w-xs mx-auto">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
