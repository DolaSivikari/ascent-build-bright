import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import teamImage from "@/assets/team-work.jpg";
import paintingProject from "@/assets/painting-project.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* First Row: Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={teamImage} 
              alt="Ascent Group construction team at work"
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-block mb-2 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">About Ascent</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              Who We Are?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ascent Group Construction boasts over 20 years of experience in the construction industry, specializing in a wide array of full-service building envelope restoration services. We are the GTA's single source for total restoration, rehabilitation, and preservation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We perform work on a range of projects from residential painting to commercial stucco/EIFS applications for commercial, industrial, institutional, high-rise and low-rise residential applications.
            </p>
            <Link to="/about">
              <Button size="lg" className="group mt-4">
                Discover More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Second Row: Text Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-block mb-2 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              What Drives Us?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are committed to providing quality service to the community. We believe the recipe for success includes a good reputation combined with reliable service. Our employees share a passion for quality craftsmanship and progressive design that characterizes each project we complete.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Ascent, we stand ready to assist you with the challenging building envelope restoration issues you may face. Whether it is an immediate issue or the development of future budgets, we can provide you with our expertise.
            </p>
            <Link to="/about">
              <Button size="lg" variant="outline" className="group mt-4">
                Learn About Our Process
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="relative group overflow-hidden rounded-2xl shadow-2xl order-1 lg:order-2">
            <img 
              src={paintingProject} 
              alt="Quality painting project showcase"
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
