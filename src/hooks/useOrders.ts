import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(name),
          items:purchase_order_items(
            *,
            product:products(name)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createOrder = useMutation({
    mutationFn: async ({ items, supplierId, expectedDelivery, notes }: any) => {
      // Start a transaction
      const { data: order, error: orderError } = await supabase
        .from('purchase_orders')
        .insert([{
          supplier_id: supplierId,
          expected_delivery: expectedDelivery,
          status: 'pending',
          notes,
          total_amount: items.reduce((sum: number, item: any) => sum + (item.quantity * item.unit_price), 0)
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Add order items and update inventory
      for (const item of items) {
        // Add order item
        const { error: itemError } = await supabase
          .from('purchase_order_items')
          .insert([{
            purchase_order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price
          }]);

        if (itemError) throw itemError;

        // Update product stock
        const { error: stockError } = await supabase
          .rpc('increment_stock', {
            p_id: item.product_id,
            amount: item.quantity
          });

        if (stockError) throw stockError;

        // Log inventory transaction
        const { error: transactionError } = await supabase
          .from('inventory_transactions')
          .insert([{
            product_id: item.product_id,
            transaction_type: 'purchase',
            quantity: item.quantity,
            reference_id: order.id,
            notes: 'Purchase order item'
          }]);

        if (transactionError) throw transactionError;
      }

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Purchase order created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create purchase order: ' + error.message);
    },
  });

  return {
    orders,
    isLoading,
    createOrder
  };
}