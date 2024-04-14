import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";
import { getAllBlogCategories } from "../features/blog Category/blogCategorySlice";
import {
  addTheBlog,
  getSingleBlog,
  updateTheBlog,
} from "../features/blogs/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearUploadState,
  deleteUploadTheImage,
  uploadTheImage,
} from "../features/upload/uploadSlice";
import Dropzone from "react-dropzone";

const blogSchema = yup.object({
  title: yup.string().required("Title Should be Valid"),
  description: yup.string().required("Description Should be Required"),
  category: yup.string().required("Category Should be Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getblogId = location.pathname.split("/")[3];
  const blogCategoryState = useSelector((state) => state.blogCategory);
  const { blogCategories, isLoading } = blogCategoryState;
  const blogState = useSelector((state) => state.blog);
  const { blogName, blogDescription, blogCateory, blogImages } = blogState;
  const uploadState = useSelector((state) => state.upload.images);

  useEffect(() => {
    if (getblogId !== undefined) {
      dispatch(getSingleBlog(getblogId));
      formik.values.title = blogName;
      formik.values.category = blogCateory;
      formik.values.description = blogDescription;
      img.push(blogImages);
    } else {
      dispatch(clearUploadState());
      formik.resetForm();
    }
  }, [dispatch, getblogId, blogName, blogCateory, blogDescription, blogImages]);

  const img = [];
  uploadState.forEach((image) => {
    img.push({ public_id: image.public_id, url: image.url });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages, img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCateory || "",
      images: "",
    },
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      if (getblogId !== undefined) {
        dispatch(updateTheBlog({ blogId: getblogId, values: values }));
        formik.resetForm();
        dispatch(clearUploadState());
        setTimeout(() => {
          navigate("/dashboard/blog-list");
        }, 4000);
      } else {
        dispatch(addTheBlog(values));
        formik.resetForm();
        dispatch(clearUploadState());
        setTimeout(() => {
          navigate("/dashboard/blog-list");
        }, 4000);
      }
    },
  });

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="LoadingBar">
        <LoadingBar />
      </div>
    );
  }
  return (
    <div>
      <h3 className="mb-4">{getblogId !== undefined ? "Edit" : "Add"} Blogs</h3>
      <div className="mt-3">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
          <div className="error text-danger my-1">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            className="form-control form-select mb-3"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Choose the category</option>
            {blogCategories.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <ReactQuill
            className="bg-white quill"
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            modules={{
              clipboard: {
                matchVisual: false,
              },
            }}
          />
          <div className="error text-danger my-1">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white mt-2 border-1 p-4 text-center">
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
              {getblogId !== undefined ? "Edit" : "Add"} Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
