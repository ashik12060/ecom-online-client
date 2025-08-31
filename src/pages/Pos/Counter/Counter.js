
import React, { useState } from 'react';

function Counter() {
  const [counterId, setCounterId] = useState('');
  const [counterName, setCounterName] = useState('');
  const [mac, setMac] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { counterId, counterName, mac });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-8 flex gap-8">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Counter Setup</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="counterId" className="block text-sm font-medium text-gray-700 mb-2">
                Counter ID
              </label>
              <input
                type="text"
                id="counterId"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={counterId}
                onChange={(e) => setCounterId(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="counterName" className="block text-sm font-medium text-gray-700 mb-2">
                Counter Name
              </label>
              <input
                type="text"
                id="counterName"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={counterName}
                onChange={(e) => setCounterName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mac" className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address
              </label>
              <input
                type="text"
                id="mac"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="w-full max-w-lg overflow-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Counters</h2>
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Counter ID</th>
                <th className="border border-gray-300 px-4 py-2">Counter Name</th>
                <th className="border border-gray-300 px-4 py-2">MAC Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">001</td>
                <td className="border border-gray-300 px-4 py-2">Main Counter</td>
                <td className="border border-gray-300 px-4 py-2">AA:BB:CC:DD:EE:FF</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">002</td>
                <td className="border border-gray-300 px-4 py-2">Backup Counter</td>
                <td className="border border-gray-300 px-4 py-2">11:22:33:44:55:66</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Counter;
