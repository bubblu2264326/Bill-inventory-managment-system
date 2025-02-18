import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../formatters';

export const generateSalesSummaryPDF = (sales: any[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Sales Summary Report', 14, 20);

  // Add report metadata
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  // Calculate summary statistics
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
  const averageOrderValue = totalRevenue / totalSales;

  // Add summary section
  doc.setFontSize(12);
  doc.text('Summary Statistics', 14, 45);
  doc.setFontSize(10);
  doc.text(`Total Sales: ${totalSales}`, 14, 55);
  doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 14, 62);
  doc.text(`Average Order Value: ${formatCurrency(averageOrderValue)}`, 14, 69);

  // Add sales table
  const headers = [['Order ID', 'Customer', 'Date', 'Status', 'Amount']];
  const data = sales.map(sale => [
    sale.id.slice(0, 8),
    sale.customer_name,
    new Date(sale.created_at).toLocaleDateString(),
    sale.status,
    formatCurrency(sale.total_amount)
  ]);

  (doc as any).autoTable({
    head: headers,
    body: data,
    startY: 80,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255
    }
  });

  doc.save('sales-summary-report.pdf');
};