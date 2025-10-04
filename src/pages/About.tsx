import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Users, Shield, TrendingUp } from "lucide-react";
import teamWork from "@/assets/team-work.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering the highest quality workmanship in every project we undertake.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with our clients and giving back to the GTA community.",
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Maintaining the highest safety standards to protect our team and your property.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Embracing modern materials and technology to deliver better results.",
    },
  ];

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "850+", label: "Projects Completed" },
    { value: "780+", label: "Happy Clients" },
    { value: "99%", label: "Safety Rating" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                About Ascent Group
              </h1>
              <p className="text-xl opacity-90">
                Building excellence in residential construction since 2008
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-heading font-bold mb-6 text-primary">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Founded in 2008, Ascent Group Construction began with a simple mission: to provide homeowners in the GTA with exceptional painting and exterior finishing services they can trust.
                  </p>
                  <p>
                    Over the past 15+ years, we've grown from a small team to one of Mississauga's most trusted residential contractors, completing over 850 projects across the Greater Toronto Area.
                  </p>
                  <p>
                    Today, we specialize in residential painting and Stucco/EIFS installation, combining traditional craftsmanship with modern technology to deliver outstanding results on every project.
                  </p>
                </div>
              </div>

              <div>
                <img
                  src={teamWork}
                  alt="Ascent Group Construction team"
                  className="rounded-2xl shadow-[var(--shadow-strong)] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <div className="text-5xl md:text-6xl font-bold font-heading mb-2 text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-90 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-4 text-primary">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <Card
                    key={value.title}
                    className="p-8 card-hover border-2"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: 'slide-up 0.6s ease-out forwards',
                    }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-primary">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title mb-6 text-primary">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To be the most trusted residential construction partner in the GTA by consistently delivering exceptional quality, transparent service, and innovative solutions that transform houses into homes our clients love.
              </p>
            </div>
          </div>
        </section>

        {/* Safety & Community */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="p-8 border-2">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Safety First
                </h3>
                <p className="text-muted-foreground mb-4">
                  Safety isn't just a priority—it's our foundation. We maintain comprehensive safety protocols, regular training, and full insurance coverage to protect our team and your property.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• WSIB registered and fully insured</li>
                  <li>• Regular safety training and certification</li>
                  <li>• 99% safety rating across all projects</li>
                  <li>• Comprehensive liability coverage</li>
                </ul>
              </Card>

              <Card className="p-8 border-2">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Community Focus
                </h3>
                <p className="text-muted-foreground mb-4">
                  We're proud to be part of the GTA community. From supporting local suppliers to participating in community initiatives, we believe in giving back.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Local team serving the GTA since 2008</li>
                  <li>• Supporting local suppliers and trades</li>
                  <li>• Community partnership programs</li>
                  <li>• Environmentally conscious practices</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
