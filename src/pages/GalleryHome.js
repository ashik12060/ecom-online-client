// import { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";
// import { Box, Container, Grid } from "@mui/material";
// import Navbar from "../components/Navbar";
// import moment from "moment";
// import Loader from "../components/Loader";
// import { io } from "socket.io-client";
// import axiosInstance from "./axiosInstance";
// import GalleryCard from "../components/GalleryCard";
// import Footer from "../components/Shared/Footer/Footer";
// import Header from "../components/Shared/Header/Header";
// import { CartProvider } from "../hooks";
// // import axiosInstance from './axiosInstance';

// const socket = io("/", {
//   reconnection: true,
// });

// const GalleryHome = () => {
//   const [galleries, setGalleries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [postAddLike, setPostAddLike] = useState([]);
//   const [postRemoveLike, setPostRemoveLike] = useState([]);

//   const showGalleries = async () => {
//     setLoading(true);
//     try {
//       //
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/galleries/show`
//       );
//       setGalleries(data.galleries);
//       setLoading(false);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     showGalleries();
//   }, []);

//   useEffect(() => {
//     socket.on("add-like", (newGalleries) => {
//       setPostAddLike(newGalleries);
//       setPostRemoveLike("");
//     });
//     socket.on("remove-like", (newGalleries) => {
//       setPostRemoveLike(newGalleries);
//       setPostAddLike("");
//     });
//   }, []);

//   let uiGalleries =
//     postAddLike.length > 0
//       ? postAddLike
//       : postRemoveLike.length > 0
//       ? postRemoveLike
//       : galleries;

//   return (
//     <Box sx={{ bgColor: "#fafafa", minHeight: "100vh" }}>
//       <div className="text-center mt-3  ">
//         <h3>
//           <span className="product-header ">GALLERY</span>
//         </h3>
//       </div>
//       <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid
//             container
//             spacing={{ xs: 2, md: 3 }}
//             columns={{ xs: 4, sm: 8, md: 12 }}
//           >
//             {loading ? (
//               <Loader />
//             ) : (
//               uiGalleries.map((gallery, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={3}
//                   lg={3}
//                   key={index}
//                   className="overflow-hidden"
//                 >
//                   <GalleryCard
//                     id={gallery._id}
//                     title={gallery.title}
//                     content={gallery.content}
//                     image={gallery.image ? gallery.image.url : ""}
//                     subheader={moment(gallery.createdAt).format(
//                       "MMMM DD, YYYY"
//                     )}
//                     // comments={gallery.comments.length}
//                     // likes={gallery.likes.length}
//                     // likesId={gallery.likes}
//                     showGalleries={showGalleries}
//                   />
//                 </Grid>
//               ))
//             )}
//           </Grid>
//         </Box>
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default GalleryHome;
