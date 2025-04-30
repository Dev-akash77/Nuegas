import React, { createContext, useContext, useEffect, useState } from "react";

export const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userIsLogin, setUserIsLogin] = useState(JSON.parse(localStorage.getItem("isLoginUser"))||false);
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.setItem("isLoginUser", JSON.stringify(userIsLogin));
  }, [userIsLogin]);
  

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
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
