import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfileAction } from "../redux/actions/userAction";
import { CartProvider } from "../hooks";
import Header from "../components/Shared/Header/Header";
import axiosInstance from "../pages/axiosInstance";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userProfile);
  const [orders, setOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [extraInfo, setExtraInfo] = useState({
    phone: "",
    address: "",
    profession: "",
  });

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(
            `/api/orders/user/${user._id}`
          );
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Fetch user profile
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  // Prepopulate extraInfo when user data is available
  useEffect(() => {
    if (user) {
      setExtraInfo({
        phone: user.phone || "",
        address: user.address || "",
        profession: user.profession || "",
      });
    }
  }, [user]);

  // Handle saving profile updates
  const handleSave = async () => {
    try {
      const updatedData = { ...extraInfo };
      const response = await axiosInstance.put(`/api/me/update/${user._id}`, updatedData);
      if (response.data.success) {
        alert("Profile updated successfully!");
        setEditMode(false);
        dispatch(userProfileAction()); // Refresh user profile
      } else {
        alert("Failed to update profile!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile!");
    }
  };

  // Close profile and return to order list
  const closeProfile = () => {
    setShowProfile(false);
    setEditMode(false); // Ensure edit mode is turned off
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white text-white h-screen p-5">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
            onClick={() => setShowProfile(!showProfile)}
          >
            Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5">
          {showProfile ? (
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Complete Name:</span>{" "}
                  {user && user.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user && user.email}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {user && user.role}
                </p>
                {editMode ? (
                  <>
                    <div className="space-y-2">
                      <div>
                        <label className="block font-semibold">Phone</label>
                        <input
                          type="text"
                          className="border p-2 w-full rounded"
                          value={extraInfo.phone}
                          onChange={(e) =>
                            setExtraInfo({ ...extraInfo, phone: e.target.value })
                          }
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold">Address</label>
                        <input
                          type="text"
                          className="border p-2 w-full rounded"
                          value={extraInfo.address}
                          onChange={(e) =>
                            setExtraInfo({ ...extraInfo, address: e.target.value })
                          }
                          placeholder="Enter address"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold">Profession</label>
                        <input
                          type="text"
                          className="border p-2 w-full rounded"
                          value={extraInfo.profession}
                          onChange={(e) =>
                            setExtraInfo({
                              ...extraInfo,
                              profession: e.target.value,
                            })
                          }
                          placeholder="Enter profession"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-white0 text-white px-4 py-2 mt-4 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {extraInfo.phone || "Not provided"}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {extraInfo.address || "Not provided"}
                    </p>
                    <p>
                      <span className="font-semibold">Profession:</span>{" "}
                      {extraInfo.profession || "Not provided"}
                    </p>
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={closeProfile}
                      className="bg-red-500 text-white px-4 py-2 mt-4 rounded ml-2"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Orders</h2>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Order Date</th>
                    <th className="border px-4 py-2">Product ID</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td
                          className="border px-4 py-2 text-center"
                          rowSpan={order.orderItems.length}
                        >
                          {order._id}
                        </td>
                        <td
                          className="border px-4 py-2 text-center"
                          rowSpan={order.orderItems.length}
                        >
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {order.orderItems[0].productId}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {order.orderItems[0].quantity}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          ${order.orderItems[0].price}
                        </td>
                      </tr>
                      {order.orderItems.slice(1).map((item, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2 text-center">
                            {item.productId}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.quantity}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            ${item.price}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
