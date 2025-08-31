import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import Footer from "../components/Shared/Footer/Footer";

const ProductGroupByTitle = () => {
  const { title } = useParams();
  const [matchedProducts, setMatchedProducts] = useState([]);


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/show`);
      const allProducts = res.data.products;

      const filtered = allProducts.filter(
        (product) =>
          product.title?.toLowerCase().replace(/\s+/g, "-") === title.toLowerCase()
      );

      setMatchedProducts(filtered);
    } catch (error) {
      console.error("Error fetching products by title:", error);
    }
  };

  fetchProducts();
}, [title]);


  return (
   
<>

<div className="p-4 sm:p-6 lg:p-10">
  <h2 className="text-2xl font-serif  font-bold mb-6 text-center text-gray-800">
      NEW ARRIVAL
  </h2>
  <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {matchedProducts.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No products found for this title.
        </p>
      ) : (
        matchedProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="overflow-hidden transition duration-300"
          >
            <div className="w-full h-[350px] sm:h-[380px] md:h-[400px] lg:h-[450px] xl:h-[480px]">
              <img
                src={
                  product.variants?.[0]?.imageUrl?.startsWith("http")
                    ? product.variants[0].imageUrl
                    : "https://via.placeholder.com/300x450"
                }
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.title || "No Title"}
              </h3>
            </div>
          </Link>
        ))
      )}
    </div>
  </div>
</div>

<Footer />
</>


  ); 
};

export default ProductGroupByTitle;
