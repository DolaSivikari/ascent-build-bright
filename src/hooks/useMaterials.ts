import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MaterialType } from '@/types/materials';

export function useMaterials() {
  return useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('materials' as any)
        .select('*')
        .eq('is_active', true)
        .order('title');

      if (error) throw error;
      return data as unknown as MaterialType[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
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
