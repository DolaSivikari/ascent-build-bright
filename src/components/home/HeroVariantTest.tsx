import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Shield, Star, MapPin, Award } from 'lucide-react';
import heroPoster from '/assets/hero-poster.jpg';
import { setVariant, getVariant, trackEvent } from '@/lib/analytics';
import { QuoteModal } from '@/components/QuoteModal';
import { checkTestStatus } from '@/lib/ab-test-manager';

interface Variant {
  id: 'A' | 'B' | 'C';
  headline: string;
  subhead: string;
  primaryCTA: string;
  ctaAction: 'modal' | 'scroll' | 'upload';
}

const variants: Variant[] = [
  {
    id: 'A',
    headline: 'Small jobs. Big care.',
    subhead: 'From a leaky faucet to a fresh-painted room or a tidy patio repair — fast, friendly, affordable. Free estimates in 24–48 hours.',
    primaryCTA: 'Get a Fast Quote',
    ctaAction: 'modal'
  },
  {
    id: 'B',
    headline: 'Home jobs from the low hundreds',
    subhead: 'Transparent prices for small repairs, painting and quick installs — no surprises.',
    primaryCTA: 'See Starter Packages',
    ctaAction: 'scroll'
  },
  {
    id: 'C',
    headline: 'Need a fix this week?',
    subhead: 'Same-week bookings for small repairs and quick makeovers. Upload a photo for an immediate ballpark.',
    primaryCTA: 'Upload a Photo — Get Ballpark',
    ctaAction: 'modal'
  }
];

const HeroVariantTest = () => {
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if variant already assigned
    let variantId = getVariant();
    
    if (!variantId) {
      // Randomly assign variant (33/33/34 split)
      const rand = Math.random();
      if (rand < 0.33) variantId = 'A';
      else if (rand < 0.66) variantId = 'B';
      else variantId = 'C';
      
      setVariant(variantId);
    }
    
    const variant = variants.find(v => v.id === variantId);
    setCurrentVariant(variant || variants[0]);
    setIsVisible(true);

    // Check A/B test status
    const checkIfTestShouldStop = async () => {
      if (import.meta.env.VITE_AB_TEST_ENABLED !== 'true') return;
      
      const status = await checkTestStatus();
      
      if (status.shouldStop) {
        console.warn('⚠️ A/B Test should stop:', status.reason, status);
      }
    };

    checkIfTestShouldStop();

    // Parallax scroll effect
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentVariant) return null;

  const handlePrimaryCTA = () => {
    trackEvent('cta_get_fast_quote_click');
    
    switch (currentVariant.ctaAction) {
      case 'modal':
      case 'upload':
        setShowModal(true);
        break;
      case 'scroll':
        trackEvent('cta_see_packages_click');
        document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const handleSecondaryCTA = () => {
    trackEvent('cta_see_packages_click');
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Hero Image with Parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img
            src={heroPoster}
            alt="Ascent Group crew member providing friendly home repair consultation in Toronto living room"
            className="w-full h-[120%] object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[hsl(var(--deep-blue))]/90" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Trust Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white">Small jobs welcome • Typical homeowner jobs start from affordable packages • 30-day workmanship guarantee</span>
            </div>

            {/* Main Headline - Variant Specific */}
            <h1
              className={`font-heading font-extrabold text-white mb-6 transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              {currentVariant.headline}
            </h1>

            {/* Subheadline - Variant Specific */}
            <p
              className={`max-w-2xl mx-auto text-lg md:text-xl text-white/95 mb-8 transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {currentVariant.subhead}
            </p>

            {/* CTA Buttons - Variant Specific */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-600 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                onClick={handlePrimaryCTA}
                size="lg"
                className="bg-secondary text-primary hover:bg-secondary/90 font-bold text-base px-8 py-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
              >
                {currentVariant.primaryCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleSecondaryCTA}
                size="lg"
                variant="outline"
                className="bg-white/5 border-2 border-white/30 text-white hover:bg-white/15 font-semibold text-base px-8 py-6 rounded-lg backdrop-blur-sm"
              >
                See Starter Packages
              </Button>
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-secondary fill-secondary" />
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary" />
                <span className="font-medium">WSIB Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="font-medium">Serving GTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <QuoteModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};

export default HeroVariantTest;
