import React from 'react';
import { BarChart3, Package, DollarSign, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardCard from '../components/dashboard/DashboardCard';
import SalesChart from '../components/dashboard/SalesChart';
import LowStockTable from '../components/dashboard/LowStockTable';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { stats, isLoading } = useDashboardStats();
  const navigate = useNavigate();

  const dashboardStats = [
    {
      title: 'Monthly Revenue',
      value: isLoading ? '...' : `$${stats?.monthlyRevenue.toFixed(2)}`,
      change: isLoading ? '...' : 'Updated today',
      icon: DollarSign,
      trend: 'up' as const,
    },
    {
      title: 'Total Products',
      value: isLoading ? '...' : stats?.totalProducts.toString(),
      change: '+3%',
      icon: Package,
      trend: 'up' as const,
    },
    {
      title: 'Low Stock Items',
      value: isLoading ? '...' : stats?.lowStockCount.toString(),
      change: `${stats?.lowStockCount} items need attention`,
      icon: AlertCircle,
      trend: 'down' as const,
    },
    {
      title: 'Sales Analytics',
      value: 'View Details',
      change: 'Click to analyze',
      icon: BarChart3,
      trend: 'up' as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard key={dashboardStats[0].title} {...dashboardStats[0]} />
        <DashboardCard key={dashboardStats[1].title} {...dashboardStats[1]} />
        <DashboardCard key={dashboardStats[2].title} {...dashboardStats[2]} />
        <div onClick={() => navigate('/dashboard/reports')}>
          <DashboardCard key={dashboardStats[3].title} {...dashboardStats[3]} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <SalesChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Low Stock Alerts</h2>
          <LowStockTable />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
}