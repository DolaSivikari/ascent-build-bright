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
        title="About Us"
        description="Learn about Ascent Group Construction - 15+ years of excellence in residential painting and stucco/EIFS services across the GTA. Meet our team and discover our values."
        keywords="about Ascent Group, construction company Mississauga, painting contractor team, company values, sustainability"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Ascent Group</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Building lasting relationships through exceptional craftsmanship, integrity, and commitment to excellence since 2009.
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
                  Founded in 2009, Ascent Group Construction began with a simple mission: deliver exceptional painting and exterior finishing services with uncompromising quality and integrity.
                </p>
                <p>
                  What started as a small team of dedicated craftsmen has grown into one of the GTA's most trusted contractors. We've completed over 500 projects, built lasting relationships with hundreds of satisfied clients, and established a reputation for excellence that speaks for itself.
                </p>
                <p>
                  Today, we continue to uphold the same values that guided us from day one—quality first, transparent communication, unwavering commitment to safety, and complete customer satisfaction.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Referral Rate</div>
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
                <p className="font-bold text-lg mb-2">Our Promise</p>
                <p className="text-sm">
                  Every project completed on time, within budget, and exceeding expectations.
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

        {/* Team */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to bringing your vision to life
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {companyData.team.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <OptimizedImage
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      Expertise:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
