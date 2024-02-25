import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { addTheBlogCategory } from "../features/blog Category/blogCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.blogCategory.isLoading);
  const [blogCategoryName, setBlogCategoryName] = useState("");

  const handleAddBlogCategory = (e) => {
    e.preventDefault();
    if (!blogCategoryName.trim()) {
      return;
    }
    dispatch(addTheBlogCategory({ title: blogCategoryName }));
    setBlogCategoryName("");
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
