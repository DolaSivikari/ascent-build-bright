import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedPackage?: string;
}

const QuoteModal = ({ open, onOpenChange, preselectedPackage }: QuoteModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    jobType: preselectedPackage || "",
    description: "",
    photo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track GA4 event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'quote_form_submit', {
        job_type: formData.jobType,
      });
    }

    // Here you would integrate with your backend/CMS
    console.log("Quote submitted:", formData);
    
    toast({
      title: "Quote Request Received!",
      description: "We'll contact you within 24-48 hours with your estimate.",
    });

    onOpenChange(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      jobType: "",
      description: "",
      photo: null,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Get a Fast Quote</DialogTitle>
          <p className="text-muted-foreground">Fill out this quick form and we'll respond within 24-48 hours</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Project location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type *</Label>
            <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter — Quick Fix</SelectItem>
                <SelectItem value="refresh">Home Refresh — One-Room Makeover</SelectItem>
                <SelectItem value="weekend">Weekend Makeover — Mini Project</SelectItem>
                <SelectItem value="painting">Painting & Drywall</SelectItem>
                <SelectItem value="plumbing">Plumbing & Fixtures</SelectItem>
                <SelectItem value="flooring">Flooring & Tiling</SelectItem>
                <SelectItem value="landscaping">Landscaping & Outdoor</SelectItem>
                <SelectItem value="repairs">Repairs & Maintenance</SelectItem>
                <SelectItem value="caulking">Caulking & Sealants</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Brief Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your project..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.photo ? formData.photo.name : "Choose a photo"}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold">
            Get My Free Estimate
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll never share your information.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
