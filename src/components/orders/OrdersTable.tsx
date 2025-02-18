import React from 'react';
import { Check, X } from 'lucide-react';
import { useSales } from '../../hooks/useSales';
import { useAuthStore } from '../../store/authStore';

export default function OrdersTable({ statusFilter = 'all', dateFilter = 'all' }) {
  const { sales, isLoading, updateOrderStatus } = useSales();
  const { role } = useAuthStore();

  const filteredSales = sales?.filter((sale) => {
    if (statusFilter !== 'all' && sale.status !== statusFilter) return false;
    
    if (dateFilter !== 'all') {
      const orderDate = new Date(sale.created_at);
      const today = new Date();
      
      switch (dateFilter) {
        case 'today':
          return orderDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          return orderDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          return orderDate >= monthAgo;
        default:
          return true;
      }
    }
    
    return true;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: 'completed' | 'processing') => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            {(role === 'admin' || role === 'manager') && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredSales?.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #{order.id.slice(0, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${order.total_amount.toFixed(2)}
              </td>
              {(role === 'admin' || role === 'manager') && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}