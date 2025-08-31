// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import axiosInstance from "../../axiosInstance";

// const GroupSetup = () => {
//   const [brands, setBrands] = useState([]); // List of brands
//   const [selectedBrand, setSelectedBrand] = useState(""); // Selected brand ID
//   const [subcategories, setSubcategories] = useState([]); // Subcategories for the selected brand
//   const [newSubcategory, setNewSubcategory] = useState(""); // Input for new subcategory name

//   // Fetch all brands
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/brands`);
//         setBrands(response.data);
//       } catch (error) {
//         console.error("Error fetching brands:", error.message);
//       }
//     };

//     fetchBrands();
//   }, []);

//   // Fetch subcategories for the selected brand
//   useEffect(() => {
//     if (selectedBrand) {
//       const fetchSubcategories = async () => {
//         try {
//           const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/subcategories/${selectedBrand}`);
//           // const response = await axios.get(`/api/subcategories/${selectedBrand}`);
//           setSubcategories(response.data);
//         } catch (error) {
//           console.error("Error fetching subcategories:", error.message);
//         }
//       };

//       fetchSubcategories();
//     } else {
//       setSubcategories([]);
//     }
//   }, [selectedBrand]);

//   // Handle creating a new subcategory
//   const handleCreateSubcategory = async () => {
//     if (!newSubcategory || !selectedBrand) {
//       alert("Please select a brand and enter a subcategory name.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/subcategories`, {
//       // const response = await axios.post("/api/subcategories", {
//         name: newSubcategory,
//         brandId: selectedBrand,
//       });

//       // Add the new subcategory to the list without reloading
//       setSubcategories([...subcategories, response.data]);
//       setNewSubcategory(""); // Clear the input field
//       alert("Subcategory created successfully!");
//     } catch (error) {
//       console.error("Error creating subcategory:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Group Setup</h2>

//       {/* Select Brand */}
//       <div>
//         <label htmlFor="brandSelect">Select a Brand:</label>
//         <select
//           id="brandSelect"
//           value={selectedBrand}
//           onChange={(e) => setSelectedBrand(e.target.value)}
//         >
//           <option value="">-- Select a Brand --</option>
//           {brands.map((brand) => (
//             <option key={brand._id} value={brand._id}>
//               {brand.brandName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subcategories */}
//       {selectedBrand && (
//         <div>
//           <h3>Subcategories for Selected Brand:</h3>
//           {subcategories.length > 0 ? (
//             <ul>
//               {subcategories.map((subcategory) => (
//                 <li key={subcategory._id}>{subcategory.name}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No subcategories found for this brand.</p>
//           )}
//         </div>
//       )}

//       {/* Add Subcategory */}
//       {selectedBrand && (
//         <div>
//           <h3>Add a New Subcategory</h3>
//           <input
//             type="text"
//             value={newSubcategory}
//             onChange={(e) => setNewSubcategory(e.target.value)}
//             placeholder="Enter subcategory name"
//           />
//           <button onClick={handleCreateSubcategory}>Create Subcategory</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroupSetup;



import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const GroupSetup = () => {
  const [brands, setBrands] = useState([]); // List of brands
  const [selectedBrand, setSelectedBrand] = useState(""); // Selected brand ID
  const [subcategories, setSubcategories] = useState([]); // Subcategories for the selected brand
  const [newSubcategory, setNewSubcategory] = useState(""); // Input for new subcategory name

  // Fetch all brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error.message);
      }
    };

    fetchBrands();
  }, []);

  // Fetch subcategories for the selected brand
  useEffect(() => {
    if (selectedBrand) {
      const fetchSubcategories = async () => {
        try {
          const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/subcategories/${selectedBrand}`);
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error.message);
        }
      };

      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedBrand]);

  // Handle creating a new subcategory
  const handleCreateSubcategory = async () => {
    if (!newSubcategory || !selectedBrand) {
      alert("Please select a brand and enter a subcategory name.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/subcategories`, {
        name: newSubcategory,
        brandId: selectedBrand,
      });

      // Add the new subcategory to the list without reloading
      setSubcategories([...subcategories, response.data]);
      setNewSubcategory(""); // Clear the input field
      alert("Subcategory created successfully!");
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Group Setup</h2>

      {/* Select Brand */}
      <div className="mb-4">
        <label htmlFor="brandSelect" className="block text-lg font-medium text-gray-700">Select a Brand:</label>
        <select
          id="brandSelect"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">-- Select a Brand --</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategories */}
      {selectedBrand && (
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Subcategories for Selected Brand:</h3>
          {subcategories.length > 0 ? (
            <ul className="space-y-2">
              {subcategories.map((subcategory) => (
                <li key={subcategory._id} className="p-2 bg-white rounded-lg">{subcategory.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No subcategories found for this brand.</p>
          )}
        </div>
      )}

      {/* Add Subcategory */}
      {selectedBrand && (
        <div className="mt-6">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Add a New Subcategory</h3>
          <input
            type="text"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Enter subcategory name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
          />
          <button
            onClick={handleCreateSubcategory}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Create Subcategory
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupSetup;
