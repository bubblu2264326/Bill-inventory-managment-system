import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useRecentTransactions } from '../../hooks/useRecentTransactions';

export default function RecentTransactions() {
  const { transactions, isLoading } = useRecentTransactions();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (!transactions?.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No recent transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {transaction.type === 'sale' ? 'Sale' : 'Purchase'} #{transaction.id.slice(0, 8)}
                </div>
                <div className="text-sm text-gray-500">
                  {transaction.type === 'sale' ? transaction.customer_name : 'Supplier Order'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${transaction.total_amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {transaction.type === 'sale' ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">Sale</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownLeft className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-blue-500">Purchase</span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}