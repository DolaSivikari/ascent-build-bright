import { UserCriteria, DEFAULT_WEIGHTS } from '@/types/materials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

interface FiltersPanelProps {
  criteria: UserCriteria;
  onChange: (criteria: UserCriteria) => void;
  onCategoryFilterChange: (categories: string[]) => void;
  selectedCategories: string[];
}

const SUBSTRATES = ['wood', 'stucco', 'masonry', 'vinyl', 'concrete', 'steel', 'aluminum'];
const CLIMATE_TAGS = [
  { value: 'high-uv', label: 'High UV Exposure' },
  { value: 'high-humidity', label: 'High Humidity' },
  { value: 'freeze-thaw', label: 'Freeze-Thaw Cycles' },
  { value: 'coastal', label: 'Coastal/Salt Exposure' },
];
const CATEGORIES = [
  { value: 'paint', label: 'Paint' },
  { value: 'eifs', label: 'EIFS' },
  { value: 'coating', label: 'Coating' },
  { value: 'sealant', label: 'Sealant' },
  { value: 'primer', label: 'Primer' },
];

export default function FiltersPanel({ 
  criteria, 
  onChange,
  onCategoryFilterChange,
  selectedCategories,
}: FiltersPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubstrateToggle = (substrate: string) => {
    const newSubstrates = criteria.substrate.includes(substrate)
      ? criteria.substrate.filter(s => s !== substrate)
      : [...criteria.substrate, substrate];
    onChange({ ...criteria, substrate: newSubstrates });
  };

  const handleClimateToggle = (tag: string) => {
    const newTags = criteria.climateTags.includes(tag)
      ? criteria.climateTags.filter(t => t !== tag)
      : [...criteria.climateTags, tag];
    onChange({ ...criteria, climateTags: newTags });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryFilterChange(newCategories);
  };

  const handleWeightChange = (key: keyof UserCriteria['weights'], value: number) => {
    onChange({
      ...criteria,
      weights: { ...criteria.weights, [key]: value / 100 }
    });
  };

  const resetFilters = () => {
    onChange({
      projectType: 'residential',
      substrate: [],
      climateTags: [],
      longevity: 10,
      budget: 'standard',
      sustainability: false,
      weights: DEFAULT_WEIGHTS,
    });
    onCategoryFilterChange([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Type */}
        <div className="space-y-2">
          <Label>Project Type</Label>
          <Select
            value={criteria.projectType}
            onValueChange={(value: any) => onChange({ ...criteria, projectType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
              <SelectItem value="new-build">New Build</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label>Budget Range</Label>
          <Select
            value={criteria.budget}
            onValueChange={(value: any) => onChange({ ...criteria, budget: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy ($)</SelectItem>
              <SelectItem value="standard">Standard ($$)</SelectItem>
              <SelectItem value="premium">Premium ($$$)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desired Longevity */}
        <div className="space-y-2">
          <Label>Minimum Lifespan: {criteria.longevity} years</Label>
          <Slider
            value={[criteria.longevity]}
            onValueChange={([value]) => onChange({ ...criteria, longevity: value })}
            min={5}
            max={25}
            step={5}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Material Categories */}
        <div className="space-y-2">
          <Label>Material Type</Label>
          <div className="space-y-2">
            {CATEGORIES.map(category => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.value}`}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={() => handleCategoryToggle(category.value)}
                />
                <label
                  htmlFor={`cat-${category.value}`}
                  className="text-sm cursor-pointer"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Substrate */}
        <div className="space-y-2">
          <Label>Substrate Surface</Label>
          <div className="space-y-2">
            {SUBSTRATES.map(substrate => (
              <div key={substrate} className="flex items-center space-x-2">
                <Checkbox
                  id={substrate}
                  checked={criteria.substrate.includes(substrate)}
                  onCheckedChange={() => handleSubstrateToggle(substrate)}
                />
                <label
                  htmlFor={substrate}
                  className="text-sm capitalize cursor-pointer"
                >
                  {substrate}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Climate Exposure */}
        <div className="space-y-2">
          <Label>Climate Conditions</Label>
          <div className="space-y-2">
            {CLIMATE_TAGS.map(climate => (
              <div key={climate.value} className="flex items-center space-x-2">
                <Checkbox
                  id={climate.value}
                  checked={criteria.climateTags.includes(climate.value)}
                  onCheckedChange={() => handleClimateToggle(climate.value)}
                />
                <label
                  htmlFor={climate.value}
                  className="text-sm cursor-pointer"
                >
                  {climate.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability */}
        <div className="flex items-center justify-between">
          <Label htmlFor="sustainability">Prioritize Sustainability</Label>
          <Switch
            id="sustainability"
            checked={criteria.sustainability}
            onCheckedChange={(checked) => onChange({ ...criteria, sustainability: checked })}
          />
        </div>

        <Separator />

        {/* Advanced: Weight Adjustment */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Advanced Weights</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs">Durability: {Math.round(criteria.weights.durability * 100)}%</Label>
              <Slider
                value={[criteria.weights.durability * 100]}
                onValueChange={([v]) => handleWeightChange('durability', v)}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Cost: {Math.round(criteria.weights.cost * 100)}%</Label>
              <Slider
                value={[criteria.weights.cost * 100]}
                onValueChange={([v]) => handleWeightChange('cost', v)}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Maintenance: {Math.round(criteria.weights.maintenance * 100)}%</Label>
              <Slider
                value={[criteria.weights.maintenance * 100]}
                onValueChange={([v]) => handleWeightChange('maintenance', v)}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Climate: {Math.round(criteria.weights.climate * 100)}%</Label>
              <Slider
                value={[criteria.weights.climate * 100]}
                onValueChange={([v]) => handleWeightChange('climate', v)}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Sustainability: {Math.round(criteria.weights.sustainability * 100)}%</Label>
              <Slider
                value={[criteria.weights.sustainability * 100]}
                onValueChange={([v]) => handleWeightChange('sustainability', v)}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
