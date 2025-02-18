import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { useSuppliers } from '../../hooks/useSuppliers';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const { createOrder } = useOrders();
  const { register, handleSubmit, reset } = useForm();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const addProduct = (product: any) => {
    setSelectedProducts([
      ...selectedProducts,
      { ...product, quantity: 1, unit_price: product.cost_price }
    ]);
  };

  const updateQuantity = (index: number, increment: boolean) => {
    const newProducts = [...selectedProducts];
    if (increment) {
      newProducts[index].quantity += 1;
    } else if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
    }
    setSelectedProducts(newProducts);
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const total = selectedProducts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0);

  const onSubmit = async (data: any) => {
    try {
      await createOrder.mutateAsync({
        supplier_id: data.supplier_id,
        expected_delivery: data.expected_delivery,
        notes: data.notes,
        items: selectedProducts.map(p => ({
          product_id: p.id,
          quantity: Number(p.quantity),
          unit_price: Number(p.unit_price)
        }))
      });
      reset();
      setSelectedProducts([]);
      onClose();
    } catch (error) {
      console.error('Failed to create purchase order:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg max-w-3xl w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">New Purchase Order</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Supplier
                  </label>
                  <select
                    {...register('supplier_id', { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers?.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    {...register('expected_delivery', { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Products
                </label>
                <select
                  onChange={(e) => {
                    const product = products?.find(p => p.id === e.target.value);
                    if (product) addProduct(product);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value=""
                >
                  <option value="">Select a product</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.cost_price} (Current Stock: {product.stock_quantity})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProducts.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Products</h4>
                  <div className="space-y-2">
                    {selectedProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">${product.unit_price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, false)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm">{product.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, true)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Any special instructions or notes..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedProducts.length === 0}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                Create Purchase Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}