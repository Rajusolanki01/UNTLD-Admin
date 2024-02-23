import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddBlog = () => {
  const [description, setDescription] = useState();
  const [isLoading, setLoading] = useState(false);

  const startoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const handleDesc = (e) => {
    setDescription(e);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blogs</h3>
      <div className="mt-3">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
      <div className="mt-3">
        <form action="">
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
          {!isLoading ? (
            <div className="d-flex justify-content-center align-content-center ">
              <button className="add-button mt-3" onClick={startoading}>
                Add Blog
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

export default AddBlog;
