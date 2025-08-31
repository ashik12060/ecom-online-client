// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// import { faCartShopping, faSortDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useCart } from "../../../hooks";
// import { useAuth } from "../../../AuthContext";
// import { useDispatch } from "react-redux";
// import { userLogoutAction } from "../../../redux/actions/userAction";
// import { ChevronDown, Search } from "lucide-react";
// import { motion } from "framer-motion";
// import logo from "../../../assets/chaityr-angina-logo.png";

// const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout } = useAuth();
//   const { cart } = useCart();
//   const dispatch = useDispatch();

//   const [navCollapsed, setNavCollapsed] = useState(false);

//   const navItems = [
//     { label: "TOP BRANDS", path: "/category/top-brands" },
//     { label: "NEW ARRIVAL", path: "/category/new-arrival" },
//     { label: "STITCHED", path: "/category/stitched" },
//     { label: "UNSTITCHED", path: "/category/unstitched" },
//   ];

//   const logOutUser = () => {
//     logout(() => {
//       dispatch(userLogoutAction());
//       navigate("/");
//     });
//   };

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       {/* Top bar */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
//         {/* Left: Search */}
//         {/* <Search className="w-5 h-5 cursor-pointer" /> */}
//         <Link to="/">
//           <img src={logo} alt="logo" className="w-32" />
//         </Link>

        

//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="flex items-center space-x-2 text-xl sm:text-2xl tracking-wide font-serif font-semibold text-gray-800"
//         >
//           <Link to="/" className="flex items-center space-x-2 ">
//             <span className="text-lg font-serif sm:text-xl md:text-2xl tracking-wider text-green-700 flex items-center gap-1">
//               E-commerce 
//               <motion.span
//                 animate={{ rotateY: 360 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 4,
//                   ease: "linear",
//                 }}
//                 className="text-gray-600 inline-block"
//                 style={{
//                   display: "inline-block",
//                   transformOrigin: "center",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 SI</motion.span>TE
//             </span>
//           </Link>
//         </motion.h1>

//         {/* Right: Icons */}
//         <div className="flex items-center gap-4">
//           <Link to="/wishlist">
//             <FontAwesomeIcon icon={faHeart} className="text-purple-600 text-lg" />
//           </Link>
//           <Link to="/cart" className="relative">
//             <FontAwesomeIcon
//               icon={faCartShopping}
//               className="text-purple-600 text-lg"
//             />
//             <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full px-1">
//               {cart?.length || 0}
//             </span>
//           </Link>
//           <div className="relative group">
//             <FontAwesomeIcon
//               icon={faUser}
//               className="text-purple-600 text-lg cursor-pointer"
//             />
//             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block z-20">
//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/user/dashboard"
//                     className="block px-4 py-2 text-sm hover:bg-white"
//                   >
//                     User Dashboard
//                   </Link>
//                   <button
//                     onClick={logOutUser}
//                     className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-white"
//                   >
//                     Log Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="block px-4 py-2 text-sm hover:bg-white"
//                   >
//                     User Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="block px-4 py-2 text-sm hover:bg-white"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//               <Link
//                 to="/admin-login"
//                 className="block px-4 py-2 text-sm hover:bg-white"
//               >
//                 Admin
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Hamburger button */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setNavCollapsed(!navCollapsed)}
//         >
//           <svg
//             className="w-6 h-6 text-gray-700"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav
//         className={`bg-white md:bg-white md:border-t transition-all duration-300 ${
//           navCollapsed ? "block" : "hidden md:block"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center  items-center gap-4 px-4 py-2">
//           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//             {navItems.map((item, idx) => (
//               <div key={idx} className="relative group">
//                 <div className="flex items-center gap-1 cursor-pointer hover:text-green-700">
//                   {item.path ? (
//                     <Link to={item.path}>{item.label}</Link>
//                   ) : (
//                     <span>{item.label}</span>
//                   )}
//                   {item.dropdown && <ChevronDown className="w-4 h-4" />}
//                 </div>

//                 {item.dropdown && (
//                   <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block z-20">
//                     {item.dropdown.map((subItem, subIdx) => (
//                       <Link
//                         to={subItem.path}
//                         key={subIdx}
//                         className="block px-4 py-2 hover:bg-white text-sm text-gray-800"
//                       >
//                         {subItem.label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-4 mt-4 md:mt-0">
            
           
//             {isAuthenticated ? (
//               <button
//                 onClick={logOutUser}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
//               >
//                 Log Out
//               </button>
//             ) : (
//               <Link
//                 to="/admin-login"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
//               >
//                 Admin
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../../hooks";
import { useAuth } from "../../../AuthContext";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../redux/actions/userAction";
import { motion } from "framer-motion";
import logo from "../../../assets/LOGOS-png.png";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const dispatch = useDispatch();

  const [navCollapsed, setNavCollapsed] = useState(false);

  const navItems = [
    { label: "Top Brands", path: "/category/top-brands" },
    { label: "New Arrivals", path: "/category/new-arrival" },
    { label: "Stitched", path: "/category/stitched" },
    { label: "Unstitched", path: "/category/unstitched" },
  ];

  const logOutUser = () => {
    logout(() => {
      dispatch(userLogoutAction());
      navigate("/");
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-28 sm:w-32" />
        </Link>

        {/* Brand tagline (hidden on small screens) */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block text-xl font-serif font-semibold text-purple-700 tracking-wide"
        >
          Your Fashion, Your Style ✨
        </motion.h1>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <Link to="/wishlist" className="hover:scale-110 transition">
            <FontAwesomeIcon icon={faHeart} className="text-purple-600 text-lg" />
          </Link>
          <Link to="/cart" className="relative hover:scale-110 transition">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-purple-600 text-lg"
            />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full px-1">
              {cart?.length || 0}
            </span>
          </Link>
          <div className="relative group">
            <FontAwesomeIcon
              icon={faUser}
              className="text-purple-600 text-lg cursor-pointer hover:scale-110 transition"
            />
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg hidden group-hover:block z-20">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/user/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={logOutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-purple-50"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    User Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    Register
                  </Link>
                </>
              )}
              <Link
                to="/admin-login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setNavCollapsed(!navCollapsed)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation (Desktop + Mobile collapse) */}
      <nav
        className={`bg-white md:bg-white md:border-t transition-all duration-300 ${
          navCollapsed ? "block" : "hidden md:block"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-3">
          {/* Nav Links */}
          <div className="flex flex-col md:flex-row md:gap-8 gap-4 text-center">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 font-medium transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth/Admin button */}
          <div className="flex gap-4">
            {isAuthenticated ? (
              <button
                onClick={logOutUser}
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 text-sm transition"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/admin-login"
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 text-sm transition"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
