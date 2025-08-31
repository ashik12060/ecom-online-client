import React, { useState } from "react";

function UserPermission() {
  const [permissions, setPermissions] = useState({
    CourterSetup: true,
    ShopAttendance: true,
    MenuDistribution: true,
    ShopReceiving: true,
    DamageLost: true,
    SupplierReturn: true,
    PromotionSetup: true,
    PackageSetup: true,
    DiscountCircular: true,
    ExpenseEntry: true,
    Sales: true,
    SalesVoid: true,
    InvoiceReprint: true,
    UserSetup: true,
    MenuDistribution: true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    console.log("Saving permissions:", permissions);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Users Permission</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="Hasnat"
          value="Hasnat"
          disabled
        />
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Check</th>
            <th className="px-4 py-2 border-b border-gray-300">Operation</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(permissions).map(([key, value]) => (
            <tr key={key}>
              <td className="px-4 py-2 border-b border-gray-300">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
              </td>
              <td className="px -4 py-2 border-b border-gray-300">{key}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save Permissions
      </button>
    </div>
  );
}

export default UserPermission;