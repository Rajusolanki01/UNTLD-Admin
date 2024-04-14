import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import LoadingBar from "../components/LoadingBar";
import { Link } from "react-router-dom";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Product Listed",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },

  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },

  {
    title: "Total Rating",
    dataIndex: "totalrating",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="d-flex gap-2">
        <Link to={`/dashboard/add-product/${record._id}`}>
          <EditButton />
        </Link>{" "}
        <div>
          <DeleteButton productId={record._id} />
        </div>
      </div>
    ),
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { products, isLoading } = productState;

  const truncateString = (str, num) => {
    if (str.split(" ").length > num) {
      return str.split(" ").splice(0, num).join(" ") + "...";
    } else {
      return str;
    }
  };

  const data = products.map((product, index) => ({
    key: index + 1,
    title: truncateString(product.title, 4),
    brand: product.brand,
    category: product.category,
    quantity: product.quantity,
    sold: product.sold,
    totalrating: product.totalrating,
    price: `₹ ${product.price}`,
    _id: product._id,
  }));

  useEffect(() => {
    dispatch(getAllProducts());
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
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ProductList;
