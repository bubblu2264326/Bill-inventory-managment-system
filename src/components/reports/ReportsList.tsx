import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useSalesAnalytics } from '../../hooks/useSalesAnalytics';
import { generateSalesSummaryPDF } from '../../utils/reportGenerators/salesSummary';
import { generateInventoryStatusExcel } from '../../utils/reportGenerators/inventoryStatus';
import { generateRevenueAnalysisPDF } from '../../utils/reportGenerators/revenueAnalysis';
import { useProducts } from '../../hooks/useProducts';
import { useSales } from '../../hooks/useSales';

export default function ReportsList() {
  const { data: salesData } = useSalesAnalytics();
  const { products } = useProducts();
  const { sales } = useSales();

  const reports = [
    {
      name: 'Sales Summary Report',
      description: 'Monthly overview of all sales transactions',
      date: new Date().toLocaleDateString(),
      type: 'PDF',
      handler: () => generateSalesSummaryPDF(sales || [])
    },
    {
      name: 'Inventory Status Report',
      description: 'Current stock levels and reorder suggestions',
      date: new Date().toLocaleDateString(),
      type: 'Excel',
      handler: () => generateInventoryStatusExcel(products || [])
    },
    {
      name: 'Revenue Analysis',
      description: 'Detailed breakdown of revenue streams',
      date: new Date().toLocaleDateString(),
      type: 'PDF',
      handler: () => generateRevenueAnalysisPDF(salesData || [])
    }
  ];

  return (
    <div className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Reports</h3>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500">{report.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Generated: {report.date}</p>
                </div>
              </div>
              <button 
                onClick={report.handler}
                className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Download {report.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}