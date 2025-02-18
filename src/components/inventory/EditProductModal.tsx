import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function EditProductModal({ isOpen, onClose, product }: EditProductModalProps) {
  const { updateProduct } = useProducts();
  const { categories } = useCategories();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Reset form when modal opens with product data
  useEffect(() => {
    if (isOpen && product) {
      reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        cost_price: product.cost_price,
        stock_quantity: product.stock_quantity,
        reorder_level: product.reorder_level
      });
    }
  }, [isOpen, product, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        ...data,
        price: parseFloat(data.price),
        cost_price: parseFloat(data.cost_price),
        stock_quantity: parseInt(data.stock_quantity),
        reorder_level: parseInt(data.reorder_level)
      });
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg max-w-lg w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Edit Product</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Product name is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  {...register('sku', { required: 'SKU is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.sku && (
                  <p className="mt-1 text-sm text-red-600">{errors.sku.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Price is required', min: 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message as string}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('cost_price', { required: 'Cost price is required', min: 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.cost_price && (
                    <p className="mt-1 text-sm text-red-600">{errors.cost_price.message as string}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    {...register('stock_quantity', { required: 'Stock quantity is required', min: 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.stock_quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock_quantity.message as string}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    {...register('reorder_level', { required: 'Reorder level is required', min: 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.reorder_level && (
                    <p className="mt-1 text-sm text-red-600">{errors.reorder_level.message as string}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateProduct.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {updateProduct.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}