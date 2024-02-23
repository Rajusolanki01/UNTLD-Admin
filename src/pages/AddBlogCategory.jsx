import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  const [isLoading, setLoading] = useState(false);

  const startoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blogs Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Blog Category" />
          {!isLoading ? (
            <div className="d-flex justify-content-center align-content-center ">
              <button className="add-button mt-3" onClick={startoading}>
                Add Blog Category
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-content-center">
              <span className="loader mt-3"></span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
