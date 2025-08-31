import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const OrderForm = ({ totalPrice }) => {
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      totalPrice: totalPrice,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/order/place`, values);
        
        // ("/api/orders", values);
        if (res?.data?.success) {
          toast.success("Order placed successfully");
        } else {
          toast.error("Failed to place order");
        }
      } catch (error) {
        console.error("Order submission error:", error.message);
        toast.error("Failed to place order");
      }
      actions.resetForm();
    },
  });

  return (
    <Box sx={{ bgcolor: "white", padding: "20px", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
        >
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;
