import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

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

const Dashboard = () => {
  const data = [
    {
      type: "January",
      sales: 40,
    },
    {
      type: "February",
      sales: 60,
    },
    {
      type: "March",
      sales: 80,
    },
    {
      type: "April",
      sales: 80,
    },
    {
      type: "May",
      sales: 90,
    },
    {
      type: "June",
      sales: 90,
    },
    {
      type: "July",
      sales: 70,
    },
    {
      type: "August",
      sales: 50,
    },
    {
      type: "September",
      sales: 30,
    },
    {
      type: "Octuber",
      sales: 10,
    },
    {
      type: "November",
      sales: 5,
    },
    {
      type: "December",
      sales: 3,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#000000";
    },
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-10 d-md-flex flex-wrap">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc-title">Total sells</p>
            <h4 className="mb-0">₹10,000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex gap-2 align-items-center desc-title mb-2">
              <div className="">
                <lord-icon
                  src="https://cdn.lordicon.com/yxyampao.json"
                  trigger="loop"
                  delay="1000"
                  colors="primary:#109121"
                  style={{ width: "25px", height: "25px", marginBottom: "2px" }}
                ></lord-icon>
              </div>{" "}
              <h6 className="text-success">32%</h6>
            </div>
            <p className="mb-1 desc-title-2">Compare To April 2024</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc-title">Average order</p>
            <h4 className="mb-0">₹8,000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex gap-2 align-items-center desc-title mb-2">
              <div>
                <lord-icon
                  src="https://cdn.lordicon.com/utqytqrt.json"
                  trigger="loop"
                  delay="1000"
                  colors="primary:#e83a30"
                  style={{ width: "25px", height: "25px", marginBottom: "2px" }}
                ></lord-icon>
              </div>
              <h6 className="text-danger">12%</h6>
            </div>
            <p className="mb-1 desc-title-2">Compare To April 2024</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc-title">Total orders</p>
            <h4 className="mb-0">₹15,000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex gap-2 align-items-center desc-title mb-2">
              <div className="">
                <lord-icon
                  src="https://cdn.lordicon.com/yxyampao.json"
                  trigger="loop"
                  delay="1000"
                  colors="primary:#109121"
                  style={{ width: "25px", height: "25px", marginBottom: "2px" }}
                ></lord-icon>
              </div>
              <h6 className="text-success">42%</h6>
            </div>
            <p className="mb-1 desc-title-2">Compare To April 2024</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
