import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  price: yup.number().min(1, "Price must be greater than 0").required("Price is required"),
  quantity: yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
  type: yup.string().required("Product type is required"),
});

const CreateWarehouseProduct = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      price: "",
      quantity: "",
      type: "Stitched",
     
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const result = await axiosInstance.post("/api/warehouse-product/create", values);
        if (result?.data?.success) {
          toast.success("Product added successfully!");
        //   navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to add product");
      }
      actions.resetForm();
    },
  });

  return (
    <Box sx={{ bgColor: "white", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ pb: 4 }}>
        Add Warehouse Product
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          sx={{ mb: 3 }}
          label="Product Title"
          name="title"
          placeholder="Enter product title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />

        <TextField
          fullWidth
          sx={{ mb: 3 }}
          type="number"
          label="Price"
          name="price"
          placeholder="Enter price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
        />

        <TextField
          fullWidth
          sx={{ mb: 3 }}
          type="number"
          label="Quantity"
          name="quantity"
          placeholder="Enter quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.quantity && Boolean(errors.quantity)}
          helperText={touched.quantity && errors.quantity}
        />

        <TextField
          fullWidth
          select
          sx={{ mb: 3 }}
          label="Product Type"
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.type && Boolean(errors.type)}
          helperText={touched.type && errors.type}
        >
          <MenuItem value="Stitched">Stitched</MenuItem>
          <MenuItem value="Unstitched">Unstitched</MenuItem>
        </TextField>

    

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, p: 1 }}>
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default CreateWarehouseProduct;


