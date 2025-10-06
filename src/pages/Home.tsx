import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import CredentialsSection from "@/components/home/CredentialsSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyAscent from "@/components/home/WhyAscent";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import ClientLogoCarousel from "@/components/home/ClientLogoCarousel";
import CertificationBadges from "@/components/home/CertificationBadges";
import { organizationSchema } from "@/utils/structured-data";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Home"
        description="Ascent Group Construction delivers expert residential painting and Stucco/EIFS services across the GTA. Request a free estimate or view our portfolio."
        keywords="residential painting, stucco, EIFS, construction, Mississauga, GTA, exterior painting, interior painting"
        structuredData={organizationSchema}
      />
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <TrustBadges />
        <ClientLogoCarousel />
        <CredentialsSection />
        <CertificationBadges />
        <ServicesPreview />
        <WhyAscent />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
