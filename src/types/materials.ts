export type MaterialCategory = 'paint' | 'eifs' | 'cladding' | 'sealant' | 'coating' | 'primer';
export type MaintenanceLevel = 'low' | 'medium' | 'high';
export type ResistanceLevel = 'low' | 'medium' | 'high';
export type VOCLevel = 'low' | 'standard' | 'high';
export type BudgetLevel = 'economy' | 'standard' | 'premium';
export type ProjectType = 'residential' | 'commercial' | 'renovation' | 'new-build';

export interface MaterialType {
  id: string;
  title: string;
  brand: string;
  category: MaterialCategory;
  suitable_substrates: string[];
  cost_index: number; // 1-5, lower is cheaper
  durability_years: number;
  maintenance_level: MaintenanceLevel;
  finish_options: string[];
  r_value: number;
  uv_resistance: ResistanceLevel;
  moisture_resistance: ResistanceLevel;
  salt_tolerance?: ResistanceLevel;
  voc_level?: VOCLevel;
  recycled_content_pct: number;
  warranty_years: number;
  datasheet_url?: string;
  images: string[];
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScoredMaterial extends MaterialType {
  score: number;
  matchReasons: string[];
}

export interface UserCriteria {
  projectType: ProjectType;
  substrate: string[];
  climateTags: string[];
  longevity: number;
  budget: BudgetLevel;
  aesthetics?: string;
  sustainability: boolean;
  weights: {
    durability: number;
    cost: number;
    maintenance: number;
    climate: number;
    sustainability: number;
  };
}

export interface MaterialPackage {
  id?: string;
  user_identifier: string;
  project_type: ProjectType;
  substrate: string;
  climate_tags: string[];
  selected_materials: string[]; // material IDs
  user_weights: UserCriteria['weights'];
  package_name?: string;
  notes?: string;
  created_at?: string;
}

export const DEFAULT_WEIGHTS: UserCriteria['weights'] = {
  durability: 0.30,
  cost: 0.20,
  maintenance: 0.15,
  climate: 0.20,
  sustainability: 0.15,
};
