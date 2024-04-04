import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAOrderByUser, getAllUsersOrders } from "../features/auth/authSlice";
import LoadingBar from "../components/LoadingBar";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { changeDateFormat } from "../utils/dateFormat";
import { Link, useLocation, useParams } from "react-router-dom";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
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
    dataIndex: "paymentIntent",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderState = useSelector((state) => state.auth);
  const orderByUserState = useSelector((state) => state.auth.orderByUser);
  const { isLoading } = orderState;
  const { products, orderStatus } = orderByUserState;
  console.log(products);

  useEffect(() => {
    dispatch(getAOrderByUser(id));
  }, [dispatch, id]);

  const data = products?.map((product, index) => ({
    key: index + 1,
    productName: product?.product?.title,
    brand: product?.product?.brand,
    count: product?.count,
    paymentIntent: `₹ ${product?.product?.price}`,
    orderStatus: orderStatus,
    createdAt: changeDateFormat(product?.product?.createdAt),

    _id: product?.product?._id,
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

export default ViewOrder;
