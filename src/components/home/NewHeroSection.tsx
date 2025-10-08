import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Shield, MapPin } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const NewHeroSection = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_get_fast_quote_click');
    }
    setShowQuoteModal(true);
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'phone_click');
    }
  };

  const scrollToPackages = () => {
    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Tagline Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white">Licensed & Insured • GTA's Trusted Partner</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-heading font-extrabold text-white mb-6 transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              Small jobs. Big care.
            </h1>

            {/* Subheadline */}
            <p
              className={`max-w-3xl mx-auto text-xl md:text-2xl text-white/95 mb-8 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              From a leaky faucet to a fresh-painted room or a tidy patio repair — fast, friendly, affordable. Free estimates in 24–48 hours.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                onClick={handleCTAClick}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 py-7 rounded-lg shadow-2xl hover:shadow-secondary/50 transition-all duration-300 hover:scale-105"
              >
                Get a Fast Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToPackages}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-lg transition-all duration-300"
              >
                See Starter Packages
              </Button>
            </div>

            {/* Trust Strip */}
            <div
              className={`inline-flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white/95 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-sm font-medium">Small jobs welcome</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="text-sm font-medium">Packages from $199</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="text-sm font-medium">30-day guarantee</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="text-sm font-medium">4.8★ rated</span>
            </div>

            {/* Contact Info */}
            <div
              className={`flex flex-wrap justify-center gap-6 text-white/90 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="tel:9055550100"
                onClick={handlePhoneClick}
                className="flex items-center gap-2 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-semibold">(905) 555-0100</span>
              </a>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Serving GTA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        open={showQuoteModal}
        onOpenChange={setShowQuoteModal}
      />
    </>
  );
};

export default NewHeroSection;
