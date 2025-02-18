import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../../hooks/useProducts';
import { useSales } from '../../hooks/useSales';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SaleItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

interface SaleData {
  user_id: string;
  customer_name: string;
  items: SaleItem[];
  total_amount: number;
  payment_status?: string;
  status?: string;
}

// Add TypeScript interfaces to match your database structure
interface SaleItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

interface SaleData {
  user_id: string;
  customer_name: string;
  items: SaleItem[];
  total_amount: number;
  payment_status?: string;
  status?: string;
}

export default function NewSaleModal({ isOpen, onClose }: NewSaleModalProps) {
  const { products } = useProducts();
  const { createSale } = useSales();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const { register, handleSubmit, reset, watch } = useForm();
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const addProduct = (product: any) => {
    setSelectedProducts([
      ...selectedProducts,
      { ...product, quantity: 1, unit_price: product.price }
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

  const subtotal = selectedProducts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const onSubmit = async (data: any) => {
    try {
      const saleData = {
        customerName: data.customerName,
        items: selectedProducts.map(p => ({
          product_name: p.name,
          product_id: p.id,
          quantity: p.quantity,
          unit_price: p.unit_price
        }))
      };

      await createSale.mutateAsync(saleData);
      reset();
      setSelectedProducts([]);
      onClose();
      printBill(saleData);
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  const printBill = (saleData: any) => {
    const billWindow = window.open('', '_blank');
    if (billWindow) {
      billWindow.document.write(`
     <!DOCTYPE html>
<html>
  <head>
    <title>Bill Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      .bill {
        max-width: 400px;
        margin: 30px auto;
        background: #fff;
        padding: 20px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        border-bottom: 2px solid #000;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .customer-details {
        margin-bottom: 20px;
      }
      .items {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .items th,
      .items td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .items th {
        background-color: #f0f0f0;
      }
      .total-section {
        text-align: right;
        margin-top: 20px;
        border-top: 2px solid #000;
        padding-top: 10px;
      }
      .total-section p {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="bill">
      <div class="header">
        <h1>Bill Receipt</h1>
      </div>
      <div class="customer-details">
        <p><strong>Customer Name:</strong> ${saleData.customerName}</p>
      </div>
      <table class="items">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price ($)</th>
            <th>Subtotal ($)</th>
          </tr>
        </thead>
        <tbody>
          ${saleData.items
            .map(
              (item) => `
              <tr>
                <td>${item.product_name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit_price.toFixed(2)}</td>
                <td>${(item.quantity * item.unit_price).toFixed(2)}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
      <div class="total-section">
        <p>Total Amount: $${total.toFixed(2)}</p>
      </div>
    </div>
  </body>
</html>


      `);
      billWindow.document.close();
      billWindow.print();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg max-w-3xl w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">New Sale</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    {...register('customerName', { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    {...register('paymentMethod', { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                  </select>
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
                      {product.name} - ${product.price} (Stock: {product.stock_quantity})
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

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-24 border border-gray-300 rounded-md shadow-sm p-1"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">Tax (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={tax}
                        onChange={(e) => setTax(Number(e.target.value))}
                        className="w-24 border border-gray-300 rounded-md shadow-sm p-1"
                      />
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Discount:</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>${taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg mt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                disabled={selectedProducts.length === 0 || createSale.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {createSale.isPending ? 'Processing...' : 'Generate  Bill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}