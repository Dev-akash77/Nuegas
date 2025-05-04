import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../Api/GlobalApi";

export const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [popup, setPopup] = useState(false);

  const [userIsLogin, setUserIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginUser")) || false
  );
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.setItem("isLoginUser", JSON.stringify(userIsLogin));
  }, [userIsLogin]);

  // ! get user profile via tanstack query
  const {
    data: profileData,
    refetch: profileRefetch,
    isLoading: profileIsLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi,
    enabled: !!userIsLogin,
  });

  return (
    <globalContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        fromData,
        isLogin,
        setIsLogin,
        setFromData,
        userIsLogin,
        setUserIsLogin,
        profileData,
        profileRefetch,
        profileIsLoading,
        popup,
        setPopup,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
