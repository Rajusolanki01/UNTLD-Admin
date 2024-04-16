import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersOrders,
  updateTheOrderStatus,
} from "../features/auth/authSlice";
import LoadingBar from "../components/LoadingBar";
import { changeDateFormat } from "../utils/dateFormat";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Order By",
    dataIndex: "orderby",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth);
  const { orders, isLoading } = orderState;

  const data = [];
  for (let i = 0; i < orders?.length; i++) {
    data.push({
      key: i + 1,
      orderby: `${orders[i].user.firstname} ${orders[i].user.lastname}`,
      product: (
        <Link className="" to={`/dashboard/view-orders/${orders[i]._id}`}>
          View Orders
        </Link>
      ),
      amount: `₹${parseFloat(orders[i].totalPrice).toLocaleString("en-IN")}/-`,
      createdAt: changeDateFormat(orders[i].createdAt),

      _id: orders[i]._id,
      actions: (
        <>
          <select
            name=""
            id=""
            className="form-select form-control"
            value={orders[i]?.orderStatus}
            onChange={(e) => updateTheOrder(orders[i]?._id, e.target.value)}
          >
            <option value="Ordered">Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateTheOrder = (a, b) => {
    dispatch(updateTheOrderStatus({ orderId: a, orderStatus: b }));
  };

  useEffect(() => {
    dispatch(getAllUsersOrders());
  }, [dispatch]);

  if (isLoading) {
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
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
