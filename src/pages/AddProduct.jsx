import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAllBrands } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/product category/productCategorySlice";
import { getAllColors } from "../features/color/colorSlice";
import { Select } from "antd";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import {
  clearUploadState,
  deleteUploadTheImage,
  uploadTheImage,
} from "../features/upload/uploadSlice";
import {
  addProducts,
  getASingleProducts,
  updateTheProduct,
} from "../features/product/productSlice";

const productSchema = yup.object({
  title: yup.string().required("Title Should be Valid"),
  description: yup.string().required("Description Should be Required"),
  price: yup.string().required("Price Should be Required"),
  brand: yup.string().required("Brand Should be Required"),
  category: yup.string().required("Category Should be Required"),
  color: yup
    .array()
    .min(1, "Pick Atleast one Color")
    .required("Colors Should be Required"),
  quantity: yup.string().required("Quantity Should be Required"),
  tags: yup.string().required("Tag Should be Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);
  const colorState = useSelector((state) => state.color.colors);
  const uploadState = useSelector((state) => state.upload.images);
  const productState = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getASingleProducts(getProductId));
      formik.values.title = productState;
    } else {
      dispatch(clearUploadState());
      formik.resetForm();
    }
  }, [dispatch, getProductId, productState]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
      if (getProductId !== undefined) {
        dispatch(updateTheProduct({ productId: getProductId, values: values }));
      } else {
        dispatch(addProducts(values));
      }
      formik.resetForm();
      setColor(null);
      dispatch(clearUploadState());
      setTimeout(() => {
        navigate("/dashboard/product-list");
      }, 4000);
    },
  });

  const colorOptions = [];
  colorState.forEach((color) => {
    colorOptions.push({
      _id: color._id,
      value: color.title,
    });
  });

  const img = [];
  uploadState.forEach((image) => {
    img.push({ public_id: image.public_id, url: image.url });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, formik]);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllColors());
  }, [dispatch]);

  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="title">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
          <div className="error text-danger my-1">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="my-1">
            <ReactQuill
              className="bg-white quill"
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
            <div className="error text-danger my-1">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
          />
          <div className="error text-danger my-1">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            id=""
            name="brand"
            className="form-control form-select my-2"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
          >
            <option value="">Select Brand</option>
            {brandState.map((brand) => (
              <option key={brand._id} value={brand.title}>
                {brand.title}
              </option>
            ))}
          </select>
          <div className="error text-danger my-1">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            className="form-control  py-2 form-select my-2"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Select Category</option>
            {categoryState.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>{" "}
          <div className="error text-danger my-1">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            className="form-control  py-2 form-select my-2"
            value={formik.values.tags}
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
          >
            <option value="">Select Tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>{" "}
          <div className="error text-danger my-2">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100 h-100"
            placeholder="Select The Colors"
            value={color}
            onChange={(i) => handleColors(i)}
            options={colorOptions}
          />
          <div className="error text-danger my-2">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
          />
          <div className="error text-danger my-1">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1  p-4 text-center">
            <Dropzone
              onDrop={(acceptedFiles) =>
                dispatch(uploadTheImage(acceptedFiles))
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="mt-3 d-flex flex-wrap gap-3 mb-3">
            {uploadState.map((item, index) => {
              return (
                <div key={index} className="bg-white p-3 position-relative">
                  <button
                    onClick={() =>
                      dispatch(deleteUploadTheImage(item.public_id))
                    }
                    type="button"
                    className="btn-close position-absolute outline-none border-none"
                    style={{ top: "2px", right: "2px", fontSize: "10px" }}
                  ></button>
                  <img
                    src={item.url}
                    alt=""
                    width={100}
                    height={100}
                    className="upload-images"
                  />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center align-content-center ">
            <button type="submit" className="add-button mt-3">
              {getProductId !== undefined ? "Edit" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
