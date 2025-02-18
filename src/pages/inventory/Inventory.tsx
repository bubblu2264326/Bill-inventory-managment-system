import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InventoryTable from '../../components/inventory/InventoryTable';
import AddProductModal from '../../components/inventory/AddProductModal';
import AddCategoryModal from '../../components/inventory/AddCategoryModal';
import InventoryFilters from '../../components/inventory/InventoryFilters';
import { useProducts } from '../../hooks/useProducts';
import { useAuthStore } from '../../store/authStore';

export default function Inventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const { products, isLoading } = useProducts();
  const { role } = useAuthStore();

  // Filter products based on search, category, and stock status
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;

    let matchesStockStatus = true;
    if (stockStatus === 'in-stock') {
      matchesStockStatus = product.stock_quantity > product.reorder_level;
    } else if (stockStatus === 'low-stock') {
      matchesStockStatus = product.stock_quantity <= product.reorder_level && product.stock_quantity > 0;
    } else if (stockStatus === 'out-of-stock') {
      matchesStockStatus = product.stock_quantity === 0;
    }

    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <div className="space-x-4 flex">
          {role === 'admin' && (
            <button
              onClick={() => setIsAddCategoryModalOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Category
            </button>
          )}
          {(role === 'admin' || role === 'manager') && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <InventoryFilters
            searchValue={searchQuery}
            categoryValue={selectedCategory}
            stockStatusValue={stockStatus}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onStockStatusChange={setStockStatus}
          />
        </div>
        <InventoryTable products={filteredProducts} isLoading={isLoading} />
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
      />
    </DashboardLayout>
  );
}