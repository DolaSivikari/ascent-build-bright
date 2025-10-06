import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: {
    name: string;
    description: string;
    verificationUrl?: string;
  };
}

const CertificationModal = ({ isOpen, onClose, certification }: CertificationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{certification.name}</DialogTitle>
          <DialogDescription>{certification.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm">
            This certification demonstrates our commitment to {certification.name.toLowerCase()} standards
            and best practices in the construction industry.
          </p>
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Verify Certification →
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;
