import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { axiosClientService } from "../utils/axiosConfig";

const ResetPassword = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosClientService.put(
        `user/reset-password/${userId}`,
        {
          password,
        }
      );
      if (response.result) {
        setPassword("");
        setConfirmPassword("");
      } else {
        return;
      }
      return response.result;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="login-wrapper d-flex justify-content-center align-items-center py-4">
        <form className="form-3" action="" onSubmit={handleResetPassword}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <>
              <input
                placeholder="Confirm password"
                type="password"
                id="pass"
                className="fInput pass"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
