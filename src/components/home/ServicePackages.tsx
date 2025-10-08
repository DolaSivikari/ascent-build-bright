import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Paintbrush, Hammer, CheckCircle2 } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const packages = [
  {
    id: "starter",
    icon: Wrench,
    title: "Starter — Quick Fix",
    duration: "Same-day to under 4 hours",
    includes: [
      "1–2 small repairs",
      "Faucet, drywall patch, door adjustment, or caulking",
      "Fast, neat completion",
    ],
    outcome: "Fast, neat repair",
    price: "from $199",
    guarantee: "30-day workmanship guarantee",
    note: "Sample pricing — Call for exact quote",
  },
  {
    id: "refresh",
    icon: Paintbrush,
    title: "Home Refresh — One-Room Makeover",
    duration: "Next-day to 2 days",
    includes: [
      "One-room interior paint",
      "Trim work or tile repair",
      "Minor carpentry",
    ],
    outcome: "Room looks refreshed and renewed",
    price: "from $799",
    guarantee: "30-day workmanship guarantee",
    note: "Sample pricing — Call for exact quote",
  },
  {
    id: "weekend",
    icon: Hammer,
    title: "Weekend Makeover — Mini Project",
    duration: "1–3 days",
    includes: [
      "Small patio installation",
      "Small kitchen update",
      "Full-room repaint",
      "Interlock/hardscape repair",
    ],
    outcome: "Noticeable, lasting improvement",
    price: "from $1,999",
    guarantee: "1-year workmanship guarantee",
    note: "Sample pricing — Call for exact quote",
  },
];

const ServicePackages = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageClick = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowQuoteModal(true);
  };

  return (
    <>
      <section id="packages-section" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent pricing for homeowners. No surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animation: 'fade-in 0.6s ease-out forwards',
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <pkg.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  {pkg.title}
                </h3>

                {/* Duration */}
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.duration}
                </p>

                {/* What's Included */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">What's included:</p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-1">Outcome:</p>
                  <p className="text-sm text-muted-foreground">{pkg.outcome}</p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">{pkg.price}</div>
                  <p className="text-xs text-muted-foreground">{pkg.note}</p>
                </div>

                {/* Guarantee */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-xs font-medium text-success">{pkg.guarantee}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => handlePackageClick(pkg.id)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold"
                >
                  Request {pkg.title.split("—")[0].trim()} Quote
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <QuoteModal
        open={showQuoteModal}
        onOpenChange={setShowQuoteModal}
        preselectedPackage={selectedPackage}
      />
    </>
  );
};

export default ServicePackages;
