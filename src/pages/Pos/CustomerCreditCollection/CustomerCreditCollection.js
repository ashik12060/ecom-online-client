
import React, { useState } from 'react';

function CustomerCreditCollection() {
  const [formData, setFormData] = useState({
    customerId: '',
    name: '',
    mobile: '',
    currentDue: '',
    paymentType: '',
    paymentAmount: '',
    bankName: '',
    chequeNo: '',
    remarks: '',
    chequeDate: '',
    noOfCopies: 1,
    fromDate: '2024-12-08',
    toDate: '2024-12-08',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Customer Credit Collection</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">Customer ID</label>
            <input
              id="customerId"
              type="text"
              value={formData.customerId}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              id="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="currentDue" className="block text-sm font-medium text-gray-700">Current Due</label>
            <input
              id="currentDue"
              type="text"
              value={formData.currentDue}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
            <input
              id="paymentType"
              type="text"
              value={formData.paymentType}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">Payment Amount</label>
            <input
              id="paymentAmount"
              type="text"
              value={formData.paymentAmount}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              id="bankName"
              type="text"
              value={formData.bankName}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="chequeNo" className="block text-sm font-medium text-gray-700">Cheque No</label>
            <input
              id="chequeNo"
              type="text"
              value={formData.chequeNo}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="chequeDate" className="block text-sm font-medium text-gray-700">Cheque Date</label>
            <input
              id="chequeDate"
              type="date"
              value={formData.chequeDate}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
              rows="2"
            />
          </div>

          <div>
            <label htmlFor="noOfCopies" className="block text-sm font-medium text-gray-700">No of Copies</label>
            <input
              id="noOfCopies"
              type="number"
              value={formData.noOfCopies}
              onChange={handleChange}
              min="1"
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={formData.fromDate}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
            <input
              id="toDate"
              type="date"
              value={formData.toDate}
              onChange={handleChange}
              className="mt-1 w-full px-2 py-1 border rounded focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerCreditCollection;
