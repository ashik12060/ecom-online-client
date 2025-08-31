import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const SupplierSetup = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '', // New address field
  });

  // State to store suppliers data
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers data on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/suppliers`
        );
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to backend to create supplier
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/suppliers/create`,
        formData
      );

      if (response.data.success) {
        alert('Supplier added successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '', // Reset address field after submission
        });
        // After adding a supplier, refetch the list
        const updatedSuppliers = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/suppliers`
        );
        setSuppliers(updatedSuppliers.data.suppliers);
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Error adding supplier. Please try again.');
    }
  };

  return (
    <div className="flex justify-center flex-col lg:flex-row space-y-8 lg:space-x-12 p-6 bg-white rounded-lg shadow-lg">
      {/* Form Section */}
      <div className="max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Add Supplier
          </button>
        </form>
      </div>

      {/* Suppliers Table */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Suppliers List</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Name</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Email</th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{supplier.name}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{supplier.phone}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{supplier.email}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierSetup;
