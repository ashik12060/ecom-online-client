import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import logo from '../../../assets/chaityr-angina-logo.png'





const BadhundharaSales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Array to store selected products
  const [qty, setQty] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    mobile: "",
  });
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [netPayable, setNetPayable] = useState(0.0);
  const [vatRate, setVatRate] = useState(0); // VAT rate in percentage
  const [discountRate, setDiscountRate] = useState(0); // Discount rate in percentage

  const [vatAmount, setVatAmount] = useState(0.0); // VAT amount
  // const [discountAmount, setDiscountAmount] = useState(0.0); 
  const [discountAmount, setDiscountAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
  const [amountGiven, setAmountGiven] = useState(0.0); // Amount customer gave
  const [changeReturned, setChangeReturned] = useState(0.0); // Change to return
  // const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // Fetch products from the API
  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/products/show`)
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    setSelectedProducts((prevSelected) => {
      const updatedProducts = [...prevSelected];
      const existingProduct = updatedProducts.find((p) => p._id === productId);
      if (existingProduct) {
        existingProduct.qty = existingProduct.qty + 1; // Add 1 to qty
      } else {
        updatedProducts.push({ ...product, qty: 1 });
      }
      return updatedProducts;
    });
  };

  // new
  useEffect(() => {
    if (amountGiven >= netPayable) {
      setChangeReturned(amountGiven - netPayable);
    } else {
      setChangeReturned(0.0); // If the amount given is less than net payable, no change
    }
  }, [amountGiven, netPayable]);

  // Handle quantity change for a specific product
  // const handleQtyChange = (productId, newQty) => {
  //   setSelectedProducts((prevSelected) =>
  //     prevSelected.map((product) =>
  //       product._id === productId ? { ...product, qty: newQty } : product
  //     )
  //   );
  // };
  const handleQtyChange = (productId, newQty) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product._id === productId ? { ...product, qty: newQty } : product
      )
    );
  };

  // Handle VAT and Discount calculations
  // const calculateNetPayable = () => {
  //   let subtotal = 0;
  //   let vat = 0;
  //   let discount = 0;

  //   selectedProducts.forEach((product) => {
  //     const productTotal = parseFloat(product.price) * product.qty;
  //     subtotal += productTotal;
  //     vat += (productTotal * vatRate) / 100;
  //     discount += (productTotal * discountRate) / 100;
  //   });

  //   const finalAmount = subtotal - discount + vat;
  //   setTotalPrice(subtotal);
  //   setVatAmount(vat);
  //   setDiscountAmount(discount);
  //   setNetPayable(finalAmount);
  // };
 const calculateNetPayable = () => {
  let subtotal = 0;
  let vat = 0;

  selectedProducts.forEach((product) => {
    const productTotal = parseFloat(product.price) * product.qty;
    subtotal += productTotal;
    vat += (productTotal * vatRate) / 100;
  });

  const finalAmount = subtotal - discountAmount + vat;

  setTotalPrice(subtotal);
  setVatAmount(vat);
  setNetPayable(finalAmount);
};

  // Update net payable whenever total price, VAT or discount changes
  useEffect(() => {
    calculateNetPayable();
  }, [selectedProducts, vatRate, discountAmount]);

  const handleSubmit = () => {
    const saleData = {
      products: selectedProducts.map((product) => ({
        productId: product._id,
        title: product.title,
        quantity: product.qty, // Change `qty` to `quantity`
        price: product.price,
        size: product.selectedSize, // Add size
        color: product.selectedColor, // Add color
      })),
      customerInfo:
        customerInfo.id || customerInfo.name || customerInfo.mobile
          ? customerInfo
          : undefined,
      totalPrice, // Change `totalPrice` to `totalAmount`
      vatAmount,
      discountAmount,
      netPayable,
      paymentMethod,
      ...(paymentMethod === "Card" && { cardNumber }),
    };

    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/sales/create`, saleData)
      .then((response) => {
        alert("Sale submitted successfully from Bashundhara Outlet!");
        // Reset fields after submission
        setSelectedProducts([]);
        setQty(1);
        setCustomerInfo({ id: "", name: "", mobile: "" });
        setTotalPrice(0.0);
        setNetPayable(0.0);
        setVatAmount(0.0);
        setDiscountAmount(0);
        setVatRate(0);
        setDiscountRate(0);
      });
  };

  // Remove product from selected products
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product._id !== productId)
    );
  };

  // handler for dropdown menu for size and colors
  const updateAvailableQty = (product, selectedSize, selectedColor) => {
    const matchedVariant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );
    return matchedVariant ? matchedVariant.quantity : 0;
  };

  // barcode number based
  const handleBarcodeInput = (e) => {
    if (e.key === "Enter") {
      const barcode = e.target.value.trim();
      if (!barcode) return;

      let foundProduct = null;
      let matchedVariant = null;

      for (const product of products) {
        const variant = product.variants.find((v) => v.subBarcode === barcode);
        if (variant) {
          foundProduct = product;
          matchedVariant = variant;
          break;
        }
      }

      if (!foundProduct || !matchedVariant) {
        alert("❌ Product with this barcode was not found.");
        e.target.value = "";
        return;
      }

      setSelectedProducts((prevSelected) => {
        const updatedProducts = [...prevSelected];
        const existingProduct = updatedProducts.find(
          (p) =>
            p._id === foundProduct._id &&
            p.selectedSize === matchedVariant.size &&
            p.selectedColor === matchedVariant.color
        );

        if (existingProduct) {
          existingProduct.qty = existingProduct.qty + 1;
        } else {
          updatedProducts.push({
            ...foundProduct,
            qty: 1,
            selectedSize: matchedVariant.size,
            selectedColor: matchedVariant.color,
            availableQty: matchedVariant.quantity,
          });
        }

        return updatedProducts;
      });

      e.target.value = "";
    }
  };

  const handleSizeChange = (productId, selectedSize) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product._id === productId) {
          const newAvailableQty = updateAvailableQty(
            product,
            selectedSize,
            product.selectedColor
          );
          return {
            ...product,
            selectedSize,
            availableQty: newAvailableQty,
          };
        }
        return product;
      })
    );
  };

  const handleColorChange = (productId, selectedColor) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product._id === productId) {
          const newAvailableQty = updateAvailableQty(
            product,
            product.selectedSize,
            selectedColor
          );
          return {
            ...product,
            selectedColor,
            availableQty: newAvailableQty,
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
         E-commerce
        </Link> 
        <p className="font-bold">
          <i>Bashundhara Shop Sales</i>
        </p>
        <img
          src={logo}
          alt="Company Logo"
          className="h-10"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-2 my-2">
        {/* Left Section */}
        <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
          {/* Input Fields */}
          <div className="grid grid-cols-6 gap-4">
          
            <div>
              <label className="text-sm text-gray-700">
                Scan or Enter Barcode
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter or scan barcode and press Enter"
                onKeyDown={handleBarcodeInput}
              />
            </div>

            {/* Customer Details */}
            <div>
              <label className="text-sm text-gray-700">
                Customer ID(Optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.id}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, id: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">
                Customer Name(Optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Mobile(Optional)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.mobile}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, mobile: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">VAT Rate (%)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
              />
            </div>

           
            <div>
              <label className="text-sm text-gray-700">Discount (৳)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={discountAmount}
                onChange={(e) =>
                  setDiscountAmount(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="border border-gray-300 p-2">SL</th>
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Available</th>{" "}
                
                  <th className="border border-gray-300 p-2">Qty</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => {
                  const invalidQty =
                    product.qty <= 0 || product.qty > product.availableQty;

                  return (
                    <tr key={product._id}>
                      <td className="border border-gray-300 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {product.title}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${parseFloat(product.price).toFixed(2) || "0.00"}
                      </td>

                      <td className="border border-gray-300 p-2">
                        <div>
                          <strong>Total:</strong>{" "}
                          {product.variants?.reduce(
                            (sum, v) => sum + v.quantity,
                            0
                          )}
                        </div>

                        <div className="mt-1">
                          <label className="text-xs mr-1">Size:</label>
                          <select
                            className="text-xs border p-1"
                            value={product.selectedSize || ""}
                            onChange={(e) =>
                              handleSizeChange(product._id, e.target.value)
                            }
                          >
                            <option value="">Select Size</option>
                            {[
                              ...new Set(product.variants?.map((v) => v.size)),
                            ].map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-1">
                          <label className="text-xs mr-1">Color:</label>
                          <select
                            className="text-xs border p-1"
                            value={product.selectedColor || ""}
                            onChange={(e) =>
                              handleColorChange(product._id, e.target.value)
                            }
                          >
                            <option value="">Select Color</option>
                            {[
                              ...new Set(product.variants?.map((v) => v.color)),
                            ].map((color) => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <input
                        type="number"
                        min={1}
                        max={product.availableQty || 1}
                        value={product.qty}
                        className={`w-full px-1 py-0.5 border rounded ${
                          invalidQty ? "border-red-500" : "border-gray-300"
                        }`}
                        onChange={(e) => {
                          handleQtyChange(product._id, e.target.value);
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value, 10);

                          if (isNaN(value) || value < 1) {
                            alert("Quantity must be at least 1.");
                            handleQtyChange(product._id, 1);
                          } else if (value > product.availableQty) {
                            alert(
                              `Only ${product.availableQty} item(s) available for Size "${product.selectedSize}" and Color "${product.selectedColor}".`
                            );
                            handleQtyChange(product._id, product.availableQty);
                          } else {
                          
                            handleQtyChange(product._id, value);
                          }
                        }}
                        disabled={
                          !product.selectedSize || !product.selectedColor
                        }
                      />

                      <td className="border border-gray-300 p-2">
                        $
                        {parseFloat(product.price * product.qty).toFixed(2) ||
                          "0.00"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleRemoveProduct(product._id)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <div className="col-span-3 bg-white  p-4 rounded-md">
            <p>Bashundara Outlet</p>
            <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
              Payable Amount: {`৳ ${netPayable.toFixed(2)}`}
            </h1>
            <h2 className="text-xl font-bold">৳ Net Payable</h2>
            <div className="mt-4">
            
              <div className="flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Total Price
                </label>
                <input
                  type="text"
                  value={`৳ ${totalPrice.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Discount
                </label>
                <input
                  type="text"
                  value={`-৳ ${discountAmount.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

         
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">VAT</label>
                <input
                  type="text"
                  value={`+৳ ${vatAmount.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

             
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
                  Net Payable
                </label>
                <input
                  type="text"
                  value={`৳ ${netPayable.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 font-bold rounded-md p-2"
                />
              </div>

             
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Amount Given
                </label>
                <input
                  type="number"
                  value={amountGiven}
                  onChange={(e) =>
                    setAmountGiven(parseFloat(e.target.value) || 0.0)
                  }
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
                  Change to Return
                </label>
                <input
                  type="text"
                  value={`৳ ${changeReturned.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

           
            <div className="mt-4">
              <label className="text-sm text-gray-700">Payment Method</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
              {paymentMethod === "Card" && (
                <div className="mt-4">
                  <label className="text-sm text-gray-700">Card Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
              )}
            </div>

            
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Print & Submit
            </button>
          </div>
        </div> */}

        <div className="col-span-12 md:col-span-3 bg-white shadow-md p-4 rounded-md">
  <div className="bg-white p-4 rounded-md space-y-4">
    <p className="text-lg font-semibold">Bashundara Outlet</p>

    <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4 rounded">
      Payable Amount: {`৳ ${netPayable.toFixed(2)}`}
    </h1>

    <h2 className="text-xl font-bold">৳ Net Payable</h2>

    <div className="space-y-2">
      {/* Total Price */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700">
          Total Price
        </label>
        <input
          type="text"
          value={`৳ ${totalPrice.toFixed(2)}`}
          readOnly
          className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Discount */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700">
          Discount
        </label>
        <input
          type="text"
          value={`-৳ ${discountAmount.toFixed(2)}`}
          readOnly
          className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* VAT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700">
          VAT
        </label>
        <input
          type="text"
          value={`+৳ ${vatAmount.toFixed(2)}`}
          readOnly
          className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Net Payable */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700 font-bold">
          Net Payable
        </label>
        <input
          type="text"
          value={`৳ ${netPayable.toFixed(2)}`}
          readOnly
          className="w-full sm:w-2/3 border border-gray-300 font-bold rounded-md p-2"
        />
      </div>

      {/* Amount Given */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700">
          Amount Given
        </label>
        <input
          type="number"
          value={amountGiven}
          onChange={(e) => setAmountGiven(parseFloat(e.target.value) || 0.0)}
          className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Change to Return */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <label className="text-sm py-1 sm:py-2 w-full sm:w-1/3 text-gray-700 font-bold">
          Change to Return
        </label>
        <input
          type="text"
          value={`৳ ${changeReturned.toFixed(2)}`}
          readOnly
          className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>

    {/* Payment Method */}
    <div className="mt-4 space-y-2">
      <label className="text-sm text-gray-700">Payment Method</label>
      <select
        className="w-full border border-gray-300 rounded-md p-2"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
      </select>

      {paymentMethod === "Card" && (
        <div>
          <label className="text-sm text-gray-700">Card Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
      )}
    </div>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md"
    >
      Print & Submit
    </button>
  </div>
</div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default BadhundharaSales;
