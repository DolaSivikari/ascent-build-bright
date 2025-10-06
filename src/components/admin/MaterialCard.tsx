import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import type { MaterialType } from "@/types/materials";

interface MaterialCardProps {
  material: MaterialType;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

export function MaterialCard({ material, onEdit, onDelete, onToggleActive }: MaterialCardProps) {
  return (
    <Card className={!material.is_active ? "opacity-60" : ""}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{material.title}</h3>
              <Badge variant={material.is_active ? "default" : "secondary"}>
                {material.is_active ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="outline">{material.category}</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Brand:</span>
                <div className="font-medium">{material.brand}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost Index:</span>
                <div className="font-medium">{material.cost_index}/5</div>
              </div>
              <div>
                <span className="text-muted-foreground">Durability:</span>
                <div className="font-medium">{material.durability_years} years</div>
              </div>
              <div>
                <span className="text-muted-foreground">Maintenance:</span>
                <div className="font-medium capitalize">{material.maintenance_level}</div>
              </div>
              {material.warranty_years > 0 && (
                <div>
                  <span className="text-muted-foreground">Warranty:</span>
                  <div className="font-medium">{material.warranty_years} years</div>
                </div>
              )}
              {material.r_value > 0 && (
                <div>
                  <span className="text-muted-foreground">R-Value:</span>
                  <div className="font-medium">{material.r_value}</div>
                </div>
              )}
              {material.uv_resistance && (
                <div>
                  <span className="text-muted-foreground">UV Resistance:</span>
                  <div className="font-medium capitalize">{material.uv_resistance}</div>
                </div>
              )}
              {material.recycled_content_pct > 0 && (
                <div>
                  <span className="text-muted-foreground">Recycled:</span>
                  <div className="font-medium">{material.recycled_content_pct}%</div>
                </div>
              )}
            </div>

            {material.datasheet_url && (
              <div className="mt-3">
                <a 
                  href={material.datasheet_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Datasheet →
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant={material.is_active ? "outline" : "default"}
              onClick={onToggleActive}
            >
              {material.is_active ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}