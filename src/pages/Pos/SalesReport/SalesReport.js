import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../axiosInstance";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const fetchData = async (from, to) => {
    setLoading(true);
    try {
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;

      const salesRes = await axiosInstance.get("/api/sales", { params });
      setSalesData(Array.isArray(salesRes.data) ? salesRes.data : []);

      const ordersRes = await axiosInstance.get("/api/orders", { params });
      setOrderData(Array.isArray(ordersRes.data) ? ordersRes.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSalesData([]);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }
    fetchData(fromDate, toDate);
  };


const handlePrint = () => {
  if (!printRef.current) return;

  const content = printRef.current.innerHTML;
  const printWindow = window.open('', '_blank', 'width=800,height=600');

  if (!printWindow) {
    alert('Pop-up blocked! Please allow pop-ups for this site to print.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Report</title>
        <style>
          @page {
            size: auto;
            margin: 0;
          }
          html, body {
            margin: 0;
            padding: 5mm 10mm; 
            font-family: Arial, sans-serif;
          }
          h3, h4 {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .header {
            margin: 0;
            padding: 10px 10;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
           margin-start:10px;
            text-align: left;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
          }
          th {
            background-color: #f0f0f0;
          }
          tfoot td {
            font-weight: 700;
            background-color: #e0ffe0;
          }
        </style>
      </head>
      <body>
        <div class="header mb-5">
          <h3>E-commerce</h3>
          <h4>Sales and Orders Report</h4>
        </div>
        <div>${content}</div>
      </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};


  const deliveredOrders = orderData.filter((order) => order.status === "Delivered");

  const salesRows = salesData.flatMap((sale) =>
    sale.products.map((product, idx) => ({
      id: `${sale._id}-${idx}`,
      rawDate: sale.timestamp,
      date: new Date(sale.timestamp).toLocaleDateString(),
      items: product.title,
       discount: product.discountAmount || 0,
      quantity: product.quantity,
      price: product.price ? product.price * product.quantity : 0,
      payment: sale.paymentMethod,
      type: "Sale",
    }))
  );

  const orderRows = deliveredOrders.flatMap((order) =>
    order.orderItems.map((item, idx) => ({
      id: `${order._id}-${idx}`,
      rawDate: order.orderDate,
      date: new Date(order.orderDate).toLocaleDateString(),
      items: item.title,
      quantity: item.quantity,
      price: item.price * item.quantity,
      payment: order.customerDetails?.paymentMethod || "N/A",
      type: "Order",
    }))
  );

  const combinedRows = [...salesRows, ...orderRows].sort(
    (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
  );

  const totals = combinedRows.reduce(
    (acc, row) => {
      acc.totalQuantity += row.quantity;
      acc.totalPrice += row.price;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 mt-4">Sales & Orders Report</h2>

      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="fromDate">From Date</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="toDate">To Date</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Filter"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Print Report
        </button>
      </div>


      {combinedRows.length ? (
  <div ref={printRef}>
    <div className="text-center mb-4">
    </div>
    <table className="min-w-full border border-gray-300  ">
      <thead className="bg-white">
        <tr>
          <th className="p-2 border">#</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Items</th>
          <th className="p-2 border">Quantity</th>
          <th className="p-2 border">Discount</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Payment</th>
        </tr>
      </thead>
      <tbody>
        {combinedRows.map((row, index) => (
          <tr key={row.id} className="border-t">
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">{row.date}</td>
            <td className="p-2 border">{row.items}</td>
            <td className="p-2 border">{row.quantity}</td>
            <td className="p-2 border">৳{(row.discount || 0).toLocaleString()}</td>
            <td className="p-2 border">৳{row.price.toLocaleString()}</td>
            <td className="p-2 border">{row.payment}</td>
          </tr>
        ))}
        <tr className="totals-row bg-white font-bold">
          <td colSpan="3" className="p-2 border text-right">Total:</td>
          <td className="p-2 border">{totals.totalQuantity}</td>
          
          <td className="p-2 border">৳{totals.totalPrice.toLocaleString()}</td>
          <td className="p-2 border"></td>
        </tr>
      </tbody>
    </table>
  </div>
) : (
  <p className="mt-6">No sales or orders data available for this date range.</p>
)}

    </div>
  );
};

export default SalesReport;

