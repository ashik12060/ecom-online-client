
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { CartProvider, useCart } from "../hooks";

const CheckOut = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const search = useParams();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
    deliveryMethod: "",
    notes: "",
    paymentMethod: "cash", // Default to cash
  });

  const [deliveryFee, setDeliveryFee] = useState(60); // Default delivery fee
  const price = Number(search.totalPrice) + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Dynamically update delivery fee
    if (name === "deliveryMethod") {
      if (value === "homeDelivery") {
        setDeliveryFee(60); // Inside Dhaka delivery fee
      } else if (value === "pickup") {
        setDeliveryFee(120); // Outside Dhaka delivery fee
      } else {
        setDeliveryFee(15); // Default delivery fee
      }
    }
  };

 
//   const handlePlaceOrder = () => {
//     let totalSum = 0;
//     cart.forEach((itm) => {
//       totalSum += Number(itm.price) * itm.quantity;
//       return {
//         ...itm, // Spread the item
//         size: itm.size, // Include the size
//         color: itm.color, // Include the color
//       };
//     });
  
//     const tax = totalSum * 0.1; // Calculate 10% tax
// // Map through the cart to add size and color information
// const updatedCart = cart.map((itm) => ({
//   ...itm,
//   size: itm.size,   // Ensure size is included
//   color: itm.color, // Ensure color is included
  
// }));
// console.log(cart)

//     const orderData = {
//       ...customerDetails,
//       cart,
//       updatedCart,
//       totalPrice: totalSum + deliveryFee + tax,
//     };
//     console.log(orderData);
  
//     // Update product quantities in the database
//     cart.forEach((itm) => {
//       const updatedQuantity = itm.quantityInStock - itm.quantity; // Subtract the purchased quantity from the stock
//       if (updatedQuantity < 0) {
//         toast.error("Not enough stock for " + itm.title);
//         return; // Exit if there's insufficient stock
//       }
  
//       // Call the API to update the stock of each product
//       axiosInstance
//         .put(`${process.env.REACT_APP_API_URL}/api/product/update/quantity/${itm._id}`, {
//           quantity: updatedQuantity, // Send the updated quantity
//         })
//         .then((response) => {
//           console.log("Product quantity updated successfully", response);
//         })
//         .catch((error) => {
//           console.error("Error updating product quantity", error);
//         });
//     });
  
//     // Now place the order
//     axiosInstance
//       .post(`${process.env.REACT_APP_API_URL}/api/order/place`, orderData)
//       .then((response) => {
//         clearCart();
//         toast.success("Payment Completed");
//         navigate("/bkash-payment");
//       })
//       .catch((error) => {
//         console.error("Error placing order:", error);
//       });
//   };
  
