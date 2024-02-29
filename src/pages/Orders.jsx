import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersOrders } from "../features/auth/authSlice";
import LoadingBar from "../components/LoadingBar";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

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
    dataIndex: "paymentIntent",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth);
  const { orders, isLoading } = orderState;

  const data = orders.map((order, index) => ({
    key: index + 1,
    orderby: `${order.orderby.firstname} ${order.orderby.lastname}`,
    product: order.products.map((product, index) => {
      return (
        <div key={index}>
          <span>[ {product.product.title} ]</span> <br />
        </div>
      );
    }),
    paymentIntent: `₹ ${order.paymentIntent.amount}`,
    createdAt: new Date(order.createdAt).toLocaleString(),

    _id: order._id,
  }));

  useEffect(() => {
    dispatch(getAllUsersOrders());
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
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              dataIndex: "actions",
              render: (_, record) => (
                <div className="d-flex gap-2">
                  <EditButton />

                  <div>
                    <DeleteButton orderId={record._id} />
                  </div>
                </div>
              ),
            },
          ]}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Orders;
