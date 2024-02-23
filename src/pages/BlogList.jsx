import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Customer Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 1; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King `,
    product: 32,
    status: `Pending `,
  });
}

const BlogList = () => {
  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
