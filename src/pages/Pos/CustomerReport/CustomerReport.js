// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function CustomerReport() {
//   const [showReport, setShowReport] = useState(false);
//   const [reportData, setReportData] = useState(null);

//   const handleReport = () => {
//     // Mock report data
//     const data = {
//       fromDate: "2024-12-01",
//       toDate: "2024-12-08",
//       customerId: "CUST123",
//       category: "Category 1",
//       transactions: [
//         { date: "2024-12-01", description: "Purchase", amount: 500 },
//         { date: "2024-12-03", description: "Return", amount: -200 },
//         { date: "2024-12-05", description: "Purchase", amount: 300 },
//       ],
//     };

//     setReportData(data);
//     setShowReport(true);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6 bg-white min-h-screen">
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-center">Customer Report</h1>

//       {!showReport ? (
//         <>
//           {/* Main Content */}
//           <div className="flex space-x-6">
//             {/* Report Options */}
//             <div className="w-1/3 border p-4 space-y-4">
//               <div>
//                 <input type="radio" name="reportType" id="pointBalance" className="mr-2" />
//                 <label htmlFor="pointBalance">Customer Point Balance</label>
//               </div>
//               <div>
//                 <input type="radio" name="reportType" id="pointLedger" className="mr-2" />
//                 <label htmlFor="pointLedger">Single Customer Point Ledger</label>
//               </div>
//               {/* Add remaining options here */}
//             </div>

//             {/* Filters */}
//             <div className="w-2/3 border p-4 space-y-6">
//               <div className="flex space-x-4">
//                 <div className="w-1/2">
//                   <label className="block font-semibold">From</label>
//                   <input type="date" className="border p-2 w-full" />
//                 </div>
//                 <div className="w-1/2">
//                   <label className="block font-semibold">To</label>
//                   <input type="date" className="border p-2 w-full" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block font-semibold">Customer Id/Card/Mobile</label>
//                 <input type="text" className="border p-2 w-full" placeholder="Enter ID or Mobile" />
//               </div>
//               <div>
//                 <label className="block font-semibold">Category</label>
//                 <select className="border p-2 w-full">
//                   <option>All</option>
//                   <option>Category 1</option>
//                   <option>Category 2</option>
//                   <option>Category 3</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={handleReport}
//               className="bg-blue-500 text-white px-6 py-2 rounded"
//             >
//               Report
//             </button>
//             <Link to='/pos' className="bg-white0 text-white px-6 py-2 rounded">
//               Close
//             </Link>
//           </div>
//         </>
//       ) : (
//         // Report View Section
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-bold text-center mb-4">Customer Report Summary</h2>
//           <p>
//             <strong>From:</strong> {reportData.fromDate} <strong>To:</strong> {reportData.toDate}
//           </p>
//           <p>
//             <strong>Customer ID:</strong> {reportData.customerId}
//           </p>
//           <p>
//             <strong>Category:</strong> {reportData.category}
//           </p>

//           <table className="w-full border-collapse border border-gray-300 mt-4">
//             <thead>
//               <tr className="bg-white">
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.transactions.map((transaction, index) => (
//                 <tr key={index} className="hover:bg-white">
//                   <td className="border p-2">{transaction.date}</td>
//                   <td className="border p-2">{transaction.description}</td>
//                   <td className="border p-2">${transaction.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-center space-x-4 mt-6">
//             <button
//               onClick={handlePrint}
//               className="bg-green-500 text-white px-6 py-2 rounded"
//             >
//               Print
//             </button>
//             <button
//               onClick={() => setShowReport(false)}
//               className="bg-white0 text-white px-6 py-2 rounded"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomerReport;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

function CustomerReport() {
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/users`
        );
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleReport = () => {
    if (!selectedUser) {
      alert("Please select a user to generate the report.");
      return;
    }

    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }

    const user = users.find((user) => user._id === selectedUser);

    const mockTransactions = [
      { date: "2024-12-01", description: "Purchase", amount: 500 },
      { date: "2024-12-03", description: "Return", amount: -200 },
      { date: "2024-12-05", description: "Purchase", amount: 300 },
    ];

    // Filter transactions based on the selected date range
    const filteredTransactions = mockTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      return transactionDate >= startDate && transactionDate <= endDate;
    });

    const data = {
      fromDate,
      toDate,
      customerId: user._id,
      name: user.name,
      email: user.email,
      transactions: filteredTransactions,
    };

    setReportData(data);
    setShowReport(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Customer Report</h1>

      {!showReport ? (
        <>
          <div className="flex space-x-6">
            <div className="w-1/3 border p-4 space-y-4">
              <h2 className="text-lg font-semibold">Select a Customer</h2>
              {loading ? (
                <p>Loading customers...</p>
              ) : (
                <select
                  className="border p-2 w-full"
                  onChange={(e) => setSelectedUser(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select a Customer --
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="w-2/3 border p-4 space-y-6">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block font-semibold">From</label>
                  <input
                    type="date"
                    className="border p-2 w-full"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-semibold">To</label>
                  <input
                    type="date"
                    className="border p-2 w-full"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReport}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Generate Report
            </button>
            <Link to="/pos" className="bg-white0 text-white px-6 py-2 rounded">
              Close
            </Link>
          </div>
        </>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">Customer Report</h2>
          <p>
            <strong>From:</strong> {reportData.fromDate} <strong>To:</strong>{" "}
            {reportData.toDate}
          </p>
          <p>
            <strong>Customer ID:</strong> {reportData.customerId}
          </p>
          <p>
            <strong>Name:</strong> {reportData.name}
          </p>
          <p>
            <strong>Email:</strong> {reportData.email}
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
              {reportData.transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="border p-2">{transaction.date}</td>
                  <td className="border p-2">{transaction.description}</td>
                  <td className="border p-2">${transaction.amount}</td>
                </tr>
              ))}
              {reportData.transactions.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="border p-2 text-center text-gray-500"
                  >
                    No transactions found for the selected date range.
                  </td>
                </tr>
              )}
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

export default CustomerReport;
