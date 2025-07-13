import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllChartStatApi, profileApi } from "../Api/GlobalApi";

export const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [userIsLogin, setUserIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginUser")) || false
  );

  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //! Load login state from localStorage when app starts
  useEffect(() => {
    const local = localStorage.getItem("isLoginUser");
    if (local !== null) {
      setUserIsLogin(JSON.parse(local));
    } else {
      setUserIsLogin(false);
    }
    setIsLoadingAuth(false);
  }, []);

  //! Save login state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isLoginUser", JSON.stringify(userIsLogin));
  }, [userIsLogin]);

  //! Fetch user profile if logged in
const {
  data: profileData,
  refetch: profileRefetch,
  isLoading: profileIsLoading,
} = useQuery({
  queryKey: ["profile"],
  queryFn: ()=>profileApi(setUserIsLogin),
  enabled: !!userIsLogin,
});
  
  //! Fetch chart stats if logged in
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
        setFromData,
        isLogin,
        setIsLogin,
        userIsLogin,
        setUserIsLogin,
        isLoadingAuth,
        profileData,
        profileRefetch,
        profileIsLoading,
        popup,
        setPopup,
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
