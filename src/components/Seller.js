import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import axios from "axios";
import { CartProvider } from "../hooks";
import Header from "./Shared/Header/Header";
import SellerProductsShow from "./SellerProductsShow.js/SellerProductsShow";

const validationSchema = yup.object({
  name: yup
    .string("Enter the product name")
    .min(2, "Product name should be of minimum 2 characters length")
    .required("Product name is required"),
  price: yup
    .number("Enter the product price")
    .positive("Price should be a positive number")
    .required("Product price is required"),
});

const Seller = () => {
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const formData = { ...values, image: base64Image };

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/seller-pro`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Product created successfully!");
          actions.resetForm();
          setImage(null);
          console.log("Product created:", response.data);
        } catch (error) {
          toast.error("Error creating product");
          console.error("Error creating product:", error.response?.data);
        }
      };
    },
  });

  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      {/* <Box
        sx={{
          bgColor: "white",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h5" sx={{ pb: 4 }}>
          Create Seller Product
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="price"
            label="Product Price"
            name="price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Product Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <Box border="2px dashed blue" sx={{ p: 1, mb: 3 }}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                setImage(file);
              }}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  {...getRootProps()}
                  p="1rem"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                    bgColor: isDragActive ? "#cceffc" : "#fafafa",
                  }}
                >
                  <input name="image" {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        Drop here!
                      </p>
                    </>
                  ) : !image ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        Drag and Drop here or click to choose
                      </p>
                    </>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <img
                          style={{ maxWidth: "100px" }}
                          src={URL.createObjectURL(image)}
                          alt="Product"
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
          >
            Create Product
          </Button>
        </Box>
      </Box> */}

      {/* start */}
      <div class="d-flex align-items-start mt-3 ">
        <div
          className="nav flex-column nav-pills w-25 border border-1 rounded me-4 dashboard-nav-size 5 px-2  pt-4"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
         
          <button
            class="nav-link border border-1 mt-3"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Products Info
          </button>

          <button
            class="nav-link border border-1 mt-3"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Seller Products
          </button>
        </div>
        <div className=" w-75 tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
            tabindex="0"
          ></div>
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
            tabindex="0"
          >
            {/* Products  */}
            <Box
              sx={{
                bgColor: "white",
                padding: "20px",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <Typography variant="h5" sx={{ pb: 4 }}>
                Create Seller Product
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Product Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="price"
                  label="Product Price"
                  name="price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Product Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
                <Box border="2px dashed blue" sx={{ p: 1, mb: 3 }}>
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      setImage(file);
                    }}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{
                          "&:hover": { cursor: "pointer" },
                          bgColor: isDragActive ? "#cceffc" : "#fafafa",
                        }}
                      >
                        <input name="image" {...getInputProps()} />
                        {isDragActive ? (
                          <>
                            <p style={{ textAlign: "center" }}>
                              <CloudUploadIcon
                                sx={{ color: "primary.main", mr: 2 }}
                              />
                            </p>
                            <p
                              style={{ textAlign: "center", fontSize: "12px" }}
                            >
                              Drop here!
                            </p>
                          </>
                        ) : !image ? (
                          <>
                            <p style={{ textAlign: "center" }}>
                              <CloudUploadIcon
                                sx={{ color: "primary.main", mr: 2 }}
                              />
                            </p>
                            <p
                              style={{ textAlign: "center", fontSize: "12px" }}
                            >
                              Drag and Drop here or click to choose
                            </p>
                          </>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <img
                                style={{ maxWidth: "100px" }}
                                src={URL.createObjectURL(image)}
                                alt="Product"
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  elevation={0}
                  sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
                >
                  Create Product
                </Button>
              </Box>
            </Box>
          </div>

          
          <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
            tabindex="0"
          >
            <SellerProductsShow />
            
          </div>
        </div>
      </div>
      {/* stop */}
    </>
  );
};

export default Seller;
