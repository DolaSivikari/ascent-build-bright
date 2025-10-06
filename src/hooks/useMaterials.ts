import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MaterialType } from '@/types/materials';

export function useMaterials() {
  return useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('materials' as any)
          .select('*')
          .eq('is_active', true)
          .order('title');

        if (error) {
          if (import.meta.env.DEV) {
            console.error('Error fetching materials:', error);
          }
          throw new Error(`Failed to fetch materials: ${error.message}`);
        }

        if (!data) {
          throw new Error('No materials data received');
        }

        return data as unknown as MaterialType[];
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Materials query failed:', err);
        }
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useMaterialPackages(userIdentifier: string) {
  return useQuery({
    queryKey: ['material-packages', userIdentifier],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('material_packages' as any)
        .select('*')
        .eq('user_identifier', userIdentifier)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userIdentifier,
  });
}
