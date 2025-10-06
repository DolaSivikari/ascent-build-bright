import { ScoredMaterial } from '@/types/materials';
import { getTopRecommendations } from '@/utils/materialScoring';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, DollarSign, Clock } from 'lucide-react';

interface RecommendationSectionProps {
  materials: ScoredMaterial[];
}

export default function RecommendationSection({ materials }: RecommendationSectionProps) {
  const recommendations = getTopRecommendations(materials);

  if (!recommendations.bestOverall) {
    return null;
  }

  const cards = [
    {
      title: 'Best Overall Match',
      material: recommendations.bestOverall,
      icon: Award,
      badgeVariant: 'default' as const,
    },
    {
      title: 'Best for Budget',
      material: recommendations.bestForBudget,
      icon: DollarSign,
      badgeVariant: 'secondary' as const,
    },
    {
      title: 'Best for Longevity',
      material: recommendations.bestForLongevity,
      icon: Clock,
      badgeVariant: 'outline' as const,
    },
  ].filter(card => card.material);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Top Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const material = card.material!;
          
          return (
            <Card key={idx} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-sm">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-semibold truncate">{material.title}</p>
                  <p className="text-sm text-muted-foreground">{material.brand}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Match</span>
                  <Badge variant={card.badgeVariant}>
                    {Math.round(material.score * 100)}%
                  </Badge>
                </div>
                {material.matchReasons.length > 0 && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {material.matchReasons.join(', ')}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
