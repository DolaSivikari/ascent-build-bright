import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import CorporateHeroSection from "@/components/home/CorporateHeroSection";
import CorporateSectors from "@/components/home/CorporateSectors";
import CorporateCapabilities from "@/components/home/CorporateCapabilities";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { organizationSchema } from "@/utils/structured-data";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Building Excellence Across Canada | Ascent Group Construction"
        description="Ascent Group Construction — Leading construction company delivering complex commercial, industrial, and institutional projects with precision, safety, and innovation."
        keywords="construction company, commercial construction, industrial construction, general contractor, construction management, project management, Canada construction"
        structuredData={organizationSchema}
      />
      <SkipToContent />
      <Header />
      <main id="main-content" role="main">
        <CorporateHeroSection />
        <CorporateSectors />
        <CorporateCapabilities />
        <FeaturedProjects />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
