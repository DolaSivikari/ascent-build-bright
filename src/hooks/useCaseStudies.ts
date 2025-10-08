import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  project_type: string;
  location: string | null;
  client_name: string | null;
  year: number | null;
  duration_months: number | null;
  square_footage: number | null;
  budget_range: string | null;
  featured_image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  gallery_urls: string[];
  services_provided: string[];
  materials_used: string[];
  technologies_used: string[];
  challenge: string;
  solution: string;
  results: string;
  testimonial_text: string | null;
  testimonial_author: string | null;
  testimonial_role: string | null;
  featured: boolean;
  status: string;
  sector: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseStudiesResponse {
  data: CaseStudy[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useCaseStudies(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ['case-studies', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.search) queryParams.set('search', params.search);
      if (params?.status) queryParams.set('status', params.status);

      const { data, error } = await supabase.functions.invoke('case-studies-crud', {
        method: 'GET',
      });

      if (error) throw error;
      return data as CaseStudiesResponse;
    },
  });
}

export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      const { data: caseStudy } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!caseStudy) throw new Error('Case study not found');
      return caseStudy as CaseStudy;
    },
    enabled: !!slug,
  });
}
