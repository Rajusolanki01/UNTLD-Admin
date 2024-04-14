import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage";
import AdminLogin from "./pages/AdminLogin";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import { Toaster } from "sonner";
import RequireUserAuth from "./AuthenticationAccess/RequireUserAuth";
import OnlyIfNotLoggedIn from "./AuthenticationAccess/OnlyIfNotLoggedIn";
import CustomerProfile from "./pages/CustomerProfile";
import CouponList from "./pages/CouponList";
import ViewsEnquiry from "./pages/ViewsEnquiry";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />{" "}
          <Route element={<OnlyIfNotLoggedIn />}>
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="forgot-password" element={<ForgotPassword />} />{" "}
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<RequireUserAuth />}>
            <Route path="/Dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route
                path="customers/profile/:name/:id"
                element={<CustomerProfile />}
              />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-product/:id" element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="add-brand" element={<AddBrand />} />
              <Route path="brand-list" element={<BrandList />} />
              <Route path="add-product-category" element={<AddCategory />} />
              <Route path="product-category-list" element={<CategoryList />} />
              <Route path="add-color" element={<AddColor />} />
              <Route path="color-list" element={<ColorList />} />
              <Route path="add-coupon" element={<AddCoupon />} />
              <Route path="coupon-list" element={<CouponList />} />
              <Route path="orders" element={<Orders />} />{" "}
              <Route path="view-orders/:id" element={<ViewOrder />} />{" "}
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="add-blog/:id?" element={<AddBlog />} />
              <Route path="add-blog-category" element={<AddBlogCategory />} />
              <Route path="blog-list" element={<BlogList />} />
              <Route path="blog-category-list" element={<BlogCategoryList />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="view-enquiry/:id" element={<ViewsEnquiry />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        expand={false}
        toastOptions={{
          style: {
            background: "white",
            width: "300px",
            left: "100px",
            fontSize: "14px",
          },
          className: "class",
        }}
      />
    </>
  );
}

export default App;
