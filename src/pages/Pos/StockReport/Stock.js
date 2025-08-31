
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../axiosInstance";

// const Stock = () => {
//   const [report, setReport] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStockReport = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/products/stock`
//         );
//         setReport(res.data.stockReport);
//       } catch (err) {
//         console.error("Error fetching stock report", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockReport();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-lg font-semibold">Loading Stock Report...</div>;
//   }

//   // 🔹 Calculate Totals
//   const totalQuantity = report.reduce((sum, item) => sum + item.totalQuantity, 0);
//   const totalValue = report.reduce(
//     (sum, item) => sum + item.totalQuantity * item.price,
//     0
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">📦 Stock Report</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-white text-gray-700">
//             <tr>
//               <th className="py-3 px-4 border text-center">#</th>
//               <th className="py-3 px-4 border text-left">Product Title</th>
//               <th className="py-3 px-4 border text-right">Price</th>
//               <th className="py-3 px-4 border text-right">Quantity</th>
//               <th className="py-3 px-4 border text-right">Stock Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {report.map((item, index) => (
//               <tr key={index} className="hover:bg-white">
//                 <td className="py-2 px-4 border text-center">{index + 1}</td>
//                 <td className="py-2 px-4 border">{item.title}</td>
//                 <td className="py-2 px-4 border text-right">${item.price}</td>
//                 <td className="py-2 px-4 border text-right">{item.totalQuantity}</td>
//                 <td className="py-2 px-4 border text-right">
//                   ${(item.price * item.totalQuantity).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className="bg-white font-bold">
//             <tr>
//               <td colSpan="3" className="py-3 px-4 border text-right">
//                 Totals:
//               </td>
//               <td className="py-3 px-4 border text-right">{totalQuantity}</td>
//               <td className="py-3 px-4 border text-right">${totalValue.toFixed(2)}</td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Stock;



import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Stock = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockReport = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/products/stock`
        );
        setReport(res.data.stockReport);
      } catch (err) {
        console.error("Error fetching stock report", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockReport();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading Stock Report...</div>;
  }

  // 🔹 Calculate Totals
  const totalQuantity = report.reduce((sum, item) => sum + item.totalQuantity, 0);
  const totalValue = report.reduce(
    (sum, item) => sum + item.totalQuantity * item.price,
    0
  );

  // 🔹 Export to PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("📦 Stock Report", 14, 20);

    // Table
    const tableColumn = ["#", "Product Title", "Price ($)", "Quantity", "Stock Value ($)"];
    const tableRows = [];

    report.forEach((item, index) => {
      tableRows.push([
        index + 1,
        item.title,
        item.price,
        item.totalQuantity,
        (item.price * item.totalQuantity).toFixed(2),
      ]);
    });

    // Add Totals row
    tableRows.push([
      "",
      "TOTAL",
      "",
      totalQuantity,
      totalValue.toFixed(2),
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("stock_report.pdf");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Stock Report</h1>
        <button
          onClick={downloadPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
        >
          ⬇️ Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-white text-gray-700">
            <tr>
              <th className="py-3 px-4 border text-center">#</th>
              <th className="py-3 px-4 border text-left">Product Title</th>
              <th className="py-3 px-4 border text-right">Price</th>
              <th className="py-3 px-4 border text-right">Quantity</th>
              <th className="py-3 px-4 border text-right">Stock Value</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={index} className="hover:bg-white">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{item.title}</td>
                <td className="py-2 px-4 border text-right">${item.price}</td>
                <td className="py-2 px-4 border text-right">{item.totalQuantity}</td>
                <td className="py-2 px-4 border text-right">
                  ${(item.price * item.totalQuantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-white font-bold">
            <tr>
              <td colSpan="3" className="py-3 px-4 border text-right">
                Totals:
              </td>
              <td className="py-3 px-4 border text-right">{totalQuantity}</td>
              <td className="py-3 px-4 border text-right">${totalValue.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Stock;
