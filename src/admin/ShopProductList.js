import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import ShopProductManager from "./ShopProductManager";

export default function ShopProducts() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("");
  const [products, setProducts] = useState([]);

  const [activeTab, setActiveTab] = useState("manager");

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
      .then((res) => setShops(res.data))
      .catch((err) => console.error(err));
  }, []);

  

axiosInstance
  .get(`${process.env.REACT_APP_API_URL}/api/shops/${selectedShopId}/products`)
  .then((res) => {
    // console.log("Full response data:", res.data);
    if (Array.isArray(res.data)) {
      res.data.forEach((item, idx) => {
        // console.log(`Product ${idx}:`, item.product ? item.product.title : "No product info");
      });
    } else {
      // console.log("Response is not an array:", res.data);
    }
    setProducts(res.data);
  })
  .catch((err) => console.error(err));



  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tabs Navigation */}
      <ul
        className="nav nav-pills mb-6 flex flex-wrap gap-2"
        id="shopTabs"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              activeTab === "manager" ? "active" : ""
            } border border-gray-300 rounded-md px-4 py-2`}
            id="shopProductManager-tab"
            type="button"
            role="tab"
            onClick={() => setActiveTab("manager")}
            aria-controls="shopProductManager"
            aria-selected={activeTab === "manager"}
          >
            Product Manager
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              activeTab === "products" ? "active" : ""
            } border border-gray-300 rounded-md px-4 py-2`}
            id="shopProducts-tab"
            type="button"
            role="tab"
            onClick={() => setActiveTab("products")}
            aria-controls="shopProducts"
            aria-selected={activeTab === "products"}
          >
            Shop Products
          </button>
        </li>
      </ul>

      {/* Tabs Content */}
      <div className="tab-content" id="shopTabsContent">
        {/* Tab 1: ShopProductManager */}
        <div
          className={`tab-pane fade ${
            activeTab === "manager" ? "show active" : ""
          }`}
          id="shopProductManager"
          role="tabpanel"
          aria-labelledby="shopProductManager-tab"
          tabIndex="0"
        >
          <ShopProductManager />
        </div>

        {/* Tab 2: Shop Products List */}
        <div
          className={`tab-pane fade ${
            activeTab === "products" ? "show active" : ""
          }`}
          id="shopProducts"
          role="tabpanel"
          aria-labelledby="shopProducts-tab"
          tabIndex="0"
        >
          <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Shop Products
            </h2>

            <select
              onChange={(e) => setSelectedShopId(e.target.value)}
              value={selectedShopId}
              className="w-full md:w-1/3 mb-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select a shop</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>

            {selectedShopId &&
              (products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                  No products assigned.
                </p>
              ) : (
                products.map((item) => {
                  const shopName =
                    shops.find((shop) => shop._id === selectedShopId)?.name ||
                    "N/A";

                  return (
                    <div
                      key={item._id}
                      className="mb-8 border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition"
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.product ? item.product.title : "No Product Info"}
                      </h3>
                      <p className="text-lg text-gray-700 mb-1">
                        <span className="font-semibold">Price:</span> $
                        {item.product ? item.product.price : "N/A"}
                      </p>
                      <p className="text-lg text-gray-700 mb-4">
                        <span className="font-semibold">Brand:</span>{" "}
                        {item.product?.brand?.name || "N/A"}
                      </p>

                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-left">
                          <thead>
                            <tr className="bg-blue-100">
                              <th className="px-4 py-2 border border-gray-300">
                                Sub Barcode
                              </th>
                              <th className="px-4 py-2 border border-gray-300">
                                Assigned Quantity
                              </th>
                              <th className="px-4 py-2 border border-gray-300">
                                Total Stock (Variant Quantity)
                              </th>
                              <th className="px-4 py-2 border border-gray-300">
                                Shop Name
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.variants.map((v) => (
                              <tr
                                key={v._id}
                                className="hover:bg-blue-50 transition"
                              >
                                <td className="px-4 py-2 border border-gray-300">
                                  {v.variant ? v.variant.subBarcode : "N/A"}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  {v.assignedQuantity}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  {v.variant ? v.variant.quantity : "N/A"}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  {shopName}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import ShopProductManager from "./ShopProductManager";

// export default function ShopProducts() {
//   const [shops, setShops] = useState([]);
//   const [selectedShopId, setSelectedShopId] = useState("");
//   const [products, setProducts] = useState([]);
//   const [activeTab, setActiveTab] = useState("manager");

//   // ✅ Fetch all shops
//   useEffect(() => {
//     axiosInstance
//       .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
//       .then((res) => setShops(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ✅ Fetch products only when a shop is selected
//   useEffect(() => {
//     if (!selectedShopId) {
//       setProducts([]); // reset if no shop selected
//       return;
//     }

//     axiosInstance
//       .get(`${process.env.REACT_APP_API_URL}/api/shops/${selectedShopId}/products`)
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setProducts(res.data);
//         } else {
//           setProducts([]);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [selectedShopId]); // 👈 runs only when shop changes

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Tabs Navigation */}
//       <ul className="nav nav-pills mb-6 flex flex-wrap gap-2">
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "manager" ? "active" : ""} border border-gray-300 rounded-md px-4 py-2`}
//             onClick={() => setActiveTab("manager")}
//           >
//             Product Manager
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "products" ? "active" : ""} border border-gray-300 rounded-md px-4 py-2`}
//             onClick={() => setActiveTab("products")}
//           >
//             Shop Products
//           </button>
//         </li>
//       </ul>

//       <div className="tab-content">
//         {/* Tab 1 */}
//         {activeTab === "manager" && <ShopProductManager />}

//         {/* Tab 2 */}
//         {activeTab === "products" && (
//           <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-3xl font-semibold mb-6 text-gray-800">Shop Products</h2>

//             {/* Shop Dropdown */}
//             <select
//               onChange={(e) => setSelectedShopId(e.target.value)}
//               value={selectedShopId}
//               className="w-full md:w-1/3 mb-8 p-3 border border-gray-300 rounded-md"
//             >
//               <option value="">Select a shop</option>
//               {shops.map((shop) => (
//                 <option key={shop._id} value={shop._id}>
//                   {shop.name}
//                 </option>
//               ))}
//             </select>

//             {/* Products Table */}
//             {selectedShopId &&
//               (products.length === 0 ? (
//                 <p className="text-center text-gray-500 text-lg">No products assigned.</p>
//               ) : (
//                 products.map((item) => {
//                   const shopName =
//                     shops.find((shop) => shop._id === selectedShopId)?.name || "N/A";

//                   return (
//                     <div
//                       key={item._id}
//                       className="mb-8 border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition"
//                     >
//                       <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                         {item.product ? item.product.title : "No Product Info"}
//                       </h3>
//                       <p className="text-lg text-gray-700 mb-1">
//                         <span className="font-semibold">Price:</span> $
//                         {item.product ? item.product.price : "N/A"}
//                       </p>
//                       <p className="text-lg text-gray-700 mb-4">
//                         <span className="font-semibold">Brand:</span>{" "}
//                         {item.product?.brand?.name || "N/A"}
//                       </p>

//                       <div className="overflow-x-auto">
//                         <table className="min-w-full border-collapse border border-gray-300 text-left">
//                           <thead>
//                             <tr className="bg-blue-100">
//                               <th className="px-4 py-2 border border-gray-300">Sub Barcode</th>
//                               <th className="px-4 py-2 border border-gray-300">Assigned Quantity</th>
//                               <th className="px-4 py-2 border border-gray-300">Total Stock</th>
//                               <th className="px-4 py-2 border border-gray-300">Shop Name</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {item.variants.map((v) => (
//                               <tr key={v._id} className="hover:bg-blue-50 transition">
//                                 <td className="px-4 py-2 border border-gray-300">
//                                   {v.variant ? v.variant.subBarcode : "N/A"}
//                                 </td>
//                                 <td className="px-4 py-2 border border-gray-300">
//                                   {v.assignedQuantity}
//                                 </td>
//                                 <td className="px-4 py-2 border border-gray-300">
//                                   {v.variant ? v.variant.quantity : "N/A"}
//                                 </td>
//                                 <td className="px-4 py-2 border border-gray-300">{shopName}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   );
//                 })
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
