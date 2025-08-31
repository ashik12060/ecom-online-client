import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import am from "../assets/333.png";
import axiosInstance from "../pages/axiosInstance";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const UserInfo = ({
  id,
  title,
  user,
  price,
  image,
  content,
  subheader,
  comments,
  likes,
  showProducts,
  likesId,
}) => {
  const { userInfo } = useSelector((state) => state.signIn);

  const [truncatedContent, setTruncatedContent] = useState("");
  const history = useNavigate();
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

  useEffect(() => {
    const contentArray = content.split("\n");
    const truncated = contentArray.slice(0, 8).join("\n");
    setTruncatedContent(truncated);
  }, [content]);

  const addLike = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/addlike/product/${id}`
      );
      console.log("likes", data.product);
      if (data.success == true) {
        showProducts();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const removeLike = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/removelike/product/${id}`
      );
      console.log("remove likes", data.product);
      if (data.success == true) {
        showProducts();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const addToCart = () => {
    // Redirect to the checkout page only if the user is authenticated
    if (isAuthenticated) {
      // Construct the URL with query parameter
      // const checkoutUrl = `/product/${id}?totalPrices=${totalPrices}`;
      // Navigate to the checkout page

      history("/singlepro");
    } else {
      // Redirect the user to the login page if not authenticated
      history("/login");
    }
  };
  return (
    <div className="overflow-hidden ">
      <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6  ">
        <div id="productInfo" className="   w-100  shadow">
          <div className="mb-2 pb-3 rounded px-2 py-2 border border-1 ">
            {/* <Link to={`/show-users/${id}`}>
              <img
                className="advisor-img w-100 img-height border rounded"
                src={image}
                alt="advisor_team"
              />
            </Link> */}
            <p className="pt-2 px-1 fw-bold">The user: {user}</p>

            
            <br />
          
            <br />
            
            <br />
            <Link to={`/product/${id}`}>
              <button className="bg-color  text-white border-0 px-2 py-1">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
