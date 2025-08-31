// import { Avatar, Box } from "@mui/material";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { userSignUpAction } from "../redux/actions/userAction";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import Header from "../components/Shared/Header/Header";
// import { CartProvider } from "../hooks";

// const validationSchema = yup.object({
//   name: yup.string("Enter your complete name").required("Name is required"),
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

// const Register = () => {
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values, actions) => {
//       //  alert(JSON.stringify(values, null, 2));
//       dispatch(userSignUpAction(values));
//       actions.resetForm();
//     },
//   });

//   return (
//     <>
//      <CartProvider>
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
//               <LockOpenIcon />
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
//               id="name"
//               label="Name"
//               name="name"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               placeholder="Complete name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.name && Boolean(formik.errors.name)}
//               helperText={formik.touched.name && formik.errors.name}
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
//               Register
//             </Button>
//             <Link to="/login" className="mt-2 fs-6 font-color">
//               <u>Already Registered? Login</u>
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Register;



import { Avatar, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import { CartProvider } from "../hooks";

const validationSchema = yup.object({
  name: yup.string("Enter your complete name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values));
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
                bgcolor: "#9333ea", // purple avatar
              }}
            >
              <LockOpenIcon />
            </Avatar>

            {/* Name Field */}
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
              id="name"
              label="Name"
              name="name"
              InputLabelProps={{ shrink: true }}
              placeholder="Complete name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
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
              Register
            </Button>

            <Link
              to="/login"
              style={{
                color: "#9333ea",
                fontWeight: 500,
                marginTop: "8px",
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <u>Already Registered? Login</u>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
