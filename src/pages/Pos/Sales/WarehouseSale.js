import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const WarehouseSale = () => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Array to store selected products
  const [qty, setQty] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0.0);
  const [netPayable, setNetPayable] = useState(0.0);
  const [vatRate, setVatRate] = useState(0); // VAT rate in percentage
  const [discountRate, setDiscountRate] = useState(0); // Discount rate in percentage
  const [vatAmount, setVatAmount] = useState(0.0); // VAT amount
  const [discountAmount, setDiscountAmount] = useState(0.0); // Discount amount

  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method

  const [amountGiven, setAmountGiven] = useState(0);
  const [changeReturned, setChangeReturned] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // generate invoice

  const generateInvoicePDF = (invoiceData) => {
    const {
      _id,
      type,
      discountAmount,
      vatAmount,
      warehouseProducts,
      paymentMethod,
      customerAddress,
      customerPhone,
      customerName,
      timestamp,
    } = invoiceData;
  
    const doc = new jsPDF();
  
    // Header Styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice", 14, 16);
  
    // Store Name
    doc.setFontSize(12);
    doc.text("Choityr Angina", 14, 22);
  
    // Invoice ID and Date
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${_id}`, 14, 28);
    doc.text(`Date: ${new Date(timestamp).toLocaleDateString()}`, 150, 28);
  
    doc.setLineWidth(0.5);
    doc.line(14, 32, 200, 32); // Horizontal line after header
  
    // Customer Information Section
    doc.setFontSize(12);
    doc.text("Customer Information", 14, 40); // Title is outside the border
  
    // Draw Border AFTER the title
    const customerBoxY = 42; // Move box down to start below title
    doc.setLineWidth(0.5);
    doc.rect(10, customerBoxY, 190, 24); // Adjusted height to fit content
  
    // Customer Details (inside the border)
    doc.setFontSize(10);
    doc.text(`Name: ${customerName}`, 14, customerBoxY + 6);
    doc.text(`Address: ${customerAddress}`, 14, customerBoxY + 12);
    doc.text(`Phone: ${customerPhone}`, 14, customerBoxY + 18);
  
    // Product Details Section with Padding
    let startY = customerBoxY + 30; // Shift product section down to avoid overlap
    let yOffset = startY;
  
    doc.setFontSize(12);
    doc.text("Product Details", 14, yOffset);
    yOffset += 10; // Added padding before the table
  
    // Product Details Table Border
    doc.setLineWidth(0.5);
    doc.rect(10, yOffset - 4, 190, 10 + warehouseProducts.length * 14 + 10); // Added padding inside border
  
    // Table Header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product", 14, yOffset);
    doc.text("Quantity", 80, yOffset);
    doc.text("Price", 110, yOffset);
    doc.text("Total", 140, yOffset);
    doc.text("Type", 170, yOffset);
  
    yOffset += 6;
    doc.line(14, yOffset, 200, yOffset); // Line below table header
    yOffset += 6;
  
    let totalPrice = 0;
  
    warehouseProducts.forEach((product) => {
      const productTotal = product.quantity * product.price;
      totalPrice += productTotal;
  
      doc.setFont("helvetica", "italic");
      doc.text(`ID: ${product.productId}`, 14, yOffset);
      yOffset += 5;
  
      doc.setFont("helvetica", "normal");
      doc.text(product.title, 14, yOffset);
      doc.text(product.quantity.toString(), 80, yOffset);
      doc.text(`${product.price} BDT`, 110, yOffset);
      doc.text(`${productTotal} BDT`, 140, yOffset);
      doc.text(product.type || "-", 170, yOffset); // Ensuring type is visible
  
      yOffset += 8;
    });
  
    doc.line(14, yOffset, 200, yOffset);
  
    yOffset += 10; // Added padding after the table
  
    // Summary Section
    doc.setFont("helvetica", "bold");
    doc.text(`Customer Given: ${discountAmount} BDT`, 14, yOffset);
    yOffset += 6;
    doc.text(`VAT: ${vatAmount} BDT`, 14, yOffset);
    yOffset += 6;
  
    const netAmount = totalPrice - discountAmount + vatAmount;
    doc.text(`Net Payable(Due): ${netAmount} BDT`, 14, yOffset);
    yOffset += 6;
  
    if (paymentMethod) {
      doc.setFont("helvetica", "italic");
      doc.text(`Payment Method: ${paymentMethod}`, 14, yOffset);
    }
  
    return doc;
  };
  
  
  
  // end invoice generation

  // show products
  useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/warehouse-products/show"
        );
        console.log(response.data.warehouseProducts);
        if (response.data && Array.isArray(response.data.warehouseProducts)) {
          setWarehouseProducts(response.data.warehouseProducts);
        } else {
          setWarehouseProducts([]); // Set empty array if data is missing
        }
      } catch (error) {
        console.error("Error fetching warehouseProducts:", error);
        setWarehouseProducts([]); // Prevent crash on error
      }
    };

    fetchWarehouseProducts();
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = warehouseProducts.find((p) => p._id === productId);
    if (!product) return;

    // Add product to selectedProducts array
    setSelectedProducts((prevSelected) => {
      const updatedProducts = [...prevSelected];
      const existingProduct = updatedProducts.find((p) => p._id === productId);
      if (existingProduct) {
        // If product already exists, update quantity
        existingProduct.qty = existingProduct.qty + 1; // Add 1 to qty
      } else {
        // Add the product with quantity 1
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


  const handleQtyChange = (productId, newQty) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) => {
        if (product._id === productId) {
          const maxQty = product.quantity; // Available stock
          if (newQty > maxQty) {
            alert(`Only ${maxQty} items are available in stock!`);
            return { ...product, qty: maxQty }; // Set to max available
          }
          return { ...product, qty: Math.max(newQty, 1) }; // Prevent qty < 1
        }
        return product;
      })
    );
  };

  // Handle VAT and Discount calculations
  const calculateNetPayable = () => {
    let subtotal = 0;
    let vat = 0;
    // let discount = 0;

    selectedProducts.forEach((product) => {
      const productTotal = parseFloat(product.price) * product.qty;
      subtotal += productTotal;
      vat += (productTotal * vatRate) / 100;
      // discount += (productTotal * discountRate) / 100;
    });

    // Ensure discountAmount does not exceed subtotal
    const finalDiscount = Math.min(discountAmount, subtotal);
    const finalAmount = subtotal - finalDiscount + vat;

    // const finalAmount = subtotal - discount + vat;
    // setTotalPrice(subtotal);
    // setVatAmount(vat);
    // setDiscountAmount(discount);
    // setNetPayable(finalAmount);

    setTotalPrice(subtotal);
    setVatAmount(vat);
    setDiscountAmount(finalDiscount); // Store the actual discount applied
    setNetPayable(finalAmount);
  };
  // Handle VAT and Discount calculations

  // Update net payable whenever total price, VAT or discount changes
  useEffect(() => {
    calculateNetPayable();
  }, [selectedProducts, vatRate, discountAmount]);

  const handleSubmit = () => {
    const saleData = {
      warehouseProducts: selectedProducts.map((product) => ({
        productId: product._id,
        title: product.title,
        quantity: product.qty,
        price: product.price,
        type: product.type || "defaultType",
      })),
      totalPrice,
      vatAmount,
      discountAmount,
      netPayable,
      paymentMethod,
      customerName,
      customerPhone,
      customerAddress,
    };
  
    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/warehouse-sales/create`, saleData)
      .then((response) => {
        console.log("API Response:", response);
  
        if (!response.data) {
          console.error("Error: response.data is undefined");
          alert("Unexpected API response. Check console for details.");
          return;
        }
  
        const sale = response.data.sale;
  
        if (!sale._id) {
          console.error("Error: sale._id is missing", sale);
          alert("Sale submitted, but missing ID. Check backend response.");
          return;
        }
  
        alert("Sale submitted successfully!");
  
        // Generate and Open Customer Copy
        const customerInvoice = generateInvoicePDF(sale, true);  // Customer Copy
        const customerBlobURL = customerInvoice.output("bloburl");
        window.open(customerBlobURL);
  
        // Generate and Open Office Copy after a short delay
        setTimeout(() => {
          const officeInvoice = generateInvoicePDF(sale, false);  // Office Copy
          const officeBlobURL = officeInvoice.output("bloburl");
          window.open(officeBlobURL);
        }, 1000); // Adding a small delay to ensure the second window opens
  
        // Update stock
        selectedProducts.forEach((product) => {
          axiosInstance
            .put(`${process.env.REACT_APP_API_URL}/api/warehouse-products/update`, {
              productId: product._id,
              soldQuantity: product.qty,
            })
            .then((updateResponse) => {
              console.log("Stock updated for product", product._id);
            })
            .catch((updateError) => {
              console.error("Error updating stock:", updateError);
            });
        });
  
        // Reset fields after submission
        setSelectedProducts([]);
        setQty(1);
        setTotalPrice(0.0);
        setNetPayable(0.0);
        setVatAmount(0.0);
        setDiscountAmount(0.0);
        setVatRate(0);
        setDiscountRate(0);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
      })
      .catch((error) => {
        console.error("Error submitting sale:", error);
      });
  };
  
  
  
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product._id !== productId)
    );
  };

  // Handle Amount Given Input Change
  useEffect(() => {
    const change = amountGiven - netPayable;
    setChangeReturned(change >= 0 ? change : 0); // Ensure no negative change
  }, [amountGiven, netPayable]);

  const handleAmountGivenChange = (e) => {
    const givenAmount = parseFloat(e.target.value);
    setAmountGiven(givenAmount);
  };

  // invoice

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-commerce
        </Link>
        <p className="font-bold">
          <i>Green Software Technology</i>
        </p>
        <img
          src="https://via.placeholder.com/150"
          alt="Company Logo"
          className="h-8"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-2 my-2">
        {/* Left Section */}
        <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
          {/* Input Fields */}
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="text-sm text-gray-700">Product</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => handleProductSelect(e.target.value)}
              >
                <option value="">Select a product</option>
                {Array.isArray(warehouseProducts) &&
                warehouseProducts.length > 0 ? (
                  warehouseProducts.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No products available
                  </option>
                )}
              </select>
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

            
          </div>

          {/* Table Section */}
          <div className="mt-4">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="border border-gray-300 p-2">SL</th>
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Qty</th>
                  <th className="border border-gray-300 p-2">Available</th>
                  <th className="border border-gray-300 p-2">Type</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Action</th>{" "}
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {product.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${parseFloat(product.price).toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={product.qty}
                        onChange={(e) =>
                          handleQtyChange(
                            product._id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.quantity} {/* Show available quantity */}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.type} {/* Show available quantity */}
                    </td>
                    <td className="border border-gray-300 p-2">
                      $
                      {parseFloat(product.price * product.qty).toFixed(2) ||
                        "0.00"}
                    </td>

                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="bg-red-500 text-white px-2 py-1 "
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <div className="col-span-3 bg-white  p-4 rounded-md">
            <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
              Payable Amount: {`৳ ${netPayable.toFixed(2)}`}
            </h1>
            <h2 className="text-xl font-bold">৳ Net Payable</h2>
            <div className="mt-1">
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

              <div>
                <label className="text-sm text-gray-700">Customer Given</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={discountAmount}
                  placeholder="add alteals zero (0)"
                  // onChange={(e) => setDiscountRate(e.target.value)}
                  onChange={(e) =>
                    setDiscountAmount(parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              {/* Net Payable input */}
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
            </div>

            <div className="grid grid-cols-3 gap-1 mb-1">
              <div>
                <label className="text-sm text-gray-700">Customer Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Customer Phone</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">
                  Customer Address
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method Dropdown */}
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
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
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

export default WarehouseSale;
