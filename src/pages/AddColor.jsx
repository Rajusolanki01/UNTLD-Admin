import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTheColor } from "../features/color/colorSlice";
import LoadingBar from "../components/LoadingBar";
import { useNavigate } from "react-router-dom";
import { SketchPicker, SwatchesPicker } from "react-color";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.color.isLoading);
  const [colorName, setColorName] = useState("");

  const handleAddColor = (e) => {
    e.preventDefault();
    if (!colorName.trim()) {
      return;
    }
    dispatch(addTheColor({ title: colorName }));
    setColorName("");
    setTimeout(() => {
      navigate("/dashboard/color-list");
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
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={handleAddColor}>
          <div className="d-flex gap-3">
            <SketchPicker
              color={colorName}
              onChange={(selectedColor) => setColorName(selectedColor.hex)}
            />

            <SwatchesPicker
              color={colorName}
              onChange={(selectedColor) => setColorName(selectedColor.hex)}
            />
          </div>

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
