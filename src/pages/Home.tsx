import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";

// Conditionally load hero based on env variable
const HeroSection = import.meta.env.VITE_AB_TEST_ENABLED === 'true' 
  ? lazy(() => import('@/components/home/HeroVariantTest'))
  : lazy(() => import('@/components/home/HeroSection'));
import TrustBadges from "@/components/home/TrustBadges";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyAscent from "@/components/home/WhyAscent";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FAQSection from "@/components/home/FAQSection";
import { organizationSchema } from "@/utils/structured-data";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Construction Management & Design-Build | Ascent Group Construction"
        description="Award-winning construction management firm in Toronto. From preconstruction to project delivery, we combine Canadian craftsmanship with cutting-edge technology. LEED-certified, COR-certified, 500+ projects completed."
        keywords="construction management Toronto, design-build contractor, general contractor GTA, commercial construction, LEED certified, construction technology, Procore, BIM coordination, preconstruction services"
        structuredData={organizationSchema}
      />
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        <Suspense fallback={<div className="h-screen bg-primary" />}>
          <HeroSection />
        </Suspense>
        <TrustBadges />
        <ServicesPreview />
        <FeaturedProjects />
        <WhyAscent />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
