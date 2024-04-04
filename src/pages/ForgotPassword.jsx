import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgortPasswordUser } from "../features/auth/authSlice";

const ForgotPasswordSchema = yup.object({
  email: yup.string().required("Email Should be Valid"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await dispatch(forgortPasswordUser(values));
    },
  });

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center py-4">
      <form className="form-3" action="" onSubmit={formik.handleSubmit}>
        <p className="login-3">Forgot Password Here</p>
        <div className="inputContainer-2">
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
        </div>
        {isLoading ? (
          <div className="typing-indicator forget-2">
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
          </div>
        ) : (
          <button className="forget">Send Link</button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
