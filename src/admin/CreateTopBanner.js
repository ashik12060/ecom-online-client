import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../pages/axiosInstance";

const validationSchema = yup.object({
  title: yup
    .string("Add a TopBanner title")
    .min(1, "TopBanner title should have a minimum of 1 character")
    .required("TopBanner title is required"),
});

const CreateTopBanner = () => {
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
      image: null,
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewTopBanner(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const [error, setError] = useState(null);
  const observedElementRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      try {
        // Your logic that could potentially throw an error
      } catch (error) {
        if (error.name === "ResizeObserver loop completed") {
          setError("ResizeObserver loop error");
        } else {
          // Handle other errors
        }
      }
    });

    if (observedElementRef.current) {
      resizeObserver.observe(observedElementRef.current);
    }

    return () => {
      if (observedElementRef.current) {
        resizeObserver.unobserve(observedElementRef.current);
      }
    };
  }, [observedElementRef]);
  //stop
  const createNewTopBanner = async (values) => {
    try {
      const result = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/topBanner/create`,
        values
      );

      if (result?.data?.success === true) {
        toast.success("TopBanner created");
        // Navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div ref={observedElementRef}>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <Box
          sx={{
            bgcolor: "white",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" sx={{ pb: 4 }}>
            {" "}
            Create Top Banner{" "}
          </Typography>

          {/* noValidate */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Post title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Post title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />

            

            <Box border="2px dashed blue" sx={{ p: 1 }}>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                //maxFiles={3}
                onDrop={(acceptedFiles) =>
                  acceptedFiles.map((file, index) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setFieldValue("image", reader.result);
                    };
                    return null;
                  })
                }
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
                    <input name="banner" {...getInputProps()} />
                    {isDragActive ? (
                      <>
                        <p style={{ textAlign: "center" }}>
                          <CloudUploadIcon
                            sx={{ color: "primary.main", mr: 2 }}
                          />
                        </p>
                        <p style={{ textAlign: "center", fontSize: "12px" }}>
                          {" "}
                          Drop here!
                        </p>
                      </>
                    ) : values.image === null ? (
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
                      <>
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
                              src={values.image}
                              alt=""
                            />
                          </Box>
                        </Box>
                      </>
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
              Create TopBanner
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CreateTopBanner;
