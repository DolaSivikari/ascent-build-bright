import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  featured_image_url: string | null;
  read_time: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostsResponse {
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useBlogPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.category) queryParams.set('category', params.category);
      if (params?.search) queryParams.set('search', params.search);
      if (params?.status) queryParams.set('status', params.status);

      const { data, error } = await supabase.functions.invoke('blog-posts-crud', {
        method: 'GET',
      });

      if (error) throw error;
      return data as BlogPostsResponse;
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!posts) throw new Error('Blog post not found');
      return posts as BlogPost;
    },
    enabled: !!slug,
  });
}
