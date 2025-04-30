import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./../Context/GlobalContext";

const ProtectRutes = ({ children }) => {
  const { userIsLogin } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLogin) {
      navigate("/auth");
    }
  }, [userIsLogin, navigate]);

  return children;
};

export default ProtectRutes;
