import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to Ascent Group Construction homepage."
      />
      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="btn-hero gap-2 px-8">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/services">
            <Button variant="outline" className="gap-2 px-8">
              <Search className="w-5 h-5" />
              Browse Services
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/about" className="text-primary hover:underline">About Us</Link>
            <Link to="/projects" className="text-primary hover:underline">Our Projects</Link>
            <Link to="/estimate" className="text-primary hover:underline">Get an Estimate</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
