import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import { getAllBlogCategories } from "../features/blog Category/blogCategorySlice";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Blog Category Name",
    dataIndex: "title",
  },
  {
    title: "Brand Category Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Brand Category Updated At",
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
          <DeleteButton blogCategoryId={record._id} />
        </div>
      </div>
    ),
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const blogCategoryState = useSelector((state) => state.blogCategory);
  const { blogCategories, isLoading } = blogCategoryState;

  const data = blogCategories?.map((blog, index) => ({
    key: index + 1,
    title: blog.title,
    createdAt: new Date(blog.createdAt).toLocaleString(),
    updatedAt: new Date(blog.updatedAt).toLocaleString(),
    _id: blog._id,
  }));

  useEffect(() => {
    dispatch(getAllBlogCategories());
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
      <h3 className="mb-4 title">Blogs Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BlogCategoryList;
