
import React, { useEffect, useState } from "react";
import { useCart } from "../hooks";
import { Link } from "react-router-dom";
import Footer from "./Shared/Footer/Footer";
import axiosInstance from "../pages/axiosInstance";

const CartComponent = () => {
  const { cart, incrementItem, decrementItem, removeItemFromCart } = useCart();

  const [variantStock, setVariantStock] = useState({});

  let totalSum = cart.reduce(
    (sum, itm) => sum + Number(itm.price) * itm.quantity,
    0
  );

  useEffect(() => {
    const fetchAllProductVariants = async () => {
      let stockMap = {};

      for (const item of cart) {
        try {
          const res = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/api/product/${item._id}`
          );

          const variants = res.data.product.variants;

          const matchedVariant = variants.find(
            (v) => v.size === item.size && v.color === item.color
          );

          if (matchedVariant) {
            stockMap[`${item._id}_${item.size}_${item.color}`] =
              matchedVariant.quantity;
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }

      setVariantStock(stockMap);
    };

    fetchAllProductVariants();
  }, [cart]);

  
  return (
    <>
     
     <div className="p-5 mb-5">
  {Array.isArray(cart) && cart.length > 0 ? (
    cart.map((itm) => {
      const matchedVariant = itm.variants?.find(
        (variant) =>
          variant.color?.toLowerCase() === itm.color?.toLowerCase() &&
          variant.size?.toLowerCase() === itm.size?.toLowerCase()
      );
      console.log("Cart item:", itm);
      const key = `${itm._id}_${itm.size}_${itm.color}`;
      const availableQty = variantStock[key] ?? "Loading...";

      return (
        <div
          className="border border-1 p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
          key={key}
        >
         
      <img
  src={
    matchedVariant?.imageUrl ||
    itm.imageUrl ||
    "https://via.placeholder.com/150"
  }
  alt={itm.title}
  style={{
    maxWidth: "150px",
    maxHeight: "150px",
    objectFit: "cover",
  }}
/>

          <div>
            <p className="text-xl">
              Item Name: <span className="font-bold">{itm.title}</span>
            </p>
            <p className="text-base">
              Size: <span className="font-bold">{itm.size}</span>
            </p>
            <p className="text-base">
              Color: <span className="font-bold">{itm.color}</span>
            </p>
            <p className="text-base">
              Available Qty:{" "}
              <span className="font-bold text-success">{availableQty}</span>
            </p>
            <br />
            <p className="text-xl">
              Price: <span className="font-bold">{Number(itm.price)}</span>
            </p>
          </div>

          <div>
            <span className="text-xl font-bold pb-2">
              Total: {Number(itm.price) * (itm.quantity || 1)}
            </span>
            <br />
            <button
              className="mx-2 mt-3 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
              onClick={() => decrementItem(itm._id)}
              disabled={itm.quantity <= 1}
            >
              -
            </button>
            <span className="mx-2 px-3 fw-bold fs-5">
              {itm.quantity || 1}
            </span>
            <button
              className="mx-2 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
              onClick={() => {
                if ((itm.quantity || 1) < availableQty) {
                  incrementItem(itm._id);
                } else {
                  alert("Cannot add more than available quantity!");
                }
              }}
              disabled={(itm.quantity || 1) >= availableQty}
            >
              +
            </button>
            <button
              className="mx-2 px-3 bg-danger text-white border-0 py-1 rounded"
              onClick={() => removeItemFromCart(itm._id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-center my-5">
      <h4>Your cart is empty.</h4>
    </div>
  )}

  <h4 className="text-end m-3">Subtotal : {totalSum} BDT</h4>
  <div className="text-end m-3">
    <Link to={"/checkout"}>
      <button className="bg-color text-white border-0 rounded px-3 py-2">
        Proceed to checkout
      </button>
    </Link>
  </div>
</div>

      <Footer />
    </>
  );
};

export default CartComponent;
