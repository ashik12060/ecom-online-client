import React, { useState } from 'react';

function ShopReceive() {
  const [supplier, setSupplier] = useState('');
  const [ref, setRef] = useState('');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [stockQty, setStockQty] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [rpu, setRpu] = useState(0);
  const [bQty, setBQty] = useState(0);
  const [recQty, setRecQty] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [prdComPercent, setPrdComPercent] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [prdComVal, setPrdComVal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [addiCost, setAddiCost] = useState(0);
  const [netValue, setNetValue] = useState(0);
  const [fromDate, setFromDate] = useState('12/08/2024');
  const [toDate, setToDate] = useState('12/08/2024');

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };

  const handleRefChange = (event) => {
    setRef(event.target.value);
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStockQtyChange = (event) => {
    setStockQty(parseFloat(event.target.value));
  };

  const handleCpuChange = (event) => {
    setCpu(parseFloat(event.target.value));
  };

  const handleRpuChange = (event) => {
    setRpu(parseFloat(event.target.value));
  };

  const handleBQtyChange = (event) => {
     setBQty(parseFloat(event.target.value));
  };

  const handleRecQtyChange = (event) => {
    setRecQty(parseFloat(event.target.value));
  };

  const handleTotalValueChange = (event) => {
    setTotalValue(parseFloat(event.target.value));
  };

  const handlePrdComPercentChange = (event) => {
    setPrdComPercent(parseFloat(event.target.value));
  };

  const handleTotalQtyChange = (event) => {
    setTotalQty(parseFloat(event.target.value));
  };

  const handlePrdComValChange = (event) => {
    setPrdComVal(parseFloat(event.target.value));
  };

  const handleSubTotalChange = (event) => {
    setSubTotal(parseFloat(event.target.value));
  };

  const handleAddiCostChange = (event) => {
    setAddiCost(parseFloat(event.target.value));
  };

  const handleNetValueChange = (event) => {
    setNetValue(parseFloat(event.target.value));
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shop Receive</h1>
      <form className="space-y-4">
        <input
          type="text"
          value={supplier}
          onChange={handleSupplierChange}
          placeholder="Supplier"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={ref}
          onChange={handleRefChange}
          placeholder="Reference"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={barcode}
          onChange={handleBarcodeChange}
          placeholder="Barcode"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={stockQty}
          onChange={handleStockQtyChange}
          placeholder="Stock Quantity"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={cpu}
          onChange={handleCpuChange}
          placeholder="Cost Price (CPU)"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={rpu}
          onChange={handleRpuChange}
          placeholder="Retail Price (RPU)"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={bQty}
          onChange={handleBQtyChange}
          placeholder="Batch Quantity"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={recQty}
          onChange={handleRecQtyChange}
          placeholder="Received Quantity"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={totalValue}
          onChange={handleTotalValueChange}
          placeholder="Total Value"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={prdComPercent}
          onChange={handlePrdComPercentChange}
          placeholder="Product Commission Percentage"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={totalQty}
          onChange={handleTotalQtyChange}
          placeholder="Total Quantity"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={prdComVal}
          onChange={handlePrdComValChange}
          placeholder="Product Commission Value"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={subTotal}
          onChange={handleSubTotalChange}
          placeholder="Sub Total"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={addiCost}
          onChange={handleAddiCostChange}
          placeholder="Additional Cost"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={netValue}
          onChange={handleNetValueChange}
          placeholder="Net Value"
          className="border p-2 w-full"
        />
        <input
          type=" date"
          value={fromDate}
          onChange={handleFromDateChange}
          placeholder="From Date"
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          placeholder="To Date"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default ShopReceive;