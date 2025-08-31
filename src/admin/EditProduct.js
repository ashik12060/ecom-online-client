import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  Chip,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import axiosInstance from "../pages/axiosInstance";
import JsBarcode from "jsbarcode";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";

const validationSchema = yup.object({
  title: yup.string().required("Product title is required"),
  content: yup.string().required("Content is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  supplier: yup.string().required("Supplier is required"),
  categories: yup.array().min(1, "At least one category is required"),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        size: yup.string().required("Size is required"),
        color: yup.string().required("Color is required"),
        quantity: yup.number().min(1).required("Quantity is required"),
        description: yup.string().required("Description is required"),
        productLength: yup.number().nullable(),
      })
    )
    .min(1, "At least one variant is required"),
});

export default function EditProduct() {
  const { id } = useParams();
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [barcode, setBarcode] = useState("");
  // 👉 NEW: keep product state for priceHistory
  const [productData, setProductData] = useState(null);

  const categoriesList = [
    "All",
    "Top Brands",
    "New Arrival",
    "Stitched",
    "Unstitched",
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      price: "",
      brand: "",
      supplier: "",
      categories: [],
      barcode: "",
      subcategory: "",
      variants: [
        {
          size: "",
          color: "",
          quantity: 1,
          description: "",
          productLength: null,
          subBarcode: "",
          subBarcodeSvg: "",
          imageUrl: "",
        },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Ensure numbers are sent correctly
        const sanitizedVariants = values.variants.map((variant) => ({
          ...variant,
          quantity: Number(variant.quantity),
          productLength:
            variant.productLength === "" ? null : Number(variant.productLength),
        }));

        const updatedValues = {
          ...values,
          price: Number(values.price),
          variants: sanitizedVariants,
        };

        const res = await axiosInstance.put(
          `${process.env.REACT_APP_API_URL}/api/update/product/${id}`,
          updatedValues
        );

        if (res.data.success) {
          toast.success("Product updated successfully!");
          setProductData(res.data.product); // ✅ update local product state
        } else {
          toast.error("Failed to update product.");
        }
      } catch (err) {
        console.error("Update error:", err);
        toast.error("Error updating product.");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/product/${id}`
        );
        const product = productRes.data.product;

        setProductData(product);

        setFieldValue("title", product.title);
        setFieldValue("content", product.content);
        setFieldValue("price", product.price);
        setFieldValue("brand", product.brand);
        setFieldValue("supplier", product.supplier);
        setFieldValue("categories", product.categories);
        setFieldValue("subcategory", product.subcategory);
        // setFieldValue("barcode", product.barcodeNumber || "");
        setFieldValue(
          "barcode",
          product.barcodeNumber || product.barcode || ""
        );
        // setFieldValue("variants", product.variants || []);
        const mainBarcode = product.barcodeNumber || product.barcode || "";
        setBarcode(mainBarcode);

        // Rebuild variants with proper subBarcode
        const variantsWithSub = (product.variants || []).map((v, idx) => ({
          ...v,
          subBarcode:
            v.subBarcode ||
            (mainBarcode
              ? `${mainBarcode}${String.fromCharCode(97 + idx)}`
              : ""),
          subBarcodeSvg: v.subBarcodeSvg || "",
        }));

        setFieldValue("variants", variantsWithSub);

        // setBarcode(product.barcodeNumber || "");
        setBarcode(product.barcodeNumber || product.barcode || "");

        const [brandsRes, suppliersRes, subsRes] = await Promise.all([
          axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/brands`),
          axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/suppliers`),
          axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/api/subcategories`
          ),
        ]);

        setBrands(brandsRes.data);
        setSuppliers(suppliersRes.data.suppliers || []);
        setSubcategories(subsRes.data || []);
        setFilteredSubcategories(subsRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching product data.");
      }
    };

    fetchData();
  }, [id, setFieldValue]);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFieldValue("brand", selectedBrand);
    const filtered = subcategories.filter((sub) => sub.brand === selectedBrand);
    setFilteredSubcategories(filtered);
  };

  // const handleBarcodeChange = (e) => {
  //   const value = e.target.value;
  //   setBarcode(value);
  //   setFieldValue("barcode", value);

  //   const index = values.variants.length;
  //   let updatedVariants = values.variants.map((variant, idx) => ({
  //     ...variant,
  //     // subBarcode: value ? `${value}${String.fromCharCode(97 + idx)}` : "",
  //     subBarcode: barcode ? `${barcode}${String.fromCharCode(97 + index)}` : "",
  //   }));

  //   updatedVariants = generateSubBarcodeSvgs(updatedVariants); // only return updated variants
  //   setFieldValue("variants", updatedVariants); // set Formik once
  // };

  // const generateSubBarcodeSvgs = (variantsToUpdate) => {
  //   return variantsToUpdate.map((variant) => {
  //     if (!variant.subBarcode) return { ...variant, subBarcodeSvg: "" }; // skip empty barcodes
  //     const canvas = document.createElement("canvas");
  //     try {
  //       JsBarcode(canvas, variant.subBarcode, {
  //         format: "CODE128",
  //         displayValue: true,
  //         fontSize: 14,
  //         height: 40,
  //       });
  //     } catch (err) {
  //       console.error("Invalid subBarcode:", variant.subBarcode, err);
  //       return { ...variant, subBarcodeSvg: "" };
  //     }
  //     return { ...variant, subBarcodeSvg: canvas.toDataURL() };
  //   });
  // };
  const handleBarcodeChange = (e) => {
    const mainBarcode = e.target.value;
    setBarcode(mainBarcode);
    const updatedVariants = values.variants.map((variant, index) => ({
      ...variant,
      subBarcode: `${mainBarcode}${String.fromCharCode(97 + index)}`,
      subBarcodeSvg: `${mainBarcode}${String.fromCharCode(97 + index)}`,
    }));
    setFieldValue("variants", updatedVariants);
  };

  const generateSubBarcodeSvgs = (variantsToUpdate) => {
    return variantsToUpdate.map((variant) => {
      let subBarcodeSvg = "";
      if (variant.subBarcode) {
        const canvas = document.createElement("canvas");
        try {
          JsBarcode(canvas, variant.subBarcode, {
            format: "CODE128",
            displayValue: true,
            fontSize: 14,
            height: 40,
          });
          subBarcodeSvg = canvas.toDataURL();
        } catch (err) {
          console.error("Invalid subBarcode:", variant.subBarcode, err);
        }
      }
      return { ...variant, subBarcodeSvg }; // ✅ keep subBarcode string intact
    });
  };

  // const handleVariantChange = (index, field, value) => {
  //   const updatedVariants = [...values.variants];
  //   updatedVariants[index][field] = value;
  //   if (field === "size" || field === "color") {
  //     generateSubBarcodeSvgs(updatedVariants);
  //   }
  //   setFieldValue("variants", updatedVariants);
  // };

  const handleVariantChange = (index, field, value) => {
  const updatedVariants = [...values.variants];
  updatedVariants[index][field] = value;

  // If editing subBarcode, generate SVG
  if (field === "subBarcode") {
    setFieldValue("variants", generateSubBarcodeSvgs(updatedVariants));
  } else {
    setFieldValue("variants", updatedVariants);
  }
};

  const handleImageDrop = async (index, files) => {
    if (!files || files.length === 0) return;
    try {
      const compressed = await imageCompression(files[0], {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...values.variants];
        updated[index].imageUrl = reader.result;
        setFieldValue("variants", updated);
      };
      reader.readAsDataURL(compressed);
    } catch (err) {
      toast.error("Image compression failed.");
    }
  };

  // const addVariant = () => {
  //   const updated = [
  //     ...values.variants,
  //     {
  //       size: "",
  //       color: "",
  //       quantity: 1,
  //       description: "",
  //       productLength: null,
  //       subBarcode: "",
  //       subBarcodeSvg: "",
  //       imageUrl: "",
  //     },
  //   ];
  //   setFieldValue("variants", updated);
  // };

  // const addVariant = () => {
  //   const updatedExisting = values.variants.map((v, idx) => ({
  //     ...v,
  //     subBarcode: v.subBarcode || `${barcode}${String.fromCharCode(97 + idx)}`,
  //   }));

  //   const newIndex = updatedExisting.length;
  //   const newVariant = {
  //     size: "",
  //     color: "",
  //     quantity: 1,
  //     description: "",
  //     productLength: null,
  //     subBarcode: `${barcode}${String.fromCharCode(97 + newIndex)}`, // ✅ next subBarcode
  //     subBarcodeSvg: "",
  //     imageUrl: "",
  //   };

  //   const allVariants = [...updatedExisting, newVariant];
  //   const withSvg = generateSubBarcodeSvgs(allVariants);

  //   setFieldValue("variants", withSvg); // ✅ update Formik properly
  // };

  const addVariant = () => {
    const updatedExisting = values.variants.map((v, idx) => ({
      ...v,
      subBarcode: v.subBarcode || `${barcode}${String.fromCharCode(97 + idx)}`,
    }));

    // Find last letter in existing subBarcodes
    let lastCharCode = 96; // 96 so that first variant will be 'a'
    updatedExisting.forEach((v) => {
      const sub = v.subBarcode || "";
      if (sub.startsWith(barcode)) {
        const char = sub.slice(barcode.length);
        if (char.length === 1) {
          const code = char.charCodeAt(0);
          if (code > lastCharCode) lastCharCode = code;
        }
      }
    });

    const newChar = String.fromCharCode(lastCharCode + 1);
    const newVariant = {
      size: "",
      color: "",
      quantity: 1,
      description: "",
      productLength: null,
      subBarcode: `${barcode}${newChar}`, // next in sequence
      subBarcodeSvg: "",
      imageUrl: "",
    };

    const allVariants = [...updatedExisting, newVariant];
    setFieldValue("variants", generateSubBarcodeSvgs(allVariants));
  };

  const removeVariant = (index) => {
    const updated = [...values.variants];
    updated.splice(index, 1);
    setFieldValue("variants", updated);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "white" }}>
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Price (Current)"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
          sx={{ mb: 2 }}
        />

        {/* ✅ Show Previous Prices */}
        {productData?.priceHistory?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Previous Prices:</Typography>
            {productData.priceHistory.map((entry, idx) => (
              <Typography key={idx} variant="body2" color="textSecondary">
                {entry.oldPrice} BDT —{" "}
                {new Date(entry.updatedAt).toLocaleString()}
              </Typography>
            ))}
            <Divider sx={{ mt: 1 }} />
          </Box>
        )}

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
        <TextField
          select
          fullWidth
          label="Supplier"
          name="supplier"
          value={values.supplier}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier._id} value={supplier._id}>
              {supplier.name}
            </MenuItem>
          ))}
        </TextField>
        <Select
          fullWidth
          multiple
          value={values.categories}
          onChange={(e) => setFieldValue("categories", e.target.value)}
          sx={{ mb: 2 }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((val) => (
                <Chip key={val} label={val} />
              ))}
            </Box>
          )}
        >
          {categoriesList.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="barcode"
          label="Barcode"
          name="barcode"
          // value={barcode}
          value={values.barcode}
          onChange={handleBarcodeChange}
        />

        {values.variants.map((variant, index) => (
          <Box key={index} sx={{ p: 2, border: "1px dashed gray", mb: 2 }}>
            <Typography variant="subtitle1">Variant {index + 1}</Typography>
            <TextField
              fullWidth
              label="Size"
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Color"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={variant.quantity}
              onChange={(e) =>
                handleVariantChange(index, "quantity", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={variant.description}
              onChange={(e) =>
                handleVariantChange(index, "description", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Product Length"
              type="number"
              value={variant.productLength || ""}
              onChange={(e) =>
                handleVariantChange(index, "productLength", e.target.value)
              }
              sx={{ mb: 1 }}
            />

            {/* <TextField
              fullWidth
              label={`Sub Barcode ${index + 1}`}
              value={variant.subBarcode || ""}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            /> */}

            <TextField
              fullWidth
              label={`Sub Barcode ${index + 1}`}
              value={variant.subBarcode || ""}
              onChange={(e) =>
                handleVariantChange(index, "subBarcode", e.target.value)
              } // allow manual edit
              sx={{ mb: 2 }}
            />

            <Dropzone
              onDrop={(acceptedFiles) => handleImageDrop(index, acceptedFiles)}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #1976d2",
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  {variant.imageUrl ? (
                    <img
                      src={variant.imageUrl}
                      alt="Uploaded"
                      style={{ maxHeight: 100 }}
                    />
                  ) : (
                    <Typography>Click or drag image here</Typography>
                  )}
                </Box>
              )}
            </Dropzone>
            <Button
              onClick={() => removeVariant(index)}
              color="error"
              sx={{ mt: 1 }}
            >
              Remove Variant
            </Button>
          </Box>
        ))}

        <Button onClick={addVariant} variant="outlined" sx={{ mb: 2 }}>
          Add Variant
        </Button>

        <Button type="submit" fullWidth variant="contained">
          Update Product
        </Button>
      </form>
    </Box>
  );
}
