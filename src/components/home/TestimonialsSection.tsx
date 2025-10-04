import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    location: "Toronto, ON",
    project: "Condo Interior Painting",
    quote: "Ascent Group exceeded all expectations. Their attention to detail and professionalism made the entire process stress-free. The transformation is stunning!",
    rating: 5,
    initials: "SM"
  },
  {
    name: "Robert & Linda K.",
    role: "Heritage Homeowners",
    location: "Mississauga, ON",
    project: "EIFS Restoration",
    quote: "They perfectly balanced preserving our home's character with modern performance. The craftsmanship is outstanding.",
    rating: 5,
    initials: "RK"
  },
  {
    name: "Michael Johnson",
    role: "Homeowner",
    location: "Oakville, ON",
    project: "Exterior Repaint",
    quote: "After our DIY disaster, Ascent Group rescued our home. Their expertise and quality are unmatched. Completed before winter!",
    rating: 5,
    initials: "MJ"
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
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.project}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
