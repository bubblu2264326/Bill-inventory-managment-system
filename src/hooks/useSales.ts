import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useSales() {
  const queryClient = useQueryClient();

  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_orders')
        .select(`
          *,
          user:users(full_name),
          items:sales_order_items(
            *,
            product:products(name)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createSale = useMutation({
    mutationFn: async ({ items, customerName }: { items: any[], customerName: string }) => {
      // Start a transaction
      const { data: sale, error: saleError } = await supabase
        .from('sales_orders')
        .insert([{
          customer_name: customerName,
          status: 'completed',
          payment_status: 'paid',
          total_amount: items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
        }])
        .select()
        .single();

      if (saleError) throw saleError;

      // Add sale items and update inventory
      for (const item of items) {
        // Add sale item
        const { error: itemError } = await supabase
          .from('sales_order_items')
          .insert([{
            sales_order_id: sale.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price
          }]);

        if (itemError) throw itemError;

        // Update product stock directly
       

        // Log inventory transaction
        const { error: transactionError } = await supabase
          .from('inventory_transactions')
          .insert([{
            product_id: item.product_id,
            transaction_type: 'sale',
            quantity: -item.quantity,
            reference_id: sale.id,
            notes: 'Sale order item'
          }]);

        if (transactionError) throw transactionError;
      }

      return sale;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Sale completed successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to complete sale: ' + error.message);
    },
  });

  return {
    sales,
    isLoading,
    createSale,
  };
}