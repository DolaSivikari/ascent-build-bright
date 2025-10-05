import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import projectsData from "@/data/projects-expanded.json";

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTags = ["all", "Residential", "Commercial", "Renovation", "GTA"];

  const toggleTag = (tag: string) => {
    if (tag === "all") {
      setSelectedTags(["all"]);
    } else {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags.filter((t) => t !== "all"), tag];
      setSelectedTags(newTags.length === 0 ? ["all"] : newTags);
    }
  };

  const filteredProjects = selectedTags.includes("all")
    ? projectsData.projects
    : projectsData.projects.filter((project: any) =>
        project.tags?.some((tag: string) => selectedTags.includes(tag))
      );

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
        <section className="bg-gradient-to-br from-primary via-primary to-[hsl(var(--deep-blue))] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-6">
              Our Project Portfolio
            </h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Explore our completed projects showcasing exceptional craftsmanship,
              attention to detail, and client satisfaction across the GTA.
            </p>
          </div>
        </section>

        {/* Filter Tags */}
        <section className="container mx-auto px-4 py-12 border-b border-border">
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                onClick={() => toggleTag(tag)}
              >
                {tag === "all" ? "All Projects" : tag}
              </Badge>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 py-16">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: any, index: number) => (
                <div
                  key={project.id}
                  className="animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleProjectClick(project)}
                >
                  <ProjectCard
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching the selected filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedTags(["all"])}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing list of satisfied clients. Get your free, no-obligation
              estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/estimate">Get Free Estimate</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}

      <Footer />
    </div>
  );
};

export default Projects;
