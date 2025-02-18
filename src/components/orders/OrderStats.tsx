import React from 'react';
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useSales } from '../../hooks/useSales';

export default function OrderStats() {
  const { sales } = useSales();

  const stats = [
    {
      name: 'Total Orders',
      value: sales?.length || 0,
      icon: Package,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Revenue',
      value: `$${sales?.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2) || '0.00'}`,
      icon: DollarSign,
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Average Order Value',
      value: `$${sales?.length ? (sales.reduce((sum, order) => sum + order.total_amount, 0) / sales.length).toFixed(2) : '0.00'}`,
      icon: TrendingUp,
      change: '+3%',
      changeType: 'increase'
    },
    {
      name: 'Pending Orders',
      value: sales?.filter(order => order.status === 'pending').length || 0,
      icon: Clock,
      change: '-2',
      changeType: 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500"> from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}