// import { Avatar, Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { userSignInAction } from "../redux/actions/userAction";
// import Header from "../components/Shared/Header/Header";
// import google from "../assets/google.jpg";
// import facebook from "../assets/facebook.jpg";
// import "./Login.css";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Login.css";

// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// // import initializeAuthentication from "../Firebase/firebase.init";
// import { CartProvider } from "../hooks";


// const validationSchema = yup.object({
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

// const AdminLogin = () => {
//   const [user, setUser] = useState({});
//   const [logout, setLogout] = useState({});

//   // sign out google
//   const handleSignOut = () => {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       setLogout({});
//     });
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
//   useEffect(() => {
//     if (isAuthenticated) {
//       if (userInfo.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }
//     }
//   }, [isAuthenticated]);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values, actions) => {
//       //  alert(JSON.stringify(values, null, 2));
//       dispatch(userSignInAction(values));
//       actions.resetForm();
//     },
//   });

//   return (
//     <>
//       <CartProvider>
//         <Header />
//       </CartProvider>
//       <Box
//         sx={{
//           height: "81vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "primary.white",
//         }}
//       >
//         <Box
//           onSubmit={formik.handleSubmit}
//           component="form"
//           className="form_style border-style admin-login p-5"
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <Avatar className="bg-color bg-danger" sx={{ m: 1, mb: 3 }}>
//               <LockClockOutlined />
//             </Avatar>
//             <TextField
//               sx={{
//                 mb: 3,
//                 "& .MuiInputBase-root": {
//                   color: "text.secondary",
//                 },
//                 fieldset: { borderColor: "rgb(231, 235, 240)" },
//               }}
//               fullWidth
//               id="email"
//               label="E-mail"
//               name="email"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               placeholder="E-mail"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.email && Boolean(formik.errors.email)}
//               helperText={formik.touched.email && formik.errors.email}
//             />
//             <TextField
//               sx={{
//                 mb: 3,
//                 "& .MuiInputBase-root": {
//                   color: "text.secondary",
//                 },
//                 fieldset: { borderColor: "rgb(231, 235, 240)" },
//               }}
//               fullWidth
//               id="password"
//               name="password"
//               label="Password"
//               type="password"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               placeholder="Password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.password && Boolean(formik.errors.password)}
//               helperText={formik.touched.password && formik.errors.password}
//             />
//             <Button
//               fullWidth
//               className="bg-danger text-white fw-bold"
//               type="submit"
//             >
//               Admin Log In
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AdminLogin;



import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignInAction } from "../redux/actions/userAction";
import Header from "../components/Shared/Header/Header";
import { getAuth, signOut } from "firebase/auth";
import { CartProvider } from "../hooks";
import "./Login.css";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const AdminLogin = () => {
  const [logout, setLogout] = useState({});

  // sign out google
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setLogout({});
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignInAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#faf5ff", // light purple background
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style admin-login p-5 rounded-xl shadow-lg"
          sx={{
            bgcolor: "white",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                mb: 3,
                bgcolor: "purple.main",
                backgroundColor: "#9333ea", // purple-600
              }}
            >
              <LockClockOutlined />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.primary",
                },
                "& label.Mui-focused": {
                  color: "#9333ea", // purple when focused
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(231, 235, 240)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9333ea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9333ea",
                  },
                },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.primary",
                },
                "& label.Mui-focused": {
                  color: "#9333ea",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(231, 235, 240)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9333ea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9333ea",
                  },
                },
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                bgcolor: "#9333ea", // purple
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": {
                  bgcolor: "#7e22ce", // darker purple
                },
              }}
            >
              Admin Log In
            </Button>

            {/* Extra links */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Link
                to="/"
                style={{
                  color: "#9333ea",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Back to Home
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminLogin;
