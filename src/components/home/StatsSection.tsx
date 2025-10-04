import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Completed", value: 850, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 780, suffix: "+" },
  { label: "Safety Rating", value: 99, suffix: "%" },
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary to-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              {...stat}
              isVisible={isVisible}
              delay={index * 0.1}
            />
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
    <div className="text-center text-primary-foreground">
      <div className="text-5xl md:text-6xl font-bold font-heading mb-2 text-secondary">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base opacity-90 font-medium">{label}</div>
    </div>
  );
};

export default StatsSection;
