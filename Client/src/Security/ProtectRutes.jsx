import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLoader from "../UI/MainLoader";
import CheckSecurity from "./CheckSecurity";

const ProtectRutes = ({ children }) => {
  const { data, isLoading } = CheckSecurity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!data?.success) {
        navigate("/auth");
      }
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen cc overflow-hidden">
        <MainLoader />
      </div>
    );
  }

  return children;
};

export default ProtectRutes;
