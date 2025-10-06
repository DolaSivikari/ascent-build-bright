import { MaterialType, ScoredMaterial, UserCriteria, ResistanceLevel } from '@/types/materials';

// Normalize a value to 0-1 scale
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 1;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

// Convert resistance level to numeric score
function resistanceToScore(level?: ResistanceLevel): number {
  switch (level) {
    case 'high': return 1.0;
    case 'medium': return 0.6;
    case 'low': return 0.2;
    default: return 0.5;
  }
}

// Calculate climate suitability score
function calculateClimateSuitability(material: MaterialType, climateTags: string[]): number {
  let score = 0.5; // base score
  const matches: string[] = [];

  if (climateTags.includes('high-uv') && material.uv_resistance === 'high') {
    score += 0.2;
    matches.push('UV resistant');
  }

  if (climateTags.includes('high-humidity') && material.moisture_resistance === 'high') {
    score += 0.2;
    matches.push('moisture resistant');
  }

  if (climateTags.includes('freeze-thaw') && material.moisture_resistance === 'high') {
    score += 0.15;
    matches.push('freeze-thaw resistant');
  }

  if (climateTags.includes('coastal') && material.salt_tolerance === 'high') {
    score += 0.25;
    matches.push('salt tolerant');
  }

  return Math.min(1, score);
}

// Calculate sustainability score
function calculateSustainabilityScore(material: MaterialType): number {
  let score = 0;

  // VOC level contribution
  if (material.voc_level === 'low') score += 0.5;
  else if (material.voc_level === 'standard') score += 0.25;

  // Recycled content contribution
  score += (material.recycled_content_pct || 0) / 200; // max 0.5 for 100% recycled

  return Math.min(1, score);
}

// Calculate maintenance score (inverse - low maintenance is better)
function calculateMaintenanceScore(level: string): number {
  switch (level) {
    case 'low': return 1.0;
    case 'medium': return 0.6;
    case 'high': return 0.2;
    default: return 0.5;
  }
}

// Check if material matches budget range
function matchesBudget(costIndex: number, budget: string): { matches: boolean; penalty: number } {
  const budgetRanges = {
    economy: [1, 2],
    standard: [2, 3, 4],
    premium: [4, 5],
  };

  const range = budgetRanges[budget as keyof typeof budgetRanges] || [1, 5];
  const matches = range.includes(costIndex);
  
  // Penalty for materials outside budget
  const penalty = matches ? 0 : 0.3;
  
  return { matches, penalty };
}

// Main scoring function
export function scoreMaterials(
  materials: MaterialType[],
  criteria: UserCriteria
): ScoredMaterial[] {
  // Calculate min/max values for normalization
  const durabilityValues = materials.map(m => m.durability_years || 0);
  const costValues = materials.map(m => m.cost_index || 3);
  
  const durMin = Math.min(...durabilityValues);
  const durMax = Math.max(...durabilityValues);
  const costMin = Math.min(...costValues);
  const costMax = Math.max(...costValues);

  return materials
    .map(material => {
      const matchReasons: string[] = [];
      
      // Filter by substrate compatibility
      const substrateMatch = criteria.substrate.length === 0 || 
        criteria.substrate.some(s => material.suitable_substrates.includes(s));
      
      if (!substrateMatch) {
        return { ...material, score: 0, matchReasons: ['Not suitable for selected substrate'] };
      }

      // Calculate individual metric scores
      const durabilityScore = normalize(material.durability_years || 0, durMin, durMax);
      if (material.durability_years >= criteria.longevity) {
        matchReasons.push(`${material.durability_years}yr lifespan`);
      }

      // Cost score (inverse - lower cost is better)
      const costScore = 1 - normalize(material.cost_index || 3, costMin, costMax);
      const { matches: budgetMatches, penalty: budgetPenalty } = matchesBudget(material.cost_index, criteria.budget);
      if (budgetMatches) {
        matchReasons.push('Within budget');
      }

      const maintenanceScore = calculateMaintenanceScore(material.maintenance_level);
      if (material.maintenance_level === 'low') {
        matchReasons.push('Low maintenance');
      }

      const climateScore = calculateClimateSuitability(material, criteria.climateTags);
      
      const sustainabilityScore = calculateSustainabilityScore(material);
      if (criteria.sustainability && material.voc_level === 'low') {
        matchReasons.push('Low VOC');
      }
      if (material.recycled_content_pct > 10) {
        matchReasons.push(`${material.recycled_content_pct}% recycled content`);
      }

      // Calculate weighted score
      const weights = criteria.weights;
      let rawScore = 
        (weights.durability * durabilityScore) +
        (weights.cost * costScore) +
        (weights.maintenance * maintenanceScore) +
        (weights.climate * climateScore) +
        (weights.sustainability * sustainabilityScore);

      // Apply budget penalty
      rawScore = Math.max(0, rawScore - budgetPenalty);

      // Boost for tags match
      if (material.tags.some(tag => criteria.climateTags.includes(tag))) {
        rawScore *= 1.1;
      }

      return {
        ...material,
        score: Math.min(1, rawScore),
        matchReasons,
      };
    })
    .sort((a, b) => b.score - a.score);
}

// Filter materials by criteria
export function filterMaterials(
  materials: MaterialType[],
  filters: {
    category?: string[];
    search?: string;
    minDurability?: number;
    maxCost?: number;
  }
): MaterialType[] {
  return materials.filter(material => {
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(material.category)) return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchableText = `${material.title} ${material.brand} ${material.tags.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchLower)) return false;
    }

    if (filters.minDurability && material.durability_years < filters.minDurability) {
      return false;
    }

    if (filters.maxCost && material.cost_index > filters.maxCost) {
      return false;
    }

    return true;
  });
}

// Get top recommendations with labels
export function getTopRecommendations(scoredMaterials: ScoredMaterial[]): {
  bestOverall?: ScoredMaterial;
  bestForBudget?: ScoredMaterial;
  bestForLongevity?: ScoredMaterial;
} {
  if (scoredMaterials.length === 0) {
    return {};
  }

  const bestOverall = scoredMaterials[0];
  
  // Find best budget option (lowest cost with decent score)
  const budgetOptions = [...scoredMaterials]
    .filter(m => m.score > 0.3)
    .sort((a, b) => a.cost_index - b.cost_index);
  const bestForBudget = budgetOptions[0];

  // Find best longevity (highest durability with decent score)
  const longevityOptions = [...scoredMaterials]
    .filter(m => m.score > 0.3)
    .sort((a, b) => b.durability_years - a.durability_years);
  const bestForLongevity = longevityOptions[0];

  return {
    bestOverall,
    bestForBudget,
    bestForLongevity,
  };
}
