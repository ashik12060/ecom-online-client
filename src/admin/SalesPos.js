import React, { useState, useEffect } from 'react';
import axiosInstance from '../pages/axiosInstance';

const SalesPos = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/sales`);
        setSales(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch sales data');
      }
    };

    fetchSales();
  }, []);

  // Handle delete sale
  const handleDeleteSale = async (saleId) => {
    try {
      await axiosInstance.delete(`/api/sales/${saleId}`);
      setSales(sales.filter((sale) => sale._id !== saleId)); // Remove the deleted sale from the state
    } catch (error) {
      setError('Failed to delete the sale');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Sales List</h1>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-white">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-white">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-white">Sell Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-white">Quantity Sold</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale._id} className="border-b hover:bg-white">
                  {sale.products.map((product) => (
                    <React.Fragment key={product.productId}>
                      <td className="px-6 py-4 text-sm text-gray-700">{product.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">${product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(sale.timestamp).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{product.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          onClick={() => handleDeleteSale(sale._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-sm text-gray-700 text-center">
                  No sales available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPos;
