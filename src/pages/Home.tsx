import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import HeroSection from "@/components/home/HeroSection";
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
        title="Toronto's Premier General Contractor"
        description="Affordable residential and commercial construction across the GTA. WSIB-certified, licensed, and insured. Free quotes in 24 hours. From small renovations to full builds."
        keywords="Toronto contractor, GTA construction, residential renovation, commercial builds, affordable contractor, WSIB certified, licensed contractor Toronto"
        structuredData={organizationSchema}
      />
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
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
