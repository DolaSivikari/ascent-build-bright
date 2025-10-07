import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  featured_image_url: string | null;
  read_time: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useArticles(params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['articles-public', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.category) queryParams.set('category', params.category);
      if (params?.tag) queryParams.set('tag', params.tag);
      if (params?.search) queryParams.set('search', params.search);

      const { data, error } = await supabase.functions.invoke('articles-public', {
        method: 'GET',
      });

      if (error) throw error;
      return data as ArticlesResponse;
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`articles-public/${slug}`, {
        method: 'GET',
      });

      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug,
  });
}
