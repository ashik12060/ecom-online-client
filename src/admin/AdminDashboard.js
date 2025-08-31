import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../pages/axiosInstance";
import Header from "../components/Shared/Header/Header";
import { CartProvider } from "../hooks";
import OrderSingle from "./OrderSingle";
import "./AdminDashboard.css";
import Users from "./Users/Users";
import Dashboard from "./Dashboard";
import SalesPos from "./SalesPos";
import AttendanceReport from "./AttendanceReport";
import ProductsInfo from "./ProductsInfo";
import ShopProductList from "./ShopProductList";
import WarehouseProductsTable from "./WarehouseProductsTable";
import WarehouseSales from "./WarehouseSales";
import ShopProducts from "./ShopProducts";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  const [galleries, setGalleries] = useState([]);
  // const [products, setProducts] = useState([]);
  const [topBanners, setTopBanners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);

    const [activeTab, setActiveTab] = useState("dashboard");


  // Fetch orders from server
  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // display post
  const displayPost = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/posts/show`
      );
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayPost();
  }, []);

  // display item
  const displayItem = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/items/show`
      );
      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayItem();
  }, []);

  //display displayTopBanners
  const displayTopBanners = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/topBanners/show`
      );
      setTopBanners(data.topBanners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayTopBanners();
  }, []);

  //   //display gallery
  const displayGallery = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/galleries/show`
      );
      setGalleries(data.galleries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayGallery();
  }, []);

  //   //delete post by Id
  const deletePostById = async (e, id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const result = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/post/${id}`
        );
        if (result?.data?.success === true) {
          toast.success("post deleted");
          displayPost();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };
  //delete item by Id
  const deleteItemById = async (e, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const result = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/item/${id}`
        );
        if (result?.data?.success === true) {
          toast.success("Item deleted");
          displayItem();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  //delete top banner by Id
  const deleteTopBannerById = async (e, id) => {
    
    if (window.confirm("Are you sure you want to delete this top banner?")) {
      try {
        //
        const { data } = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/topBanner/${id}`
        );
        if (data.success === true) {
          toast.success(data.message);
          displayTopBanners();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  //delete gallery by Id
  const deleteGalleryById = async (e, id) => {
    
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        //
        const { data } = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/gallery/${id}`
        );
        if (data.success === true) {
          toast.success(data.message);
          displayGallery();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  // Delete order by ID
  const deleteOrderById = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`
        );
        if (response?.data?.success) {
          toast.success("Order deleted successfully");
          fetchOrders();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order");
      }
    }
  };

  //   // post columns
  const PostColumns = [
    {
      field: "_id",
      headerName: "Post ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Post title",
      width: 150,
    },

    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img width="40%" src={params.row.image.url} alt="img" />
      ),
    },
    // {
    //   field: "likes",
    //   headerName: "Likes",
    //   width: 150,
    //   renderCell: (params) => params.row.likes.length,
    // },
    // {
    //   field: "comments",
    //   headerName: "Comments",
    //   width: 150,
    //   renderCell: (params) => params.row.comments.length,
    // },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy.name,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/admin/post/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deletePostById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];
  //   // Item columns
  const ItemColumns = [
    {
      field: "_id",
      headerName: "Item ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Item title",
      width: 150,
    },

    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img width="40%" src={params.row.image.url} alt="img" />
      ),
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 150,
      renderCell: (params) => params.row.likes.length,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 150,
      renderCell: (params) => params.row.comments.length,
    },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy.name,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/admin/item/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deleteItemById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];
  // // items end

  //   //top banner columns add extra
  const TopBannersColumns = [
    {
      field: "_id",
      headerName: "Post ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Top banner title",
      width: 150,
    },

    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => <img width="40%" src={params.row.image.url} />,
    },

    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy.name,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/admin/topBanner/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deleteTopBannerById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  //    // Gallery columns
  const GalleryColumns = [
    {
      field: "_id",
      headerName: "Gallery ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Gallery title",
      width: 150,
    },

    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img width="40%" src={params.row.image.url} alt="img" />
      ),
    },
    // {
    //   field: "likes",
    //   headerName: "Likes",
    //   width: 150,
    //   renderCell: (params) => params.row.likes.length,
    // },
    // {
    //   field: "comments",
    //   headerName: "Comments",
    //   width: 150,
    //   renderCell: (params) => params.row.comments.length,
    // },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy.name,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/admin/gallery/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deleteGalleryById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // order columns
  const orderColumns = [
    { field: "_id", headerName: "Order ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "orderDate", headerName: "Order Date", width: 200 },
    { field: "orders", headerName: "Quantity", width: 200 },
    // Add more columns as needed
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => deleteOrderById(params.row._id)}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];
  const orderItems = [
    { field: "_id", headerName: "Order ID", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    // Add more columns as needed
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => deleteOrderById(params.row._id)}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // seller information
  // Ensure that sellers is initialized as an empty array
  const [sellers, setSellers] = useState([]); // Create a new state for sellers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/seller-products`
        );
    
        setSellers(response.data.products); // Update state with sellers data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

<>
  <CartProvider>
    <Header />
  </CartProvider>

  <div className="flex flex-col md:flex-row mt-3">
    {/* Sidebar Nav */}
    <div className="flex md:flex-col w-full md:w-1/5 bg-gray-100 rounded-lg p-4 space-y-2 md:space-y-2 mb-4 md:mb-0">
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "dashboard" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("dashboard")}
      >
        Dashboard
      </button>
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "websiteSales" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("websiteSales")}
      >
        Website Sales
      </button>
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "products" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("products")}
      >
        Products
      </button>
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "topBanner" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("topBanner")}
      >
        Top Banner
      </button>
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "blogPosts" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("blogPosts")}
      >
        Blog Posts
      </button>
      <button
        className={`rounded border border-gray-300 py-2 px-4 text-left w-full md:w-auto ${activeTab === "attendance" ? "bg-violet-600 text-white" : "bg-gray-100 text-black hover:bg-violet-100"}`}
        onClick={() => setActiveTab("attendance")}
      >
        Attendance Report
      </button>
    </div>

    {/* Tab Content */}
    <div className="flex-1 bg-gray-100 rounded-lg p-4 md:ml-4">
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "websiteSales" && <OrderSingle />}
      {activeTab === "products" && <ProductsInfo />}

      {/* Top Banner */}
      {activeTab === "topBanner" && (
        <Box>
          <h3 className="mt-3">
            <span className="py-2 px-4 rounded bg-primary text-white">Top banner</span>
          </h3>
          <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              <Link style={{ color: "white", textDecoration: "none" }} to="/admin/topBanner/create">
                Add Top banner
              </Link>
            </Button>
          </Box>
          <Paper sx={{ bgColor: "white" }}>
            <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={topBanners}
                columns={TopBannersColumns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                autoHeight
              />
            </Box>
          </Paper>
        </Box>
      )}

      {/* Blog Posts */}
      {activeTab === "blogPosts" && (
        <Box className="mt-5">
          <h3>
            <span className="py-2 px-4 rounded bg-primary text-white">Blog Posts</span>
          </h3>
          <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              sx={{
                fontSize: "1rem",
                padding: "8px 16px",
                "@media (max-width: 768px)": {
                  fontSize: "0.9rem",
                  padding: "6px 12px",
                },
              }}
            >
              <Link style={{ color: "white", textDecoration: "none" }} to="/admin/post/create">
                Create Post
              </Link>
            </Button>
          </Box>
          <Paper sx={{ bgColor: "white" }}>
            <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={posts}
                columns={PostColumns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                autoHeight
              />
            </Box>
          </Paper>
        </Box>
      )}

      {activeTab === "attendance" && <AttendanceReport />}
    </div>
  </div>
</>

  );
};

export default AdminDashboard;
