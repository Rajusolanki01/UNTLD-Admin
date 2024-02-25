import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const AddBlog = () => {
  const [description, setDescription] = useState();
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleDesc = (e) => {
    setDescription(e);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blogs</h3>
      <div className="mt-3">
        <form action="">
          <div className="mt-3 mb-2">
            <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
          <CustomInput type="text" label="Enter Blog Title" />
          <select name="" id="" className="form-control form-select  mb-3">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill
            className="bg-white quill"
            theme="snow"
            value={description}
            onChange={(evt) => {
              handleDesc(evt);
            }}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3">Add Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
