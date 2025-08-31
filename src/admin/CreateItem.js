import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../components/moduleToolbar";
import axiosInstance from "../pages/axiosInstance";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../pages/axiosInstance";

const validationSchema = yup.object({
  title: yup
    .string("Add a Item title")
    .min(1, "text content should have a minimum of 4 characters ")
    .required("Item's title is required"),
  content: yup
    .string("Add text content")
    .min(1, "text content should have a minimum of 10 characters ")
    .required("text content is required"),
});

const CreateItem = () => {
  const navigate=useNavigate()
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
      content: "",
      image: null,
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewItem(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewItem = async (values) => {
    try {

      const result = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/item/create`, values);
      if (result?.data?.success === true) {
        toast.success("Item created");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const modules = {
    // ...
    clipboard: {
      matchVisual: false,
    },
    // ...
  };

  // const handlePostContent = () => {
  //   const rawContent = values.content; // Get the content from ReactQuill

  //   // Remove <p> tags from the raw content
  //   const sanitizedContent = rawContent.replace(/<\/?p>/g, "");
  //   createNewPost({ ...values, content: sanitizedContent });
  // };

  return (
    <>
      <Box sx={{ bgColor: "white",
      padding: "20px",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",}}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Create Item{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Item title"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Item title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Box sx={{ mb: 3 }}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="content"
              label="Content"
              name="content"
              multiline
              rows={4}
              placeholder="Write the item content..."
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.content && Boolean(errors.content)}
              helperText={touched.content && errors.content}
            />
          </Box>

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
            // onClick={handlePostContent}
            // disabled={loading}
          >
            Create Item
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateItem;
