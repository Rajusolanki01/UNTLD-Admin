import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/category/categorySlice";
import LoadingBar from "../components/LoadingBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Customer Name",
    dataIndex: "title",
  },
  {
    title: "Category Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Category Updated At",
    dataIndex: "updatedAt",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="d-flex gap-2">
        <Link to={`${record.title.replace(/\s+/g, "")}/${record._id}`}>
          <EditButton />
        </Link>{" "}
        <div>
          <DeleteButton categoryId={record._id} />
        </div>
      </div>
    ),
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const { categories, isLoading } = categoryState;

  const data = categories?.map((category, index) => ({
    key: index + 1,
    title: category.title,
    createdAt: new Date(category.createdAt).toLocaleString(),
    updatedAt: new Date(category.updatedAt).toLocaleString(),
    _id: category._id,
  }));
  useEffect(() => {
    dispatch(getAllCategories());
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
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CategoryList;
