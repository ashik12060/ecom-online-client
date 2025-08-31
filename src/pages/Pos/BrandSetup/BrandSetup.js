
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance'; // Ensure axiosInstance is properly configured

function BrandSetup() {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    brandName: '',
    phoneNumber: '',
    address: '',
    origin: '',
  });

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/brands`);
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // Add brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/create/brand`, formData);
      fetchBrands();
      setFormData({
        brandName: '',
        phoneNumber: '',
        address: '',
        origin: '',
      });
      alert('Brand created successfully');
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
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
      <h1 className="text-3xl font-bold text-center mb-6">Brand Setup</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form for adding a new brand */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Brand Name:</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
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
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Origin:</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium rounded px-4 py-2 w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Brand
          </button>
        </form>

        {/* Table for displaying brands */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Brand List</h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-white">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Brand Name</th>
                <th className="border border-gray-300 p-2 text-left">Phone Number</th>
                <th className="border border-gray-300 p-2 text-left">Address</th>
                <th className="border border-gray-300 p-2 text-left">Origin</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id} className="odd:bg-white even:bg-white">
                  <td className="border border-gray-300 p-2">{brand.brandName}</td>
                  <td className="border border-gray-300 p-2">{brand.phoneNumber}</td>
                  <td className="border border-gray-300 p-2">{brand.address}</td>
                  <td className="border border-gray-300 p-2">{brand.origin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BrandSetup;
