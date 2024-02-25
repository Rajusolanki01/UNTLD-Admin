import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Blog Name",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="d-flex gap-2">
        <Link to={`blog/${record._id}`}>
          <EditButton />
        </Link>{" "}
        <div>
          <DeleteButton blogId={record._id} />
        </div>
      </div>
    ),
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog);
  const { blogs, isLoading } = blogState;

  const data = blogs?.map((blog, index) => ({
    key: index + 1,
    title: blog.title,
    description: blog.description,
    category: blog.category,
    _id: blog._id,
  }));

  useEffect(() => {
    dispatch(getAllBlogs());
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
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BlogList;
