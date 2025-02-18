import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../formatters';

export const generateRevenueAnalysisPDF = (salesData: any[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Revenue Analysis Report', 14, 20);

  // Add report metadata
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  // Calculate summary metrics
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  // Add summary section
  doc.setFontSize(12);
  doc.text('Revenue Summary', 14, 45);
  doc.setFontSize(10);
  doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 14, 55);
  doc.text(`Total Orders: ${totalOrders}`, 14, 62);
  doc.text(`Average Order Value: ${formatCurrency(averageOrderValue)}`, 14, 69);

  // Add daily breakdown table
  const headers = [['Date', 'Revenue', 'Orders', 'Avg. Order Value']];
  const data = salesData.map(day => [
    new Date(day.date).toLocaleDateString(),
    formatCurrency(day.revenue),
    day.orders,
    formatCurrency(day.revenue / day.orders)
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

  doc.save('revenue-analysis-report.pdf');
};