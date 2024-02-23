import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";


const RequireUserAuth = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  return user ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default RequireUserAuth;
