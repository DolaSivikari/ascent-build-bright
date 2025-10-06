import { useState } from 'react';
import { ScoredMaterial, UserCriteria } from '@/types/materials';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Package, X, Download, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface PackageBuilderProps {
  shortlist: ScoredMaterial[];
  onRemove: (materialId: string) => void;
  criteria: UserCriteria;
}

export default function PackageBuilder({
  shortlist,
  onRemove,
  criteria,
}: PackageBuilderProps) {
  const [packageName, setPackageName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSavePackage = async () => {
    if (shortlist.length === 0) {
      toast({
        title: 'No materials selected',
        description: 'Add materials to your shortlist first.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const userIdentifier = localStorage.getItem('material_selector_user_id') || 
        `anon-${Date.now()}`;
      
      if (!localStorage.getItem('material_selector_user_id')) {
        localStorage.setItem('material_selector_user_id', userIdentifier);
      }

      const { error } = await supabase.from('material_packages' as any).insert({
        user_identifier: userIdentifier,
        project_type: criteria.projectType,
        substrate: criteria.substrate[0] || 'mixed',
        climate_tags: criteria.climateTags,
        selected_materials: shortlist.map(m => m.id),
        user_weights: criteria.weights,
        package_name: packageName || `Package ${new Date().toLocaleDateString()}`,
        notes,
      });

      if (error) throw error;

      toast({
        title: 'Package saved!',
        description: 'Your material package has been saved successfully.',
      });

      setPackageName('');
      setNotes('');
    } catch (error) {
      console.error('Error saving package:', error);
      toast({
        title: 'Error',
        description: 'Failed to save package. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToEstimate = () => {
    // Store package in localStorage for estimator
    localStorage.setItem('material_package_for_estimate', JSON.stringify({
      materials: shortlist,
      criteria,
    }));
    
    navigate('/estimate');
    
    toast({
      title: 'Redirecting to Estimator',
      description: 'Your materials will be pre-filled in the estimate form.',
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Package className="w-4 h-4 mr-2" />
          Package ({shortlist.length}/3)
          {shortlist.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {shortlist.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Material Package Builder</SheetTitle>
          <SheetDescription>
            Create a package from your shortlist (max 3 materials)
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Shortlisted Materials */}
          {shortlist.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No materials in your shortlist yet.</p>
              <p className="text-sm mt-1">Add up to 3 materials to compare and package.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shortlist.map((material) => (
                <div
                  key={material.id}
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{material.title}</p>
                    <p className="text-sm text-muted-foreground">{material.brand}</p>
                    <div className="flex gap-1 mt-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {material.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {material.durability_years}yr
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(material.id)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Package Details Form */}
          {shortlist.length > 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="package-name">Package Name (Optional)</Label>
                <Input
                  id="package-name"
                  placeholder="e.g., Exterior Renovation 2025"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this material selection..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t">
                <Button
                  onClick={handleAddToEstimate}
                  className="w-full"
                  variant="default"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Add to Estimate
                </Button>

                <Button
                  onClick={handleSavePackage}
                  className="w-full"
                  variant="outline"
                  disabled={isSaving}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Package'}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
