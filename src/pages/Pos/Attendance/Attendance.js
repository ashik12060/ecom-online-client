// import React, { useState } from 'react';

// function Attendance() {
//   const [timeIn, setTimeIn] = useState('12:40 PM');
//   const [timeOut, setTimeOut] = useState('00:00:00');

//   const handleSignIn = () => {
//     setTimeIn(new Date().toLocaleTimeString());
//   };

//   const handleSignOut = () => {
//     setTimeOut(new Date().toLocaleTimeString());
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Shop Attendant</h1>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="flex flex-col items-center">
//             <span className="text-sm text-gray-500">Time In</span>
//             <span className="mt-1 text-lg font-semibold text-green-600">{timeIn}</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-sm text-gray-500">Time Out</span>
//             <span className="mt-1 text-lg font-semibold text-red-600">{timeOut}</span>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={handleSignIn}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           >
//             SIGN IN
//           </button>
//           <button
//             onClick={handleSignOut}
//             className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
//           >
//             SIGN OUT
//           </button>
//         </div>

//         <button
//           className="w-full mt-6 bg-white hover:bg-white0 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Attendance;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const Attendance = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Selected employee ID
  const [employeeName, setEmployeeName] = useState(''); // Employee name for display

  useEffect(() => {
    // Fetch all employees for the dropdown
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/employees'); // Adjust endpoint as needed
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCheckIn = async () => {
    if (!selectedEmployee) return alert('Please select an employee.');

    try {
      const response = await axiosInstance.post('/api/attendance/checkin', {
        employeeId: selectedEmployee,
        name: employeeName,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error during check-in.');
    }
  };

  const handleCheckOut = async () => {
    if (!selectedEmployee) return alert('Please select an employee.');

    try {
      const response = await axiosInstance.post('/api/attendance/checkout', {
        employeeId: selectedEmployee,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error during check-out.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Employee Attendance</h2>

      {/* Dropdown for selecting employee */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => {
            setSelectedEmployee(e.target.value);
            const selected = employees.find(emp => emp._id === e.target.value);
            setEmployeeName(selected?.name || '');
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select an Employee --</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {/* Check In and Check Out Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCheckIn}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="bg-red-500 text-white px-4 py-2 rounded shadow"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Attendance;
