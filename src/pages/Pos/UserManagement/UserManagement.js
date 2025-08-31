import React, { useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([
    { userId: 'a', fullName: 'a', address: 'a', mobile: 0, isActive: true },
    { userId: 'admin', fullName: 'admin', address: 'admin', mobile: null, isActive: true },
    { userId: 'Hasnal', fullName: 'Hosnd', address: null, mobile: null, isActive: true },
    { userId: 'Kamal', fullName: 'Md Kamal', address: null, mobile: null, isActive: true },
    { userId: 'Mehedi', fullName: 'Mehedi Hasan', address: '16,Shat mosid H...', mobile: 1820099068, isActive: true },
  ]);

  const [newUserId, setNewUserId] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!newUserId || !newFullName || !newAddress || !newMobile) {
      setError('All fields are required.');
      return;
    }
    setError('');
    const newUser = {
      userId: newUserId,
      fullName: newFullName,
      address: newAddress,
      mobile: parseInt(newMobile),
      isActive,
    };
    setUsers([...users, newUser]);
    setNewUserId('');
    setNewFullName('');
    setNewAddress('');
    setNewMobile('');
    setIsActive(true);
  };

  const toggleActiveStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="container mx-auto p-4 flex gap-4">
      <div className="w-full lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="User ID"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Mobile"
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="w-full lg:w-2/3">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Active</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td className="border border-gray-300 p-2">{user.userId}</td>
                <td className="border border-gray-300 p-2">{user.fullName}</td>
                <td className="border border-gray-300 p-2">{user.address}</td>
                <td className="border border-gray-300 p-2">{user.mobile}</td>
                <td className="border border-gray-300 p-2">
                  {user.isActive ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => toggleActiveStatus(user.userId)}
                    className={`p-1 px-2 rounded ${
                      user.isActive
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
