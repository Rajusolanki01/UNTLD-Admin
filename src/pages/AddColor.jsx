import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addTheColor } from "../features/color/colorSlice";
import LoadingBar from "../components/LoadingBar";

const AddColor = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.color.isLoading);
  const [colorName, setColorName] = useState("");

  const handleAddColor = (e) => {
    e.preventDefault();
    if (!colorName.trim()) {
      return;
    }
    dispatch(addTheColor({ title: colorName }));
    setColorName("");
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
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={handleAddColor}>
          <CustomInput
            type="color"
            label="Enter the Color"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3" type="submit">
              Add Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
