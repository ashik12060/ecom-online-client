import React from "react";

// Example data (replace with your dynamic data)
const items = [
  { id: 1, brand: "LULUSAR", price: "15,950.00৳", image: require("../../assets/1.jpg") },
  { id: 2, brand: "LULUSAR", price: "13,750.00৳", image: require("../../assets/2.jpg") },
  { id: 3, brand: "LULUSAR", price: "13,350.00৳", image: require("../../assets/3.jpg") },
  { id: 4, brand: "LULUSAR", price: "13,250.00৳", image: require("../../assets/4.jpg") },
  { id: 5, brand: "LULUSAR", price: "15,750.00৳", image: require("../../assets/1.jpg") },
  { id: 6, brand: "LULUSAR", price: "14,550.00৳", image: require("../../assets/3.jpg") },
  { id: 7, brand: "LULUSAR", price: "12,600.00৳", image: require("../../assets/4.jpg") },
  { id: 8, brand: "ETHNIC", price: "5,800.00৳", image: require("../../assets/5.jpg") },
];

const ReadyToWear = () => {
  return (
    <div className="container mx-auto px-6 py-8 my-20 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-8">READY TO WEAR</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Large Image Section */}
        <div className="lg:col-span-2">
          <img
            src={require("../../assests/1.jpg")} // Replace with the large image path
            alt="Featured Item"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </div>

        {/* Grid Section for Smaller Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#d5c085] rounded-lg shadow-md flex flex-col justify-center items-center p-4"
            >
              <img
                src={item.image}
                alt={item.brand}
                className="h-48 w-auto rounded-md mb-4 object-contain"
              />
              <p className="text-sm font-semibold text-gray-700">{item.brand}</p>
              <p className="text-gray-500">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadyToWear;
