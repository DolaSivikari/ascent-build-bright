import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Wrench, Paintbrush, Home } from "lucide-react";

const packages = [
  {
    icon: Wrench,
    name: "Starter — Quick Fix",
    tagline: "Ideal: same-day / under 4 hrs",
    description: "1–2 small repairs (faucet, drywall patch, door adjustment).",
    outcome: "Fast, neat repair.",
    price: "from $199*",
    guarantee: "30-day workmanship guarantee",
    features: [
      "Up to 2 small repairs",
      "Materials included",
      "Same-day availability",
      "Clean-up included"
    ],
    cta: "Request Starter Quote",
    packageId: "starter"
  },
  {
    icon: Paintbrush,
    name: "Home Refresh — One-Room Makeover",
    tagline: "Ideal: next-day",
    description: "One-room paint, trim, or tile repair; minor carpentry.",
    outcome: "Room looks refreshed.",
    price: "from $799*",
    guarantee: "30-day workmanship guarantee",
    features: [
      "Full room preparation",
      "Premium paint & materials",
      "Trim & detail work",
      "Complete clean-up"
    ],
    cta: "Book a Refresh",
    packageId: "refresh",
    featured: true
  },
  {
    icon: Home,
    name: "Weekend Makeover — Mini Project",
    tagline: "Ideal: 1–3 days",
    description: "Small patio, small kitchen update, full room repaint, or interlock repair.",
    outcome: "Noticeable, lasting improvement.",
    price: "from $1,999*",
    guarantee: "1-year workmanship guarantee",
    features: [
      "Project planning included",
      "Multi-day completion",
      "Quality materials",
      "Extended warranty"
    ],
    cta: "Start Weekend Makeover",
    packageId: "weekend"
  }
];

const PackagesSection = () => {
  return (
    <section id="packages" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Starter Packages
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-2">
            Transparent, affordable packages for homeowners. No hidden fees.
          </p>
          <p className="text-sm text-muted-foreground/80">
            *Sample pricing — actual quote provided within 24–48 hours based on your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-lg transition-all duration-300 ${
                  pkg.featured ? 'border-2 border-secondary shadow-md scale-105' : 'border'
                }`}
              >
                {pkg.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary font-bold">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-1">{pkg.name}</CardTitle>
                  <p className="text-xs text-muted-foreground font-medium mb-3">{pkg.tagline}</p>
                  <div className="text-3xl font-heading font-extrabold text-primary mb-1">
                    {pkg.price}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {pkg.guarantee}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    <span className="font-semibold text-foreground">What: </span>
                    {pkg.description}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    <span className="font-semibold text-foreground">Outcome: </span>
                    {pkg.outcome}
                  </CardDescription>

                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">What's Included:</p>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                  <Button 
                    asChild 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Link to={`/estimate?package=${pkg.packageId}`}>
                      {pkg.cta}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-xs"
                  >
                    <Link to="/estimate">
                      Upload Photo for Ballpark
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Need something custom? We handle projects of all sizes.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/estimate">Get Custom Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
