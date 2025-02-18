import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export default function DashboardCard({ title, value, change, icon: Icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-full">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === 'up' ? (
          <ArrowUp className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}