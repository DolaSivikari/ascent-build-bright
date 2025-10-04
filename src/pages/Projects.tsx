import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import paintingProject from "@/assets/painting-project.jpg";
import stuccoDetail from "@/assets/stucco-detail.jpg";
import teamWork from "@/assets/team-work.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Modern Home Exterior Painting",
      location: "Oakville, ON",
      category: "Painting",
      image: paintingProject,
      description: "Complete exterior painting transformation with premium finishes and color consultation.",
      tags: ["Exterior", "Premium", "Residential"],
    },
    {
      title: "Stucco Installation & Finishing",
      location: "Mississauga, ON",
      category: "Stucco",
      image: stuccoDetail,
      description: "Full EIFS installation with custom texture and superior insulation for energy efficiency.",
      tags: ["EIFS", "Energy Efficient", "New Construction"],
    },
    {
      title: "Heritage Home Restoration",
      location: "Burlington, ON",
      category: "Painting",
      image: teamWork,
      description: "Careful restoration of historic home exterior with period-appropriate colors and techniques.",
      tags: ["Restoration", "Heritage", "Specialty"],
    },
    {
      title: "Multi-Unit Residential Complex",
      location: "Toronto, ON",
      category: "Stucco",
      image: paintingProject,
      description: "Large-scale stucco application for multi-unit residential development.",
      tags: ["Commercial", "Large Scale", "EIFS"],
    },
    {
      title: "Luxury Estate Interior",
      location: "Oakville, ON",
      category: "Painting",
      image: stuccoDetail,
      description: "Premium interior painting with custom finishes throughout a luxury estate.",
      tags: ["Interior", "Luxury", "Custom"],
    },
    {
      title: "Waterfront Property Exterior",
      location: "Port Credit, ON",
      category: "Painting",
      image: teamWork,
      description: "Weather-resistant exterior painting for waterfront property with specialized coatings.",
      tags: ["Exterior", "Waterfront", "Specialty"],
    },
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
                Our Portfolio
              </h1>
              <p className="text-xl opacity-90">
                Explore our recent projects across the Greater Toronto Area
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className="overflow-hidden card-hover border-2 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: 'slide-up 0.6s ease-out forwards',
                  }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.category} project in ${project.location} - ${project.description}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-primary font-semibold">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      📍 {project.location}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Let's Start Your Project
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Ready to transform your home? Get a free estimate today.
              </p>
              <a href="/estimate">
                <button className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-[var(--shadow-glow)] hover:scale-105 transition-all">
                  Request Free Estimate
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
