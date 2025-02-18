import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import OrdersTable from '../../components/orders/OrdersTable';
import OrderStats from '../../components/orders/OrderStats';
import NewOrderModal from '../../components/orders/NewOrderModal';
import { useSales } from '../../hooks/useSales';
import { generatePDF } from '../../utils/pdfGenerator';
import { exportToExcel } from '../../utils/excelExporter';

export default function Orders() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { sales } = useSales();

  const handleExport = () => {
    exportToExcel(sales, 'orders_export.xlsx');
  };

  const handlePrint = () => {
    generatePDF(sales, 'orders_report.pdf');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Purchase Order
          </button>
        </div>
        
        <OrderStats />
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <select 
                  className="border border-gray-300 rounded-md shadow-sm p-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
                <select 
                  className="border border-gray-300 rounded-md shadow-sm p-2"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleExport}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Export
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
          <OrdersTable statusFilter={statusFilter} dateFilter={dateFilter} />
        </div>
      </div>

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
      />
    </DashboardLayout>
  );
}