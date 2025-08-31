import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  Chip,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../pages/axiosInstance";
import JsBarcode from "jsbarcode";
import imageCompression from "browser-image-compression";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const validationSchema = yup.object({
  title: yup
    .string("Add a product title")
    .min(1, "Product title should have a minimum of 1 character")
    .required("Product title is required"),
  content: yup
    .string("Add text content")
    .min(1, "Text content should have a minimum of 1 character")
    .required("Text content is required"),

  price: yup.number("Add Price").required("Price is required"),
  brand: yup.string("Add brand name").required("Brand name is required"),
  supplier: yup.string("Select a supplier").required("Supplier is required"),

  categories: yup
    .array()
    .of(yup.string().required("Category is required"))
    .min(1, "At least one category is required"),
  barcode: yup
    .string("Add a barcode")
    .min(6, "Barcode must be at least 6 characters"),

  variants: yup
    .array()
    .of(
      yup.object().shape({
        size: yup.string("Add size").required("Size is required"),
        color: yup.string("Add color").required("Color is required"),
        quantity: yup
          .number("Add quantity")
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        description: yup
          .string("Add text description")
          .min(1, "Text content should have a minimum of 1 character")
          .required("Text content is required"),
        productLength: yup
          .number("Add length")
          .nullable()
          .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? null : value
          ),
        imageUrl: yup.mixed().nullable(), // ✅ Optional
      })
    )
    .min(1, "At least one variant is required")
    .required("Variants are required"),
});

