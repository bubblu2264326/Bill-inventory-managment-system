import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => ({
      'Order ID': item.id.slice(0, 8),
      'Customer': item.customer_name,
      'Date': new Date(item.created_at).toLocaleDateString(),
      'Status': item.status,
      'Total': `$${item.total_amount.toFixed(2)}`
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  
  XLSX.writeFile(workbook, filename);
};