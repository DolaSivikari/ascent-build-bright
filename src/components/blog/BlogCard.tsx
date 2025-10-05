import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-2 hover:border-secondary/50 flex flex-col">
        <div className="aspect-video overflow-hidden relative">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {post.featured && (
            <Badge className="absolute top-4 right-4 bg-secondary text-primary font-bold shadow-lg">
              Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className="p-6 flex flex-col flex-1">
          <Badge variant="outline" className="mb-3 w-fit group-hover:border-secondary group-hover:text-secondary transition-colors">
            {post.category}
          </Badge>
          <CardTitle className="mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-200 text-xl">
            {post.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
            Read Article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
