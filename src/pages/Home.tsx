import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import NewHeroSection from "@/components/home/NewHeroSection";
import ServicePackages from "@/components/home/ServicePackages";
import FAQ from "@/components/home/FAQ";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { organizationSchema } from "@/utils/structured-data";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Home"
        description="Ascent Group Construction — Small jobs. Big care. Fast, friendly, affordable repairs, painting, tiling, and more for homeowners across the GTA. Free estimates in 24-48 hours."
        keywords="home repairs, painting, plumbing, tiling, landscaping, GTA, Toronto, Mississauga, homeowner services, affordable contractor"
        structuredData={organizationSchema}
      />
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        <NewHeroSection />
        <ServicePackages />
        <FAQ />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
