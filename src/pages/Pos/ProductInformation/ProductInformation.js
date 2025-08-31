import React, { useState } from 'react';

function ProductInformation() {
  const [productId, setProductId] = useState('');
  const [group, setGroup] = useState('');
  const [productName, setProductName] = useState('');
  const [floorId, setFloorId] = useState('');
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Setup</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">
            Product Id
          </label>
          <input
            type="text"
            id="productId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="group" className="block text-gray-700 text-sm font-bold mb-2">
            Group
          </label>
          <select
            id="group"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="">Select</option>
            {/* Add group options here */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2"> Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="floorId" className="block text-gray-700 text-sm font-bold mb-2">
            Floor Id
          </label>
          <input
            type="text"
            id="floorId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={floorId}
            onChange={(e) => setFloorId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vat" className="block text-gray-700 text-sm font-bold mb-2">
            VAT
          </label>
          <input
            type="number"
            id="vat"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={vat}
            onChange={(e) => setVat(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductInformation;