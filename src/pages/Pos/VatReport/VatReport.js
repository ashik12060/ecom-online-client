import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VatReport() {
  const [reportType, setReportType] = useState('daily'); // 'daily', 'monthly', or 'custom'
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleReport = () => {
    // Generate mock data
    const data = {
      type: reportType,
      range:
        reportType === 'daily'
          ? selectedDate
          : reportType === 'monthly'
          ? selectedMonth
          : `${fromDate} to ${toDate}`,
      items: [
        { date: '2024-12-01', description: 'Sales VAT', amount: 150 },
        { date: '2024-12-02', description: 'Purchase VAT', amount: 120 },
        { date: '2024-12-03', description: 'Adjustment', amount: -30 },
      ],
    };

    setReportData(data);
    setShowReport(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center">VAT Report</h1>

      {!showReport ? (
        <>
          {/* Report Filters */}
          <div className="border p-4 bg-white shadow rounded-lg space-y-6">
            <div>
              <label className="block font-semibold mb-2">Report Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reportType"
                    value="daily"
                    checked={reportType === 'daily'}
                    onChange={() => setReportType('daily')}
                  />
                  <span>Daily Report</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reportType"
                    value="monthly"
                    checked={reportType === 'monthly'}
                    onChange={() => setReportType('monthly')}
                  />
                  <span>Monthly Report</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reportType"
                    value="custom"
                    checked={reportType === 'custom'}
                    onChange={() => setReportType('custom')}
                  />
                  <span>Custom Date Range</span>
                </label>
              </div>
            </div>

            {/* Daily Report Selection */}
            {reportType === 'daily' && (
              <div>
                <label className="block font-semibold mb-2">Select Date</label>
                <input
                  type="date"
                  className="border p-2 w-full"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            )}

            {/* Monthly Report Selection */}
            {reportType === 'monthly' && (
              <div>
                <label className="block font-semibold mb-2">Select Month</label>
                <input
                  type="month"
                  className="border p-2 w-full"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
            )}

            {/* Custom Date Range */}
            {reportType === 'custom' && (
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block font-semibold mb-2">From</label>
                  <input
                    type="date"
                    className="border p-2 w-full"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-semibold mb-2">To</label>
                  <input
                    type="date"
                    className="border p-2 w-full"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-6">
          <Link 
          to='/pos'
              onClick={handleReport}
              className="bg-white0 text-white px-6 py-2 rounded"
            >
              Close
            </Link>
            <button
              onClick={handleReport}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Generate Report
            </button>
            
          </div>
        </>
      ) : (
        // Report Display
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">VAT Report</h2>
          <p>
            <strong>Report Type:</strong> {reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)}{' '}
            Report
          </p>
          <p>
            <strong>Range:</strong> {reportData.range}
          </p>

          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-white">
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {reportData.items.map((item, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Print
            </button>
            <button
              onClick={() => setShowReport(false)}
              className="bg-white0 text-white px-6 py-2 rounded"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VatReport;
