import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyAscent from "@/components/home/WhyAscent";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <StatsSection />
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
