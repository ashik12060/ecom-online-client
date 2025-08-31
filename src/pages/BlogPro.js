// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import axiosInstance from "./axiosInstance";
// import Loader from "../components/Loader";
// import ProductCard from "../components/ProductCard";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const BlogPro = ({ searchQuery, setSearchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   const [progress, setProgress] = useState(0);

//   const fetchProducts = async (page = 1) => {
//     setLoading(true);
//     setProgress(0);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
//       );

//       if (data.success) {
//         // Make sure backend returns only needed fields to reduce payload size
//         setProducts(data.products);
//         setTotalPages(data.totalPages);
//         setCurrentPage(data.currentPage);

//         setProgress(
//           Math.round((data.products.length / data.totalProducts) * 100)
//         );
//       }
//     } 
//     catch (error) {
//       console.error("Error fetching products", error);
//     } 
//     finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const displayedProducts = searchQuery
//     ? products.filter((p) =>
//         p.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : products;

//   return (
//     <div className="bg-white min-h-screen">
//       <h2 className="text-center text-3xl my-10 font-serif">CATALOGUE</h2>

//       <div className="flex justify-end mr-10 mb-8">
//         <p className="text-center font-mono px-20 w-2/3 container">
//           Our creative team craft the most innovative and eye-catching designs
//           that provide the customers to select their desired style.
//         </p>
//         <input
//           type="text"
//           placeholder="🔍 Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           autoComplete="off"
//           className="w-64 max-w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
//         />
//       </div>

//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {loading ? (
//             // <Loader />
//             <p> Loading... {progress}%</p>
//           ) : displayedProducts.length > 0 ? (
//             displayedProducts.map((product) => (
//               <div key={product._id} className="col-span-1">
//                 <ProductCard
//                   id={product._id}
//                   title={product.title}
//                   price={product.price}
//                   variants={product.variants}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-600">
//               No products found.
//             </p>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 text-center flex justify-center space-x-2">
//           <button
//             onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 bg-white rounded disabled:opacity-50"
//           >
//             <FontAwesomeIcon icon={faAngleLeft} />
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === page ? "bg-green-500 text-white" : "bg-white"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             onClick={() =>
//               currentPage < totalPages && setCurrentPage(currentPage + 1)
//             }
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 bg-white rounded disabled:opacity-50"
//           >
//             <FontAwesomeIcon icon={faAngleRight} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPro;

import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../components/ProductCard";

const BlogPro = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
      );

      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const displayedProducts = searchQuery
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-extrabold tracking-wide text-violet-600 font-serif">
          CATALOGUE
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-mono">
          Discover the most innovative and eye-catching designs crafted by our
          creative team to match your style.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          className="w-72 sm:w-96 border border-gray-300 rounded-full px-4 py-2 text-sm shadow-md 
                     focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all duration-200"
        />
      </div>

      {/* Products */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-500">
              Loading products...
            </p>
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                variants={product.variants}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center space-x-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white rounded hover:bg-violet-600 hover:text-white transition disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded transition ${
                currentPage === page
                  ? "bg-violet-600 text-white"
                  : "bg-white hover:bg-violet-600 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-white rounded hover:bg-violet-600 hover:text-white transition disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPro;


