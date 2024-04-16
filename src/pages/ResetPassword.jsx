import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetUserPassword } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const resetPasswordSchema = yup.object({
  password: yup.string().required("password is Required"),
  confirmPassword: yup.string().required("Confirm Password is Required"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      dispatch(resetUserPassword({ token: token, password: values.password }));
    },
  });

  const passwordMatch = () => {
    return formik.values.password === formik.values.confirmPassword;
  };

  return (
    <>
      <div className="login-wrapper d-flex justify-content-center align-items-center py-4">
        <form className="form-3" action="" onSubmit={formik.handleSubmit}>
          <Link
            to="/admin-login"
            className="backlogin-3 d-flex align-items-center"
          >
            <BiArrowBack style={{ fontSize: "15px", margin: "4px" }} /> Go Back
            to Login{" "}
          </Link>
          <p className="login-3">Reset Your Password</p>
          <div className="inputContainer">
            <input type="submit" value="Next" className="submit-2 mb-2" />
            <input
              placeholder="New Password"
              type="password"
              className="fInput email"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <>
              <input
                placeholder="Confirm password"
                type="password"
                id="pass"
                className={`fInput pass mb-0 ${
                  !passwordMatch() ? "text-bg-danger" : ""
                }`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange("confirmPassword")}
                onBlur={formik.handleBlur("confirmPassword")}
              />
            </>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
