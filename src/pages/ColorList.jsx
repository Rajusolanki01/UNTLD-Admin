import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllColors } from "../features/color/colorSlice";
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
    title: "Color Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
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
          <DeleteButton colorId={record._id} />
        </div>
      </div>
    ),
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const colorState = useSelector((state) => state.color);
  const { colors, isLoading } = colorState;

  const data = colors?.map((color, index) => ({
    key: index + 1,
    title: color.title,
    createdAt: new Date(color.createdAt).toLocaleString(),
    updatedAt: new Date(color.updatedAt).toLocaleString(),
    _id: color._id,
  }));

  useEffect(() => {
    dispatch(getAllColors());
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
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ColorList;
