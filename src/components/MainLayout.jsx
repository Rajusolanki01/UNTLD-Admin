import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineFormatColorFill,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import { FaList, FaBlog, FaBlogger } from "react-icons/fa";
import { GrCatalog, GrCart } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { RiCustomerService2Line, RiCouponFill } from "react-icons/ri";
import { untldNames, indiaFlagg, Avatarr } from "../assets/assets";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async (e) => {
    try {
      await dispatch(logoutUser(e.target.value));
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const disableRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   window.addEventListener("contextmenu", disableRightClick);

  //   return () => {
  //     window.removeEventListener("contextmenu", disableRightClick);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (
  //       event.ctrlKey &&
  //       (event.keyCode === 67 || event.keyCode === 86) //? Ctrl + C / Ctrl + V
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={untldNames} alt="" className="w-100 img-fluid" />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard className="fss" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <IoPeople className="fss" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <GrCatalog className="fss" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <GrCart className="fss" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaList className="fss" />,
                  label: "Product List",
                },
                {
                  key: "add-brand",
                  icon: <SiBrandfolder className="fss" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fss" />,
                  label: "Brand List",
                },
                {
                  key: "add-product-category",
                  icon: <MdOutlineCategory className="fss" />,
                  label: "Add Product Category",
                },
                {
                  key: "product-category-list",
                  icon: <MdOutlineCategory className="fss" />,
                  label: "Product Category List",
                },
                {
                  key: "add-color",
                  icon: <MdOutlineFormatColorFill className="fss" />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <MdOutlineFormatColorFill className="fss" />,
                  label: "Color List",
                },
              ],
            },

            {
              key: "orders",
              icon: <LuClipboardList className="fss" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponFill className="fss" />,
              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <RiCouponFill className="fss" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponFill className="fss" />,
                  label: "Coupon List",
                },
              ],
            },

            {
              key: "blog",
              icon: <FaBlog className="fss" />,
              label: "Blog",
              children: [
                {
                  key: "add-blog",
                  icon: <FaBlogger className="fss" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <ImBlog className="fss" />,
                  label: "Blog List",
                },
                {
                  key: "add-blog-category",
                  icon: <FaBlogger className="fss" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <ImBlog className="fss" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <RiCustomerService2Line className="fss" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 8, background: colorBgContainer }}
          className="d-flex justify-content-between ps-1 pe-5"
        >
          <div
            style={{
              width: 70,
              height: 7,
              marginBlock: "10px",
            }}
          >
            <ToggleButton collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
          <div className="gap-15 d-flex align-items-center justify-content-evenly">
            <div className="">
              <img src={indiaFlagg} alt="" />
            </div>
            <div className="position-relative">
              <button className="button">
                <svg viewBox="0 0 448 512" className="bell">
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
              </button>
              <span className="badge position-absolute">3</span>
            </div>
            <div className="gap-2 d-flex align-items-center dropdown">
              <div>
                <img
                  src={Avatarr}
                  alt="Profile"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div role="button" id="dropdwonMenuLink">
                <div className="d-lg-block d-md-block d-none">
                  <h5 className="text-dark mb-0">Raju Solanki</h5>
                  <p className="mb-0">rajusolanki787@gmail.com</p>
                </div>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li className="heading">
                  <Link
                    className="dropdown-item mb-0 py-1 "
                    style={{ height: "auto", lineHeight: "25px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>

                <li>
                  <button
                    className="dropdown-item mb-0 py-1 heading"
                    style={{ height: "auto", lineHeight: "25px" }}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
