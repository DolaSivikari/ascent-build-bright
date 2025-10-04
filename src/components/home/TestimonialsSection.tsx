import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner, Oakville",
    quote: "Ascent transformed our home's exterior with beautiful stucco work. The team was professional, punctual, and the quality exceeded our expectations.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Property Manager, Mississauga",
    quote: "We've used Ascent for multiple painting projects. Their attention to detail and transparent pricing makes them our go-to contractor.",
    rating: 5,
  },
  {
    name: "Jessica Thompson",
    role: "Homeowner, Burlington",
    quote: "From the initial estimate to final walkthrough, Ascent made our renovation stress-free. Highly recommend their services!",
    rating: 5,
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
              className="p-8 card-hover border-2"
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
              <p className="text-foreground/90 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-primary">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
