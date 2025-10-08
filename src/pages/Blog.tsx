import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [animatedCards, setAnimatedCards] = React.useState<Set<number>>(new Set());
  
  // Fetch articles from Supabase
  const { data, isLoading, error } = useArticles({
    page,
    limit: 50,
    category: filter === "all" ? undefined : filter,
  });

  const articles = data?.articles || [];
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(articles.map(a => a.category)))];
  
  // Limit featured posts to top 3
  const featuredPosts = articles.filter(a => a.featured).slice(0, 3);

  // Apply client-side filtering
  const filteredPosts = filter === "all" 
    ? articles 
    : articles.filter(a => a.category === filter);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setAnimatedCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.blog-card-animate').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Articles</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Construction Insights & Industry News | Ascent Group Blog"
        description="Expert insights on construction management, sustainable building, technology trends, safety best practices, and industry regulations from LEED-certified professionals."
        keywords="construction blog, construction management insights, LEED certification, BIM coordination, construction safety, building regulations"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Industry Insights & Expertise
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Expert perspectives on construction management, technology, sustainability, and best practices from our team of LEED-certified professionals.
              </p>
              <a href="#newsletter">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 hover:scale-105 transition-all">
                  Subscribe to Newsletter
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 py-16 border-b">
            <h2 className="text-3xl font-heading font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((article, index) => {
                const post = {
                  id: article.id,
                  title: article.title,
                  slug: article.slug,
                  author: article.author,
                  date: article.published_at,
                  category: article.category,
                  excerpt: article.excerpt,
                  featured: article.featured,
                  image: article.featured_image_url || '',
                  readTime: article.read_time || '5 min read',
                  content: article.content,
                };
                
                return (
                  <div
                    key={article.id}
                    className="blog-card-animate transition-all duration-600 opacity-100"
                    data-index={index}
                  >
                    <BlogCard post={post} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Posts with Filter */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-heading font-bold mb-8">All Articles</h2>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <TabsList className="mb-12 flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === "all" ? "All Posts" : category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={filter} className="mt-0">
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((article, index) => {
                    const post = {
                      id: article.id,
                      title: article.title,
                      slug: article.slug,
                      author: article.author,
                      date: article.published_at,
                      category: article.category,
                      excerpt: article.excerpt,
                      featured: article.featured,
                      image: article.featured_image_url || '',
                      readTime: article.read_time || '5 min read',
                      content: article.content,
                    };
                    
                    return (
                      <div
                        key={article.id}
                        className={`blog-card-animate transition-all duration-600 ${
                          animatedCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-index={index}
                        style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                      >
                        <BlogCard post={post} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
