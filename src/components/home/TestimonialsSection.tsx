import { Card } from "@/components/ui/card";
import { Star, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    location: "Toronto, ON",
    project: "Condo Interior Painting",
    projectLink: "/projects/modern-downtown-condo",
    quote: "Ascent Group exceeded all expectations. Their attention to detail and professionalism made the entire process stress-free. The transformation is stunning!",
    rating: 5,
    initials: "SM",
    date: "October 2024"
  },
  {
    name: "Robert & Linda K.",
    role: "Heritage Homeowners",
    location: "Mississauga, ON",
    project: "EIFS Restoration",
    projectLink: "/projects/heritage-home-eifs",
    quote: "They perfectly balanced preserving our home's character with modern performance. The craftsmanship is outstanding.",
    rating: 5,
    initials: "RK",
    date: "September 2024"
  },
  {
    name: "Michael Johnson",
    role: "Homeowner",
    location: "Oakville, ON",
    project: "Exterior Repaint",
    projectLink: "/projects/oakville-family-home",
    quote: "After our DIY disaster, Ascent Group rescued our home. Their expertise and quality are unmatched. Completed before winter!",
    rating: 5,
    initials: "MJ",
    date: "August 2024"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4 text-primary">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-8 card-hover border-2 hover:shadow-[--shadow-medium]"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'slide-up 0.6s ease-out forwards',
              }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>

                <Link
                  to={testimonial.projectLink}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View Project
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
