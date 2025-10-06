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
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Work</span>
          </div>
          <h2 className="section-title mb-4 text-primary">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful transformations across the GTA
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-xl ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <OptimizedImage
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-primary text-xs font-bold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Title */}
                <h3 className="font-heading font-bold text-xl mb-3 text-primary group-hover:text-primary/80 transition-colors">
                  {project.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {project.shortDescription}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.services.slice(0, 2).map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-muted text-xs rounded border border-border"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/link"
                >
                  View Project Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
