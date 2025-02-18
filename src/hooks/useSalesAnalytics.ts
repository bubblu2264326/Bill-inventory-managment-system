import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useSalesAnalytics() {
  const { data, isLoading } = useQuery({
    queryKey: ['sales-analytics'],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const { data, error } = await supabase
        .from('sales_analytics')
        .select('*')
        .gte('sale_date', startDate.toISOString())
        .lte('sale_date', endDate.toISOString())
        .order('sale_date');

      if (error) throw error;

      return data.map(row => ({
        date: row.sale_date,
        revenue: row.total_revenue,
        orders: row.total_orders,
        averageOrder: row.average_order_value,
      }));
    },
  });

  return { data, isLoading };
}