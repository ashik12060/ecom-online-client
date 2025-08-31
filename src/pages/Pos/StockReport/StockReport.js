import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const StockReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/stock`);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          alert("Failed to load stock report");
        }
      } catch (error) {
        console.error("Error fetching stock report:", error);
        alert("Error fetching stock report. Check console for details.");
      }
      setLoading(false);
    };

    fetchStock();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Report</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-white">
              <th className="border p-2">#</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-white">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2 text-center">{product.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockReport;

