import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const SubBarcodeImage = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubBarcode, setSelectedSubBarcode] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const printRef = useRef(null);

  const fetchVariants = async () => {
    try {
      const res = await axiosInstance.get("/api/products/subbarcodes/full");

      const allVariants = res.data.subBarcodes || [];

      console.log(
        "Flattened Variants:",
        allVariants.map((v) => v.subBarcode)
      );
      setVariants(allVariants);
      console.log(allVariants);
    } catch (err) {
      console.error("Failed to fetch subbarcodes with products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const handlePrint = () => {
    if (!selectedVariant) return;
    window.print();
  };

  // Ensure subBarcodes are always valid strings
  const uniqueSubBarcodes = [
    ...new Set(
      variants
        .map((v) => (v.subBarcode ? String(v.subBarcode).trim() : ""))
        .filter(Boolean)
    ),
  ];

  const selectedVariant = variants.find(
    (v) => String(v.subBarcode).trim() === selectedSubBarcode.trim()
  );

  if (loading)
    return <p className="text-center mt-10">Loading variant barcodes...</p>;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-2 bg-white">
        <style>
          {`
            @media print {
              @page {
                size: 1.5in 1in;
                margin: 0;
              }
              html, body {
                width: 1.5in;
                height: 1in;
                margin: 0;
                padding: 0;
                overflow: hidden;
              }
              body * {
                visibility: hidden;
              }
              #print-area, #print-area * {
                visibility: visible;
              }
              #print-area {
                width: 1.5in;
                height: 1in;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding: 0;
                margin: 0;
                font-family: Arial, sans-serif;
                text-align: center;
              }
              #print-area .title {
                font-size: 8pt;
                font-weight: bold;
                margin: 0;
                padding: 0;
              }
              #print-area .product-info {
                font-size: 5pt;
                font-weight: bold;
                margin: 0;
              }
              #print-area img {
                width: 1.3in;
                height: 0.3in;
                object-fit: contain;
                margin: 0;
              }
              #print-area .price {
                font-size: 10pt;
                font-weight: bold;
                margin: 0;
              }
            }
          `}
        </style>

        <div className="w-full max-w-xl space-y-6 bg-white shadow-md rounded-lg p-6">
          <Link to="/" className="bg-black text-white p-2 rounded">
            Home
          </Link>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Print Variant Barcode
          </h2>

          {/* 🔍 Custom searchable dropdown */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={selectedSubBarcode}
              // onChange={(e) => setSelectedSubBarcode(e.target.value)}
              onChange={(e) => {
                setSelectedSubBarcode(e.target.value);
                setShowSuggestions(true); // show dropdown while typing
              }}
              placeholder="Type or select barcode..."
              className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* {selectedSubBarcode && (
              <ul className="absolute bg-white border border-gray-300 rounded shadow-md w-full max-h-40 overflow-y-auto z-10">
                {uniqueSubBarcodes
                  .filter((sub) =>
                    sub.toLowerCase().includes(selectedSubBarcode.toLowerCase())
                  )
                  .map((sub, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      // onClick={() => setSelectedSubBarcode(sub)}
                      onClick={() => {
                        setSelectedSubBarcode(sub); // set value
                        setShowSuggestions(false); // hide dropdown
                      }}
                    >
                      {sub}
                    </li>
                  ))}
              </ul>
            )} */}

            {showSuggestions && selectedSubBarcode && (
  <ul className="absolute bg-white border border-gray-300 rounded shadow-md w-full max-h-40 overflow-y-auto z-50">
    {uniqueSubBarcodes
      .filter((sub) =>
        sub.toLowerCase().includes(selectedSubBarcode.toLowerCase())
      )
      .map((sub, idx) => (
        <li
          key={idx}
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => {
            setSelectedSubBarcode(sub);
            setShowSuggestions(false); // ✅ hide dropdown after select
          }}
        >
          {sub}
        </li>
      ))}
  </ul>
)}

          </div>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className={`mt-4 px-4 py-2 rounded text-white font-semibold transition ${
              selectedVariant
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-white cursor-not-allowed"
            }`}
            disabled={!selectedVariant}
          >
            Print
          </button>

          {/* 🖨️ Barcode Preview */}
          {selectedVariant && (
            <div
              ref={printRef}
              id="print-area"
              className="barcode-box border border-gray-300 px-1 rounded text-center mx-auto bg-white w-full max-w-sm"
            >
              <p className="title">E-commerce</p>

              <p className="product-info">
                {selectedVariant.productTitle} |{" "}
                {selectedVariant.color || "N/A"}
              </p>

              {selectedVariant.subBarcodeSvg ? (
                <img
                  src={selectedVariant.subBarcodeSvg}
                  alt={`Barcode ${selectedVariant.subBarcode}`}
                />
              ) : (
                <p>No barcode image</p>
              )}

              <p className="price">Price: {selectedVariant.productPrice}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubBarcodeImage;
