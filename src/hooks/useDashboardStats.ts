import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useDashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get total products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) throw productsError;

      // Get low stock products
      const { data: lowStockProducts, error: lowStockError } = await supabase
        .from('low_stock_products')
        .select('*');

      if (lowStockError) {
        console.error('Error fetching low stock products:', lowStockError);
        throw lowStockError;
      }

      console.log('Low stock products:', lowStockProducts);

      // Get total sales for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: monthlyOrders, error: ordersError } = await supabase
        .from('sales_orders')
        .select('total_amount')
        .gte('created_at', startOfMonth.toISOString())
        .eq('status', 'completed');

      if (ordersError) throw ordersError;

      const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      return {
        totalProducts: products?.length || 0,
        lowStockCount: lowStockProducts?.length || 0,
        monthlyRevenue,
      };
    },
  });

  return { 
    stats: stats || { totalProducts: 0, lowStockCount: 0, monthlyRevenue: 0 }, 
    isLoading 
  };
}