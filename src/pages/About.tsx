import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, MessageCircle, Shield, Heart, Leaf } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import companyData from "@/data/company-info.json";
import teamWork from "@/assets/team-work.jpg";

const iconMap: { [key: string]: any } = {
  award: Award,
  "message-circle": MessageCircle,
  shield: Shield,
  heart: Heart,
};

const About = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="About Ascent Group Construction | 15+ Years of Construction Excellence"
        description="Award-winning construction management firm in Toronto. Meet our team of LEED-certified professionals delivering complex projects with COR-certified safety and cutting-edge technology since 2009."
        keywords="about Ascent Group, construction management Toronto, LEED certified, COR certified, construction company team, values, sustainability"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Building Excellence Since 2009</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Inspired by Canada's construction leaders, we combine heritage craftsmanship with modern technology to deliver exceptional projects on time, on budget, and beyond expectations.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009 by John Martinez, Ascent Group Construction began with a vision to combine the trusted practices of Canada's leading builders—Bird Construction's century of trust, PCL's employee-owned collaborative model, and EllisDon's diversified expertise—with modern technology and client-first service.
                </p>
                <p>
                  What started as a small general contractor focused on residential renovations has grown into a trusted construction-management firm delivering complex commercial, institutional, and industrial projects across the Greater Toronto Area. We've completed over 500 projects, achieving zero lost-time incidents and a 98% client satisfaction rating.
                </p>
                <p>
                  Today, we leverage industry-leading platforms like Procore, Autodesk Construction Cloud, and Bluebeam to deliver transparency, collaboration, and efficiency. Our LEED Accredited Professionals and COR-certified safety protocols ensure every project meets the highest standards of quality and sustainability.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">Zero</div>
                  <div className="text-sm text-muted-foreground">Lost-Time Incidents</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <OptimizedImage
                src={teamWork}
                alt="Ascent Group Construction team working on a project"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-lg shadow-xl max-w-xs">
                <p className="font-bold text-lg mb-2">Our Commitment</p>
                <p className="text-sm">
                  Every project delivered on time, on budget, with zero lost-time incidents and exceptional quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted py-16 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision and every project
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {companyData.values.map((value, index) => {
                const IconComponent = iconMap[value.icon];
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>


        {/* Sustainability */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold">Sustainability Commitment</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {companyData.sustainability.commitment}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {companyData.sustainability.initiatives.map((initiative, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{initiative.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {initiative.description}
                    </p>
                    <div className="pt-3 border-t">
                      <p className="text-xs font-semibold text-primary">
                        Impact: {initiative.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold">Safety First, Always</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                {companyData.safety.commitment}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">500+</div>
                <p className="text-sm opacity-90">Projects with Zero Lost-Time Incidents</p>
              </Card>
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">2,000+</div>
                <p className="text-sm opacity-90">Hours of Safety Training Annually</p>
              </Card>
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="text-sm opacity-90">OSHA Compliance Rate</p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {companyData.safety.programs.map((program, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Work with Us?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the Ascent Group difference—quality craftsmanship, transparent communication, and complete satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
