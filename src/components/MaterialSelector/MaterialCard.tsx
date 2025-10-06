import { ScoredMaterial } from '@/types/materials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Check, Shield, Droplet, Sun, Leaf, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MaterialCardProps {
  material: ScoredMaterial;
  onAddToShortlist: (material: ScoredMaterial) => void;
  isInShortlist: boolean;
  shortlistFull: boolean;
}

export default function MaterialCard({
  material,
  onAddToShortlist,
  isInShortlist,
  shortlistFull,
}: MaterialCardProps) {
  const scorePercent = Math.round(material.score * 100);
  const costLabels = ['$', '$$', '$$$', '$$$$', '$$$$$'];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{material.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{material.brand}</p>
          </div>
          <Badge variant="secondary" className="capitalize shrink-0">
            {material.category}
          </Badge>
        </div>

        {/* Match Score */}
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Match Score</span>
            <span className="font-semibold">{scorePercent}%</span>
          </div>
          <Progress value={scorePercent} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{material.durability_years}yr lifespan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{costLabels[material.cost_index - 1]}</span>
            <span className="text-muted-foreground">Cost</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="capitalize">{material.maintenance_level} maint.</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-primary" />
            <span className="capitalize">{material.uv_resistance} UV</span>
          </div>
        </div>

        {/* Match Reasons */}
        {material.matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {material.matchReasons.slice(0, 3).map((reason, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {reason}
              </Badge>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {material.tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onAddToShortlist(material)}
          disabled={isInShortlist || (shortlistFull && !isInShortlist)}
          className="w-full"
          variant={isInShortlist ? 'outline' : 'default'}
        >
          {isInShortlist ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              In Shortlist
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to Shortlist
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
