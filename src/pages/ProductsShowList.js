// import React, { useEffect, useState } from "react";
// import axiosInstance from "./axiosInstance";
// import Loader from "../components/Loader";

// const ProductsShowList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 85;

//   const fetchProducts = async (page = 1) => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/all?page=${page}`
//       );

//       if (data.success) {
//         setProducts(data.products);
//         setTotalPages(data.pagination.totalPages);
//         setCurrentPage(data.pagination.currentPage);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-2xl font-semibold mb-4">Products</h2>

//       {loading ? (
//         <Loader />
//       ) : products.length > 0 ? (
//         <ul className="space-y-2">
//           {products.map((product, index) => (
//             <li
//               key={index}
//               className="flex justify-between border-b py-2 px-4 rounded hover:bg-white transition"
//             >
//               <span>{(currentPage - 1) * itemsPerPage + index + 1}. {product.title}</span>
//               {/* <span>${product.price.toFixed(2)}</span> */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products found.</p>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 bg-white rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded ${
//               currentPage === page ? "bg-green-500 text-white" : "bg-white"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 bg-white rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductsShowList;



import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import Loader from "../components/Loader";

const ProductsShowList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reverse, setReverse] = useState(false); // Toggle for reverse

  const itemsPerPage = 85; // First batch size

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/all`
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  // Normal batch: first 80
  const normalProducts = products.slice(0, itemsPerPage);

  // Reverse batch: remaining products
  const reverseProducts = products.slice(itemsPerPage).reverse();

  const displayedProducts = reverse ? reverseProducts : normalProducts;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button
          onClick={() => setReverse(!reverse)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {reverse ? "Show Normal (1-80)" : "Show Remaining (81+)"}
        </button>
      </div>

      {displayedProducts.length > 0 ? (
        <ul className="space-y-2">
          {displayedProducts.map((product, index) => (
            <li
              key={product._id}
              className="flex justify-between border-b py-2 px-4 rounded hover:bg-white transition"
            >
              <span>{index + 1}. {product.title}</span>
              <span>${product.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsShowList;
