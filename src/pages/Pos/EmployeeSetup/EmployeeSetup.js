import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance'; // Ensure axiosInstance is properly configured

function EmployeeSetup() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/employees`);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Add employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/create/employee`, formData);
      fetchEmployees();
      setFormData({
        name: '',
        phoneNumber: '',
      });
      alert("Employees created successfully");
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };



  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Setup</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium rounded px-4 py-2 w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Employee
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Employee List</h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-white">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="odd:bg-white even:bg-white">
                  <td className="border border-gray-300 p-2">{employee.name}</td>
                  <td className="border border-gray-300 p-2">{employee.phoneNumber}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSetup;
