import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import blogData from "@/data/blog-posts.json";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogData.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Convert markdown-like content to HTML (simple version)
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, idx) => {
        if (paragraph.startsWith('# ')) {
          return `<h1 key="${idx}" class="text-4xl font-bold mb-6 text-primary">${paragraph.slice(2)}</h1>`;
        } else if (paragraph.startsWith('## ')) {
          return `<h2 key="${idx}" class="text-3xl font-bold mb-4 mt-8 text-primary">${paragraph.slice(3)}</h2>`;
        } else if (paragraph.startsWith('### ')) {
          return `<h3 key="${idx}" class="text-2xl font-bold mb-3 mt-6">${paragraph.slice(4)}</h3>`;
        } else if (paragraph.startsWith('- **')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- **'));
          const listHtml = items.map(item => {
            const match = item.match(/- \*\*(.+?):\*\* (.+)/);
            if (match) {
              return `<li class="mb-2"><strong class="text-primary">${match[1]}:</strong> ${match[2]}</li>`;
            }
            return `<li class="mb-2">${item.slice(2)}</li>`;
          }).join('');
          return `<ul key="${idx}" class="list-none space-y-2 mb-4">${listHtml}</ul>`;
        } else if (paragraph.startsWith('- [ ]')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- [ ]'));
          const checklistHtml = items.map(item => 
            `<li class="flex items-start gap-2 mb-2">
              <input type="checkbox" class="mt-1 rounded" />
              <span>${item.slice(6)}</span>
            </li>`
          ).join('');
          return `<ul key="${idx}" class="space-y-2 mb-4">${checklistHtml}</ul>`;
        } else if (paragraph.startsWith('**')) {
          return `<p key="${idx}" class="text-lg font-semibold mb-4">${paragraph.replace(/\*\*/g, '')}</p>`;
        } else {
          return `<p key="${idx}" class="text-foreground/90 leading-relaxed mb-4">${paragraph}</p>`;
        }
      })
      .join('');
  };

  const relatedPosts = blogData.posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, ${post.title.toLowerCase()}`}
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center gap-2 mb-6 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-secondary text-primary">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="container mx-auto px-4 -mt-12 relative z-10 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Share this article</h3>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-muted rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is ready to bring your project to life with expert craftsmanship and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button size="lg" className="btn-hero">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost) => {
                  const relatedDate = new Date(relatedPost.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  return (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <OptimizedImage
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="mb-2">{relatedPost.category}</Badge>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{relatedDate}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
