import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // existing 
  // const addCartItem = (item) => {
  //   setCart((prevCart) => {
  //     const productId = item._id;
  //     const existingItem = prevCart.find((itm) => itm._id === productId);

  //     let newCart;

  //     if (existingItem) {
  //       newCart = prevCart.map((itm) => {
  //         if (itm._id === productId) {
  //           return { ...itm, quantity: itm.quantity + 1 };
  //         }
  //         return itm;
  //       });
  //     } else {
  //       newCart = [...prevCart, { ...item, quantity: 1 }];
  //     }

  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //     return newCart;
  //   });
  // };

  // new
  const addCartItem = (item) => {
    setCart((prevCart) => {
      // Check for an existing item with the same product ID and size
      const existingItem = prevCart.find(
        (itm) => itm._id === item._id && itm.size === item.size
      );
  
      let newCart;
  
      if (existingItem) {
        // If the item exists (same product and size), increment its quantity
        newCart = prevCart.map((itm) => {
          if (itm._id === item._id && itm.size === item.size) {
            return { ...itm, quantity: itm.quantity + 1 };
          }
          return itm;
        });
      } else {
        // If the item doesn't exist, add it to the cart with the selected size
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }
  
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };
  

  const incrementItem = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((itm) => {
        if (itm._id === productId) {
          return { ...itm, quantity: itm.quantity + 1 };
        }
        return itm;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const decrementItem = (productId) => {
    setCart((prevCart) => {
      let newCart = prevCart
        .map((itm) => {
          if (itm._id === productId) {
            return { ...itm, quantity: Math.max(itm.quantity - 1, 1) };
          }
          return itm;
        })
        .filter((itm) => itm.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevState) => {
      let newCart = prevState.filter((itm) => itm._id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        incrementItem,
        decrementItem,
        clearCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
