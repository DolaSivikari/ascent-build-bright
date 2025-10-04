import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  thumbnail: string;
  shortDescription: string;
  services: string[];
  featured?: boolean;
}

const ProjectCard = ({
  id,
  title,
  category,
  location,
  year,
  thumbnail,
  shortDescription,
  services,
  featured = false,
}: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[--shadow-medium] hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <OptimizedImage
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-4 right-4 bg-secondary text-primary">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          <span className="mx-2">•</span>
          <Calendar className="w-4 h-4" />
          <span>{year}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <Badge variant="outline" className="mb-3">
          {category}
        </Badge>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {services.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-muted rounded-md text-foreground"
            >
              {service}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link"
        >
          View Case Study
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
