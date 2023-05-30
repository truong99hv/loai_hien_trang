import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, isChecking } = useContext(AuthContext);
  if (isChecking) {
    return <div></div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
