import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addTheCoupon } from "../features/coupon/couponSlice";
import LoadingBar from "../components/LoadingBar";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.coupon.isLoading);
  const [couponName, setCouponName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!couponName.trim() || !discount || !expiryDate || !expiryTime) {
      return;
    }
    const expiry = `${expiryDate} ${expiryTime}`;
    dispatch(
      addTheCoupon({
        name: couponName,
        discount: discount,
        expiry: expiry,
      })
    );
    setCouponName("");
    setDiscount("");
    setExpiryDate("");
    setExpiryTime("");
    setTimeout(() => {
      navigate("/dashboard/coupon-list");
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
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={handleAddCoupon}>
          <CustomInput
            type="text"
            label="Enter Coupon"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
          <CustomInput
            type="number"
            label="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <CustomInput
            type="date"
            label="Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <CustomInput
            type="time"
            label="Expiry Time"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
          />

          <div className="d-flex justify-content-center align-content-center ">
            <button className="add-button mt-3" type="submit">
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
