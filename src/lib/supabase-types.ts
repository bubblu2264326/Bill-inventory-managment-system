export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  sku: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  reorder_level: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SalesOrder {
  id: string;
  user_id: string;
  customer_name: string;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: string;
  product_id: string;
  transaction_type: 'purchase' | 'sale' | 'adjustment';
  quantity: number;
  reference_id: string | null;
  notes: string | null;
  created_at: string;
}