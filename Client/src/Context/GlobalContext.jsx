import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllChartStatApi, profileApi } from "../Api/GlobalApi";

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

  // ! get user Stat - Chart via tanstack query
  const {
    data: stat_ChartData,
    refetch: stat_ChartRefetch,
    isLoading: stat_ChartIsLoading,
  } = useQuery({
    queryKey: ["stat_Chart"],
    queryFn: getAllChartStatApi,
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
        // !chart data
        stat_ChartData,
        stat_ChartRefetch,
        stat_ChartIsLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
