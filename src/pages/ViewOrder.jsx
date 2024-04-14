import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAOrderByUser } from "../features/auth/authSlice";
import LoadingBar from "../components/LoadingBar";
import { changeDateFormat } from "../utils/dateFormat";
import { useParams } from "react-router-dom";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Order Status",
    dataIndex: "status",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loadingState = useSelector((state) => state.auth.isLoading);
  const orderByUserState = useSelector((state) => state.auth.orderByUser);

  useEffect(() => {
    dispatch(getAOrderByUser(id));
  }, [dispatch, id]);

  const data1 = [];

  for (let i = 0; i < orderByUserState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderByUserState?.orderItems[i]?.product.title.substr(0, 19),
      brand: orderByUserState?.orderItems[i]?.product.brand,
      count: orderByUserState?.orderItems[i]?.quantity,
      amount: `₹ ${orderByUserState?.orderItems[i]?.price}`,
      status: orderByUserState.orderStatus,
      createdAt: changeDateFormat(
        orderByUserState?.orderItems[i]?.product.createdAt
      ),
      _id: orderByUserState?.orderItems[i]?._id,
    });
  }

  if (loadingState) {
    return (
      <div className="LoadingBar">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
