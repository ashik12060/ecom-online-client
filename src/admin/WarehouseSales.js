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
  useMediaQuery,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../pages/axiosInstance";
import { Link } from "react-router-dom";

const WarehouseSales = () => {
  const [warehouseSales, setWarehouseSales] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch sales data
  useEffect(() => {
    const fetchWarehouseSales = async () => {
      try {
        const response = await axiosInstance.get("/api/warehouse-sales/show");
        if (response.data && Array.isArray(response.data)) {
          setWarehouseSales(response.data);
        } else {
          setWarehouseSales([]);
        }
      } catch (error) {
        console.error("Error fetching warehouseSales:", error);
        setWarehouseSales([]);
      }
    };

    fetchWarehouseSales();
  }, []);

  const handleStatusChange = async (saleId, productId, newStatus) => {
    try {
      console.log("Updating status:", { saleId, productId, newStatus });

      const response = await axiosInstance.put(
        `/api/warehouse-sales/update-status/${saleId}/${productId}`,
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        setWarehouseSales((prevSales) =>
          prevSales.map((sale) => {
            if (sale._id === saleId) {
              return {
                ...sale,
                warehouseProducts: sale.warehouseProducts.map((product) =>
                  product.productId._id === productId
                    ? { ...product, status: newStatus }
                    : product
                ),
              };
            }
            return sale;
          })
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data : error
      );
      toast.error("Failed to update status");
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Sold Out":
        return "#ffb3b3"; // Light red for Sold Out
      case "Canceled":
        return "#ffcc99"; // Light orange for Canceled
      case "Pending":
      default:
        return "#d1e7dd"; // Light green for Pending
    }
  };

  // **Calculate Total Price & Quantity of Sold Out Products**
  const soldOutTotals = warehouseSales.reduce(
    (totals, sale) => {
      sale.warehouseProducts.forEach((product) => {
        if (product.status === "Sold Out") {
          totals.totalPrice += product.price * product.quantity;
          totals.totalQuantity += product.quantity;
        }
      });
      return totals;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );

  return (
    <Box sx={{ width: "100%", px: 2, mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Warehouse Sales
      </Typography>

      {/* Total Sold Out Information */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6">Total Sold Out Summary</Typography>
        <p>
          <strong>Total Sold Out Price:</strong> $
          {soldOutTotals.totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Total Sold Out Quantity:</strong>{" "}
          {soldOutTotals.totalQuantity}
        </p>
      </Box>

      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success">
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/warehouse-product/create"
          >
            Add Product
          </Link>
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          {/* <TableHead>
            <TableRow>
              {!isMobile && <TableCell><b>Customer</b></TableCell>}
              <TableCell><b>Total Price</b></TableCell>
              <TableCell><b>Product</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              {!isMobile && <TableCell><b>Type</b></TableCell>}
              <TableCell><b>Update Status</b></TableCell>
            </TableRow>
          </TableHead> */}
          {/* <TableBody>
            {warehouseSales.map((sale) =>
              sale.warehouseProducts.map((product) => (
                <TableRow key={product.productId._id}>
                  {!isMobile && (
                    <TableCell sx={{ minWidth: "120px" }}>
                      {sale.customerName}
                    </TableCell>
                  )}
                  <TableCell sx={{ minWidth: "100px" }}>
                    ${sale.totalPrice}
                  </TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>{product.title}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>${product.price}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>{product.quantity}</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ minWidth: "100px" }}>{product.type}</TableCell>
                  )}
                  
                  <TableCell sx={{ minWidth: "150px" }}>
                    <Select
                      value={product.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(sale._id, product.productId?._id || product.productId, e.target.value)
                      }
                      sx={{ width: 130, backgroundColor: getStatusBackgroundColor(product.status) }}
                    >
                      <MenuItem value="Pending" sx={{ backgroundColor: getStatusBackgroundColor("Pending") }}>
                        Pending
                      </MenuItem>
                      <MenuItem value="Sold Out" sx={{ backgroundColor: getStatusBackgroundColor("Sold Out") }}>
                        Sold Out
                      </MenuItem>
                      <MenuItem value="Canceled" sx={{ backgroundColor: getStatusBackgroundColor("Canceled") }}>
                        Canceled
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody> */}

          <TableHead>
            <TableRow>
              <TableCell>
                <b>S/N</b>
              </TableCell>{" "}
              {/* Serial Number Column */}
              {!isMobile && (
                <TableCell>
                  <b>Customer</b>
                </TableCell>
              )}
              <TableCell>
                <b>Total Price</b>
              </TableCell>
              <TableCell>
                <b>Product</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              {!isMobile && (
                <TableCell>
                  <b>Type</b>
                </TableCell>
              )}
              <TableCell>
                <b>Update Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {(() => {
    let serialNumber = 1; // Initialize serial number
    return warehouseSales.flatMap((sale) =>
      sale.warehouseProducts.map((product) => (
        <TableRow key={`${sale._id}-${product.productId._id}`}>
          {/* Continuous Serial Number */}
          <TableCell sx={{ minWidth: "50px" }}>{serialNumber++}</TableCell>

          {!isMobile && (
            <TableCell sx={{ minWidth: "120px" }}>{sale.customerName}</TableCell>
          )}
          <TableCell sx={{ minWidth: "100px" }}>${sale.totalPrice}</TableCell>
          <TableCell sx={{ minWidth: "150px" }}>{product.title}</TableCell>
          <TableCell sx={{ minWidth: "100px" }}>${product.price}</TableCell>
          <TableCell sx={{ minWidth: "100px" }}>{product.quantity}</TableCell>
          {!isMobile && (
            <TableCell sx={{ minWidth: "100px" }}>{product.type}</TableCell>
          )}
          
          <TableCell sx={{ minWidth: "150px" }}>
            <Select
              value={product.status || "Pending"}
              onChange={(e) =>
                handleStatusChange(
                  sale._id,
                  product.productId?._id || product.productId,
                  e.target.value
                )
              }
              sx={{
                width: 130,
                backgroundColor: getStatusBackgroundColor(product.status),
              }}
            >
              <MenuItem value="Pending" sx={{ backgroundColor: getStatusBackgroundColor("Pending") }}>
                Pending
              </MenuItem>
              <MenuItem value="Sold Out" sx={{ backgroundColor: getStatusBackgroundColor("Sold Out") }}>
                Sold Out
              </MenuItem>
              <MenuItem value="Canceled" sx={{ backgroundColor: getStatusBackgroundColor("Canceled") }}>
                Canceled
              </MenuItem>
            </Select>
          </TableCell>
        </TableRow>
      ))
    );
  })()}
</TableBody>

          
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WarehouseSales;
