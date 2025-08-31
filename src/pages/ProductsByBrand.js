// src/components/ProductsByBrand.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const ProductsByBrand = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchByBrand = async () => {
      try {
        const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/brand/${brand}`);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch brand products:", error);
      }
    };

    fetchByBrand();
  }, [brand]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products under this Brand</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded shadow hover:shadow-lg">
            <img
              src={product.variants[0]?.imageUrl || "/placeholder.png"}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-2">
              <h3 className="font-semibold">{product.title}</h3>
              <p>৳{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByBrand;
