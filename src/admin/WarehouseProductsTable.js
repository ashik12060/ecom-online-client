
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";

const WarehouseProductsTable = () => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/warehouse-products/show");
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

  // Handle status change
  // const handleStatusChange = async (productId, newStatus, prevStatus) => {
  //   try {
  //     const response = await axiosInstance.put(`/api/warehouse-products/update-status/${productId}`, {
  //       status: newStatus,
  //     });

  //     if (response.status === 200) {
  //       setWarehouseProducts((prev) =>
  //         prev.map((product) =>
  //           product._id === productId ? { ...product, status: newStatus } : product
  //         )
  //       );
  //       toast.success(`Status updated to ${newStatus}`);
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     toast.error("Failed to update status");
  //   }
  // };



//   const handleStatusChange = async (productId, newStatus, prevStatus) => {
//     try {
//         const response = await axiosInstance.put(`/api/warehouse-products/update-status/${productId}`, {
//             status: newStatus,
//         });

//         console.log("API Response:", response.data);

//         if (response.status === 200) {
//             setWarehouseProducts((prev) =>
//                 prev.map((product) =>
//                     product._id === productId ? { ...product, status: newStatus } : product
//                 )
//             );
//             toast.success(`Status updated to ${newStatus}`);
//         }
//     } catch (error) {
//         console.error("Error updating status:", error);
//         console.error("Error response:", error.response?.data); // Log error details
//         toast.error("Failed to update status");
//     }
// };


// const handleStatusChange = async (productId, newStatus) => {
//   try {
//     const response = await axiosInstance.put(`/api/warehouse-products/update-status/${productId}`, {
//       status: newStatus,
//     });

//     if (response.status === 200) {
//       setWarehouseProducts((prev) =>
//         prev.map((product) =>
//           product._id === productId
//             ? {
//                 ...product,
//                 status: newStatus,
//                 quantity: newStatus === "Canceled" ? product.originalQuantity : product.quantity,
//               }
//             : product
//         )
//       );
//       toast.success(`Status updated to ${newStatus}`);
//     }
//   } catch (error) {
//     console.error("Error updating status:", error);
//     toast.error("Failed to update status");
//   }
// };


const handleStatusChange = async (productId, newStatus) => {
  try {
    const response = await axiosInstance.put(`/api/warehouse-products/update-status/${productId}`, {
      status: newStatus,
    });

    if (response.status === 200) {
      setWarehouseProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? {
                ...product,
                status: newStatus,
                quantity:
                  newStatus === "Canceled" ? product.originalQuantity : product.quantity, // Restore original quantity on cancel
              }
            : product
        )
      );
      toast.success(`Status updated to ${newStatus}`);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status");
  }
};



  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Warehouse Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>
                  <Select
                    value={product.status || "Pending"}
                    onChange={(e) => handleStatusChange(product._id, e.target.value, product.status)}
                    sx={{ width: 150 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Sold Out">Sold Out</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WarehouseProductsTable;
