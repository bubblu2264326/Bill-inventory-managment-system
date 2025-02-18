import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useSuppliers() {
  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return { suppliers, isLoading };
}