import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Step5Props {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    preferredContact: string;
    notes: string;
  };
  onChange: (field: string, value: string) => void;
}

const EstimatorStep5 = ({ data, onChange }: Step5Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-heading font-bold mb-2 text-primary">
          Almost Done!
        </h3>
        <p className="text-muted-foreground">
          Provide your contact information to receive your detailed estimate and schedule a site visit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-base font-medium mb-2 block">
            Full Name *
          </Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-12"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-medium mb-2 block">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-12"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone" className="text-base font-medium mb-2 block">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(905) 555-0100"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="h-12"
            required
          />
        </div>

        <div>
          <Label htmlFor="preferredContact" className="text-base font-medium mb-2 block">
            Preferred Contact Time
          </Label>
          <Input
            id="preferredContact"
            placeholder="Morning, Afternoon, Evening"
            value={data.preferredContact}
            onChange={(e) => onChange("preferredContact", e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="text-base font-medium mb-2 block">
          Project Address
        </Label>
        <Input
          id="address"
          placeholder="123 Main Street, Mississauga, ON"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          className="h-12"
        />
      </div>

      <div>
        <Label htmlFor="notes" className="text-base font-medium mb-2 block">
          Additional Notes or Questions
        </Label>
        <Textarea
          id="notes"
          placeholder="Tell us more about your project, preferred timeline, or any specific requirements..."
          value={data.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p>
          By submitting this form, you consent to Ascent Group Construction contacting you regarding your project estimate. We respect your privacy and will never share your information with third parties.
        </p>
      </div>
    </div>
  );
};

export default EstimatorStep5;