const CreateProduct = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [imageFields, setImageFields] = useState([]);
  const observedElementRef = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [generatedBarcode, setGeneratedBarcode] = useState(""); // Store generated barcode image
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // Add subcategories state
  const [filteredSubcategories, setFilteredSubcategories] = useState([]); // State for filtered subcategories
  const [sizes, setSizes] = useState([]);
  const [variants, setVariants] = useState([
    { size: "", color: "", quantity: 0, productLength: null, description: "" }, //variant added
  ]);
  const [multipleSizes, setMultipleSizes] = useState([]);

  const [multipleVariants, setMultipleVariants] = useState([]);

  const [subBarcodeImages, setSubBarcodeImages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // prevent form submission
    setShowMessage(true);
  };

  const categoriesList = [
    "All",
    "Top Brands",
    "New Arrival",
    "Stitched",
    "Unstitched",
  ];

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

      price: "",

      brand: "",
      supplier: "",

      categories: [],
      variants: [
        {
          size: "",
          color: "",
          quantity: 0,
          description: "",
          productLength: null,
          subBarcode: "",
          subBarcodeSvg: "",
          multipleSizes: [],
        },
      ],
      barcode: "",
      subcategory: "", // Add subcategory to form values
      images: [],
    },
    validationSchema: validationSchema,

    onSubmit: async (values, actions) => {
      console.log("Formik onSubmit called with values:", values);
      generateSubBarcodeImages(); // 🆕 Add this line

      await createNewProduct(values);
      actions.resetForm();
      console.log("Form values before submit:", values);
    },
  });

  // force adding color for brands and Subcategories
  const forceLightTheme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "#000",
            backgroundColor: "#fff",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#000 !important",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "#000 !important",
          },
        },
      },
    },
  });

  const handleAddSize = () => {
    const currentSizes = values.variants[0]?.multipleSizes || [];
    const newSizes = [
      ...currentSizes,
      { size: "", quantity: 0, productLength: null },
    ];

    const newVariant = {
      ...values.variants[0],
      multipleSizes: newSizes,
    };

    setFieldValue("variants", [newVariant]);
  };

  const handleRemoveSize = (sizeToRemove) => {
    const updatedSizes = sizes.filter((size) => size !== sizeToRemove);
    setSizes(updatedSizes);
    setFieldValue("sizes", updatedSizes); // Update Formik values
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/brands`
        );
        console.log("Brands API response:", response.data); // Add this line
        setBrands(response.data || []); // Ensure it is an array
        console.log(response.data); // Add this line
      } catch (err) {
        toast.error("Failed to load brands");
      }
    };

    const fetchSubcategories = async () => {
      // Fetch subcategories
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/subcategories`
        );
        setSubcategories(response.data || []);
        setFilteredSubcategories(response.data || []); // Initially set all subcategories
      } catch (err) {
        toast.error("Failed to load subcategories");
      }
    };

    fetchBrands();
    fetchSubcategories();
  }, []);

  // Filter subcategories based on the selected brand
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setFieldValue("brand", selectedBrand);

    // Filter subcategories based on selected brand
    const filtered = subcategories.filter(
      (subcategory) => subcategory.brand === selectedBrand
    );
    setFilteredSubcategories(filtered);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/suppliers`
        );
        setSuppliers(response.data.suppliers || []);
        console.log(response.data.suppliers);
      } catch (err) {
        toast.error("Failed to load suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    setFieldValue("variants", variants);
  }, [variants, setFieldValue]);

  const addVariant = () => {
    const updatedVariants = [...values.variants, variants];
    generateSubBarcodes(barcode, updatedVariants);
  };

  const removeVariant = (index) => {
    const updated = [...values.variants];
    updated.splice(index, 1);
    generateSubBarcodes(barcode, updated);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...values.variants];
    updated[index][field] = value;
    generateSubBarcodes(barcode, updated);
  };

  const generateSubBarcodes = (main, variants) => {
    const updated = variants.map((variant, index) => ({
      ...variant,
      subBarcode: main ? `${main}${String.fromCharCode(97 + index)}` : "",
    }));
    setFieldValue("variants", updated);
  };

  //new added todya
  const createNewProduct = async (values) => {
    try {
      const payload = { ...values, barcodeSvg: generatedBarcode };

      const result = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/product/create`,
        payload
      );

      if (result?.data?.success) {
        toast.success("Product created");
        setImageFields([]);
        setBarcode("");
        setGeneratedBarcode("");
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error creating product");
    }
  };

  const generateBarcode = () => {
    if (barcode) {
      // Generate barcode using jsbarcode
      JsBarcode("#barcode-svg", barcode, {
        format: "CODE128", // Barcode format
        displayValue: true, // Display value below the barcode
        fontSize: 18,
      });

      // Get the barcode as an image (base64 encoded)
      const barcodeSvg = document.getElementById("barcode-svg");
      const imageData = barcodeSvg.outerHTML;
      setGeneratedBarcode(imageData); // Set the generated barcode in state
    }
  };

  const handleBarcodeChange = (e) => {
    const mainBarcode = e.target.value;
    setBarcode(mainBarcode);
    generateSubBarcodes(mainBarcode, values.variants);
  };

  // barcode end

  const addImageField = () => {
    setImageFields([...imageFields, { image: null, colorName: "" }]);
  };

  // image compression added below

  const handleImageDrop = async (index, acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // Compression options
      const options = {
        maxSizeMB: 0.5, // Target max size in MB
        maxWidthOrHeight: 800, // Resize image dimensions if too large
        useWebWorker: true,
      };

      // Compress image
      const compressedFile = await imageCompression(file, options);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedVariants = [...values.variants];
        updatedVariants[index].imageUrl = reader.result;
        setFieldValue("variants", updatedVariants);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress image");
    }
  };

  const handleColorNameChange = (index, event) => {
    const updatedFields = [...imageFields];
    updatedFields[index].colorName = event.target.value;
    setImageFields(updatedFields);
  };

  // };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log(
      "Submitting variants multipleSizes:",
      values.variants[0]?.multipleSizes
    );
    console.log("Form values:", values);

    // const isStitched = values.categories.includes("Stitched");

    setError("");
    handleSubmit(); // triggers Formik submit
  };

  const generateSubBarcodeImages = () => {
    const container = document.createElement("div");
    const updatedVariants = values.variants.map((variant, index) => {
      const subBarcode = variant.subBarcode;
      if (!subBarcode) return variant;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      JsBarcode(svg, subBarcode, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
        height: 50,
      });
      container.appendChild(svg);

      return {
        ...variant,
        subBarcodeSvg: svg.outerHTML, // Save SVG as string
      };
    });

    setFieldValue("variants", updatedVariants);
  };

  return (
    <div ref={observedElementRef}>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <Box
          sx={{
            // bgcolor: "white",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" sx={{ pb: 4 }}>
            Create Product
          </Typography>
          <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Product Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="content"
              label="Country Origin"
              name="content"
              multiline
              rows={4}
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.content && Boolean(errors.content)}
              helperText={touched.content && errors.content}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />

            <ThemeProvider theme={forceLightTheme}>
              <TextField
                select
                fullWidth
                label="Brand"
                name="brand"
                value={values.brand}
                onChange={handleBrandChange}
                sx={{ mb: 2 }}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Subcategory"
                name="subcategory"
                value={values.subcategory}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                {filteredSubcategories.map((sub) => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </TextField>
            </ThemeProvider>

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              select
              id="supplier"
              label="Supplier"
              name="supplier"
              value={values.supplier}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.supplier && Boolean(errors.supplier)}
              helperText={touched.supplier && errors.supplier}
            >
              {suppliers.length === 0 ? (
                <MenuItem disabled>No suppliers available</MenuItem>
              ) : (
                suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </MenuItem>
                ))
              )}
            </TextField>
            {/* <Select
              sx={{ mb: 3, width: "100%" }}
              id="categories"
              name="categories"
              label="categories"
              className="text-black"
              multiple
              value={values.categories}
              onChange={(e) => setFieldValue("categories", e.target.value)}
              onBlur={handleBlur}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              error={touched.categories && Boolean(errors.categories)}
            >
              {categoriesList.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select> */}

            <Select
  multiple
  value={values.categories}
  onChange={(e) => {
    const selected = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
    setFieldValue("categories", selected.length ? selected : ["All"]);
  }}
  onBlur={handleBlur}
  renderValue={(selected) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  error={touched.categories && Boolean(errors.categories)}
>
  {categoriesList.map((category) => (
    <MenuItem key={category} value={category}>
      {category}
    </MenuItem>
  ))}
</Select>



            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Variants</Typography>

              {values.variants.map((variant, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", flexDirection: "column", mb: 2 }}
                >
                  <TextField
                    fullWidth
                    label={`Size ${index + 1}`}
                    name={`variants[${index}].size`}
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    onBlur={handleBlur}
                    error={
                      touched.variants?.[index]?.size &&
                      Boolean(errors.variants?.[index]?.size)
                    }
                    helperText={
                      touched.variants?.[index]?.size &&
                      errors.variants?.[index]?.size
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={`Color ${index + 1}`}
                    name={`variants[${index}].color`}
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    onBlur={handleBlur}
                    error={
                      touched.variants?.[index]?.color &&
                      Boolean(errors.variants?.[index]?.color)
                    }
                    helperText={
                      touched.variants?.[index]?.color &&
                      errors.variants?.[index]?.color
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={`Quantity ${index + 1}`}
                    name={`variants[${index}].quantity`}
                    type="number"
                    value={variant.quantity}
                    onChange={(e) =>
                      handleVariantChange(index, "quantity", e.target.value)
                    }
                    onBlur={handleBlur}
                    error={
                      touched.variants?.[index]?.quantity &&
                      Boolean(errors.variants?.[index]?.quantity)
                    }
                    helperText={
                      touched.variants?.[index]?.quantity &&
                      errors.variants?.[index]?.quantity
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={`Length ${index + 1}`}
                    name={`variants[${index}].productLength`}
                    type="number"
                    value={variant.productLength}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "productLength",
                        e.target.value
                      )
                    }
                    onBlur={handleBlur}
                    error={
                      touched.variants?.[index]?.productLength &&
                      Boolean(errors.variants?.[index]?.productLength)
                    }
                    helperText={
                      touched.variants?.[index]?.productLength &&
                      errors.variants?.[index]?.productLength
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label={`Description ${index + 1}`}
                    name={`variants[${index}].description`}
                    type="string"
                    value={variant.description}
                    onChange={(e) =>
                      handleVariantChange(index, "description", e.target.value)
                    }
                    onBlur={handleBlur}
                    error={
                      touched.variants?.[index]?.description &&
                      Boolean(errors.variants?.[index]?.description)
                    }
                    helperText={
                      touched.variants?.[index]?.description &&
                      errors.variants?.[index]?.description
                    }
                    sx={{ mb: 2 }}
                  />

                  {/* new added sub barcode */}
                  <TextField
                    fullWidth
                    label={`Sub Barcode ${index + 1}`}
                    value={variant.subBarcode || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />

                  <Box key={`image-${index}`} sx={{ mb: 3 }}>
                    <Box border="2px dashed violet" sx={{ p: 1, mb: 3 }}>
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          handleImageDrop(index, acceptedFiles)
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
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <Typography>Drop the file here</Typography>
                            ) : variant.imageUrl ? (
                              <img
                                style={{ maxWidth: "100px" }}
                                src={variant.imageUrl}
                                alt="Uploaded"
                              />
                            ) : (
                              <Typography>
                                Drag and drop here or click to upload
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                  </Box>

                  <Button
                    onClick={() => removeVariant(index)}
                    color="error"
                    variant="outlined"
                  >
                    Remove Variant
                  </Button>
                </Box>
              ))}

              <Button onClick={addVariant} variant="contained" sx={{ mt: 2 }}>
                Add Variant
              </Button>
            </Box>
            <div>
              <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="barcode"
                label="Barcode"
                name="barcode"
                value={barcode}
                onChange={handleBarcodeChange}
              />

              {/* Display the generated barcode image */}
              <div>
                <svg id="barcode-svg" style={{ display: "none" }}></svg>{" "}
                {/* Barcode will be rendered here */}
                {generatedBarcode && (
                  <div className="py-2">
                    <h3>Custom Number: {barcode}</h3>
                    <div />
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
            >
              Create Product
            </Button> 
            {/* <Box>
              {showMessage && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Website is under maintenance
                </Alert>
              )}

              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
                onClick={handleClick}
              >
                Create Product
              </Button>
            </Box> */}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CreateProduct;
