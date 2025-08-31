import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const CustomerSetup = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    profession: "",
  });

  // Fetch customers when the component is mounted
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/customers`
        );
        setCustomers(response.data); // Assuming response.data contains the list of customers
      } catch (error) {
        console.error("Error fetching customers:", error);
        alert("Error fetching customer data");
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/add-customer`,
        customerData
      );
      alert(response.data.message); // Show success message
      // Optionally reset form fields after success
      setCustomerData({
        name: "",
        phone: "",
        email: "",
        address: "",
        profession: "",
      });

      // Add the new customer to the list of customers
      setCustomers((prev) => [
        ...prev,
        { id: customers.length + 1, ...customerData },
      ]);

      setIsFormVisible(false); // Hide form after adding the customer
    } catch (error) {
      alert("Error adding customer: " + error.response?.data.message);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Customer Setup</h1>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewButtonClick}
        >
          {isFormVisible ? 'Cancel' : '+ New'}
        </button>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isFormVisible && (
        <form
          className="bg-white p-4 rounded mb-4"
          onSubmit={handleAddCustomer}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Profession:</label>
              <input
                type="text"
                name="profession"
                value={customerData.profession}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Customer
          </button>
        </form>
      )}

      <table className="min-w-full border-separate bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Address</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Profession</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b hover:bg-white transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-800">{customer.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{customer.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{customer.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{customer.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{customer.address}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{customer.profession}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSetup;
