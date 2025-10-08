import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted partnerships delivering exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'slide-up 0.6s ease-out forwards',
              }}
            >
              <CardContent className="p-8">
                {/* Large Yellow Quote Mark */}
                <div className="text-6xl text-secondary font-serif leading-none mb-4">"</div>
                
                <p className="text-foreground mb-6 text-lg leading-relaxed">
                  {testimonial.quote}
                </p>
                
                <div className="pt-6 border-t border-border">
                  <div className="font-bold text-primary text-lg mb-1">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.project}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
