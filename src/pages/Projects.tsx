import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import paintingProject from "@/assets/painting-project.jpg";
import stuccoDetail from "@/assets/stucco-detail.jpg";
import teamWork from "@/assets/team-work.jpg";
import heroHome from "@/assets/hero-home.jpg";
import { Search, Filter } from "lucide-react";

const projects = [
  {
    title: "Maple Avenue Residence",
    location: "Mississauga, ON",
    category: "Residential Painting",
    image: paintingProject,
    description: "Complete exterior transformation with premium weather-resistant finishes",
    tags: ["Exterior", "Residential", "Premium"],
    year: "2024",
  },
  {
    title: "Cedar Townhouse Complex",
    location: "Oakville, ON",
    category: "Stucco/EIFS",
    image: stuccoDetail,
    description: "Full EIFS system installation with moisture remediation",
    tags: ["Stucco", "Commercial", "Repair"],
    year: "2024",
  },
  {
    title: "Hillcrest Interior Refresh",
    location: "Toronto, ON",
    category: "Residential Painting",
    image: teamWork,
    description: "Modern interior color palette with specialty accent walls",
    tags: ["Interior", "Residential", "Color Consultation"],
    year: "2023",
  },
  {
    title: "Lakeside Cottage Renovation",
    location: "Mississauga, ON",
    category: "Stucco/EIFS",
    image: heroHome,
    description: "Marine-grade finishes for waterfront durability",
    tags: ["Exterior", "EIFS", "Renovation"],
    year: "2023",
  },
  {
    title: "Downtown Condo Complex",
    location: "Toronto, ON",
    category: "Residential Painting",
    image: paintingProject,
    description: "Multi-unit interior painting with accelerated timeline",
    tags: ["Interior", "Commercial", "Fast-track"],
    year: "2024",
  },
  {
    title: "Heritage Home Restoration",
    location: "Brampton, ON",
    category: "Stucco/EIFS",
    image: stuccoDetail,
    description: "Period-appropriate stucco restoration with modern performance",
    tags: ["Restoration", "Residential", "Heritage"],
    year: "2023",
  },
];

const categories = ["All Projects", "Residential Painting", "Stucco/EIFS"];
const years = ["All Years", "2024", "2023"];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "All Projects") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedYear !== "All Years") {
      filtered = filtered.filter(p => p.year === selectedYear);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, selectedYear, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Projects Portfolio"
        description="View our completed painting and Stucco/EIFS projects across the GTA. Residential transformations showcasing quality craftsmanship and attention to detail."
        keywords="construction projects, painting portfolio, stucco projects, before and after, completed projects Mississauga"
      />
      <Header />
      <main className="flex-1" role="main">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary/95 to-slate-900 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="project-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="currentColor" className="text-secondary"/>
                  <path d="M 60 0 L 0 60" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#project-grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <div className="inline-block mb-4 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full animate-fade-in">
                <span className="text-secondary font-bold text-sm tracking-wider uppercase">
                  Our Portfolio
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-slide-up">
                Recent <span className="text-secondary">Projects</span>
              </h1>
              <p className="text-xl opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Explore our portfolio of exceptional construction and renovation projects across the GTA
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Filters */}
        <section className="py-8 bg-background sticky top-20 z-40 border-b border-border shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-muted/50 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Year Filter */}
              <div className="flex gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border-2 ${
                      selectedYear === year
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing <span className="font-bold text-primary">{filteredProjects.length}</span> of {projects.length} projects
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card
                    key={project.title}
                    className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-card"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: isVisible ? 'slide-up 0.6s ease-out forwards' : 'none',
                    }}
                  >
                    <div className="relative overflow-hidden h-72">
                      <OptimizedImage
                        src={project.image}
                        alt={`${project.title} - ${project.category} project in ${project.location} - ${project.description}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-secondary text-primary font-bold shadow-lg px-3 py-1">
                          {project.category}
                        </Badge>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-2 font-bold">
                          {project.year}
                        </Badge>
                      </div>

                      {/* Hover Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <Button className="btn-hero w-full shadow-xl">
                          View Case Study
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {project.location}
                      </p>
                      <p className="text-foreground/80 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to Start <span className="text-secondary">Your Project?</span>
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Let's discuss how we can transform your space with our expertise and attention to detail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero text-lg px-10 py-6 shadow-2xl shadow-secondary/30">
                  Request Free Estimate
                </Button>
                <Button className="text-lg px-10 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
