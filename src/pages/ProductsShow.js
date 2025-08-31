import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { CartProvider } from "../hooks";
import Header from "../components/Shared/Header/Header";
import Loader from "../components/Loader";

const ProductsShow = () => {
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/products/show`);
        const products = res.data.products;

        const titleMap = new Map();
        products.forEach((product) => {
          const title = product.title?.toLowerCase();
          if (title && !titleMap.has(title)) {
            titleMap.set(title, product);
          }
        });

        const uniqueByTitle = Array.from(titleMap.values());
        setUniqueProducts(uniqueByTitle);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleNavigate = (title) => {
    const urlSafeTitle = encodeURIComponent(
      title.toLowerCase().replace(/\s+/g, "-")
    );
    navigate(`/products-gallery/${urlSafeTitle}`);
  };

  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      <div className="pt-10 px-4 my-14">
        <h2 className="text-xl sm:text-2xl font-serif px-4 sm:px-8 text-gray-700">
          CATEGORIES
        </h2>
        <hr className="mx-4 sm:mx-8 border-black my-2" />

    
        {loading ? (
          <div className="flex justify-center  items-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8">
            {uniqueProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products to show.
              </p>
            ) : (
              uniqueProducts.map((product) => (
                <div
                  key={product._id}
                  className="transition-transform duration-300 cursor-pointer overflow-hidden transform hover:scale-105 text-center"
                  onClick={() => handleNavigate(product.title)}
                >
                  <div className="w-full aspect-[3/4] bg-white p-2 sm:p-4">
                    <img
                      src={
                        product.variants?.[0]?.imageUrl?.startsWith("http")
                          ? product.variants[0].imageUrl
                          : "https://via.placeholder.com/200"
                      }
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-serif text-gray-800">
                      {product.title || "No Title"}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsShow;
