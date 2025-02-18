import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ReportsList from '../../components/reports/ReportsList';
import ReportsCharts from '../../components/reports/ReportsCharts';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        
        <ReportsCharts />
        
        <div className="bg-white rounded-lg shadow">
          <ReportsList />
        </div>
      </div>
    </DashboardLayout>
  );
}