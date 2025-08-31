// import { useEffect } from "react";
// import JsBarcode from "jsbarcode";

// const ProductBarcode = ({ product }) => {
//   useEffect(() => {
//     // Barcode generation when product data is available
//     if (product && product._id) {
//       JsBarcode(`#barcode-${product._id}`, product._id, {
//         format: "CODE128", // Barcode format (you can change this as needed)
//         width: 2,          // Width of the barcode
//         height: 100,       // Height of the barcode
//         displayValue: true, // Show the value below the barcode (optional)
//         fontSize: 16,      // Font size of the barcode value
//       });
//     }
//   }, [product]);

//   return (
//     <div className="barcode-container">
//       <h3>{product.title}</h3>
//       <svg id={`barcode-${product._id}`}></svg> {/* Barcode will be rendered here */}
//     </div>
//   );
// };

// export default ProductBarcode;



import { useEffect } from "react";
import JsBarcode from "jsbarcode";

const ProductBarcode = ({ product }) => {
  useEffect(() => {
    // Check if product exists and has an ID before generating the barcode
    if (product && product._id) {
      JsBarcode(`#barcode-${product._id}`, product._id, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 16,
      });
    }
  }, [product]); // Re-run effect when product changes

  // Guard clause: Avoid rendering if product is null or undefined
  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h3>{product.title}</h3>
      <svg id={`barcode-${product._id}`}></svg>
    </div>
  );
};

export default ProductBarcode;
