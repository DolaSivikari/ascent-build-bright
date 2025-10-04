import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projectsData from "@/data/projects.json";

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredProjects = filter === "all" 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Projects"
        description="View our portfolio of completed painting and stucco/EIFS projects across the GTA. Quality craftsmanship delivered on time and on budget."
        keywords="construction projects, painting portfolio, stucco projects, EIFS installations, GTA contractor"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Project Portfolio</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Explore our completed projects showcasing exceptional craftsmanship, 
              attention to detail, and client satisfaction across the GTA.
            </p>
          </div>
        </section>

        {/* Filter and Projects Grid */}
        <section className="container mx-auto px-4 py-16">
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="Residential Painting">Painting</TabsTrigger>
              <TabsTrigger value="Stucco/EIFS">Stucco/EIFS</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-0">
              {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      category={project.category}
                      location={project.location}
                      year={project.year}
                      thumbnail={project.thumbnail}
                      shortDescription={project.shortDescription}
                      services={project.services}
                      featured={project.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing list of satisfied clients. Get your free, no-obligation estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-hero">
                <a href="/estimate">Get Free Estimate</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="btn-outline-hero">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
