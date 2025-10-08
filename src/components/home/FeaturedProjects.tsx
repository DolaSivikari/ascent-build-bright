import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/OptimizedImage";
import projectsData from "@/data/projects-expanded.json";

const FeaturedProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projectsData.projects.filter(p => p.featured).slice(0, 3);

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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering exceptional results across diverse sectors
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Project Image */}
              <div className="relative h-72 overflow-hidden bg-muted">
                <OptimizedImage
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Navy overlay on hover */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white w-full">
                    <div className="flex items-center gap-3 mb-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </div>
                
                {/* Yellow Accent Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
              </div>

              <CardContent className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-heading font-bold text-xl mb-3 text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* View Project Link */}
                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors group/link"
                >
                  View Project Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="pcl-outline"
            size="lg"
          >
            <Link to="/projects">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
