import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (data: any[], filename: string) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Orders Report', 14, 22);

  // Add generated date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  const headers = [['Order ID', 'Customer', 'Date', 'Status', 'Total']];
  const rows = data.map(item => [
    item.id.slice(0, 8),
    item.customer_name,
    new Date(item.created_at).toLocaleDateString(),
    item.status,
    `$${item.total_amount.toFixed(2)}`
  ]);

  (doc as any).autoTable({
    head: headers,
    body: rows,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5,
      overflow: 'linebreak',
      halign: 'left'
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold'
    }
  });

  doc.save(filename);
};