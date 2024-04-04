import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import LoadingBar from "../components/LoadingBar";
import { addTheCategory } from "../features/product category/productCategorySlice";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.category.isLoading);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      return;
    }
    dispatch(addTheCategory({ title: categoryName }));
    setCategoryName("");
    setTimeout(() => {
      navigate("/dashboard/product-category-list");
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
      <h3 className="mb-4 title">Add Product Category</h3>
      <div>
        <form action="" onSubmit={handleAddCategory}>
          <CustomInput
            type="text"
            label="Enter the Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3" type="submit">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
