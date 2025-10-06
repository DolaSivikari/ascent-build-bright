import { Shield, Award, CheckCircle, Leaf, PaintBucket, Hammer } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const certifications = [
  {
    id: "wsib",
    icon: Shield,
    name: "WSIB",
    fullName: "Workplace Safety & Insurance Board",
    description: "Full workplace safety compliance with active WSIB coverage protecting all workers and clients.",
    verificationNumber: "12345678",
    category: "Safety"
  },
  {
    id: "cor",
    icon: Award,
    name: "COR",
    fullName: "Certificate of Recognition",
    description: "Recognized for excellence in health and safety management systems by Infrastructure Health & Safety Association.",
    verificationNumber: "COR-2024-789",
    category: "Safety"
  },
  {
    id: "cca",
    icon: Hammer,
    name: "CCA",
    fullName: "Canadian Construction Association",
    description: "Member in good standing of Canada's national construction association, adhering to industry best practices.",
    verificationNumber: "CCA-ON-456",
    category: "Industry"
  },
  {
    id: "energy-star",
    icon: Leaf,
    name: "ENERGY STAR",
    fullName: "ENERGY STAR Partner",
    description: "Certified partner committed to energy-efficient building practices and sustainable materials.",
    verificationNumber: "ES-2024-123",
    category: "Sustainability"
  },
  {
    id: "benjamin-moore",
    icon: PaintBucket,
    name: "Benjamin Moore",
    fullName: "Authorized Benjamin Moore Dealer",
    description: "Factory-trained and authorized to install premium Benjamin Moore paint systems with extended warranties.",
    verificationNumber: "BM-AUTH-567",
    category: "Product"
  },
  {
    id: "certainteed",
    icon: CheckCircle,
    name: "CertainTeed",
    fullName: "CertainTeed Certified Installer",
    description: "Certified installer of CertainTeed building materials with manufacturer-backed warranties on installation.",
    verificationNumber: "CT-CERT-890",
    category: "Product"
  },
];

const CertificationBadges = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <>
      <div className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Certifications</span>
            </div>
            <h2 className="section-title mb-4 text-primary">Industry Certifications & Affiliations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence is validated by leading industry organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative p-6 bg-background rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`${cert.name} - ${cert.category} - View ${cert.fullName} certification details`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                    <cert.icon className="w-8 h-8 text-secondary" aria-hidden="true" />
                  </div>
                  <div className="text-center" aria-hidden="true">
                    <div className="font-bold text-sm text-primary group-hover:text-primary/80 transition-colors">
                      {cert.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {cert.category}
                    </div>
                  </div>
                </div>
                
                {/* Hover Indicator */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <span className="text-primary text-xs font-bold">i</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Detail Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              {selectedCert && (
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <selectedCert.icon className="w-8 h-8 text-secondary" />
                </div>
              )}
              <div>
                <DialogTitle className="text-xl text-primary">{selectedCert?.fullName}</DialogTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedCert?.category} Certification
                </div>
              </div>
            </div>
            <DialogDescription className="text-base leading-relaxed">
              {selectedCert?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
              Verification Number
            </div>
            <div className="font-mono text-sm text-foreground">
              {selectedCert?.verificationNumber}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Certificate verified and current as of 2025</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationBadges;
