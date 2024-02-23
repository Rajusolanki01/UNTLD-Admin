import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
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
    title: "brand Name",
    dataIndex: "title",
  },
  {
    title: "Brand Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Brand Updated At",
    dataIndex: "updatedAt",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="d-flex gap-2">
        <Link to={`${record.title}/${record._id}`}>
          <EditButton />
        </Link>{" "}
        <div>
          <DeleteButton brandId={record._id} />
        </div>
      </div>
    ),
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const brandState = useSelector((state) => state.brand);
  const { brands, isLoading } = brandState;

  const data = brands?.map((brand, index) => ({
    key: index + 1,
    title: brand.title,
    createdAt: new Date(brand.createdAt).toLocaleString(),
    updatedAt: new Date(brand.updatedAt).toLocaleString(),
    _id: brand._id,
  }));

  useEffect(() => {
    dispatch(getAllBrands());
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
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BrandList;
