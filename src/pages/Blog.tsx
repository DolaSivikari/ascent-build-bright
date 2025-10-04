import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import blogData from "@/data/blog-posts-expanded.json";

const Blog = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const categories = ["all", ...Array.from(new Set(blogData.posts.map(p => p.category)))];
  
  const filteredPosts = filter === "all" 
    ? blogData.posts 
    : blogData.posts.filter(p => p.category === filter);

  const featuredPosts = blogData.posts.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Blog & Insights"
        description="Expert tips, guides, and insights on painting, stucco, EIFS, and home exterior maintenance from the Ascent Group team."
        keywords="painting tips, stucco maintenance, EIFS guide, home improvement blog, exterior painting advice"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Expert advice, industry insights, and practical tips to help you make informed decisions about your home's exterior.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 py-16 border-b">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  category={post.category}
                  image={post.image}
                  readTime={post.readTime}
                  featured={post.featured}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts with Filter */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">All Articles</h2>
          
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
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      author={post.author}
                      date={post.date}
                      category={post.category}
                      image={post.image}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get expert tips, project ideas, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-hero">
                  Subscribe to Newsletter
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

export default Blog;
