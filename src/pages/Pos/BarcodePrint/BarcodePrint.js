import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

function BarcodePrint() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/products/show`
        );
        console.log("Fetched products:", data.products); // Log the response
        setProducts(data.products); // Assuming the response contains the product list
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle print
  const handlePrint = (barcode, title,price) => {
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(`
      <html>
        <body>
          <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2 className="fw-bold ">E-commerce</h2>
            <h3 style="margin-bottom: 10px;">${title}</h3>
           
            <img src="${barcode}" alt="Barcode" style="width: 100%; max-width: 400px;" />
            <h3 style="font-weight: bold; font-size:: 20px">Price: ${price.toFixed(2)}</h3>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Product Barcodes
      </h1>

      {/* Products Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 text-left">Product Name</th>
                <th className="px-4 text-left">Barcode</th>
                <th className="px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const subCategoryName = product.subcategory?.name || "N/A"; // Handle missing subcategory
                return (
                  <tr key={product._id} className="border-b">
                    <td className="px-4">{product.title}</td>
                    <td className="px-4">
                      <h5 className="fw-bold">E-commerce</h5>
                    <p>{product.title}</p>
                      {product.barcode ? (
                        <img
                          src={product.barcode}
                          alt={`${product.title} Barcode`}
                          className="w-24 h-24 object-contain"
                        />
                        
                      ) : (
                        <p>No barcode available</p>
                      )}
                      <p className="fw-bold">Price: {product.price?.toFixed(2)}</p>
                    </td>
                    <td className="px-4">
                      {product.barcode && (
                        <button
                          onClick={() =>
                            handlePrint(
                              product.barcode,
                              product.title,
                              product.price,
                              product.price
                            )
                          }
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                          Print Barcode
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Footer Button */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-white0 text-white py-2 px-4 rounded hover:bg-white"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default BarcodePrint;


