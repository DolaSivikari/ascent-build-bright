import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: number;
  short_description: string;
  full_description: string | null;
  services: string[];
  tags: string[];
  featured: boolean;
  status: string;
  thumbnail_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  gallery_urls: string[];
  timeline: string | null;
  cost_band: string | null;
  testimonial: any;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useProjects(params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: ['projects-public', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.category) queryParams.set('category', params.category);
      if (params?.tag) queryParams.set('tag', params.tag);
      if (params?.featured !== undefined) queryParams.set('featured', params.featured.toString());

      const { data, error } = await supabase.functions.invoke('projects-public', {
        method: 'GET',
      });

      if (error) throw error;
      return data as ProjectsResponse;
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`projects-public/${slug}`, {
        method: 'GET',
      });

      if (error) throw error;
      return data as Project;
    },
    enabled: !!slug,
  });
}
