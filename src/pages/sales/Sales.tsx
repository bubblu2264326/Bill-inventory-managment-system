import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SalesTable from '../../components/sales/SalesTable';
import NewSaleModal from '../../components/sales/NewSaleModal';

export default function Sales() {
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sales Management</h1>
        <button
          onClick={() => setIsNewSaleModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Bill
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <SalesTable />
      </div>

      <NewSaleModal
        isOpen={isNewSaleModalOpen}
        onClose={() => setIsNewSaleModalOpen(false)}
      />
    </DashboardLayout>
  );
}