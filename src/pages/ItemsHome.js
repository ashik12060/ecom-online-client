// import { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";
// import { Box, Container, Grid } from "@mui/material";
// import Navbar from "../components/Navbar";
// import moment from "moment";
// import Loader from "../components/Loader";
// import { io } from "socket.io-client";
// import axiosInstance from "./axiosInstance";
// import ProductCard from "../components/ProductCard";
// import ItemCard from "../components/ItemCard";
// import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import axiosInstance from './axiosInstance';

// const socket = io("/", {
//   reconnection: true,
// });

// const ItemsHome = () => {
//   // const [posts, setPosts] = useState([]);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [postAddLike, setPostAddLike] = useState([]);
//   const [postRemoveLike, setPostRemoveLike] = useState([]);
//   const [visibleItems, setVisibleItems] = useState(4);

//   const showMoreItems = () => {
//     setVisibleItems(items.length);
//   };

//   const showItems = async () => {
//     setLoading(true);
//     try {
//       //
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/items/show`
//       );
//       setItems(data.items);
//       setLoading(false);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     showItems();
//   }, []);

//   // useEffect(() => {
//   //     socket.on('add-like', (newPosts) => {
//   //         setPostAddLike(newPosts);
//   //         setPostRemoveLike('');
//   //     });
//   //     socket.on('remove-like', (newPosts) => {
//   //         setPostRemoveLike(newPosts);
//   //         setPostAddLike('');
//   //     });
//   // }, [])

//   let uiItems =
//     postAddLike.length > 0
//       ? postAddLike
//       : postRemoveLike.length > 0
//       ? postRemoveLike
//       : items.slice(0, visibleItems);

//   return (
//     <Box sx={{ bgColor: "#fafafa", minHeight: "100vh" }}>
//       <div className='text-center pt-4  '>
//       <h3><span  className='bg-color text-white px-4 py-1'>Popular Products</span></h3>
//     </div>
//       <Container sx={{ pt: 3, pb: 5, minHeight: "83vh" }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid
//             container
//             spacing={{ xs: 2, md: 3 }}
//             columns={{ xs: 4, sm: 8, md: 12 }}
//           >
//             {loading ? (
//               <Loader />
//             ) : (
//               uiItems.slice(0, visibleItems).map((item, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={3}
//                   lg={3}
//                   key={index}
//                   className="overflow-hidden"
//                 >
//                   <ItemCard
//                     id={item._id}
//                     title={item.title}
//                     content={item.content}
//                     image={item.image ? item.image.url : ""}
//                     subheader={moment(item.createdAt).format("MMMM DD, YYYY")}
//                     comments={item.comments.length}
//                     likes={item.likes.length}
//                     likesId={item.likes}
//                     showItems={showItems}
//                   />
//                 </Grid>
//               ))
//             )}
//           </Grid>
//           {items.length > 4 && visibleItems < items.length && (
//             <div className="text-center my-5">
//               <button onClick={()=>showMoreItems()} className="see-more-button fw-bold">
//                 See More <FontAwesomeIcon icon={faAnglesRight} />
//               </button>
//             </div>
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default ItemsHome;
