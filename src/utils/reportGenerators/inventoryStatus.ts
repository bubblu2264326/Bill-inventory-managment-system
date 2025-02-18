import * as XLSX from 'xlsx';
import { formatCurrency } from '../formatters';

export const generateInventoryStatusExcel = (products: any[]) => {
  // Prepare data for Excel
  const data = products.map(product => ({
    'Product Name': product.name,
    'SKU': product.sku,
    'Current Stock': product.stock_quantity,
    'Reorder Level': product.reorder_level,
    'Status': product.stock_quantity <= product.reorder_level ? 'Low Stock' : 'In Stock',
    'Unit Price': formatCurrency(product.price),
    'Total Value': formatCurrency(product.price * product.stock_quantity)
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Add column widths
  const colWidths = [
    { wch: 30 }, // Product Name
    { wch: 15 }, // SKU
    { wch: 15 }, // Current Stock
    { wch: 15 }, // Reorder Level
    { wch: 12 }, // Status
    { wch: 12 }, // Unit Price
    { wch: 12 }  // Total Value
  ];
  ws['!cols'] = colWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Inventory Status');

  // Save file
  XLSX.writeFile(wb, 'inventory-status-report.xlsx');
};