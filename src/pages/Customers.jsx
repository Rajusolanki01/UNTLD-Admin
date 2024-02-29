import { Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../features/customer/customerSlice";
import LoadingBar from "../components/LoadingBar";
import EditButton from "../components/EditButton";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Blocked Status",
    dataIndex: "isBlocked",
    render: (isBlocked) => (
      <Tag color={isBlocked ? "red" : "green"}>
        {isBlocked ? "Blocked" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Profile",
    dataIndex: "actions",
    render: (_, record) => {
      return (
        <div className="d-flex gap-2">
          <Link
            className="text-dark"
            to={`profile/${record.name.replace(/\s+/g, "")}/${record._id}`}
          >
            <EditButton />
          </Link>{" "}
        </div>
      );
    },
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const { customers, isLoading } = customerState;

  const data = customers
    ?.filter((customer) => customer.role !== "admin")
    ?.map((customer, index) => ({
      key: index + 1,
      name: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      mobile: `+91-${customer.mobile}`,
      isBlocked: customer.isBlocked,
      _id: customer._id,
    }));

  useEffect(() => {
    dispatch(getAllUsers());
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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;
