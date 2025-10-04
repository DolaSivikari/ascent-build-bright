import estimatorModel from "@/data/estimator-model.json";

export interface EstimateInput {
  service: "residential_painting" | "stucco_eifs";
  sqft: number;
  stories: "1" | "2" | "3_plus";
  prepComplexity: "none" | "standard" | "heavy" | "structural_repair_required";
  finishQuality: "standard" | "premium" | "luxury";
  region: "gta_default" | "inner_city" | "suburban" | "rural";
  addOns: {
    scaffolding?: "low" | "mid" | "high";
    colorConsultation?: boolean;
    rushScheduling?: boolean;
    warrantyExtension?: boolean;
    siteCleanup?: boolean;
  };
}

export interface EstimateResult {
  min: number;
  max: number;
  currency: string;
  breakdown: {
    baseMin: number;
    baseMax: number;
    prepMultiplier: number;
    finishMultiplier: number;
    storiesMultiplier: number;
    regionalMultiplier: number;
    addOnsMin: number;
    addOnsMax: number;
  };
  explanation: string;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const service = estimatorModel.services[input.service];
  const modifiers = estimatorModel.modifiers;
  const rules = estimatorModel.estimation_rules;
  const addOns = estimatorModel.add_ons;

  // Step 1: Base calculation
  let minPrice = service.base_per_sqft.min * input.sqft;
  let maxPrice = service.base_per_sqft.max * input.sqft;

  const baseMin = minPrice;
  const baseMax = maxPrice;

  // Step 2: Apply prep complexity
  const prepMultiplier = modifiers.prep_complexity[input.prepComplexity];
  minPrice *= prepMultiplier;
  maxPrice *= prepMultiplier;

  // Step 3: Apply finish quality
  const finishMultiplier = modifiers.finish_quality[input.finishQuality];
  minPrice *= finishMultiplier;
  maxPrice *= finishMultiplier;

  // Step 4: Apply stories multiplier
  const storiesMultiplier = modifiers.stories_multiplier[input.stories];
  minPrice *= storiesMultiplier;
  maxPrice *= storiesMultiplier;

  // Step 5: Add add-ons
  let addOnsMin = 0;
  let addOnsMax = 0;

  if (input.addOns.scaffolding) {
    const tier = addOns.scaffolding.tiers.find(t => t.name === input.addOns.scaffolding);
    if (tier) {
      addOnsMin += tier.min;
      addOnsMax += tier.max;
    }
  }

  if (input.addOns.colorConsultation && !addOns.color_consultation.default_included_with_full_job) {
    addOnsMin += addOns.color_consultation.flat_min;
    addOnsMax += addOns.color_consultation.flat_max;
  }

  if (input.addOns.rushScheduling) {
    const rushMin = addOns.rush_scheduling.multiplier_min;
    const rushMax = addOns.rush_scheduling.multiplier_max;
    minPrice *= rushMin;
    maxPrice *= rushMax;
  }

  if (input.addOns.warrantyExtension) {
    addOnsMin += addOns.warranty_extension.flat_min;
    addOnsMax += addOns.warranty_extension.flat_max;
  }

  if (input.addOns.siteCleanup) {
    addOnsMin += addOns.site_cleanup.flat_min;
    addOnsMax += addOns.site_cleanup.flat_max;
  }

  minPrice += addOnsMin;
  maxPrice += addOnsMax;

  // Step 6: Apply regional multiplier
  const regionalMultiplier = modifiers.regional_multiplier[input.region];
  minPrice *= regionalMultiplier;
  maxPrice *= regionalMultiplier;

  // Step 7: Apply minimum job fee
  minPrice = Math.max(minPrice, rules.minimum_job_fee.amount);
  maxPrice = Math.max(maxPrice, rules.minimum_job_fee.amount);

  // Generate explanation
  const explanation = generateExplanation(input, {
    baseMin,
    baseMax,
    prepMultiplier,
    finishMultiplier,
    storiesMultiplier,
    regionalMultiplier,
  });

  return {
    min: Math.round(minPrice),
    max: Math.round(maxPrice),
    currency: estimatorModel.currency,
    breakdown: {
      baseMin,
      baseMax,
      prepMultiplier,
      finishMultiplier,
      storiesMultiplier,
      regionalMultiplier,
      addOnsMin,
      addOnsMax,
    },
    explanation,
  };
}

function generateExplanation(
  input: EstimateInput,
  breakdown: {
    baseMin: number;
    baseMax: number;
    prepMultiplier: number;
    finishMultiplier: number;
    storiesMultiplier: number;
    regionalMultiplier: number;
  }
): string {
  const parts: string[] = [];

  parts.push(`Based on ${input.sqft} sq ft`);
  
  if (breakdown.prepMultiplier > 1) {
    parts.push(`${input.prepComplexity.replace(/_/g, ' ')} prep work`);
  }
  
  if (breakdown.finishMultiplier > 1) {
    parts.push(`${input.finishQuality} finish quality`);
  }
  
  if (breakdown.storiesMultiplier > 1) {
    parts.push(`${input.stories.replace('_', '+')} story structure`);
  }

  return `Estimate includes: ${parts.join(', ')}. Final price depends on site inspection and material selection.`;
}

export function formatCurrency(amount: number, currency: string = "CAD"): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
