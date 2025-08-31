import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance"; // Assuming axiosInstance is correctly configured
import { toast } from "react-toastify";

const OrderSingle = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order for details

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `${process.env.REACT_APP_API_URL}/api/orders`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //           },
  //         }
  //       );
  //       setOrders(response.data.orders);
  //       console.log(response.data.orders);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // Pagination logic
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const fetchedOrders = response?.data?.orders ?? [];

      setOrders(fetchedOrders);
    
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // fallback to empty array to prevent crash
    }
  };

  fetchOrders();
}, []);

  
  
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total price for an order
  const calculateTotalPrice = (order) =>
    order.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  // Handle status change
 
  const handleStatusChange = (orderId, status) => {
    axiosInstance
      .put(
        `${process.env.REACT_APP_API_URL}/api/order/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Order status updated successfully");
        // Update the orders state: update the order that matches orderId with the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: response.data.order.status }
              : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status", error);
        toast.error("Failed to update order status");
      });
  };

  // Open order details in modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order details
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handlePrint = () => {
    if (!selectedOrder) {
      alert("No order selected to print.");
      return;
    }

    // Open a new print window
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("Please allow pop-ups for this site.");
      return;
    }

    // Write HTML content for printing
    printWindow.document.write(
      `
      <html>
        <head>
          <title>Customer Order Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid #ccc;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f1f1f1;
            }
            h2, h3 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>Customer Order Details</h2>
  
          <h3>Customer Information</h3>
          <table>
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Name</td>
              <td>${selectedOrder.customerDetails.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${selectedOrder.customerDetails.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${selectedOrder.customerDetails.phone}</td>
            </tr>
            <tr>
              <td>Delivery Method</td>
              <td>${selectedOrder.customerDetails.deliveryMethod}</td>
            </tr>
            <tr>
              <td>Notes</td>
              <td>${selectedOrder.customerDetails.notes || "N/A"}</td>
            </tr>
            <tr>
              <td>Payment Method</td>
              <td>${selectedOrder.customerDetails.paymentMethod}</td>
            </tr>
          </table>
  
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrder.orderItems
                .map(
                  (item) => `
                  <tr>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
      `
    );

    printWindow.document.close();

    // Trigger print once the content is loaded
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h3 className="text-center mb-6">
        <span className="text-lg py-2 px-4 rounded bg-white text-white">
          Total Orders: {orders.length}
        </span>
      </h3>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-fixed">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Order ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                User Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Order Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Total Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Product
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Quantity
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => {
              const { customerDetails, orderItems } = order; // Destructure details and items
              return (
                <React.Fragment key={order._id}>
                 
                  {orderItems.map((item, index) => (
                    <tr key={item._id} className="hover:bg-white">
                      {index === 0 && (
                        <>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {order._id}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {customerDetails ? customerDetails.name : "N/A"}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            ${calculateTotalPrice(order).toFixed(2)}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-2 border border-gray-300">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        ${item.price.toFixed(2)}
                      </td>
                      {index === 0 && (
                        <td
                          className="px-4 py-2 border border-gray-300"
                          rowSpan={orderItems.length}
                        >
                          <select
                            className="p-2 border border-gray-300 rounded w-full"
                            value={order.status} // shows the current status
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      )}
                      {index === 0 && (
                        <td
                          className="px-4 py-2 border border-gray-300"
                          rowSpan={orderItems.length}
                        >
                          <button
                            className="px-4 text-sm py-2 bg-blue-800 text-white rounded hover:bg-white"
                            onClick={() => handleViewDetails(order)}
                          >
                            View Details
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === index + 1
                  ? "bg-white text-white"
                  : "bg-white text-gray-800 hover:bg-white"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Customer Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-2 border text-left">Field</th>
                    <th className="px-4 py-2 border text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Name</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Address</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Phone</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Delivery Method</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.deliveryMethod}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Notes</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.notes || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Payment Method</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.paymentMethod}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-white text-white rounded hover:bg-white"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                onClick={handlePrint}
              >
                Print Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSingle;
