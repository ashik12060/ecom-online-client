// import { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";
// import { Box, Container, Grid } from "@mui/material";
// import Navbar from "../components/Navbar";
// import moment from "moment";
// import Loader from "../components/Loader";
// import { io } from "socket.io-client";
// import axiosInstance from "./axiosInstance";
// import Footer from "../components/Shared/Footer/Footer";
// import { CartProvider } from "../hooks";
// import Header from "../components/Shared/Header/Header";

// // import axiosInstance from './axiosInstance';

// const socket = io("/", {
//   reconnection: true,
// });

// const BlogHome = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [postAddLike, setPostAddLike] = useState([]);
//   const [postRemoveLike, setPostRemoveLike] = useState([]);

//   const showPosts = async () => {
//     setLoading(true);
//     try {
//       //
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/posts/show`
//       );
//       setPosts(data.posts);
//       setLoading(false);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     showPosts();
//   }, []);

//   useEffect(() => {
//     socket.on("add-like", (newPosts) => {
//       setPostAddLike(newPosts);
//       setPostRemoveLike("");
//     });
//     socket.on("remove-like", (newPosts) => {
//       setPostRemoveLike(newPosts);
//       setPostAddLike("");
//     });
//   }, []);

//   let uiPosts =
//     postAddLike.length > 0
//       ? postAddLike
//       : postRemoveLike.length > 0
//       ? postRemoveLike
//       : posts;

//   return (
//     <>
//       <CartProvider>
//         <Header />
//       </CartProvider>
//       <Box sx={{ bgColor: "#fafafa", minHeight: "100vh" }}>
//         <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid
//               container
//               spacing={{ xs: 2, md: 3 }}
//               columns={{ xs: 4, sm: 8, md: 12 }}
//             >
//               {loading ? (
//                 <Loader />
//               ) : (
//                 uiPosts.map((post, index) => (
//                   <Grid
//                     item
//                     xs={12}
//                     sm={4}
//                     md={4}
//                     lg={4}
//                     key={index}
//                     className="overflow-hidden"
//                   >
//                     <PostCard
//                       id={post._id}
//                       title={post.title}
//                       content={post.content}
//                       image={post.image ? post.image.url : ""}
//                       subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
//                       comments={post.comments.length}
//                       likes={post.likes.length}
//                       likesId={post.likes}
//                       showPosts={showPosts}
//                     />
//                   </Grid>
//                 ))
//               )}
//             </Grid>
//           </Box>
//         </Container>
//         <Footer />
//       </Box>
//     </>
//   );
// };

// export default BlogHome;
