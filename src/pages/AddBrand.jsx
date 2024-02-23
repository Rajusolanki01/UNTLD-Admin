import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { addBrand } from "../features/brand/brandSlice";
import LoadingBar from "../components/LoadingBar";

const AddBrand = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.brand.isLoading);
  const [brandName, setBrandName] = useState("");

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      return;
    }
    dispatch(addBrand({ title: brandName }));
    setBrandName("");
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
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form onSubmit={handleAddBrand}>
          <CustomInput
            type="text"
            label="Enter the Brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3" type="submit">
              Add Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
