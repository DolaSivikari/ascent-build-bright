import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface JobPosting {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salary_range: string | null;
  status: string;
  posted_at: string | null;
  closes_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useJobPostings() {
  return useQuery({
    queryKey: ['job-postings'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('job-postings-crud', {
        method: 'GET',
      });

      if (error) throw error;
      return data as JobPosting[];
    },
  });
}

export function useJobPosting(slug: string) {
  return useQuery({
    queryKey: ['job-posting', slug],
    queryFn: async () => {
      const { data: job } = await supabase
        .from('job_postings')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'open')
        .single();

      if (!job) throw new Error('Job posting not found');
      return job as JobPosting;
    },
    enabled: !!slug,
  });
}
