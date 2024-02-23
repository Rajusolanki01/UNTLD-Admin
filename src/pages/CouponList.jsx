import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../features/coupon/couponSlice";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Coupon Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Coupon Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount.length - b.discount.length,
  },
  {
    title: "Coupon Expiry At",
    dataIndex: "expiry",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="d-flex gap-2">
        <Link to={`${record.name}/${record._id}`}>
          <EditButton />
        </Link>{" "}
        <div>
          <DeleteButton couponId={record._id} />
        </div>
      </div>
    ),
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const couponState = useSelector((state) => state.coupon);
  const { coupons, isLoading } = couponState;

  const data = coupons?.map((coupon, index) => ({
    key: index + 1,
    name: coupon.name,
    discount: `₹ ${coupon.discount}`,
    expiry: new Date(coupon.expiry).toLocaleString(),
    _id: coupon._id,
  }));

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  if (isLoading) {
    return (
      <div className="LoadingBar">
        <LoadingBar />
      </div>
    );
  }
  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CouponList;
