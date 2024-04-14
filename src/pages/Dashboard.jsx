import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAMonthlyWiseOrders,
  getAYearlyWiseTotalOrders,
  getAllUsersOrders,
} from "../features/auth/authSlice";
import { useState } from "react";
import { changeDateFormat } from "../utils/dateFormat";

const columns = [
  {
    title: "Sno.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const monthlyOrdersState = useSelector(
    (state) => state.auth?.getMonthlyOrder
  );
  const YearlyOrdersState = useSelector((state) => state.auth?.getYearlyOrder);
  const allOrdersState = useSelector((state) => state.auth?.orders);
  const [orderData, setOrderData] = useState();

  const data1 = [];

  for (let i = 0; i < allOrdersState?.length; i++) {
    data1.push({
      key: i + 1,
      name: `${allOrdersState[i].user.firstname} ${allOrdersState[i].user.lastname}`,
      product: allOrdersState[i].orderItems?.length || 0,
      price: `₹${parseFloat(allOrdersState[i].totalPrice).toLocaleString(
        "en-IN"
      )}/-`,
      dprice: `₹${parseFloat(
        allOrdersState[i].totalPriceAfterDiscount
      ).toLocaleString("en-IN")}/-`,
      orderStatus: allOrdersState[i].orderStatus,
      createdAt: changeDateFormat(allOrdersState[i].createdAt),
      _id: allOrdersState[i]._id,
    });
  }

  useEffect(() => {
    dispatch(getAMonthlyWiseOrders());
    dispatch(getAYearlyWiseTotalOrders());
    dispatch(getAllUsersOrders());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let data = [];
    let monthlySalesCount = [];

    for (let i = 0; i < monthlyOrdersState?.length; i++) {
      const el = monthlyOrdersState[i];
      data.push({ type: monthNames[el?._id?.month], income: el?.amount });
      monthlySalesCount.push({
        type: monthNames[el?._id?.month],
        sales: el?.count,
      });
    }

    setMonthlyData(data);
    setMonthlySales(monthlySalesCount);
  }, [monthlyOrdersState]);

  //   {
  //     type: "January",
  //     sales: 40,
  //   },
  //   {
  //     type: "February",
  //     sales: 60,
  //   },
  //   {
  //     type: "March",
  //     sales: 80,
  //   },
  //   {
  //     type: "April",
  //     sales: 80,
  //   },
  //   {
  //     type: "May",
  //     sales: 90,
  //   },
  //   {
  //     type: "June",
  //     sales: 90,
  //   },
  //   {
  //     type: "July",
  //     sales: 70,
  //   },
  //   {
  //     type: "August",
  //     sales: 50,
  //   },
  //   {
  //     type: "September",
  //     sales: 30,
  //   },
  //   {
  //     type: "Octuber",
  //     sales: 10,
  //   },
  //   {
  //     type: "November",
  //     sales: 5,
  //   },
  //   {
  //     type: "December",
  //     sales: 3,
  //   },
  // ];

  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
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

  const config2 = {
    data: monthlySales,
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
      {YearlyOrdersState &&
        Array.isArray(YearlyOrdersState) &&
        YearlyOrdersState.length > 0 &&
        YearlyOrdersState?.map((item, index) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center gap-10 d-md-flex flex-wrap"
              key={index}
            >
              <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
                <div>
                  <p className="desc-title">Total Income</p>
                  <h4 className="mb-0">
                    ₹ {parseFloat(item?.amount).toLocaleString("en-IN")} /-
                  </h4>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <div className="d-flex gap-2 align-items-center desc-title mb-2">
                    <div className="">
                      <lord-icon
                        src="https://cdn.lordicon.com/yxyampao.json"
                        trigger="loop"
                        delay="1000"
                        colors="primary:#109121"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginBottom: "2px",
                        }}
                      ></lord-icon>
                    </div>{" "}
                    <h6 className="text-success">32%</h6>
                  </div>
                  <p className="mb-1 desc-title-2">
                    Total Income in Last Year From Today
                  </p>
                </div>
              </div>
              <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
                <div>
                  <p className="desc-title">Total Sales</p>
                  <h4 className="mb-0">{item?.count}</h4>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <div className="d-flex gap-2 align-items-center desc-title mb-2">
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/utqytqrt.json"
                        trigger="loop"
                        delay="1000"
                        colors="primary:#e83a30"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginBottom: "2px",
                        }}
                      ></lord-icon>
                    </div>
                    <h6 className="text-danger">12%</h6>
                  </div>
                  <p className="mb-1 desc-title-2">
                    Sales in Last Year From Today
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4">
          <h3 className="mb-4 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>{" "}
        <div className="mt-4">
          <h3 className="mb-4 title">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4 ">
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
