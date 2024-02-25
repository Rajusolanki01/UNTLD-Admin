import confirm from "antd/es/modal/confirm";
import React from "react";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteTheProduct } from "../features/product/productSlice";
import { deleteTheBrand } from "../features/brand/brandSlice";
import { deleteTheCategory } from "../features/product category/productCategorySlice";
import { deleteTheColor } from "../features/color/colorSlice";
import { deleteTheCoupon } from "../features/coupon/couponSlice";
import { deleteTheBlog } from "../features/blogs/blogSlice";
import { deleteTheBlogCategory } from "../features/blog Category/blogCategorySlice";
import { deleteTheEnquiries } from "../features/enquiry/enquirySlice";

const DeleteButton = ({
  productId,
  brandId,
  categoryId,
  colorId,
  couponId,
  blogId,
  blogCategoryId,
  enquiryId,
}) => {
  const dispatch = useDispatch();

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this ?",
      icon: (
        <span className="p-1">
          <ExclamationCircleOutlined />
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: "yes",
      onOk() {
        if (productId) {
          dispatch(deleteTheProduct(productId));
        }
        if (brandId) {
          dispatch(deleteTheBrand(brandId));
        }
        if (categoryId) {
          dispatch(deleteTheCategory(categoryId));
        }
        if (colorId) {
          dispatch(deleteTheColor(colorId));
        }
        if (couponId) {
          dispatch(deleteTheCoupon(couponId));
        }
        if (blogId) {
          dispatch(deleteTheBlog(blogId));
        }
        if (blogCategoryId) {
          dispatch(deleteTheBlogCategory(blogCategoryId));
        }
        if (enquiryId) {
          dispatch(deleteTheEnquiries(enquiryId));
        }
      },
    });
  };
  return (
    <div>
      <button className="bin-button" onClick={showDeleteConfirm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 39 7"
          className="bin-top"
        >
          <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
          <line
            strokeWidth="3"
            stroke="white"
            y2="1.5"
            x2="26.0357"
            y1="1.5"
            x1="12"
          ></line>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 33 39"
          className="bin-bottom"
        >
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
          </mask>
          <path
            mask="url(#path-1-inside-1_8_19)"
            fill="white"
            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          ></path>
          <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
          <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 89 80"
          className="garbage"
        >
          <path
            fill="white"
            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default DeleteButton;
