import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Target, Clock, CheckCircle } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "16 Years of Excellence",
    description: "Delivering exceptional quality since 2009 with proven expertise"
  },
  {
    icon: Target,
    title: "500+ Projects Completed",
    description: "Successful residential and commercial transformations"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full WSIB compliance and comprehensive coverage"
  },
  {
    icon: Users,
    title: "Certified Installers",
    description: "Factory-trained professionals with industry certifications"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% of projects completed on schedule"
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "Extended warranties on all materials and workmanship"
  }
];

const CredentialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Label + Question Format Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Trust & Credentials</span>
          </div>
          <h2 className="section-title mb-4 text-primary">What Sets Us Apart?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence is backed by credentials, certifications, and a proven track record
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {credentials.map((credential, index) => (
            <Card
              key={credential.title}
              className={`group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/30 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                    <credential.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg mb-2 text-primary group-hover:text-primary/80 transition-colors">
                      {credential.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {credential.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges Row */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="px-6 py-3 bg-muted rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">A+</div>
              <div className="text-xs text-muted-foreground uppercase">BBB Rating</div>
            </div>
            <div className="px-6 py-3 bg-muted rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-xs text-muted-foreground uppercase">Customer Rating</div>
            </div>
            <div className="px-6 py-3 bg-muted rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">99%</div>
              <div className="text-xs text-muted-foreground uppercase">Safety Record</div>
            </div>
            <div className="px-6 py-3 bg-muted rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">$5M</div>
              <div className="text-xs text-muted-foreground uppercase">Liability Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
