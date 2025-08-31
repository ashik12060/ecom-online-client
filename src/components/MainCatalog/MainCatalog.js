


import React, { useState } from "react";
import { Link } from "react-router-dom";

// Example brand data (replace with dynamic data if needed)
const brands = [
  { id: 1, name: "Agha Noor", image: require("../../assets/1.jpg") },
  { id: 2, name: "Maria.B.", image: require("../../assets/2.jpg") },
  { id: 3, name: "Iznik", image: require("../../assets/3.jpg") },
  { id: 4, name: "Mushq", image: require("../../assets/4.jpg") },
  { id: 5, name: "Azure", image: require("../../assets/5.jpg") },
  { id: 6, name: "Other Brand", image: require("../../assets/photo.jpg") },
];

const MainCatalog = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [zoomCount, setZoomCount] = useState(0);

  const handleZoom = (brand) => {
    setSelectedBrand(brand);
    setZoomCount(zoomCount + 1);
  };

  const handleCloseZoom = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="container mx-auto px-6 py-10 my-20 bg-gradient-to-b from-green-50 to-white">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Main Catalog ({brands.length} items)
      </h2>
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-gray-600">
          Total Zooms: <span className="font-bold text-green-600">{zoomCount}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-4 relative"
          >
            <button
              onClick={() => handleZoom(brand)}
              className="absolute top-2 right-2 bg-white hover:bg-white rounded-full p-2 focus:outline-none"
            >
              🔍
            </button>
            <Link to="/single-project" className="flex flex-col items-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="h-48 w-auto rounded-lg mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-700">{brand.name}</h3>
            </Link>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-3xl w-full">
            <button
              onClick={handleCloseZoom}
              className="absolute top-2 right-2 bg-white hover:bg-white rounded-full p-2 focus:outline-none"
            >
              ✖
            </button>
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className="w-full h-auto rounded-lg mb-4 object-cover"
            />
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {selectedBrand.name}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCatalog;
