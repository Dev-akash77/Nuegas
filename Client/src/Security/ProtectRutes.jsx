import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../Context/GlobalContext";

const ProtectRutes = ({ children }) => {
  const { userIsLogin, isLoadingAuth } = useGlobalContext();

  if (isLoadingAuth) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (!userIsLogin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectRutes;
