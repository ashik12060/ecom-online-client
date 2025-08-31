import React from 'react';

function SalesCancel() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="border p-4">
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="mode" className="mr-2" /> By Invoice
          </label>
          <label>
            <input type="radio" name="mode" className="mr-2" /> By Barcode
          </label>
        </div>
        <div className="grid grid-cols-6 gap-2 mt-4">
          <input type="text" placeholder="Invoice" className="border p-2 col-span-1" />
          <input type="text" placeholder="Barcode" className="border p-2 col-span-1" />
          <input type="text" placeholder="Item" className="border p-2 col-span-1" />
          <input type="text" placeholder="Customer" className="border p-2 col-span-2" />
          <button className="bg-blue-500 text-white px-4 py-2 col-span-1">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border p-4">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="border p-2">Barcode</th>
                <th className="border p-2">Product Description</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">123456</td>
                <td className="border p-2">Sample Product</td>
                <td className="border p-2">10.00</td>
                <td className="border p-2">2</td>
                <td className="border p-2">20.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border p-4 space-y-2">
          <div className="flex justify-between">
            <span>Total Qty:</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Total Items:</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Total Price:</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Disc %:</span>
            <input type="text" className="border p-1 w-16" />
          </div>
          <div className="flex justify-between">
            <span>Net Amount:</span>
            <span className="font-bold text-yellow-500">0.00</span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 w-full">Refresh</button>
        </div>
      </div>

      <div className="p-4 border-t mt-4 flex justify-between items-center">
        <div>
          <label>No. of Copies:</label>
          <input type="number" className="border p-1 ml-2 w-16" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2">Print & Submit</button>
      </div>
    </div>
  );
}

export default SalesCancel;
