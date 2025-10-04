import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Step1Props {
  data: {
    service: string;
    sqft: string;
    stories: string;
  };
  onChange: (field: string, value: string) => void;
}

const EstimatorStep1 = ({ data, onChange }: Step1Props) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="service" className="text-lg font-semibold mb-2 block">
          Project Type *
        </Label>
        <Select value={data.service} onValueChange={(value) => onChange("service", value)}>
          <SelectTrigger id="service" className="h-12">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential_painting">Residential Painting</SelectItem>
            <SelectItem value="stucco_eifs">Stucco / EIFS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sqft" className="text-lg font-semibold mb-2 block">
          Approximate Square Footage *
        </Label>
        <Input
          id="sqft"
          type="number"
          placeholder="e.g., 1200"
          value={data.sqft}
          onChange={(e) => onChange("sqft", e.target.value)}
          className="h-12"
          min="100"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Exterior wall area or total area to be painted/finished
        </p>
      </div>

      <div>
        <Label htmlFor="stories" className="text-lg font-semibold mb-2 block">
          Number of Stories *
        </Label>
        <Select value={data.stories} onValueChange={(value) => onChange("stories", value)}>
          <SelectTrigger id="stories" className="h-12">
            <SelectValue placeholder="Select number of stories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Story</SelectItem>
            <SelectItem value="2">2 Stories</SelectItem>
            <SelectItem value="3_plus">3+ Stories</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EstimatorStep1;
