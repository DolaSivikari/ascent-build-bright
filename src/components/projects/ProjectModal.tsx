import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Download, Calendar, MapPin, DollarSign } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    location: string;
    year: number;
    beforeImage: string;
    afterImage: string;
    shortDescription: string;
    services: string[];
    scope?: string;
    timeline?: string;
    costBand?: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-heading font-bold text-primary mb-2">
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{project.category}</Badge>
                {project.services.map((service, idx) => (
                  <Badge key={idx} variant="outline">{service}</Badge>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Before/After Slider */}
          <div className="rounded-lg overflow-hidden border border-border">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>

          {/* Project Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase">Location</span>
              </div>
              <p className="font-medium text-foreground">{project.location}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase">Timeline</span>
              </div>
              <p className="font-medium text-foreground">{project.timeline || `${project.year}`}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase">Cost Band</span>
              </div>
              <p className="font-medium text-foreground">{project.costBand || "$50K - $100K"}</p>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h3 className="text-xl font-heading font-bold text-primary mb-3">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>
            {project.scope && (
              <p className="text-muted-foreground leading-relaxed mt-2">
                {project.scope}
              </p>
            )}
          </div>

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="bg-primary/5 border-l-4 border-secondary p-6 rounded-lg">
              <p className="text-foreground italic mb-3">"{project.testimonial.quote}"</p>
              <div className="text-sm">
                <p className="font-semibold text-primary">{project.testimonial.author}</p>
                <p className="text-muted-foreground">{project.testimonial.role}</p>
              </div>
            </div>
          )}

          {/* Download Case Study */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="default">
              Request Similar Quote
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Case Study
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
