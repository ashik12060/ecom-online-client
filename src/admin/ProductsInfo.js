// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { Box, Button, IconButton, Paper, Grid } from "@mui/material";
// import { DataGrid, GridAddIcon, gridClasses } from "@mui/x-data-grid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
// import Loader from "../components/Loader";

// const ProductsInfo = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // server-side pagination state
//   const [page, setPage] = useState(0);         // DataGrid uses 0-based
//   const [pageSize, setPageSize] = useState(10);
//   const [rowCount, setRowCount] = useState(0);

//   // Fetch products
//   const displayProduct = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/show?page=${page + 1}&limit=${pageSize}`
//       );

//       // add serial number field
//       const start = page * pageSize;
//       const withSl = (data?.products || []).map((p, idx) => ({
//         ...p,
//         sl: start + idx + 1,
//       }));

//       setProducts(withSl);
//       setRowCount(data?.pagination?.total || 0);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load products in admin");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     displayProduct();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, pageSize]);

//   // Delete product
//   const deleteProductById = async (e, id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const { data } = await axiosInstance.delete(
//           `${process.env.REACT_APP_API_URL}/api/delete/product/${id}`
//         );
//         if (data.success === true) {
//           toast.success(data.message);
//           displayProduct(); // refresh
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to delete product");
//       }
//     }
//   };

//   // DataGrid columns
//   const ProductColumns = [
//     { field: "sl", headerName: "SL", width: 80, sortable: false },
//     { field: "_id", headerName: "Post ID", width: 150 },
//     { field: "title", headerName: "Post title", width: 150 },
//     {
//       field: "postedBy",
//       headerName: "Posted by",
//       width: 150,
//       valueGetter: (data) => data.row.postedBy?.name || "Unknown",
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 180,
//       renderCell: (params) =>
//         moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
//     },
//     {
//       field: "Actions",
//       headerName: "Actions",
//       width: 120,
//       sortable: false,
//       renderCell: (value) => (
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <Link to={`/admin/product/edit/${value.row._id}`}>
//             <IconButton aria-label="edit" className="text-sm">
//               <FontAwesomeIcon icon={faPenToSquare} />
//             </IconButton>
//           </Link>
//           <IconButton
//             aria-label="delete"
//             onClick={(e) => {
//               e.stopPropagation();
//               deleteProductById(e, value.row._id);
//             }}
//           >
//             <FontAwesomeIcon className="text-red-500" icon={faTrashCan} />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Box>
//         <h3 className="mt-3">
//           <span className="py-2 px-4 rounded bg-primary text-white">
//             PRODUCTS
//           </span>
//         </h3>

//         <Grid container spacing={2} justifyContent="flex-end" sx={{ pb: 2 }}>
//           <Grid item>
//             <Button variant="contained" color="success" startIcon={<GridAddIcon />}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/admin/product/create"
//               >
//                 Add Products
//               </Link>
//             </Button>
//           </Grid>
//         </Grid>

//         <Paper sx={{ bgColor: "white", p: 2 }}>
//           {loading ? (
//             <p className="text-center text-gray-500"><Loader /></p>
//           ) : products.length > 0 ? (
//             <Box sx={{ height: "auto", width: "100%" }}>
//               <DataGrid
//                 getRowId={(row) => row._id}
//                 rows={products}
//                 columns={ProductColumns}
//                 rowCount={rowCount}
//                 paginationMode="server"
//                 paginationModel={{ page, pageSize }}
//                 onPaginationModelChange={(model) => {
//                   setPage(model.page);
//                   setPageSize(model.pageSize);
//                 }}
//                 rowsPerPageOptions={[10, 20, 50]}
//                 loading={loading}
//                 autoHeight
//                 sx={{
//                   "& .MuiTablePagination-displayedRows": { color: "black" },
//                   color: "black",
//                   [`& .${gridClasses.row}`]: { bgColor: "white" },
//                 }}
//               />
//             </Box>
//           ) : (
//             <p className="text-center text-gray-500">No products found</p>
//           )}
//         </Paper>
//       </Box>
//     </div>
//   );
// };

// export default ProductsInfo;




import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Paper, Grid } from "@mui/material";
import { DataGrid, GridAddIcon, gridClasses } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Loader from "../components/Loader";

const ProductsInfo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // server-side pagination
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const displayProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/admin/products/show?page=${page + 1}&limit=${pageSize}`
      );

      // Add serial number
      const start = page * pageSize;
      const withSl = (data?.products || []).map((p, idx) => ({
        ...p,
        sl: start + idx + 1,
      }));

      setProducts(withSl);
      setRowCount(data?.pagination?.total || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products in admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayProduct();
  }, [page, pageSize]);

  const deleteProductById = async (e, id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/product/${id}`
        );
        if (data.success === true) {
          toast.success(data.message);
          displayProduct();
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product");
      }
    }
  };

  const ProductColumns = [
    { field: "sl", headerName: "SL", width: 80, sortable: false },
    { field: "_id", headerName: "Post ID", width: 150 },
    { field: "title", headerName: "Post Title", width: 200 },
    {
      field: "postedBy",
      headerName: "Posted By",
      width: 150,
      valueGetter: (data) => data.row.postedBy?.name || "Unknown",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (value) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to={`/admin/product/edit/${value.row._id}`}>
            <IconButton aria-label="edit" className="text-sm">
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteProductById(e, value.row._id);
            }}
          >
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Box>
        <h3 className="mt-3">
          <span className="py-2 px-4 rounded bg-violet-600 text-white">
            PRODUCTS
          </span>
        </h3>

        <Grid container spacing={2} justifyContent="flex-end" sx={{ pb: 2 }}>
          <Grid item>
            <Button variant="contained" className="bg-violet-600" startIcon={<GridAddIcon />}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/admin/product/create"
              >
                Add Products
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ bgColor: "white", p: 2 }}>
          {loading ? (
            <p className="text-center text-gray-500"><Loader /></p>
          ) : products.length > 0 ? (
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={products}
                columns={ProductColumns}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={(model) => {
                  setPage(model.page);
                  setPageSize(model.pageSize);
                }}
                rowsPerPageOptions={[10, 20, 50]}
                loading={loading}
                autoHeight
                sx={{
                  "& .MuiTablePagination-displayedRows": { color: "black" },
                  color: "black",
                  [`& .${gridClasses.row}`]: { bgColor: "white" },
                }}
              />
            </Box>
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default ProductsInfo;
