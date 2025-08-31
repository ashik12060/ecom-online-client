import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HouseIcon from "@mui/icons-material/House";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogoutAction } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Shared/Header/Header";

const pages = ["Home", "Log In"];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.signIn);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    // <AppBar position="static">
    //   <Container sx={{ display: "flex", justifyContent: "right" }}>
    //     {/* principal Menu */}
    //     <Toolbar disableGutters>
    //       <div className="d-flex justify-content-between">
    //         <Box className="d-flex justify-content-between">
    //         <Box className="d-flex flex-row ">
    //           <Typography
    //             variant="h6"
    //             noWrap
    //             component="a"
    //             href="/"
    //             sx={{
    //               mr: 2,
    //               display: { xs: "flex", md: "flex" },
    //               fontFamily: "monospace",
    //               fontWeight: 700,
    //               letterSpacing: ".3rem",
    //               color: "inherit",
    //               textDecoration: "none",
    //             }}
    //           >
    //             HOME
    //           </Typography>

    //           <Typography
    //             variant="h6"
    //             noWrap
    //             component="a"
    //             href="/products"
    //             sx={{
    //               mr: 2,
    //               display: { xs: "flex", md: "flex" },
    //               fontFamily: "monospace",
    //               fontWeight: 700,
    //               letterSpacing: ".3rem",
    //               color: "inherit",
    //               textDecoration: "none",
    //             }}
    //           >
    //             PRODUCTS
    //           </Typography>
    //           <Typography
    //             variant="h6"
    //             noWrap
    //             component="a"
    //             href="/bloghome"
    //             sx={{
    //               mr: 2,
    //               display: { xs: "flex", md: "flex" },
    //               fontFamily: "monospace",
    //               fontWeight: 700,
    //               letterSpacing: ".3rem",
    //               color: "inherit",
    //               textDecoration: "none",
    //             }}
    //           >
    //             BLOG
    //           </Typography>
    //         </Box>

    //         <Box sx={{ flexGrow: 0 }}>
    //           <Tooltip title="Open settings">
    //             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //               <Avatar alt="Remy Sharp" src="" />
    //             </IconButton>
    //           </Tooltip>
    //           <Menu
    //             PaperProps={{
    //               sx: {
    //                 "& 	.MuiMenu-list": {
    //                   bgColor: "primary.white",
    //                   color: "white",
    //                 },
    //               },
    //             }}
    //             sx={{ mt: "45px" }}
    //             id="menu-appbar"
    //             anchorEl={anchorElUser}
    //             anchorOrigin={{
    //               vertical: "top",
    //               horizontal: "right",
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //               vertical: "top",
    //               horizontal: "right",
    //             }}
    //             open={Boolean(anchorElUser)}
    //             onClose={handleCloseUserMenu}
    //           >
    //             <MenuItem onClick={handleCloseUserMenu}>
    //               <Typography textAlign="center">
    //                 <Link
    //                   style={{ textDecoration: "none" }}
    //                   to="/admin/dashboard"
    //                 >
    //                   Admin{" "}
    //                 </Link>
    //               </Typography>
    //             </MenuItem>
    //             <MenuItem onClick={handleCloseUserMenu}>
    //               <Typography textAlign="center">
    //                 <Link
    //                   style={{ textDecoration: "none" }}
    //                   to="/user/dashboard"
    //                 >
    //                   User{" "}
    //                 </Link>
    //               </Typography>
    //             </MenuItem>
    //             {userInfo ? (
    //               <MenuItem onClick={logOutUser}>
    //                 <Typography textAlign="center" color="#8e67b2">
    //                   Log Out{" "}
    //                 </Typography>
    //               </MenuItem>
    //             ) : (
    //               <MenuItem onClick={handleCloseUserMenu}>
    //                 <Typography textAlign="center">
    //                   <Link style={{ textDecoration: "none" }} to="/login">
    //                     Login{" "}
    //                   </Link>
    //                 </Typography>
    //               </MenuItem>
    //             )}
    //           </Menu>
    //         </Box>
    //         </Box>
    //       </div>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <div></div>
  );
};
export default Navbar;
