import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../features/auth/authSlice";
import LoadingBar from "../components/LoadingBar";

const loginSchema = yup.object({
  email: yup.string().required("Email Should be Valid"),
  password: yup.string().required("Password is Required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
        navigate("/dashboard");
      } catch (error) {
        throw error;
      }
    }
  });

  return (
    <>
      {isLoading ? (
        <div className="LoadingBar">
          <LoadingBar />
        </div>
      ) : (
        <section>
          <div className="login-wrapper d-flex justify-content-center align-items-center py-4">
            <form className="form" action="" onSubmit={formik.handleSubmit}>
              <p className="login">Log in to Dashboard</p>
              <div className="inputContainer">
                <input type="submit" value="Next" className="submit mb-2" />
                <input
                  type="email"
                  className="fInput email"
                  placeholder="email or username"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  autoComplete="email"
                  required
                />

                <input
                  placeholder="Enter your password"
                  type="password"
                  className="fInput pass"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  required
                />
              </div>
              <Link className="link" to="/forgot-password">
                <button className="forget">Forget Password?</button>
              </Link>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminLogin;
