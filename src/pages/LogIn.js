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
// import google from "../assets/google-photo.png";
// import { auth, googleProvider } from '../Firebase/firebase.init';
// import { signInWithPopup } from "firebase/auth";

// import { useAuth } from "../AuthContext";
// import { CartProvider } from "../hooks";
// import axios from "axios";


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

// const LogIn = (props) => {
//   // const { isAuthenticated, login } = useAuth();
//   const [user, setUser] = useState({})
//   const { isAuthenticated, login, setCurrentUser } = useAuth();
//   const dispatch = useDispatch();
  
//   const [logout, setLogout] = useState({});

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const token = await user.getIdToken();
      
//       console.log('Token:', token);
  
//       // Send token to your backend
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/google-login`, { token });
//       console.log('Login successful', response);
  
//       // Save JWT token to localStorage or context for authenticated requests
//       localStorage.setItem('authToken', response.data.token);
  
//       // Check if login was successful based on the response from the backend
//       if (response.status === 200) {
//         // Login was successful
//         console.log('Login successful');
//         // Redirect to the same page after successful login
//         window.location.reload();
//       } else {
//         // Login failed
//         console.error('Login failed');
//         // Show appropriate error message to the user
//         // You can also update state to display an error message on the UI
//       }
//     } catch (error) {
//       console.error('Error during Google login', error);
     
//     }
//   };
  



//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values, actions) => {
//       login(() => {
//         dispatch(userSignInAction(values));
//       });
//       actions.resetForm();
//     },
//   });

//   return (
//     <>
//       {/* <Header /> */}
//       <CartProvider>
//         <Header/>
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
//           className="form_style border-style"
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <Avatar className="bg-danger" sx={{ m: 1, mb: 3 }}>
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
//               Log In
//             </Button>

//             <Link to="/register" className="font-color mt-2 fs-6">
//               <u>Register Now</u>
//             </Link>
//           </Box>
//         </Box>
       
//       </Box>
//     </>
//   );
// };

// export default LogIn;



import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userSignInAction } from "../redux/actions/userAction";
import Header from "../components/Shared/Header/Header";
import google from "../assets/google-photo.png";
import { auth, googleProvider } from "../Firebase/firebase.init";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../AuthContext";
import { CartProvider } from "../hooks";
import axios from "axios";

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

const LogIn = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Send token to backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/google-login`,
        { token }
      );

      localStorage.setItem("authToken", response.data.token);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during Google login", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      login(() => {
        dispatch(userSignInAction(values));
      });
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
          className="form_style border-style"
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                bgcolor: "#9333ea", // purple
              }}
            >
              <LockClockOutlined />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& label.Mui-focused": { color: "#9333ea" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#9333ea" },
                  "&.Mui-focused fieldset": { borderColor: "#9333ea" },
                },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{ shrink: true }}
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
                "& label.Mui-focused": { color: "#9333ea" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#9333ea" },
                  "&.Mui-focused fieldset": { borderColor: "#9333ea" },
                },
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
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
                bgcolor: "#9333ea",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                mb: 2,
                "&:hover": { bgcolor: "#7e22ce" },
              }}
            >
              Log In
            </Button>

            {/* Google login button */}
            {/* <Button
              fullWidth
              onClick={handleGoogleLogin}
              sx={{
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#111827",
                fontWeight: "500",
                py: 1.5,
                mb: 2,
                textTransform: "none",
                display: "flex",
                gap: 1.5,
                justifyContent: "center",
                alignItems: "center",
                "&:hover": { bgcolor: "#f9fafb" },
              }}
            >
              <img src={google} alt="Google" style={{ width: 22, height: 22 }} />
              Sign in with Google
            </Button> */}

            <Link
              to="/register"
              style={{
                color: "#9333ea",
                fontWeight: 500,
                marginTop: "8px",
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <u>Register Now</u>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogIn;
