import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, Target } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+", icon: TrendingUp },
  { label: "Years of Excellence", value: 16, suffix: "", icon: Award },
  { label: "Happy Clients", value: 480, suffix: "+", icon: Users },
  { label: "Safety Rating", value: 99, suffix: "%", icon: Target },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-br from-primary via-primary/95 to-slate-900 relative overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            currentColor 50px,
            currentColor 51px
          )`,
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className={`bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/20 hover:border-secondary/50 transition-all duration-500 p-8 text-center group hover:bg-primary-foreground/15 hover:scale-105 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors group-hover:rotate-12 duration-500">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <StatCounter
                {...stat}
                isVisible={isVisible}
                delay={index * 0.1}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({
  label,
  value,
  suffix,
  isVisible,
  delay,
}: {
  label: string;
  value: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return (
    <>
      <div className="text-5xl md:text-6xl font-bold font-heading mb-2 text-secondary group-hover:scale-110 transition-transform duration-300">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-primary-foreground/90 font-medium leading-tight">
        {label}
      </div>
    </>
  );
};

export default StatsSection;