const handlePlaceOrder = () => {
  let totalSum = 0;

  // Calculate total sum of the cart
  cart.forEach((itm) => {
    totalSum += Number(itm.price) * itm.quantity;
    return {
      ...itm, // Spread the item
      size: itm.size, // Include the size
      color: itm.color, // Include the color
    };
  });

  const tax = totalSum * 0.1; // Calculate 10% tax

  // Map through the cart to add size and color information
  const updatedCart = cart.map((itm) => ({
    ...itm,
    size: itm.size,   // Ensure size is included
    color: itm.color, // Ensure color is included
  }));

  console.log(updatedCart);

  // Prepare order data to be sent to the backend
  const orderData = {
    ...customerDetails,
    cart: updatedCart,  // Send the updated cart
    totalPrice: totalSum + deliveryFee + tax,
  };

  console.log(orderData);

  // Update product quantities in the database
  cart.forEach((itm) => {
    const updatedQuantity = itm.quantityInStock - itm.quantity; // Subtract the purchased quantity from the stock
    if (updatedQuantity < 0) {
      toast.error("Not enough stock for " + itm.title);
      return; // Exit if there's insufficient stock
    }

    // Call the API to update the stock of each product
    axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/api/product/update/quantity/${itm._id}`, {
        quantity: updatedQuantity, // Send the updated quantity
      })
      .then((response) => {
        console.log("Product quantity updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating product quantity", error);
      });
  });

  // Now place the order
  axiosInstance
    .post(`${process.env.REACT_APP_API_URL}/api/order/place`, orderData)
    .then((response) => {
      clearCart();
      toast.success("Payment Completed");
      navigate("/bkash-payment");
    })
    .catch((error) => {
      console.error("Error placing order:", error);
    });
};



  let totalSum = 0;
  cart.forEach((itm) => {
    totalSum += Number(itm.price) * itm.quantity;
  });

  const tax = totalSum * 0.1; // Calculate 10% tax

  return (
    <div className="bg-white">
      <CartProvider>
        <Header />
      </CartProvider>

      <div className="m-10 d-flex flex-lg-row flex-md-row flex-sm-column flex-column gap-16">
        {/* Left Section */}
        <div className="pt-2 w-50 px-5 border rounded bg-white pb-5">
          <h5 className="mt-4 text-2xl text-center">
            To confirm the order, please enter your name, address, and mobile
            number, then click on the <span className="font-color font-bold">Place Order</span> button.
          </h5>
          <form className="mt-3">
            {/* Customer Details */}
            <div className="mb-3">
              <label className="form-label">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
                placeholder="Mr. Ashik..."
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={customerDetails.address}
                onChange={handleInputChange}
                placeholder="flat no, house number, street name, Thana, District"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone<span className="text-red-500">*</span></label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={customerDetails.phone}
                onChange={handleInputChange}
                placeholder="01317424004"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery Method<span className="text-red-500">*</span></label>
              <select
                className="form-select"
                name="deliveryMethod"
                value={customerDetails.deliveryMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Delivery Method</option>
                <option value="homeDelivery">Inside Dhaka (60 taka)</option>
                <option value="pickup">Outside Dhaka (120 taka)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Customer Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={customerDetails.notes}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={customerDetails.paymentMethod === "cash"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={customerDetails.paymentMethod === "online"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Online Payment</label>
              </div>
            </div>
          </form>

      
        </div>

        {/* Right Section */}
        <div className="pt-5 w-50 px-5 border rounded bg-white">
          <h3 className="text-xl font-bold">Checkout</h3>
          <div className="mb-10 px-2">
            {cart?.map((itm) => (
              <div
                className="border p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
                key={itm._id}
              >
                 <img
              src={itm.images[0]?.url || "https://via.placeholder.com/150"} // Use the first image or fallback
              alt={itm.title}
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                objectFit: "cover",
              }}
            />
                <div>
                <p className="text-xl">
                  Product: <strong>{itm.title} - {Number(itm.price)} x {itm.quantity}</strong>
                </p>
                <br />
                <p>
                <span>Size: <strong>{itm.size}</strong></span> 
                <br />
                <span>Color:<strong>{itm.color}</strong></span>
                </p>
                   </div>
                <div>
                  <span className="fw-bold">
                    Total: {Number(itm.price) * itm.quantity}
                  </span>
                  <br />
                  
                </div>
              </div>
            ))}
          </div>

          <h5 className="font-bold text-xl">Order Summary</h5>
          <hr />
          <p className="py-3">
            <strong>Product Price:</strong> <span className="ps-3">BDT {totalSum}</span>
          </p>
          <p className="pb-3">
            <strong>Delivery Fee:</strong> <span className="ps-3">BDT {deliveryFee}</span>
          </p>
          <p className="pb-3">
            <strong>Tax (10%):</strong> <span className="ps-3">BDT {tax}</span>
          </p>
          <p className="pb-3">
            <strong>Total Price:</strong> <span className="ps-3">BDT {totalSum + deliveryFee + tax}</span>
          </p>
          <button
            onClick={handlePlaceOrder}
            className="px-5 py-2 rounded bg-color border-0 text-white fw-bold mt-3"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;




