import React, { useState } from 'react';

function PurchaseOrder() {
  const [supplier, setSupplier] = useState('Milan');
  const [description, setDescription] = useState('');
  const [stockQty, setStockQty] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [rpu, setRpu] = useState(0);
  const [reqQty, setReqQty] = useState(0);
  const [orderDt, setOrderDt] = useState('12/08/2024');
  const [deliveryDt, setDeliveryDt] = useState('12/08/2024');
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    setItems([...items, { description, stockQty, cpu, rpu, reqQty }]);
    setDescription('');
    setStockQty(0);
    setCpu(0);
    setRpu(0);
    setReqQty(0);
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving purchase order...');
  };

  const handleBack = () => {
    // Implement back navigation logic here
    console.log('Going back...');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Order</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="supplier" className="block text-gray-700 text-sm font-bold mb-2">
            Supplier
          </label>
          <input
            type="text"
            id="supplier"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="barcode" className="block text-gray-700 text-sm font-bold mb-2">
            Barcode </label>
          <input
            type="text"
            id="barcode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stockQty" className="block text-gray-700 text-sm font-bold mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQty"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={stockQty}
            onChange={(e) => setStockQty(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="cpu" className="block text-gray-700 text-sm font-bold mb-2">
            Cost Per Unit (CPU)
          </label>
          <input
            type="number"
            id="cpu"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cpu}
            onChange={(e) => setCpu(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rpu" className="block text-gray-700 text-sm font-bold mb-2">
            Retail Price Unit (RPU)
          </label>
          <input
            type="number"
            id="rpu"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rpu}
            onChange={(e) => setRpu(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="reqQty" className="block text-gray-700 text-sm font-bold mb-2">
            Required Quantity
          </label>
          <input
            type="number"
            id="reqQty"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={reqQty}
            onChange={(e) => setReqQty(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="orderDt" className="block text-gray-700 text-sm font-bold mb-2">
            Order Date
          </label>
          <input
            type="date"
            id="orderDt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={orderDt}
            onChange={(e) => setOrderDt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deliveryDt" className="block text-gray-700 text-sm font-bold mb-2">
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={deliveryDt}
            onChange={(e) => setDeliveryDt(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Item
      </button>
      <button
        onClick={handleSave}
        className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Order
      </button>
      <button
        onClick={handleBack}
        className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Items</h2>
        <ul className="list-disc pl-5">
          {items.map((item, index) => (
            <li key={index}>
              {item.description} - Qty: {item.reqQty}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PurchaseOrder;