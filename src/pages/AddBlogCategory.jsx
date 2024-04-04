import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { addTheBlogCategory } from "../features/blog Category/blogCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";
import { useNavigate } from "react-router-dom";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.blogCategory.isLoading);
  const [blogCategoryName, setBlogCategoryName] = useState("");

  const handleAddBlogCategory = (e) => {
    e.preventDefault();
    if (!blogCategoryName.trim()) {
      return;
    }
    dispatch(addTheBlogCategory({ title: blogCategoryName }));
    setBlogCategoryName("");
    setTimeout(() => {
      navigate("/dashboard/blog-category-list");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="LoadingBar">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Add Blogs Category</h3>
      <div>
        <form action="" onSubmit={handleAddBlogCategory}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            value={blogCategoryName}
            onChange={(e) => setBlogCategoryName(e.target.value)}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3" type="submit">
              Add Blog Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
