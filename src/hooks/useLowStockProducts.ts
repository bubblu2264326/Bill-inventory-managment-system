import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useLowStockProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['low-stock-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      // Filter low stock products in JavaScript
      return data.filter(product => product.stock_quantity <= product.reorder_level);
    },
  });

  return { products, isLoading };
}