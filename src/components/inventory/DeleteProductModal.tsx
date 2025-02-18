import React from 'react';
import { X } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function DeleteProductModal({ isOpen, onClose, product }: DeleteProductModalProps) {
  const { deleteProduct } = useProducts();

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(product.id);
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg max-w-md w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Delete Product</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete "{product?.name}"? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteProduct.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}