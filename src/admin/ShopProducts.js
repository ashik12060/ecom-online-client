import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";

export default function ShopProducts() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
      .then((res) => setShops(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
  if (selectedShopId) {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/${selectedShopId}`)
      .then((res) => setProducts(res.data.products)) 
      .catch((err) => console.error(err));
  } else {
    setProducts([]);
  }
}, [selectedShopId]);

  return (
    <div>
      <h2>Shop Products</h2>

      <select
        onChange={(e) => setSelectedShopId(e.target.value)}
        value={selectedShopId}
      >
        <option value="">Select a shop</option>
        {shops.map((shop) => (
          <option key={shop._id} value={shop._id}>
            {shop.name}
          </option>
        ))}
      </select>

      {selectedShopId && (
        products.length === 0 ? (
          <p>No products assigned.</p>
        ) : (
          products.map((item) => (
            <div
              key={item._id}
              style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}
            >
              <h3>
                {item.product
                  ? `${item.product.title} - $${item.product.price}`
                  : "Product not found"}
              </h3>
              <p>{item.product ? item.product.content : "No description available"}</p>

              <table border="1" cellPadding="5" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Assigned Quantity</th>
                    <th>Total Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {item.variants.map((v) => (
                    <tr key={v._id}>
                      <td>{v.variant ? v.variant.size : "N/A"}</td>
                      <td>{v.variant ? v.variant.color : "N/A"}</td>
                      <td>{v.assignedQuantity}</td>
                      <td>{v.variant ? v.variant.quantity : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )
      )}
    </div>
  );
}
