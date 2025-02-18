import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useRecentTransactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['recent-transactions'],
    queryFn: async () => {
      // Get recent sales orders
      const { data: salesOrders, error: salesError } = await supabase
        .from('sales_orders')
        .select('*, user:users(full_name)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (salesError) throw salesError;

      // Get recent purchase orders
      const { data: purchaseOrders, error: purchaseError } = await supabase
        .from('purchase_orders')
        .select('*, supplier:suppliers(name)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (purchaseError) throw purchaseError;

      // Combine and sort transactions
      const allTransactions = [
        ...salesOrders.map(order => ({
          ...order,
          type: 'sale',
        })),
        ...purchaseOrders.map(order => ({
          ...order,
          type: 'purchase',
        })),
      ].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 5);

      return allTransactions;
    },
  });

  return { transactions, isLoading };
}