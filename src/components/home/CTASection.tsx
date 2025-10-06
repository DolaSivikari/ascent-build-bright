import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Get a free on-site quote from our expert team. No obligation, just honest advice and transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/estimate">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-[var(--shadow-glow)] hover:scale-105 transition-all">
                Request Free Estimate
              </Button>
            </Link>

            <a href="tel:+19055550100">
              <Button 
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg px-10 py-6 rounded-xl transition-all hover:scale-105"
                aria-label="Call us at (905) 555-0100"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                (905) 555-0100
              </Button>
            </a>
          </div>

          <p className="text-primary-foreground/70 mt-8 text-sm">
            Serving Mississauga and the Greater Toronto Area
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
